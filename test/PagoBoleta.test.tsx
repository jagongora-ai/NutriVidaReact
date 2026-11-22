import { render, screen, fireEvent, act, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect, vi, beforeEach, afterEach } from "vitest";
import PagoSimulado from "../src/pages/PagoSimulado";
import PagarCita from "../src/validaciones/PagarCita";
import ObtenerCitas from "../src/validaciones/ObtenerCitas";
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
    estado: "Pendiente",
};

beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("usuarioSesion", JSON.stringify({
        nombre: "Manuel Prueba", rut: "12345678-9", correo: "manuel@prueba.cl", rol: "Cliente",
    }));
    vi.useFakeTimers();
});

afterEach(() => {
    cleanup();
    vi.useRealTimers();
});

test("PagarCita separa el IVA, guarda la cita como pagada y emite la boleta", () => {
    const boleta = PagarCita(cita, "tarjeta de crédito VISA •••• 4242");

    expect(boleta.neto).toBe(18487);
    expect(boleta.iva).toBe(3513);
    expect(boleta.total).toBe(22000);
    expect(boleta.folio).toBe(1);
    expect(ObtenerCitas()[0].estado).toBe("Pagada");
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

test("Al pagar se muestra la boleta y la hora queda guardada en la agenda", () => {
    localStorage.setItem("citaActual", JSON.stringify(cita));
    render(<BrowserRouter><PagoSimulado /></BrowserRouter>);

    fireEvent.change(screen.getByLabelText(/Nombre del titular/i), { target: { value: "Manuel Prueba" } });
    fireEvent.change(screen.getByLabelText(/Número de tarjeta/i), { target: { value: "4242424242424242" } });
    fireEvent.change(screen.getByLabelText(/Vencimiento/i), { target: { value: "1230" } });
    fireEvent.change(screen.getByLabelText(/CVV/i), { target: { value: "123" } });
    fireEvent.click(screen.getByRole("button", { name: /Pagar/i }));

    act(() => { vi.advanceTimersByTime(2000); });

    const dialogo = screen.getByRole("alertdialog");
    expect(dialogo.textContent).toContain("BOLETA ELECTRÓNICA");
    expect(dialogo.textContent).toContain("Manuel Prueba");
    expect(dialogo.textContent).toContain("manuel@prueba.cl");
    expect(dialogo.textContent).toContain("10:30");
    expect(dialogo.textContent).toContain("$22.000");
    expect(dialogo.textContent).toContain("VISA •••• 4242");

    expect(localStorage.getItem("citaActual")).toBeNull();
    expect(ObtenerCitas()).toHaveLength(1);
});
