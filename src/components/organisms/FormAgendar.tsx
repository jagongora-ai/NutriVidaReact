import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profesionalesIniciales } from '../../pages/Profesionales'; 
import FormFieldSelect from '../molecules/SelecionCampo';
import Input from '../atoms/Input';
import Boton from '../atoms/Boton';
import ValidarCitaMedica, { type DatosCitaMedica } from '../../validaciones/ValidacionAgendar';

// 2. Transformas la lista de profesionales a las opciones que necesita el selector
const opcionesDoctores = profesionalesIniciales.map((profesional) => ({
    valor: profesional.nombre,
    etiqueta: profesional.nombre
}));

const PRESTACIONES = [
    { valor: 'Consulta', etiqueta: 'Consulta Nutricionista' },
    { valor: 'Plan especializado', etiqueta: 'Plan especializado' },
    { valor: 'Evaluación', etiqueta: 'Evaluación' },
    { valor: 'Taller Grupal', etiqueta: 'Taller Grupal' },
];

function FormConsultaMedica() {
    const navegar = useNavigate();
    const [tipoConsulta, setTipoConsulta] = useState('');
    const [doctor, setDoctor] = useState('');
    const [fecha, setFecha] = useState('');
    const [hora, setHora] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const datosCita: DatosCitaMedica = {
            modalidad: 'Presencial',
            tipoConsulta,
            doctor,
            fecha,
            hora
        };

        if (!ValidarCitaMedica(datosCita)) {
            return;
        }

        const datosCitaAgendada = {
            modalidad: 'Presencial',
            tipoConsulta,
            doctor,
            fecha,
            hora,
            precioTotal: '22.000'
        };

        localStorage.setItem('citaActual', JSON.stringify(datosCitaAgendada));
        navegar('/pago');
    };

    return (
        <div className="card p-4 shadow-sm" style={{ backgroundColor: '#5b9bd5', maxWidth: '450px', margin: '0 auto' }}>
            <h2 className="mb-2">Consulta Médica</h2>
            <p className="mb-4" style={{ fontSize: '14px' }}>¿Qué tipo de atención buscas y dónde quieres atenderte?</p>

            <form onSubmit={handleSubmit} noValidate>
                <FormFieldSelect
                    etiqueta="Prestación"
                    nombre="prestacion"
                    valor={tipoConsulta}
                    opciones={PRESTACIONES}
                    alCambiar={setTipoConsulta}
                />

                <FormFieldSelect
                    etiqueta="Doctor / Profesional"
                    nombre="doctor"
                    valor={doctor}
                    opciones={opcionesDoctores}
                    alCambiar={setDoctor}
                />

                <div className="mb-3">
                    <label className="form-label fw-bold d-block mb-1">Fecha</label>
                    <Input tipo="date" nombre="fecha" valor={fecha} alCambiar={setFecha} />
                </div>

                <div className="mb-4">
                    <label className="form-label fw-bold d-block mb-1">Hora</label>
                    <Input tipo="time" nombre="hora" valor={hora} alCambiar={setHora} />
                </div>

                <Boton nombre="Buscar / Agendar Cita" />
            </form>
        </div>
    );
}

export default FormConsultaMedica;