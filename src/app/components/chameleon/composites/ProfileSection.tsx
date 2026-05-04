import React, { useState } from "react";
import { User, Mail, Save } from "lucide-react";
import { cn } from "../utils";
import { Button, Input } from "../atoms";
import { Card, CardContent, CardHeader, CardTitle } from "../molecules";
import { useThemeClasses } from "../context";
import type { ProfileSectionProps, UserProfile } from "./types";

const DEFAULT_USER: UserProfile = { name: "Jane Smith", email: "jane@example.com", role: "Administrator" };

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  user = DEFAULT_USER,
  onSave,
  editable = true,
  isLoading = false,
  animated = true,
  className,
}) => {
  const { textPrimary, textMuted } = useThemeClasses();
  const [form, setForm] = useState<UserProfile>(user);

  const handleChange = (field: keyof UserProfile) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const initials = form.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card animated={animated} className={cn(className)}>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <p className={cn("text-sm", textMuted)}>Manage your personal information</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-[var(--primary)] flex items-center justify-center text-[var(--primary-foreground)] text-xl font-bold">
            {form.avatar ? <img src={form.avatar} alt={form.name} className="w-full h-full rounded-full object-cover" /> : initials}
          </div>
          <div>
            <p className={cn("font-semibold", textPrimary)}>{form.name}</p>
            <p className={cn("text-sm", textMuted)}>{form.role}</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className={cn("text-sm font-medium", textPrimary)}>Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input className="pl-10" value={form.name} onChange={handleChange("name")} disabled={!editable} />
            </div>
          </div>
          <div className="space-y-2">
            <label className={cn("text-sm font-medium", textPrimary)}>Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted-foreground)]" />
              <Input type="email" className="pl-10" value={form.email} onChange={handleChange("email")} disabled={!editable} />
            </div>
          </div>
          {form.bio !== undefined && (
            <div className="space-y-2 sm:col-span-2">
              <label className={cn("text-sm font-medium", textPrimary)}>Bio</label>
              <textarea
                className="w-full min-h-[80px] px-3 py-2 text-sm rounded-lg border border-[var(--border)] bg-[var(--card)] text-[var(--card-foreground)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--ring)]"
                value={form.bio}
                onChange={handleChange("bio")}
                disabled={!editable}
              />
            </div>
          )}
        </div>

        {editable && (
          <div className="flex justify-end">
            <Button animated={animated} onClick={() => onSave?.(form)} disabled={isLoading}>
              <Save className="w-4 h-4 mr-2" />
              {isLoading ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
