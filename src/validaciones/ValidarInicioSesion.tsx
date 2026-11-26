async function ValidarSesion(correo: string, password: string): Promise<boolean> {
    try {
        const respuesta = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                correo: correo.trim(),
                password: password,
            }),
        })
        if(!respuesta.ok){
            const error = await respuesta.json()
            alert(error.mensaje)
            return false
        }
       
        const usuario = await respuesta.json()
        localStorage.setItem("usuarioSesion", JSON.stringify(usuario))
        alert("Logeado exitosamente")
        return true
    }catch(error){
        console.error("Error al iniciar sesion",error)
        alert("No se pudo contactar con el servidor. Intente nuevamente.")
        return false
    }
}

export default ValidarSesion