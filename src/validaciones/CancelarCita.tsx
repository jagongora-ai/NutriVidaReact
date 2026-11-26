import { ObtenerSesion } from "./ValidarSesion";

async function CancelarCita(id: number): Promise<boolean> {

    const cancela = window.confirm("¿Está seguro de cancelar la hora agendada?")
    if (!cancela) {
        return false;
    }

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch(`http://localhost:8080/api/citas/${id}/cancelar`, {
            method: "PATCH",
            headers: {
                "Authorization": "Bearer " + sesion.token,
            },
        })

        if (!respuesta.ok) {
            const error = await respuesta.json()
            alert(error.mensaje)
            return false
        }

        localStorage.removeItem("citaActual")
        alert("Hora cancelada con éxito")
        return true

    } catch (error) {
        console.error("Error al cancelar la hora:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }
}
export default CancelarCita
