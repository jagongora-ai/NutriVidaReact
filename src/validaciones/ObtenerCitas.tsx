import type { Cita } from "./AgendarCita";

function ObtenerCitas(): Cita[] {
    const citas: Cita[] = JSON.parse(localStorage.getItem("citas") || "[]")
    return citas.sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`))
}
export default ObtenerCitas
