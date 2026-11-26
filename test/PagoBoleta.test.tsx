import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, vi, beforeEach, afterEach } from "vitest";
import PagoSimulado from "../src/pages/PagoSimulado";
import PagarCita, { type Boleta } from "../src/validaciones/PagarCita";
import type { Cita } from "../src/validaciones/AgendarCita";

const cita: Cita = {
    id: 1,
    tipoConsulta: "Consulta",
    prestacion: "Consulta Nutricionista",
    duracion: "45 min",
    precio: 22000,
    doctorId: 1,
    doctor: "Nut. Carolina Fuentes M.",
    especialidad: "Especialista en Nutrición y Pérdida de Peso",
    imagen: "/ProfesionalesIMG/medica 1.jpg",
    fecha: "2099-12-01",
    hora: "10:30",
    modalidad: "Presencial",
    paciente: "Manuel Prueba",
    rut: "12345678-9",
    correo: "manuel@prueba.cl",
    estado: "PENDIENTE",
};

const boleta: Boleta = {
    folio: 1,
    citaId: 1,
    emitidaEl: "2099-11-30T13:00:00Z",
    codigoAutorizacion: "123456",
    medioPago: "tarjeta de crédito VISA •••• 4242",
    neto: 18487,
    iva: 3513,
    total: 22000,
    cita: { ...cita, estado: "Pagada" },
};

beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("usuarioSesion", JSON.stringify({
        nombre: "Manuel Prueba", rut: "12345678-9", correo: "manuel@prueba.cl", rol: "Cliente", token: "token-cliente",
    }));
});

afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
});

test("PagarCita envía la cita y el medio de pago a ms-pagos y devuelve la boleta", async () => {
    localStorage.setItem("citaActual", JSON.stringify(cita));
    const fetchFalso = vi.fn().mockResolvedValue({ ok: true, json: async () => boleta });
    vi.stubGlobal("fetch", fetchFalso);

    const resultado = await PagarCita(1, "tarjeta de crédito VISA •••• 4242");

    expect(fetchFalso).toHaveBeenCalledWith("http://localhost:8084/api/pagos", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": "Bearer token-cliente" },
        body: JSON.stringify({ citaId: 1, medioPago: "tarjeta de crédito VISA •••• 4242" }),
    });
    expect(resultado?.neto).toBe(18487);
    expect(resultado?.iva).toBe(3513);
    expect(resultado?.total).toBe(22000);
    expect(localStorage.getItem("citaActual")).toBeNull();
});

test("Si la cita ya fue pagada se muestra el mensaje del backend y no hay boleta", async () => {
    const alerta = vi.spyOn(window, "alert").mockImplementation(() => { });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
        ok: false,
        json: async () => ({ mensaje: "La cita ya tiene un pago registrado." }),
    }));

    expect(await PagarCita(1, "tarjeta de crédito VISA •••• 4242")).toBeNull();
    expect(alerta).toHaveBeenCalledWith("La cita ya tiene un pago registrado.");
});

test("Sin hora agendada, la página de pago invita a agendar", () => {
    render(<BrowserRouter><PagoSimulado /></BrowserRouter>);
    expect(screen.getByText(/No tienes una hora pendiente de pago/i)).toBeDefined();
});

test("Una cita agendada por otro usuario no se muestra para pagar", () => {
    localStorage.setItem("citaActual", JSON.stringify({ ...cita, correo: "otra@persona.cl" }));
    render(<BrowserRouter><PagoSimulado /></BrowserRouter>);
    expect(screen.getByText(/No tienes una hora pendiente de pago/i)).toBeDefined();
});

test("Al pagar se muestra la boleta que entrega ms-pagos", async () => {
    localStorage.setItem("citaActual", JSON.stringify(cita));
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => boleta }));
    render(<BrowserRouter><PagoSimulado /></BrowserRouter>);

    fireEvent.change(screen.getByLabelText(/Nombre del titular/i), { target: { value: "Manuel Prueba" } });
    fireEvent.change(screen.getByLabelText(/Número de tarjeta/i), { target: { value: "4242424242424242" } });
    fireEvent.change(screen.getByLabelText(/Vencimiento/i), { target: { value: "1230" } });
    fireEvent.change(screen.getByLabelText(/CVV/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Pagar/i }));

    const dialogo = await screen.findByRole("alertdialog");
    expect(dialogo.textContent).toContain("BOLETA ELECTRÓNICA");
    expect(dialogo.textContent).toContain("Manuel Prueba");
    expect(dialogo.textContent).toContain("manuel@prueba.cl");
    expect(dialogo.textContent).toContain("10:30");
    expect(dialogo.textContent).toContain("$22.000");
    expect(dialogo.textContent).toContain("VISA •••• 4242");
    expect(localStorage.getItem("citaActual")).toBeNull();
});
