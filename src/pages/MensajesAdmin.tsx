import { useState } from "react";
import TituloPagina from "../components/molecules/TituloPagina";
import CardMensaje from "../components/molecules/CardMensaje";
import FormularioRespuesta from "../components/organisms/FormularioRespuesta";
import { ObtenerMensajes } from "../validaciones/GuardarMensaje";

function MensajesAdmin() {
    const [mensajes, setMensajes] = useState(ObtenerMensajes);
    const pendientes = mensajes.filter((m) => m.estado !== "Respondido");
    const respondidos = mensajes.filter((m) => m.estado === "Respondido");

    return (
        <div className="container page-space">
            <TituloPagina
                titulo="Mensajes de contacto"
                descripcion="Responde las consultas que los pacientes envían desde la página de contacto."
            />

            <section className="lista-seccion">
                <h2>Pendientes ({pendientes.length})</h2>
                {pendientes.length === 0 ? (
                    <p className="empty-state">No hay mensajes pendientes.</p>
                ) : (
                    pendientes.map((mensaje) => (
                        <CardMensaje key={mensaje.id} mensaje={mensaje} mostrarRemitente>
                            <FormularioRespuesta mensajeId={mensaje.id} alResponder={() => setMensajes(ObtenerMensajes())} />
                        </CardMensaje>
                    ))
                )}
            </section>

            {respondidos.length > 0 && (
                <section className="lista-seccion">
                    <h2>Respondidos ({respondidos.length})</h2>
                    {respondidos.map((mensaje) => <CardMensaje key={mensaje.id} mensaje={mensaje} mostrarRemitente />)}
                </section>
            )}
        </div>
    );
}

export default MensajesAdmin;
