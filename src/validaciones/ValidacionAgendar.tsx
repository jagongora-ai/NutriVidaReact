export type DatosCitaMedica = {
    modalidad?: string;
    tipoConsulta: string;
    doctor: string;
    fecha: string;
    hora: string;
};

export function ValidarCitaMedica(datos: DatosCitaMedica): boolean {
    const { tipoConsulta, doctor, fecha, hora } = datos;

    if (!tipoConsulta || tipoConsulta.trim() === "") {
        alert("Por favor selecciona el tipo de consulta / prestación.");
        return false;
    }

    if (!doctor || doctor.trim() === "") {
        alert("Por favor selecciona un doctor o profesional.");
        return false;
    }

    if (!fecha || fecha.trim() === "") {
        alert("La fecha de la cita es obligatoria.");
        return false;
    }

    if (!hora || hora.trim() === "") {
        alert("La hora de la cita es obligatoria.");
        return false;
    }

    const [year, month, day] = fecha.split('-').map(Number);
    const fechaSeleccionada = new Date(year, month - 1, day);
    
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
        alert("La fecha a seleccionar no puede ser de los días anteriores.");
        return false;
    }

    const [horas, minutos] = hora.split(':').map(Number);
    const horaEnMinutos = horas * 60 + minutos;

    const inicioAtencion = 8 * 60;
    const finAtencion = 20 * 60;

    if (horaEnMinutos < inicioAtencion || horaEnMinutos > finAtencion) {
        alert("Las horas de atención son de 8:00 AM a 20:00 PM.");
        return false;
    }

    return true;
}

export default ValidarCitaMedica;