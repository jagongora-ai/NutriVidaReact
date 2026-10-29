// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profesionales from "../src/pages/Profesionales";

test("Se comprueba que busque un profesional correctamente", () => {

    const listaProfesionales = [
        { id: 1, nombre: "Carolina Fuentes", especialidad: "Nutrición" },
        { id: 2, nombre: "Felipe Araya", especialidad: "Pediatría" }]
    render(
        <BrowserRouter>
            <Profesionales profesionales={listaProfesionales as any} />
        </BrowserRouter>
    )
    const buscador = screen.getByLabelText(/Buscar por nombre o especialidad/i);
    fireEvent.change(buscador, { target: { value: "Carolina" } });

    expect(screen.getByText(/Carolina/i)).toBeDefined();
    expect(screen.queryByText(/Felipe/i)).toBeNull();
});