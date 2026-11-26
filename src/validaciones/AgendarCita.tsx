import { ObtenerSesion } from "./ValidarSesion";

export interface Cita {
    id: number;
    tipoConsulta: string;
    prestacion: string;
    duracion: string;
    precio: number;
    doctorId: number;
    doctor: string;
    especialidad: string;
    imagen: string;
    fecha: string;
    hora: string;
    modalidad: string;
    paciente: string;
    rut: string;
    correo: string;
    estado: string;
}

export function ObtenerCitaPendiente(): Cita | null {
    const cita = JSON.parse(localStorage.getItem("citaActual") || "null")

    if (!cita || typeof cita.id !== "number" || cita.correo !== ObtenerSesion().correo) {
        return null;
    }
    return cita
}

async function AgendarCita(datos: object): Promise<boolean> {
    const sesion = ObtenerSesion()
    const citaPrevia = ObtenerCitaPendiente()

    try {
        if (citaPrevia) {
            await fetch(`http://localhost:8083/api/citas/${citaPrevia.id}/cancelar`, {
                method: "PATCH",
                headers: {
                    "Authorization": "Bearer " + sesion.token,
                },
            })
            localStorage.removeItem("citaActual")
        }

        const respuesta = await fetch("http://localhost:8083/api/citas", {
            method: "POST",
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

        const cita = await respuesta.json()
        localStorage.setItem("citaActual", JSON.stringify(cita))
        return true

    } catch (error) {
        console.error("Error al agendar la cita:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }
}
export default AgendarCita
