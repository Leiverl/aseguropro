const express = require('express');
const { queryAll, queryOne, execute } = require('../database');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  try {
    const policies = queryAll(
      `SELECT p.*, pl.name as plan_name, pl.type as plan_type, pl.price, pl.description, pl.icon, pl.color
      FROM policies p
      JOIN plans pl ON p.plan_id = pl.id
      WHERE p.user_id = ?
      ORDER BY p.created_at DESC`,
      [req.user.id]
    );

    res.json({ policies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener pólizas' });
  }
});

router.post('/', auth, (req, res) => {
  try {
    const { plan_id, start_date, end_date } = req.body;

    if (!plan_id || !start_date || !end_date) {
      return res.status(400).json({ error: 'Plan, fecha inicio y fecha fin son requeridos' });
    }

    const plan = queryOne('SELECT * FROM plans WHERE id = ?', [plan_id]);
    if (!plan) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }

    const result = execute(
      'INSERT INTO policies (user_id, plan_id, start_date, end_date) VALUES (?, ?, ?, ?)',
      [req.user.id, plan_id, start_date, end_date]
    );

    const policy = queryOne(
      `SELECT p.*, pl.name as plan_name, pl.type as plan_type, pl.price, pl.description, pl.icon, pl.color
      FROM policies p
      JOIN plans pl ON p.plan_id = pl.id
      WHERE p.id = ?`,
      [result.lastInsertRowid]
    );

    res.json({ policy });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al adquirir póliza' });
  }
});

router.put('/:id/cancel', auth, (req, res) => {
  try {
    const policy = queryOne('SELECT * FROM policies WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!policy) {
      return res.status(404).json({ error: 'Póliza no encontrada' });
    }

    execute('UPDATE policies SET status = ? WHERE id = ?', ['cancelled', req.params.id]);
    res.json({ message: 'Póliza cancelada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al cancelar póliza' });
  }
});

module.exports = router;
