import Selecion, { type SelecciontOpcion } from "../atoms/Selecion";

type FormFieldSelectProps = {
    etiqueta: string;
    nombre: string;
    valor?: string;
    opciones: SelecciontOpcion[];
    alCambiar?: (valor: string) => void;
    textoBoton?: string;
    alLimpiar?: () => void;
    alAgendar?: () => void;
}

function FormFieldSelect({ etiqueta, nombre, valor, opciones, alCambiar }: FormFieldSelectProps) {
    return (
        <div className="mb-3">
            <label htmlFor={nombre} className="form-label fw-bold d-block mb-1">
                {etiqueta}
            </label>
            <Selecion
                nombre={nombre}
                valor={valor}
                opciones={opciones}
                alCambiar={alCambiar}
            />
        </div>
    );
}

export default FormFieldSelect;