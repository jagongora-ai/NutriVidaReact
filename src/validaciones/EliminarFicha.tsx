import { ObtenerSesion } from "./ValidarSesion"

async function EliminarFicha(id: number): Promise<boolean> {
    const sesion = ObtenerSesion()

    try {
        const respuesta = await fetch(`http://localhost:8080/api/fichas/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            const error = await respuesta.json()
            alert(error.mensaje)
            return false
        }
        return true

    } catch (error) {
        console.error("Error al eliminar la ficha:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }
}
export default EliminarFicha