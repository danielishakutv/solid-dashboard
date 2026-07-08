import { cn } from "@/lib/utils";

type Tone = "primary" | "success" | "warning" | "danger" | "info" | "accent";

const toneBar: Record<Tone, string> = {
  primary: "bg-primary",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  accent: "bg-accent",
};

export function Progress({
  value,
  tone = "primary",
  className,
  size = "md",
}: {
  value: number;
  tone?: Tone;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const h = size === "sm" ? "h-1.5" : size === "lg" ? "h-3" : "h-2";
  return (
    <div className={cn("w-full overflow-hidden rounded-full bg-surface-2", h, className)}>
      <div
        className={cn("h-full rounded-full transition-all duration-700 ease-out", toneBar[tone])}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

/** A circular progress ring for headline percentages. */
export function RingProgress({
  value,
  size = 96,
  stroke = 9,
  tone = "primary",
  label,
  sublabel,
}: {
  value: number;
  size?: number;
  stroke?: number;
  tone?: Tone;
  label?: string;
  sublabel?: string;
}) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const offset = circ - (Math.max(0, Math.min(100, value)) / 100) * circ;
  const toneColor: Record<Tone, string> = {
    primary: "stroke-primary",
    success: "stroke-success",
    warning: "stroke-warning",
    danger: "stroke-danger",
    info: "stroke-info",
    accent: "stroke-accent",
  };
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-surface-2"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          className={cn("transition-all duration-1000 ease-out", toneColor[tone])}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="font-display text-xl font-extrabold text-foreground tabular">
          {label ?? `${Math.round(value)}%`}
        </span>
        {sublabel && <span className="text-[10px] font-medium text-muted-foreground">{sublabel}</span>}
      </div>
    </div>
  );
}
