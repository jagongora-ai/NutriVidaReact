
import SessionesDestacadas from '../components/molecules/SessioneDestacadas';
import Carrusel from '../components/organisms/Carrusel';

function Inicio() {
  return (
    <div className="container home-page">
      <SessionesDestacadas
        texto='Tu salud fisica nos importa'
        subtitulo='¡¡ Navege por nuestra web !!'
      />
      <Carrusel />
    </div>

  );
}

export default Inicio;