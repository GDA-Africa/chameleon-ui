import React, { useEffect, useRef, useState } from "react";
import { Search, Bell, CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../utils";
import { Badge, Input } from "../atoms";
import { useThemeClasses } from "../context";
import type { NotificationInboxItem, NotificationInboxType, TopBarProps } from "./types";

const typeAccentMini: Record<NotificationInboxType, string> = {
  success: "text-emerald-500",
  warning: "text-amber-500",
  error: "text-rose-500",
  info: "text-sky-500",
};

const typeIconMini: Record<NotificationInboxType, React.ElementType> = {
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
  info: Info,
};

const formatTimeMini = (value?: number) => {
  if (!value) return "Just now";
  const deltaMins = Math.max(1, Math.floor((Date.now() - value) / 60000));
  if (deltaMins < 60) return `${deltaMins}m ago`;
  const deltaHours = Math.floor(deltaMins / 60);
  if (deltaHours < 24) return `${deltaHours}h ago`;
  return `${Math.floor(deltaHours / 24)}d ago`;
};

const MiniNotificationRow: React.FC<{ item: NotificationInboxItem }> = ({ item }) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const type = item.type ?? "info";
  const Icon = typeIconMini[type];

  const renderAvatar = () => {
    if (item.avatar) {
      return <img src={item.avatar} alt={item.avatarFallback ?? ""} className="h-8 w-8 shrink-0 rounded-lg object-cover" />;
    }
    if (item.avatarFallback) {
      return (
        <div className={cn("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)] font-black text-[10px]", typeAccentMini[type])}>
          {item.avatarFallback}
        </div>
      );
    }
    return (
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--muted)]">
        <Icon className={cn("h-3.5 w-3.5", typeAccentMini[type])} />
      </div>
    );
  };

  return (
    <div className="flex items-start gap-3 px-4 py-3 hover:bg-[var(--muted)]/50 transition-colors">
      {renderAvatar()}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className={cn("truncate text-xs font-bold", textPrimary)}>{item.title}</p>
          {item.status === "unread" && (
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
          )}
        </div>
        <p className={cn("mt-0.5 truncate text-[11px]", textMuted)}>{formatTimeMini(item.createdAt)}</p>
      </div>
    </div>
  );
};

export const TopBar: React.FC<TopBarProps> = ({
  title,
  subtitle,
  searchPlaceholder = "Search…",
  notifications = [],
  onSearch,
  onNotificationClick,
  actions,
  userMenu,
  className,
  showNotificationDropdown,
  notificationDropdownItems,
  onViewAllNotifications,
  dropdownMaxItems = 5,
}) => {
  const { textPrimary, textMuted, cardClass } = useThemeClasses();
  const [query, setQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;
  const richItems = notificationDropdownItems ?? [];
  const unreadRichCount = richItems.filter((n) => n.status === "unread").length;
  const displayCount = richItems.length > 0 ? unreadRichCount : unreadCount;
  const canDropdown = showNotificationDropdown !== false && richItems.length > 0;
  const hasNotifications = notifications.length > 0 || richItems.length > 0;

  useEffect(() => {
    if (!dropdownOpen) return undefined;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  return (
    <header
      className={cn(
        "flex items-center gap-4 border-b border-[var(--border)] bg-[var(--card)] px-4 py-3 sm:px-6",
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="min-w-0">
          {title && <h1 className={cn("truncate text-lg font-bold", textPrimary)}>{title}</h1>}
          {subtitle && <p className={cn("truncate text-xs", textMuted)}>{subtitle}</p>}
        </div>
      )}

      <div className="flex-1" />

      {onSearch !== undefined && (
        <div className="relative hidden w-56 sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted-foreground)]" />
          <Input
            className="pl-9"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              onSearch(e.target.value);
            }}
          />
        </div>
      )}

      {actions && <div className="flex items-center gap-2">{actions}</div>}

      {hasNotifications && (
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => {
              if (canDropdown) {
                setDropdownOpen((prev) => !prev);
              } else {
                onNotificationClick?.();
              }
            }}
            className="relative rounded-lg p-2 hover:bg-[var(--muted)] transition-colors"
            aria-label="Notifications"
            aria-expanded={canDropdown ? dropdownOpen : undefined}
            aria-haspopup={canDropdown ? "dialog" : undefined}
          >
            <Bell className="h-5 w-5 text-[var(--muted-foreground)]" />
            {displayCount > 0 && (
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--primary)] text-[9px] font-bold text-[var(--primary-foreground)]">
                {displayCount > 9 ? "9+" : displayCount}
              </span>
            )}
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                role="dialog"
                aria-label="Notifications panel"
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  cardClass,
                  "absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-[var(--border)] shadow-2xl sm:w-96",
                )}
              >
                <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
                  <p className={cn("text-sm font-black", textPrimary)}>Notifications</p>
                  {unreadRichCount > 0 && (
                    <Badge className="text-[9px] font-black uppercase tracking-widest">
                      {unreadRichCount} new
                    </Badge>
                  )}
                </div>

                <div className="divide-y divide-[var(--border)]">
                  {richItems.slice(0, dropdownMaxItems).map((item) => (
                    <MiniNotificationRow key={item.id} item={item} />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onViewAllNotifications?.();
                  }}
                  className="w-full py-3 text-xs font-bold text-[var(--primary)] transition-colors hover:bg-[var(--muted)]"
                >
                  View all notifications →
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {userMenu && <div>{userMenu}</div>}
    </header>
  );
};
