import type { Cita } from "./AgendarCita";
import { ObtenerSesion } from "./ValidarSesion";

export interface Boleta {
    folio: number;
    citaId: number;
    emitidaEl: string;
    codigoAutorizacion: string;
    medioPago: string;
    neto: number;
    iva: number;
    total: number;
    cita: Cita;
}

async function PagarCita(citaId: number, medioPago: string): Promise<Boleta | null> {
    const sesion = ObtenerSesion()

    try {
        const respuesta = await fetch("http://localhost:8084/api/pagos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + sesion.token,
            },
            body: JSON.stringify({ citaId, medioPago }),
        })

        if (!respuesta.ok) {
            const error = await respuesta.json()
            alert(error.mensaje)
            return null
        }

        localStorage.removeItem("citaActual")
        return await respuesta.json()

    } catch (error) {
        console.error("Error al pagar la cita:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return null
    }
}
export default PagarCita
