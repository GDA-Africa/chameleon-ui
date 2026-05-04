import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ChameleonProvider } from "../../context";
import { HeroSection } from "../../composites/HeroSection";
import { StatsCard } from "../../composites/StatsCard";
import { CTASection } from "../../composites/CTASection";
import { PageHeader } from "../../composites/PageHeader";
import { EmptyState } from "../../composites/EmptyState";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>{children}</ChameleonProvider>
);

describe("Cross-Template Composite Reuse", () => {
  it("renders landing + dashboard composites together on same page", () => {
    render(
      <div>
        <HeroSection heading="Dashboard Overview" />
        <StatsCard label="Total Users" value={1250} />
        <StatsCard label="Revenue" value="$4,200" trend={12} />
      </div>,
      { wrapper: Wrapper },
    );
    expect(screen.getByText("Dashboard Overview")).toBeInTheDocument();
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
  });

  it("renders shared composites with landing composites", () => {
    render(
      <div>
        <PageHeader title="Welcome" subtitle="Get started below" />
        <HeroSection heading="Build with Chameleon" />
        <CTASection heading="Join the Beta" ctaLabel="Sign Up" />
      </div>,
      { wrapper: Wrapper },
    );
    expect(screen.getByText("Welcome")).toBeInTheDocument();
    expect(screen.getByText("Build with Chameleon")).toBeInTheDocument();
    expect(screen.getByText("Join the Beta")).toBeInTheDocument();
  });

  it("renders EmptyState alongside other composites without conflicts", () => {
    render(
      <div>
        <PageHeader title="My Data" />
        <EmptyState title="No data yet" description="Start by importing some" actionLabel="Import" />
      </div>,
      { wrapper: Wrapper },
    );
    expect(screen.getByText("My Data")).toBeInTheDocument();
    expect(screen.getByText("No data yet")).toBeInTheDocument();
  });

  it("renders composites in different themes without errors", () => {
    const { rerender } = render(
      <ChameleonProvider initialTheme="material">
        <HeroSection heading="Material Theme" />
      </ChameleonProvider>,
    );
    expect(screen.getByText("Material Theme")).toBeInTheDocument();

    rerender(
      <ChameleonProvider initialTheme="glassy">
        <HeroSection heading="Glassy Theme" />
      </ChameleonProvider>,
    );
    expect(screen.getByText("Glassy Theme")).toBeInTheDocument();

    rerender(
      <ChameleonProvider initialTheme="liquid">
        <HeroSection heading="Liquid Theme" />
      </ChameleonProvider>,
    );
    expect(screen.getByText("Liquid Theme")).toBeInTheDocument();
  });

  it("renders composites in light and dark modes without errors", () => {
    const { rerender } = render(
      <ChameleonProvider initialMode="light">
        <StatsCard label="Light Mode" value={42} />
      </ChameleonProvider>,
    );
    expect(screen.getByText("Light Mode")).toBeInTheDocument();

    rerender(
      <ChameleonProvider initialMode="dark">
        <StatsCard label="Dark Mode" value={42} />
      </ChameleonProvider>,
    );
    expect(screen.getByText("Dark Mode")).toBeInTheDocument();
  });
});
