import { useState, type FormEvent } from "react"
import Boton from "../atoms/Boton"
import CampoMensaje from "../molecules/CampoMensaje"
import ResponderMensaje from "../../validaciones/ResponderMensaje"

type formularioRespuestaProps = {
    mensajeId: number
    alResponder: () => void
}

function FormularioRespuesta({ mensajeId, alResponder }: formularioRespuestaProps) {
    const [respuesta, setRespuesta] = useState("")

    const responder = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const respondido = ResponderMensaje(mensajeId, respuesta)
        if (respondido) {
            setRespuesta("")
            alResponder()
        }
    }

    return (
        <form className="mensaje-responder" onSubmit={responder} noValidate>
            <CampoMensaje
                etiqueta="Tu respuesta"
                nombre={`respuesta-${mensajeId}`}
                filas={3}
                valor={respuesta}
                alCambiar={setRespuesta}
            />
            <Boton nombre="Enviar respuesta" />
        </form>
    )
}

export default FormularioRespuesta
