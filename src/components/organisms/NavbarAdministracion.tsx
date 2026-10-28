import { Link } from 'react-router-dom'
function NavbarAdministracion() {

    return (

        <header className="site-header">
            <nav className="navbar container">
                <Link className="navbar-brand" to="/">
                    <img src="/LogoNutriVida.png" alt="NutriVida - Clínica de Nutrición" />

                </Link>
                <div className="navbar-nav site-links">
                    <Link className='nav-link' to="/admin">Administracion</Link>
                    <Link className='nav-link' to="/admin/cerrarSesion"> Cerrar Sesion </Link>
                </div>
            </nav>
        </header>);
}

export default NavbarAdministracion