import React, { useMemo, useState } from "react";
import { Search, Bell, BellOff, CheckCheck, Archive, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils";
import { useThemeClasses } from "../context";
import { Button, Input, Badge } from "../atoms";
import type {
  NotificationInboxAction,
  NotificationInboxItem,
  NotificationInboxProps,
  NotificationInboxType,
} from "./types";

type FilterOption = "all" | "unread" | "read" | "archived" | NotificationInboxType;

const typeIcon: Record<NotificationInboxType, React.ElementType> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const typeAccent: Record<NotificationInboxType, string> = {
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-rose-500",
  info: "text-sky-500",
};

const defaultItems: NotificationInboxItem[] = [
  {
    id: "billing-1",
    title: "Invoice paid",
    message: "Your April invoice has been paid successfully.",
    type: "success",
    status: "unread",
    source: "Billing",
    tags: ["finance", "invoice"],
    createdAt: Date.now() - 1000 * 60 * 8,
    actions: [{ id: "view", label: "View receipt", intent: "primary" }],
  },
  {
    id: "security-1",
    title: "New device login",
    message: "A new sign-in was detected from Safari on iPhone.",
    type: "warning",
    status: "read",
    source: "Security",
    tags: ["security"],
    createdAt: Date.now() - 1000 * 60 * 46,
    actions: [
      { id: "review", label: "Review", intent: "primary" },
      { id: "ignore", label: "Ignore", intent: "neutral" },
    ],
  },
  {
    id: "deploy-1",
    title: "Deploy failed",
    message: "Production deployment failed during migrations.",
    type: "error",
    status: "unread",
    source: "CI/CD",
    tags: ["ops", "deployment"],
    createdAt: Date.now() - 1000 * 60 * 2,
    actions: [{ id: "logs", label: "Open logs", intent: "danger" }],
  },
];

export const NotificationInbox: React.FC<NotificationInboxProps> = ({
  notifications,
  defaultNotifications = defaultItems,
  onNotificationsChange,
  onAction,
  title = "Notification Inbox",
  subtitle = "Search, filter, and handle actionable notifications in one place.",
  searchable = true,
  filterable = true,
  showUnreadOnlyToggle = true,
  maxItems = 200,
  emptyStateTitle = "No notifications found",
  emptyStateDescription = "Try clearing filters or search terms.",
  animated = true,
  className,
  classNames = {},
  styles = {},
}) => {
  const { cardClass, textPrimary, textMuted } = useThemeClasses();
  const [internalItems, setInternalItems] = useState<NotificationInboxItem[]>(defaultNotifications.slice(0, maxItems));
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");
  const [unreadOnly, setUnreadOnly] = useState(false);

  const items = notifications ?? internalItems;

  const setItems = (nextItems: NotificationInboxItem[]) => {
    if (notifications === undefined) {
      setInternalItems(nextItems.slice(0, maxItems));
    }
    onNotificationsChange?.(nextItems.slice(0, maxItems));
  };

  const setStatus = (id: string, status: NotificationInboxItem["status"]) => {
    setItems(items.map((item) => (item.id === id ? { ...item, status } : item)));
  };

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      if (unreadOnly && item.status !== "unread") return false;

      if (activeFilter !== "all") {
        if (activeFilter === "unread" || activeFilter === "read" || activeFilter === "archived") {
          if (item.status !== activeFilter) return false;
        } else if ((item.type ?? "info") !== activeFilter) {
          return false;
        }
      }

      if (!normalizedQuery) return true;

      return [
        item.title,
        item.message,
        item.source,
        ...(item.tags ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [activeFilter, items, query, unreadOnly]);

  const unreadCount = items.filter((item) => item.status === "unread").length;

  const filterOptions: FilterOption[] = ["all", "unread", "read", "archived", "success", "warning", "error", "info"];

  const formatTime = (value?: number) => {
    if (!value) return "Just now";
    const deltaMins = Math.max(1, Math.floor((Date.now() - value) / 60000));
    if (deltaMins < 60) return `${deltaMins}m ago`;
    const deltaHours = Math.floor(deltaMins / 60);
    if (deltaHours < 24) return `${deltaHours}h ago`;
    return `${Math.floor(deltaHours / 24)}d ago`;
  };

  const getActionClass = (intent: NotificationInboxAction["intent"]) => {
    if (intent === "danger") {
      return "border-rose-500/30 text-rose-500 hover:bg-rose-500/10";
    }
    if (intent === "primary") {
      return "border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/10";
    }
    return "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]";
  };

  return (
    <div className={cn("space-y-4", className, classNames.root)} style={styles.root}>
      <div className={cn(cardClass, "p-4 sm:p-5 border border-[var(--border)]") }>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className={cn("text-lg sm:text-xl font-black tracking-tight", textPrimary)}>{title}</h3>
            <p className={cn("text-sm mt-1", textMuted)}>{subtitle}</p>
          </div>
          <Badge className="text-[10px] font-black uppercase tracking-widest">{items.length} total</Badge>
        </div>

        <div className={cn("mt-4 space-y-3", classNames.toolbar)} style={styles.toolbar}>
          {searchable ? (
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search notifications..."
                className={cn("pl-9", classNames.searchInput)}
                style={styles.searchInput}
              />
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-2">
            {filterable
              ? filterOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setActiveFilter(option)}
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wide border transition-colors",
                      activeFilter === option
                        ? "bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)]"
                        : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                    )}
                  >
                    {option}
                  </button>
                ))
              : null}

            {showUnreadOnlyToggle ? (
              <button
                type="button"
                onClick={() => setUnreadOnly((prev) => !prev)}
                className={cn(
                  "ml-auto px-2.5 py-1 rounded-full text-[11px] font-black uppercase tracking-wide border transition-colors",
                  unreadOnly
                    ? "bg-[var(--primary)]/10 border-[var(--primary)]/30 text-[var(--primary)]"
                    : "border-[var(--border)] text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                )}
              >
                Unread only ({unreadCount})
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className={cn("space-y-2", classNames.list)} style={styles.list}>
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const type = item.type ?? "info";
            const Icon = typeIcon[type];
            const status = item.status ?? "unread";

            return (
              <motion.article
                key={item.id}
                initial={animated ? { opacity: 0, y: 8 } : {}}
                animate={{ opacity: 1, y: 0 }}
                exit={animated ? { opacity: 0, y: -6 } : {}}
                transition={{ duration: 0.16, delay: animated ? index * 0.03 : 0 }}
                className={cn(
                  cardClass,
                  "border border-[var(--border)] p-3.5 sm:p-4",
                  status === "unread" && "ring-1 ring-[var(--primary)]/20",
                  classNames.item,
                )}
                style={styles.item}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 w-9 h-9 rounded-xl border border-[var(--border)] bg-[var(--muted)]/35 flex items-center justify-center shrink-0">
                    <Icon className={cn("w-4 h-4", typeAccent[type])} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={cn("text-sm font-black", textPrimary, classNames.itemTitle)} style={styles.itemTitle}>
                        {item.title}
                      </p>
                      {status === "unread" ? (
                        <Badge className="text-[9px] font-black uppercase tracking-widest">new</Badge>
                      ) : null}
                      <span className={cn("text-[11px] font-bold", textMuted)}>{formatTime(item.createdAt)}</span>
                    </div>

                    <p className={cn("text-sm mt-1 leading-relaxed", textMuted, classNames.itemMessage)} style={styles.itemMessage}>
                      {item.message}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {item.source ? (
                        <span className={cn("text-[11px] font-bold uppercase tracking-wide", textMuted)}>{item.source}</span>
                      ) : null}
                      {item.tags?.map((tag) => (
                        <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-[var(--muted)] text-[var(--muted-foreground)]">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      {item.actions?.map((action) => (
                        <button
                          key={action.id}
                          type="button"
                          onClick={() => onAction?.(item, action)}
                          className={cn(
                            "px-2.5 py-1 rounded-lg border text-xs font-bold transition-colors",
                            getActionClass(action.intent),
                            classNames.actionButton,
                          )}
                          style={styles.actionButton}
                        >
                          {action.label}
                        </button>
                      ))}

                      {status !== "read" ? (
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setStatus(item.id, "read")}>
                          <CheckCheck className="w-3.5 h-3.5 mr-1" /> Mark read
                        </Button>
                      ) : null}

                      {status !== "archived" ? (
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setStatus(item.id, "archived")}>
                          <Archive className="w-3.5 h-3.5 mr-1" /> Archive
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </AnimatePresence>

        {filteredItems.length === 0 ? (
          <div className={cn(cardClass, "border border-dashed border-[var(--border)] p-8 text-center", classNames.item)} style={styles.item}>
            {unreadCount === 0 ? (
              <BellOff className="w-8 h-8 mx-auto mb-3 text-[var(--muted-foreground)]" />
            ) : (
              <Bell className="w-8 h-8 mx-auto mb-3 text-[var(--muted-foreground)]" />
            )}
            <p className={cn("font-black", textPrimary)}>{emptyStateTitle}</p>
            <p className={cn("text-sm mt-1", textMuted)}>{emptyStateDescription}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
