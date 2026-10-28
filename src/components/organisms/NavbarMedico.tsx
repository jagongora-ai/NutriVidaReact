import { Link, useNavigate } from 'react-router-dom'


function NavbarMedico() {

    const navegar = useNavigate()
    const navegarInicioSesion = () => {
        localStorage.removeItem("usuarioSesion")
        navegar("/inicoSesion")
    }

    return (

        <header className="site-header">
            <nav className="navbar container">
                <Link className="navbar-brand" to="/">
                    <img src="/LogoNutriVida.png" alt="NutriVida - Clínica de Nutrición" />

                </Link>
                <div className="navbar-nav site-links">
                    <Link className='nav-link' to="/PanelMedico">Médico</Link>
                    <button
                        className='nav-link'
                        onClick={navegarInicioSesion}
                        style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                    >
                        cerrarSesion
                    </button>
                </div>
            </nav>
        </header>);
}

export default NavbarMedico