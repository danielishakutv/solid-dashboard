/**
 * Chart color tokens. The categorical set is the CVD-validated ordering from the
 * data-viz reference palette (worst adjacent ΔE 24.2 light / 10.3 dark).
 * Assign categorical hues in fixed order, never cycled.
 */

export const chartCategorical = [
  { light: "#0d9488", dark: "#2dd4bf", name: "teal" }, // brand-forward lead
  { light: "#2a78d6", dark: "#3987e5", name: "blue" },
  { light: "#eda100", dark: "#e0ac2b", name: "amber" },
  { light: "#7c3aed", dark: "#a78bfa", name: "violet" },
  { light: "#e34948", dark: "#e66767", name: "red" },
  { light: "#e87ba4", dark: "#d55181", name: "magenta" },
  { light: "#eb6834", dark: "#f0854f", name: "orange" },
  { light: "#008300", dark: "#3fae3f", name: "green" },
];

export const chartStatus = {
  good: "#0ca30c",
  warning: "#f59e0b",
  serious: "#ec835a",
  critical: "#d03b3b",
};

/** Single-hue brand sequential (emerald→teal) for headline single-series charts. */
export const brandSequential = {
  light: "#0d9488",
  lightSoft: "#5eead4",
  dark: "#2dd4bf",
  darkSoft: "#0f766e",
};

export function categorical(index: number, mode: "light" | "dark" = "light") {
  const slot = chartCategorical[index % chartCategorical.length];
  return slot[mode];
}

/** Recharts axis / grid chrome that respects the current theme via CSS vars. */
export const axisProps = {
  stroke: "hsl(var(--muted-foreground))",
  tick: { fill: "hsl(var(--muted-foreground))", fontSize: 12 },
  tickLine: false,
  axisLine: false,
};

export const gridStroke = "hsl(var(--border) / 0.7)";
