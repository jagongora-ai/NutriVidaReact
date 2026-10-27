import { useEffect, useState } from 'react';

const imagenes = [
    { src: '/nutricionista.jpg', alt: 'Nutricionista en consulta' },
    { src: '/cuidaCorazon.webp', alt: 'Cuidado del corazón y alimentación saludable' },
    { src: '/nutricionistas.webp', alt: 'Equipo de profesionales de NutriVida' },
];

function Carrusel() {
    const [indice, setIndice] = useState(0);
    const imagen = imagenes[indice];

    useEffect(() => {
        // Avanza automáticamente y limpia el temporizador al desmontar el carrusel.
        const intervalo = window.setInterval(() => {
            setIndice((actual) => (actual + 1) % imagenes.length);
        }, 5000);
        return () => window.clearInterval(intervalo);
    }, []);

    return (
        <section className="hero-carousel" aria-label="Galería de NutriVida">
            <img src={imagen.src} alt={imagen.alt}/>
            <button className="carousel-control carousel-previous" type="button" onClick={() => setIndice((actual) => (actual - 1 + imagenes.length) % imagenes.length)} aria-label="Imagen anterior">
                ‹
            </button>
            <button className="carousel-control carousel-next" type="button" onClick={() => setIndice((actual) => (actual + 1) % imagenes.length)} aria-label="Imagen siguiente">
                ›
            </button>
            <div className="carousel-indicators" aria-label="Seleccionar imagen">
                {imagenes.map((item, posicion) => (
                    <button
                        key={item.src}
                        className={posicion === indice ? 'active' : ''}
                        type="button"
                        aria-label={`Mostrar imagen ${posicion + 1}`}
                        aria-current={posicion === indice ? 'true' : undefined}
                        onClick={() => setIndice(posicion)}
                    />
                ))}
            </div>
        </section>
    );
}

export default Carrusel;

// ‹ › Símbolos de interfaz (UI): Se utiliza frecuentemente como icono visual para botones de navegación, 
//como la flecha de "retroceder" o "anterior" en menús, paginaciones y carruseles