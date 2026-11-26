import type { Cita } from "./AgendarCita";
import { ObtenerSesion } from "./ValidarSesion";

async function ObtenerAgenda(): Promise<Cita[]> {

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch("http://localhost:8083/api/citas/agenda", {
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            return []
        }
        return await respuesta.json()
    } catch (error) {
        console.error("Error al cargar la agenda del medico", error)
        return []
    }
}
export default ObtenerAgenda
