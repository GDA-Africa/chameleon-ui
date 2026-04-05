import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Button, Input, Badge, Progress } from "../atoms";
import { ChameleonProvider } from "../context";
import "@testing-library/jest-dom/vitest";

describe("Atom Components", () => {
  it("renders Button correctly", () => {
    // Requires Provider
    render(
      <ChameleonProvider>
        <Button>Click Me</Button>
      </ChameleonProvider>,
    );
    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("renders Input correctly", () => {
    render(
      <ChameleonProvider>
        <Input placeholder="Type here" />
      </ChameleonProvider>,
    );
    expect(screen.getByPlaceholderText("Type here")).toBeInTheDocument();
  });

  it("renders Badge correctly", () => {
    render(
      <ChameleonProvider>
        <Badge>New</Badge>
      </ChameleonProvider>,
    );
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  it("renders Progress correctly", () => {
    render(
      <ChameleonProvider>
        <Progress value={50} />
      </ChameleonProvider>,
    );
    const progress = screen.getByRole("progressbar");
    expect(progress).toBeInTheDocument();
    expect(progress).toHaveAttribute("aria-valuenow", "50");
  });
});
