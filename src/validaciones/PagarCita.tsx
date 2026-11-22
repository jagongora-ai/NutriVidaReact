import type { Cita } from "./AgendarCita";

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

export function ObtenerBoleta(citaId: number): Boleta | null {
    const boletas: Boleta[] = JSON.parse(localStorage.getItem("boletas") || "[]")
    return boletas.find((b) => b.citaId === citaId) || null
}

function PagarCita(cita: Cita, medioPago: string): Boleta {
    const citas: Cita[] = JSON.parse(localStorage.getItem("citas") || "[]")
    const boletas: Boleta[] = JSON.parse(localStorage.getItem("boletas") || "[]")

    const citaPagada: Cita = { ...cita, estado: "Pagada" }
    const neto = Math.round(cita.precio / 1.19)

    const boleta: Boleta = {
        folio: boletas.length + 1,
        citaId: cita.id,
        emitidaEl: new Date().toISOString(),
        codigoAutorizacion: String(Math.floor(100000 + Math.random() * 900000)),
        medioPago,
        neto,
        iva: cita.precio - neto,
        total: cita.precio,
        cita: citaPagada
    }

    localStorage.setItem("citas", JSON.stringify([...citas, citaPagada]))
    localStorage.setItem("boletas", JSON.stringify([...boletas, boleta]))
    localStorage.removeItem("citaActual")
    return boleta
}
export default PagarCita
