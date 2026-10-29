import { useState } from "react"
import { type Professional } from "../../pages/Profesionales"
import ValidarActualizar from "../../validaciones/FormularioActualizar";
import ActualizarMedico from "../../validaciones/ActualizarMedico";
import CampoRegistro from "../molecules/CampoRegistro";
import Boton from "../atoms/Boton";
import BotonSecundario from "../atoms/BotonSecundario";

type actualizarProps = {
    medico: Professional;
    alCerrar: () => void;
}


function FormularioActualizar({ medico, alCerrar }: actualizarProps) {

    const [nombre, setNombre] = useState(medico.nombre)
    const [especialidad, setEspecialidad] = useState(medico.especialidad)
    const [imagen, setImagen] = useState(medico.imagen)
    const [experiencia, setExperiencia] = useState(medico.experiencia)
    const [estudios, setEstudios] = useState(medico.estudios)

    const accionActualizar = (e: React.FormEvent) => {

        e.preventDefault()
        const datosAValidar = { nombre, especialidad, imagen, experiencia, estudios }

        const esValido = ValidarActualizar(datosAValidar)
        if (!esValido)
            return


        const medicoEditado: Professional = {
            ...medico,
            nombre,
            especialidad,
            imagen,
            experiencia,
            estudios
        }
        const actualizado = ActualizarMedico(medicoEditado)
        if (actualizado) {
            alCerrar()
        }
    }
    return (

        <form className="form-check-label" onSubmit={accionActualizar} noValidate>
            <CampoRegistro
                etiqueta="Nombre completo"
                tipo="text"
                nombre="nombre"
                valor={nombre}
                alCambiar={setNombre}
            />

            <CampoRegistro
                etiqueta="Especialidad"
                tipo="text"
                nombre="Especialidad"
                valor={especialidad}
                alCambiar={setEspecialidad}
            />

            <CampoRegistro
                etiqueta="Estudios"
                tipo="text"
                nombre="Estudios"
                valor={estudios.join(", ")}
                alCambiar={(e) => setEstudios(e.split(",").map(item => item.trim()))}
            />

            <CampoRegistro
                etiqueta="URL Imagen"
                tipo="text"
                nombre="imagen"
                valor={imagen}
                alCambiar={setImagen}
            />


            <CampoRegistro
                etiqueta="Experiencia"
                tipo="text"
                nombre="experiencia"
                valor={experiencia}
                alCambiar={setExperiencia}
            />

            <Boton
                nombre="Actualizar"
            />

            <BotonSecundario
                nombre="Limpiar"
                onClick={alCerrar}
            />
        </form>


    )
}
export default FormularioActualizar