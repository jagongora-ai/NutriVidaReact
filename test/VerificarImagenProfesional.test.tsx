// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profesionales from "../src/pages/Profesionales";

test("La imagen del profesional carga la ruta src correcta", () => {
    const listaMedicos = [
        { id: 1, nombre: "Carolina Fuentes", especialidad: "Nutricion", imagen: "/foto.jpg" }
    ];

    render(
        <BrowserRouter>
            <Profesionales profesionales={listaMedicos as any} />
        </BrowserRouter>
    );

    const imagen = screen.getByRole("img", { name: /carolina fuentes/i });
    expect(imagen.getAttribute("src")).toBe("/foto.jpg");
});