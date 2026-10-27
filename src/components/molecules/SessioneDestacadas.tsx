import Parrafos from "../atoms/Parrafos";
import Titulos from "../atoms/Titulos";

type PropsSessiones = {
    texto: string;
    subtitulo: string;
}

function SessionesDestacadas({ texto, subtitulo }: PropsSessiones) {
    return (
        <section className="container d-flex justify-content-center my-4">
            <div className="card shadow-sm border-0 col-12 col-md-8 col-lg-6">
                <div className="card-body text-center p-4">

                    <Titulos
                        texto={texto}
                    />
                    <Parrafos
                        texto={subtitulo}
                    />
                </div>
            </div>
        </section>
    )
}
export default SessionesDestacadas