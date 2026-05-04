import React, { useState } from "react";
import { AlertTriangle } from "lucide-react";
import { cn } from "../utils";
import { Button } from "../atoms";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useThemeClasses } from "../context";
import type { DangerZoneProps, DangerAction } from "./types";

const DEFAULT_ACTIONS: DangerAction[] = [
  { id: "delete-account", label: "Delete Account", description: "Permanently delete your account and all data. This cannot be undone.", buttonLabel: "Delete Account", variant: "danger" },
  { id: "export-data", label: "Export Data", description: "Download a copy of all your personal data.", buttonLabel: "Export Data", variant: "warning" },
];

export const DangerZone: React.FC<DangerZoneProps> = ({
  heading = "Danger Zone",
  actions = DEFAULT_ACTIONS,
  onConfirm,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [confirming, setConfirming] = useState<string | null>(null);

  const handleAction = (action: DangerAction) => {
    if (confirming === action.id) {
      onConfirm?.(action.id);
      setConfirming(null);
    } else {
      setConfirming(action.id);
    }
  };

  return (
    <Card animated={animated} className={cn("border-red-200 dark:border-red-900", className)}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          <CardTitle className="text-red-600 dark:text-red-400">{heading}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {actions.map((action) => (
          <div key={action.id} className="flex items-start justify-between gap-4 p-4 rounded-lg border border-[var(--border)]">
            <div className="space-y-1">
              <p className={cn("text-sm font-medium", textPrimary)}>{action.label}</p>
              <p className={cn("text-xs", textMuted)}>{action.description}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <Button
                variant="outline"
                className={cn(
                  "text-xs border-red-300 dark:border-red-700",
                  confirming === action.id
                    ? "bg-red-500 text-white border-red-500 hover:bg-red-600"
                    : "text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20",
                )}
                onClick={() => handleAction(action)}
              >
                {confirming === action.id ? "Confirm?" : (action.buttonLabel ?? action.label)}
              </Button>
              {confirming === action.id && (
                <button className={cn("text-xs underline", textMuted)} onClick={() => setConfirming(null)}>
                  Cancel
                </button>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
