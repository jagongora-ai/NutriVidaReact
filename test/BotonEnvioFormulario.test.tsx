// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, vi } from "vitest";
import FormularioRegistroLogin from "../src/components/organisms/FormularioRegistroLogin";

test("Se quiere comprobar que si se presiona el boton registrarse, lanze el primer error cuando esta vacio", () => {
    const alertaEspia = vi.spyOn(window, "alert").mockImplementation(() => { });

    render(
        <BrowserRouter>
            <FormularioRegistroLogin />
        </BrowserRouter>
    )
    const botonRegistrar = screen.getByRole("button", { name: /Registrarse/i })
    fireEvent.click(botonRegistrar)
    expect(alertaEspia).toHaveBeenCalledWith("El nombre es obligatorio")
    alertaEspia.mockRestore()
})