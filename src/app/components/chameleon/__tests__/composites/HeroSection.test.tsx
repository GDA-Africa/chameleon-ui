import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { ChameleonProvider } from "../../context";
import { HeroSection } from "../../composites/HeroSection";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>{children}</ChameleonProvider>
);

describe("HeroSection", () => {
  it("renders with default props", () => {
    render(<HeroSection />, { wrapper: Wrapper });
    expect(screen.getByText("Build Better Products")).toBeInTheDocument();
  });

  it("renders custom heading", () => {
    render(<HeroSection heading="Welcome to Nexus" />, { wrapper: Wrapper });
    expect(screen.getByText("Welcome to Nexus")).toBeInTheDocument();
  });

  it("renders custom subheading", () => {
    render(<HeroSection subheading="Your platform awaits." />, { wrapper: Wrapper });
    expect(screen.getByText("Your platform awaits.")).toBeInTheDocument();
  });

  it("renders CTA button with custom label", () => {
    render(<HeroSection ctaLabel="Sign Up Now" />, { wrapper: Wrapper });
    expect(screen.getByText("Sign Up Now")).toBeInTheDocument();
  });

  it("renders badge when provided", () => {
    render(<HeroSection badge="Beta" />, { wrapper: Wrapper });
    expect(screen.getByText("Beta")).toBeInTheDocument();
  });

  it("renders secondary CTA when provided", () => {
    render(<HeroSection secondaryCtaLabel="Watch Demo" />, { wrapper: Wrapper });
    expect(screen.getByText("Watch Demo")).toBeInTheDocument();
  });

  it("renders trust logos when provided", () => {
    render(<HeroSection trustLogos={["STRIPE", "GITHUB"]} />, { wrapper: Wrapper });
    expect(screen.getByText("STRIPE")).toBeInTheDocument();
    expect(screen.getByText("GITHUB")).toBeInTheDocument();
  });

  it("calls onCTAClick when CTA button is clicked", () => {
    const onCTAClick = vi.fn();
    render(<HeroSection ctaLabel="Go" onCTAClick={onCTAClick} />, { wrapper: Wrapper });
    fireEvent.click(screen.getByText("Go"));
    expect(onCTAClick).toHaveBeenCalledOnce();
  });
});
