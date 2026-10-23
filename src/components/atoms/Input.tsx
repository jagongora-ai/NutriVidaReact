type inputProps = {
    nombre: string;
    tipo: string;
    valor?: string;
}

function Input({ nombre, tipo, valor }: inputProps) {
    return (
        <input
            type={tipo}
            value={valor}
            name={nombre}

            className="form-control"
        />
    )
}
export default Input