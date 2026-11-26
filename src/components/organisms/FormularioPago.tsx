import { useState, type FormEvent } from 'react';
import BotonSecundario from '../atoms/BotonSecundario';
import Precio from '../atoms/Precio';
import { validarPago, type DatosTarjeta } from '../../validaciones/ValidarPago';

type FormularioPagoProps = {
    total: number
    procesando: boolean
    alPagar: (medioPago: string) => void
    alCancelar: () => void
}

const TIPOS_TARJETA = ['Crédito', 'Débito'];

const tarjetaVacia: DatosTarjeta = {
    titular: '',
    numero: '',
    vencimiento: '',
    cvv: '',
};

function detectarMarca(numero: string): string {
    const digitos = numero.replace(/\D/g, '');
    if (/^4/.test(digitos)) return 'VISA';
    if (/^(5[1-5]|2[2-7])/.test(digitos)) return 'Mastercard';
    if (/^3[47]/.test(digitos)) return 'AMEX';
    return '';
}

function FormularioPago({ total, procesando, alPagar, alCancelar }: FormularioPagoProps) {
    const [tipo, setTipo] = useState('Crédito');
    const [tarjeta, setTarjeta] = useState(tarjetaVacia);

    function enviar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        const errorValidacion = validarPago(tarjeta);
        if (errorValidacion) {
            alert(errorValidacion);
            return;
        }

        const digitos = tarjeta.numero.replace(/\D/g, '');
        const medioPago = [`tarjeta de ${tipo.toLowerCase()}`, detectarMarca(tarjeta.numero), `•••• ${digitos.slice(-4)}`]
            .filter(Boolean)
            .join(' ');
        alPagar(medioPago);
    }

    return (
        <form className="form-card payment-form" onSubmit={enviar} noValidate>
            <div className="payment-form-heading">
                <span className="payment-label">MÉTODO DE PAGO</span>
                <h2>Paga tu hora con tarjeta</h2>
            </div>

            <fieldset disabled={procesando}>
                <fieldset className="payment-methods">
                    <legend className="form-label">Tipo de tarjeta</legend>
                    {TIPOS_TARJETA.map((opcion) => (
                        <label key={opcion} className={`payment-method ${tipo === opcion ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="tipo-tarjeta"
                                value={opcion}
                                checked={tipo === opcion}
                                onChange={() => setTipo(opcion)}
                            />
                            Tarjeta de {opcion.toLowerCase()}
                        </label>
                    ))}
                </fieldset>

                <div className="mb-3">
                    <label className="form-label" htmlFor="titular">Nombre del titular</label>
                    <input
                        className="form-control"
                        id="titular"
                        name="titular"
                        autoComplete="cc-name"
                        placeholder="Como aparece en la tarjeta"
                        value={tarjeta.titular}
                        onChange={(evento) => setTarjeta({ ...tarjeta, titular: evento.target.value })}
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
                            const soloDigitos = evento.target.value.replace(/\D/g, '').slice(0, 19);
                            setTarjeta({ ...tarjeta, numero: soloDigitos.replace(/(\d{4})(?=\d)/g, '$1 ') });
                        }}
                    />
                </div>

                <div className="row">
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="vencimiento">Vencimiento</label>
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
                                    const soloDigitos = evento.target.value.replace(/\D/g, '').slice(0, 4);
                                    setTarjeta({
                                        ...tarjeta,
                                        vencimiento: soloDigitos.length > 2
                                            ? `${soloDigitos.slice(0, 2)}/${soloDigitos.slice(2)}`
                                            : soloDigitos,
                                    });
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="mb-3">
                            <label className="form-label" htmlFor="cvv">CVV</label>
                            <input
                                className="form-control"
                                id="cvv"
                                name="cvv"
                                type="password"
                                inputMode="numeric"
                                autoComplete="cc-csc"
                                placeholder="123"
                                maxLength={4}
                                value={tarjeta.cvv}
                                onChange={(evento) => setTarjeta({ ...tarjeta, cvv: evento.target.value.replace(/\D/g, '').slice(0, 4) })}
                            />
                        </div>
                    </div>
                </div>
            </fieldset>

            <p className="payment-note">
                Pago simulado: no se realiza ningún cobro real. Puedes probar con 4242 4242 4242 4242.
            </p>

            <div className="payment-actions">
                <BotonSecundario nombre="Cancelar" onClick={alCancelar} />
                <button className="btn btn-primary payment-submit" type="submit" disabled={procesando}>
                    {procesando ? (
                        <>
                            <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                            Procesando pago…
                        </>
                    ) : (
                        <>Pagar <Precio monto={total} /></>
                    )}
                </button>
            </div>
        </form>
    );
}

export default FormularioPago;
