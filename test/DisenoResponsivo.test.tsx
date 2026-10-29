// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profesionales from "../src/pages/Profesionales";

test("Se comprueba que la lista de profesionales aplique las clases de diseño responsivo", () => {
    const listaMedicos = [
        { id: 1, nombre: "Carolina Fuentes", especialidad: "Nutrición" }
    ];

    render(
        <BrowserRouter>
            <Profesionales profesionales={listaMedicos as any} />
        </BrowserRouter>
    );
    const nombreMedico = screen.getByText(/Carolina Fuentes/i);
    const contenedorColumna = nombreMedico.closest(".col-sm-6");

    expect(contenedorColumna).not.toBeNull();
    expect(contenedorColumna?.classList.contains("col-xl-3")).toBe(true);
});