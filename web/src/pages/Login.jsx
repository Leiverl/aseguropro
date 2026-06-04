import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Icon } from '../components/Icon'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

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
          <p>Ingresa a tu cuenta de VelmacSafe</p>
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
              autoComplete="email"
              spellCheck={false}
              required
            />
          </div>

          <div className="form-group">
            <label>Contrase&ntilde;a</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="form-input"
                placeholder="Ingresa tu contrase&ntilde;a"
                autoComplete="current-password"
                spellCheck={false}
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
              >
                <Icon name={showPassword ? 'eyeOff' : 'eye'} size={18} />
              </button>
            </div>
          </div>

          {error && <div className="form-error" role="alert">{error}</div>}

          <div className="form-demo-info">
            Demo: demo@email.com / demo123
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            {loading ? 'Ingresando\u2026' : 'Ingresar'}
          </button>
        </form>

        <p className="auth-footer">
          &iquest;No tienes cuenta? <Link to="/register">Reg&iacute;strate aqu&iacute;</Link>
        </p>
      </div>
    </div>
  )
}
