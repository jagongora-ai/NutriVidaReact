import Input from '../atoms/Input';

type camposProps = {
    etiqueta: string
    tipo: string
    nombre: string
    valor?: string
    alCambiar?: (valor: string) => void
}

function CampoRegistro({ etiqueta, tipo, nombre, valor, alCambiar }: camposProps) {
    return (
        <div className="mb-3">
            <label className="form-label" htmlFor={nombre}>{etiqueta}</label>
            <Input nombre={nombre} tipo={tipo} valor={valor} alCambiar={alCambiar}/>
        </div>
    )
}

export default CampoRegistro