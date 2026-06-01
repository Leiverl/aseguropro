import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Iniciar Sesi&oacute;n</h2>
          <p>Ingresa a tu cuenta de SeguroPro</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Contrase&ntilde;a</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="form-input"
              placeholder="Ingresa tu contrase&ntilde;a"
              required
            />
          </div>

          {error && <div className="form-error">{error}</div>}

          <div className="form-demo-info">
            Demo: demo@email.com / demo123
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-footer">
          &iquest;No tienes cuenta? <Link to="/register">Reg&iacute;strate aqu&iacute;</Link>
        </p>
      </div>
    </div>
  )
}
