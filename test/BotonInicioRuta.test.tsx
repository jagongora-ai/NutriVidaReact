// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profesionales from "../src/pages/Profesionales";

test("El botón de iniciar sesión apunta a la ruta /inicioSesion", () => {
    const listaMedicos = [
        { id: 1, nombre: "Carolina Fuentes", especialidad: "Nutrición" }
    ];

    render(
        <BrowserRouter>
            <Profesionales profesionales={listaMedicos as any} />
        </BrowserRouter>
    );

    const enlaceLogin = screen.getByRole("link", { name: /iniciar/i });
    expect(enlaceLogin.getAttribute("href")).toBe("/inicioSesion");
});