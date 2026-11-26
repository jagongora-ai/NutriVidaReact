import TituloPagina from "../components/molecules/TituloPagina";
import CardCita from "../components/molecules/CardCita";
import ObtenerCitas from "../validaciones/ObtenerCitas";
import { ObtenerSesion } from "../validaciones/ValidarSesion";

function AgendaMedico() {
    const sesion = ObtenerSesion();
    const hoy = new Date().toLocaleDateString("sv-SE");

    const citas = ObtenerCitas().filter((c) => c.doctorId === sesion.profesionalId);
    const proximas = citas.filter((c) => c.fecha >= hoy);
    const anteriores = citas.filter((c) => c.fecha < hoy).reverse();

    return (
        <div className="container page-space">
            <TituloPagina titulo="Mi agenda" descripcion="Todas las horas que tus pacientes agendaron y pagaron contigo." />

            {sesion.profesionalId === undefined ? (
                <p className="empty-state">Tu usuario no está asociado a un profesional, por eso no tiene agenda.</p>
            ) : (
                <>
                    <section className="lista-seccion">
                        <h2>Próximas citas ({proximas.length})</h2>
                        {proximas.length === 0 ? (
                            <p className="empty-state">No tienes citas próximas.</p>
                        ) : (
                            proximas.map((cita) => <CardCita key={cita.id} cita={cita} vista="medico" />)
                        )}
                    </section>

                    {anteriores.length > 0 && (
                        <section className="lista-seccion">
                            <h2>Citas anteriores</h2>
                            {anteriores.map((cita) => <CardCita key={cita.id} cita={cita} vista="medico" />)}
                        </section>
                    )}
                </>
            )}
        </div>
    );
}

export default AgendaMedico;
