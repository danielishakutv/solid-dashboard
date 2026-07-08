import { cn } from "@/lib/utils";

export function LogoMark({ className, id = "logo" }: { className?: string; id?: string }) {
  const topId = `${id}-top`;
  const leftId = `${id}-left`;
  const rightId = `${id}-right`;
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      className={cn("h-9 w-9", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={topId} x1="8" y1="6" x2="40" y2="20" gradientUnits="userSpaceOnUse">
          <stop stopColor="#34d399" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
        <linearGradient id={leftId} x1="8" y1="14" x2="24" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d9488" />
          <stop offset="1" stopColor="#0f766e" />
        </linearGradient>
        <linearGradient id={rightId} x1="24" y1="18" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop stopColor="#14b8a6" />
          <stop offset="1" stopColor="#0891b2" />
        </linearGradient>
      </defs>
      {/* Isometric cube — three faces */}
      <path d="M24 4 6 13.5 24 23 42 13.5 24 4Z" fill={`url(#${topId})`} />
      <path d="M6 13.5 24 23v20L6 33.5v-20Z" fill={`url(#${leftId})`} />
      <path d="M42 13.5 24 23v20l18-9.5v-20Z" fill={`url(#${rightId})`} />
      {/* Inner highlight seam */}
      <path d="M24 23v20" stroke="white" strokeOpacity="0.25" strokeWidth="1" />
      <path d="M6 13.5 24 23l18-9.5" stroke="white" strokeOpacity="0.35" strokeWidth="1" />
    </svg>
  );
}

export function Logo({
  className,
  showText = true,
  subtitle = true,
  textClassName,
}: {
  className?: string;
  showText?: boolean;
  subtitle?: boolean;
  textClassName?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark />
      {showText && (
        <span className="flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-lg font-extrabold tracking-tight text-foreground",
              textClassName,
            )}
          >
            SOLID
          </span>
          {subtitle && (
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Adamawa PCU
            </span>
          )}
        </span>
      )}
    </span>
  );
}
