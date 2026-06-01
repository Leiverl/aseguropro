const express = require('express');
const { queryAll, queryOne, execute } = require('../database');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, (req, res) => {
  try {
    const appointments = queryAll(
      'SELECT * FROM appointments WHERE user_id = ? ORDER BY date DESC, time DESC',
      [req.user.id]
    );
    res.json({ appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener citas' });
  }
});

router.post('/', auth, (req, res) => {
  try {
    const { advisor_name, date, time, notes } = req.body;

    if (!advisor_name || !date || !time) {
      return res.status(400).json({ error: 'Asesor, fecha y hora son requeridos' });
    }

    const result = execute(
      'INSERT INTO appointments (user_id, advisor_name, date, time, notes) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, advisor_name, date, time, notes || null]
    );

    const appointment = queryOne('SELECT * FROM appointments WHERE id = ?', [result.lastInsertRowid]);
    res.json({ appointment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear cita' });
  }
});

router.put('/:id', auth, (req, res) => {
  try {
    const appointment = queryOne('SELECT * FROM appointments WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    const { advisor_name, date, time, status, notes } = req.body;

    execute(
      `UPDATE appointments SET
        advisor_name = ?,
        date = ?,
        time = ?,
        status = ?,
        notes = ?
      WHERE id = ?`,
      [
        advisor_name || appointment.advisor_name,
        date || appointment.date,
        time || appointment.time,
        status || appointment.status,
        notes !== undefined ? notes : appointment.notes,
        req.params.id
      ]
    );

    const updated = queryOne('SELECT * FROM appointments WHERE id = ?', [req.params.id]);
    res.json({ appointment: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar cita' });
  }
});

router.delete('/:id', auth, (req, res) => {
  try {
    const appointment = queryOne('SELECT * FROM appointments WHERE id = ? AND user_id = ?', [req.params.id, req.user.id]);
    if (!appointment) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }

    execute('DELETE FROM appointments WHERE id = ?', [req.params.id]);
    res.json({ message: 'Cita eliminada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar cita' });
  }
});

module.exports = router;
