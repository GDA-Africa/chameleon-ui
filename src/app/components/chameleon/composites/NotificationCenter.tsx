import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Info, AlertTriangle, XCircle, X, Loader2 } from "lucide-react";
import { cn } from "../utils";
import { useThemeClasses } from "../context";
import type {
  NotificationCenterCreateInput,
  NotificationCenterItem,
  NotificationCenterProps,
  NotificationCenterProviderProps,
  NotificationCenterType,
  NotificationPriority,
} from "./types";

type NotificationCenterContextValue = {
  toasts: NotificationCenterItem[];
  notify: (input: NotificationCenterCreateInput) => string;
  success: (message: string, options?: Omit<NotificationCenterCreateInput, "message" | "type">) => string;
  info: (message: string, options?: Omit<NotificationCenterCreateInput, "message" | "type">) => string;
  warning: (message: string, options?: Omit<NotificationCenterCreateInput, "message" | "type">) => string;
  error: (message: string, options?: Omit<NotificationCenterCreateInput, "message" | "type">) => string;
  loading: (message: string, options?: Omit<NotificationCenterCreateInput, "message" | "type" | "state">) => string;
  update: (id: string, patch: Partial<NotificationCenterItem>) => void;
  dismiss: (id: string) => void;
  clear: () => void;
  pauseOnHover: boolean;
  defaultDuration: number;
};

const NotificationCenterContext = createContext<NotificationCenterContextValue | null>(null);

const createId = () => {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
};

export const NotificationCenterProvider: React.FC<NotificationCenterProviderProps> = ({
  children,
  defaultDuration = 5000,
  maxVisible = 5,
  pauseOnHover = true,
  newestOnTop = true,
}) => {
  const [toasts, setToasts] = useState<NotificationCenterItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clear = useCallback(() => {
    setToasts([]);
  }, []);

  const update = useCallback((id: string, patch: Partial<NotificationCenterItem>) => {
    setToasts((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  }, []);

  const notify = useCallback(
    (input: NotificationCenterCreateInput) => {
      const id = input.id ?? createId();
      const nextItem: NotificationCenterItem = {
        id,
        title: input.title,
        message: input.message,
        type: input.type ?? "info",
        duration: input.duration,
        action: input.action,
        actions: input.actions,
        priority: input.priority,
        avatar: input.avatar,
        avatarFallback: input.avatarFallback,
        icon: input.icon,
        persistent: input.persistent ?? false,
        state: input.state ?? "idle",
        closable: input.closable ?? true,
        createdAt: Date.now(),
      };

      setToasts((prev) => {
        const merged = newestOnTop ? [nextItem, ...prev] : [...prev, nextItem];
        return merged.slice(0, Math.max(maxVisible, 1));
      });

      return id;
    },
    [maxVisible, newestOnTop],
  );

  const pushTyped = useCallback(
    (
      type: NotificationCenterType,
      message: string,
      options?: Omit<NotificationCenterCreateInput, "message" | "type">,
    ) => notify({ ...options, message, type }),
    [notify],
  );

  const value = useMemo<NotificationCenterContextValue>(
    () => ({
      toasts,
      notify,
      success: (message, options) => pushTyped("success", message, options),
      info: (message, options) => pushTyped("info", message, options),
      warning: (message, options) => pushTyped("warning", message, options),
      error: (message, options) => pushTyped("error", message, options),
      loading: (message, options) => notify({ ...options, message, type: "info", state: "loading", persistent: true }),
      update,
      dismiss,
      clear,
      pauseOnHover,
      defaultDuration,
    }),
    [toasts, notify, pushTyped, update, dismiss, clear, pauseOnHover, defaultDuration],
  );

  return (
    <NotificationCenterContext.Provider value={value}>
      {children}
    </NotificationCenterContext.Provider>
  );
};

export const useNotificationCenter = () => {
  const context = useContext(NotificationCenterContext);
  if (!context) {
    throw new Error("useNotificationCenter must be used within NotificationCenterProvider");
  }
  return context;
};

const typeConfig: Record<NotificationCenterType, { icon: React.ElementType; accent: string; bg: string; border: string }> = {
  success: {
    icon: CheckCircle2,
    accent: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  info: {
    icon: Info,
    accent: "text-sky-500",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30",
  },
  warning: {
    icon: AlertTriangle,
    accent: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  error: {
    icon: XCircle,
    accent: "text-rose-500",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
  },
};

const priorityCardClass: Record<NotificationPriority, string> = {
  critical: "ring-2 ring-rose-500/60 border-rose-500/40",
  high: "border-l-4 border-l-amber-500",
  medium: "border-l-2 border-l-sky-400",
  low: "opacity-80",
};

const positionClassMap: Record<NonNullable<NotificationCenterProps["position"]>, string> = {
  "top-left": "top-4 left-4 items-start",
  "top-center": "top-4 left-1/2 -translate-x-1/2 items-center",
  "top-right": "top-4 right-4 items-end",
  "bottom-left": "bottom-4 left-4 items-start",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2 items-center",
  "bottom-right": "bottom-4 right-4 items-end",
};

const NotificationCard: React.FC<{
  item: NotificationCenterItem;
  compact: boolean;
  showCloseButton: boolean;
  showProgress: boolean;
  onDismiss: (id: string) => void;
  classNames: NonNullable<NotificationCenterProps["classNames"]>;
  styles: NonNullable<NotificationCenterProps["styles"]>;
  defaultDuration: number;
  pauseOnHover: boolean;
}> = ({ item, compact, showCloseButton, showProgress, onDismiss, classNames, styles, defaultDuration, pauseOnHover }) => {
  const { cardClass, textPrimary, textMuted } = useThemeClasses();
  const [isHovering, setIsHovering] = useState(false);
  const createdAtRef = useRef(item.createdAt ?? Date.now());

  const duration = item.persistent || item.state === "loading" ? 0 : (item.duration ?? defaultDuration);
  const progressDuration = Math.max(duration, 1);
  const progressKey = `${item.id}-${isHovering ? "paused" : "running"}`;

  useEffect(() => {
    if (duration <= 0) return undefined;
    if (pauseOnHover && isHovering) return undefined;

    const timeout = window.setTimeout(() => {
      onDismiss(item.id);
    }, duration);

    return () => window.clearTimeout(timeout);
  }, [duration, isHovering, item.id, onDismiss, pauseOnHover]);

  const config = typeConfig[item.type ?? "info"];
  const elapsed = Math.max(0, Date.now() - createdAtRef.current);

  // Avatar / icon resolution: URL img → initials → custom icon → type icon
  const renderIconSlot = () => {
    if (item.avatar) {
      return (
        <img
          src={item.avatar}
          alt={item.avatarFallback ?? ""}
          className="h-9 w-9 rounded-xl object-cover"
        />
      );
    }
    if (item.avatarFallback) {
      return (
        <div className={cn("mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border font-black text-[11px]", config.bg, config.border, config.accent)}>
          {item.avatarFallback}
        </div>
      );
    }
    const CustomIcon = item.icon;
    const IconComponent = item.state === "loading" ? Loader2 : (CustomIcon ?? config.icon);
    return (
      <div className={cn("mt-0.5 rounded-xl border p-2", config.bg, config.border)}>
        <IconComponent className={cn("h-4 w-4", config.accent, item.state === "loading" && "animate-spin")} />
      </div>
    );
  };

  // Merge single action (backward compat) + actions array
  const allActions = [
    ...(item.action ? [item.action] : []),
    ...(item.actions ?? []),
  ];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className={cn(
        cardClass,
        "relative w-full max-w-md overflow-hidden border",
        config.border,
        item.priority ? priorityCardClass[item.priority] : null,
        classNames.card,
        compact ? "p-3" : "p-4",
      )}
      style={styles.card}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      role="status"
      aria-live="polite"
      data-state={item.state ?? "idle"}
      data-priority={item.priority}
    >
      <div className="flex items-start gap-3">
        {renderIconSlot()}

        <div className="min-w-0 flex-1">
          {item.title ? (
            <p className={cn("truncate text-sm font-bold", textPrimary, classNames.title)} style={styles.title}>{item.title}</p>
          ) : null}
          <p
            className={cn("text-sm leading-relaxed", item.title ? textMuted : textPrimary, classNames.message)}
            style={styles.message}
          >
            {item.message}
          </p>
          {!compact && item.createdAt ? (
            <p className={cn("mt-1 text-[11px] font-semibold uppercase tracking-wide", textMuted)}>
              {new Date(item.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
          ) : null}

          {allActions.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {allActions.map((act, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="text-xs font-bold text-[var(--primary)] hover:underline"
                  onClick={() => {
                    act.onClick();
                    if (!item.persistent) {
                      onDismiss(item.id);
                    }
                  }}
                >
                  {act.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>

        {showCloseButton ? (
          <button
            type="button"
            onClick={() => onDismiss(item.id)}
            disabled={item.closable === false}
            className="rounded-lg p-1 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            aria-label="Dismiss notification"
          >
            <X className="h-4 w-4" />
          </button>
        ) : null}
      </div>

      {showProgress && duration > 0 ? (
        <div className="pointer-events-none absolute bottom-0 left-0 h-1 w-full bg-[var(--muted)]/40">
          <motion.div
            key={progressKey}
            className={cn("h-full", config.bg, classNames.progress)}
            style={styles.progress}
            initial={{ width: `${Math.max(0, ((progressDuration - elapsed) / progressDuration) * 100)}%` }}
            animate={{ width: "0%" }}
            transition={{ duration: (progressDuration - elapsed) / 1000, ease: "linear" }}
          />
        </div>
      ) : null}
    </motion.div>
  );
};

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  position = "top-right",
  compact = false,
  showCloseButton = true,
  showProgress = true,
  gap = 8,
  classNames = {},
  styles = {},
  className,
}) => {
  const { toasts, dismiss, clear, defaultDuration, pauseOnHover } = useNotificationCenter();

  if (toasts.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "pointer-events-none fixed z-[120] flex max-h-[calc(100dvh-2rem)] w-[min(100vw-1.5rem,26rem)] flex-col gap-2",
        positionClassMap[position],
        classNames.viewport,
        className,
      )}
      style={{ gap, ...styles.viewport }}
    >
      {toasts.length > 1 ? (
        <div className="pointer-events-auto mb-1 flex justify-end gap-2">
          <button
            type="button"
            className="rounded-lg border border-[var(--border)] bg-[var(--card)] px-2 py-1 text-[10px] font-black uppercase tracking-wide text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            onClick={clear}
          >
            Clear all
          </button>
        </div>
      ) : null}

      <AnimatePresence initial={false}>
        {toasts.map((item) => (
          <div key={item.id} className="pointer-events-auto">
            <NotificationCard
              item={item}
              compact={compact}
              showCloseButton={showCloseButton}
              showProgress={showProgress}
              onDismiss={dismiss}
              classNames={classNames}
              styles={styles}
              defaultDuration={defaultDuration}
              pauseOnHover={pauseOnHover}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};
