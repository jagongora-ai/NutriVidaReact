import { useState } from "react";
import Boton from "../atoms/Boton";
import Titulos from "../atoms/Titulos";
import CampoRegistro from "../molecules/CampoRegistro";
import ValidarInicioSesion from "../../validaciones/ValidarInicioSesion";
import { Link, useLocation, useNavigate } from "react-router-dom";

function AreaInicioSesion() {

    const navegar = useNavigate()
    const estado = useLocation().state as { desde?: string, mensaje?: string } | null

    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")
    const [enviando, setEnviando] = useState(false)

    const manejarLogin = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (enviando) { return; }

        setEnviando(true)
        const esLogeado = await ValidarInicioSesion(correo, password)

        setEnviando(false)
        if (!esLogeado) { return; }

        const usuarioInicia = JSON.parse(localStorage.getItem("usuarioSesion") || "{}")

        if (usuarioInicia.rol == "admin") {
            navegar("/admin");
        } else if (usuarioInicia.rol == "medico") {
            navegar("/medico")
        } else
            navegar(estado?.desde ?? "/")

        return true;
    }

    return (

        <form onSubmit={manejarLogin}>
            <div className="text-center mb-3">
                <Titulos
                    texto="Inicio Sesion"
                />
            </div>


            {estado?.mensaje && (
                <div className="alert alert-info" role="alert">
                    {estado.mensaje}
                </div>
            )}

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
                    nombre={enviando ? "Ingresando..." : "Inicie sesion"}
                    deshabilitado = {enviando}
                />
                <p className="login-registro">
                    ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
                </p>
            </div>
        </form>
    )
}
export default AreaInicioSesion