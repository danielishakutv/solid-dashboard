"use client";

import { Clock, FileSignature, Users, TrendingUp } from "lucide-react";
import { AreaTrend, DonutChart } from "@/components/charts";
import { performanceTrend } from "@/data/overview";

const miniStats = [
  { label: "Attendance", value: "94%", icon: Clock, tone: "text-success bg-success-soft" },
  { label: "Contracts", value: "10", icon: FileSignature, tone: "text-primary bg-primary-soft" },
  { label: "Staff", value: "18", icon: Users, tone: "text-info bg-info-soft" },
];

const donut = [
  { name: "Present", value: 13, colorIndex: 0 },
  { name: "Assignment", value: 3, colorIndex: 1 },
  { name: "Leave", value: 2, colorIndex: 2 },
];

export function HeroPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-cyan-400/10 to-accent/20 blur-2xl" />
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-lift">
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-surface-2/60 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-danger/60" />
          <span className="h-3 w-3 rounded-full bg-warning/60" />
          <span className="h-3 w-3 rounded-full bg-success/60" />
          <div className="ml-3 hidden flex-1 rounded-md bg-surface px-3 py-1 text-center text-[11px] text-muted-foreground sm:block">
            solid.ad.gov.ng/dashboard
          </div>
        </div>

        <div className="space-y-4 p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-display text-sm font-bold text-foreground">Administrative Overview</p>
              <p className="text-xs text-muted-foreground">July 2026 · Adamawa PCU</p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-success-soft px-2 py-1 text-[11px] font-bold text-success">
              <TrendingUp className="h-3 w-3" /> On track
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {miniStats.map((s) => (
              <div key={s.label} className="rounded-xl border border-border bg-surface p-3">
                <span className={`inline-flex h-8 w-8 items-center justify-center rounded-lg ${s.tone}`}>
                  <s.icon className="h-4 w-4" />
                </span>
                <p className="mt-2 font-display text-xl font-extrabold text-foreground tabular">{s.value}</p>
                <p className="text-[11px] text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
            <div className="rounded-xl border border-border bg-surface p-3 sm:col-span-3">
              <p className="mb-1 text-xs font-bold text-foreground">Performance trend</p>
              <AreaTrend
                data={performanceTrend}
                xKey="month"
                height={140}
                series={[
                  { key: "attendance", name: "Attendance", colorIndex: 0 },
                  { key: "compliance", name: "Compliance", colorIndex: 1 },
                ]}
              />
            </div>
            <div className="rounded-xl border border-border bg-surface p-3 sm:col-span-2">
              <p className="mb-1 text-xs font-bold text-foreground">Staff today</p>
              <DonutChart data={donut} height={140} centerValue="18" centerLabel="Total" />
            </div>
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -bottom-5 -left-4 hidden animate-fade-in rounded-2xl border border-border bg-surface p-3 shadow-lift sm:flex sm:items-center sm:gap-3 animate-delay-300">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-success-soft text-success">
          <Clock className="h-5 w-5" />
        </span>
        <div>
          <p className="text-xs font-bold text-foreground">16 checked in</p>
          <p className="text-[11px] text-muted-foreground">Avg 7:48 AM today</p>
        </div>
      </div>
    </div>
  );
}
