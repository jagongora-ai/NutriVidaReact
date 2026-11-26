import { ObtenerSesion } from "./ValidarSesion";

async function EliminarMedico(id: number): Promise<boolean> {

    const cancela = window.confirm("¿Esta seguro de eliminar?")
    if (!cancela) {
        return false;
    }

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch(`http://localhost:8082/api/profesionales/${id}`, {
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

        alert("Medico eliminado con exito")
        return true

    } catch (error) {
        console.error("Error al eliminar el medico:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }
}
export default EliminarMedico
