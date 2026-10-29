import { Routes, Route, useLocation } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/organisms/Navbar';
import NavbarAdministracion from './components/organisms/NavbarAdministracion';
import PiePagina from './components/organisms/PiePagina';
import Profesionales, { profesionalesIniciales } from './pages/Profesionales';
import DetalleProfesional from './pages/DetalleProfesional';
import Inicio from './pages/Inicio';
import RegistroLogin from './pages/RegistroLogin'
import InicioSesion from './pages/InicioSesion';
import Pacientes, { DetallePaciente, FormularioPaciente, type Patient } from './pages/Pacientes';
import Admin from './pages/Admin';
import PanelMedico from './pages/PanelMedico';
import Novedades from './pages/Novedades';
import DetalleNovedad from './pages/DetalleNovedad';
import GestionarMedicos from './pages/GestionMedicos';
import PagoSimulado from './pages/PagoSimulado';
import Agendar from './pages/Agendar';

function App() {

    const ubicacion = useLocation()
    const esAdministrador = ubicacion.pathname.startsWith("/admin")


    const [pacientes, guardarPacientes] = useState<Patient[]>(() => {
        try {
            const pacientesGuardados = localStorage.getItem('pacientes');
            return pacientesGuardados ? JSON.parse(pacientesGuardados) as Patient[] : [];
        } catch {
            window.alert('No se pudieron cargar los pacientes guardados.');
            return [];
        }
    });

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
                        path='/registro'
                        element={<RegistroLogin />}
                    />

                    <Route
                        path='/inicioSesion'
                        element={<InicioSesion />}
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
                        path="/pacientes"
                        element={<Pacientes pacientes={pacientes} guardarPacientes={guardarPacientes} />}
                    />

                    <Route
                        path="/pacientes/nuevo"
                        element={<FormularioPaciente pacientes={pacientes} guardarPacientes={guardarPacientes} />}
                    />

                    <Route
                        path="/pacientes/:id/editar"
                        element={<FormularioPaciente pacientes={pacientes} guardarPacientes={guardarPacientes} />}
                    />

                    <Route
                        path="/pacientes/:id"
                        element={<DetallePaciente pacientes={pacientes} />}
                    />

                    <Route
                        path='/registro'
                        element={<RegistroLogin />}
                    />

                    <Route
                        path='/inicioSesion'
                        element={<InicioSesion />}
                    />

                    <Route
                        path='/admin' element={<Admin />}
                    />
                    <Route
                        path='/admin/cerrarSesion' element={<InicioSesion />}
                    />

                    <Route
                        path="/medico"
                        element={<PanelMedico pacientes={pacientes} />}
                    />

                    <Route
                        path="/Agendar"
                        element={<Agendar/>}
                    />

                    <Route
                        path="/novedades"
                        element={<Novedades />}
                    />

                    <Route
                        path="/novedades/:id"
                        element={<DetalleNovedad />}
                    />

                    <Route
                        path='/admin/gestion'
                        element={<GestionarMedicos />}
                    />
                    <Route
                        path="/pago"
                        element={<PagoSimulado />}
                    />

                </Routes>
            </main>
            <PiePagina />
        </div>
    );
}
export default App;