require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDb } = require('./database');

const authRoutes = require('./routes/auth');
const plansRoutes = require('./routes/plans');
const appointmentsRoutes = require('./routes/appointments');
const quotesRoutes = require('./routes/quotes');
const policiesRoutes = require('./routes/policies');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/plans', plansRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/quotes', quotesRoutes);
app.use('/api/policies', policiesRoutes);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Aseguradora API', version: '1.0.0' });
});

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor de Aseguradora corriendo en puerto ${PORT}`);
  });
});
