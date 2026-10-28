import Titulos from "../components/atoms/Titulos"
import { useEffect, useState } from "react"
import { type Professional, profesionalesIniciales } from './Profesionales';
import CardAdmin from "../components/molecules/CardAdmin";
import EliminarMedico from "../validaciones/EliminarMedico";

function GestionarMedicos() {

    useEffect(() => {
        localStorage.setItem("medicos", JSON.stringify(profesionalesIniciales))
    }, [])

    const [medicos, setMedicos] = useState<Professional[]>(profesionalesIniciales)

    return (
        <div className="container my-5">
            <Titulos
                texto=" Vista Equipo medicos "
            />
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
                            alActualizar={() => alert("Medico actualizado")}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GestionarMedicos

