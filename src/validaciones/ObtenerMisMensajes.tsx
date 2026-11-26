import type { Mensaje } from "./GuardarMensaje"
import { ObtenerSesion } from "./ValidarSesion"

async function ObtenerMisMensajes(): Promise<Mensaje[]> {

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch("http://localhost:8080/api/mensajes/mis/mensajes", {
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            return []
        }
        return await respuesta.json()
    } catch (error) {
        console.error("Error al cargar sus mensajes", error)
        return []
    }
}

export default ObtenerMisMensajes