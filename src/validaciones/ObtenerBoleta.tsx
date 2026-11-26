import type { Boleta } from "./PagarCita";
import { ObtenerSesion } from "./ValidarSesion";

async function ObtenerBoleta(citaId: number): Promise<Boleta | null> {
    const sesion = ObtenerSesion()

    try {
        const respuesta = await fetch(`http://localhost:8084/api/boletas/cita/${citaId}`, {
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            const error = await respuesta.json()
            alert(error.mensaje)
            return null
        }
        return await respuesta.json()

    } catch (error) {
        console.error("Error al cargar la boleta:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return null
    }
}
export default ObtenerBoleta
