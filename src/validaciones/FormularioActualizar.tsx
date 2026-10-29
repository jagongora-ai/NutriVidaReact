export interface datosActualizar {
    nombre: string;
    especialidad: string;
    imagen: string;
    experiencia: string;
    estudios: string[];
}

function ValidarActualizar(datos: datosActualizar): boolean {


    if (datos.nombre.trim() === "") {
        alert("El nombre es obligatorio")
        return false;
    }

    if (datos.nombre.length < 7 || datos.nombre.length > 50) {
        alert("El nombre debe tener entre 7 a 50 caracteres")
        return false;
    }

    if (/\d/.test(datos.nombre)) {
        alert("El nombre no debe contener numeros")
        return false;
    }

    if (datos.especialidad.trim() === "") {
        alert("La especialidad es obligatorio")
        return false;
    }

    if (datos.especialidad.length > 120) {
        alert("El maximo de caracteres es de 120")
        return false;
    }

    if (datos.imagen.trim() === "") {
        alert("La imagen es obligatoria");
        return false;
    }

    const extensionValida = /\.(jpg|jpeg|png|gif|webp)$/i.test(datos.imagen.trim());

    if (!extensionValida) {
        alert("La imagen debe tener un formato válido (.jpg, .png, .webp)");
        return false;
    }

    if (datos.experiencia.trim() === "") {
        alert("La experiencia es obligatoria")
        return false;
    }
    return true
}
export default ValidarActualizar