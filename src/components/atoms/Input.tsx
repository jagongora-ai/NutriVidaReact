type inputProps = {
    nombre: string
    tipo: string
    valor?: string
    alCambiar?: (valor: string) => void
}

function Input({ nombre, tipo, valor, alCambiar }: inputProps) {
    return (
        <input type={tipo} value={valor} name={nombre} id={nombre}
            onChange={alCambiar ? (evento) => alCambiar(evento.target.value) : undefined}
            className="form-control" />
    )
}
export default Input;