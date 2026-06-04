import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

const responses = [
  { keywords: ['hola', 'buenas', 'buen', 'saludos', 'hey', 'qué tal'], response: '¡Hola! Soy el asistente virtual de SeguroPro. Estoy aquí para ayudarte con tus dudas sobre seguros. ¿En qué puedo ayudarte hoy?' },
  { keywords: ['plan', 'seguro', 'producto', 'tipo', 'ofrece', 'ramo'], response: 'Ofrecemos 6 tipos de seguro:\n\n• Salud: cobertura médica desde $29.99/mes\n• Auto: protección vehicular desde $39.99/mes\n• Hogar: seguridad para tu casa desde $24.99/mes\n• Vida: protección familiar desde $19.99/mes\n• Viajes: asistencia en viajes desde $14.99/mes\n• Estudiantes: planes desde $9.99/mes\n\n¿Sobre cuál te gustaría saber más?' },
  { keywords: ['salud', 'médico', 'hospital', 'consulta', 'medicamento'], response: 'Nuestros planes de Salud incluyen:\n\n🏥 **Salud Esencial** - $29.99/mes\nConsultas ilimitadas, medicamentos genéricos, exámenes básicos.\n\n🏥 **Salud Premium** - $59.99/mes\nHospitalización, especialistas, cirugías, cobertura internacional.\n\nAmbos incluyen acceso a nuestra red de médicos.' },
  { keywords: ['auto', 'carro', 'vehículo', 'automóvil', 'coche'], response: 'Nuestros planes de Auto:\n\n🚗 **Auto Básico** - $39.99/mes\nDaños a terceros, responsabilidad civil, asistencia en carretera.\n\n🚗 **Auto Total** - $79.99/mes\nCobertura completa: robo, incendio, todo riesgo, cristales.\n\nAmbos incluyen asistencia 24/7.' },
  { keywords: ['hogar', 'casa', 'departamento', 'vivienda', 'propiedad'], response: 'Nuestros planes de Hogar:\n\n🏠 **Hogar Seguro** - $24.99/mes\nIncendio, robo, daños por agua, responsabilidad civil.\n\n🏠 **Hogar Plus** - $49.99/mes\nContenido del hogar, joyas, equipos electrónicos, obras de arte.' },
  { keywords: ['vida', 'fallecimiento', 'familia', 'familiar', 'invalidez'], response: 'Nuestros planes de Vida:\n\n👨‍👩‍👧‍👦 **Vida Tranquilidad** - $19.99/mes\nFallecimiento por cualquier causa, invalidez total.\n\n👨‍👩‍👧‍👦 **Vida Familiar** - $34.99/mes\nCobertura para toda la familia, enfermedades graves, apoyo educativo.' },
  { keywords: ['viaje', 'viajar', 'turista', 'vuelo', 'extranjero', 'internacional'], response: 'Nuestros planes de Viajes:\n\n✈️ **Viajero Seguro** - $14.99/mes\nEmergencias médicas, pérdida de equipaje, cancelación.\n\n✈️ **Viajero Global** - $29.99/mes\nCobertura mundial, deportes de aventura, repatriación, acceso a salas VIP.' },
  { keywords: ['estudiante', 'universitario', 'colegio', 'escuela', 'alumno', 'beca'], response: 'Planes especiales para estudiantes desde $9.99/mes:\n\n🎓 **Estudiante Básico** - $9.99/mes\nAccidentes personales, pérdida de útiles, tutorías.\n\n🎓 **Estudiante Completo** - $19.99/mes\nSalud básica, seguro de laptop, apoyo psicológico, orientación vocacional.\n\nAmbos incluyen descuentos en librerías y cursos.' },
  { keywords: ['precio', 'costo', 'cuánto', 'valor', 'premium', 'mensual', 'pago'], response: 'Nuestros precios van desde $9.99/mes (Estudiantes) hasta $79.99/mes (Auto Total).\n\nPodés usar nuestro cotizador para calcular la prima exacta según tu edad y cobertura deseada. ¡Solo te toma 30 segundos!' },
  { keywords: ['cotizar', 'cotización', 'calcular', 'prima', 'presupuesto'], response: 'Podés calcular tu cotización personalizada en segundos. Solo necesitamos:\n\n1. Tipo de seguro\n2. Monto de cobertura\n3. Tu edad\n\n¿Te gustaría que te lleve al cotizador?' },
  { keywords: ['cita', 'agendar', 'asesor', 'hablar', 'consultar', 'entrevista'], response: 'Podés agendar una cita con nuestros asesores expertos. Tenemos disponibles:\n\n• María García - Salud, Vida, Estudiantes\n• Carlos López - Salud, Auto\n• Ana Martínez - Estudiantes, Hogar\n• Roberto Díaz - Auto, Hogar, Viajes\n• Laura Sánchez - Vida, Salud, Viajes\n\n¿Te gustaría agendar una cita ahora?' },
  { keywords: ['contacto', 'teléfono', 'email', 'correo', 'llamar', 'dirección'], response: 'Podés contactarnos:\n\n📞 Teléfono: (555) 123-4567\n📧 Email: info@seguropro.com\n📍 Dirección: Av. Principal 123, Ciudad\n\nHorario de atención: Lun-Vie 9:00-18:00' },
  { keywords: ['horario', 'horas', 'abierto', 'atención', 'laboral'], response: 'Nuestro horario de atención es:\n\n• Lunes a Viernes: 9:00 - 18:00\n• Sábados: 9:00 - 13:00\n• Soporte telefónico 24/7 para emergencias' },
  { keywords: ['gracias', 'graci', 'agradezco', 'muchas gracias'], response: '¡A ti por confiar en SeguroPro! Si tienes más dudas, aquí estoy para ayudarte. 😊' },
  { keywords: ['adios', 'adiós', 'chao', 'bye', 'nos vemos', 'hasta luego'], response: '¡Hasta luego! Gracias por visitar SeguroPro. Que tengas un excelente día.' },
  { keywords: ['empresa', 'compañía', 'seguropro', 'sobre', 'quienes', 'historia'], response: 'SeguroPro es una compañía líder en seguros con más de 50,000 clientes satisfechos. Ofrecemos soluciones de protección para salud, auto, hogar, vida, viajes y estudiantes. Nuestra tasa de aprobación del 98% nos respalda.' },
  { keywords: ['contratar', 'comprar', 'adquirir', 'registrar', 'registrarme', 'registración'], response: 'Contratar es muy sencillo:\n\n1. Creá una cuenta gratuita\n2. Elegí el plan que necesites\n3 Completá tus datos\n4. ¡Listo! Tu cobertura comienza de inmediato\n\n¿Te gustaría crear una cuenta ahora?' },
  { keywords: ['cancelar', 'cancelación', 'baja', 'dar de baja'], response: 'Para cancelar una póliza o cita, podés hacerlo desde tu panel de control en "Mis Pólizas" o "Mis Citas". Si necesitás ayuda, contactanos al (555) 123-4567.' },
]

function findResponse(input) {
  const lower = input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  for (const item of responses) {
    if (item.keywords.some(k => lower.includes(k))) {
      return item.response
    }
  }
  return 'Gracias por tu consulta. No tengo una respuesta específica para eso, pero puedo ayudarte con información sobre planes, precios, citas y cotizaciones. ¿Podrías ser más específico?'
}

function formatMessage(text) {
  return text.split('\n').map((line, i) => {
    if (line.startsWith('**') && line.endsWith('**')) {
      return <strong key={i}>{line.slice(2, -2)}</strong>
    }
    const parts = line.split(/(?=\d\. |• |\n)/).filter(Boolean)
    return <span key={i}>{line}<br /></span>
  })
}

export default function Chatbot() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: '¡Hola! Soy el asistente de SeguroPro. ¿En qué puedo ayudarte?' }
  ])
  const [input, setInput] = useState('')
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [open])

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    const text = input.trim()
    if (!text) return
    setInput('')
    setMessages(prev => [...prev, { type: 'user', text }])
    setTimeout(() => {
      const reply = findResponse(text)
      setMessages(prev => [...prev, { type: 'bot', text: reply }])
    }, 400)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      <button className={`chatbot-toggle ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} aria-label={open ? 'Cerrar chat' : 'Abrir chat'}>
        {open ? '\u2715' : '\uD83D\uDCAC'}
      </button>

      <div className={`chatbot-panel ${open ? 'open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-header-info">
            <div className="chatbot-avatar">S</div>
            <div>
              <div className="chatbot-name">Asistente SeguroPro</div>
              <div className="chatbot-status">En l\u00ednea</div>
            </div>
          </div>
        </div>

        <div className="chatbot-messages" role="log" aria-live="polite" aria-label="Mensajes del chat">
          {messages.map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.type === 'user' ? 'user' : 'bot'}`}>
              <div className="chat-bubble">
                {typeof msg.text === 'string' ? formatMessage(msg.text) : msg.text}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        <div className="chatbot-input">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escrib\u00ed tu mensaje..."
            rows={1}
            className="chat-input-field"
          />
          <button className="chat-send-btn" onClick={handleSend} disabled={!input.trim()} aria-label="Enviar mensaje">
            {'\u27A4'}
          </button>
        </div>
      </div>
    </>
  )
}
