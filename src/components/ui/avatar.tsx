import { cn, initials, avatarColor } from "@/lib/utils";

export function Avatar({
  name,
  src,
  size = "md",
  className,
  ring,
}: {
  name: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
  ring?: boolean;
}) {
  const sizes = {
    xs: "h-7 w-7 text-[10px]",
    sm: "h-9 w-9 text-xs",
    md: "h-10 w-10 text-sm",
    lg: "h-14 w-14 text-lg",
  };
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center rounded-full font-bold",
        sizes[size],
        !src && avatarColor(name),
        ring && "ring-2 ring-surface",
        className,
      )}
      title={name}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={name} className="h-full w-full rounded-full object-cover" />
      ) : (
        initials(name)
      )}
    </span>
  );
}

export function AvatarGroup({
  names,
  max = 4,
  size = "sm",
}: {
  names: string[];
  max?: number;
  size?: "xs" | "sm" | "md";
}) {
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  return (
    <div className="flex items-center -space-x-2">
      {shown.map((n) => (
        <Avatar key={n} name={n} size={size} ring />
      ))}
      {rest > 0 && (
        <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-2 text-xs font-bold text-muted-foreground ring-2 ring-surface">
          +{rest}
        </span>
      )}
    </div>
  );
}
