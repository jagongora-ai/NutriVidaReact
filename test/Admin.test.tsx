// @vitest-environment jsdom
import { expect, test } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from '@testing-library/react';
import GestionMedicos from '../src/pages/GestionMedicos';

test("Muestra tarjetas de medicos juntos sus botones", () => {
    render(
        <BrowserRouter>
            <GestionMedicos />
        </BrowserRouter>
    );
    expect(screen.getByText("Vista Equipo medicos")).toBeDefined()
    expect(screen.getByText('Nut. Carolina Fuentes M.')).toBeDefined()
    expect(screen.getAllByRole('button', { name: /Actualizar/i })[0]).toBeDefined()
    expect(screen.getAllByRole('button', { name: /Eliminar/i })[0]).toBeDefined()
})