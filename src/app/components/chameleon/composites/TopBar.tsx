import React, { useState } from "react";
import { Search, Bell } from "lucide-react";
import { cn } from "../utils";
import { Badge, Input } from "../atoms";
import { useThemeClasses } from "../context";
import type { TopBarProps } from "./types";

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
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [query, setQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header
      className={cn(
        "flex items-center gap-4 px-4 sm:px-6 py-3 bg-[var(--card)] border-b border-[var(--border)]",
        className,
      )}
    >
      {(title || subtitle) && (
        <div className="min-w-0">
          {title && <h1 className={cn("text-lg font-bold truncate", textPrimary)}>{title}</h1>}
          {subtitle && <p className={cn("text-xs truncate", textMuted)}>{subtitle}</p>}
        </div>
      )}

      <div className="flex-1" />

      {onSearch !== undefined && (
        <div className="relative hidden sm:block w-56">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
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

      {notifications.length > 0 && (
        <button
          onClick={onNotificationClick}
          className="relative p-2 rounded-lg hover:bg-[var(--muted)] transition-colors"
        >
          <Bell className="w-5 h-5 text-[var(--muted-foreground)]" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[var(--primary)] text-[var(--primary-foreground)] text-[9px] font-bold rounded-full flex items-center justify-center">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      )}

      {userMenu && <div>{userMenu}</div>}
    </header>
  );
};
