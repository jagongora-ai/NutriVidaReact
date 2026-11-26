import { ObtenerSesion } from "./ValidarSesion"

async function ObtenerHorasOcupadas(doctorId: string, fecha: string): Promise<string[]> {

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch(`http://localhost:8080/api/citas/ocupadas?doctorId=${doctorId}&fecha=${fecha}`, {
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            return []
        }
        const datos = await respuesta.json()
        return datos.horasOcupadas
    } catch (error) {
        console.error("Error al cargar las horas ocupadas", error)
        return []
    }
}
export default ObtenerHorasOcupadas
