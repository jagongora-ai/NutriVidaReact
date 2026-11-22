import type { Professional } from "../pages/Profesionales";

const profesionalesIniciales: Professional[] = [
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

function ObtenerProfesionales(): Professional[] {
    return profesionalesIniciales
}
export default ObtenerProfesionales
