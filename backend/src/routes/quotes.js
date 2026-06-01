const express = require('express');
const { execute } = require('../database');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, (req, res) => {
  try {
    const { plan_type, coverage_amount, age } = req.body;

    if (!plan_type || !coverage_amount || !age) {
      return res.status(400).json({ error: 'Tipo de plan, monto de cobertura y edad son requeridos' });
    }

    const amount = parseFloat(coverage_amount);
    const userAge = parseInt(age);

    let baseRate = 0.02;
    if (plan_type === 'student') baseRate = 0.015;
    else if (plan_type === 'life') baseRate = 0.01;
    else if (plan_type === 'health') baseRate = 0.025;
    else if (plan_type === 'auto') baseRate = 0.03;
    else if (plan_type === 'home') baseRate = 0.008;
    else if (plan_type === 'travel') baseRate = 0.005;

    let ageFactor = 1;
    if (userAge < 25) ageFactor = 0.8;
    else if (userAge < 40) ageFactor = 1;
    else if (userAge < 55) ageFactor = 1.2;
    else ageFactor = 1.5;

    const annualResult = amount * baseRate * ageFactor;
    const monthlyResult = annualResult / 12;

    execute(
      'INSERT INTO quotes (user_id, plan_type, coverage_amount, age, result) VALUES (?, ?, ?, ?, ?)',
      [req.user.id, plan_type, amount, userAge, Math.round(monthlyResult * 100) / 100]
    );

    res.json({
      quote: {
        plan_type,
        coverage_amount: amount,
        age: userAge,
        monthly_premium: Math.round(monthlyResult * 100) / 100,
        annual_premium: Math.round(annualResult * 100) / 100,
        details: {
          base_rate: baseRate,
          age_factor: ageFactor
        }
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al calcular cotización' });
  }
});

module.exports = router;
