import React from "react";
import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { ChameleonProvider } from "../../context";
import { MultiStepForm } from "../../composites";
import { CompositeShowcase } from "../../composite-showcase";

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>{children}</ChameleonProvider>
);

describe("MultiStepForm", () => {
  it("renders helpful fallback when no steps are provided", () => {
    render(<MultiStepForm steps={[]} />, { wrapper: Wrapper });
    expect(screen.getByText("No steps were provided to `MultiStepForm`."))
      .toBeInTheDocument();
  });

  it("supports render-function fields and submits collected data", () => {
    const onComplete = vi.fn();

    const steps = [
      {
        id: "profile",
        title: "Profile",
        fields: ({ data, setData }: { data: Record<string, unknown>; setData: React.Dispatch<React.SetStateAction<Record<string, unknown>>> }) => (
          <input
            aria-label="Name"
            value={String(data.name ?? "")}
            onChange={(event) =>
              setData((prev) => ({
                ...prev,
                name: event.target.value,
              }))
            }
          />
        ),
        validate: (data: Record<string, unknown>) => {
          const name = String(data.name ?? "").trim();
          return name.length > 0 || "Name is required";
        },
      },
      {
        id: "confirm",
        title: "Confirm",
        fields: <p>Review and finish</p>,
      },
    ];

    render(
      <MultiStepForm
        steps={steps}
        onComplete={onComplete}
        nextLabel="Continue"
        completeLabel="Submit"
      />,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Continue"));
    expect(screen.getByText("Name is required")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Ada" } });
    fireEvent.click(screen.getByText("Continue"));

    expect(screen.getByText("Submit")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Submit"));

    expect(onComplete).toHaveBeenCalledWith({ name: "Ada" });
  });
});

describe("CompositeShowcase", () => {
  it("shows MultiStepForm in composite docs", () => {
    render(<CompositeShowcase />, { wrapper: Wrapper });
    expect(screen.getByText("MultiStepForm")).toBeInTheDocument();
  });
});
