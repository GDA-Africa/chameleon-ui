import React, { useMemo, useState } from "react";
import { Search, Bell, BellOff, CheckCheck, Archive, CheckCircle2, AlertTriangle, Info, XCircle, Clock } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils";
import { useThemeClasses } from "../context";
import { Button, Input, Badge } from "../atoms";
import type {
  NotificationInboxAction,
  NotificationInboxItem,
  NotificationInboxProps,
  NotificationInboxType,
  NotificationPriority,
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

const priorityArticleClass: Record<NotificationPriority, string> = {
  critical: "border-l-4 border-l-rose-500 ring-1 ring-rose-500/20",
  high: "border-l-4 border-l-amber-500",
  medium: "border-l-2 border-l-sky-400",
  low: "opacity-75",
};

const snoozeOptions = [
  { label: "1 hour", ms: 3_600_000 },
  { label: "Tomorrow", ms: 86_400_000 },
  { label: "1 week", ms: 604_800_000 },
];

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
    priority: "high",
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
    message: "Production deployment failed during migrations. Check the logs for detailed error output and rollback instructions.",
    type: "error",
    status: "unread",
    source: "CI/CD",
    priority: "critical",
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
  onMarkAllRead,
  onArchiveAll,
  title = "Notification Inbox",
  subtitle = "Search, filter, and handle actionable notifications in one place.",
  searchable = true,
  filterable = true,
  showUnreadOnlyToggle = true,
  showStats = false,
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
  const [snoozedMap, setSnoozedMap] = useState<Record<string, number>>({});
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [snoozeMenuId, setSnoozeMenuId] = useState<string | null>(null);

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

  const handleMarkAllRead = () => {
    setItems(items.map((i) => ({ ...i, status: "read" as const })));
    onMarkAllRead?.();
  };

  const handleArchiveAll = () => {
    setItems(items.map((i) => ({ ...i, status: "archived" as const })));
    onArchiveAll?.();
  };

  const filteredItems = useMemo(() => {
    const now = Date.now();
    const normalizedQuery = query.trim().toLowerCase();

    return items.filter((item) => {
      const snoozeUntil = snoozedMap[item.id];
      if (snoozeUntil !== undefined && now < snoozeUntil) return false;
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
        item.category,
        ...(item.tags ?? []),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [activeFilter, items, query, unreadOnly, snoozedMap]);

  const unreadCount = items.filter((item) => item.status === "unread").length;
  const archivedCount = items.filter((item) => item.status === "archived").length;

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

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Avatar / icon render
  const renderItemIcon = (item: NotificationInboxItem) => {
    const type = item.type ?? "info";
    const Icon = typeIcon[type];
    if (item.avatar) {
      return (
        <img
          src={item.avatar}
          alt={item.avatarFallback ?? item.title}
          className="h-9 w-9 shrink-0 rounded-xl object-cover"
        />
      );
    }
    if (item.avatarFallback) {
      return (
        <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] font-black text-[11px]", typeAccent[type], "bg-[var(--muted)]/40")}>
          {item.avatarFallback}
        </div>
      );
    }
    return (
      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--muted)]/35">
        <Icon className={cn("h-4 w-4", typeAccent[type])} />
      </div>
    );
  };

  const MESSAGE_TRUNCATE = 120;

  return (
    <div className={cn("space-y-4", className, classNames.root)} style={styles.root}>
      <div className={cn(cardClass, "border border-[var(--border)] p-4 sm:p-5")}>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className={cn("text-lg sm:text-xl font-black tracking-tight", textPrimary)}>{title}</h3>
            <p className={cn("text-sm mt-1", textMuted)}>{subtitle}</p>
          </div>
          <Badge className="text-[10px] font-black uppercase tracking-widest">{items.length} total</Badge>
        </div>

        {showStats && (
          <div className={cn("mt-3 flex flex-wrap gap-4 text-[11px] font-bold border-t border-[var(--border)] pt-3", classNames.stats)} style={styles.stats}>
            <span className={textMuted}>{items.length} total</span>
            <span className="text-[var(--primary)]">{unreadCount} unread</span>
            <span className={textMuted}>{archivedCount} archived</span>
          </div>
        )}

        <div className={cn("mt-4 space-y-3", classNames.toolbar)} style={styles.toolbar}>
          {searchable ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
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
                      "rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-wide transition-colors",
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
                  "ml-auto rounded-full border px-2.5 py-1 text-[11px] font-black uppercase tracking-wide transition-colors",
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

        {/* Bulk actions */}
        {items.length > 0 && (onMarkAllRead ?? onArchiveAll) ? (
          <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-[var(--border)] pt-3">
            {onMarkAllRead ? (
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={handleMarkAllRead}>
                <CheckCheck className="mr-1 h-3.5 w-3.5" /> Mark all read
              </Button>
            ) : null}
            {onArchiveAll ? (
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={handleArchiveAll}>
                <Archive className="mr-1 h-3.5 w-3.5" /> Archive all
              </Button>
            ) : null}
            <span className={cn("ml-auto text-[11px] font-bold", textMuted)}>
              {unreadCount} unread · {items.length} total
            </span>
          </div>
        ) : null}
      </div>

      <div className={cn("space-y-2", classNames.list)} style={styles.list}>
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const type = item.type ?? "info";
            const status = item.status ?? "unread";
            const isExpanded = expandedIds.has(item.id);
            const isLong = item.message.length > MESSAGE_TRUNCATE;
            const displayMessage = isExpanded || !isLong
              ? item.message
              : `${item.message.slice(0, MESSAGE_TRUNCATE)}…`;

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
                  item.priority ? priorityArticleClass[item.priority] : null,
                  classNames.item,
                )}
                style={styles.item}
              >
                <div className="flex items-start gap-3">
                  {renderItemIcon(item)}

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className={cn("text-sm font-black", textPrimary, classNames.itemTitle)} style={styles.itemTitle}>
                        {item.title}
                      </p>
                      {status === "unread" ? (
                        <Badge className="text-[9px] font-black uppercase tracking-widest">new</Badge>
                      ) : null}
                      {item.priority === "critical" ? (
                        <span className="rounded-full bg-rose-500/10 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-widest text-rose-500">
                          critical
                        </span>
                      ) : null}
                      <span className={cn("text-[11px] font-bold", textMuted)}>{formatTime(item.createdAt)}</span>
                    </div>

                    <p className={cn("mt-1 text-sm leading-relaxed", textMuted, classNames.itemMessage)} style={styles.itemMessage}>
                      {displayMessage}
                    </p>
                    {isLong ? (
                      <button
                        type="button"
                        className="mt-0.5 text-[11px] font-bold text-[var(--primary)] hover:underline"
                        onClick={() => toggleExpand(item.id)}
                      >
                        {isExpanded ? "Show less" : "Show more"}
                      </button>
                    ) : null}

                    <div className="mt-2 flex flex-wrap items-center gap-2">
                      {item.source ? (
                        <span className={cn("text-[11px] font-bold uppercase tracking-wide", textMuted)}>{item.source}</span>
                      ) : null}
                      {item.tags?.map((tag) => (
                        <span key={tag} className="rounded bg-[var(--muted)] px-1.5 py-0.5 text-[10px] text-[var(--muted-foreground)]">
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
                            "rounded-lg border px-2.5 py-1 text-xs font-bold transition-colors",
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
                          <CheckCheck className="mr-1 h-3.5 w-3.5" /> Mark read
                        </Button>
                      ) : null}

                      {status !== "archived" ? (
                        <Button size="sm" variant="ghost" className="h-7 px-2 text-xs" onClick={() => setStatus(item.id, "archived")}>
                          <Archive className="mr-1 h-3.5 w-3.5" /> Archive
                        </Button>
                      ) : null}

                      {/* Snooze */}
                      <div className="relative">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 px-2 text-xs"
                          onClick={() => setSnoozeMenuId(snoozeMenuId === item.id ? null : item.id)}
                        >
                          <Clock className="mr-1 h-3.5 w-3.5" /> Snooze
                        </Button>
                        <AnimatePresence>
                          {snoozeMenuId === item.id ? (
                            <motion.div
                              initial={{ opacity: 0, y: -4, scale: 0.96 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -4, scale: 0.96 }}
                              transition={{ duration: 0.12 }}
                              className={cn(
                                cardClass,
                                "absolute bottom-full left-0 z-20 mb-1 min-w-[140px] overflow-hidden rounded-xl border border-[var(--border)] shadow-xl",
                              )}
                            >
                              {snoozeOptions.map((opt) => (
                                <button
                                  key={opt.label}
                                  type="button"
                                  className={cn("w-full px-3 py-2 text-left text-xs font-bold hover:bg-[var(--muted)] transition-colors", textPrimary)}
                                  onClick={() => {
                                    setSnoozedMap((prev) => ({ ...prev, [item.id]: Date.now() + opt.ms }));
                                    setSnoozeMenuId(null);
                                  }}
                                >
                                  {opt.label}
                                </button>
                              ))}
                            </motion.div>
                          ) : null}
                        </AnimatePresence>
                      </div>
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
              <BellOff className="mx-auto mb-3 h-8 w-8 text-[var(--muted-foreground)]" />
            ) : (
              <Bell className="mx-auto mb-3 h-8 w-8 text-[var(--muted-foreground)]" />
            )}
            <p className={cn("font-black", textPrimary)}>{emptyStateTitle}</p>
            <p className={cn("mt-1 text-sm", textMuted)}>{emptyStateDescription}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};
