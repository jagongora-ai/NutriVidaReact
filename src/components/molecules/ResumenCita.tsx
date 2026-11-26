import { Link } from 'react-router-dom';
import type { Cita } from '../../validaciones/AgendarCita';
import FechaTexto from '../atoms/FechaTexto';
import Precio from '../atoms/Precio';

function ResumenCita({ cita }: { cita: Cita }) {
    return (
        <aside className="appointment-card">
            <span className="payment-label">TU HORA AGENDADA</span>

            <div className="appointment-doctor">
                <img src={cita.imagen} alt={cita.doctor} />
                <div>
                    <strong>{cita.doctor}</strong>
                    <span>{cita.especialidad}</span>
                </div>
            </div>

            <dl className="appointment-list">
                <div><dt>Prestación</dt><dd>{cita.prestacion}</dd></div>
                <div><dt>Fecha</dt><dd><FechaTexto fecha={cita.fecha} /></dd></div>
                <div><dt>Hora</dt><dd>{cita.hora} hrs · {cita.duracion}</dd></div>
                <div><dt>Modalidad</dt><dd>{cita.modalidad}</dd></div>
                <div><dt>Paciente</dt><dd>{cita.paciente}</dd></div>
            </dl>

            <div className="appointment-total">
                <span>Total a pagar</span>
                <strong><Precio monto={cita.precio} /></strong>
            </div>

            <Link className="appointment-edit" to="/Agendar">Modificar hora</Link>
        </aside>
    );
}

export default ResumenCita;
