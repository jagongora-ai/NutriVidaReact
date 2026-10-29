export interface SelecciontOpcion {
    valor: string;
    etiqueta: string;
}

type seleccionProps = {
    nombre: string;
    valor?: string;
    opciones: SelecciontOpcion[];
    alCambiar?: (valor: string) => void;
}

function Selecion({ nombre, valor, opciones, alCambiar }: seleccionProps) {
    return (
        <select 
            value={valor} 
            name={nombre} 
            id={nombre}
            onChange={alCambiar ? (evento) => alCambiar(evento.target.value) : undefined}
            className="form-control"
        >
            <option value="">-- Seleccionar --</option>
            {opciones.map((opcion) => (
                <option key={opcion.valor} value={opcion.valor}>
                    {opcion.etiqueta}
                </option>
            ))}
        </select>
    );
}

export default Selecion;