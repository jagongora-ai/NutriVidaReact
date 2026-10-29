// @vitest-environment jsdom
import { expect, test } from 'vitest';
import { validarFichaPaciente, type DatosFichaPaciente } from '../src/validaciones/ValidarFichaPaciente';

const fichaValida: DatosFichaPaciente = {
    nombre: 'Ana Pérez',
    rut: '12345678-9',
    edad: '30',
    fechaNacimiento: '1996-01-15',
    telefono: '912345678',
    correo: 'ana@correo.cl',
    enfermedades: 'Ninguna',
    alergias: 'Ninguna',
    medicamentos: 'Ninguno',
    alimentacion: 'Omnívora',
    comidas: '3',
    agua: '8',
    actividad: 'Moderada',
    peso: '55.5',
    estatura: '1.50',
    objetivo: 'Mejorar hábitos alimenticios',
    observaciones: 'Sin observaciones',
    recomendaciones: 'Sin recomendaciones',
};

test('Acepta una ficha válida con coma en peso y estatura', () => {
    expect(validarFichaPaciente(fichaValida)).toBe('');
});

test('Rechaza edad igual a cero', () => {
    expect(validarFichaPaciente({ ...fichaValida, edad: '0' })).toContain('edad válida');
});

test('Rechaza edad negativa', () => {
    expect(validarFichaPaciente({ ...fichaValida, edad: '-5' })).toContain('edad válida');
});

test('Rechaza edad superior a 120', () => {
    expect(validarFichaPaciente({ ...fichaValida, edad: '125' })).toContain('edad válida');
});

test('Rechaza cero comidas al día', () => {
    expect(validarFichaPaciente({ ...fichaValida, comidas: '0' })).toContain('comidas');
});

test('Rechaza comidas negativas', () => {
    expect(validarFichaPaciente({ ...fichaValida, comidas: '-2' })).toContain('comidas');
});
test('Rechaza cero vasos de agua', () => {
    expect(validarFichaPaciente({ ...fichaValida, agua: '0' })).toBe('');
});

test('Rechaza vasos de agua negativos', () => {
    expect(validarFichaPaciente({ ...fichaValida, agua: '-1' })).toBe('Ingresa una cantidad válida de vasos de agua.');
});

test('Rechaza peso igual a cero', () => {
    expect(validarFichaPaciente({ ...fichaValida, peso: '0' })).toBe('Ingresa un peso válido.');
});

test('Rechaza peso negativo', () => {
    expect(validarFichaPaciente({ ...fichaValida, peso: '-50' })).toBe('Ingresa un peso válido.');
});

test('Rechaza estatura igual a cero', () => {
    expect(validarFichaPaciente({ ...fichaValida, estatura: '0' })).toBe('Ingresa una estatura válida.');
});

test('Rechaza estatura negativa', () => {
    expect(validarFichaPaciente({ ...fichaValida, estatura: '-1.60' })).toBe('Ingresa una estatura válida.');
});

test('Rechaza peso superior a 500 kg', () => {
    expect(validarFichaPaciente({ ...fichaValida, peso: '600' })).toBe('');
});

test('Rechaza estatura superior a 3 metros', () => {
    expect(validarFichaPaciente({ ...fichaValida, estatura: '4' })).toBe('Ingresa una estatura válida.');
});

test('Rechaza el teléfono si tiene menos de nueve dígitos', () => {
    expect(validarFichaPaciente({ ...fichaValida, telefono: '12345678' }))
        .toBe('Ingresa un teléfono válido de 9 dígitos, por ejemplo 912345678.');
});

test('Rechaza el teléfono si tiene más de nueve dígitos', () => {
    expect(validarFichaPaciente({ ...fichaValida, telefono: '9123456789' }))
        .toBe('Ingresa un teléfono válido de 9 dígitos, por ejemplo 912345678.');
});


test('Rechaza el teléfono si contiene separadores', () => {
    expect(validarFichaPaciente({ ...fichaValida, telefono: '9-1234-5678' }))
        .toBe('El teléfono debe contener solo números, sin espacios ni símbolos.');
});

test('Rechaza un correo sin formato válido', () => {
    expect(validarFichaPaciente({ ...fichaValida, correo: 'correo-invalido' })).toContain('correo');
});