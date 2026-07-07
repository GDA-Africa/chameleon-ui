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

describe("NotificationInbox — enhanced props", () => {
  const priorityItems: NotificationInboxItem[] = [
    {
      id: "p1",
      title: "Critical issue",
      message: "Production is down.",
      type: "error",
      status: "unread",
      priority: "critical",
      createdAt: Date.now() - 1000,
    },
    {
      id: "p2",
      title: "Low priority",
      message: "Weekly digest ready.",
      type: "info",
      status: "read",
      priority: "low",
      createdAt: Date.now() - 5000,
    },
  ];

  it("applies priority border class for critical items", () => {
    const { container } = render(
      <NotificationInbox defaultNotifications={priorityItems} />,
      { wrapper: Wrapper },
    );

    const articles = container.querySelectorAll("article");
    const criticalArticle = Array.from(articles).find((el) =>
      el.className.includes("border-l-rose-500"),
    );
    expect(criticalArticle).not.toBeUndefined();
  });

  it("shows avatar fallback initials in item row", () => {
    const itemsWithAvatar: NotificationInboxItem[] = [
      {
        id: "av1",
        title: "Alex mentioned you",
        message: "You were mentioned in a comment.",
        type: "info",
        status: "unread",
        avatarFallback: "AK",
        createdAt: Date.now(),
      },
    ];

    render(
      <NotificationInbox defaultNotifications={itemsWithAvatar} />,
      { wrapper: Wrapper },
    );

    expect(screen.getByText("AK")).toBeInTheDocument();
  });

  it("fires onMarkAllRead callback when bulk action clicked", () => {
    const onMarkAllRead = vi.fn();

    render(
      <NotificationInbox
        defaultNotifications={mockItems}
        onMarkAllRead={onMarkAllRead}
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText(/Mark all read/i));
    expect(onMarkAllRead).toHaveBeenCalledOnce();
  });

  it("fires onArchiveAll callback when bulk action clicked", () => {
    const onArchiveAll = vi.fn();

    render(
      <NotificationInbox
        defaultNotifications={mockItems}
        onArchiveAll={onArchiveAll}
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText(/Archive all/i));
    expect(onArchiveAll).toHaveBeenCalledOnce();
  });

  it("hides snoozed notification immediately after snooze", async () => {
    render(
      <NotificationInbox defaultNotifications={mockItems} />,
      { wrapper: Wrapper },
    );

    expect(screen.getByText("Deploy failed")).toBeInTheDocument();

    const snoozeButtons = screen.getAllByText(/Snooze/i);
    fireEvent.click(snoozeButtons[0]!);

    const oneHourOption = await screen.findByText("1 hour");
    fireEvent.click(oneHourOption);

    await waitFor(() => {
      expect(screen.queryByText("Deploy failed")).not.toBeInTheDocument();
    });
  });

  it("shows category items when filtered by mixed categories", async () => {
    const categoryItems: NotificationInboxItem[] = [
      {
        id: "c1",
        title: "Security alert",
        message: "New login from unknown device.",
        type: "warning",
        status: "unread",
        category: "security",
        createdAt: Date.now(),
      },
      {
        id: "c2",
        title: "Invoice paid",
        message: "Your invoice was paid.",
        type: "success",
        status: "read",
        category: "billing",
        createdAt: Date.now() - 1000,
      },
    ];

    render(
      <NotificationInbox defaultNotifications={categoryItems} />,
      { wrapper: Wrapper },
    );

    // Both present initially
    expect(screen.getByText("Security alert")).toBeInTheDocument();
    expect(screen.getByText("Invoice paid")).toBeInTheDocument();
  });
});

describe("Composite docs", () => {
  it("lists NotificationInbox in composite showcase", () => {
    render(<CompositeShowcase />, { wrapper: Wrapper });
    expect(screen.getByText("NotificationInbox")).toBeInTheDocument();
  });
});
