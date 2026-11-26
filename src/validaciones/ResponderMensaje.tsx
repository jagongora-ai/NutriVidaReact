import { ObtenerSesion } from "./ValidarSesion";

async function ResponderMensaje(id: number, respuesta: string): Promise<boolean> {

    if (respuesta.trim() === "") {
        alert("La respuesta es obligatoria")
        return false;
    }

    if (respuesta.trim().length < 5 || respuesta.length > 500) {
        alert("La respuesta debe tener entre 5 a 500 caracteres")
        return false;
    }

    const sesion = ObtenerSesion()

    try {
        const resultado = await fetch(`http://localhost:8086/api/mensajes/${id}/respuesta`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sesion.token,
            },
            body: JSON.stringify({
                respuesta: respuesta.trim(),
            }),
        })

        if (!resultado.ok) {
            const error = await resultado.json()
            alert(error.mensaje)
            return false
        }

        alert("Respuesta enviada con éxito")
        return true

    } catch (error) {
        console.error("Error al responder el mensaje:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }
}
export default ResponderMensaje
