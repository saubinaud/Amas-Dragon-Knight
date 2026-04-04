require('dotenv').config();
const express = require('express');
const cors = require('cors');

const healthRoutes = require('./routes/health');
const matriculaRoutes = require('./routes/matricula');
const renovacionRoutes = require('./routes/renovacion');
const leadershipRoutes = require('./routes/leadership');
const torneoRoutes = require('./routes/torneos');
const graduacionRoutes = require('./routes/graduacion');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: [
    'https://dragon-knight.amasteamwolf.com',
    'http://localhost:5173',
    'http://localhost:4173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api', healthRoutes);
app.use('/api', matriculaRoutes);
app.use('/api', renovacionRoutes);
app.use('/api', leadershipRoutes);
app.use('/api', torneoRoutes);
app.use('/api', graduacionRoutes);

// 404
app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Error handler
app.use((err, _req, res, _next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`Dragon Knight API running on port ${PORT}`);
});
