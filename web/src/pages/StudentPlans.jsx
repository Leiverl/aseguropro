import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

export default function StudentPlans() {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.getStudentPlans()
      .then(data => setPlans(data.plans))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="page student-page">
      <section className="page-header student-header">
        <div className="student-header-content">
          <span className="student-badge">🎓 Para Estudiantes</span>
          <h1>Seguro <span className="gradient-text">Estudiantil</span></h1>
          <p>Planes diseñados específicamente para tu vida universitaria. Protege tu equipo, tu salud y tu futuro académico.</p>
        </div>
        <div className="student-benefits-bar">
          <div className="student-benefit"><span>💻</span> Equipo Electrónico</div>
          <div className="student-benefit"><span>🏥</span> Salud Básica</div>
          <div className="student-benefit"><span>📚</span> Descuentos</div>
          <div className="student-benefit"><span>🧠</span> Apoyo Psicológico</div>
          <div className="student-benefit"><span>🎯</span> Orientación</div>
        </div>
      </section>

      {loading ? (
        <div className="loading-screen"><div className="spinner"></div></div>
      ) : (
        <section className="section">
          <div className="plans-comparison">
            {plans.map((plan, idx) => (
              <div key={plan.id} className={`comparison-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">Más Popular</div>}
                <div className="comparison-header">
                  <div className="comparison-icon" style={{ background: plan.color + '20' }}>🎓</div>
                  <h3>{plan.name}</h3>
                  <div className="comparison-price">${plan.price}<span>/mes</span></div>
                </div>
                <div className="comparison-features">
                  {plan.coverage?.split(',').map((c, i) => (
                    <div key={i} className="comparison-feature">✓ {c.trim()}</div>
                  ))}
                </div>
                <div className="comparison-features">
                  <h4>Beneficios adicionales:</h4>
                  {plan.benefits?.split(',').map((b, i) => (
                    <div key={i} className="comparison-feature">★ {b.trim()}</div>
                  ))}
                </div>
                <Link to="/quote" className="btn btn-primary" style={idx === 1 ? {} : { background: plan.color }}>
                  Contratar Ahora
                </Link>
              </div>
            ))}
          </div>

          <div className="student-extra">
            <h2>Beneficios exclusivos para estudiantes</h2>
            <div className="extra-grid">
              <div className="extra-card">
                <div className="extra-icon">💻</div>
                <h3>Seguro de Laptop</h3>
                <p>Cobertura contra daño accidental, robo y fallas técnicas de tu equipo de estudio.</p>
              </div>
              <div className="extra-card">
                <div className="extra-icon">📖</div>
                <h3>Descuentos Educativos</h3>
                <p>Accede a descuentos en librerías, cursos online, y plataformas de aprendizaje.</p>
              </div>
              <div className="extra-card">
                <div className="extra-icon">🧘</div>
                <h3>Bienestar Estudiantil</h3>
                <p>Apoyo psicológico, orientación vocacional y programas de bienestar emocional.</p>
              </div>
              <div className="extra-card">
                <div className="extra-icon">🚑</div>
                <h3>Asistencia 24/7</h3>
                <p>Soporte médico telefónico y asistencia en emergencias las 24 horas del día.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
