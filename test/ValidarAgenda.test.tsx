import { afterEach, expect, test, vi } from 'vitest'
import { ValidarCitaMedica, type DatosCitaMedica } from '../src/validaciones/ValidacionAgendar'
import AgendarCita from '../src/validaciones/AgendarCita'

const manana = new Date();
manana.setDate(manana.getDate() + 1);
const fechaFutura = `${manana.getFullYear()}-${String(manana.getMonth() + 1).padStart(2, '0')}-${String(manana.getDate()).padStart(2, '0')}`;

const citaValida: DatosCitaMedica = {
    tipoConsulta: 'Consulta Nutricional',
    doctor: 'Nut. Carolina Fuentes M.',
    fecha: fechaFutura,
    hora: '10:00',
};

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    localStorage.clear();
});

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

test('AgendarCita envía la cita a ms-agendar y la deja pendiente de pago', async () => {
    localStorage.setItem('usuarioSesion', JSON.stringify({ rol: 'Cliente', correo: 'manuel@prueba.cl', token: 'token-cliente' }));
    const citaCreada = { id: 7, correo: 'manuel@prueba.cl', estado: 'PENDIENTE' };
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => citaCreada });
    vi.stubGlobal('fetch', fetchFalso);

    const datos = { tipoConsulta: 'Consulta', doctorId: 1, fecha: fechaFutura, hora: '10:00', modalidad: 'Presencial' };
    expect(await AgendarCita(datos)).toBe(true);

    expect(fetchFalso).toHaveBeenCalledWith('http://localhost:8080/api/citas', expect.objectContaining({ method: 'POST', body: JSON.stringify(datos) }));
    expect(JSON.parse(localStorage.getItem('citaActual') || 'null')).toEqual(citaCreada);
});

test('Si la hora ya está tomada se muestra el mensaje del backend', async () => {
    const alerta = vi.spyOn(window, 'alert').mockImplementation(() => { });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ mensaje: 'Esa hora ya fue tomada por otro paciente, por favor elige otra' }),
    }));

    expect(await AgendarCita({ doctorId: 1 })).toBe(false);
    expect(alerta).toHaveBeenCalledWith('Esa hora ya fue tomada por otro paciente, por favor elige otra');
    expect(localStorage.getItem('citaActual')).toBeNull();
});
