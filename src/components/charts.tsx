"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@/lib/theme";
import { chartCategorical, gridStroke } from "@/lib/chart-theme";
import { cn } from "@/lib/utils";

function useMode() {
  const { theme } = useTheme();
  return theme === "dark" ? "dark" : "light";
}

const axisTick = { fontSize: 12, fill: "hsl(var(--muted-foreground))" };

/** Shared tooltip that matches the app surfaces. */
function ChartTooltip({
  active,
  payload,
  label,
  formatter,
  labelFormatter,
}: {
  active?: boolean;
  payload?: any[];
  label?: string;
  formatter?: (value: number, name: string) => string;
  labelFormatter?: (label: string) => string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-surface/95 px-3 py-2.5 shadow-lift backdrop-blur">
      {label != null && (
        <p className="mb-1.5 text-xs font-bold text-foreground">
          {labelFormatter ? labelFormatter(label) : label}
        </p>
      )}
      <div className="space-y-1">
        {payload.map((entry, i) => (
          <div key={i} className="flex items-center justify-between gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-muted-foreground">
              <span
                className="h-2.5 w-2.5 rounded-[3px]"
                style={{ background: entry.color || entry.fill }}
              />
              {entry.name}
            </span>
            <span className="font-bold tabular text-foreground">
              {formatter ? formatter(entry.value, entry.name) : entry.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChartFrame({
  title,
  description,
  action,
  children,
  className,
  legend,
}: {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  legend?: { label: string; color: string }[];
}) {
  return (
    <div className={cn("rounded-2xl border border-border bg-surface p-5 shadow-card", className)}>
      {(title || action) && (
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            {title && <h3 className="font-display text-base font-bold text-foreground">{title}</h3>}
            {description && <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>}
          </div>
          {action}
        </div>
      )}
      {legend && (
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {legend.map((l) => (
            <span key={l.label} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
              <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: l.color }} />
              {l.label}
            </span>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}

/* ------------------------------- Area trend ------------------------------- */
export function AreaTrend({
  data,
  xKey,
  series,
  height = 260,
  valueFormatter,
  labelFormatter,
}: {
  data: any[];
  xKey: string;
  series: { key: string; name: string; colorIndex?: number }[];
  height?: number;
  valueFormatter?: (v: number, name: string) => string;
  labelFormatter?: (l: string) => string;
}) {
  const mode = useMode();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
        <defs>
          {series.map((s, i) => {
            const color = chartCategorical[s.colorIndex ?? i][mode];
            return (
              <linearGradient key={s.key} id={`grad-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.32} />
                <stop offset="100%" stopColor={color} stopOpacity={0.02} />
              </linearGradient>
            );
          })}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey={xKey} tick={axisTick} tickLine={false} axisLine={false} dy={6} />
        <YAxis tick={axisTick} tickLine={false} axisLine={false} width={48} />
        <Tooltip
          content={<ChartTooltip formatter={valueFormatter} labelFormatter={labelFormatter} />}
          cursor={{ stroke: "hsl(var(--border))", strokeWidth: 1 }}
        />
        {series.map((s, i) => {
          const color = chartCategorical[s.colorIndex ?? i][mode];
          return (
            <Area
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name}
              stroke={color}
              strokeWidth={2.4}
              fill={`url(#grad-${s.key})`}
              dot={false}
              activeDot={{ r: 4, strokeWidth: 2, stroke: "hsl(var(--surface))" }}
            />
          );
        })}
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ------------------------------ Bar (grouped) ----------------------------- */
export function BarSeries({
  data,
  xKey,
  series,
  height = 260,
  stacked,
  valueFormatter,
  horizontal,
}: {
  data: any[];
  xKey: string;
  series: { key: string; name: string; colorIndex?: number }[];
  height?: number;
  stacked?: boolean;
  valueFormatter?: (v: number, name: string) => string;
  horizontal?: boolean;
}) {
  const mode = useMode();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart
        data={data}
        layout={horizontal ? "vertical" : "horizontal"}
        margin={{ top: 6, right: 8, left: horizontal ? 8 : 0, bottom: 0 }}
        barGap={4}
        barCategoryGap={horizontal ? "22%" : "28%"}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={horizontal} horizontal={!horizontal} />
        {horizontal ? (
          <>
            <XAxis type="number" tick={axisTick} tickLine={false} axisLine={false} />
            <YAxis type="category" dataKey={xKey} tick={axisTick} tickLine={false} axisLine={false} width={110} />
          </>
        ) : (
          <>
            <XAxis dataKey={xKey} tick={axisTick} tickLine={false} axisLine={false} dy={6} />
            <YAxis tick={axisTick} tickLine={false} axisLine={false} width={48} />
          </>
        )}
        <Tooltip
          content={<ChartTooltip formatter={valueFormatter} />}
          cursor={{ fill: "hsl(var(--muted) / 0.5)" }}
        />
        {series.map((s, i) => (
          <Bar
            key={s.key}
            dataKey={s.key}
            name={s.name}
            stackId={stacked ? "a" : undefined}
            fill={chartCategorical[s.colorIndex ?? i][mode]}
            radius={stacked ? [0, 0, 0, 0] : horizontal ? [0, 6, 6, 0] : [6, 6, 0, 0]}
            maxBarSize={horizontal ? 22 : 46}
          />
        ))}
      </BarChart>
    </ResponsiveContainer>
  );
}

/* --------------------------------- Line ----------------------------------- */
export function LineSeries({
  data,
  xKey,
  series,
  height = 260,
  valueFormatter,
}: {
  data: any[];
  xKey: string;
  series: { key: string; name: string; colorIndex?: number }[];
  height?: number;
  valueFormatter?: (v: number, name: string) => string;
}) {
  const mode = useMode();
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 6, right: 8, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
        <XAxis dataKey={xKey} tick={axisTick} tickLine={false} axisLine={false} dy={6} />
        <YAxis tick={axisTick} tickLine={false} axisLine={false} width={48} />
        <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
        {series.map((s, i) => (
          <Line
            key={s.key}
            type="monotone"
            dataKey={s.key}
            name={s.name}
            stroke={chartCategorical[s.colorIndex ?? i][mode]}
            strokeWidth={2.4}
            dot={false}
            activeDot={{ r: 4 }}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

/* --------------------------------- Donut ---------------------------------- */
export function DonutChart({
  data,
  height = 240,
  valueFormatter,
  centerLabel,
  centerValue,
}: {
  data: { name: string; value: number; colorIndex?: number }[];
  height?: number;
  valueFormatter?: (v: number, name: string) => string;
  centerLabel?: string;
  centerValue?: string;
}) {
  const mode = useMode();
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius="62%"
            outerRadius="92%"
            paddingAngle={2}
            stroke="hsl(var(--surface))"
            strokeWidth={3}
          >
            {data.map((d, i) => (
              <Cell key={i} fill={chartCategorical[d.colorIndex ?? i][mode]} />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltip formatter={valueFormatter} />} />
        </PieChart>
      </ResponsiveContainer>
      {(centerLabel || centerValue) && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          {centerValue && (
            <span className="font-display text-2xl font-extrabold text-foreground tabular">
              {centerValue}
            </span>
          )}
          {centerLabel && <span className="text-xs text-muted-foreground">{centerLabel}</span>}
        </div>
      )}
    </div>
  );
}

/* ------------------------------- Sparkline -------------------------------- */
export function Sparkline({
  data,
  dataKey = "value",
  colorIndex = 0,
  height = 44,
}: {
  data: any[];
  dataKey?: string;
  colorIndex?: number;
  height?: number;
}) {
  const mode = useMode();
  const color = chartCategorical[colorIndex][mode];
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id={`spark-${colorIndex}-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.28} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          fill={`url(#spark-${colorIndex}-${dataKey})`}
          dot={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* --------------------------- Horizontal bar list -------------------------- */
export function BarList({
  items,
  valueFormatter,
}: {
  items: { label: string; value: number; colorIndex?: number }[];
  valueFormatter?: (v: number) => string;
}) {
  const mode = useMode();
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const color = chartCategorical[item.colorIndex ?? i][mode];
        return (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-foreground">{item.label}</span>
              <span className="font-bold tabular text-muted-foreground">
                {valueFormatter ? valueFormatter(item.value) : item.value.toLocaleString()}
              </span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${(item.value / max) * 100}%`, background: color }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
