type areaTextoProps = {
    nombre: string
    valor?: string
    filas?: number
    alCambiar?: (valor: string) => void
}

function AreaTexto({ nombre, valor, filas = 4, alCambiar }: areaTextoProps) {
    return (
        <textarea name={nombre} id={nombre} rows={filas} value={valor}
            onChange={alCambiar ? (evento) => alCambiar(evento.target.value) : undefined}
            className="form-control" />
    )
}
export default AreaTexto
