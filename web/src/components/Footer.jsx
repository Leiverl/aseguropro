import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="nav-logo-icon">S</span>
            VelmacSafe
          </div>
          <p className="footer-desc">Protegemos lo que m&aacute;s te importa. M&aacute;s de 50,000 clientes conf&iacute;an en nosotros para cuidar su salud, auto, hogar, vida y estudios.</p>
        </div>
        <div className="footer-section">
          <h4>Productos</h4>
          <Link to="/plans?type=health">Seguro de Salud</Link>
          <Link to="/plans?type=auto">Seguro de Auto</Link>
          <Link to="/plans?type=home">Seguro de Hogar</Link>
          <Link to="/plans?type=life">Seguro de Vida</Link>
          <Link to="/plans/student">Seguro Estudiantil</Link>
        </div>
        <div className="footer-section">
          <h4>Compa&ntilde;&iacute;a</h4>
          <a href="#">Sobre Nosotros</a>
          <a href="#">Sucursales</a>
          <a href="#">Trabaja con Nosotros</a>
          <Link to="/appointment">Agendar Cita</Link>
        </div>
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Tel: (555) 123-4567</p>
          <p>Email: info@seguropro.com</p>
          <p>Av. Principal 123, Ciudad</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VelmacSafe. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
