import * as React from "react";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "success" | "warning" | "danger" | "info" | "accent";

const toneStyles: Record<Tone, { icon: string; accent: string }> = {
  primary: { icon: "bg-primary-soft text-primary", accent: "from-primary/10" },
  success: { icon: "bg-success-soft text-success", accent: "from-success/10" },
  warning: { icon: "bg-warning-soft text-warning", accent: "from-warning/10" },
  danger: { icon: "bg-danger-soft text-danger", accent: "from-danger/10" },
  info: { icon: "bg-info-soft text-info", accent: "from-info/10" },
  accent: { icon: "bg-accent/10 text-accent", accent: "from-accent/10" },
};

export function StatCard({
  label,
  value,
  icon,
  tone = "primary",
  delta,
  deltaLabel,
  hint,
  footer,
  className,
}: {
  label: string;
  value: React.ReactNode;
  icon?: React.ReactNode;
  tone?: Tone;
  /** signed percentage change, e.g. 4.2 or -1.8 */
  delta?: number;
  deltaLabel?: string;
  hint?: string;
  footer?: React.ReactNode;
  className?: string;
}) {
  const styles = toneStyles[tone];
  const positive = (delta ?? 0) > 0;
  const negative = (delta ?? 0) < 0;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lift",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br to-transparent opacity-70 blur-2xl",
          styles.accent,
        )}
      />
      <div className="relative flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground tabular">
            {value}
          </p>
        </div>
        {icon && (
          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl",
              styles.icon,
            )}
          >
            {icon}
          </span>
        )}
      </div>

      {(typeof delta === "number" || hint) && (
        <div className="relative mt-4 flex items-center gap-2">
          {typeof delta === "number" && (
            <span
              className={cn(
                "inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-bold",
                positive && "bg-success-soft text-success",
                negative && "bg-danger-soft text-danger",
                !positive && !negative && "bg-surface-2 text-muted-foreground",
              )}
            >
              {positive ? (
                <ArrowUpRight className="h-3.5 w-3.5" />
              ) : negative ? (
                <ArrowDownRight className="h-3.5 w-3.5" />
              ) : (
                <Minus className="h-3.5 w-3.5" />
              )}
              {Math.abs(delta)}%
            </span>
          )}
          {(deltaLabel || hint) && (
            <span className="truncate text-xs text-muted-foreground">{deltaLabel ?? hint}</span>
          )}
        </div>
      )}

      {footer && <div className="relative mt-4">{footer}</div>}
    </div>
  );
}
