type botonProps = {
    nombre: string;
    onClick?: () => void;
    deshabilitado?: boolean;
    
}

function Boton({ nombre, onClick, deshabilitado = false}: botonProps) {
    return (
        <button onClick={onClick} className="btn btn-primary"  disabled={deshabilitado}>
            {nombre}
        </button>
    )
}

export default Boton
