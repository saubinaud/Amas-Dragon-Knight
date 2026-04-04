const router = require('express').Router();
const pool = require('../db');
const { sendBienvenidaEmail } = require('../notifuse');

router.post('/leadership', async (req, res) => {
  const client = await pool.connect();

  try {
    const d = req.body;
    await client.query('BEGIN');

    // UPSERT alumno
    const alumnoResult = await client.query(
      `INSERT INTO alumnos (nombre_alumno, dni_alumno, fecha_nacimiento, categoria, nombre_apoderado, dni_apoderado, correo, telefono, direccion)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
       ON CONFLICT (dni_alumno) DO UPDATE SET
         nombre_alumno = EXCLUDED.nombre_alumno,
         nombre_apoderado = EXCLUDED.nombre_apoderado,
         correo = EXCLUDED.correo,
         telefono = EXCLUDED.telefono,
         updated_at = CURRENT_TIMESTAMP
       RETURNING id`,
      [d.nombreAlumno, d.dniAlumno, d.fechaNacimiento || null, d.categoriaAlumno || 'No especificada', d.nombrePadre, d.dniPadre, d.email, d.telefono, d.direccion]
    );
    const alumnoId = alumnoResult.rows[0].id;

    // INSERT inscripcion Leadership
    const inscResult = await client.query(
      `INSERT INTO inscripciones (alumno_id, programa, fecha_inscripcion, fecha_inicio, fecha_fin, clases_totales, turno, precio_programa, precio_pagado, tipo_cliente, estado, estado_pago)
       VALUES ($1, 'Leadership', CURRENT_DATE, $2, $3, $4, $5, $6, $7, 'Nuevo/Primer registro', 'Activo', 'Pagado')
       RETURNING id`,
      [
        alumnoId,
        d.fechaInicio || null,
        d.fechaFin || null,
        d.clasesTotales || 0,
        d.turnoSeleccionado || 'General',
        d.precioPrograma || 0,
        d.total || 0,
      ]
    );
    const inscripcionId = inscResult.rows[0].id;

    // INSERT pago
    await client.query(
      `INSERT INTO pagos (inscripcion_id, monto, fecha, tipo, metodo_pago)
       VALUES ($1, $2, CURRENT_DATE, 'Inscripción', 'Por confirmar')`,
      [inscripcionId, d.total || 0]
    );

    await client.query('COMMIT');

    await sendBienvenidaEmail({
      email: d.email,
      nombrePadre: d.nombrePadre,
      nombreAlumno: d.nombreAlumno,
      programa: 'Leadership',
      fechaInicio: d.fechaInicio,
      fechaFin: d.fechaFin,
      precioPrograma: d.precioPrograma,
    });

    res.json({
      success: true,
      alumno_id: alumnoId,
      inscripcion_id: inscripcionId,
      message: 'Inscripción Leadership registrada exitosamente',
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en leadership:', err);
    res.status(500).json({ success: false, error: 'Error al registrar Leadership', detail: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
