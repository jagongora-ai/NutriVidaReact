import { expect, test } from 'vitest'
import { validarFichaPaciente, DatosFichaPaciente } from '../validaciones/ValidarFichaPaciente'


const fichaValida: DatosFichaPaciente = {
    nombre: 'Ana Pérez',
    rut: '12.345.678-9',
    edad: '30',
    fechaNacimiento: '1996-01-15',
    telefono: '912345678',
    correo: 'ana@correo.cl',
    enfermedades: '',
    alergias: '',
    medicamentos: '',
    alimentacion: 'Omnívora',
    comidas: '3',
    agua: '8',
    actividad: 'Moderada',
    peso: '55,5',
    estatura: '1,50',
    objetivo: 'Mejorar hábitos alimenticios',
    observaciones: 'Sin observaciones',
    recomendaciones: '',
};

test('Acepta una ficha válida con coma en peso y estatura', () => {
    expect(validarFichaPaciente(fichaValida)).toBe('');
});

test('Rechaza edad igual a cero', () => {
    expect(validarFichaPaciente({ ...fichaValida, edad: '0' })).toContain('edad válida');
});

test('Rechaza edad negativa', () => {
    expect(validarFichaPaciente({ ...fichaValida, edad: '-1' })).toContain('edad válida');
});

test('Rechaza edad superior a 120', () => {
    expect(validarFichaPaciente({ ...fichaValida, edad: '121' })).toContain('edad válida');
});

test('Rechaza cero comidas al día', () => {
    expect(validarFichaPaciente({ ...fichaValida, comidas: '0' })).toContain('cantidad válida');
});

test('Rechaza comidas negativas', () => {
    expect(validarFichaPaciente({ ...fichaValida, comidas: '-2' })).toContain('cantidad válida');
});

test('Rechaza cero vasos de agua', () => {
    expect(validarFichaPaciente({ ...fichaValida, agua: '0' })).toContain('cantidad positiva');
});

test('Rechaza vasos de agua negativos', () => {
    expect(validarFichaPaciente({ ...fichaValida, agua: '-1' })).toContain('cantidad positiva');
});

test('Rechaza peso igual a cero', () => {
    expect(validarFichaPaciente({ ...fichaValida, peso: '0' })).toBe('Ingresa un peso válido.');
});

test('Rechaza peso negativo', () => {
    expect(validarFichaPaciente({ ...fichaValida, peso: '-55' })).toBe('Ingresa un peso válido.');
});

test('Rechaza estatura igual a cero', () => {
    expect(validarFichaPaciente({ ...fichaValida, estatura: '0' })).toBe('Ingresa una estatura válida.');
});

test('Rechaza estatura negativa', () => {
    expect(validarFichaPaciente({ ...fichaValida, estatura: '-1,50' })).toBe('Ingresa una estatura válida.');
});

test('Rechaza peso superior a 500 kg', () => {
    expect(validarFichaPaciente({ ...fichaValida, peso: '501' })).toBe('Ingresa un peso válido.');
});

test('Rechaza estatura superior a 3 metros', () => {
    expect(validarFichaPaciente({ ...fichaValida, estatura: '3,1' })).toBe('Ingresa una estatura válida.');
});

test('Rechaza el teléfono si tiene menos de nueve dígitos', () => {
    expect(validarFichaPaciente({ ...fichaValida, telefono: '91234567' }))
        .toBe('El teléfono debe contener exactamente 9 dígitos seguidos.');
});

test('Rechaza el teléfono si tiene más de nueve dígitos', () => {
    expect(validarFichaPaciente({ ...fichaValida, telefono: '9123456780' }))
        .toBe('El teléfono debe contener exactamente 9 dígitos seguidos.');
});

test('Rechaza el teléfono si contiene separadores', () => {
    expect(validarFichaPaciente({ ...fichaValida, telefono: '912 345678' }))
        .toBe('El teléfono debe contener exactamente 9 dígitos seguidos.');
});

test('Rechaza un correo sin formato válido', () => {
    expect(validarFichaPaciente({ ...fichaValida, correo: 'ana-correo' }))
        .toBe('Ingresa un correo electrónico válido.');
});
