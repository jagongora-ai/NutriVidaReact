function CancelarCita(): boolean {

    const cancela = window.confirm("¿Está seguro de cancelar la hora agendada?")
    if (!cancela) {
        return false;
    }

    localStorage.removeItem("citaActual")
    alert("Hora cancelada con éxito")
    return true
}
export default CancelarCita
