export type DatosFichaPaciente = {
    nombre: string
    rut: string
    edad: string
    fechaNacimiento: string
    telefono: string
    correo: string
    enfermedades: string
    alergias: string
    medicamentos: string
    alimentacion: string
    comidas: string
    agua: string
    actividad: string
    peso: string
    estatura: string
    objetivo: string
    observaciones: string
    recomendaciones: string
}

export function validarFichaPaciente(datos: DatosFichaPaciente): string {
    if (!datos.nombre.trim())
        return 'Ingresa el nombre del paciente.';
    if (!datos.rut.trim())
        return 'Ingresa el RUT del paciente.';
    if (!/^\d{7,8}-[\dkK]$/.test(datos.rut.trim()))
        return 'Ingresa un RUT válido, por ejemplo 12345678-9.';
    if (!datos.edad.trim())
        return 'Ingresa la edad del paciente.';
    if (!/^\d+$/.test(datos.edad.trim()) || !Number.isInteger(Number(datos.edad)) || Number(datos.edad) < 1 || Number(datos.edad) > 120)
        return 'Ingresa una edad válida entre 1 y 120 años.';
    if (!datos.fechaNacimiento.trim())
        return 'Selecciona la fecha de nacimiento del paciente.';
    if (!Number.isFinite(Date.parse(datos.fechaNacimiento)) || new Date(`${datos.fechaNacimiento}T00:00:00`) > new Date(new Date().setHours(0, 0, 0, 0)))
        return 'Ingresa una fecha de nacimiento válida.';
    if (!datos.telefono.trim())
        return 'Ingresa el teléfono del paciente.';
    if (!/^\d+$/.test(datos.telefono.trim()))
        return 'El teléfono debe contener solo números, sin espacios ni símbolos.';
    if (!datos.correo.trim())
        return 'Ingresa el correo electrónico del paciente.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.correo.trim()))
        return 'Ingresa un correo electrónico válido.';
    if (!datos.enfermedades.trim())
        return 'Ingresa las enfermedades del paciente o escribe "Ninguna".';
    if (!datos.alergias.trim())
        return 'Ingresa las alergias del paciente o escribe "Ninguna".';
    if (!datos.medicamentos.trim())
        return 'Ingresa los medicamentos del paciente o escribe "Ninguno".';
    if (!datos.alimentacion.trim())
        return 'Selecciona el tipo de alimentación.';
    if (!['Omnívora', 'Vegetariana', 'Vegana', 'Otra'].includes(datos.alimentacion))
        return 'Selecciona un tipo de alimentación válido.';
    if (!datos.comidas.trim())
        return 'Ingresa la cantidad de comidas al día.';
    if (!/^\d+$/.test(datos.comidas.trim()) || !Number.isInteger(Number(datos.comidas)) || Number(datos.comidas) < 1 || Number(datos.comidas) > 15)
        return 'Ingresa una cantidad válida de comidas al día.';
    if (!datos.agua.trim())
        return 'Ingresa la cantidad de vasos de agua al día.';
    if (!/^\d+$/.test(datos.agua.trim()) || !Number.isFinite(Number(datos.agua)) || Number(datos.agua) < 0 || Number(datos.agua) > 40)
        return 'Ingresa una cantidad válida de vasos de agua.';
    if (!datos.actividad.trim())
        return 'Selecciona el nivel de actividad física.';
    if (!['Sedentaria', 'Leve', 'Moderada', 'Intensa'].includes(datos.actividad))
        return 'Selecciona un nivel de actividad física válido.';
    if (!datos.peso.trim())
        return 'Ingresa el peso del paciente.';
    if (!/^\d+(\.\d+)?$/.test(datos.peso.trim()) || !Number.isFinite(Number(datos.peso)) || Number(datos.peso) <= 0 || Number(datos.peso) > 500)
        return 'Ingresa un peso válido.';
    if (!datos.estatura.trim())
        return 'Ingresa la estatura del paciente.';
    if (!/^\d+(\.\d+)?$/.test(datos.estatura.trim()) || !Number.isFinite(Number(datos.estatura)) || Number(datos.estatura) <= 0 || Number(datos.estatura) > 3)
        return 'Ingresa una estatura válida.';
    if (!datos.objetivo.trim())
        return 'Ingresa el objetivo nutricional.';
    if (!datos.observaciones.trim())
        return 'Ingresa las observaciones del profesional.';
    if (!datos.recomendaciones.trim())
        return 'Ingresa las recomendaciones del profesional.';
    return '';
}