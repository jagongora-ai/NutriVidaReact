import { useEffect, useState, type FormEvent } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import type { Professional } from '../../pages/Profesionales';
import type { Prestacion } from '../../validaciones/ObtenerPrestaciones';
import FormFieldSelect from '../molecules/SelecionCampo';
import Input from '../atoms/Input';
import Precio from '../atoms/Precio';
import { ValidarCitaMedica } from '../../validaciones/ValidacionAgendar';
import AgendarCita, { ObtenerCitaPendiente } from '../../validaciones/AgendarCita';
import ObtenerHorasOcupadas from '../../validaciones/ObtenerHorasOcupadas';
import { ObtenerSesion } from '../../validaciones/ValidarSesion';

type formAgendarProps = {
    profesionales: Professional[]
    prestaciones: Prestacion[]
}

const MODALIDADES = ['Presencial', 'Online'];

const HORARIOS: string[] = [];
for (let minutos = 8 * 60; minutos < 20 * 60; minutos += 30) {
    const hora = String(Math.floor(minutos / 60)).padStart(2, '0');
    const minuto = String(minutos % 60).padStart(2, '0');
    HORARIOS.push(`${hora}:${minuto}`);
}

function fechaHoy() {
    return new Date().toLocaleDateString('sv-SE');
}

function yaPaso(fecha: string, hora: string) {
    if (fecha !== fechaHoy()) return false;
    const [horas, minutos] = hora.split(':').map(Number);
    const ahora = new Date();
    return horas * 60 + minutos <= ahora.getHours() * 60 + ahora.getMinutes();
}

function FormConsultaMedica({ profesionales, prestaciones }: formAgendarProps) {
    const navegar = useNavigate();
    const [parametros] = useSearchParams();

    const [usuario] = useState(ObtenerSesion);
    const [citaPrevia] = useState(ObtenerCitaPendiente);

    const opcionesDoctores = profesionales.map((profesional) => ({
        valor: String(profesional.id),
        etiqueta: profesional.nombre,
    }));

    const opcionesPrestaciones = prestaciones.map((prestacion) => ({
        valor: prestacion.valor,
        etiqueta: `${prestacion.etiqueta} · $${prestacion.precio.toLocaleString('es-CL')}`,
    }));

    const doctorDesdeUrl = parametros.get('profesional') ?? '';
    const doctorInicial = opcionesDoctores.some((opcion) => opcion.valor === doctorDesdeUrl)
        ? doctorDesdeUrl
        : citaPrevia ? String(citaPrevia.doctorId) : '';

    const [tipoConsulta, setTipoConsulta] = useState(citaPrevia?.tipoConsulta ?? '');
    const [doctorId, setDoctorId] = useState(doctorInicial);
    const [modalidad, setModalidad] = useState(citaPrevia?.modalidad ?? 'Presencial');
    const [fecha, setFecha] = useState(citaPrevia?.fecha ?? '');
    const [hora, setHora] = useState(citaPrevia?.hora ?? '');
    const [ocupadas, setOcupadas] = useState<string[]>([]);
    const [enviando, setEnviando] = useState(false);

    const prestacion = prestaciones.find((opcion) => opcion.valor === tipoConsulta);
    const profesional = profesionales.find((persona) => String(persona.id) === doctorId);

    useEffect(() => {
        if (doctorId && fecha) {
            ObtenerHorasOcupadas(doctorId, fecha).then((horas) => setOcupadas(horas));
        }
    }, [doctorId, fecha]);

    function cambiarDoctor(valor: string) {
        setDoctorId(valor);
        setHora('');
    }

    function cambiarFecha(valor: string) {
        setFecha(valor);
        setHora('');
    }

    async function enviar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();
        if (enviando) return;

        const error = ValidarCitaMedica({ tipoConsulta, doctor: doctorId, fecha, hora, modalidad });
        if (error !== '') {
            alert(error);
            return;
        }

        setEnviando(true);
        const agendada = await AgendarCita({
            tipoConsulta,
            doctorId: Number(doctorId),
            fecha,
            hora,
            modalidad,
        });
        setEnviando(false);

        if (agendada) {
            navegar('/pago');
        }
    }

    return (
        <form className="booking-card" onSubmit={enviar} noValidate>
            <section className="booking-section">
                <h2><span className="booking-number">1</span> Tipo de atención</h2>

                <FormFieldSelect
                    etiqueta="Prestación"
                    nombre="prestacion"
                    valor={tipoConsulta}
                    opciones={opcionesPrestaciones}
                    alCambiar={setTipoConsulta}
                />

                <FormFieldSelect
                    etiqueta="Profesional"
                    nombre="doctor"
                    valor={doctorId}
                    opciones={opcionesDoctores}
                    alCambiar={cambiarDoctor}
                />

                {profesional && (
                    <div className="booking-doctor">
                        <img src={profesional.imagen} alt="" />
                        <div>
                            <strong>{profesional.nombre}</strong>
                            <span>{profesional.especialidad}</span>
                        </div>
                    </div>
                )}

                <fieldset className="payment-methods">
                    <legend className="form-label fw-bold">Modalidad</legend>
                    {MODALIDADES.map((opcion) => (
                        <label key={opcion} className={`payment-method ${modalidad === opcion ? 'active' : ''}`}>
                            <input
                                type="radio"
                                name="modalidad"
                                value={opcion}
                                checked={modalidad === opcion}
                                onChange={() => setModalidad(opcion)}
                            />
                            {opcion}
                        </label>
                    ))}
                </fieldset>
            </section>

            <section className="booking-section">
                <h2><span className="booking-number">2</span> Fecha y hora</h2>

                <div className="mb-3">
                    <label className="form-label fw-bold d-block mb-1" htmlFor="fecha">Fecha</label>
                    <Input tipo="date" nombre="fecha" valor={fecha} alCambiar={cambiarFecha} min={fechaHoy()} />
                </div>

                <span className="form-label fw-bold d-block mb-2" id="etiqueta-hora">Hora</span>
                {profesional && fecha ? (
                    <div className="time-slots" role="group" aria-labelledby="etiqueta-hora">
                        {HORARIOS.map((horario) => (
                            <button
                                key={horario}
                                type="button"
                                className={`time-slot ${hora === horario ? 'selected' : ''}`}
                                aria-pressed={hora === horario}
                                disabled={ocupadas.includes(horario) || yaPaso(fecha, horario)}
                                onClick={() => setHora(horario)}
                            >
                                {horario}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className="booking-hint">Elige un profesional y una fecha para ver las horas disponibles.</p>
                )}
            </section>

            <section className="booking-section">
                <h2><span className="booking-number">3</span> Datos del paciente</h2>
                <dl className="booking-patient">
                    <div><dt>Paciente</dt><dd>{usuario.nombre}</dd></div>
                    <div><dt>RUT</dt><dd>{usuario.rut}</dd></div>
                    <div><dt>Correo</dt><dd>{usuario.correo}</dd></div>
                </dl>
                <p className="booking-hint mb-0">
                    Agendas con tu sesión iniciada. Estos datos aparecerán en la boleta.
                </p>
            </section>

            <div className="booking-footer">
                <div className="booking-total">
                    <span>Total a pagar</span>
                    <strong>{prestacion ? <Precio monto={prestacion.precio} /> : '—'}</strong>
                    {prestacion && <small>{prestacion.etiqueta} · {prestacion.duracion}</small>}
                </div>
                <button type="submit" className="btn btn-primary booking-submit" disabled={enviando}>
                    {enviando ? 'Agendando...' : 'Continuar al pago'}
                </button>
            </div>
        </form>
    );
}

export default FormConsultaMedica;
