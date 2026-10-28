export interface DatosRegistroLogin {
    nombre: string;
    rut: string;
    edad: number;
    correo: string;
    password: string;
    rol: "Cliente";
}

function ValidarRegistro(datos: DatosRegistroLogin): Boolean {


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



    if (datos.rut.trim() === "") {
        alert("El Rut es obligatorio")
        return false;
    }
    if (/\s/.test(datos.rut)) {
        alert("El RUT no debe contener espacios en blanco");
        return false;
    }
    if (datos.rut.length > 10) {
        alert("El rut no debe tener mas de 10 caracteres")
        return false;
    }



    if (Number.isNaN(datos.edad)) {
        alert("La edad solo debe ser numeros")
        return false;
    }

    if (datos.edad > 120 || datos.edad < 18) {
        alert("La edad maxima es de 120 años y la edad minima de registro es de 18 años")
        return false;
    }


    if (datos.correo.trim() === "") {
        alert("El correo es obligatorio")
        return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo)) {
        alert("Ingrese un correo con formato valido")
        return false;
    }

    if (datos.correo.length > 100 || datos.correo.length < 7) {
        alert("El correo debe tener entre 100 caracteres hasta 7")
        return false;
    }

    if (datos.password.trim() === "") {
        alert("La contraseña es obligatoria")
        return false;
    }

    if (datos.password.length > 12 || datos.password.length < 8) {
        alert("La contraseña debe tener entre 12 a 8 caracteres")
        return false;
    }
    return true
}

export default ValidarRegistro