import React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "../utils";
import { useThemeClasses } from "../context";
import type { PageHeaderProps } from "./types";

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  return (
    <div className={cn("space-y-2 pb-6 border-b border-[var(--border)]", className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="flex items-center gap-1 text-xs">
          {breadcrumbs.map((crumb, i) => (
            <React.Fragment key={i}>
              {i > 0 && <ChevronRight className="w-3 h-3 text-[var(--muted-foreground)]" />}
              {crumb.href ? (
                <a href={crumb.href} className="text-[var(--primary)] hover:underline">{crumb.label}</a>
              ) : (
                <span className={textMuted}>{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>
      )}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className={cn("text-2xl sm:text-3xl font-black", textPrimary)}>{title}</h1>
          {subtitle && <p className={cn("text-sm mt-1", textMuted)}>{subtitle}</p>}
        </div>
        {actions && <div className="flex items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
};
