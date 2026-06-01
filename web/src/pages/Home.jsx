import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

const categories = [
  { id: 'health', name: 'Salud', icon: '🏥', desc: 'Cobertura médica completa', color: '#ef4444' },
  { id: 'auto', name: 'Auto', icon: '🚗', desc: 'Protección para tu vehículo', color: '#3b82f6' },
  { id: 'home', name: 'Hogar', icon: '🏠', desc: 'Seguridad para tu hogar', color: '#22c55e' },
  { id: 'life', name: 'Vida', icon: '👨‍👩‍👧‍👦', desc: 'Protección familiar', color: '#a855f7' },
  { id: 'travel', name: 'Viajes', icon: '✈️', desc: 'Asistencia en viajes', color: '#f59e0b' },
  { id: 'student', name: 'Estudiantes', icon: '🎓', desc: 'Planes exclusivos', color: '#06b6d4' },
]

const advisors = [
  { name: 'María García', role: 'Asesora Senior', exp: '12 años', rating: 4.9, img: '👩‍💼' },
  { name: 'Carlos López', role: 'Especialista en Salud', exp: '8 años', rating: 4.8, img: '👨‍💼' },
  { name: 'Ana Martínez', role: 'Asesora Estudiantil', exp: '5 años', rating: 4.7, img: '👩‍💼' },
]

export default function Home() {
  const [popularPlans, setPopularPlans] = useState([])
  const [testimonialIndex, setTestimonialIndex] = useState(0)

  useEffect(() => {
    api.getPlans().then(data => {
      setPopularPlans(data.plans.filter(p => p.popular).slice(0, 4))
    }).catch(() => {})
  }, [])

  const testimonials = [
    { text: 'SeguroPro me dio la tranquilidad que necesitaba. Su servicio al cliente es excepcional.', name: 'Roberto Méndez', plan: 'Seguro de Salud' },
    { text: 'Como estudiante, el plan Estudiante Completo me salvó cuando se dañó mi laptop. 100% recomendado.', name: 'Laura Castillo', plan: 'Seguro Estudiantil' },
    { text: 'Contratar una póliza fue muy fácil. En minutos tenía mi seguro de auto activo.', name: 'Pedro Ramírez', plan: 'Seguro de Auto' },
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-bg-pattern"></div>
        <div className="hero-content">
          <div className="hero-badge">Confianza y Seguridad</div>
          <h1>Protegemos lo que <span className="gradient-text">más te importa</span></h1>
          <p>Planes de seguro diseñados para ti, tu familia y tus estudios. Cotiza en segundos y obtén cobertura inmediata.</p>
          <div className="hero-actions">
            <Link to="/quote" className="btn btn-primary btn-lg">Cotiza Ahora</Link>
            <Link to="/plans" className="btn btn-outline btn-lg">Ver Planes</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>50K+</strong> Clientes Satisfechos</div>
            <div className="hero-stat"><strong>98%</strong> Tasa de Aprobación</div>
            <div className="hero-stat"><strong>24/7</strong> Soporte</div>
          </div>
        </div>
      </section>

      <section className="section categories-section">
        <div className="section-header">
          <span className="section-tag">Nuestros Productos</span>
          <h2>Tipos de Seguro</h2>
          <p>Encuentra la cobertura perfecta para cada aspecto de tu vida</p>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link to={`/plans?type=${cat.id}`} key={cat.id} className="category-card" style={{ '--cat-color': cat.color }}>
              <div className="category-icon">{cat.icon}</div>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {popularPlans.length > 0 && (
        <section className="section plans-section">
          <div className="section-header">
            <span className="section-tag">Más Populares</span>
            <h2>Planes Destacados</h2>
            <p>Los planes más elegidos por nuestros clientes</p>
          </div>
          <div className="plans-grid">
            {popularPlans.map(plan => (
              <Link to={`/plans?type=${plan.type}`} key={plan.id} className="plan-card-featured" style={{ '--plan-color': plan.color }}>
                <div className="plan-card-badge">Popular</div>
                <div className="plan-card-icon" style={{ background: plan.color + '20' }}>{getPlanIcon(plan.icon)}</div>
                <h3>{plan.name}</h3>
                <p className="plan-card-desc">{plan.description}</p>
                <div className="plan-card-price">${plan.price}<span>/mes</span></div>
                <div className="plan-card-benefits">
                  {plan.benefits?.split(',').slice(0, 3).map((b, i) => (
                    <span key={i} className="benefit-tag">✓ {b.trim()}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/plans" className="btn btn-primary">Ver Todos los Planes</Link>
          </div>
        </section>
      )}

      <section className="section students-section">
        <div className="students-content">
          <div className="students-text">
            <span className="section-tag">Para Estudiantes</span>
            <h2>Planes Especiales para <span className="gradient-text">Estudiantes</span></h2>
            <p>Sabemos lo importante que es tu educación. Por eso creamos planes accesibles con coberturas diseñadas para tu vida estudiantil.</p>
            <ul className="students-features">
              <li>✓ Seguro para laptop y equipos electrónicos</li>
              <li>✓ Asistencia médica básica</li>
              <li>✓ Descuentos en librerías y cursos</li>
              <li>✓ Orientación vocacional incluida</li>
              <li>✓ Desde $9.99/mes</li>
            </ul>
            <Link to="/plans/student" className="btn btn-primary btn-lg">Ver Planes Estudiantiles</Link>
          </div>
          <div className="students-image">
            <div className="students-illustration">🎓</div>
          </div>
        </div>
      </section>

      <section className="section quote-preview">
        <div className="quote-preview-card">
          <div className="quote-preview-text">
            <h2>¿Cuánto cuesta tu seguro?</h2>
            <p>Calcula tu cotización en segundos. Solo dinos qué necesitas proteger y te daremos el mejor precio.</p>
            <Link to="/quote" className="btn btn-primary btn-lg">Calcular Cotización</Link>
          </div>
          <div className="quote-preview-calc">
            <div className="calc-demo">
              <span className="calc-label">Cobertura: $50,000</span>
              <div className="calc-bar"><div className="calc-fill" style={{ width: '70%' }}></div></div>
              <span className="calc-label">Desde: <strong>$29.99/mes</strong></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section advisors-section">
        <div className="section-header">
          <span className="section-tag">Asesores</span>
          <h2>Habla con un Experto</h2>
          <p>Agenda una cita con nuestros asesores certificados</p>
        </div>
        <div className="advisors-grid">
          {advisors.map(adv => (
            <div key={adv.name} className="advisor-card">
              <div className="advisor-avatar">{adv.img}</div>
              <h3>{adv.name}</h3>
              <p className="advisor-role">{adv.exp}</p>
              <p className="advisor-exp">{adv.exp}</p>
              <div className="advisor-rating">⭐ {adv.rating}</div>
              <Link to="/appointment" className="btn btn-outline btn-sm">Agendar Cita</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="section-header">
          <span className="section-tag">Testimonios</span>
          <h2>Lo que dicen nuestros clientes</h2>
        </div>
        <div className="testimonial-card">
          <p className="testimonial-text">"{testimonials[testimonialIndex].text}"</p>
          <div className="testimonial-author">
            <div className="testimonial-avatar">{testimonials[testimonialIndex].name[0]}</div>
            <div>
              <strong>{testimonials[testimonialIndex].name}</strong>
              <span>{testimonials[testimonialIndex].plan}</span>
            </div>
          </div>
          <div className="testimonial-nav">
            {testimonials.map((_, i) => (
              <button key={i} className={`dot ${i === testimonialIndex ? 'active' : ''}`} onClick={() => setTestimonialIndex(i)} />
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-section">
        <div className="cta-card">
          <h2>Protege tu futuro hoy</h2>
          <p>Únete a más de 50,000 clientes que confían en nosotros</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Crear Cuenta Gratis</Link>
            <Link to="/appointment" className="btn btn-outline btn-lg">Hablar con Asesor</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function getPlanIcon(icon) {
  const icons = {
    'heart': '🏥',
    'car': '🚗',
    'home': '🏠',
    'users': '👨‍👩‍👧‍👦',
    'plane': '✈️',
    'graduation-cap': '🎓',
  }
  return icons[icon] || '🛡️'
}
