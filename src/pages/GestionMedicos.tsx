import Titulos from "../components/atoms/Titulos"
import { useEffect, useState } from "react"
import { type Professional } from './Profesionales';
import ObtenerProfesionales from "../validaciones/ObtenerProfesionales";
import CardAdmin from "../components/molecules/CardAdmin";
import EliminarMedico from "../validaciones/EliminarMedico";
import FormularioActualizar from "../components/organisms/FormularioActualizar"

function GestionarMedicos() {

    useEffect(() => {
        localStorage.setItem("medicos", JSON.stringify(ObtenerProfesionales()))
    }, [])

    const [medicos, setMedicos] = useState<Professional[]>(ObtenerProfesionales)
    const [medicoSeleccionado, setMedicoSeleccionado] = useState<Professional | null>(null)

    return (
        <div className="container my-5">
            <Titulos texto=" Vista Equipo medicos " />

            {medicoSeleccionado && (
                <div className="mb-4 p-3 border rounded bg-light">
                    <FormularioActualizar
                        medico={medicoSeleccionado}
                        alCerrar={() => {
                            setMedicoSeleccionado(null)

                            const guardados = localStorage.getItem("medicos")
                            if (guardados) {
                                setMedicos(JSON.parse(guardados))
                            }
                        }}
                    />
                </div>
            )}

            <div className="row g-4 mt-3">
                {medicos.map((medico) => (
                    <div key={medico.id} className="col-12 col-md-6 col-lg-4">
                        <CardAdmin
                            medico={medico}
                            alEliminar={() => {
                                if (EliminarMedico(medico.id)) {
                                    setMedicos(medicos.filter((m) => m.id !== medico.id))
                                }
                            }}
                            alActualizar={() => setMedicoSeleccionado(medico)}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GestionarMedicos

