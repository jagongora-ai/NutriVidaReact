import type { Cita } from "./AgendarCita";
import { ObtenerSesion } from "./ValidarSesion";

async function ObtenerCitas(): Promise<Cita[]> {

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch("http://localhost:8080/api/citas/mias", {
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            return []
        }
        return await respuesta.json()
    } catch (error) {
        console.error("Error al cargar tus horas", error)
        return []
    }
}
export default ObtenerCitas
