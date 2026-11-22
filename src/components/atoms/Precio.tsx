type precioProps = {
    monto: number
}

function Precio({ monto }: precioProps) {
    return <>{"$" + monto.toLocaleString("es-CL")}</>
}
export default Precio
