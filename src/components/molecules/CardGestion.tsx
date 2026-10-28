import Boton from "../atoms/Boton";
import Parrafos from "../atoms/Parrafos";
import TituloPagina from "./TituloPagina";

type PropsCardGestion = {
    titulo: string;
    descripcion: string;
    textoBoton: string;
    alHacerClick: () => void
}

function CardGestion({ titulo, descripcion, textoBoton, alHacerClick }: PropsCardGestion) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column justify-content-between text-center">
                <TituloPagina titulo={titulo} />
                <Parrafos texto={descripcion} />
                <Boton nombre={textoBoton} onClick={alHacerClick} />
            </div>
        </div>
    );
}

export default CardGestion;