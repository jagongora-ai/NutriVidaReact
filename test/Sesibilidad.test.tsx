// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profesionales from "../src/pages/Profesionales";

test("El filtro de búsqueda funciona ignorando mayúsculas y minúsculas", () => {
    const listaMedicos = [
        { id: 1, nombre: "Carolina Fuentes", especialidad: "Nutrición" }
    ];

    render(
        <BrowserRouter>
            <Profesionales profesionales={listaMedicos as any} />
        </BrowserRouter>
    );

    const buscador = screen.getByRole("searchbox");
    
    fireEvent.change(buscador, { target: { value: "carolina" } });
    expect(screen.getByText(/carolina fuentes/i)).toBeDefined();
});