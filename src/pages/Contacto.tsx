import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TituloPagina from "../components/molecules/TituloPagina";
import CardMensaje from "../components/molecules/CardMensaje";
import FormularioContacto from "../components/organisms/FormularioContacto";
import ValidarSesion from "../validaciones/ValidarSesion";
import ObtenerMisMensajes from "../validaciones/ObtenerMisMensajes";
import type { Mensaje } from "../validaciones/GuardarMensaje";

function Contacto() {
    const [mensajes, setMensajes] = useState<Mensaje[]>([])
    const esPaciente = ValidarSesion("Cliente");

    useEffect(() => {
        if (esPaciente) {
            ObtenerMisMensajes().then((lista) => setMensajes(lista))
        }
    }, [esPaciente])

    return (
        <div className="container page-space">
            <TituloPagina
                titulo="Contacto"
                descripcion="¿Tienes dudas sobre nuestras atenciones? Escríbenos y el equipo de NutriVida te responderá."
            />

            <div className="contact-layout">
                <FormularioContacto alEnviar={() => {
                    if (esPaciente) {
                        ObtenerMisMensajes().then((lista) => setMensajes(lista))
                    }
                }} />

                <aside className="contact-info">
                    <h2>Clínica NutriVida</h2>
                    <dl>
                        <div><dt>Ubicación</dt><dd>Temuco, Región de La Araucanía</dd></div>
                        <div><dt>Horario de atención</dt><dd>08:00 a 20:00 hrs</dd></div>
                    </dl>
                    {esPaciente ? (
                        <p>Las respuestas del equipo aparecerán más abajo, en <strong>Mis mensajes</strong>.</p>
                    ) : (
                        <p>
                            <Link to="/inicioSesion">Inicia sesión</Link> con el mismo correo para ver aquí
                            las respuestas a tus mensajes.
                        </p>
                    )}
                </aside>
            </div>

            {esPaciente && (
                <section className="lista-seccion">
                    <h2>Mis mensajes</h2>
                    {mensajes.length === 0 ? (
                        <p className="empty-state">Aún no has enviado mensajes.</p>
                    ) : (
                        mensajes.map((mensaje) => <CardMensaje key={mensaje.id} mensaje={mensaje} />)
                    )}
                </section>
            )}
        </div>
    );
}

export default Contacto;
