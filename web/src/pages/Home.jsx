import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'

const categories = [
  { id: 'health', name: 'Salud', desc: 'Cobertura m&eacute;dica completa para ti y tu familia', color: '#1e40af' },
  { id: 'auto', name: 'Auto', desc: 'Protecci&oacute;n para tu veh&iacute;culo', color: '#1e40af' },
  { id: 'home', name: 'Hogar', desc: 'Seguridad y tranquilidad para tu hogar', color: '#1e40af' },
  { id: 'life', name: 'Vida', desc: 'Protecci&oacute;n financiera familiar', color: '#1e40af' },
  { id: 'travel', name: 'Viajes', desc: 'Asistencia en viajes nacionales e internacionales', color: '#1e40af' },
  { id: 'student', name: 'Estudiantes', desc: 'Planes exclusivos para tu vida estudiantil', color: '#1e40af' },
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
    { text: 'SeguroPro me dio la tranquilidad que necesitaba. Su servicio al cliente es excepcional y el proceso de contrataci&oacute;n fue muy sencillo.', name: 'Roberto M&eacute;ndez', plan: 'Seguro de Salud' },
    { text: 'Como estudiante, encontrar un seguro accesible era dif&iacute;cil hasta que conoc&iacute; SeguroPro. altamente recomendado.', name: 'Laura Castillo', plan: 'Seguro Estudiantil' },
    { text: 'Contratar una p&oacute;liza fue muy f&aacute;cil. En minutos ten&iacute;a mi seguro activo y el soporte ha sido excelente.', name: 'Pedro Ram&iacute;rez', plan: 'Seguro de Auto' },
  ]

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">Confianza y Seguridad</div>
          <h1>Protegemos lo que m&aacute;s te importa</h1>
          <p>Planes de seguro dise&ntilde;ados para ti, tu familia y tus estudios. Cotiza en segundos y obt&eacute;n cobertura inmediata.</p>
          <div className="hero-actions">
            <Link to="/quote" className="btn btn-primary btn-lg">Cotiza Ahora</Link>
            <Link to="/plans" className="btn btn-outline btn-lg">Ver Planes</Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>50K+</strong><span>Clientes Satisfechos</span></div>
            <div className="hero-stat"><strong>98%</strong><span>Tasa de Aprobaci&oacute;n</span></div>
            <div className="hero-stat"><strong>24/7</strong><span>Soporte</span></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-tag">Productos</span>
          <h2>Tipos de Seguro</h2>
          <p>Encuentra la cobertura perfecta para cada aspecto de tu vida</p>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link to={`/plans?type=${cat.id}`} key={cat.id} className="category-card">
              <div className="category-icon" style={{ background: cat.color + '12', color: cat.color }}>{cat.name[0]}</div>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {popularPlans.length > 0 && (
        <section className="section">
          <div className="section-header">
            <span className="section-tag">Populares</span>
            <h2>Planes Destacados</h2>
            <p>Los planes m&aacute;s elegidos por nuestros clientes</p>
          </div>
          <div className="plans-grid">
            {popularPlans.map(plan => (
              <Link to={`/plans?type=${plan.type}`} key={plan.id} className="plan-card-featured">
                <div className="plan-card-badge">Popular</div>
                <div className="plan-card-icon" style={{ background: plan.color + '15', color: plan.color }}>{plan.name[0]}</div>
                <h3>{plan.name}</h3>
                <p className="plan-card-desc">{plan.description}</p>
                <div className="plan-card-price">${plan.price}<span>/mes</span></div>
                <div className="plan-card-benefits">
                  {plan.benefits?.split(',').slice(0, 3).map((b, i) => (
                    <span key={i} className="benefit-tag">{b.trim()}</span>
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

      <section className="section">
        <div className="students-section">
          <div className="students-text">
            <span className="section-tag">Estudiantes</span>
            <h2>Planes Especiales para Estudiantes</h2>
            <p>Sabemos lo importante que es tu educaci&oacute;n. Por eso creamos planes accesibles con coberturas dise&ntilde;adas para tu vida estudiantil.</p>
            <ul className="students-features">
              <li>Seguro para laptop y equipos electr&oacute;nicos</li>
              <li>Asistencia m&eacute;dica b&aacute;sica</li>
              <li>Descuentos en librer&iacute;as y cursos</li>
              <li>Orientaci&oacute;n vocacional incluida</li>
              <li>Desde $9.99/mes</li>
            </ul>
            <Link to="/plans/student" className="btn btn-primary">Ver Planes Estudiantiles</Link>
          </div>
          <div className="students-image">
            <span className="students-illustration">Estudiantes</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="quote-preview-card">
          <div className="quote-preview-text">
            <h2>&iquest;Cu&aacute;nto cuesta tu seguro?</h2>
            <p>Calcula tu cotizaci&oacute;n en segundos. Solo dinos qu&eacute; necesitas proteger y te daremos el mejor precio.</p>
            <Link to="/quote" className="btn btn-primary">Calcular Cotizaci&oacute;n</Link>
          </div>
          <div>
            <div className="calc-demo">
              <span className="calc-label">Cobertura: $50,000</span>
              <div className="calc-bar"><div className="calc-fill" style={{ width: '70%' }}></div></div>
              <span className="calc-label">Desde: <strong>$29.99/mes</strong></span>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-tag">Asesores</span>
          <h2>Habla con un Experto</h2>
          <p>Agenda una cita con nuestros asesores certificados</p>
        </div>
        <div className="advisors-grid">
          <div className="advisor-card">
            <h3>Mar&iacute;a Garc&iacute;a</h3>
            <p className="advisor-role">Asesora Senior</p>
            <p className="advisor-exp">12 a&ntilde;os de experiencia</p>
            <Link to="/appointment" className="btn btn-outline btn-sm">Agendar Cita</Link>
          </div>
          <div className="advisor-card">
            <h3>Carlos L&oacute;pez</h3>
            <p className="advisor-role">Especialista en Salud</p>
            <p className="advisor-exp">8 a&ntilde;os de experiencia</p>
            <Link to="/appointment" className="btn btn-outline btn-sm">Agendar Cita</Link>
          </div>
          <div className="advisor-card">
            <h3>Ana Mart&iacute;nez</h3>
            <p className="advisor-role">Asesora Estudiantil</p>
            <p className="advisor-exp">5 a&ntilde;os de experiencia</p>
            <Link to="/appointment" className="btn btn-outline btn-sm">Agendar Cita</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-tag">Testimonios</span>
          <h2>Lo que dicen nuestros clientes</h2>
        </div>
        <div className="testimonial-card">
          <p className="testimonial-text">&ldquo;{testimonials[testimonialIndex].text}&rdquo;</p>
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

      <section className="section">
        <div className="cta-card">
          <h2>Protege tu futuro hoy</h2>
          <p>&Uacute;nete a m&aacute;s de 50,000 clientes que conf&iacute;an en nosotros</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg">Crear Cuenta Gratis</Link>
            <Link to="/appointment" className="btn btn-outline btn-lg">Hablar con Asesor</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
