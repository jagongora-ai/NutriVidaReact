import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import BotonSecundario from '../components/atoms/BotonSecundario';
import { validarPago, type DatosTarjeta } from '../validaciones/ValidarPago';

const tarjetaVacia: DatosTarjeta = {
    titular: '',
    numero: '',
    vencimiento: '',
    cvv: '',
}

function PagoSimulado() {
    const navegar = useNavigate();
    const [tarjeta, setTarjeta] = useState(tarjetaVacia);
    const [horaConfirmada, setHoraConfirmada] = useState(false);

    function enviarPago(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        const errorValidacion = validarPago(tarjeta);
        if (errorValidacion) {
            window.alert(errorValidacion);
            return;
        }

        setHoraConfirmada(true);
        setTarjeta(tarjetaVacia);
    }

    return (
        <div className="container page-space payment-page">
            <div className="payment-layout">
                <aside className="appointment-card">
                    <div className="appointment-card-heading">
                        <div>
                            <h2>Atención nutricional</h2>
                        </div>
                    </div>
        
                {/*para incorporar fecha y hora agendada*/}
                    <div className="appointment-info">
                        <span>Horario agendado</span>
                        <strong>Pendiente de confirmación</strong>
                    </div>

                {/*Monto de pago*/}
                    <div className="appointment-info appointment-amount">
                        <span>Monto</span>
                        <strong>Por definir</strong>
                    </div>

                </aside>

                <form className="form-card payment-form" onSubmit={enviarPago} noValidate>
                    <div className="payment-form-heading">
                        <div>
                            <span className="payment-label">MÉTODO DE PAGO</span>
                            <h2>Tarjeta de crédito o débito</h2>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label" htmlFor="titular">Nombre del titular</label>
                        <input
                            className="form-control"
                            id="titular"
                            name="titular"
                            autoComplete="cc-name"
                            placeholder="Como aparece en la tarjeta"
                            value={tarjeta.titular}
                            onChange={(evento) => {
                                setHoraConfirmada(false);
                                setTarjeta({ ...tarjeta, titular: evento.target.value });
                            }}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label" htmlFor="numero-tarjeta">Número de tarjeta</label>
                        <input
                            className="form-control"
                            id="numero-tarjeta"
                            name="numero-tarjeta"
                            type="text"
                            inputMode="numeric"
                            autoComplete="cc-number"
                            placeholder="0000 0000 0000 0000"
                            maxLength={23}
                            value={tarjeta.numero}
                            onChange={(evento) => {
                                setHoraConfirmada(false);
                                const digitos = evento.target.value.replace(/\D/g, '').slice(0, 19);
                                const numero = digitos.replace(/(\d{4})(?=\d)/g, '$1 ');
                                setTarjeta({ ...tarjeta, numero });
                            }}
                        />
                    </div>

                    <div className="row">
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="vencimiento">Fecha de vencimiento</label>
                                <input
                                    className="form-control"
                                    id="vencimiento"
                                    name="vencimiento"
                                    type="text"
                                    inputMode="numeric"
                                    autoComplete="cc-exp"
                                    placeholder="MM/AA"
                                    maxLength={5}
                                    value={tarjeta.vencimiento}
                                    onChange={(evento) => {
                                        setHoraConfirmada(false);
                                        const digitos = evento.target.value.replace(/\D/g, '').slice(0, 4);
                                        const vencimiento = digitos.length > 2
                                            ? `${digitos.slice(0, 2)}/${digitos.slice(2)}`
                                            : digitos;
                                        setTarjeta({ ...tarjeta, vencimiento });
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="mb-3">
                                <label className="form-label" htmlFor="cvv">Código de seguridad</label>
                                <input
                                    className="form-control"
                                    id="cvv"
                                    name="cvv"
                                    type="password"
                                    inputMode="numeric"
                                    autoComplete="cc-csc"
                                    placeholder="CVV"
                                    maxLength={4}
                                    value={tarjeta.cvv}
                                    onChange={(evento) => {
                                        setHoraConfirmada(false);
                                        setTarjeta({
                                            ...tarjeta,
                                            cvv: evento.target.value.replace(/\D/g, '').slice(0, 4),
                                        });
                                    }}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="payment-actions">
                        <BotonSecundario nombre="Cancelar" onClick={() => navegar('/')} />
                        <button className="btn btn-primary payment-submit" type="submit">
                            Confirmar pago
                        </button>
                    </div>
                </form>
            </div>
            {horaConfirmada && (
                <div className="confirmation-overlay" role="presentation">
                    <section
                        className="confirmation-modal"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="confirmation-title"
                    >
                        <h2 id="confirmation-title">¡Hora confirmada!</h2>
                        <p>Monto: <strong>Por definir</strong></p>
                        <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => setHoraConfirmada(false)}
                        >
                            Listo
                        </button>
                    </section>
                </div>
            )}
        </div>
    );
}

export default PagoSimulado;
