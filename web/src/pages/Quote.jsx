import { useState } from 'react'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const planTypes = [
  { value: 'health', label: 'Salud', color: '#1e40af' },
  { value: 'auto', label: 'Auto', color: '#1e40af' },
  { value: 'home', label: 'Hogar', color: '#1e40af' },
  { value: 'life', label: 'Vida', color: '#1e40af' },
  { value: 'travel', label: 'Viajes', color: '#1e40af' },
  { value: 'student', label: 'Estudiante', color: '#0d9488' },
]

export default function Quote() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ plan_type: 'health', coverage_amount: 50000, age: 25 })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    setLoading(true)
    setError('')
    try {
      const data = await api.getQuote(form)
      setResult(data.quote)
      setStep(3)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page quote-page">
      <section className="page-header">
        <h1>Cotizador</h1>
        <p>Calcula tu prima en segundos</p>
      </section>

      <div className="quote-steps">
        <div className={`quote-step ${step >= 1 ? 'active' : ''}`}>
          <div className="step-num">1</div>
          <span>Tipo de Seguro</span>
        </div>
        <div className={`quote-step ${step >= 2 ? 'active' : ''}`}>
          <div className="step-num">2</div>
          <span>Detalles</span>
        </div>
        <div className={`quote-step ${step >= 3 ? 'active' : ''}`}>
          <div className="step-num">3</div>
          <span>Resultado</span>
        </div>
      </div>

      {step === 1 && (
        <div className="quote-type-select">
          <h2>&iquest;Qu&eacute; tipo de seguro necesitas?</h2>
          <div className="type-grid">
            {planTypes.map(pt => (
              <button
                key={pt.value}
                className={`type-card ${form.plan_type === pt.value ? 'selected' : ''}`}
                onClick={() => { setForm({ ...form, plan_type: pt.value }); setStep(2) }}
              >
                <span className="type-label">{pt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className="quote-form">
          <h2>Completa los detalles</h2>

          <div className="form-group">
            <label>Tipo de seguro</label>
            <div className="form-selected-type">
              <span>{planTypes.find(p => p.value === form.plan_type)?.label}</span>
              <button type="button" className="btn-link" onClick={() => setStep(1)}>Cambiar</button>
            </div>
          </div>

          <div className="form-group">
            <label>Monto de cobertura deseado</label>
            <div className="coverage-slider">
              <input
                type="range"
                min={10000}
                max={500000}
                step={10000}
                value={form.coverage_amount}
                onChange={(e) => setForm({ ...form, coverage_amount: parseInt(e.target.value) })}
              />
              <div className="coverage-value">${form.coverage_amount.toLocaleString()}</div>
            </div>
          </div>

          <div className="form-group">
            <label>Tu edad</label>
            <input
              type="number"
              min={1}
              max={100}
              value={form.age}
              onChange={(e) => setForm({ ...form, age: parseInt(e.target.value) || 0 })}
              className="form-input"
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Calculando...' : 'Calcular Cotizaci&oacute;n'}
          </button>
        </form>
      )}

      {step === 3 && result && (
        <div className="quote-result">
          <div className="result-card">
            <div className="result-header">
              <h2>Tu Cotizaci&oacute;n</h2>
            </div>
            <div className="result-amounts">
              <div className="result-amount">
                <span className="amount-label">Pago Mensual</span>
                <span className="amount-value">${result.monthly_premium.toFixed(2)}</span>
              </div>
              <div className="result-amount">
                <span className="amount-label">Pago Anual</span>
                <span className="amount-value">${result.annual_premium.toFixed(2)}</span>
              </div>
            </div>
            <div className="result-details">
              <div className="result-detail"><span>Tipo:</span> {planTypes.find(p => p.value === result.plan_type)?.label}</div>
              <div className="result-detail"><span>Cobertura:</span> ${result.coverage_amount.toLocaleString()}</div>
              <div className="result-detail"><span>Edad:</span> {result.age} a&ntilde;os</div>
              <div className="result-detail"><span>Tasa base:</span> {(result.details.base_rate * 100).toFixed(1)}%</div>
              <div className="result-detail"><span>Factor edad:</span> {result.details.age_factor.toFixed(2)}x</div>
            </div>
            <div className="result-actions">
              <button className="btn btn-primary" onClick={() => navigate('/appointment')}>Agendar Cita</button>
              <button className="btn btn-outline" onClick={() => { setStep(1); setResult(null) }}>Nueva Cotizaci&oacute;n</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
