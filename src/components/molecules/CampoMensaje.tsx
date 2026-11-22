import AreaTexto from '../atoms/AreaTexto';

type campoMensajeProps = {
    etiqueta: string
    nombre: string
    valor?: string
    filas?: number
    alCambiar?: (valor: string) => void
}

function CampoMensaje({ etiqueta, nombre, valor, filas, alCambiar }: campoMensajeProps) {
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={nombre}>{etiqueta}</label>
            <AreaTexto nombre={nombre} valor={valor} filas={filas} alCambiar={alCambiar} />
        </div>
    )
}

export default CampoMensaje
