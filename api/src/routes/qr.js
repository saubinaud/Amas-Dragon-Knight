const router = require('express').Router();
const pool = require('../db');
const crypto = require('crypto');

// POST /api/qr/generar — Generate a QR session for today
router.post('/qr/generar', async (req, res) => {
  try {
    const { sede_id, horario_id, turno } = req.body;
    const sedeId = sede_id || 1;

    // Close any active sessions for this sede today
    await pool.query(
      `UPDATE qr_sesiones SET activa = FALSE WHERE sede_id = $1 AND fecha = CURRENT_DATE AND activa = TRUE`,
      [sedeId]
    );

    // Generate new token
    const token = crypto.randomUUID();

    const result = await pool.query(
      `INSERT INTO qr_sesiones (sede_id, horario_id, token, fecha, hora_apertura, activa)
       VALUES ($1, $2, $3, CURRENT_DATE, NOW(), TRUE)
       RETURNING id, token, fecha, hora_apertura`,
      [sedeId, horario_id || null, token]
    );

    const sesion = result.rows[0];
    const qrUrl = `https://dragon-knight.amasteamwolf.com/asistencia?token=${sesion.token}`;

    res.json({
      success: true,
      sesion: {
        id: sesion.id,
        token: sesion.token,
        fecha: sesion.fecha,
        hora_apertura: sesion.hora_apertura,
        url: qrUrl,
      },
    });
  } catch (err) {
    console.error('Error generando QR:', err);
    res.status(500).json({ success: false, error: 'Error al generar sesión QR' });
  }
});

// POST /api/qr/cerrar — Close active QR session
router.post('/qr/cerrar', async (req, res) => {
  try {
    const { sede_id } = req.body;
    await pool.query(
      `UPDATE qr_sesiones SET activa = FALSE, hora_cierre = NOW() WHERE sede_id = $1 AND fecha = CURRENT_DATE AND activa = TRUE`,
      [sede_id || 1]
    );
    res.json({ success: true, message: 'Sesión QR cerrada' });
  } catch (err) {
    console.error('Error cerrando QR:', err);
    res.status(500).json({ success: false, error: 'Error al cerrar sesión QR' });
  }
});

// GET /api/qr/activa — Get active QR session for today
router.get('/qr/activa', async (req, res) => {
  try {
    const sedeId = req.query.sede_id || 1;
    const result = await pool.query(
      `SELECT id, token, fecha, hora_apertura FROM qr_sesiones WHERE sede_id = $1 AND fecha = CURRENT_DATE AND activa = TRUE LIMIT 1`,
      [sedeId]
    );

    if (result.rows.length === 0) {
      return res.json({ success: true, activa: false, sesion: null });
    }

    const sesion = result.rows[0];
    res.json({
      success: true,
      activa: true,
      sesion: {
        ...sesion,
        url: `https://dragon-knight.amasteamwolf.com/asistencia?token=${sesion.token}`,
      },
    });
  } catch (err) {
    console.error('Error obteniendo QR activa:', err);
    res.status(500).json({ success: false, error: 'Error al obtener sesión QR' });
  }
});

// POST /api/asistencia/marcar — Mark attendance using the DB function
router.post('/asistencia/marcar', async (req, res) => {
  try {
    const { dni, token, turno } = req.body;

    if (!dni) {
      return res.status(400).json({ success: false, error: 'DNI es requerido' });
    }

    const result = await pool.query(
      `SELECT registrar_asistencia($1, $2, $3) as resultado`,
      [dni, token || null, turno || null]
    );

    const resultado = result.rows[0].resultado;
    res.json(resultado);
  } catch (err) {
    console.error('Error marcando asistencia:', err);
    res.status(500).json({ success: false, error: 'Error al registrar asistencia' });
  }
});

// GET /api/asistencia/hoy — Today's attendance list
router.get('/asistencia/hoy', async (req, res) => {
  try {
    const sedeId = req.query.sede_id || 1;
    const result = await pool.query(
      `SELECT a.id, a.hora, a.turno, a.metodo_registro,
              al.nombre_alumno, al.dni_alumno,
              i.programa, i.clases_totales,
              (SELECT COUNT(*) FROM asistencias WHERE inscripcion_id = a.inscripcion_id AND asistio = 'Sí') as clases_usadas
       FROM asistencias a
       JOIN alumnos al ON al.id = a.alumno_id
       LEFT JOIN inscripciones i ON i.id = a.inscripcion_id
       WHERE a.fecha = CURRENT_DATE AND a.asistio = 'Sí'
       AND (a.sede_id = $1 OR a.sede_id IS NULL)
       ORDER BY a.hora DESC`,
      [sedeId]
    );

    res.json({ success: true, asistencias: result.rows, total: result.rows.length });
  } catch (err) {
    console.error('Error obteniendo asistencias:', err);
    res.status(500).json({ success: false, error: 'Error al obtener asistencias' });
  }
});

module.exports = router;
