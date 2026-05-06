import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { ChameleonProvider } from "../../context";
import {
  NotificationCenter,
  NotificationCenterProvider,
  useNotificationCenter,
} from "../../composites/NotificationCenter";
import { CompositeShowcase } from "../../composite-showcase";

const TriggerButton: React.FC = () => {
  const { success } = useNotificationCenter();
  return (
    <button
      onClick={() =>
        success("Your changes have been saved.", {
          title: "Saved",
          duration: 1200,
        })
      }
    >
      Trigger Success
    </button>
  );
};

const ActionTrigger: React.FC<{ onAction: () => void }> = ({ onAction }) => {
  const { warning } = useNotificationCenter();
  return (
    <button
      onClick={() =>
        warning("Session will expire soon.", {
          title: "Security warning",
          duration: 0,
          action: { label: "Extend", onClick: onAction },
        })
      }
    >
      Trigger Action
    </button>
  );
};

const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ChameleonProvider>
    <NotificationCenterProvider>{children}</NotificationCenterProvider>
  </ChameleonProvider>
);

describe("NotificationCenter", () => {
  it("renders app-wide notifications and allows dismissing", () => {

    render(
      <>
        <TriggerButton />
        <NotificationCenter position="top-right" />
      </>,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Trigger Success"));

    expect(screen.getByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes have been saved.")).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText("Dismiss notification"));
    expect(screen.queryByText("Your changes have been saved.")).not.toBeInTheDocument();
  });

  it("supports notification actions", () => {
    const onAction = vi.fn();

    render(
      <>
        <ActionTrigger onAction={onAction} />
        <NotificationCenter />
      </>,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Trigger Action"));
    fireEvent.click(screen.getByText("Extend"));

    expect(onAction).toHaveBeenCalledOnce();
  });
});

describe("Composite docs", () => {
  it("lists NotificationCenter in composite showcase", () => {
    render(<CompositeShowcase />, { wrapper: Wrapper });
    expect(screen.getByText("NotificationCenter")).toBeInTheDocument();
  });
});
