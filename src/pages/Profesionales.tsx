import { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/atoms/Input';
import TituloPagina from '../components/molecules/TituloPagina';
import ListaPrestaciones from '../components/molecules/ListaPrestaciones';
import ObtenerPrestaciones from '../validaciones/ObtenerPrestaciones';
import { ObtenerSesion } from '../validaciones/ValidarSesion';


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


function Profesionales({ profesionales }: {
    profesionales: Professional[]
}) {
    const [busqueda, setBusqueda] = useState('');
    const prestaciones = ObtenerPrestaciones();
    const haySesion = Boolean(ObtenerSesion().rol);
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
                <span className="price-title">Valores de atención</span>
                <ListaPrestaciones prestaciones={prestaciones}/>
                <div className="card-actions">

                  <Link className="btn btn-outline-primary" to={`/profesionales/${profesional.id}`}>
                  Ver perfil
                  </Link>

                  {haySesion ? (<button className="btn btn-primary" type="button" disabled>
                  Iniciar sesión
                  </button>) : (<Link className="btn btn-primary" to="/inicioSesion">
                  Iniciar sesión
                  </Link>)}
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
