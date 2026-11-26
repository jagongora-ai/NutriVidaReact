import { render, screen, cleanup } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { test, expect, beforeEach, afterEach } from "vitest";
import App from "../src/App";
import ValidarSesion from "../src/validaciones/ValidarSesion";

function iniciarSesion(rol: string) {
    localStorage.setItem("usuarioSesion", JSON.stringify({
        nombre: "Manuel Mora", rut: "12345678-9", correo: "manuel@correo.cl", rol,
    }));
}

function abrirEn(ruta: string) {
    render(
        <MemoryRouter initialEntries={[ruta]}>
            <App />
        </MemoryRouter>
    );
}

beforeEach(() => {
    localStorage.clear();
});

afterEach(cleanup);

test("ValidarSesion es falso cuando no hay sesión iniciada", () => {
    expect(ValidarSesion("Cliente")).toBe(false);
});

test("ValidarSesion solo acepta el rol pedido", () => {
    iniciarSesion("Cliente");
    expect(ValidarSesion("Cliente")).toBe(true);
    expect(ValidarSesion("admin")).toBe(false);
});

test("Sin sesión, al entrar a agendar se envía al inicio de sesión con un aviso", () => {
    abrirEn("/Agendar");
    expect(screen.getByText(/Debes iniciar sesión como paciente/i)).toBeDefined();
    expect(screen.queryByText(/Reserva tu cita médica/i)).toBeNull();
});

test("Un paciente con sesión puede ver el formulario de agendar", () => {
    iniciarSesion("Cliente");
    abrirEn("/Agendar");
    expect(screen.getByText(/Reserva tu cita médica/i)).toBeDefined();
});

test("Un paciente no puede entrar a la administración", () => {
    iniciarSesion("Cliente");
    abrirEn("/admin/mensajes");
    expect(screen.getByText(/Debes iniciar sesión como administrador/i)).toBeDefined();
});

test("Un administrador no puede entrar al panel médico", () => {
    iniciarSesion("admin");
    abrirEn("/medico/agenda");
    expect(screen.getByText(/Debes iniciar sesión como médico/i)).toBeDefined();
});
