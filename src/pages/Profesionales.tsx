import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/atoms/Input';
import Boton from '../components/atoms/Boton';
import TituloPagina from '../components/molecules/TituloPagina';


export type Professional = {
    id: number
    nombre: string
    especialidad: string
    imagen: string
    ubicacion: string
    atencion: string
    experiencia: string
    sobreMi: string
    estudios: string[]
    areas: string[]
}

/* eslint-disable react-refresh/only-export-components */
export const profesionalesIniciales: Professional[] = [
    {
        id: 1, nombre: 'Nut. Carolina Fuentes M.', especialidad: 'Especialista en Nutrición y Pérdida de Peso',
        imagen: '/ProfesionalesIMG/medica 1.jpg', ubicacion: 'Temuco, Chile', atencion: 'Presencial y Online',
        experiencia: 'Más de 10 años en nutrición clínica',
        sobreMi: 'Diseña planes de alimentación equilibrados y personalizados para alcanzar y mantener un peso saludable de forma sostenible.',
        estudios: ['Nutrición, Universidad de La Frontera', 'Magíster en Nutrición Clínica, Universidad de Chile', 'Diplomado en Manejo Integral del Sobrepeso y Obesidad'],
        areas: ['Pérdida de peso', 'Reeducación alimentaria', 'Evaluación antropométrica'],
    },
    {
        id: 2, nombre: 'Nut. Felipe Araya R.', especialidad: 'Nutrición Clínica Pediátrica y Familiar',
        imagen: '/ProfesionalesIMG/medico 1.jpg', ubicacion: 'Temuco, Chile', atencion: 'Presencial y Online',
        experiencia: 'Más de 8 años en nutrición clínica',
        sobreMi: 'Orientado al control y manejo de enfermedades metabólicas mediante una alimentación adecuada para cada etapa de vida.',
        estudios: ['Nutrición Clínica, Universidad de La Frontera', 'Especialización en Nutrición Clínica', 'Diplomado en Manejo de Enfermedades Metabólicas'],
        areas: ['Nutrición clínica', 'Diabetes', 'Salud familiar'],
    },
    {
        id: 3, nombre: 'Nut. Daniela Morales C.', especialidad: 'Nutrición Vegetariana y Vegana',
        imagen: '/ProfesionalesIMG/medica 2.jpg', ubicacion: 'Temuco, Chile', atencion: 'Presencial y Online',
        experiencia: 'Más de 7 años en nutrición',
        sobreMi: 'Diseña planes vegetarianos y veganos equilibrados, sostenibles y adaptados a las necesidades de cada paciente.',
        estudios: ['Nutrición, Universidad de Chile', 'Especialización en Nutrición Vegetariana', 'Diplomado en Alimentación Vegana'],
        areas: ['Nutrición vegetariana', 'Nutrición vegana', 'Alimentación saludable'],
    },
    {
        id: 4, nombre: 'Nut. Rodrigo Sepúlveda A.', especialidad: 'Nutrición Deportiva',
        imagen: '/ProfesionalesIMG/medico 2.jpg', ubicacion: 'Temuco, Chile', atencion: 'Presencial y Online',
        experiencia: 'Más de 9 años en nutrición deportiva',
        sobreMi: 'Acompaña a deportistas a mejorar su rendimiento, recuperación y alimentación integral.',
        estudios: ['Nutrición, Universidad de La Frontera', 'Especialización en Nutrición Deportiva', 'Diplomado en Rendimiento Deportivo'],
        areas: ['Nutrición deportiva', 'Rendimiento físico', 'Recuperación deportiva'],
    },
]


function Profesionales({ profesionales }: {
    profesionales: Professional[]
}) {
    const [busqueda, setBusqueda] = useState('');
    const termino = busqueda.trim().toLocaleLowerCase('es');
    const resultados = profesionales.filter((profesional) => `${profesional.nombre} ${profesional.especialidad}`
        .toLocaleLowerCase('es')
        .includes(termino));
    return (<div className="container page-space">
      <TituloPagina titulo="Nuestros profesionales" descripcion="Conoce al equipo listo para guiar tu proceso de nutrición integral."/>
      <div className="professional-search">
        <label className="form-label" htmlFor="buscar-profesional">Buscar por nombre o especialidad</label>
        <div className="d-flex gap-2">
          <Input nombre="buscar-profesional" tipo="search" valor={busqueda} alCambiar={setBusqueda}/>
          {busqueda && (<button className="btn btn-outline-primary" type="button" onClick={() => setBusqueda('')}>
              Limpiar
            </button>)}
        </div>
      </div>
      <div className="row g-4">
        {resultados.map((profesional) => (<div className="col-sm-6 col-xl-3" key={profesional.id}>
            <article className="professional-card">
              <img src={profesional.imagen} alt={profesional.nombre}/>
              <div className="professional-card-body">
                <span className="eyebrow">{profesional.atencion}</span>
                <h2>{profesional.nombre}</h2>
                <p>{profesional.especialidad}</p>
                <div className="card-actions">
                  <Link className="btn btn-outline-primary" to={`/profesionales/${profesional.id}`}>Ver perfil</Link>
                  <Boton nombre="Iniciar sesión"/>
                </div>
              </div>
            </article>
          </div>))}
        {resultados.length === 0 && (<div className="col-12">
            <p className="empty-state">
              {profesionales.length === 0
                ? 'No hay profesionales disponibles.'
                : 'No encontramos profesionales con esa búsqueda.'}
            </p>
          </div>)}
      </div>
    </div>);
}
export default Profesionales;