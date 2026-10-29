export type DatosTarjeta = {
    titular: string
    numero: string
    vencimiento: string
    cvv: string
}

function numeroTarjetaValido(numero: string) {
    const digitos = numero.replace(/\s/g, '');
    return /^\d{13,19}$/.test(digitos);
}

export function validarPago(datos: DatosTarjeta): string {
    if (!datos.titular.trim())
        return 'Ingresa el nombre del titular.';
    if (!/^[\p{L}][\p{L}\s'-]{1,79}$/u.test(datos.titular.trim()))
        return 'Ingresa el nombre del titular tal como aparece en la tarjeta.';

    if (!datos.numero.trim())
        return 'Ingresa el número de la tarjeta.';
    if (!numeroTarjetaValido(datos.numero))
        return 'Ingresa un número de tarjeta válido.';

    if (!datos.vencimiento.trim())
        return 'Ingresa la fecha de vencimiento.';
    const vencimiento = datos.vencimiento.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
    if (!vencimiento)
        return 'Ingresa el vencimiento en formato MM/AA.';

    const mes = Number(vencimiento[1]);
    const anio = 2000 + Number(vencimiento[2]);
    const ahora = new Date();
    if (anio < ahora.getFullYear() || (anio === ahora.getFullYear() && mes < ahora.getMonth() + 1))
        return 'La tarjeta está vencida.';

    if (!datos.cvv.trim())
        return 'Ingresa el código de seguridad.';
    if (!/^\d{3,4}$/.test(datos.cvv))
        return 'El código de seguridad debe tener 3 o 4 dígitos.';

    return '';
}
