// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profesionales from "../src/pages/Profesionales";

test("Muestra el mensaje correspondiente al buscar un termino inexistente", () => {
    const listaMedicos = [
        { id: 1, nombre: "Carolina Fuentes", especialidad: "Nutricion" }
    ];

    render(
        <BrowserRouter>
            <Profesionales profesionales={listaMedicos as any} />
        </BrowserRouter>
    );

    const buscador = screen.getByRole("searchbox");
    fireEvent.change(buscador, { target: { value: "Oftalmología" } });
    expect(screen.queryByText(/carolina fuentes/i)).toBeNull();
});