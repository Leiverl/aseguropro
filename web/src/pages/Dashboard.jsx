import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [policies, setPolicies] = useState([])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      api.getPolicies().catch(() => ({ policies: [] })),
      api.getAppointments().catch(() => ({ appointments: [] }))
    ]).then(([pData, aData]) => {
      setPolicies(pData.policies)
      setAppointments(aData.appointments)
    }).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="page"><div className="loading-screen"><div className="spinner"></div></div></div>

  return (
    <div className="page dashboard-page">
      <section className="dashboard-header">
        <div className="dashboard-welcome">
          <div className="welcome-avatar">{user.name[0]}</div>
          <div>
            <h1>Bienvenido, {user.name}</h1>
            <p>{user.email}</p>
          </div>
        </div>
        <div className="dashboard-stats">
          <div className="stat-card">
            <span className="stat-value">{policies.length}</span>
            <span className="stat-label">Pólizas Activas</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{appointments.filter(a => a.status === 'pending').length}</span>
            <span className="stat-label">Citas Pendientes</span>
          </div>
        </div>
      </section>

      <div className="dashboard-grid">
        <section className="dashboard-section">
          <div className="section-title-row">
            <h2>Mis Pólizas</h2>
            <Link to="/plans" className="btn btn-outline btn-sm">Contratar</Link>
          </div>
          {policies.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📋</span>
              <p>Aún no tienes pólizas activas</p>
              <Link to="/plans" className="btn btn-primary">Ver Planes</Link>
            </div>
          ) : (
            <div className="policies-list">
              {policies.map(p => (
                <div key={p.id} className="policy-card">
                  <div className="policy-icon" style={{ background: (p.color || '#3b82f6') + '20' }}>
                    {getPlanIcon(p.icon)}
                  </div>
                  <div className="policy-info">
                    <h3>{p.plan_name}</h3>
                    <span className="policy-type">{p.plan_type}</span>
                    <div className="policy-dates">
                      <span>Desde: {p.start_date}</span>
                      <span>Hasta: {p.end_date}</span>
                    </div>
                  </div>
                  <div className="policy-status">
                    <span className={`status-badge ${p.status}`}>{p.status === 'active' ? 'Activa' : p.status}</span>
                    <span className="policy-price">${p.price}/mes</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="dashboard-section">
          <div className="section-title-row">
            <h2>Mis Citas</h2>
            <Link to="/appointment" className="btn btn-outline btn-sm">Agendar</Link>
          </div>
          {appointments.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📅</span>
              <p>No tienes citas agendadas</p>
              <Link to="/appointment" className="btn btn-primary">Agendar Cita</Link>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.slice(0, 5).map(apt => (
                <div key={apt.id} className={`appointment-card status-${apt.status}`}>
                  <div className="apt-header">
                    <span className="apt-advisor">{apt.advisor_name}</span>
                    <span className={`apt-status status-${apt.status}`}>
                      {apt.status === 'pending' ? 'Pendiente' : apt.status}
                    </span>
                  </div>
                  <div className="apt-details">
                    <span>📅 {apt.date}</span>
                    <span>⏰ {apt.time}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="dashboard-actions">
        <Link to="/quote" className="action-card">
          <span className="action-icon">💰</span>
          <h3>Cotizar</h3>
          <p>Calcula tu prima personalizada</p>
        </Link>
        <Link to="/appointment" className="action-card">
          <span className="action-icon">📞</span>
          <h3>Agendar Cita</h3>
          <p>Habla con un asesor</p>
        </Link>
        <Link to="/plans" className="action-card">
          <span className="action-icon">📋</span>
          <h3>Ver Planes</h3>
          <p>Explora todas las coberturas</p>
        </Link>
      </section>
    </div>
  )
}

function getPlanIcon(icon) {
  const icons = { 'heart': '🏥', 'car': '🚗', 'home': '🏠', 'users': '👨‍👩‍👧‍👦', 'plane': '✈️', 'graduation-cap': '🎓' }
  return icons[icon] || '🛡️'
}
