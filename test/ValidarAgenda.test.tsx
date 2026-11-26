import { expect, test } from 'vitest'
import { ValidarCitaMedica, type DatosCitaMedica } from '../src/validaciones/ValidacionAgendar'

const manana = new Date();
manana.setDate(manana.getDate() + 1);
const fechaFutura = `${manana.getFullYear()}-${String(manana.getMonth() + 1).padStart(2, '0')}-${String(manana.getDate()).padStart(2, '0')}`;

const citaValida: DatosCitaMedica = {
    tipoConsulta: 'Consulta Nutricional',
    doctor: 'Nut. Carolina Fuentes M.',
    fecha: fechaFutura,
    hora: '10:00',
};

test('Acepta una cita médica completamente válida', () => {
    expect(ValidarCitaMedica(citaValida)).toBe('');
});

test('Rechaza si el tipo de consulta está vacío', () => {
    expect(ValidarCitaMedica({ ...citaValida, tipoConsulta: '' })).toContain('tipo de consulta');
});

test('Rechaza si no se selecciona un doctor', () => {
    expect(ValidarCitaMedica({ ...citaValida, doctor: '' })).toContain('doctor');
});

test('Rechaza si la fecha está vacía', () => {
    expect(ValidarCitaMedica({ ...citaValida, fecha: '' })).toContain('fecha');
});

test('Rechaza si la hora está vacía', () => {
    expect(ValidarCitaMedica({ ...citaValida, hora: '' })).toContain('hora');
});

test('Rechaza una fecha anterior a la actual', () => {
    expect(ValidarCitaMedica({ ...citaValida, fecha: '2020-01-01' })).toContain('fecha');
});

test('Rechaza un horario anterior al inicio de atención (antes de las 08:00)', () => {
    expect(ValidarCitaMedica({ ...citaValida, hora: '07:30' })).toContain('8:00 AM');
});

test('Rechaza un horario posterior al cierre de atención (después de las 20:00)', () => {
    expect(ValidarCitaMedica({ ...citaValida, hora: '20:30' })).toContain('20:00 PM');
});