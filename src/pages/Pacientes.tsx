import { useState, type Dispatch, type FormEvent, type SetStateAction } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import TituloPagina from '../components/molecules/TituloPagina';
import CampoRegistro from '../components/molecules/CampoRegistro';
import { validarFichaPaciente, type DatosFichaPaciente } from '../validaciones/ValidarFichaPaciente';

export type Patient = {
    id: number
    nombre: string
    rut: string
    edad: number
    fechaNacimiento: string
    telefono: string
    correo: string
    enfermedades: string
    alergias: string
    medicamentos: string
    alimentacion: string
    comidas: number
    agua: number
    actividad: string
    peso: number
    estatura: number
    imc: number
    objetivo: string
    observaciones: string
    recomendaciones: string
}

function Pacientes({ pacientes, guardarPacientes }: {
    pacientes: Patient[]
    guardarPacientes: Dispatch<SetStateAction<Patient[]>>
}) {
    const [busqueda, setBusqueda] = useState('');
    const pacientesFiltrados = pacientes.filter((paciente) =>
        paciente.nombre.toLowerCase().includes(busqueda.trim().toLowerCase()));

    function eliminar(id: number) {
        if (!window.confirm('¿Está seguro de que desea eliminar esta ficha?'))
            return;
        const actualizados = pacientes.filter((paciente) => paciente.id !== id);
        try {
            localStorage.setItem('pacientes', JSON.stringify(actualizados));
        } catch {
            window.alert('No se pudo eliminar la ficha. Inténtalo nuevamente.');
            return;
        }
        guardarPacientes(actualizados);
    }
    return (<div className="container page-space">
        <TituloPagina titulo="Pacientes" descripcion="Revisa las fichas y el seguimiento nutricional." />
        <div className="d-flex justify-content-end mb-4">
            <Link className="btn btn-primary" to="/medico/pacientes/nuevo">
                + Crear ficha de paciente
            </Link>
        </div>

        <div className="mb-4">
            <label className="form-label" htmlFor="buscar-paciente">Buscar paciente por nombre</label>
            <input
                className="form-control"
                id="buscar-paciente"
                type="search"
                placeholder="Escribe un nombre"
                value={busqueda}
                onChange={(evento) => setBusqueda(evento.target.value)}
            />
        </div>

        {pacientes.length === 0
            ? <div className="empty-state"><h2>Aún no hay pacientes</h2>
                <p>Las fichas creadas aparecerán en este listado.</p>
                <Link className="btn btn-primary" to="/medico/pacientes/nuevo">
                    Crear primera ficha
                </Link>
            </div>
            : pacientesFiltrados.length === 0
                ? <div className="empty-state"><h2>No se encontraron pacientes</h2>
                    <p>Prueba con otro nombre.</p>
                </div>
            : <div className="row g-3">{pacientes.map((paciente) =>
                <div className="col-12" key={paciente.id}><article className="patient-card">
                    <div><h2>{paciente.nombre || 'Sin nombre'}</h2><p><strong>RUT:</strong> {paciente.rut} ·
                        <strong>Edad:</strong> {paciente.edad} años</p>
                        <p className="mb-0"><strong>Alimentación:</strong> {paciente.alimentacion || 'No registrada'}</p>
                    </div>
                    <div className="patient-actions">
                        <Link className="btn btn-primary" to={`/medico/pacientes/${ paciente.id } `}>
                            Ver ficha
                        </Link>
                        <Link className="btn btn-outline-primary" to={`/medico/pacientes/${ paciente.id }/editar`}>
    Editar</Link >
        <button className="btn btn-outline-danger" onClick={() => eliminar(paciente.id)}>
            Eliminar
        </button>
                    </div >
                </article >
                </div >
            )}
            </div >}
    </div >);
}

const pacienteVacio: DatosFichaPaciente = {
    nombre: '', rut: '', edad: '', fechaNacimiento: '', telefono: '', correo: '',
    enfermedades: '', alergias: '', medicamentos: '', alimentacion: '', comidas: '',
    agua: '', actividad: '', peso: '', estatura: '', objetivo: '', observaciones: '', recomendaciones: '',
};

const camposTexto: { etiqueta: string; nombre: keyof DatosFichaPaciente; tipo: string; placeholder?: string; inputMode?: 'decimal' | 'numeric' | 'text' }[] = [
    { etiqueta: 'Nombre completo', nombre: 'nombre', tipo: 'text' },
    { etiqueta: 'RUT', nombre: 'rut', tipo: 'text', placeholder: '12345678-9' },
    { etiqueta: 'Edad', nombre: 'edad', tipo: 'number' },
    { etiqueta: 'Fecha de nacimiento', nombre: 'fechaNacimiento', tipo: 'date' },
    { etiqueta: 'Teléfono', nombre: 'telefono', tipo: 'tel', placeholder: '912345678', inputMode: 'numeric' },
    { etiqueta: 'Correo electrónico', nombre: 'correo', tipo: 'email', placeholder: 'nombre@correo.cl' },
    { etiqueta: 'Enfermedades', nombre: 'enfermedades', tipo: 'text' },
    { etiqueta: 'Alergias', nombre: 'alergias', tipo: 'text' },
    { etiqueta: 'Medicamentos', nombre: 'medicamentos', tipo: 'text' },
    { etiqueta: 'Comidas al día', nombre: 'comidas', tipo: 'number' },
    { etiqueta: 'Vasos de agua al día', nombre: 'agua', tipo: 'number' },
    { etiqueta: 'Peso (kg)', nombre: 'peso', tipo: 'text', placeholder: '55,5', inputMode: 'decimal' },
    { etiqueta: 'Estatura (m)', nombre: 'estatura', tipo: 'text', placeholder: '1,50', inputMode: 'decimal' },
];

export function FormularioPaciente({ pacientes, guardarPacientes }: {
    pacientes: Patient[]
    guardarPacientes: Dispatch<SetStateAction<Patient[]>>
}) {
    const { id } = useParams();
    const navegar = useNavigate();
    const pacienteActual = id ? pacientes.find((persona) => persona.id === Number(id)) : undefined;
    const [formulario, setFormulario] = useState<DatosFichaPaciente>(() => pacienteActual
        ? Object.fromEntries(Object.keys(pacienteVacio).map((key) => [
            key,
            String(pacienteActual[key as keyof Patient] ?? ''),
        ])) as DatosFichaPaciente
        : pacienteVacio);
    const imc = formulario.peso && formulario.estatura && Number(formulario.estatura) > 0
        ? (Number(formulario.peso) / Number(formulario.estatura) ** 2).toFixed(2)
        : '';
    if (id && !pacienteActual)
        return <div className="container page-space">
            <div className="alert alert-warning">
                No encontramos la ficha solicitada.
            </div>
            <Link to="/medico/pacientes">
                Volver a pacientes
            </Link>
        </div>;
    function enviar(evento: FormEvent<HTMLFormElement>) {
        evento.preventDefault();

        const errorValidacion = validarFichaPaciente(formulario);
        if (errorValidacion) {
            window.alert(errorValidacion);
            return;
        }
        const edad = Number(formulario.edad);
        const comidas = Number(formulario.comidas);
        const agua = Number(formulario.agua);
        const peso = Number(formulario.peso);
        const estatura = Number(formulario.estatura);
        const actualizado = {
            id: pacienteActual?.id ?? Math.max(0, ...pacientes.map((persona) => persona.id)) + 1,
            ...formulario,
            edad, comidas, agua, peso, estatura, imc: Number(imc),
        };
        const lista = pacienteActual
            ? pacientes.map((persona) => persona.id === pacienteActual.id ? actualizado : persona)
            : [...pacientes, actualizado];
        try {
            localStorage.setItem('pacientes', JSON.stringify(lista));
        } catch {
            window.alert('No se pudo guardar la ficha. Inténtalo nuevamente.');
            return;
        }
        guardarPacientes(lista);
        navegar('/medico/pacientes');
    }
    return (<div className="container page-space">
        <TituloPagina titulo={pacienteActual ? 'Editar ficha del paciente' : 'Nueva ficha del paciente'}
            descripcion="Registra la información necesaria para un seguimiento nutricional integral."
        />

        <form className="form-card patient-form" onSubmit={enviar} noValidate>
            <h2>Datos personales y antecedentes</h2>
            <div className="row">{camposTexto.slice(0, 9).map((campo) =>
                <div className="col-md-6" key={campo.nombre}>
                    <CampoRegistro
                        etiqueta={campo.etiqueta}
                        tipo={campo.tipo}
                        nombre={campo.nombre}
                        valor={formulario[campo.nombre]}
                        alCambiar={(valor) =>
                            setFormulario({ ...formulario, [campo.nombre]: valor })}
                    />
                </div>
            )}
            </div>
            <h2 className="mt-4">Hábitos y evaluación</h2>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="alimentacion">
                            Tipo de alimentación
                        </label>
                        <select className="form-select" id="alimentacion"
                            required value={formulario.alimentacion} onChange={(event) =>
                                setFormulario({ ...formulario, alimentacion: event.target.value })}>
                            <option value="">
                                Selecciona una opción
                            </option>
                            <option>
                                Omnívora
                            </option>
                            <option>
                                Vegetariana
                            </option>
                            <option>
                                Vegana
                            </option>
                            <option>
                                Otra
                            </option>
                        </select>
                    </div>
                </div>

                {camposTexto.slice(9).map((campo) =>
                    <div className="col-md-6" key={campo.nombre}>

                        <CampoRegistro
                            etiqueta={campo.etiqueta}
                            tipo={campo.tipo}
                            nombre={campo.nombre}
                            valor={formulario[campo.nombre]}
                            alCambiar={(valor) =>
                                setFormulario({ ...formulario, [campo.nombre]: valor })}
                        />
                    </div>)}
                <div className="col-md-6"><div className="mb-3">
                    <label className="form-label" htmlFor="actividad">
                        Nivel de actividad física
                    </label>
                    <select className="form-select" id="actividad"
                        required value={formulario.actividad} onChange={(event) =>
                            setFormulario({ ...formulario, actividad: event.target.value })}>
                        <option value="">
                            Selecciona una opción
                        </option>
                        <option>
                            Sedentaria
                        </option>
                        <option>
                            Leve
                        </option>
                        <option>
                            Moderada
                        </option>
                        <option>
                            Intensa
                        </option>
                    </select>
                </div>
                </div>

                <div className="col-md-6"><div className="mb-3">
                    <label className="form-label" htmlFor="imc">
                        IMC calculated
                    </label>
                    <input id="imc" name="imc" type="text"
                        value={imc} readOnly className="form-control bg-light" placeholder="Se calcula con peso y estatura"
                    />
                </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="objetivo">
                            Objetivo nutricional
                        </label>
                        <textarea className="form-control" id="objetivo" rows={3}
                            required value={formulario.objetivo} onChange={(event) =>
                                setFormulario({ ...formulario, objetivo: event.target.value })}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="observaciones">
                            Observaciones del profesional
                        </label>
                        <textarea className="form-control" id="observaciones" rows={3}
                            required value={formulario.observaciones} onChange={(event) =>
                                setFormulario({ ...formulario, observaciones: event.target.value })} />
                    </div>
                </div>
                <div className="col-12">
                    <div className="mb-3">
                        <label className="form-label" htmlFor="recomendaciones">
                            Recomendaciones
                        </label>
                        <textarea className="form-control" id="recomendaciones" rows={3}
                            value={formulario.recomendaciones} onChange={(event) =>
                                setFormulario({ ...formulario, recomendaciones: event.target.value })} />
                    </div>
                </div>
            </div>
            <div className="d-flex gap-2 mt-3">
                <button className="btn btn-primary" type="submit">{pacienteActual
                    ? 'Guardar cambios' : 'Guardar ficha'}
                </button>
                <Link className="btn btn-outline-secondary" to="/medico/pacientes">
                    Cancelar
                </Link>
            </div>
        </form>
    </div>);
}

export function DetallePaciente({ pacientes }: { pacientes: Patient[] }) {
    const { id } = useParams();
    const paciente = pacientes.find((persona) => persona.id === Number(id));
    if (!paciente)
        return <div className="container page-space"><div className="alert alert-warning"
        >No encontramos la ficha solicitada.
        </div>
            <Link to="/medico/pacientes">
                Volver a pacientes
            </Link>
        </div>;
    type ClaveDetalle = Exclude<keyof Patient, 'id' | 'nombre'>;
    const grupos: [string, ClaveDetalle[]][] = [
        ['Datos personales', ['rut', 'edad', 'fechaNacimiento', 'telefono', 'correo']],
        ['Antecedentes de salud', ['enfermedades', 'alergias', 'medicamentos']],
        ['Hábitos y evaluación', ['alimentacion', 'comidas', 'agua', 'actividad', 'peso', 'estatura', 'imc']],
        ['Plan de atención', ['objetivo', 'observaciones', 'recomendaciones']],
    ];
    const etiquetas: Record<ClaveDetalle, string> = {
        rut: 'RUT', edad: 'Edad', fechaNacimiento: 'Fecha de nacimiento', telefono: 'Teléfono', correo: 'Correo',
        enfermedades: 'Enfermedades', alergias: 'Alergias', medicamentos: 'Medicamentos', alimentacion: 'Alimentación',
        comidas: 'Comidas al día', agua: 'Vasos de agua', actividad: 'Actividad física', peso: 'Peso (kg)',
        estatura: 'Estatura (m)', imc: 'IMC', objetivo: 'Objetivo nutricional', observaciones: 'Observaciones', recomendaciones: 'Recomendaciones',
    };
    return (<div className="container page-space">
        <TituloPagina titulo={paciente.nombre} descripcion="Ficha de seguimiento nutricional" />
        <div className="d-flex justify-content-end gap-2 mb-4">
            <Link className="btn btn-outline-primary" to="/medico/pacientes">
                Volver al listado
            </Link>
            <Link className="btn btn-primary" to={`/medico/pacientes/${paciente.id}/editar`}>
                Editar ficha</Link></div>
        <div className="row g-4">
            {grupos.map(([grupo, claves]) =>
                <div className="col-md-6" key={grupo}>
                    <section className="detail-card">
                        <h2>{grupo}</h2>
                        <dl>{claves.map((clave) =>
                            <div className="detail-row" key={clave}>
                                <dt>{etiquetas[clave]}</dt>
                                <dd>{paciente[clave] || 'No registrado'}
                                    {clave === 'edad' ? ' años' : ''}
                                    {clave === 'imc' ? ' kg/m²' : ''}
                                </dd>
                            </div>)}
                        </dl>
                    </section>
                </div>
            )}
        </div>
    </div>);
}

export default Pacientes;

