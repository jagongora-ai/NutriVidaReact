import { Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/organisms/Navbar';
import PiePagina from './components/organisms/PiePagina';
import Profesionales, { profesionalesIniciales } from './pages/Profesionales';
import DetalleProfesional from './pages/DetalleProfesional';
import Inicio from './pages/Inicio';
import RegistroLogin from './pages/RegistroLogin'
import InicioSesion from './pages/InicioSesion';
import Admin from './pages/Admin';
import NavbarAdministracion from './components/organisms/NavbarAdministracion';



function App() {

    // lee la ubicacion
    const ubicacion = useLocation()

    //evalua si la ruta contiene ("path = /admin")
    const esAdministrador = ubicacion.pathname.startsWith("/admin")

    return (
        <div className="app-shell">

            {esAdministrador ? <NavbarAdministracion /> : <Navbar />}

            <main className="main-content">
                <Routes>
                    <Route
                        path="/"
                        element={<Inicio />}
                    />

                    <Route
                        path="/profesionales"
                        element={<Profesionales profesionales={profesionalesIniciales} />}
                    />
                    <Route
                        path="/profesionales/:id"
                        element={<DetalleProfesional profesionales={profesionalesIniciales} />}
                    />

                    <Route
                        path='/registro'
                        element={<RegistroLogin />}
                    />


                    <Route
                        path='/inicioSesion'
                        element={<InicioSesion />}
                    />

                    {/* Rutas administrativas */}
                    <Route
                        path='/admin'
                        element={<Admin />}
                    />

                </Routes>
            </main>
            <PiePagina />
        </div>
    );
}
export default App;