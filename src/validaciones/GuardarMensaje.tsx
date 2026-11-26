import { ObtenerSesion } from "./ValidarSesion"
import type { DatosContacto } from "./ValidarContacto";

export interface Mensaje extends DatosContacto {
    id: number;
    fecha: string;
    estado: string;
    respuesta: string;
    fechaRespuesta: string;
}

async function GuardarMensaje(datos: DatosContacto): Promise<boolean> {

    const sesion = ObtenerSesion()

    const encabezados: Record<string, string> = {
        "Content-Type": "application/json",
    }
    if (sesion.token) {
        encabezados["Authorization"] = "Bearer " + sesion.token   // si la sesion existe se le pasa el token
    }

    try {
        const respuesta = await fetch("http://localhost:8080/api/mensajes", {
            method: "POST",
            headers: encabezados
            ,
            body: JSON.stringify({
                nombre: datos.nombre.trim(),
                correo: datos.correo.trim(),
                asunto: datos.asunto.trim(),
                mensaje: datos.mensaje.trim()
            }),
        })
        if (!respuesta.ok) {
            const error = await respuesta.json()
            alert(error.mensaje)
            return false
        }
        alert("Mensaje enviado con éxito, te responderemos pronto")
        return true
    } catch (error) {
        console.error("Error al enviar mensaje:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }

}
export default GuardarMensaje
