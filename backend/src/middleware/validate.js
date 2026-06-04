function required(...fields) {
  return (req, res, next) => {
    const missing = fields.filter((f) => {
      const val = req.body[f]
      return val === undefined || val === null || (typeof val === 'string' && val.trim() === '')
    })
    if (missing.length > 0) {
      return res.status(400).json({
        error: `Campos requeridos: ${missing.join(', ')}`
      })
    }
    next()
  }
}

module.exports = { required }
