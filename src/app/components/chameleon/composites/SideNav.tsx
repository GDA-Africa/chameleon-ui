import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils";
import { Badge } from "../atoms";
import { useThemeClasses } from "../context";
import type { SideNavProps, NavItem } from "./types";

const DEFAULT_ITEMS: NavItem[] = [
  { label: "Dashboard", active: true },
  { label: "Analytics" },
  { label: "Users" },
  { label: "Settings" },
];

export const SideNav: React.FC<SideNavProps> = ({
  items = DEFAULT_ITEMS,
  activeItem,
  onSelect,
  collapsed = false,
  header,
  footer,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  const isActive = (item: NavItem) =>
    item.active || item.label === activeItem;

  return (
    <nav
      className={cn(
        "flex flex-col h-full bg-[var(--card)] border-r border-[var(--border)]",
        collapsed ? "w-16" : "w-64",
        "transition-all duration-200",
        className,
      )}
    >
      {header && <div className="p-4 border-b border-[var(--border)]">{header}</div>}

      <div className="flex-1 overflow-y-auto py-3">
        {items.map((item, i) => (
          <button
            key={i}
            onClick={() => onSelect?.(item)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors rounded-lg mx-1",
              isActive(item)
                ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                : cn("hover:bg-[var(--muted)]", textMuted, "hover:text-[var(--foreground)]"),
            )}
          >
            {item.icon && (
              <span className="w-5 h-5 flex items-center justify-center shrink-0">{item.icon}</span>
            )}
            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge !== undefined && (
                  <Badge className="text-xs px-1.5 py-0 h-5">{item.badge}</Badge>
                )}
                {item.children && item.children.length > 0 && (
                  <ChevronRight className="w-3 h-3 shrink-0" />
                )}
              </>
            )}
          </button>
        ))}
      </div>

      {footer && (
        <div className={cn("p-4 border-t border-[var(--border)]", textPrimary)}>
          {footer}
        </div>
      )}
    </nav>
  );
};
