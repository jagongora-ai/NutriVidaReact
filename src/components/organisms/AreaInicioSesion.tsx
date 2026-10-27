import Boton from "../atoms/Boton";
import Titulos from "../atoms/Titulos";
import CampoRegistro from "../molecules/CampoRegistro";

function AreaInicioSesion() {
    return (
        <form>
            <div className="text-center mb-3">
                <Titulos
                    texto="Inicio Sesion"
                />
            </div>


            <div className="card-body">

                <CampoRegistro
                    etiqueta="Ingrese su correo Electronico"
                    tipo="email"
                    nombre="Correo"
                />

                <CampoRegistro
                    etiqueta="Ingrese su contraseña"
                    tipo="password"
                    nombre="contraseña"
                />
                <Boton
                    nombre="Inicie sesion"
                />
            </div>
        </form>
    )
}
export default AreaInicioSesion