import type { ReactNode } from 'react';
import type { Mensaje } from '../../validaciones/GuardarMensaje';

type cardMensajeProps = {
    mensaje: Mensaje
    mostrarRemitente?: boolean
    children?: ReactNode
}

function fechaCorta(fechaISO: string) {
    return new Date(fechaISO).toLocaleString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

function CardMensaje({ mensaje, mostrarRemitente = false, children }: cardMensajeProps) {
    const respondido = mensaje.estado === 'Respondido'

    return (
        <article className="mensaje-card">
            <header className="mensaje-header">
                <div>
                    <h3>{mensaje.asunto}</h3>
                    <span>
                        {mostrarRemitente && `${mensaje.nombre} · ${mensaje.correo} · `}
                        {fechaCorta(mensaje.fecha)}
                    </span>
                </div>
                <span className={`mensaje-estado ${respondido ? 'respondido' : ''}`}>{mensaje.estado}</span>
            </header>

            <p className="mensaje-texto">{mensaje.mensaje}</p>

            {respondido && (
                <div className="mensaje-respuesta">
                    <strong>Respuesta de NutriVida · {fechaCorta(mensaje.fechaRespuesta)}</strong>
                    <p>{mensaje.respuesta}</p>
                </div>
            )}

            {children}
        </article>
    )
}

export default CardMensaje
