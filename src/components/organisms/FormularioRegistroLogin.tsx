import Boton from "../atoms/Boton"
import CampoRegistro from "../molecules/CampoRegistro"


function FormularioRegistroLogin() {

    return (

        <form>
            <CampoRegistro
                etiqueta="Nombre completo"
                tipo="text"
                nombre="nombre"

            />

            <CampoRegistro
                etiqueta="Rut"
                tipo="text"
                nombre="Rut"
        
            />

            <CampoRegistro
                etiqueta="Edad"
                tipo="number"
                nombre="edad"
               
            />

            <CampoRegistro
                etiqueta="Correo electronico"
                tipo="email"
                nombre="Correo"
                
            />

            <CampoRegistro
                etiqueta="Contraseña"
                tipo="password"
                nombre="contraseña"
                
            />

            <Boton
                nombre="Registrarse"
            />
        </form>
    )

}

export default FormularioRegistroLogin