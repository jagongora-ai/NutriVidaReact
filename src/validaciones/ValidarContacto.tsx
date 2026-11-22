export interface DatosContacto {
    nombre: string;
    correo: string;
    asunto: string;
    mensaje: string;
}

function ValidarContacto(datos: DatosContacto): boolean {

    if (datos.nombre.trim() === "") {
        alert("El nombre es obligatorio")
        return false;
    }

    if (datos.nombre.trim().length < 3 || datos.nombre.length > 50) {
        alert("El nombre debe tener entre 3 a 50 caracteres")
        return false;
    }

    if (/\d/.test(datos.nombre)) {
        alert("El nombre no debe contener números")
        return false;
    }

    if (datos.correo.trim() === "") {
        alert("El correo es obligatorio")
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim())) {
        alert("Ingrese un correo con formato válido")
        return false;
    }

    if (datos.asunto.trim() === "") {
        alert("El asunto es obligatorio")
        return false;
    }

    if (datos.asunto.length > 80) {
        alert("El asunto no debe superar los 80 caracteres")
        return false;
    }

    if (datos.mensaje.trim() === "") {
        alert("El mensaje es obligatorio")
        return false;
    }

    if (datos.mensaje.trim().length < 10 || datos.mensaje.length > 500) {
        alert("El mensaje debe tener entre 10 a 500 caracteres")
        return false;
    }
    return true
}
export default ValidarContacto
