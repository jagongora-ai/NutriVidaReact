import { ObtenerSesion } from "./ValidarSesion"

async function GuardarFicha(datos: object, id?: number): Promise<boolean> {
    const sesion = ObtenerSesion()

    const url = id
        ? `http://localhost:8085/api/fichas/${id}`
        : "http://localhost:8085/api/fichas"

    try {
        const respuesta = await fetch(url, {
            method: id ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sesion.token,
            },
            body: JSON.stringify(datos),
        })

        if (!respuesta.ok) {
            const error = await respuesta.json()
            alert(error.mensaje)
            return false
        }

        alert("Ficha guardada con éxito")
        return true

    } catch (error) {
        console.error("Error al guardar la ficha:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }
}
export default GuardarFicha