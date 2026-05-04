import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ChameleonProvider } from "../../context";
import { ProfileSection } from "../../composites/ProfileSection";
import { SettingsList } from "../../composites/SettingsList";
import { PreferencePanel } from "../../composites/PreferencePanel";
import { DangerZone } from "../../composites/DangerZone";
import { CartSummary } from "../../composites/CartSummary";
import { OrderConfirmation } from "../../composites/OrderConfirmation";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>{children}</ChameleonProvider>
);

describe("ProfileSection", () => {
  it("renders user name", () => {
    render(
      <ProfileSection user={{ name: "Jane Smith", email: "jane@test.com" }} />,
      { wrapper: Wrapper },
    );
    expect(screen.getByDisplayValue("Jane Smith")).toBeInTheDocument();
  });

  it("renders save button when editable", () => {
    render(
      <ProfileSection user={{ name: "Test User", email: "test@test.com" }} editable />,
      { wrapper: Wrapper },
    );
    expect(screen.getByText("Save Changes")).toBeInTheDocument();
  });

  it("calls onSave when save button clicked", () => {
    const onSave = vi.fn();
    render(
      <ProfileSection user={{ name: "Test", email: "t@t.com" }} editable onSave={onSave} />,
      { wrapper: Wrapper },
    );
    fireEvent.click(screen.getByText("Save Changes"));
    expect(onSave).toHaveBeenCalledOnce();
  });
});

describe("SettingsList", () => {
  it("renders settings items", () => {
    const settings = [
      { id: "a", label: "Notifications", enabled: true },
      { id: "b", label: "Marketing", enabled: false },
    ];
    render(<SettingsList settings={settings} />, { wrapper: Wrapper });
    expect(screen.getByText("Notifications")).toBeInTheDocument();
    expect(screen.getByText("Marketing")).toBeInTheDocument();
  });

  it("calls onToggle when toggle clicked", () => {
    const onToggle = vi.fn();
    const settings = [{ id: "notif", label: "Notifications", enabled: true }];
    render(<SettingsList settings={settings} onToggle={onToggle} />, { wrapper: Wrapper });
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(onToggle).toHaveBeenCalledWith("notif", false);
  });
});

describe("DangerZone", () => {
  it("renders danger zone heading", () => {
    render(<DangerZone />, { wrapper: Wrapper });
    expect(screen.getByText("Danger Zone")).toBeInTheDocument();
  });

  it("requires double-click confirmation", () => {
    const onConfirm = vi.fn();
    const actions = [{ id: "del", label: "Delete Account", description: "Cannot be undone", buttonLabel: "Delete" }];
    render(<DangerZone actions={actions} onConfirm={onConfirm} />, { wrapper: Wrapper });

    // First click shows "Confirm?"
    fireEvent.click(screen.getByText("Delete"));
    expect(screen.getByText("Confirm?")).toBeInTheDocument();

    // Second click executes
    fireEvent.click(screen.getByText("Confirm?"));
    expect(onConfirm).toHaveBeenCalledWith("del");
  });
});

describe("CartSummary", () => {
  it("renders items", () => {
    const items = [
      { id: "1", name: "Headphones", price: 79, quantity: 1 },
      { id: "2", name: "Cable", price: 15, quantity: 2 },
    ];
    render(<CartSummary items={items} />, { wrapper: Wrapper });
    expect(screen.getByText("Headphones")).toBeInTheDocument();
    expect(screen.getByText("Cable")).toBeInTheDocument();
  });

  it("renders checkout button", () => {
    const onCheckout = vi.fn();
    render(<CartSummary onCheckout={onCheckout} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText("Proceed to Checkout"));
    expect(onCheckout).toHaveBeenCalledOnce();
  });

  it("renders empty state when no items", () => {
    render(<CartSummary items={[]} />, { wrapper: Wrapper });
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});

describe("OrderConfirmation", () => {
  it("renders order confirmed heading", () => {
    render(<OrderConfirmation />, { wrapper: Wrapper });
    expect(screen.getByText("Order Confirmed!")).toBeInTheDocument();
  });

  it("renders order id", () => {
    const order = {
      id: "ORD-999",
      date: "2026-05-04",
      items: [{ id: "1", name: "Widget", price: 10, quantity: 1 }],
      subtotal: 10,
      tax: 1,
      total: 11,
    };
    render(<OrderConfirmation order={order} />, { wrapper: Wrapper });
    expect(screen.getByText("Order #ORD-999")).toBeInTheDocument();
  });
});
