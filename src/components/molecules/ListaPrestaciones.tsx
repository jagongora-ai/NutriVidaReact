import type { Prestacion } from '../../validaciones/ObtenerPrestaciones';
import Precio from '../atoms/Precio';

type listaPrestacionesProps = {
    prestaciones: Prestacion[]
    conDuracion?: boolean
}

function ListaPrestaciones({ prestaciones, conDuracion = false }: listaPrestacionesProps) {
    return (
        <ul className="price-list">
            {prestaciones.map((prestacion) => (
                <li key={prestacion.valor}>
                    <span>
                        {prestacion.etiqueta}
                        {conDuracion && <small> · {prestacion.duracion}</small>}
                    </span>
                    <strong><Precio monto={prestacion.precio} /></strong>
                </li>
            ))}
        </ul>
    )
}

export default ListaPrestaciones
