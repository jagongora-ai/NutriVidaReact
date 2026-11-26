import { Link, useNavigate } from 'react-router-dom';
import ValidarSesion, { ObtenerSesion } from '../../validaciones/ValidarSesion';

function Navbar() {
  const navegar = useNavigate();
  const usuario = ObtenerSesion();
  const pacienteConectado = ValidarSesion('Cliente');

  function cerrarSesion() {
    localStorage.removeItem('usuarioSesion');
    localStorage.removeItem('citaActual');
    navegar('/');
  }

  return (<header className="site-header">
    <nav className="navbar container">
      <Link className="navbar-brand" to="/">
        <img src="/LogoNutriVida.png" alt="NutriVida - Clínica de Nutrición" />
      </Link>

      <div className="navbar-nav site-links">

        <Link className="nav-link" to="/">Inicio</Link>
        <Link className="nav-link" to="/profesionales">Profesionales</Link>
        {!pacienteConectado && (<>
          <Link className="nav-link" to="/inicioSesion"> Inicie Sesion</Link>
          <Link className="nav-link" to="/registro">Registrese</Link>
        </>)}
        <Link className="nav-link" to="/novedades">Novedades</Link>
        <Link className="nav-link" to="/Agendar">Agenda hora</Link>
        <Link className="nav-link" to="/contacto">Contacto</Link>
        {pacienteConectado && (<>
          <Link className="nav-link" to="/mis-horas">Mis horas</Link>
          <span className="nav-link nav-usuario">Hola, {usuario.nombre?.split(' ')[0]}</span>
          <button type="button" className="nav-link nav-salir" onClick={cerrarSesion}>Cerrar sesión</button>
        </>)}

      </div>
    </nav>
  </header>);
}

export default Navbar;
