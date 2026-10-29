// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { test, expect } from "vitest";
import Profesionales from "../src/pages/Profesionales";

test("Muestra un mensaje cuando no hay profesionales disponibles", () => {
    render(
        <BrowserRouter>
            <Profesionales profesionales={[]} />
        </BrowserRouter>
    );
    expect(screen.getByText(/no hay profesionales disponibles/i)).toBeDefined();
});