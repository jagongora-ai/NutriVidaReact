import type { Cita } from '../../validaciones/AgendarCita';
import BotonSecundario from '../atoms/BotonSecundario';
import FechaTexto from '../atoms/FechaTexto';
import Precio from '../atoms/Precio';

type cardCitaProps = {
    cita: Cita
    vista: 'paciente' | 'medico'
    alVerBoleta?: () => void
}

function CardCita({ cita, vista, alVerBoleta }: cardCitaProps) {
    const [anio, mes, dia] = cita.fecha.split('-').map(Number)
    const nombreMes = new Date(anio, mes - 1, dia).toLocaleDateString('es-CL', { month: 'short' })

    return (
        <article className="cita-card">
            <div className="cita-fecha">
                <strong>{dia}</strong>
                <span>{nombreMes}</span>
            </div>

            <div className="cita-info">
                <h3>{cita.hora} hrs · {cita.prestacion}</h3>
                <p>{vista === 'paciente' ? cita.doctor : `${cita.paciente} · RUT ${cita.rut}`}</p>
                <p className="cita-detalle">
                    <FechaTexto fecha={cita.fecha} /> · {cita.modalidad} · {cita.duracion}
                </p>
            </div>

            <div className="cita-acciones">
                <span className="cita-estado">{cita.estado}</span>
                <strong><Precio monto={cita.precio} /></strong>
                {alVerBoleta && <BotonSecundario nombre="Ver boleta" onClick={alVerBoleta} />}
            </div>
        </article>
    )
}

export default CardCita
