import { expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import GestionMedicos from '../src/pages/GestionMedicos';
import type { Professional } from '../src/pages/Profesionales';

const medicos: Professional[] = [
    {
        id: 1,
        nombre: 'Nut. Carolina Fuentes M.',
        especialidad: 'Especialista en Nutrición y Pérdida de Peso',
        imagen: '/ProfesionalesIMG/medica 1.jpg',
        ubicacion: 'Temuco, Chile',
        atencion: 'Presencial y Online',
        experiencia: 'Más de 10 años en nutrición clínica',
        sobreMi: 'Diseña planes de alimentación equilibrados.',
        estudios: ['Nutrición, Universidad de La Frontera'],
        areas: ['Pérdida de peso'],
    },
]

test("Muestra tarjetas de medicos juntos sus botones", () => {
    render(
        <BrowserRouter>
            <GestionMedicos medicos={medicos} guardarMedicos={() => { }} />
        </BrowserRouter>
    );
    expect(screen.getByText("Vista Equipo medicos")).toBeDefined()
    expect(screen.getByText('Nut. Carolina Fuentes M.')).toBeDefined()
    expect(screen.getAllByRole('button', { name: /Actualizar/i })[0]).toBeDefined()
    expect(screen.getAllByRole('button', { name: /Eliminar/i })[0]).toBeDefined()
})
