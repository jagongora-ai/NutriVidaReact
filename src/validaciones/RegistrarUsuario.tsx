import type { DatosRegistroLogin } from "./ValidarRegistroLogin";

async function RegistrarUsuario(datos: DatosRegistroLogin): Promise<boolean> {
    try {
        const respuesta = await fetch("http://localhost:8081/api/auth/registro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nombre: datos.nombre.trim(),
                rut: datos.rut.trim(),
                edad: datos.edad,
                correo: datos.correo.trim(),
                password: datos.password,
            }),
        })

        if (!respuesta.ok) {
            const error = await respuesta.json()
            alert(error.mensaje)
            return false
        }

        alert("Usuario Registrado con exito!!")
        return true

    } catch (error) {
        console.error("Error al registrar:", error)
        alert("No se pudo conectar con el servidor. Intente nuevamente.")
        return false
    }
}
export default RegistrarUsuario
