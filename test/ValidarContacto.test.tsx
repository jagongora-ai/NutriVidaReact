import { test, expect, vi, beforeEach, afterEach } from "vitest";
import ValidarContacto from "../src/validaciones/ValidarContacto";
import GuardarMensaje, { ObtenerMensajes } from "../src/validaciones/GuardarMensaje";
import ResponderMensaje from "../src/validaciones/ResponderMensaje";

const datosValidos = {
    nombre: "Manuel Mora",
    correo: "manuel@correo.cl",
    asunto: "Consulta sobre planes",
    mensaje: "Quisiera saber cuánto dura el plan especializado.",
};

let alertaEspia: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
    localStorage.clear();
    alertaEspia = vi.spyOn(window, "alert").mockImplementation(() => { });
});

afterEach(() => {
    alertaEspia.mockRestore();
});

test("Rechaza el contacto sin nombre", () => {
    expect(ValidarContacto({ ...datosValidos, nombre: "" })).toBe(false);
    expect(alertaEspia).toHaveBeenCalledWith("El nombre es obligatorio");
});

test("Rechaza el contacto con un correo sin formato válido", () => {
    expect(ValidarContacto({ ...datosValidos, correo: "manuel.correo.cl" })).toBe(false);
    expect(alertaEspia).toHaveBeenCalledWith("Ingrese un correo con formato válido");
});

test("Rechaza un mensaje demasiado corto", () => {
    expect(ValidarContacto({ ...datosValidos, mensaje: "Hola" })).toBe(false);
    expect(alertaEspia).toHaveBeenCalledWith("El mensaje debe tener entre 10 a 500 caracteres");
});

test("Acepta un contacto con todos los datos válidos", () => {
    expect(ValidarContacto(datosValidos)).toBe(true);
});

test("El mensaje se envía al backend con POST", async () => {
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchFalso);

    const resultado = await GuardarMensaje(datosValidos);

    expect(resultado).toBe(true);
    expect(fetchFalso).toHaveBeenCalledWith(
        "http://localhost:8086/api/mensajes",
        expect.objectContaining({ method: "POST" })
    );
    vi.unstubAllGlobals();
});

test("Si hay sesión, el mensaje lleva el token", async () => {
    localStorage.setItem("usuarioSesion", JSON.stringify({ token: "abc123" }));
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchFalso);

    await GuardarMensaje(datosValidos);

    const opciones = fetchFalso.mock.calls[0][1];
    expect(opciones.headers.Authorization).toBe("Bearer abc123");
    vi.unstubAllGlobals();
});

test("El administrador responde un mensaje pendiente", () => {
    localStorage.setItem("mensajesContacto", JSON.stringify([
        { id: 1, ...datosValidos, fecha: "2026-11-25T10:00:00", estado: "Pendiente", respuesta: "", fechaRespuesta: "" }
    ]));

    expect(ResponderMensaje(1, "")).toBe(false);
    expect(ResponderMensaje(1, "El plan especializado dura 60 minutos.")).toBe(true);

    const [respondido] = ObtenerMensajes();
    expect(respondido.estado).toBe("Respondido");
    expect(respondido.respuesta).toBe("El plan especializado dura 60 minutos.");
});

