// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import FormularioRegistroLogin from "../src/components/organisms/FormularioRegistroLogin";

test("Limpia los campos del formulario al presionar el botón Limpiar campos", () => {
    render(
        <BrowserRouter>
            <FormularioRegistroLogin />
        </BrowserRouter>
    );
    const inputNombre = screen.getByLabelText(/Nombre completo/i) as HTMLInputElement;

    fireEvent.change(inputNombre, { target: { value: "Carolina Fuentes" } });
    expect(inputNombre.value).toBe("Carolina Fuentes");

    const botonLimpiar = screen.getByRole("button", { name: /Limpiar campos/i });
    fireEvent.click(botonLimpiar);

    expect(inputNombre.value).toBe("");
});