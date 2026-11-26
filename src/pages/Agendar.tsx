import TituloPagina from "../components/molecules/TituloPagina";
import FormConsultaMedica from "../components/organisms/FormAgendar";
import type { Professional } from "./Profesionales";
import type { Prestacion } from "../validaciones/ObtenerPrestaciones";

type agendarProps = {
    profesionales: Professional[]
    prestaciones: Prestacion[]
}

function Agendar({ profesionales, prestaciones }: agendarProps) {
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
                <FormConsultaMedica profesionales={profesionales} prestaciones={prestaciones} />
            </div>
        </main>
    );
}

export default Agendar;
