const router = require('express').Router();
const pool = require('../db');
const { sendRenovacionEmail } = require('../notifuse');

router.post('/renovacion', async (req, res) => {
  const client = await pool.connect();

  try {
    const d = req.body;
    await client.query('BEGIN');

    // 1. Find existing alumno by DNI
    const alumnoResult = await client.query(
      `SELECT id, nombre_alumno FROM alumnos WHERE dni_alumno = $1`,
      [d.dniAlumno]
    );

    let alumnoId;
    if (alumnoResult.rows.length === 0) {
      // Create new alumno if not found (edge case: renewal without prior enrollment)
      const newAlumno = await client.query(
        `INSERT INTO alumnos (nombre_alumno, dni_alumno, fecha_nacimiento, categoria, nombre_apoderado, dni_apoderado, correo, direccion)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [d.nombreAlumno, d.dniAlumno, d.fechaNacimiento || null, d.categoriaAlumno || 'No especificada', d.nombrePadre, d.dniPadre, d.email, d.direccion]
      );
      alumnoId = newAlumno.rows[0].id;
    } else {
      alumnoId = alumnoResult.rows[0].id;
      // Update parent info
      await client.query(
        `UPDATE alumnos SET nombre_apoderado = $1, dni_apoderado = $2, correo = $3, direccion = $4, updated_at = CURRENT_TIMESTAMP WHERE id = $5`,
        [d.nombrePadre, d.dniPadre, d.email, d.direccion, alumnoId]
      );
    }

    // 2. Mark previous active inscripciones as completed
    await client.query(
      `UPDATE inscripciones SET estado = 'Completado', updated_at = CURRENT_TIMESTAMP WHERE alumno_id = $1 AND estado = 'Activo'`,
      [alumnoId]
    );

    // 3. INSERT new inscripcion
    const inscResult = await client.query(
      `INSERT INTO inscripciones (alumno_id, programa, fecha_inscripcion, fecha_inicio, fecha_fin, clases_totales, turno, dias_tentativos, precio_programa, precio_pagado, descuento, codigo_promocional, tipo_cliente, estado, estado_pago)
       VALUES ($1, $2, CURRENT_DATE, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'Renovación', 'Activo', 'Pagado')
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
      ]
    );
    const inscripcionId = inscResult.rows[0].id;

    // 4. INSERT pago
    await client.query(
      `INSERT INTO pagos (inscripcion_id, monto, fecha, tipo, metodo_pago)
       VALUES ($1, $2, CURRENT_DATE, 'Renovación', 'Por confirmar')`,
      [inscripcionId, d.total || 0]
    );

    // 5. INSERT contrato if uploaded
    if (d.contratoFirmado) {
      await client.query(
        `INSERT INTO contratos (inscripcion_id, archivo_url, firmado, fecha_firma)
         VALUES ($1, $2, TRUE, CURRENT_DATE)`,
        [inscripcionId, 'uploaded-base64']
      );
    }

    await client.query('COMMIT');

    // 6. Send email (fake)
    await sendRenovacionEmail({
      email: d.email,
      nombrePadre: d.nombrePadre,
      nombreAlumno: d.nombreAlumno,
      programa: d.programa,
      fechaInicio: d.fechaInicio,
      fechaFin: d.fechaFin,
      clasesTotales: d.clasesTotales,
      turno: d.turnoSeleccionado,
    });

    res.json({
      success: true,
      alumno_id: alumnoId,
      inscripcion_id: inscripcionId,
      message: 'Renovación registrada exitosamente',
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en renovacion:', err);
    res.status(500).json({ success: false, error: 'Error al registrar renovación', detail: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
