import { Link, useNavigate } from 'react-router-dom'

function NavbarMedico() {
    const navegar = useNavigate()

    const navegarInicioSesion = () => {
        localStorage.removeItem("usuarioSesion")
        navegar("/inicioSesion") 
    }

    return (
        <header className="site-header">
            <nav className="navbar container">
                <Link className="navbar-brand" to="/medico">
                    <img src="/LogoNutriVida.png" alt="NutriVida - Clínica de Nutrición" />
                </Link>
                <div className="navbar-nav site-links">
                    <Link className='nav-link' to="/medico">Panel médico</Link>
                    <Link className='nav-link' to="/medico/pacientes">Pacientes</Link>

                    <button
                        className='nav-link'
                        onClick={navegarInicioSesion}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </nav>
        </header>
    );
}

export default NavbarMedico