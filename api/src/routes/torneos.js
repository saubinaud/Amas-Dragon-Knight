const router = require('express').Router();
const pool = require('../db');
const { sendTorneoConfirmacionEmail } = require('../notifuse');

// GET /api/torneos — list active tournaments
router.get('/torneos', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nombre, fecha, lugar, descripcion, precio, activo, created_at
       FROM torneos WHERE activo = TRUE ORDER BY fecha ASC`
    );
    res.json({ success: true, torneos: result.rows });
  } catch (err) {
    console.error('Error listando torneos:', err);
    res.status(500).json({ success: false, error: 'Error al obtener torneos' });
  }
});

// GET /api/torneos/:id — tournament details with inscribed count
router.get('/torneos/:id', async (req, res) => {
  try {
    const torneo = await pool.query(`SELECT * FROM torneos WHERE id = $1`, [req.params.id]);
    if (torneo.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Torneo no encontrado' });
    }
    const inscritos = await pool.query(
      `SELECT COUNT(*) as total FROM inscripciones_torneo WHERE torneo_id = $1`,
      [req.params.id]
    );
    res.json({
      success: true,
      torneo: { ...torneo.rows[0], inscritos: parseInt(inscritos.rows[0].total) },
    });
  } catch (err) {
    console.error('Error obteniendo torneo:', err);
    res.status(500).json({ success: false, error: 'Error al obtener torneo' });
  }
});

// POST /api/torneos/inscripcion — register student for tournament
router.post('/torneos/inscripcion', async (req, res) => {
  const client = await pool.connect();

  try {
    const d = req.body;
    await client.query('BEGIN');

    // Find alumno by DNI
    let alumnoResult = await client.query(
      `SELECT id, nombre_alumno FROM alumnos WHERE dni_alumno = $1`,
      [d.dniAlumno]
    );

    let alumnoId;
    if (alumnoResult.rows.length === 0) {
      // Create alumno if not exists
      const newAlumno = await client.query(
        `INSERT INTO alumnos (nombre_alumno, dni_alumno, fecha_nacimiento, categoria, nombre_apoderado, dni_apoderado, correo, telefono)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         ON CONFLICT (dni_alumno) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
         RETURNING id`,
        [d.nombreAlumno, d.dniAlumno, d.fechaNacimiento || null, d.categoria || 'No especificada', d.nombreApoderado, d.dniApoderado, d.correo, d.telefono]
      );
      alumnoId = newAlumno.rows[0].id;
    } else {
      alumnoId = alumnoResult.rows[0].id;
    }

    // Check if already inscribed
    const existing = await client.query(
      `SELECT id FROM inscripciones_torneo WHERE torneo_id = $1 AND alumno_id = $2`,
      [d.torneoId, alumnoId]
    );
    if (existing.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(409).json({ success: false, error: 'El alumno ya está inscrito en este torneo' });
    }

    // Insert tournament registration
    const inscResult = await client.query(
      `INSERT INTO inscripciones_torneo (torneo_id, alumno_id, modalidades, monto_pagado, estado)
       VALUES ($1, $2, $3, $4, 'Registrado')
       RETURNING id`,
      [d.torneoId, alumnoId, d.modalidades || '', d.montoPagado || 0]
    );

    await client.query('COMMIT');

    // Send confirmation email (fake)
    await sendTorneoConfirmacionEmail({
      email: d.correo,
      nombreAlumno: d.nombreAlumno,
      nombreApoderado: d.nombreApoderado,
      torneoNombre: d.torneoNombre || 'Torneo',
    });

    res.json({
      success: true,
      inscripcion_torneo_id: inscResult.rows[0].id,
      message: 'Inscripción al torneo registrada exitosamente',
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error en inscripcion torneo:', err);
    res.status(500).json({ success: false, error: 'Error al inscribir en torneo', detail: err.message });
  } finally {
    client.release();
  }
});

module.exports = router;
