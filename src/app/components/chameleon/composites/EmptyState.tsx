import React from "react";
import { FolderOpen } from "lucide-react";
import { cn } from "../utils";
import { Button } from "../atoms";
import { useThemeClasses } from "../context";
import type { EmptyStateProps } from "./types";

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = "Nothing here yet",
  description = "Get started by creating your first item.",
  actionLabel,
  onAction,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();

  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-16 px-4 space-y-4", className)}>
      <div className="w-16 h-16 rounded-2xl bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)]">
        {icon ?? <FolderOpen className="w-8 h-8" />}
      </div>
      <div className="space-y-2">
        <h3 className={cn("text-lg font-bold", textPrimary)}>{title}</h3>
        {description && <p className={cn("text-sm max-w-sm", textMuted)}>{description}</p>}
      </div>
      {actionLabel && onAction && (
        <Button onClick={onAction} animated>{actionLabel}</Button>
      )}
    </div>
  );
};
