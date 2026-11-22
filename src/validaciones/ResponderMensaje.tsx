import { ObtenerMensajes } from "./GuardarMensaje";

function ResponderMensaje(id: number, respuesta: string): boolean {

    if (respuesta.trim() === "") {
        alert("La respuesta es obligatoria")
        return false;
    }

    if (respuesta.trim().length < 5 || respuesta.length > 500) {
        alert("La respuesta debe tener entre 5 a 500 caracteres")
        return false;
    }

    const mensajes = ObtenerMensajes()
    if (!mensajes.some((m) => m.id === id)) {
        alert("El mensaje ya no existe")
        return false;
    }

    const actualizados = mensajes.map((m) => m.id === id
        ? { ...m, respuesta: respuesta.trim(), estado: "Respondido", fechaRespuesta: new Date().toISOString() }
        : m)

    localStorage.setItem("mensajesContacto", JSON.stringify(actualizados))
    alert("Respuesta enviada con éxito")
    return true
}
export default ResponderMensaje
