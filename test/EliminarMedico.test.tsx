// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import CardAdmin from "../src/components/molecules/CardAdmin";

test("Comprobar reaccion de boton eliminar, cuando el usuario lo presione", () => {

    const medicoDePrueba = {
        id: 1,
        nombre: "Nut. Carolina Fuentes",
        especialidad: "Nutrición",
        imagen: "/test.jpg",
        ubicacion: "Santiago",
        estado: "Activo"
    };

    const espiar = vi.fn()

    render(
        <CardAdmin
            medico={medicoDePrueba as any}
            alEliminar={espiar}
            alActualizar={() => { }}
        />
    )

    const botonEliminar = screen.getByRole("button", { name: /Eliminar/i });
    fireEvent.click(botonEliminar);
    expect(espiar).toHaveBeenCalled();

})