import { useState, type FormEvent } from "react"
import Boton from "../atoms/Boton"
import CampoRegistro from "../molecules/CampoRegistro"
import CampoMensaje from "../molecules/CampoMensaje"
import ValidarContacto from "../../validaciones/ValidarContacto"
import GuardarMensaje from "../../validaciones/GuardarMensaje"
import { ObtenerSesion } from "../../validaciones/ValidarSesion"

type formularioContactoProps = {
    alEnviar: () => void
}

function FormularioContacto({ alEnviar }: formularioContactoProps) {
    const [sesion] = useState(ObtenerSesion)

    const [nombre, setNombre] = useState(sesion.nombre ?? "")
    const [correo, setCorreo] = useState(sesion.correo ?? "")
    const [asunto, setAsunto] = useState("")
    const [mensaje, setMensaje] = useState("")
    const [enviando, setEnviando] = useState(false)



    const enviarMensaje = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const datosContacto = { nombre, correo, asunto, mensaje }

        const esValido = ValidarContacto(datosContacto)
        if (!esValido) {
            return;
        }

        if(enviando) return;
        setEnviando(true)
        const guardado = await GuardarMensaje(datosContacto)
        setEnviando(false)

        if (guardado) {
            setAsunto("")
            setMensaje("")
            alEnviar()
        }
    }

    return (
        <form className="form-card contact-form" onSubmit={enviarMensaje} noValidate>
            <h2>Escríbenos</h2>

            <CampoRegistro
                etiqueta="Nombre completo"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
            />

            <CampoRegistro
                etiqueta="Correo electrónico"
                tipo="email"
                nombre="correo"
                valor={correo}
                alCambiar={setCorreo}
            />

            <CampoRegistro
                etiqueta="Asunto"
                tipo="text"
                nombre="asunto"
                valor={asunto}
                alCambiar={setAsunto}
            />

            <CampoMensaje
                etiqueta="Mensaje"
                nombre="mensaje"
                filas={5}
                valor={mensaje}
                alCambiar={setMensaje}
            />

            <Boton nombre={enviando ? "Enviando..." : "Enviar Mensaje"}
                deshabilitado = {enviando}
            />
        </form>
    )
}

export default FormularioContacto
