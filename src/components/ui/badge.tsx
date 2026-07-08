import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeTone =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent";

const tones: Record<BadgeTone, string> = {
  neutral: "bg-surface-2 text-muted-foreground ring-border",
  primary: "bg-primary-soft text-primary ring-primary/20",
  success: "bg-success-soft text-success ring-success/20",
  warning: "bg-warning-soft text-warning ring-warning/25",
  danger: "bg-danger-soft text-danger ring-danger/20",
  info: "bg-info-soft text-info ring-info/20",
  accent: "bg-accent/10 text-accent ring-accent/20",
};

export function Badge({
  className,
  tone = "neutral",
  dot,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone; dot?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
        tones[tone],
        className,
      )}
      {...props}
    >
      {dot && <span className="h-1.5 w-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}

/** Map a status label to a tone + optional pulsing dot. */
export function StatusBadge({ status, className }: { status: string; className?: string }) {
  const key = status.toLowerCase();
  const map: Record<string, { tone: BadgeTone; pulse?: boolean }> = {
    // attendance
    present: { tone: "success", pulse: true },
    "on leave": { tone: "warning" },
    leave: { tone: "warning" },
    "official assignment": { tone: "info" },
    remote: { tone: "accent" },
    "sick leave": { tone: "danger" },
    absent: { tone: "danger" },
    // generic
    active: { tone: "success" },
    completed: { tone: "success" },
    approved: { tone: "success" },
    paid: { tone: "success" },
    ongoing: { tone: "info" },
    "in progress": { tone: "info" },
    "in circulation": { tone: "info" },
    pending: { tone: "warning" },
    "in review": { tone: "warning" },
    "awaiting action": { tone: "warning" },
    due: { tone: "warning" },
    overdue: { tone: "danger" },
    rejected: { tone: "danger" },
    critical: { tone: "danger" },
    expired: { tone: "danger" },
    closed: { tone: "neutral" },
    draft: { tone: "neutral" },
    archived: { tone: "neutral" },
    scheduled: { tone: "info" },
    "checked in": { tone: "success", pulse: true },
    "checked out": { tone: "neutral" },
  };
  const conf = map[key] ?? { tone: "neutral" as BadgeTone };
  return (
    <Badge tone={conf.tone} className={className}>
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full bg-current",
          conf.pulse && "animate-pulse-ring",
        )}
      />
      {status}
    </Badge>
  );
}
