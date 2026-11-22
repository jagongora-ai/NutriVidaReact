export interface Prestacion {
    valor: string;
    etiqueta: string;
    precio: number;
    duracion: string;
}

const prestacionesIniciales: Prestacion[] = [
    { valor: "Consulta", etiqueta: "Consulta Nutricionista", precio: 22000, duracion: "45 min" },
    { valor: "Plan especializado", etiqueta: "Plan especializado", precio: 35000, duracion: "60 min" },
    { valor: "Evaluación", etiqueta: "Evaluación antropométrica", precio: 18000, duracion: "30 min" },
    { valor: "Taller Grupal", etiqueta: "Taller Grupal", precio: 12000, duracion: "90 min" },
]

function ObtenerPrestaciones(): Prestacion[] {
    return prestacionesIniciales
}
export default ObtenerPrestaciones
