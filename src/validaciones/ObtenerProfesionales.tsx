import type { Professional } from "../pages/Profesionales";

async function ObtenerProfesionales(): Promise<Professional[]> {

    try {
        const respuesta = await fetch("http://localhost:8082/api/profesionales")

        if (!respuesta.ok) {
            return []
        }
        return await respuesta.json()
    } catch (error) {
        console.error("Error al cargar los profesionales", error)
        return []
    }
}
export default ObtenerProfesionales
