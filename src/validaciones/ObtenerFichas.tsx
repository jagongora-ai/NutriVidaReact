import type { Patient } from "../pages/Pacientes"
import { ObtenerSesion } from "./ValidarSesion"

async function ObtenerFichas(): Promise<Patient[]> {

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch("http://localhost:8085/api/fichas", {
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            return []
        }
        return await respuesta.json()
    } catch (error) {
        console.error("Error al cargar las fichas de los pacientes", error)
        return []
    }
}

export default ObtenerFichas
