import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { ChameleonProvider } from "../../context";
import { NotificationInbox } from "../../composites/NotificationInbox";
import type { NotificationInboxItem } from "../../composites/types";
import { CompositeShowcase } from "../../composite-showcase";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>{children}</ChameleonProvider>
);

const mockItems: NotificationInboxItem[] = [
  {
    id: "1",
    title: "Deploy failed",
    message: "Production deployment failed at migration step.",
    type: "error",
    status: "unread",
    source: "CI/CD",
    tags: ["ops"],
    actions: [{ id: "logs", label: "Open logs", intent: "danger" }],
    createdAt: Date.now() - 1000 * 60,
  },
  {
    id: "2",
    title: "Invoice paid",
    message: "April invoice has been paid successfully.",
    type: "success",
    status: "read",
    source: "Billing",
    tags: ["finance"],
    actions: [{ id: "receipt", label: "View receipt", intent: "primary" }],
    createdAt: Date.now() - 1000 * 60 * 20,
  },
];

describe("NotificationInbox", () => {
  it("supports search and filtering", async () => {
    render(<NotificationInbox defaultNotifications={mockItems} />, { wrapper: Wrapper });

    expect(screen.getByText("Deploy failed")).toBeInTheDocument();
    expect(screen.getByText("Invoice paid")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search notifications..."), {
      target: { value: "invoice" },
    });

    await waitFor(() => {
      expect(screen.queryByText("Deploy failed")).not.toBeInTheDocument();
    });
    expect(screen.getByText("Invoice paid")).toBeInTheDocument();
  });

  it("fires action callback for notification actions", () => {
    const onAction = vi.fn();
    render(
      <NotificationInbox defaultNotifications={mockItems} onAction={onAction} />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Open logs"));
    expect(onAction).toHaveBeenCalledTimes(1);
  });
});

describe("Composite docs", () => {
  it("lists NotificationInbox in composite showcase", () => {
    render(<CompositeShowcase />, { wrapper: Wrapper });
    expect(screen.getByText("NotificationInbox")).toBeInTheDocument();
  });
});
