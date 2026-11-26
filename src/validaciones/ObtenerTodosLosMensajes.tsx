import type { Mensaje } from "./GuardarMensaje"
import { ObtenerSesion } from "./ValidarSesion"

async function ObtenerTodosLosMensajes(): Promise<Mensaje[]> {

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch("http://localhost:8080/api/mensajes", {
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            return []
        }
        return await respuesta.json()
    } catch (error) {
        console.error("Error al cargar los mensajes", error)
        return []
    }
}

export default ObtenerTodosLosMensajes
