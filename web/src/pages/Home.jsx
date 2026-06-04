import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api'
import { Icon } from '../components/Icon'

const categories = [
  { id: 'health', name: 'Salud', desc: 'Cobertura médica completa para ti y tu familia', color: '#1e40af', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80&auto=format' },
  { id: 'auto', name: 'Auto', desc: 'Protección para tu vehículo', color: '#1e40af', img: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&q=80&auto=format' },
  { id: 'home', name: 'Hogar', desc: 'Seguridad y tranquilidad para tu hogar', color: '#1e40af', img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80&auto=format' },
  { id: 'life', name: 'Vida', desc: 'Protección financiera familiar', color: '#1e40af', img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&q=80&auto=format' },
  { id: 'travel', name: 'Viajes', desc: 'Asistencia en viajes nacionales e internacionales', color: '#1e40af', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&q=80&auto=format' },
  { id: 'student', name: 'Estudiantes', desc: 'Planes exclusivos para tu vida estudiantil', color: '#1e40af', img: 'https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=400&q=80&auto=format' },
]

const advisors = [
  { name: 'María García', role: 'Asesora Senior', exp: '12 años', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80&auto=format' },
  { name: 'Carlos López', role: 'Especialista en Salud', exp: '8 años', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format' },
  { name: 'Ana Martínez', role: 'Asesora Estudiantil', exp: '5 años', img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&q=80&auto=format' },
]

const testimonials = [
  { text: 'VelmacSafe me dio la tranquilidad que necesitaba. Su servicio al cliente es excepcional y el proceso de contratación fue muy sencillo.', name: 'Roberto Méndez', plan: 'Seguro de Salud', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&auto=format' },
  { text: 'Como estudiante, encontrar un seguro accesible era difícil hasta que conocí VelmacSafe. Altamente recomendado.', name: 'Laura Castillo', plan: 'Seguro Estudiantil', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&auto=format' },
  { text: 'Contratar una póliza fue muy fácil. En minutos tenía mi seguro activo y el soporte ha sido excelente.', name: 'Pedro Ramírez', plan: 'Seguro de Auto', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&auto=format' },
]

export default function Home() {
  const [popularPlans, setPopularPlans] = useState([])
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [heroLoaded, setHeroLoaded] = useState(false)

  useEffect(() => {
    api.getPlans().then(data => {
      setPopularPlans(data.plans.filter(p => p.popular).slice(0, 4))
    }).catch(() => {})
  }, [])

  useEffect(() => {
    const img = new Image()
    img.src = 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80&auto=format'
    img.onload = () => setHeroLoaded(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTestimonialIndex(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <section className="hero">
        <div className={`hero-bg ${heroLoaded ? 'loaded' : ''}`}
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80&auto=format)` }}
          aria-hidden="true"
        />
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-badge">Confianza y Seguridad</div>
          <h1>Protegemos lo que<br />más te importa</h1>
          <p>Planes de seguro diseñados para ti, tu familia y tus estudios. Cotiza en segundos y obtén cobertura inmediata.</p>
          <div className="hero-actions">
            <Link to="/quote" className="btn btn-primary btn-lg hero-cta">
              Cotiza Ahora
              <span className="btn-icon-wrap"><Icon name="arrowRight" size={16} /></span>
            </Link>
            <Link to="/plans" className="btn btn-ghost btn-lg">
              Ver Planes
              <span className="btn-icon-wrap"><Icon name="chevronRight" size={16} /></span>
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat"><strong>50K+</strong><span>Clientes Satisfechos</span></div>
            <div className="hero-stat"><strong>98%</strong><span>Tasa de Aprobación</span></div>
            <div className="hero-stat"><strong>24/7</strong><span>Soporte</span></div>
          </div>
        </div>
      </section>

      <section className="section categories-section">
        <div className="section-header">
          <span className="section-tag">Productos</span>
          <h2>Tipos de Seguro</h2>
          <p>Encuentra la cobertura perfecta para cada aspecto de tu vida</p>
        </div>
        <div className="categories-grid">
          {categories.map(cat => (
            <Link to={`/plans?type=${cat.id}`} key={cat.id} className="category-card" style={{ '--card-img': `url(${cat.img})` }}>
              <div className="category-card-img" aria-hidden="true" />
              <div className="category-card-body">
                <div className="category-icon" style={{ background: cat.color + '18', color: cat.color }}>
                  <Icon name={cat.id === 'health' ? 'heart' : cat.id === 'auto' ? 'car' : cat.id === 'home' ? 'home' : cat.id === 'life' ? 'users' : cat.id === 'travel' ? 'plane' : 'graduation'} size={20} />
                </div>
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {popularPlans.length > 0 && (
        <section className="section plans-section">
          <div className="section-header">
            <span className="section-tag">Populares</span>
            <h2>Planes Destacados</h2>
            <p>Los planes más elegidos por nuestros clientes</p>
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
            <Link to="/plans" className="btn btn-primary btn-lg">
              Ver Todos los Planes
              <span className="btn-icon-wrap"><Icon name="arrowRight" size={16} /></span>
            </Link>
          </div>
        </section>
      )}

      <section className="section students-section-alt">
        <div className="students-content">
          <div className="students-text">
            <span className="section-tag">Estudiantes</span>
            <h2>Planes Especiales para Estudiantes</h2>
            <p>Sabemos lo importante que es tu educación. Por eso creamos planes accesibles con coberturas diseñadas para tu vida estudiantil.</p>
            <ul className="students-features">
              <li><Icon name="check" size={16} /> Seguro para laptop y equipos electrónicos</li>
              <li><Icon name="check" size={16} /> Asistencia médica básica</li>
              <li><Icon name="check" size={16} /> Descuentos en librerías y cursos</li>
              <li><Icon name="check" size={16} /> Orientación vocacional incluida</li>
              <li><Icon name="check" size={16} /> Desde $9.99/mes</li>
            </ul>
            <Link to="/plans/student" className="btn btn-primary">
              Ver Planes Estudiantiles
              <span className="btn-icon-wrap"><Icon name="arrowRight" size={16} /></span>
            </Link>
          </div>
          <div className="students-image-wrap">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c7f1?w=800&q=80&auto=format"
              alt="Estudiante universitario"
              loading="lazy"
              className="students-img"
            />
          </div>
        </div>
      </section>

      <section className="section quote-section">
        <div className="quote-preview-card">
          <div className="quote-preview-text">
            <span className="section-tag">Cotización</span>
            <h2>¿Cuánto cuesta tu seguro?</h2>
            <p>Calcula tu cotización en segundos. Solo dinos qué necesitas proteger y te daremos el mejor precio.</p>
            <Link to="/quote" className="btn btn-primary btn-lg">
              Calcular Cotización
              <span className="btn-icon-wrap"><Icon name="arrowRight" size={16} /></span>
            </Link>
          </div>
          <div className="quote-preview-visual">
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
              <div className="advisor-img-wrap">
                <img src={adv.img} alt={adv.name} loading="lazy" className="advisor-img" />
              </div>
              <h3>{adv.name}</h3>
              <p className="advisor-role">{adv.role}</p>
              <p className="advisor-exp">{adv.exp} de experiencia</p>
              <Link to="/appointment" className="btn btn-primary btn-sm">
                Agendar Cita
                <span className="btn-icon-wrap"><Icon name="chevronRight" size={14} /></span>
              </Link>
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
          <div className="testimonial-stars" aria-hidden="true">★★★★★</div>
          <p className="testimonial-text">&ldquo;{testimonials[testimonialIndex].text}&rdquo;</p>
          <div className="testimonial-author">
            <img
              src={testimonials[testimonialIndex].img}
              alt={testimonials[testimonialIndex].name}
              className="testimonial-avatar"
              loading="lazy"
            />
            <div>
              <strong>{testimonials[testimonialIndex].name}</strong>
              <span>{testimonials[testimonialIndex].plan}</span>
            </div>
          </div>
          <div className="testimonial-nav">
            {testimonials.map((_, i) => (
              <button key={i} className={`dot ${i === testimonialIndex ? 'active' : ''}`} onClick={() => setTestimonialIndex(i)} aria-label={`Testimonio ${i + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-bg" aria-hidden="true"
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80&auto=format)` }}
        />
        <div className="cta-overlay" />
        <div className="cta-card">
          <h2>Protege tu futuro hoy</h2>
          <p>Únete a más de 50,000 clientes que confían en nosotros</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Crear Cuenta Gratis
              <span className="btn-icon-wrap"><Icon name="arrowRight" size={16} /></span>
            </Link>
            <Link to="/appointment" className="btn btn-ghost btn-lg">
              Hablar con Asesor
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
