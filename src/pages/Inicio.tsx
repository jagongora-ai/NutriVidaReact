
import { Link } from 'react-router-dom';
import Carrusel from '../components/organisms/Carrusel';

function Inicio() {
    return (<div className="container home-page">
      <Carrusel />

      <div className="row g-3 home-cards">
        <div className="col-sm-6">
          <article className="card home-card h-100">
            <div className="card-body">
              <h2 className="card-title">Nuestros profesionales</h2>
              <p className="card-text">Conoce al equipo que puede acompañarte en tu proceso nutricional.</p>
              <Link className="btn btn-primary" to="/profesionales">Ver profesionales</Link>
            </div>
          </article>
        </div>

        <div className="col-sm-6">
          <article className="card home-card h-100">
            <div className="card-body">
              <h2 className="card-title">¡Descubre nuestras novedades!</h2>
              <p className="card-text">Lee nuestros consejos y conoce más sobre nutrición y bienestar.</p>
              <Link className="btn btn-primary" to="/novedades">Novedades</Link>
            </div>
          </article>
        </div>
      </div>
    </div>);
}

export default Inicio;