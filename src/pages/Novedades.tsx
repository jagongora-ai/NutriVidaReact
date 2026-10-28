import { Link } from 'react-router-dom'
import TituloPagina from '../components/molecules/TituloPagina'

export type Novedad = {
    id: number
    titulo: string
    imagen: string
    resumen: string
    contenidoCompleto: string
}

/* eslint-disable react-refresh/only-export-components */
export const novedades: Novedad[] = [
    {
        id: 1,
        titulo: '5 Mitos Comunes sobre la Alimentación Saludable',
        imagen: '/novedad-1.jpg',
        resumen: 'Descubre la verdad detrás de las dietas restrictivas y aprende a comer de forma equilibrada sin culpa.',
        contenidoCompleto: 'Muchas veces creemos que comer saludable significa eliminar carbohidratos o comer solo ensaladas. En este artículo desmentimos los mitos más comunes:\n\n1. Los carbohidratos no son tus enemigos nocturnos.\n\n2. Comer grasas saludables, como palta y frutos secos, es vital para el sistema hormonal.\n\n3. Saltarse comidas no acelera el metabolismo.\n\nNuestro equipo en NutriVida te enseña a diseñar platos balanceados y sostenibles en el tiempo.',
    },
    {
        id: 2,
        titulo: 'La Importancia de la Hidratación en la Digestión',
        imagen: '/novedad-2.jpg',
        resumen: 'El agua es clave para el transporte de nutrientes y el buen funcionamiento intestinal. Conoce cuánto consumir diariamente.',
        contenidoCompleto: 'El agua interviene en casi todos los procesos metabólicos de nuestro organismo. Una hidratación adecuada ayuda a disolver los nutrientes para que sean absorbidos por el cuerpo, mejora el tránsito intestinal y evita la fatiga digestiva.\n\nEn Temuco, durante los meses fríos, solemos olvidar beber agua; por eso recomendamos consumir infusiones herbales sin azúcar para mantener los niveles óptimos.',
    },
]

function Novedades() {
    return (
        <div className="container page-space">
            <TituloPagina
                titulo="Consejos y Novedades"
                descripcion="Información complementaria para tu bienestar nutricional."
            />
            <div className="row g-4 justify-content-center">
                {
                    novedades.map((novedad) => (
                        <div className="col-12 col-md-6 col-lg-5" key={novedad.id}>
                            <article className="article-card">
                                <img src={novedad.imagen} alt={novedad.titulo} />
                                <div>
                                    <h2 className="text-center">{novedad.titulo}</h2>
                                    <p className="text-center flex-grow-1">{novedad.resumen}</p>
                                    <Link className="btn btn-primary w-100 mt-auto" to={`/novedades/${novedad.id}`}>
                                        Ver más
                                    </Link>
                                </div>
                            </article>
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Novedades

