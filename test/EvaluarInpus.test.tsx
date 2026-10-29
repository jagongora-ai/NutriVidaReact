// @vitest-environment jsdom
import { render, screen, fireEvent } from "@testing-library/react";
import { test, expect, vi } from "vitest";
import Input from "../src/components/atoms/Input";

test("El componente Input ejecuta la función alCambiar al escribir", () => {
    const funcionMock = vi.fn();

    render(
        <Input 
            nombre="test-input" 
            tipo="text" 
            valor="" 
            alCambiar={funcionMock} 
        />
    );

    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "Hola" } });

    expect(funcionMock).toHaveBeenCalledTimes(1);
});