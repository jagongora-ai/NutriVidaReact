// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profesionales from "../src/pages/Profesionales";

test("Los botones de ver perfil de los medicos tienen el enlace correcto", () => {
    const listaMedicos = [
        { id: 1, nombre: "Carolina Fuentes", especialidad: "Nutrición" }
    ];

    render(
        <BrowserRouter>
            <Profesionales profesionales={listaMedicos as any} />
        </BrowserRouter>
    );
    const enlacePerfil = screen.getByRole("link", { name: /ver perfil/i });
    expect(enlacePerfil.getAttribute("href")).toBe("/profesionales/1");
});