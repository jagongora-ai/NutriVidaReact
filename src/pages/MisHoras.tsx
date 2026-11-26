import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TituloPagina from "../components/molecules/TituloPagina";
import CardCita from "../components/molecules/CardCita";
import AlertDialog from "../components/molecules/AlertDialog";
import BoletaElectronica from "../components/organisms/BoletaElectronica";
import ObtenerCitas from "../validaciones/ObtenerCitas";
import type { Cita } from "../validaciones/AgendarCita";
import type { Boleta } from "../validaciones/PagarCita";
import ObtenerBoleta from "../validaciones/ObtenerBoleta";

function MisHoras() {
    const [misCitas, setMisCitas] = useState<Cita[]>([]);
    const [boleta, setBoleta] = useState<Boleta | null>(null);
    const hoy = new Date().toLocaleDateString("sv-SE");

    useEffect(() => {
        ObtenerCitas().then((lista) => setMisCitas(lista));
    }, []);

    const proximas = misCitas.filter((c) => c.fecha >= hoy);
    const anteriores = misCitas.filter((c) => c.fecha < hoy).reverse();

    return (
        <div className="container page-space">
            <TituloPagina titulo="Mis horas" descripcion="Revisa tus horas agendadas y las boletas de tus pagos." />

            <div className="lista-acciones">
                <Link className="btn btn-primary" to="/Agendar">Agendar nueva hora</Link>
            </div>

            <section className="lista-seccion">
                <h2>Próximas horas</h2>
                {proximas.length === 0 ? (
                    <p className="empty-state">No tienes horas próximas.</p>
                ) : (
                    proximas.map((cita) => (
                        <CardCita key={cita.id} cita={cita} vista="paciente" alVerBoleta={() => ObtenerBoleta(cita.id).then((b) => setBoleta(b))} />
                    ))
                )}
            </section>

            {anteriores.length > 0 && (
                <section className="lista-seccion">
                    <h2>Horas anteriores</h2>
                    {anteriores.map((cita) => (
                        <CardCita key={cita.id} cita={cita} vista="paciente" alVerBoleta={() => ObtenerBoleta(cita.id).then((b) => setBoleta(b))} />
                    ))}
                </section>
            )}

            <AlertDialog
                abierto={boleta !== null}
                titulo="Boleta electrónica"
                descripcion="Comprobante del pago de tu hora."
                alCerrar={() => setBoleta(null)}
                acciones={
                    <>
                        <button type="button" className="btn btn-outline-primary" onClick={() => window.print()}>
                            Imprimir boleta
                        </button>
                        <button type="button" className="btn btn-primary" onClick={() => setBoleta(null)}>
                            Cerrar
                        </button>
                    </>
                }
            >
                {boleta && <BoletaElectronica boleta={boleta} />}
            </AlertDialog>
        </div>
    );
}

export default MisHoras;
