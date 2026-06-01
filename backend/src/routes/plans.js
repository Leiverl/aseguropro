const express = require('express');
const { queryAll, queryOne } = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
  try {
    const { type } = req.query;
    let plans;

    if (type) {
      plans = queryAll('SELECT * FROM plans WHERE type = ? ORDER BY price ASC', [type]);
    } else {
      plans = queryAll('SELECT * FROM plans ORDER BY type, price ASC');
    }

    res.json({ plans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener planes' });
  }
});

router.get('/student', (req, res) => {
  try {
    const plans = queryAll('SELECT * FROM plans WHERE is_student = 1 ORDER BY price ASC');
    res.json({ plans });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener planes' });
  }
});

router.get('/:id', (req, res) => {
  try {
    const plan = queryOne('SELECT * FROM plans WHERE id = ?', [req.params.id]);
    if (!plan) {
      return res.status(404).json({ error: 'Plan no encontrado' });
    }
    res.json({ plan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener plan' });
  }
});

module.exports = router;
