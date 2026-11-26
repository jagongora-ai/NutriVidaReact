import Titulos from "../components/atoms/Titulos"
import { useState, type Dispatch, type SetStateAction } from "react"
import { type Professional } from './Profesionales';
import ObtenerProfesionales from "../validaciones/ObtenerProfesionales";
import CardAdmin from "../components/molecules/CardAdmin";
import EliminarMedico from "../validaciones/EliminarMedico";
import FormularioActualizar from "../components/organisms/FormularioActualizar"

type gestionMedicosProps = {
    medicos: Professional[]
    guardarMedicos: Dispatch<SetStateAction<Professional[]>>
}

function GestionarMedicos({ medicos, guardarMedicos }: gestionMedicosProps) {

    const [medicoSeleccionado, setMedicoSeleccionado] = useState<Professional | null>(null)

    async function eliminar(id: number) {
        if (await EliminarMedico(id)) {
            guardarMedicos(medicos.filter((m) => m.id !== id))
        }
    }

    return (
        <div className="container my-5">
            <Titulos texto=" Vista Equipo medicos " />

            {medicoSeleccionado && (
                <div className="mb-4 p-3 border rounded bg-light">
                    <FormularioActualizar
                        key={medicoSeleccionado.id}
                        medico={medicoSeleccionado}
                        alCerrar={() => {
                            setMedicoSeleccionado(null)
                            ObtenerProfesionales().then((lista) => guardarMedicos(lista))
                        }}
                    />
                </div>
            )}

            <div className="row g-4 mt-3">
                {medicos.map((medico) => (
                    <div key={medico.id} className="col-12 col-md-6 col-lg-4">
                        <CardAdmin
                            medico={medico}
                            alEliminar={() => eliminar(medico.id)}
                            alActualizar={() => setMedicoSeleccionado(medico)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GestionarMedicos
