type fechaTextoProps = {
    fecha: string
}

function FechaTexto({ fecha }: fechaTextoProps) {
    const [anio, mes, dia] = fecha.split("-").map(Number)
    const texto = new Date(anio, mes - 1, dia).toLocaleDateString("es-CL", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    })
    return <>{texto.charAt(0).toUpperCase() + texto.slice(1)}</>
}
export default FechaTexto
