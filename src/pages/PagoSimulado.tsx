import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TituloPagina from '../components/molecules/TituloPagina';
import ResumenCita from '../components/molecules/ResumenCita';
import AlertDialog from '../components/molecules/AlertDialog';
import FormularioPago from '../components/organisms/FormularioPago';
import BoletaElectronica from '../components/organisms/BoletaElectronica';
import { ObtenerCitaPendiente } from '../validaciones/AgendarCita';
import PagarCita, { type Boleta } from '../validaciones/PagarCita';
import CancelarCita from '../validaciones/CancelarCita';

const DEMORA_PAGO_MS = 1500;

function PagoSimulado() {
    const navegar = useNavigate();
    const [cita] = useState(ObtenerCitaPendiente);
    const [procesando, setProcesando] = useState(false);
    const [boleta, setBoleta] = useState<Boleta | null>(null);
    const temporizador = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(temporizador.current), []);

    if (!cita) {
        return (
            <div className="container page-space">
                <TituloPagina titulo="Pago de tu hora" />
                <div className="empty-state payment-empty">
                    <h2>No tienes una hora pendiente de pago</h2>
                    <p>Primero agenda una hora con alguno de nuestros profesionales y luego podrás pagarla aquí.</p>
                    <Link className="btn btn-primary" to="/Agendar">Agendar una hora</Link>
                </div>
            </div>
        );
    }

    function pagar(medioPago: string) {
        if (!cita) return;
        setProcesando(true);
        temporizador.current = window.setTimeout(() => {
            setBoleta(PagarCita(cita, medioPago));
            setProcesando(false);
        }, DEMORA_PAGO_MS);
    }

    function cancelar() {
        if (CancelarCita()) {
            navegar('/');
        }
    }

    function verMisHoras() {
        navegar('/mis-horas');
    }

    return (
        <div className="container page-space payment-page">
            <TituloPagina
                titulo="Confirma y paga tu hora"
                descripcion="Revisa los datos de tu reserva e ingresa tu tarjeta para confirmarla."
            />

            <ol className="booking-steps" aria-label="Progreso de la reserva">
                <li className="done">Agendar</li>
                <li className={boleta ? 'done' : 'current'}>Pagar</li>
                <li className={boleta ? 'current' : ''}>Boleta</li>
            </ol>

            <div className="payment-layout">
                <ResumenCita cita={cita} />
                <FormularioPago
                    total={cita.precio}
                    procesando={procesando}
                    alPagar={pagar}
                    alCancelar={cancelar}
                />
            </div>

            <AlertDialog
                abierto={boleta !== null}
                titulo="¡Pago aprobado, hora confirmada!"
                descripcion="Esta es tu boleta electrónica. Puedes volver a verla en Mis horas."
                alCerrar={verMisHoras}
                acciones={
                    <>
                        <button type="button" className="btn btn-outline-primary" onClick={() => window.print()}>
                            Imprimir boleta
                        </button>
                        <button type="button" className="btn btn-primary" onClick={verMisHoras}>
                            Ver mis horas
                        </button>
                    </>
                }
            >
                {boleta && <BoletaElectronica boleta={boleta} />}
            </AlertDialog>
        </div>
    );
}

export default PagoSimulado;
