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

test("El mensaje se guarda pendiente y el administrador lo responde", () => {
    GuardarMensaje(datosValidos);
    const [mensaje] = ObtenerMensajes();
    expect(mensaje.estado).toBe("Pendiente");

    expect(ResponderMensaje(mensaje.id, "")).toBe(false);
    expect(ResponderMensaje(mensaje.id, "El plan especializado dura 60 minutos.")).toBe(true);

    const [respondido] = ObtenerMensajes();
    expect(respondido.estado).toBe("Respondido");
    expect(respondido.respuesta).toBe("El plan especializado dura 60 minutos.");
});
