import Titulos from "../components/atoms/Titulos"
import { useState } from "react"
import { type Professional, profesionalesIniciales } from './Profesionales';
import CardAdmin from "../components/molecules/CardAdmin";

function GestionarMedicos() {

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
                            alEliminar={() => alert("Medico eliminado con exito")}
                            alActualizar={() => alert("Medico actualizado")}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}
export default GestionarMedicos

