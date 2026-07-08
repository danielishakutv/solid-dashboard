import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as Nigerian Naira. */
export function formatNaira(value: number, opts: { compact?: boolean } = {}) {
  if (opts.compact) {
    return `₦${compactNumber(value)}`;
  }
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(value);
}

/** Compact large numbers: 1200000 -> 1.2M */
export function compactNumber(value: number) {
  if (Math.abs(value) >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`;
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (Math.abs(value) >= 1_000) return `${(value / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${value}`;
}

export function formatNumber(value: number) {
  return new Intl.NumberFormat("en-NG").format(value);
}

export function formatPercent(value: number, digits = 0) {
  return `${value.toFixed(digits)}%`;
}

/** Deterministic pseudo-random generator for stable demo data (no Math.random flicker). */
export function seeded(seed: number) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

/** Stable avatar background from a name. */
export function avatarColor(name: string) {
  const palette = [
    "bg-primary/15 text-primary",
    "bg-accent/15 text-accent",
    "bg-info/15 text-info",
    "bg-warning/15 text-warning",
    "bg-success/15 text-success",
    "bg-danger/15 text-danger",
  ];
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return palette[Math.abs(hash) % palette.length];
}

export function daysBetween(a: Date | string, b: Date | string) {
  const d1 = new Date(a).getTime();
  const d2 = new Date(b).getTime();
  return Math.round((d2 - d1) / (1000 * 60 * 60 * 24));
}

export function pluralize(count: number, singular: string, plural?: string) {
  return count === 1 ? singular : plural ?? `${singular}s`;
}
