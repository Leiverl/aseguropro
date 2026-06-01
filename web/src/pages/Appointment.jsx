import { useState, useEffect } from 'react'
import { api } from '../api'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const advisors = [
  { name: 'María García', role: 'Asesora Senior', specialties: 'Salud, Vida, Estudiantes' },
  { name: 'Carlos López', role: 'Especialista en Salud', specialties: 'Salud, Auto' },
  { name: 'Ana Martínez', role: 'Asesora Estudiantil', specialties: 'Estudiantes, Hogar' },
  { name: 'Roberto Díaz', role: 'Asesor Multi-ramo', specialties: 'Auto, Hogar, Viajes' },
  { name: 'Laura Sánchez', role: 'Asesora de Vida', specialties: 'Vida, Salud, Viajes' },
]

const timeSlots = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30']

export default function Appointment() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ advisor_name: '', date: '', time: '', notes: '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const fetchAppointments = () => {
    if (!user) return
    api.getAppointments()
      .then(data => setAppointments(data.appointments))
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  useEffect(() => { fetchAppointments() }, [user])

  const minDate = new Date().toISOString().split('T')[0]

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    setError('')
    setSuccess('')
    try {
      await api.createAppointment(form)
      setSuccess('Cita agendada correctamente')
      setForm({ advisor_name: '', date: '', time: '', notes: '' })
      fetchAppointments()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.deleteAppointment(id)
      fetchAppointments()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="page appointment-page">
      <section className="page-header">
        <h1>Agenda tu Cita</h1>
        <p>Habla con un asesor experto sin compromiso</p>
      </section>

      <div className="appointment-layout">
        <form onSubmit={handleSubmit} className="appointment-form">
          <h2>Datos de la Cita</h2>

          <div className="form-group">
            <label>Selecciona un Asesor</label>
            <select
              value={form.advisor_name}
              onChange={(e) => setForm({ ...form, advisor_name: e.target.value })}
              className="form-input"
              required
            >
              <option value="">-- Selecciona un asesor --</option>
              {advisors.map(adv => (
                <option key={adv.name} value={adv.name}>
                  {adv.name} - {adv.specialties}
                </option>
              ))}
            </select>
          </div>

          {form.advisor_name && (
            <div className="advisor-info">
              {advisors.find(a => a.name === form.advisor_name)?.role} | Especialidades: {advisors.find(a => a.name === form.advisor_name)?.specialties}
            </div>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Fecha</label>
              <input
                type="date"
                value={form.date}
                min={minDate}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <label>Hora</label>
              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="form-input"
                required
              >
                <option value="">-- Selecciona --</option>
                {timeSlots.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Notas (opcional)</label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              className="form-input form-textarea"
              placeholder="Cuéntanos qué tipo de seguro te interesa..."
              rows={3}
            />
          </div>

          {error && <div className="form-error">{error}</div>}
          {success && <div className="form-success">{success}</div>}

          <button type="submit" className="btn btn-primary btn-lg">Agendar Cita</button>
        </form>

        <div className="appointments-list-section">
          <h2>Mis Citas</h2>
          {loading ? (
            <div className="loading-screen"><div className="spinner"></div></div>
          ) : appointments.length === 0 ? (
            <div className="empty-state">
              <span className="empty-icon">📅</span>
              <p>No tienes citas agendadas</p>
            </div>
          ) : (
            <div className="appointments-list">
              {appointments.map(apt => (
                <div key={apt.id} className={`appointment-card status-${apt.status}`}>
                  <div className="apt-header">
                    <div className="apt-advisor">{apt.advisor_name}</div>
                    <span className={`apt-status status-${apt.status}`}>
                      {apt.status === 'pending' ? 'Pendiente' : apt.status === 'confirmed' ? 'Confirmada' : apt.status}
                    </span>
                  </div>
                  <div className="apt-details">
                    <span>📅 {apt.date}</span>
                    <span>⏰ {apt.time}</span>
                  </div>
                  {apt.notes && <p className="apt-notes">{apt.notes}</p>}
                  <button className="btn btn-outline btn-sm btn-danger" onClick={() => handleDelete(apt.id)}>
                    Cancelar Cita
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
