import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { ChameleonProvider } from "../../context";
import { NotificationPanel } from "../../composites/NotificationPanel";
import type { NotificationInboxItem } from "../../composites/types";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>{children}</ChameleonProvider>
);

const controlledItems: NotificationInboxItem[] = [
  {
    id: "n1",
    title: "New device login",
    message: "Sign-in from Chrome/Mac in Cape Town.",
    type: "warning",
    status: "unread",
    category: "security",
    priority: "critical",
    createdAt: Date.now() - 60_000,
    actions: [{ id: "secure", label: "Secure account", intent: "danger" }],
  },
  {
    id: "n2",
    title: "Invoice #1042 paid",
    message: "Your April invoice has been paid.",
    type: "success",
    status: "read",
    category: "billing",
    priority: "low",
    createdAt: Date.now() - 86_400_000,
    actions: [{ id: "receipt", label: "View receipt", intent: "primary" }],
  },
  {
    id: "n3",
    title: "Alex: Review my PR",
    message: "Can you look at the auth changes before merge?",
    type: "info",
    status: "unread",
    category: "messages",
    priority: "medium",
    avatarFallback: "AK",
    createdAt: Date.now() - 300_000,
    actions: [{ id: "reply", label: "Reply", intent: "primary" }],
  },
];

describe("NotificationPanel", () => {
  it("renders with default demo data (no props)", () => {
    render(<NotificationPanel />, { wrapper: Wrapper });
    // Default demo data has recognizable titles
    expect(screen.getByText("Alex: Can you review this PR?")).toBeInTheDocument();
    expect(screen.getByText("New device login from Chrome/Mac")).toBeInTheDocument();
  });

  it("shows stats strip with correct total and unread labels", () => {
    render(<NotificationPanel notifications={controlledItems} />, { wrapper: Wrapper });
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Unread")).toBeInTheDocument();
    expect(screen.getByText("Archived")).toBeInTheDocument();
  });

  it("renders all controlled items in the inbox", () => {
    render(<NotificationPanel notifications={controlledItems} />, { wrapper: Wrapper });
    expect(screen.getByText("New device login")).toBeInTheDocument();
    expect(screen.getByText("Invoice #1042 paid")).toBeInTheDocument();
  });

  it("renders category sidebar pills for each unique category", () => {
    render(<NotificationPanel notifications={controlledItems} />, { wrapper: Wrapper });
    expect(screen.getByText("Security")).toBeInTheDocument();
    expect(screen.getByText("Billing")).toBeInTheDocument();
    expect(screen.getByText("Messages")).toBeInTheDocument();
  });

  it("filters inbox when category sidebar pill is clicked", async () => {
    render(<NotificationPanel notifications={controlledItems} />, { wrapper: Wrapper });

    expect(screen.getByText("New device login")).toBeInTheDocument();
    expect(screen.getByText("Invoice #1042 paid")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Security"));

    await waitFor(() => {
      expect(screen.queryByText("Invoice #1042 paid")).not.toBeInTheDocument();
    });
    expect(screen.getByText("New device login")).toBeInTheDocument();
  });

  it("renders TopBar title by default", () => {
    render(<NotificationPanel notifications={controlledItems} topBarTitle="My Notifications" />, {
      wrapper: Wrapper,
    });
    expect(screen.getByText("My Notifications")).toBeInTheDocument();
  });

  it("hides TopBar when showTopBar is false", () => {
    render(
      <NotificationPanel notifications={controlledItems} showTopBar={false} topBarTitle="Hidden" />,
      { wrapper: Wrapper },
    );
    expect(screen.queryByText("Hidden")).not.toBeInTheDocument();
  });

  it("calls onMarkAllRead when bulk action triggered", () => {
    const onMarkAllRead = vi.fn();
    render(
      <NotificationPanel notifications={controlledItems} onMarkAllRead={onMarkAllRead} />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText(/Mark all read/i));
    expect(onMarkAllRead).toHaveBeenCalledOnce();
  });
});
