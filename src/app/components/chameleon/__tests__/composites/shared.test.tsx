import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ChameleonProvider } from "../../context";
import { PageHeader } from "../../composites/PageHeader";
import { EmptyState } from "../../composites/EmptyState";
import { LoadingState } from "../../composites/LoadingState";
import { ErrorBoundaryComposite } from "../../composites/ErrorBoundaryComposite";
import { StatsCard } from "../../composites/StatsCard";
import { SideNav } from "../../composites/SideNav";
import { TopBar } from "../../composites/TopBar";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>{children}</ChameleonProvider>
);

describe("PageHeader", () => {
  it("renders title", () => {
    render(<PageHeader title="Dashboard" />, { wrapper: Wrapper });
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<PageHeader title="Settings" subtitle="Manage your account" />, { wrapper: Wrapper });
    expect(screen.getByText("Manage your account")).toBeInTheDocument();
  });

  it("renders breadcrumbs", () => {
    render(
      <PageHeader title="Details" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Details" }]} />,
      { wrapper: Wrapper },
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getAllByText("Details").length).toBeGreaterThan(0);
  });
});

describe("EmptyState", () => {
  it("renders with default props", () => {
    render(<EmptyState />, { wrapper: Wrapper });
    expect(screen.getByText("Nothing here yet")).toBeInTheDocument();
  });

  it("renders custom title and description", () => {
    render(<EmptyState title="No items" description="Add one to get started" />, { wrapper: Wrapper });
    expect(screen.getByText("No items")).toBeInTheDocument();
    expect(screen.getByText("Add one to get started")).toBeInTheDocument();
  });

  it("renders action button and calls onAction", () => {
    const onAction = vi.fn();
    render(<EmptyState actionLabel="Add Item" onAction={onAction} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText("Add Item"));
    expect(onAction).toHaveBeenCalledOnce();
  });
});

describe("LoadingState", () => {
  it("renders spinner variant by default", () => {
    render(<LoadingState label="Loading data..." />, { wrapper: Wrapper });
    expect(screen.getByText("Loading data...")).toBeInTheDocument();
  });

  it("renders skeleton variant", () => {
    const { container } = render(<LoadingState variant="skeleton" rows={3} />, { wrapper: Wrapper });
    const skeletons = container.querySelectorAll(".animate-pulse");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it("renders dots variant", () => {
    render(<LoadingState variant="dots" label="Please wait" />, { wrapper: Wrapper });
    expect(screen.getByText("Please wait")).toBeInTheDocument();
  });
});

describe("ErrorBoundaryComposite", () => {
  it("renders default title and message", () => {
    render(<ErrorBoundaryComposite />, { wrapper: Wrapper });
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders retry button when onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<ErrorBoundaryComposite onRetry={onRetry} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText("Try Again"));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});

describe("StatsCard", () => {
  it("renders label and value", () => {
    render(<StatsCard label="Total Users" value={1250} />, { wrapper: Wrapper });
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("1250")).toBeInTheDocument();
  });

  it("renders positive trend", () => {
    render(<StatsCard label="Revenue" value="$4,200" trend={12.5} />, { wrapper: Wrapper });
    expect(screen.getByText("+12.5%")).toBeInTheDocument();
  });

  it("renders negative trend", () => {
    render(<StatsCard label="Churn" value="2.1%" trend={-0.3} />, { wrapper: Wrapper });
    expect(screen.getByText("-0.3%")).toBeInTheDocument();
  });
});

describe("SideNav", () => {
  it("renders nav items", () => {
    const items = [{ label: "Dashboard" }, { label: "Analytics" }];
    render(<SideNav items={items} />, { wrapper: Wrapper });
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
  });

  it("calls onSelect when item is clicked", () => {
    const onSelect = vi.fn();
    const items = [{ label: "Settings" }];
    render(<SideNav items={items} onSelect={onSelect} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText("Settings"));
    expect(onSelect).toHaveBeenCalledWith(items[0]);
  });
});

describe("TopBar", () => {
  it("renders title", () => {
    render(<TopBar title="App Name" />, { wrapper: Wrapper });
    expect(screen.getByText("App Name")).toBeInTheDocument();
  });

  it("renders subtitle", () => {
    render(<TopBar title="App" subtitle="v1.0.9" />, { wrapper: Wrapper });
    expect(screen.getByText("v1.0.9")).toBeInTheDocument();
  });
});
