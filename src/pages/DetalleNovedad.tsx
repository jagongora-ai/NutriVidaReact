import { Link, useParams } from 'react-router-dom'
import TituloPagina from '../components/molecules/TituloPagina'
import { novedades } from './Novedades'

function DetalleNovedad() {
    const { id } = useParams()
    const novedad = novedades.find((publicacion) => publicacion.id === Number(id))

    if (!novedad) {
        return (
            <div className="container page-space">
                <div className="alert alert-warning text-center">Publicación no encontrada.</div>
                <div className="text-center">
                    <Link className="btn btn-outline-primary" to="/novedades">Volver a Novedades</Link>
                </div>
            </div>
        )
    }

    return (
        <div className="container page-space">
            <article className="article-detail mx-auto">
                <img src={novedad.imagen} alt={novedad.titulo} />
                <TituloPagina titulo={novedad.titulo} descripcion={novedad.resumen} />
                <p className="article-content">{novedad.contenidoCompleto}</p>
                <div className="text-center">
                    <Link className="btn btn-outline-secondary" to="/novedades">Volver a Novedades</Link>
                </div>
            </article>
        </div>
    )
}

export default DetalleNovedad