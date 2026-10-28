import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Navbar from './components/organisms/Navbar';
import PiePagina from './components/organisms/PiePagina';

import Profesionales, { profesionalesIniciales } from './pages/Profesionales';
import DetalleProfesional from './pages/DetalleProfesional';
import Inicio from './pages/Inicio';
import RegistroLogin from './pages/RegistroLogin'
import AreaInicioSesion from './components/organisms/AreaInicioSesion';
import InicioSesion from './pages/InicioSesion';
import Pacientes, { DetallePaciente, FormularioPaciente, type Patient } from './pages/Pacientes';

function App() {
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
            <Navbar />

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
                        element = {<RegistroLogin />}
                    />

                    <Route
                        path='/inicioSesion'
                        element = {<InicioSesion/>}
                    />
                    
                </Routes>
            </main>

            <PiePagina />
        </div>
    );
}
export default App;