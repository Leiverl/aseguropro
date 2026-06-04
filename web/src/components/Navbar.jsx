import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { Icon } from './Icon'

export default function Navbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="nav-logo-icon"><Icon name="shield" size={18} /></span>
          VelmacSafe
        </Link>

        <div className="nav-center">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/plans" className="nav-link">Planes</Link>
          <Link to="/plans/student" className="nav-link">Estudiantes</Link>
          <Link to="/quote" className="nav-link">Cotizar</Link>
          <Link to="/appointment" className="nav-link">Agendar Cita</Link>
        </div>

        <div className="nav-right">
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambiar tema">
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18} />
          </button>

          <div className="nav-desktop-auth">
            {user ? (
              <div className="nav-user-menu">
                <Link to="/dashboard" className="nav-link" aria-label="Mi cuenta">
                  <span className="user-avatar">{user.name[0]}</span>
                </Link>
                <button className="btn btn-outline btn-sm" onClick={handleLogout}>Salir</button>
              </div>
            ) : (
              <div className="nav-auth">
                <Link to="/login" className="btn btn-outline btn-sm">Ingresar</Link>
                <Link to="/register" className="btn btn-primary btn-sm">Registrarse</Link>
              </div>
            )}
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
            <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
          </button>
        </div>
      </div>

      <div className={`nav-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>Inicio</Link>
        <Link to="/plans" className="nav-link" onClick={() => setMenuOpen(false)}>Planes</Link>
        <Link to="/plans/student" className="nav-link" onClick={() => setMenuOpen(false)}>Estudiantes</Link>
        <Link to="/quote" className="nav-link" onClick={() => setMenuOpen(false)}>Cotizar</Link>
        <Link to="/appointment" className="nav-link" onClick={() => setMenuOpen(false)}>Agendar Cita</Link>
        <div className="nav-mobile-divider" />
        {user ? (
          <div className="nav-user-menu">
            <Link to="/dashboard" className="nav-link" onClick={() => setMenuOpen(false)}>
              <span className="user-avatar">{user.name[0]}</span> {user.name}
            </Link>
            <button className="btn btn-outline btn-sm" onClick={handleLogout}>Cerrar Sesión</button>
          </div>
        ) : (
          <div className="nav-auth">
            <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>Ingresar</Link>
            <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Registrarse</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
