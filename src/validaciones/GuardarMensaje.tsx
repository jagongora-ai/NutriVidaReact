import type { DatosContacto } from "./ValidarContacto";

export interface Mensaje extends DatosContacto {
    id: number;
    fecha: string;
    estado: string;
    respuesta: string;
    fechaRespuesta: string;
}

export function ObtenerMensajes(): Mensaje[] {
    const mensajes: Mensaje[] = JSON.parse(localStorage.getItem("mensajesContacto") || "[]")
    return mensajes.sort((a, b) => b.fecha.localeCompare(a.fecha))
}

function GuardarMensaje(datos: DatosContacto): boolean {
    const mensajes = ObtenerMensajes()

    const nuevoMensaje: Mensaje = {
        id: Date.now(),
        nombre: datos.nombre.trim(),
        correo: datos.correo.trim().toLowerCase(),
        asunto: datos.asunto.trim(),
        mensaje: datos.mensaje.trim(),
        fecha: new Date().toISOString(),
        estado: "Pendiente",
        respuesta: "",
        fechaRespuesta: ""
    }

    localStorage.setItem("mensajesContacto", JSON.stringify([...mensajes, nuevoMensaje]))
    alert("Mensaje enviado con éxito, te responderemos pronto")
    return true
}
export default GuardarMensaje
