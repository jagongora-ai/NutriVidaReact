import { Link, useParams } from 'react-router-dom';
import TituloPagina from '../components/molecules/TituloPagina';
import ListaPrestaciones from '../components/molecules/ListaPrestaciones';
import type { Prestacion } from '../validaciones/ObtenerPrestaciones';
import type { Professional } from './Profesionales';

function DetalleProfesional({ profesionales, prestaciones }: {
  profesionales: Professional[]
  prestaciones: Prestacion[]
}) {
  const { id } = useParams();
  const profesional = profesionales.find((persona) => persona.id === Number(id));
  if (!profesional)
    return <div className="container page-space">
      <div className="alert alert-warning">
        No encontramos ese perfil profesional.
      </div>
      <Link to="/profesionales">
        Volver al equipo
      </Link>
    </div>;
  return (<div className="container page-space">
    <TituloPagina titulo="Perfil profesional" descripcion="Conoce la experiencia y áreas de atención de nuestro equipo." />
    <div className="mb-4">
      <Link to="/profesionales" className="btn btn-outline-primary">← Volver a profesionales</Link>
    </div>
    <article className="profile-detail">
      <img src={profesional.imagen} alt={profesional.nombre} />
      <div className="profile-copy">
        <span className="eyebrow">{profesional.ubicacion} · {profesional.atencion}</span>

        <h2>{profesional.nombre}</h2>
        <h3>{profesional.especialidad}</h3>
        <p>{profesional.sobreMi}</p>
        
        <p><strong>Experiencia:</strong> {profesional.experiencia}</p>
        <h4>Formación</h4>
        <ul>{profesional.estudios.map((estudio) => <li key={estudio}>{estudio}</li>)}</ul>
        <h4>Áreas de atención</h4>
        <div className="tag-list">{profesional.areas.map((area) => <span key={area}>{area}</span>)}</div>
        <h4>Prestaciones y valores</h4>
        <ListaPrestaciones prestaciones={prestaciones} conDuracion />
        <div className="mt-4">
          <Link className="btn btn-primary" to={`/Agendar?profesional=${profesional.id}`}>
            Agendar hora con este profesional
          </Link>
        </div>
      </div>
    </article>
  </div>);
}

export default DetalleProfesional;