import TituloPagina from "../components/molecules/TituloPagina";
import FormConsultaMedica from "../components/organisms/FormAgendar";
import ObtenerProfesionales from "../validaciones/ObtenerProfesionales";
import ObtenerPrestaciones from "../validaciones/ObtenerPrestaciones";

function Agendar() {
    return (
        <main className="container page-space">
            <TituloPagina
                titulo="Reserva tu cita médica"
                descripcion="Selecciona la prestación, el profesional de salud y el horario que mejor se adapten a ti."
            />

            <ol className="booking-steps" aria-label="Progreso de la reserva">
                <li className="current">Agendar</li>
                <li>Pagar</li>
                <li>Boleta</li>
            </ol>

            <div className="d-flex justify-content-center my-4">
                <FormConsultaMedica profesionales={ObtenerProfesionales()} prestaciones={ObtenerPrestaciones()} />
            </div>
        </main>
    );
}

export default Agendar;
