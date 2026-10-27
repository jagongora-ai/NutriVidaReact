import { Link } from 'react-router-dom';

// Muestra los enlaces de las pantallas que se conservan en la aplicación.
function Navbar() {
  return (<header className="site-header">
    <nav className="navbar container">
      <Link className="navbar-brand" to="/">
        <img src="/LogoNutriVida.png" alt="NutriVida - Clínica de Nutrición" />
      </Link>

      <div className="navbar-nav site-links">

        <Link className="nav-link" to="/">Inicio</Link>
        <Link className="nav-link" to="/novedades">Novedades</Link>
        <Link className="nav-link" to="/profesionales">Profesionales</Link>
        <Link className="nav-link" to="/medico">Panel médico</Link>
        <Link className="nav-link" to="/pacientes">Pacientes</Link>
        <Link className="nav-link" to="/registro">Registrese</Link>

      </div>
    </nav>
  </header>);
}

export default Navbar;