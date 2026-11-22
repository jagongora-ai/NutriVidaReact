import type { Boleta } from '../../validaciones/PagarCita';
import FechaTexto from '../atoms/FechaTexto';
import Precio from '../atoms/Precio';

function BoletaElectronica({ boleta }: { boleta: Boleta }) {
    const { cita } = boleta;
    const folio = String(boleta.folio).padStart(6, '0');
    const emitidaEl = new Date(boleta.emitidaEl).toLocaleString('es-CL', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <article className="boleta" aria-label={`Boleta electrónica N° ${folio}`}>
            <header className="boleta-header">
                <div className="boleta-emisor">
                    <img src="/LogoNutriVida.png" alt="NutriVida" />
                    <p>
                        Clínica NutriVida<br />
                        Servicios de nutrición y salud<br />
                        Temuco, Región de La Araucanía
                    </p>
                </div>
                <div className="boleta-folio">
                    <span>RUT 77.777.777-7</span>
                    <strong>BOLETA ELECTRÓNICA</strong>
                    <span>N° {folio}</span>
                </div>
            </header>

            <dl className="boleta-datos">
                <div><dt>Fecha de emisión</dt><dd>{emitidaEl}</dd></div>
                <div><dt>Paciente</dt><dd>{cita.paciente}</dd></div>
                <div><dt>RUT paciente</dt><dd>{cita.rut}</dd></div>
                <div><dt>Correo</dt><dd>{cita.correo}</dd></div>
            </dl>

            <section className="boleta-cita">
                <h3>Detalle de la hora agendada</h3>
                <dl>
                    <div><dt>Prestación</dt><dd>{cita.prestacion} ({cita.duracion})</dd></div>
                    <div><dt>Profesional</dt><dd>{cita.doctor}</dd></div>
                    <div><dt>Fecha</dt><dd><FechaTexto fecha={cita.fecha} /></dd></div>
                    <div><dt>Hora</dt><dd>{cita.hora} hrs</dd></div>
                    <div><dt>Modalidad</dt><dd>{cita.modalidad}</dd></div>
                </dl>
            </section>

            <dl className="boleta-montos">
                <div><dt>Monto neto</dt><dd><Precio monto={boleta.neto} /></dd></div>
                <div><dt>IVA (19%)</dt><dd><Precio monto={boleta.iva} /></dd></div>
                <div className="boleta-total"><dt>Total pagado</dt><dd><Precio monto={boleta.total} /></dd></div>
            </dl>

            <footer className="boleta-pie">
                <p>
                    Pagado con {boleta.medioPago}<br />
                    Código de autorización: <strong>{boleta.codigoAutorizacion}</strong>
                </p>
                <p className="boleta-aviso">Documento de simulación académica, sin validez tributaria.</p>
            </footer>
        </article>
    );
}

export default BoletaElectronica;
