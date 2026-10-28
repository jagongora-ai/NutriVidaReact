function EliminarMedico(id: number): boolean {

    const cancela = window.confirm("¿Esta seguro de eliminar?")
    if (!cancela) {
        return false;
    }

    const medicoBuscado = localStorage.getItem("medicos") || "[]"
    const medicoListado = JSON.parse(medicoBuscado)

    if (medicoListado.length === 0) {
        alert("No hay medicos en el sistema")
        return false;
    }
    const nuevaLista = medicoListado.filter((m: any) => m.id !== id)

    localStorage.setItem("medicos", JSON.stringify(nuevaLista))
    alert("Medico eliminado con exito")
    return true;
}
export default EliminarMedico