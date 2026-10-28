import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Admin() {
    const navegar = useNavigate()

    useEffect(() => {
        const comprobando = JSON.parse((localStorage.getItem("usuarioSesion")) || "{}")
        if (comprobando.rol != "admin") {
            alert("Usted no tiene permisos para el modo administracion.")
            navegar("/inicioSesion")
        }
    }, []);

    return (
        <h1> Hola </h1>


    )
}
export default Admin