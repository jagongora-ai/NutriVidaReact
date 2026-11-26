export interface Prestacion {
    valor: string;
    etiqueta: string;
    precio: number;
    duracion: string;
}

async function ObtenerPrestaciones(): Promise<Prestacion[]> {

    try {
        const respuesta = await fetch("http://localhost:8080/api/prestaciones")

        if (!respuesta.ok) {
            return []
        }
        return await respuesta.json()
    } catch (error) {
        console.error("Error al cargar las prestaciones", error)
        return []
    }
}
export default ObtenerPrestaciones
