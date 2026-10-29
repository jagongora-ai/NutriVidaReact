import TituloPagina from "../components/molecules/TituloPagina";
import FormConsultaMedica from "../components/organisms/FormAgendar";

function Agendar() {
    return (
        <main className="container page-space">
            <TituloPagina 
                titulo="Reserva tu cita médica" 
                descripcion="Selecciona la prestación, el profesional de salud y el horario que mejor se adapten a ti." 
            />
            
            <div className="d-flex justify-content-center my-4">
                <FormConsultaMedica />
            </div>
        </main>
    );
}

export default Agendar;