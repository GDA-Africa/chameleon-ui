import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ChameleonProvider } from "../context";
import { LoginForm, SignUpForm } from "../auth-components";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>{children}</ChameleonProvider>
);

describe("Auth Components", () => {
  it("submits full login payload including rememberMe", async () => {
    const onSubmit = vi.fn().mockResolvedValue({ success: true, message: "ok" });

    render(<LoginForm onSubmit={onSubmit} />, { wrapper: Wrapper });

    fireEvent.change(screen.getByPlaceholderText("you@example.com"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("••••••••"), {
      target: { value: "Secret123!" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /sign in/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "Secret123!",
        rememberMe: true,
      });
    });
  });

  it("respects controlled sign up values and onChange", () => {
    const onChange = vi.fn();

    render(
      <SignUpForm
        value={{
          name: "Ada Lovelace",
          email: "ada@example.com",
          password: "AdaSecret123!",
          confirmPassword: "AdaSecret123!",
          acceptTerms: true,
        }}
        onChange={onChange}
      />,
      { wrapper: Wrapper },
    );

    const emailInput = screen.getByDisplayValue("ada@example.com");
    fireEvent.change(emailInput, { target: { value: "ada2@example.com" } });

    expect(onChange).toHaveBeenCalledWith({
      name: "Ada Lovelace",
      email: "ada2@example.com",
      password: "AdaSecret123!",
      confirmPassword: "AdaSecret123!",
      acceptTerms: true,
    });
  });
});
