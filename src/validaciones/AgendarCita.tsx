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

function AgendarCita(cita: Cita): boolean {
    const citas: Cita[] = JSON.parse(localStorage.getItem("citas") || "[]")

    const horaTomada = citas.some((c) => c.doctorId === cita.doctorId && c.fecha === cita.fecha && c.hora === cita.hora)
    if (horaTomada) {
        alert("Esa hora ya fue tomada por otro paciente, por favor elige otra")
        return false;
    }

    const ahora = new Date()
    const [horas, minutos] = cita.hora.split(":").map(Number)
    const esHoy = cita.fecha === ahora.toLocaleDateString("sv-SE")
    if (esHoy && horas * 60 + minutos <= ahora.getHours() * 60 + ahora.getMinutes()) {
        alert("Esa hora ya pasó, por favor elige otra")
        return false;
    }

    localStorage.setItem("citaActual", JSON.stringify(cita))
    return true
}
export default AgendarCita
