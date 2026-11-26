import type { Professional } from "../pages/Profesionales";
import { ObtenerSesion } from "./ValidarSesion";

async function ActualizarMedico(medicoEditado: Professional): Promise<boolean> {

    const quiereActualizar = window.confirm("¿Esta seguro de actualizar?")

    if (!quiereActualizar) {
        return false;
    }

    const sesion = ObtenerSesion()
    try {
        const respuesta = await fetch(`http://localhost:8080/api/profesionales/${medicoEditado.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sesion.token,
            },
            body: JSON.stringify(medicoEditado),
        })

        if (!respuesta.ok) {
            const error = await respuesta.json()
            alert(error.mensaje)
            return false
        }

        alert("Actualizado con exito")
        return true

    } catch (error) {
        console.error("Error al actualizar el medico:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }
}
export default ActualizarMedico
