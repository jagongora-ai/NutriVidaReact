import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi, afterEach } from "vitest";
import CardAdmin from "../src/components/molecules/CardAdmin";
import EliminarMedico from "../src/validaciones/EliminarMedico";
import ActualizarMedico from "../src/validaciones/ActualizarMedico";
import type { Professional } from "../src/pages/Profesionales";

afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
    localStorage.clear();
});

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

test("Eliminar un medico envia DELETE a ms-profesionales con el token del admin", async () => {
    localStorage.setItem("usuarioSesion", JSON.stringify({ rol: "admin", token: "token-admin" }));
    vi.spyOn(window, "confirm").mockReturnValue(true);
    vi.spyOn(window, "alert").mockImplementation(() => { });
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchFalso);

    expect(await EliminarMedico(3)).toBe(true);
    expect(fetchFalso).toHaveBeenCalledWith("http://localhost:8080/api/profesionales/3", {
        method: "DELETE",
        headers: { "Authorization": "Bearer token-admin" },
    });
})

test("Si el backend rechaza la actualizacion se muestra su mensaje", async () => {
    const medico: Professional = {
        id: 1, nombre: "Nut. Felipe Araya R.", especialidad: "Nutrición", imagen: "/medico.jpg",
        ubicacion: "Temuco", atencion: "Online", experiencia: "8 años", sobreMi: "Texto",
        estudios: ["Nutrición"], areas: ["Diabetes"],
    };
    vi.spyOn(window, "confirm").mockReturnValue(true);
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => { });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ mensaje: "Ya existe un profesional con ese nombre" }),
    }));

    expect(await ActualizarMedico(medico)).toBe(false);
    expect(alerta).toHaveBeenCalledWith("Ya existe un profesional con ese nombre");
})
