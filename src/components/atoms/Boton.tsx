type botonProps = {
    nombre: string;
    onClick?: () => void;
    // ? lo hace opcional (no es necesario que siempre lo acepte)
}

function Boton({ nombre, onClick }: botonProps) {

    return (
        <button onClick={onClick} className="btn btn-primary, BotonLoginFormulario">
            {nombre}
        </button>
    )

}

export default Boton
