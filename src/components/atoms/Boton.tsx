type botonProps = {
    nombre: string;
    onClick?: () => void;
    
}

function Boton({ nombre, onClick }: botonProps) {

    return (
        <button onClick={onClick} className="btn btn-primary, BotonLoginFormulario">
            {nombre}
        </button>
    )

}

export default Boton
