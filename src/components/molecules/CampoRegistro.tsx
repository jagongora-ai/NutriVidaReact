import Input from "../atoms/Input";

type camposProps = {
    etiqueta: string;
    tipo: string;
    nombre: string;
}

function CampoRegistro({ etiqueta, tipo, nombre }: camposProps) {

    return (
        <div>
            <label>
                {etiqueta}
            </label>

            <Input
                nombre={nombre}
                tipo={tipo}
            />
        </div>
    );

}

export default CampoRegistro