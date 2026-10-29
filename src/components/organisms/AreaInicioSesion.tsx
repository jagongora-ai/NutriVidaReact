import { useState } from "react";
import Boton from "../atoms/Boton";
import Titulos from "../atoms/Titulos";
import CampoRegistro from "../molecules/CampoRegistro";
import ValidarInicioSesion from "../../validaciones/ValidarInicioSesion";
import { useNavigate } from "react-router-dom";

function AreaInicioSesion() {

    const navegar = useNavigate()

    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")

    const manejarLogin = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        const esLogeado = ValidarInicioSesion(correo, password)

        if (!esLogeado) {
            return;
        }

        const usuarioInicia = JSON.parse(localStorage.getItem("usuarioSesion") || "{}")

        if (usuarioInicia.rol == "admin") {
            navegar("/admin");
        } else if (usuarioInicia.rol == "medico") {
            navegar("/medico")
        } else
            navegar("/")

        return true;
    }

    return (

        <form onSubmit={manejarLogin}>
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
                    valor={correo}
                    alCambiar={setCorreo}
                />
                <CampoRegistro
                    etiqueta="Ingrese su contraseña"
                    tipo="password"
                    nombre="contraseña"
                    valor={password}
                    alCambiar={setPassword}
                />
                <Boton
                    nombre="Inicie sesion"
                />
            </div>
        </form>
    )
}
export default AreaInicioSesion