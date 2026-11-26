import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { useEffect, useState, type ReactElement } from 'react';
import Navbar from './components/organisms/Navbar';
import NavbarAdministracion from './components/organisms/NavbarAdministracion';
import PiePagina from './components/organisms/PiePagina';
import Profesionales, { type Professional } from './pages/Profesionales';
import DetalleProfesional from './pages/DetalleProfesional';
import Inicio from './pages/Inicio';
import RegistroLogin from './pages/RegistroLogin';
import InicioSesion from './pages/InicioSesion';
import Pacientes, { DetallePaciente, FormularioPaciente, type Patient } from './pages/Pacientes';
import Admin from './pages/Admin';
import PanelMedico from './pages/PanelMedico';
import Novedades from './pages/Novedades';
import DetalleNovedad from './pages/DetalleNovedad';
import GestionarMedicos from './pages/GestionMedicos';
import PagoSimulado from './pages/PagoSimulado';
import NavbarMedico from './components/organisms/NavbarMedico';
import Agendar from './pages/Agendar';
import Contacto from './pages/Contacto';
import MisHoras from './pages/MisHoras';
import AgendaMedico from './pages/AgendaMedico';
import MensajesAdmin from './pages/MensajesAdmin';
import ObtenerProfesionales from './validaciones/ObtenerProfesionales';
import ObtenerPrestaciones, { type Prestacion } from './validaciones/ObtenerPrestaciones';
import ValidarSesion from './validaciones/ValidarSesion';
import ObtenerFichas from './validaciones/ObtenerFichas';

const mensajesAcceso: Record<string, string> = {
    Cliente: 'Debes iniciar sesión como paciente para continuar.',
    medico: 'Debes iniciar sesión como médico para entrar al panel médico.',
    admin: 'Debes iniciar sesión como administrador para entrar a la administración.',
};

function App() {
    const ubicacion = useLocation();
    const esAdministrador = ubicacion.pathname.startsWith("/admin");
    const esMedico = ubicacion.pathname.startsWith("/medico");
    const [profesionales, guardarProfesionales] = useState<Professional[]>([]);
    const [prestaciones, guardarPrestaciones] = useState<Prestacion[]>([]);

    const [pacientes, guardarPacientes] = useState<Patient[]>([]);
    const esSesionDeMedico = ValidarSesion("medico")

    useEffect(() => {
        ObtenerProfesionales().then((lista) => guardarProfesionales(lista))
        ObtenerPrestaciones().then((lista) => guardarPrestaciones(lista))
    }, [])

    useEffect(() => {

        if (esSesionDeMedico) {
            ObtenerFichas().then((lista) => guardarPacientes(lista))
        }
    }, [esSesionDeMedico])

    const proteger = (rol: string, pagina: ReactElement) => {
        if (ValidarSesion(rol)) {
            return pagina;
        }
        return (
            <Navigate
                to="/inicioSesion"
                replace
                state={{ desde: ubicacion.pathname + ubicacion.search, mensaje: mensajesAcceso[rol] }}
            />
        );
    };

    return (
        <div className="app-shell">
            {esAdministrador ? (
                <NavbarAdministracion />
            ) : esMedico ? (
                <NavbarMedico />
            ) : (
                <Navbar />
            )}

            <main className="main-content">
                <Routes>

                    <Route path="/" element={<Inicio />} />
                    <Route path="/registro" element={<RegistroLogin />} />
                    <Route path="/inicioSesion" element={<InicioSesion />} />
                    <Route path="/profesionales" element={<Profesionales profesionales={profesionales} prestaciones={prestaciones} />} />
                    <Route path="/profesionales/:id" element={<DetalleProfesional profesionales={profesionales} prestaciones={prestaciones} />} />
                    <Route path="/novedades" element={<Novedades />} />
                    <Route path="/novedades/:id" element={<DetalleNovedad />} />
                    <Route path="/contacto" element={<Contacto />} />

                    <Route path='/Agendar' element={proteger('Cliente', <Agendar profesionales={profesionales} prestaciones={prestaciones} />)} />
                    <Route path="/pago" element={proteger('Cliente', <PagoSimulado />)} />
                    <Route path="/mis-horas" element={proteger('Cliente', <MisHoras />)} />

                    <Route path="/pacientes" element={<Navigate to="/medico/pacientes" replace />} />
                    <Route path="/pacientes/nuevo" element={<Navigate to="/medico/pacientes/nuevo" replace />} />
                    <Route path="/pacientes/:id" element={<Navigate to="/medico/pacientes" replace />} />

                    <Route path="/medico" element={proteger('medico', <PanelMedico pacientes={pacientes} />)} />
                    <Route path="/medico/agenda" element={proteger('medico', <AgendaMedico />)} />
                    <Route path="/medico/pacientes" element={proteger('medico', <Pacientes pacientes={pacientes} guardarPacientes={guardarPacientes} />)} />
                    <Route path="/medico/pacientes/nuevo" element={proteger('medico', <FormularioPaciente pacientes={pacientes} guardarPacientes={guardarPacientes} />)} />
                    <Route path="/medico/pacientes/:id/editar" element={proteger('medico', <FormularioPaciente pacientes={pacientes} guardarPacientes={guardarPacientes} />)} />
                    <Route path="/medico/pacientes/:id" element={proteger('medico', <DetallePaciente pacientes={pacientes} />)} />

                    <Route path="/admin" element={proteger('admin', <Admin />)} />
                    <Route path="/admin/gestion" element={proteger('admin', <GestionarMedicos medicos={profesionales} guardarMedicos={guardarProfesionales} />)} />
                    <Route path="/admin/mensajes" element={proteger('admin', <MensajesAdmin />)} />
                    <Route path="/admin/cerrarSesion" element={<InicioSesion />} />
                </Routes>
            </main>
            <PiePagina />
        </div>
    );
}

export default App;
