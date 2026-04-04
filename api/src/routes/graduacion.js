const router = require('express').Router();
const pool = require('../db');

// GET /api/graduacion — list upcoming graduations
router.get('/graduacion', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nombre, fecha, lugar, descripcion, activa, created_at
       FROM graduaciones WHERE activa = TRUE ORDER BY fecha ASC`
    );
    res.json({ success: true, graduaciones: result.rows });
  } catch (err) {
    console.error('Error listando graduaciones:', err);
    res.status(500).json({ success: false, error: 'Error al obtener graduaciones' });
  }
});

// GET /api/graduacion/:id — graduation details with participants
router.get('/graduacion/:id', async (req, res) => {
  try {
    const grad = await pool.query(`SELECT * FROM graduaciones WHERE id = $1`, [req.params.id]);
    if (grad.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Graduación no encontrada' });
    }

    const participantes = await pool.query(
      `SELECT pg.id, pg.cinturon_actual, pg.cinturon_nuevo, pg.estado,
              a.nombre_alumno, a.dni_alumno
       FROM participantes_graduacion pg
       JOIN alumnos a ON a.id = pg.alumno_id
       WHERE pg.graduacion_id = $1
       ORDER BY a.nombre_alumno`,
      [req.params.id]
    );

    res.json({
      success: true,
      graduacion: grad.rows[0],
      participantes: participantes.rows,
    });
  } catch (err) {
    console.error('Error obteniendo graduacion:', err);
    res.status(500).json({ success: false, error: 'Error al obtener graduación' });
  }
});

// GET /api/graduacion/:id/resultados — graduation results
router.get('/graduacion/:id/resultados', async (req, res) => {
  try {
    const resultados = await pool.query(
      `SELECT pg.cinturon_actual, pg.cinturon_nuevo, pg.estado, pg.observaciones,
              a.nombre_alumno
       FROM participantes_graduacion pg
       JOIN alumnos a ON a.id = pg.alumno_id
       WHERE pg.graduacion_id = $1 AND pg.estado IN ('Aprobado', 'Reprobado')
       ORDER BY pg.cinturon_nuevo, a.nombre_alumno`,
      [req.params.id]
    );

    res.json({ success: true, resultados: resultados.rows });
  } catch (err) {
    console.error('Error obteniendo resultados:', err);
    res.status(500).json({ success: false, error: 'Error al obtener resultados' });
  }
});

module.exports = router;
