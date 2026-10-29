export type DatosCitaMedica = {
    modalidad?: string;
    tipoConsulta: string;
    doctor: string;
    fecha: string;
    hora: string;
};

export function ValidarCitaMedica(datos: DatosCitaMedica): string {
    const { tipoConsulta, doctor, fecha, hora } = datos;

    if (!tipoConsulta || tipoConsulta.trim() === "") {
        return "Por favor selecciona el tipo de consulta / prestación.";
    }

    if (!doctor || doctor.trim() === "") {
        return "Por favor selecciona un doctor o profesional.";
    }

    if (!fecha || fecha.trim() === "") {
        return "La fecha de la cita es obligatoria.";
    }

    if (!hora || hora.trim() === "") {
        return "La hora de la cita es obligatoria.";
    }

    const [year, month, day] = fecha.split('-').map(Number);
    const fechaSeleccionada = new Date(year, month - 1, day);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (fechaSeleccionada < hoy) {
        return "La fecha a seleccionar no puede ser de los días anteriores.";
    }

    const [horas, minutos] = hora.split(':').map(Number);
    const horaEnMinutos = horas * 60 + minutos;

    const inicioAtencion = 8 * 60;
    const finAtencion = 20 * 60;

    if (horaEnMinutos < inicioAtencion || horaEnMinutos > finAtencion) {
        return "Las horas de atención son de 8:00 AM a 20:00 PM.";
    }

    return "";
}

export default ValidarCitaMedica;