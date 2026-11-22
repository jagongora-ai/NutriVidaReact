import { useState } from "react";
import { Link } from "react-router-dom";
import TituloPagina from "../components/molecules/TituloPagina";
import CardMensaje from "../components/molecules/CardMensaje";
import FormularioContacto from "../components/organisms/FormularioContacto";
import { ObtenerMensajes } from "../validaciones/GuardarMensaje";
import ValidarSesion, { ObtenerSesion } from "../validaciones/ValidarSesion";

function Contacto() {
    const [mensajes, setMensajes] = useState(ObtenerMensajes);
    const sesion = ObtenerSesion();
    const esPaciente = ValidarSesion("Cliente");
    const misMensajes = mensajes.filter((m) => m.correo === sesion.correo?.toLowerCase());

    return (
        <div className="container page-space">
            <TituloPagina
                titulo="Contacto"
                descripcion="¿Tienes dudas sobre nuestras atenciones? Escríbenos y el equipo de NutriVida te responderá."
            />

            <div className="contact-layout">
                <FormularioContacto alEnviar={() => setMensajes(ObtenerMensajes())} />

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
                    {misMensajes.length === 0 ? (
                        <p className="empty-state">Aún no has enviado mensajes.</p>
                    ) : (
                        misMensajes.map((mensaje) => <CardMensaje key={mensaje.id} mensaje={mensaje} />)
                    )}
                </section>
            )}
        </div>
    );
}

export default Contacto;
