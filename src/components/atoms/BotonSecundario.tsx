type BotonSecundarioProps = {
    nombre: string
    onClick?: () => void
}

function BotonSecundario({ nombre, onClick }: BotonSecundarioProps) {
    return (
        <button onClick={onClick} className="btn btn-outline-primary">
            {nombre}
        </button>
    )
}

export default BotonSecundario
