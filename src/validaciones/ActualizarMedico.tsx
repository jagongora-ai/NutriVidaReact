import type { Professional } from "../pages/Profesionales";

function ActualizarMedico(medicoEditado: Professional): boolean {

    const quiereActualizar = window.confirm("¿Esta seguro de actualizar?")

    if (!quiereActualizar) {
        return false;
    }

    const buscarMedico = localStorage.getItem("medicos") || "[]"
    const medicoBuscado = JSON.parse(buscarMedico)

    if (medicoBuscado.length === 0) {
        alert("No hay medicos en el sistema para actualizar")
        return false;
    }

    const editado = medicoBuscado.map((m: any) => m.id === medicoEditado.id ? medicoEditado : m)
    localStorage.setItem("medicos", JSON.stringify(editado))

    alert("Actualizado con exito")
    return true
}
export default ActualizarMedico