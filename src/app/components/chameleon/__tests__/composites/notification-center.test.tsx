import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { describe, expect, it, vi } from "vitest";
import { ShieldAlert } from "lucide-react";
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

describe("NotificationCenter — enhanced props", () => {
  it("renders multiple actions from actions[] array", () => {
    const onUndo = vi.fn();
    const onDetails = vi.fn();

    const MultiActionTrigger: React.FC = () => {
      const { notify } = useNotificationCenter();
      return (
        <button
          onClick={() =>
            notify({
              message: "File deleted.",
              type: "warning",
              actions: [
                { label: "Undo", onClick: onUndo },
                { label: "Details", onClick: onDetails },
              ],
            })
          }
        >
          Trigger Multi
        </button>
      );
    };

    render(
      <>
        <MultiActionTrigger />
        <NotificationCenter />
      </>,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Trigger Multi"));
    expect(screen.getByText("Undo")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Undo"));
    expect(onUndo).toHaveBeenCalledOnce();
  });

  it("applies priority ring class for critical notifications", () => {
    const CriticalTrigger: React.FC = () => {
      const { error } = useNotificationCenter();
      return (
        <button
          onClick={() =>
            error("Production is down.", {
              title: "Critical Alert",
              priority: "critical",
              persistent: true,
            })
          }
        >
          Trigger Critical
        </button>
      );
    };

    const { container } = render(
      <>
        <CriticalTrigger />
        <NotificationCenter />
      </>,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Trigger Critical"));
    expect(screen.getByText("Critical Alert")).toBeInTheDocument();
    const card = container.querySelector("[data-priority='critical']");
    expect(card).not.toBeNull();
  });

  it("renders avatar fallback initials instead of type icon", () => {
    const AvatarTrigger: React.FC = () => {
      const { info } = useNotificationCenter();
      return (
        <button
          onClick={() =>
            info("Sent you a message.", {
              title: "Alex K.",
              avatarFallback: "AK",
            })
          }
        >
          Trigger Avatar
        </button>
      );
    };

    render(
      <>
        <AvatarTrigger />
        <NotificationCenter />
      </>,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Trigger Avatar"));
    expect(screen.getByText("AK")).toBeInTheDocument();
  });

  it("renders custom icon override", () => {
    const IconTrigger: React.FC = () => {
      const { warning } = useNotificationCenter();
      return (
        <button
          onClick={() =>
            warning("Suspicious login detected.", {
              title: "Security",
              icon: ShieldAlert,
            })
          }
        >
          Trigger Icon
        </button>
      );
    };

    const { container } = render(
      <>
        <IconTrigger />
        <NotificationCenter />
      </>,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Trigger Icon"));
    expect(screen.getByText("Security")).toBeInTheDocument();
    // ShieldAlert renders an SVG — assert the card is present
    expect(container.querySelector("[role='status']")).not.toBeNull();
  });

  it("backward-compat: single action prop still renders", () => {
    const LegacyTrigger: React.FC<{ onView: () => void }> = ({ onView }) => {
      const { info } = useNotificationCenter();
      return (
        <button
          onClick={() =>
            info("Document ready.", {
              action: { label: "View doc", onClick: onView },
            })
          }
        >
          Trigger Legacy
        </button>
      );
    };

    const onView = vi.fn();
    render(
      <>
        <LegacyTrigger onView={onView} />
        <NotificationCenter />
      </>,
      { wrapper: Wrapper },
    );

    fireEvent.click(screen.getByText("Trigger Legacy"));
    expect(screen.getByText("View doc")).toBeInTheDocument();
    fireEvent.click(screen.getByText("View doc"));
    expect(onView).toHaveBeenCalledOnce();
  });
});

describe("Composite docs", () => {
  it("lists NotificationCenter in composite showcase", () => {
    render(<CompositeShowcase />, { wrapper: Wrapper });
    expect(screen.getByText("NotificationCenter")).toBeInTheDocument();
  });
});
