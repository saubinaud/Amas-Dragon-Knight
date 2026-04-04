const router = require('express').Router();
const pool = require('../db');
const { sendBienvenidaEmail } = require('../notifuse');

router.post('/matricula', async (req, res) => {
  const client = await pool.connect();

  try {
    const d = req.body;
    await client.query('BEGIN');

    // 1. UPSERT alumno
    const alumnoResult = await client.query(
      `INSERT INTO alumnos (nombre_alumno, dni_alumno, fecha_nacimiento, categoria, nombre_apoderado, dni_apoderado, correo, telefono, direccion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (dni_alumno) DO UPDATE SET
         nombre_alumno = EXCLUDED.nombre_alumno,
         nombre_apoderado = EXCLUDED.nombre_apoderado,
         dni_apoderado = EXCLUDED.dni_apoderado,
         correo = EXCLUDED.correo,
         telefono = EXCLUDED.telefono,
         direccion = EXCLUDED.direccion,
         updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [
        d.nombreAlumno,
        d.dniAlumno,
        d.fechaNacimiento || null,
        d.categoriaAlumno || 'No especificada',
        d.nombrePadre,
        d.dniPadre,
        d.email,
        d.telefono,
        d.direccion,
      ]
    );
    const alumnoId = alumnoResult.rows[0].id;

    // 2. INSERT inscripcion
    const inscResult = await client.query(
      `INSERT INTO inscripciones (alumno_id, programa, fecha_inscripcion, fecha_inicio, fecha_fin, clases_totales, turno, dias_tentativos, precio_programa, precio_pagado, descuento, codigo_promocional, tipo_cliente, estado, estado_pago)
       VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, 'Activo', 'Pagado')
       RETURNING id`,
      [
        alumnoId,
        d.programa,
        d.fechaInicio === 'no-especificado' ? null : d.fechaInicio,
        d.fechaFin === 'Por calcular' ? null : d.fechaFin,
        d.clasesTotales || 0,
        d.turnoSeleccionado,
        d.diasTentativos,
        d.precioPrograma || 0,
        d.total || 0,
        (d.descuentoDinero || 0) + (d.descuentoPorcentualMonto || 0),
        d.codigoPromocional || null,
        'Nuevo/Primer registro',
      ]
    );
    const inscripcionId = inscResult.rows[0].id;

    // 3. INSERT pago
    await client.query(
      `INSERT INTO pagos (inscripcion_id, monto, fecha, tipo, metodo_pago)
       VALUES ($1, $2, CURRENT_DATE, 'Inscripción', 'Por confirmar')`,
      [inscripcionId, d.total || 0]
    );

    // 4. INSERT tallas
    if (d.tallaUniforme && d.tallaUniforme !== 'No aplica') {
      await client.query(
        `INSERT INTO tallas (alumno_id, talla_uniforme, talla_polo)
         VALUES ($1, $2, $3)`,
        [alumnoId, d.tallaUniforme, d.tallasPolos?.[0] || null]
      );
    }

    // 5. INSERT contrato (placeholder)
    if (d.contratoFirmado) {
      await client.query(
        `INSERT INTO contratos (inscripcion_id, archivo_url, firmado)
         VALUES ($1, $2, FALSE)`,
        [inscripcionId, 'pending-upload']
      );
    }

    await client.query('COMMIT');

    // 6. Send email (fake)
    await sendBienvenidaEmail({
      email: d.email,
      nombrePadre: d.nombrePadre,
      nombreAlumno: d.nombreAlumno,
      dniAlumno: d.dniAlumno,
      programa: d.programa,
      fechaInicio: d.fechaInicio,
      fechaFin: d.fechaFin,
      precioPrograma: d.precioPrograma,
    });

    res.json({
      success: true,
      alumno_id: alumnoId,
      inscripcion_id: inscripcionId,
      message: 'Matrícula registrada exitosamente',
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en matricula:', err);
    res.status(500).json({ success: false, error: 'Error al registrar matrícula', detail: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
