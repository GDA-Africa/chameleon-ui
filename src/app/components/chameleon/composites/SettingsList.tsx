import React, { useState } from "react";
import { cn } from "../utils";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useThemeClasses } from "../context";
import type { SettingsListProps, Setting } from "./types";

const DEFAULT_SETTINGS: Setting[] = [
  { id: "notifications", label: "Push Notifications", description: "Receive alerts for important updates", enabled: true },
  { id: "marketing", label: "Marketing Emails", description: "Product news and announcements", enabled: false },
  { id: "twofa", label: "Two-Factor Auth", description: "Add an extra layer of account security", enabled: false },
  { id: "analytics", label: "Usage Analytics", description: "Help improve the product with anonymous data", enabled: true },
];

export const SettingsList: React.FC<SettingsListProps> = ({
  heading = "Preferences",
  settings: initialSettings = DEFAULT_SETTINGS,
  onToggle,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [settings, setSettings] = useState<Setting[]>(initialSettings);

  const toggle = (id: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
    const setting = settings.find((s) => s.id === id);
    if (setting) onToggle?.(id, !setting.enabled);
  };

  return (
    <Card animated={animated} className={cn(className)}>
      {heading && (
        <CardHeader>
          <CardTitle>{heading}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="p-0">
        <ul className="divide-y divide-[var(--border)]">
          {settings.map((setting) => (
            <li key={setting.id} className="flex items-center justify-between px-6 py-4">
              <div className="space-y-0.5">
                <p className={cn("text-sm font-medium", textPrimary)}>{setting.label}</p>
                {setting.description && <p className={cn("text-xs", textMuted)}>{setting.description}</p>}
              </div>
              <button
                role="switch"
                aria-checked={setting.enabled}
                onClick={() => toggle(setting.id)}
                className={cn(
                  "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200",
                  setting.enabled ? "bg-[var(--primary)]" : "bg-[var(--muted)]",
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200",
                    setting.enabled ? "translate-x-5" : "translate-x-0",
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
