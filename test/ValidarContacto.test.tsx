import { test, expect, vi, beforeEach, afterEach } from "vitest";
import ValidarContacto from "../src/validaciones/ValidarContacto";
import GuardarMensaje from "../src/validaciones/GuardarMensaje";
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

test("La respuesta vacía se rechaza sin llamar al backend", async () => {
    const fetchFalso = vi.fn();
    vi.stubGlobal("fetch", fetchFalso);

    expect(await ResponderMensaje(1, "")).toBe(false);
    expect(alertaEspia).toHaveBeenCalledWith("La respuesta es obligatoria");
    expect(fetchFalso).not.toHaveBeenCalled();
    vi.unstubAllGlobals();
});

test("El administrador responde con PUT y el token", async () => {
    localStorage.setItem("usuarioSesion", JSON.stringify({ token: "tokenAdmin" }));
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => ({}) });
    vi.stubGlobal("fetch", fetchFalso);

    const resultado = await ResponderMensaje(7, "El plan especializado dura 60 minutos.");

    expect(resultado).toBe(true);
    const [url, opciones] = fetchFalso.mock.calls[0];
    expect(url).toBe("http://localhost:8086/api/mensajes/7/respuesta");
    expect(opciones.method).toBe("PUT");
    expect(opciones.headers.Authorization).toBe("Bearer tokenAdmin");
    vi.unstubAllGlobals();
});

test("Si el mensaje ya fue respondido, muestra el mensaje del backend", async () => {
    const fetchFalso = vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ mensaje: "El mensaje ya fue respondido" }),
    });
    vi.stubGlobal("fetch", fetchFalso);

    expect(await ResponderMensaje(7, "Segunda respuesta de prueba")).toBe(false);
    expect(alertaEspia).toHaveBeenCalledWith("El mensaje ya fue respondido");
    vi.unstubAllGlobals();
});

