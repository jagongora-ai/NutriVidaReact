type Props = {
    nombre: string;
    tipo: string;
    valor?: string;
}

function Input({ nombre, tipo, valor }: Props) {
    return (
        <input
            type={tipo}
            value={valor}
            name={nombre}
        />
    )
}
export default Input