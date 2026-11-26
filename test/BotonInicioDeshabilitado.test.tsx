import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, beforeEach, afterEach } from "vitest";
import Profesionales, { type Professional } from "../src/pages/Profesionales";
import type { Prestacion } from "../src/validaciones/ObtenerPrestaciones";

const profesional: Professional = {
    id: 1,
    nombre: "Nut. Carolina Fuentes M.",
    especialidad: "Especialista en Nutrición y Pérdida de Peso",
    imagen: "/ProfesionalesIMG/medica 1.jpg",
    ubicacion: "Temuco, Chile",
    atencion: "Presencial y Online",
    experiencia: "Más de 10 años en nutrición clínica",
    sobreMi: "Diseña planes de alimentación equilibrados.",
    estudios: ["Nutrición, Universidad de La Frontera"],
    areas: ["Pérdida de peso"],
};

const prestaciones: Prestacion[] = [
    { valor: "Consulta", etiqueta: "Consulta Nutricionista", precio: 22000, duracion: "45 min" },
    { valor: "Plan especializado", etiqueta: "Plan especializado", precio: 35000, duracion: "60 min" },
];

beforeEach(() => {
    localStorage.clear();
});

afterEach(cleanup);

function mostrarProfesionales() {
    render(
        <BrowserRouter>
            <Profesionales profesionales={[profesional]} prestaciones={prestaciones} />
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
