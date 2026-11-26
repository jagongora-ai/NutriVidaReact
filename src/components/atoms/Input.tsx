type inputProps = {
    nombre: string
    tipo: string
    valor?: string
    alCambiar?: (valor: string) => void
    min?: string
}

function Input({ nombre, tipo, valor, alCambiar, min }: inputProps) {
    return (
        <input type={tipo} value={valor} name={nombre} id={nombre} min={min}
            onChange={alCambiar ? (evento) => alCambiar(evento.target.value) : undefined}
            className="form-control" />
    )
}
export default Input;
