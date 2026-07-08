"use client";

import { useState } from "react";
import {
  Settings,
  Sun,
  Moon,
  ShieldCheck,
  Bell,
  Building2,
  User,
  LogOut,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { Avatar } from "@/components/ui/avatar";
import { DetailRow } from "@/components/ui/misc";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

interface NotificationPref {
  id: string;
  label: string;
  description: string;
  defaultOn: boolean;
}

const notificationPrefs: NotificationPref[] = [
  {
    id: "attendance",
    label: "Attendance alerts",
    description: "Notify when staff check in late or are absent without notice.",
    defaultOn: true,
  },
  {
    id: "payments",
    label: "Payment & APG reminders",
    description: "Upcoming milestone payments and APG expiry warnings.",
    defaultOn: true,
  },
  {
    id: "actions",
    label: "Meeting action deadlines",
    description: "Reminders as action points approach their due date.",
    defaultOn: true,
  },
  {
    id: "correspondence",
    label: "New correspondence",
    description: "Alert when new incoming correspondence is logged to the registry.",
    defaultOn: false,
  },
  {
    id: "weekly",
    label: "Weekly summary email",
    description: "A digest of key indicators delivered every Monday morning.",
    defaultOn: true,
  },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const [prefs, setPrefs] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(notificationPrefs.map((p) => [p.id, p.defaultOn])),
  );

  const name = user?.name ?? "Guest User";
  const roleLabel = user?.roleLabel ?? "—";
  const email = user?.email ?? "";

  return (
    <div className="space-y-7">
      <PageHeader
        title="Settings"
        description="Manage your account, appearance and preferences"
        icon={<Settings className="h-6 w-6" />}
      />

      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {/* Profile */}
        <Card>
          <CardHeader title="Profile" description="Your personal and contact details" icon={<User className="h-5 w-5" />} />
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={name} size="lg" ring />
              <div>
                <p className="font-display text-base font-bold text-foreground">{name}</p>
                <p className="text-sm text-muted-foreground">{roleLabel}</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" defaultValue={name} />
              </div>
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input id="email" type="email" defaultValue={email} />
              </div>
              <div>
                <Label htmlFor="title">Job title</Label>
                <Input id="title" defaultValue={roleLabel} />
              </div>
              <div>
                <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" placeholder="+234 800 000 0000" />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" placeholder="Project Coordination Unit" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button size="md">Save changes</Button>
          </CardFooter>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader title="Appearance" description="Choose how the dashboard looks on this device" />
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setTheme("light")}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border border-border p-4 text-left transition-all",
                  theme === "light" ? "ring-2 ring-primary" : "hover:bg-surface-2",
                )}
              >
                <span className="flex h-16 w-full items-center justify-center gap-2 rounded-xl border border-border bg-white shadow-soft">
                  <Sun className="h-5 w-5 text-warning" />
                </span>
                <span className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Light</span>
                  {theme === "light" && <span className="text-xs font-bold text-primary">Active</span>}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setTheme("dark")}
                className={cn(
                  "flex flex-col gap-3 rounded-2xl border border-border p-4 text-left transition-all",
                  theme === "dark" ? "ring-2 ring-primary" : "hover:bg-surface-2",
                )}
              >
                <span className="flex h-16 w-full items-center justify-center gap-2 rounded-xl border border-border bg-slate-900 shadow-soft">
                  <Moon className="h-5 w-5 text-info" />
                </span>
                <span className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">Dark</span>
                  {theme === "dark" && <span className="text-xs font-bold text-primary">Active</span>}
                </span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader title="Notifications" description="Choose what you want to be alerted about" icon={<Bell className="h-5 w-5" />} />
          <CardContent className="divide-y divide-border">
            {notificationPrefs.map((p) => (
              <div key={p.id} className="flex items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{p.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{p.description}</p>
                </div>
                <Toggle
                  checked={prefs[p.id]}
                  onChange={(v) => setPrefs((prev) => ({ ...prev, [p.id]: v }))}
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Organization */}
        <Card>
          <CardHeader title="Organization" description="Programme and office details" icon={<Building2 className="h-5 w-5" />} />
          <CardContent className="divide-y divide-border">
            <DetailRow label="Organization">SOLID Project — Adamawa State PCU</DetailRow>
            <DetailRow label="Programme">World Bank supported</DetailRow>
            <DetailRow label="Office">Yola Headquarters</DetailRow>
            <DetailRow label="Timezone">West Africa (WAT)</DetailRow>
          </CardContent>
        </Card>

        {/* Security */}
        <Card>
          <CardHeader title="Security" description="Manage your password and active sessions" icon={<ShieldCheck className="h-5 w-5" />} />
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label htmlFor="new-password">New password</Label>
                <Input id="new-password" type="password" placeholder="••••••••" />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm password</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" />
              </div>
            </div>
            <div className="flex justify-end">
              <Button variant="outline" size="md">
                Change password
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground">Sign out everywhere</p>
              <p className="text-xs text-muted-foreground">End all active sessions on other devices.</p>
            </div>
            <Button variant="danger" size="md" className="w-full shrink-0 sm:w-auto">
              <LogOut className="h-4 w-4" />
              Sign out of all devices
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: (value: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        checked ? "bg-primary" : "bg-surface-2 border border-border",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white shadow-soft transition-transform duration-200",
          checked ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}
