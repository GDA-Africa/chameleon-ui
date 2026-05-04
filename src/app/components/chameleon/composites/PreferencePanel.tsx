import React, { useState } from "react";
import { Save } from "lucide-react";
import { cn } from "../utils";
import { Button } from "../atoms";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useThemeClasses } from "../context";
import type { PreferencePanelProps, Preference } from "./types";

const DEFAULT_PREFERENCES: Preference[] = [
  { id: "language", label: "Language", description: "Interface language", value: "en", options: [{ label: "English", value: "en" }, { label: "Spanish", value: "es" }, { label: "French", value: "fr" }] },
  { id: "timezone", label: "Timezone", description: "Your local timezone", value: "utc", options: [{ label: "UTC", value: "utc" }, { label: "EST (UTC-5)", value: "est" }, { label: "PST (UTC-8)", value: "pst" }] },
  { id: "dateformat", label: "Date Format", description: "How dates are displayed", value: "mm/dd/yyyy", options: [{ label: "MM/DD/YYYY", value: "mm/dd/yyyy" }, { label: "DD/MM/YYYY", value: "dd/mm/yyyy" }, { label: "YYYY-MM-DD", value: "yyyy-mm-dd" }] },
];

export const PreferencePanel: React.FC<PreferencePanelProps> = ({
  heading = "Preferences",
  preferences: initialPrefs = DEFAULT_PREFERENCES,
  onSave,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [prefs, setPrefs] = useState<Preference[]>(initialPrefs);

  const updatePref = (id: string, value: string) => {
    setPrefs((p) => p.map((pref) => (pref.id === id ? { ...pref, value } : pref)));
  };

  return (
    <Card animated={animated} className={cn(className)}>
      {heading && (
        <CardHeader>
          <CardTitle>{heading}</CardTitle>
        </CardHeader>
      )}
      <CardContent className="space-y-4">
        {prefs.map((pref) => (
          <div key={pref.id} className="flex items-center justify-between gap-4 py-2">
            <div>
              <p className={cn("text-sm font-medium", textPrimary)}>{pref.label}</p>
              {pref.description && <p className={cn("text-xs", textMuted)}>{pref.description}</p>}
            </div>
            <select
              value={pref.value}
              onChange={(e) => updatePref(pref.id, e.target.value)}
              className="text-sm rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
            >
              {pref.options.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        ))}
        <div className="flex justify-end pt-2">
          <Button animated={animated} onClick={() => onSave?.(prefs)}>
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
