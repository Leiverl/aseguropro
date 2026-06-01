import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { api } from '../api'

const typeNames = { health: 'Salud', auto: 'Auto', home: 'Hogar', life: 'Vida', travel: 'Viajes', student: 'Estudiantes' }
const typeIcons = { health: '🏥', auto: '🚗', home: '🏠', life: '👨‍👩‍👧‍👦', travel: '✈️', student: '🎓' }
const typeColors = { health: '#ef4444', auto: '#3b82f6', home: '#22c55e', life: '#a855f7', travel: '#f59e0b', student: '#06b6d4' }

export default function Plans() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const activeType = searchParams.get('type') || ''

  useEffect(() => {
    setLoading(true)
    api.getPlans(activeType || undefined)
      .then(data => setPlans(data.plans))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [activeType])

  return (
    <div className="page plans-page">
      <section className="page-header">
        <h1>Nuestros Planes</h1>
        <p>Encuentra la cobertura perfecta para ti</p>
      </section>

      <div className="plans-filter">
        <button className={`filter-btn ${activeType === '' ? 'active' : ''}`} onClick={() => setSearchParams({})}>
          Todos
        </button>
        {Object.entries(typeNames).map(([key, name]) => (
          <button
            key={key}
            className={`filter-btn ${activeType === key ? 'active' : ''}`}
            style={activeType === key ? { background: typeColors[key], borderColor: typeColors[key] } : {}}
            onClick={() => setSearchParams({ type: key })}
          >
            {typeIcons[key]} {name}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="loading-screen"><div className="spinner"></div></div>
      ) : (
        <div className="plans-list">
          {plans.map(plan => (
            <div key={plan.id} className="plan-card-full" style={{ '--plan-color': plan.color }}>
              {plan.popular ? <div className="plan-card-badge">Más contratado</div> : null}
              <div className="plan-card-header">
                <div className="plan-card-icon" style={{ background: plan.color + '20' }}>
                  {getPlanIcon(plan.icon)}
                </div>
                <div>
                  <h3>{plan.name}</h3>
                  <span className="plan-type-badge" style={{ background: plan.color + '20', color: plan.color }}>
                    {typeIcons[plan.type]} {typeNames[plan.type]}
                  </span>
                </div>
              </div>
              <p className="plan-desc">{plan.description}</p>
              <div className="plan-price-big">${plan.price}<span>/mes</span></div>
              <div className="plan-details">
                <div className="plan-detail-section">
                  <h4>Cobertura</h4>
                  <ul>{plan.coverage?.split(',').map((c, i) => <li key={i}>✓ {c.trim()}</li>)}</ul>
                </div>
                <div className="plan-detail-section">
                  <h4>Beneficios</h4>
                  <ul>{plan.benefits?.split(',').map((b, i) => <li key={i}>✓ {b.trim()}</li>)}</ul>
                </div>
              </div>
              <div className="plan-card-actions">
                <Link to="/quote" className="btn btn-primary">Cotizar</Link>
                <Link to="/appointment" className="btn btn-outline">Agendar Cita</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function getPlanIcon(icon) {
  const icons = { 'heart': '🏥', 'car': '🚗', 'home': '🏠', 'users': '👨‍👩‍👧‍👦', 'plane': '✈️', 'graduation-cap': '🎓' }
  return icons[icon] || '🛡️'
}
