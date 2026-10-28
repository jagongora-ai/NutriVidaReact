import { useState } from "react"
import Boton from "../atoms/Boton"
import BotonSecundario from "../atoms/BotonSecundario"
import CampoRegistro from "../molecules/CampoRegistro"
import ValidarRegistro from "../../validaciones/ValidarRegistroLogin"


function FormularioRegistroLogin() {

    const manejarDatosRegistro = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault()
 
        
        const datosFormulario = {
            nombre,
            rut,
            edad: Number(edad),
            correo,
            password
        };

        const esValido = ValidarRegistro(datosFormulario)

        if (!esValido) {
            return;
        }

        if(correo.endsWith("@gmail.com")){
            
        }
    }

    const [nombre, setNombre] = useState("")
    const [rut, setRut] = useState("")
    const [edad, setEdad] = useState("")
    const [correo, setCorreo] = useState("")
    const [password, setPassword] = useState("")

    return (

        <form className="form-check-label" onSubmit={manejarDatosRegistro} noValidate>
            <CampoRegistro
                etiqueta="Nombre completo"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
                
            />

            <CampoRegistro
                etiqueta="Rut"
                tipo="text"
                nombre="Rut"
                valor={rut}
                alCambiar={setRut}
            />

            <CampoRegistro
                etiqueta="Edad"
                tipo="number"
                nombre="edad"
                valor={edad}
                alCambiar={setEdad}
            />

            <CampoRegistro
                etiqueta="Correo electronico"
                tipo="email"
                nombre="Correo"
                valor={correo}
                alCambiar={setCorreo}
            />

            <CampoRegistro
                etiqueta="Contraseña"
                tipo="password"
                nombre="contraseña"
                valor={password}
                alCambiar={setPassword}
            />

            <div className="d-flex flex-column gap-3">
                <Boton
                    nombre="Registrarse"
                />
                <BotonSecundario
                    nombre="Limpiar campos"
                />
            </div>

        </form>
    )
}
export default FormularioRegistroLogin