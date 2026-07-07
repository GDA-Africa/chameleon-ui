import React, { useState } from "react";
import {
  MessageSquare,
  ShieldAlert,
  Receipt,
  Terminal,
  Users,
  ShoppingBag,
  Heart,
  Bell,
  RefreshCw,
  Headphones,
  Settings,
} from "lucide-react";
import { cn } from "../utils";
import { useThemeClasses } from "../context";
import { TopBar } from "./TopBar";
import { NotificationInbox } from "./NotificationInbox";
import type {
  NotificationInboxCategory,
  NotificationInboxItem,
  NotificationInboxAction,
  NotificationPanelProps,
} from "./types";

// ─── Category metadata ────────────────────────────────────────────────────────

const CATEGORY_META: Record<NotificationInboxCategory, { label: string; icon: React.ElementType }> = {
  messages:      { label: "Messages",      icon: MessageSquare },
  security:      { label: "Security",      icon: ShieldAlert },
  billing:       { label: "Billing",       icon: Receipt },
  devops:        { label: "DevOps",        icon: Terminal },
  collaboration: { label: "Collaboration", icon: Users },
  ecommerce:     { label: "E-commerce",    icon: ShoppingBag },
  social:        { label: "Social",        icon: Heart },
  reminders:     { label: "Reminders",     icon: Bell },
  updates:       { label: "Updates",       icon: RefreshCw },
  support:       { label: "Support",       icon: Headphones },
};

// ─── Default demo data (all 10 use cases) ────────────────────────────────────

const NOW = Date.now();
const MIN = 60_000;
const HR = 3_600_000;

const PANEL_DEFAULT_NOTIFICATIONS: NotificationInboxItem[] = [
  // Messages
  {
    id: "msg-1",
    title: "Alex: Can you review this PR?",
    message: "Hey, I pushed the auth refactor. Would love your eyes on it before EOD — particularly the token refresh logic.",
    type: "info",
    status: "unread",
    category: "messages",
    priority: "medium",
    source: "Team Chat",
    avatarFallback: "AK",
    createdAt: NOW - 4 * MIN,
    actions: [{ id: "reply", label: "Reply", intent: "primary" }, { id: "open", label: "Open PR", intent: "neutral" }],
  },
  {
    id: "msg-2",
    title: "Team: Release checklist updated",
    message: "The Q3 release checklist has been updated with 3 new items. Please review before the standup.",
    type: "info",
    status: "archived",
    category: "messages",
    priority: "low",
    source: "Team Chat",
    avatarFallback: "TC",
    createdAt: NOW - 2 * HR,
    actions: [{ id: "view", label: "View checklist", intent: "primary" }],
  },
  // Security
  {
    id: "sec-1",
    title: "New device login from Chrome/Mac",
    message: "A sign-in was detected from a MacBook Pro in Cape Town, South Africa using Chrome. If this wasn't you, secure your account immediately.",
    type: "warning",
    status: "unread",
    category: "security",
    priority: "critical",
    source: "Security",
    createdAt: NOW - 12 * MIN,
    actions: [
      { id: "secure", label: "Secure account", intent: "danger" },
      { id: "its-me", label: "That was me", intent: "neutral" },
    ],
  },
  {
    id: "sec-2",
    title: "Password changed successfully",
    message: "Your account password was updated. If you didn't make this change, contact support immediately.",
    type: "success",
    status: "read",
    category: "security",
    priority: "high",
    source: "Security",
    createdAt: NOW - 3 * HR,
    actions: [{ id: "contact", label: "Contact support", intent: "neutral" }],
  },
  // Billing
  {
    id: "bill-1",
    title: "Invoice #1042 paid — $299.00",
    message: "Your April invoice has been paid and a receipt has been sent to your email.",
    type: "success",
    status: "read",
    category: "billing",
    priority: "low",
    source: "Billing",
    createdAt: NOW - 24 * HR,
    actions: [{ id: "receipt", label: "View receipt", intent: "primary" }],
  },
  {
    id: "bill-2",
    title: "Trial ends in 3 days",
    message: "Your Pro trial expires on May 9. Add a payment method to keep your features active without interruption.",
    type: "warning",
    status: "unread",
    category: "billing",
    priority: "high",
    source: "Billing",
    createdAt: NOW - 6 * HR,
    actions: [
      { id: "upgrade", label: "Add payment", intent: "primary" },
      { id: "plans", label: "View plans", intent: "neutral" },
    ],
  },
  // DevOps
  {
    id: "dev-1",
    title: "Deploy failed: prod-api@3.1.2",
    message: "The production deployment failed at the database migration step. Error: relation 'user_sessions' already exists. Manual rollback may be required.",
    type: "error",
    status: "unread",
    category: "devops",
    priority: "critical",
    source: "CI/CD",
    tags: ["ops", "prod"],
    createdAt: NOW - 8 * MIN,
    actions: [
      { id: "logs", label: "Open logs", intent: "danger" },
      { id: "rollback", label: "Rollback", intent: "neutral" },
    ],
  },
  {
    id: "dev-2",
    title: "Uptime alert resolved",
    message: "API latency has returned to normal levels. The incident lasted 14 minutes. Postmortem scheduled for tomorrow.",
    type: "success",
    status: "read",
    category: "devops",
    priority: "medium",
    source: "Uptime Monitor",
    createdAt: NOW - 2 * HR,
    actions: [{ id: "postmortem", label: "View postmortem", intent: "primary" }],
  },
  // Collaboration
  {
    id: "collab-1",
    title: "You were mentioned in 'Q3 Roadmap'",
    message: "@you has been assigned as the owner of the 'Notification System Overhaul' initiative in the Q3 Roadmap document.",
    type: "info",
    status: "unread",
    category: "collaboration",
    priority: "high",
    source: "Docs",
    avatarFallback: "JD",
    createdAt: NOW - 35 * MIN,
    actions: [{ id: "open-doc", label: "Open document", intent: "primary" }],
  },
  {
    id: "collab-2",
    title: "PR review requested by Jordan",
    message: "Jordan Lee requested your review on pull request #284: 'feat: add dark mode toggle to settings page'.",
    type: "info",
    status: "unread",
    category: "collaboration",
    priority: "high",
    source: "GitHub",
    avatarFallback: "JL",
    createdAt: NOW - 1 * HR,
    actions: [
      { id: "review", label: "Start review", intent: "primary" },
      { id: "dismiss", label: "Dismiss", intent: "neutral" },
    ],
  },
  // E-commerce
  {
    id: "eco-1",
    title: "Order #9182 has shipped!",
    message: "Your order is on its way. Expected delivery: May 8–10. Track your package with the link below.",
    type: "success",
    status: "read",
    category: "ecommerce",
    priority: "low",
    source: "Orders",
    createdAt: NOW - 18 * HR,
    actions: [{ id: "track", label: "Track package", intent: "primary" }],
  },
  {
    id: "eco-2",
    title: "Payment failed — update your card",
    message: "We couldn't charge your card ending in 4242. Please update your payment method to avoid service interruption.",
    type: "error",
    status: "unread",
    category: "ecommerce",
    priority: "critical",
    source: "Payments",
    createdAt: NOW - 45 * MIN,
    actions: [{ id: "update-card", label: "Update payment", intent: "danger" }],
  },
  // Social
  {
    id: "social-1",
    title: "Sarah liked your post",
    message: "Sarah Mitchell liked your post: 'Lessons from shipping a component library in 90 days'.",
    type: "info",
    status: "read",
    category: "social",
    priority: "low",
    source: "Feed",
    avatarFallback: "SM",
    createdAt: NOW - 5 * HR,
    actions: [{ id: "view-post", label: "View post", intent: "primary" }],
  },
  {
    id: "social-2",
    title: "5 new followers this week",
    message: "You gained 5 new followers: Alex K., Jordan L., and 3 others discovered your profile this week.",
    type: "info",
    status: "archived",
    category: "social",
    priority: "low",
    source: "Feed",
    createdAt: NOW - 48 * HR,
    actions: [{ id: "view-followers", label: "View followers", intent: "primary" }],
  },
  // Reminders
  {
    id: "remind-1",
    title: "Meeting in 15 min: Design Review",
    message: "Your 'Design Review: Notification System' meeting starts at 3:00 PM. Join link is in your calendar.",
    type: "warning",
    status: "unread",
    category: "reminders",
    priority: "high",
    source: "Calendar",
    createdAt: NOW - 2 * MIN,
    actions: [{ id: "join", label: "Join meeting", intent: "primary" }, { id: "snooze5", label: "Snooze 5 min", intent: "neutral" }],
  },
  {
    id: "remind-2",
    title: "Deadline tomorrow: Q3 Feature Scope",
    message: "The Q3 Feature Scope document is due by 5:00 PM tomorrow. You have 3 sections still marked as draft.",
    type: "warning",
    status: "unread",
    category: "reminders",
    priority: "high",
    source: "Project",
    createdAt: NOW - 4 * HR,
    actions: [{ id: "open-doc", label: "Open document", intent: "primary" }],
  },
  // Updates
  {
    id: "update-1",
    title: "Chameleon UI v2.1.0 released",
    message: "v2.1.0 ships the new NotificationPanel template, TopBar bell dropdown, priority levels, avatar support, snooze, and bulk actions. Upgrade today.",
    type: "info",
    status: "unread",
    category: "updates",
    priority: "medium",
    source: "Changelog",
    createdAt: NOW - 30 * MIN,
    actions: [{ id: "changelog", label: "View changelog", intent: "primary" }, { id: "upgrade", label: "Upgrade", intent: "neutral" }],
  },
  {
    id: "update-2",
    title: "Security patch available",
    message: "A security update is available for your version. We recommend upgrading to v2.0.8 to fix a potential XSS vulnerability in the rich-text renderer.",
    type: "warning",
    status: "read",
    category: "updates",
    priority: "high",
    source: "Security",
    createdAt: NOW - 12 * HR,
    actions: [{ id: "update", label: "Update now", intent: "danger" }],
  },
  // Support
  {
    id: "sup-1",
    title: "Ticket #447 resolved",
    message: "Your support ticket 'TopBar dropdown not closing on mobile' has been resolved. Please verify the fix and close the ticket if satisfied.",
    type: "success",
    status: "read",
    category: "support",
    priority: "medium",
    source: "Support",
    createdAt: NOW - 8 * HR,
    actions: [{ id: "verify", label: "Verify fix", intent: "primary" }, { id: "reopen", label: "Reopen", intent: "neutral" }],
  },
  {
    id: "sup-2",
    title: "New reply: 'Tailwind v4 compat'",
    message: "Support agent Maya replied to your thread: 'Yes — Tailwind v4 requires the @tailwindcss/vite plugin. Here's the migration guide…'",
    type: "info",
    status: "unread",
    category: "support",
    priority: "medium",
    source: "Support",
    avatarFallback: "MA",
    createdAt: NOW - 20 * MIN,
    actions: [{ id: "reply", label: "Reply", intent: "primary" }, { id: "view", label: "View thread", intent: "neutral" }],
  },
];

// ─── Private helpers ──────────────────────────────────────────────────────────

interface StatChipProps {
  label: string;
  value: number;
  accent?: boolean;
}

const StatChip: React.FC<StatChipProps> = ({ label, value, accent }) => {
  const { textMuted } = useThemeClasses();
  return (
    <div className="flex items-center gap-1.5">
      <span
        className={cn(
          "text-xl font-black leading-none",
          accent ? "text-[var(--primary)]" : "text-[var(--foreground)]",
        )}
      >
        {value}
      </span>
      <span className={cn("text-[11px] font-bold uppercase tracking-wide", textMuted)}>{label}</span>
    </div>
  );
};

interface CategoryPillProps {
  label: string;
  value: NotificationInboxCategory | "all";
  icon?: React.ElementType;
  count: number;
  active: boolean;
  onClick: (value: NotificationInboxCategory | "all") => void;
}

const CategoryPill: React.FC<CategoryPillProps> = ({ label, value, icon: Icon, count, active, onClick }) => {
  const { textMuted } = useThemeClasses();
  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={cn(
        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-bold transition-all",
        active
          ? "bg-[var(--primary)]/10 text-[var(--primary)]"
          : cn("hover:bg-[var(--muted)]", textMuted, "hover:text-[var(--foreground)]"),
      )}
    >
      <div className="flex items-center gap-2">
        {Icon && <Icon className="h-3.5 w-3.5 shrink-0" />}
        <span className="truncate">{label}</span>
      </div>
      <span
        className={cn(
          "ml-2 shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-black",
          active
            ? "bg-[var(--primary)]/20 text-[var(--primary)]"
            : "bg-[var(--muted)] text-[var(--muted-foreground)]",
        )}
      >
        {count}
      </span>
    </button>
  );
};

// ─── NotificationPanel ────────────────────────────────────────────────────────

export const NotificationPanel: React.FC<NotificationPanelProps> = ({
  notifications,
  defaultNotifications = PANEL_DEFAULT_NOTIFICATIONS,
  onNotificationsChange,
  onAction,
  onMarkAllRead,
  onArchiveAll,
  title = "Notification Center",
  showTopBar = true,
  topBarTitle = "Notifications",
  topBarSubtitle,
  animated = true,
  className,
}) => {
  const { cardClass, textPrimary, textMuted } = useThemeClasses();
  const [selectedCategory, setSelectedCategory] = useState<NotificationInboxCategory | "all">("all");
  const [internalItems, setInternalItems] = useState<NotificationInboxItem[]>(defaultNotifications);

  const items = notifications ?? internalItems;

  const handleChange = (next: NotificationInboxItem[]) => {
    if (notifications === undefined) setInternalItems(next);
    onNotificationsChange?.(next);
  };

  const handleMarkAllRead = () => {
    handleChange(items.map((i) => ({ ...i, status: "read" as const })));
    onMarkAllRead?.();
  };

  const handleArchiveAll = () => {
    handleChange(items.map((i) => ({ ...i, status: "archived" as const })));
    onArchiveAll?.();
  };

  // Stats
  const totalCount = items.length;
  const unreadCount = items.filter((i) => i.status === "unread").length;
  const archivedCount = items.filter((i) => i.status === "archived").length;

  // Derived categories from items
  const activeCategories = [
    ...new Set(
      items.map((i) => i.category).filter((c): c is NotificationInboxCategory => !!c),
    ),
  ];

  // Category-filtered items for the inbox
  const visibleItems = selectedCategory === "all"
    ? items
    : items.filter((i) => i.category === selectedCategory);

  // When NotificationInbox updates visibleItems, merge changes back into full list
  const handleVisibleChange = (nextVisible: NotificationInboxItem[]) => {
    if (selectedCategory === "all") {
      handleChange(nextVisible);
      return;
    }
    const unchanged = items.filter((i) => i.category !== selectedCategory);
    handleChange([...unchanged, ...nextVisible]);
  };

  // Unread items for TopBar dropdown (max 5)
  const topBarDropdownItems = items.filter((i) => i.status === "unread").slice(0, 5);

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-xl border border-[var(--border)]", cardClass, className)}>
      {/* TopBar */}
      {showTopBar && (
        <TopBar
          title={topBarTitle}
          subtitle={topBarSubtitle}
          showNotificationDropdown
          notificationDropdownItems={topBarDropdownItems}
          actions={
            <button
              type="button"
              aria-label="Notification preferences"
              className="rounded-lg p-2 text-[var(--muted-foreground)] transition-colors hover:bg-[var(--muted)] hover:text-[var(--foreground)]"
            >
              <Settings className="h-4 w-4" />
            </button>
          }
        />
      )}

      {/* Stats strip */}
      <div className="flex flex-wrap items-center gap-6 border-b border-[var(--border)] bg-[var(--muted)]/20 px-6 py-3">
        <StatChip label="Total" value={totalCount} />
        <div className="h-4 w-px bg-[var(--border)]" />
        <StatChip label="Unread" value={unreadCount} accent />
        <div className="h-4 w-px bg-[var(--border)]" />
        <StatChip label="Archived" value={archivedCount} />
        {title && !showTopBar && (
          <h2 className={cn("ml-auto text-base font-black", textPrimary)}>{title}</h2>
        )}
      </div>

      {/* Body */}
      <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
        {/* Category sidebar */}
        <aside className="shrink-0 border-b border-[var(--border)] p-3 sm:w-52 sm:border-b-0 sm:border-r">
          <p className={cn("mb-2 px-3 text-[10px] font-black uppercase tracking-widest", textMuted)}>Categories</p>

          <CategoryPill
            label="All notifications"
            value="all"
            count={totalCount}
            active={selectedCategory === "all"}
            onClick={setSelectedCategory}
          />

          <div className="mt-1 space-y-0.5">
            {activeCategories.map((cat) => {
              const meta = CATEGORY_META[cat];
              return (
                <CategoryPill
                  key={cat}
                  label={meta.label}
                  value={cat}
                  icon={meta.icon}
                  count={items.filter((i) => i.category === cat).length}
                  active={selectedCategory === cat}
                  onClick={setSelectedCategory}
                />
              );
            })}
          </div>
        </aside>

        {/* Inbox */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          <NotificationInbox
            notifications={visibleItems}
            onNotificationsChange={handleVisibleChange}
            onAction={onAction}
            onMarkAllRead={handleMarkAllRead}
            onArchiveAll={handleArchiveAll}
            title={
              selectedCategory === "all"
                ? "All Notifications"
                : (CATEGORY_META[selectedCategory]?.label ?? "Notifications")
            }
            subtitle={
              selectedCategory === "all"
                ? "All your notifications in one place."
                : `Showing ${CATEGORY_META[selectedCategory]?.label.toLowerCase() ?? selectedCategory} notifications.`
            }
            searchable
            filterable
            showUnreadOnlyToggle
            showStats={false}
            animated={animated}
            emptyStateTitle={`No ${selectedCategory === "all" ? "" : (CATEGORY_META[selectedCategory]?.label.toLowerCase() ?? selectedCategory) + " "}notifications`}
            emptyStateDescription="Try adjusting your filters or search query."
          />
        </div>
      </div>
    </div>
  );
};
