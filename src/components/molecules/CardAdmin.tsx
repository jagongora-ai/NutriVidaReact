import type { Professional } from "../../pages/Profesionales";
import Boton from "../atoms/Boton";

type PropsMedico = {
    medico: Professional;
    alEliminar: () => void;
    alActualizar: () => void;
}

function CardAdmin({ medico, alEliminar, alActualizar }: PropsMedico) {

    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body text-center">
                <img src={medico.imagen} alt={medico.nombre}
                    className="rounded-circle mb-3" style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                />
                <h5> {medico.nombre} </h5>
                <p className="text-muted small"> {medico.especialidad}</p>
                <span className="badge bg-success mb-3"> Activo</span>
                <Boton
                    nombre="Actualizar"
                    onClick={alActualizar}
                />
                <Boton
                    nombre="Eliminar"
                    onClick={alEliminar}
                />
            </div>
        </div>

    )
}
export default CardAdmin;