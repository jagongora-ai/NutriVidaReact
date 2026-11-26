import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, beforeEach, afterEach } from "vitest";
import Profesionales from "../src/pages/Profesionales";
import ObtenerProfesionales from "../src/validaciones/ObtenerProfesionales";

beforeEach(() => {
    localStorage.clear();
});

afterEach(cleanup);

function mostrarProfesionales() {
    render(
        <BrowserRouter>
            <Profesionales profesionales={ObtenerProfesionales().slice(0, 1)} />
        </BrowserRouter>
    );
}

test("Con la sesión iniciada, el botón Iniciar sesión de la tarjeta queda deshabilitado", () => {
    localStorage.setItem("usuarioSesion", JSON.stringify({ nombre: "Manuel Mora", rol: "Cliente" }));
    mostrarProfesionales();

    const boton = screen.getByRole("button", { name: /Iniciar sesión/i }) as HTMLButtonElement;
    expect(boton.disabled).toBe(true);
    expect(screen.queryByRole("link", { name: /Iniciar sesión/i })).toBeNull();
});

test("Las tarjetas de profesionales muestran los valores de las prestaciones", () => {
    mostrarProfesionales();

    expect(screen.getByText("Consulta Nutricionista")).toBeDefined();
    expect(screen.getByText("$22.000")).toBeDefined();
    expect(screen.getByText("$35.000")).toBeDefined();
});
