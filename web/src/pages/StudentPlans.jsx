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
      <section className="page-header">
        <h1>Seguro Estudiantil</h1>
        <p>Planes dise&ntilde;ados espec&iacute;ficamente para tu vida universitaria</p>
      </section>

      <div className="student-header">
        <span className="student-badge">Para Estudiantes</span>
        <p>Protege tu equipo, tu salud y tu futuro acad&eacute;mico</p>
        <div className="student-benefits-bar">
          <div className="student-benefit">Equipo Electr&oacute;nico</div>
          <div className="student-benefit">Salud B&aacute;sica</div>
          <div className="student-benefit">Descuentos</div>
          <div className="student-benefit">Apoyo Psicol&oacute;gico</div>
          <div className="student-benefit">Orientaci&oacute;n</div>
        </div>
      </div>

      {loading ? (
        <div className="loading-screen"><div className="spinner"></div></div>
      ) : (
        <section className="section">
          <div className="plans-comparison">
            {plans.map((plan, idx) => (
              <div key={plan.id} className={`comparison-card ${plan.popular ? 'popular' : ''}`}>
                {plan.popular && <div className="popular-badge">M&aacute;s Popular</div>}
                <div className="comparison-icon" style={{ background: plan.color + '15', color: plan.color }}>
                  {plan.name[0]}
                </div>
                <h3>{plan.name}</h3>
                <div className="comparison-price">${plan.price}<span>/mes</span></div>
                <div className="comparison-features">
                  {plan.coverage?.split(',').map((c, i) => (
                    <div key={i} className="comparison-feature">{c.trim()}</div>
                  ))}
                </div>
                <div className="comparison-features">
                  <h4>Beneficios adicionales</h4>
                  {plan.benefits?.split(',').map((b, i) => (
                    <div key={i} className="comparison-feature">{b.trim()}</div>
                  ))}
                </div>
                <Link to="/quote" className="btn btn-primary">
                  Contratar Ahora
                </Link>
              </div>
            ))}
          </div>

          <div className="student-extra">
            <h2>Beneficios exclusivos para estudiantes</h2>
            <div className="extra-grid">
              <div className="extra-card">
                <h3>Seguro de Laptop</h3>
                <p>Cobertura contra da&ntilde;o accidental, robo y fallas t&eacute;cnicas de tu equipo de estudio.</p>
              </div>
              <div className="extra-card">
                <h3>Descuentos Educativos</h3>
                <p>Accede a descuentos en librer&iacute;as, cursos online y plataformas de aprendizaje.</p>
              </div>
              <div className="extra-card">
                <h3>Bienestar Estudiantil</h3>
                <p>Apoyo psicol&oacute;gico, orientaci&oacute;n vocacional y programas de bienestar emocional.</p>
              </div>
              <div className="extra-card">
                <h3>Asistencia 24/7</h3>
                <p>Soporte m&eacute;dico telef&oacute;nico y asistencia en emergencias las 24 horas del d&iacute;a.</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
