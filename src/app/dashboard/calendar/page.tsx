"use client";

import {
  CalendarRange,
  Download,
  CalendarDays,
  CalendarClock,
  Wallet,
  ShieldAlert,
  ListOrdered,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { calendarEvents, type CalendarEvent } from "@/data/procurement";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toneDotClass: Record<CalendarEvent["tone"], string> = {
  info: "bg-info",
  warning: "bg-warning",
  danger: "bg-danger",
  success: "bg-success",
  accent: "bg-accent",
};

// July 2026: 1 Jul is a Wednesday, 31 days.
const DAYS_IN_JULY = 31;
const LEADING_BLANKS = 3; // Sun, Mon, Tue before Wed 1 Jul
const TODAY_DAY = 7;

function buildMonthCells() {
  const total = LEADING_BLANKS + DAYS_IN_JULY;
  const trailing = (7 - (total % 7)) % 7;
  return [
    ...Array.from({ length: LEADING_BLANKS }, () => null),
    ...Array.from({ length: DAYS_IN_JULY }, (_, i) => i + 1),
    ...Array.from({ length: trailing }, () => null),
  ];
}

export default function ProcurementCalendarPage() {
  const eventsThisMonth = calendarEvents.filter((e) => e.date.startsWith("2026-07")).length;
  const bidClosings = calendarEvents.filter((e) => e.type === "Bid Closing").length;
  const paymentsDue = calendarEvents.filter((e) => e.type === "Payment Due").length;
  const apgExpiries = calendarEvents.filter((e) => e.type === "APG Expiry").length;

  const monthCells = buildMonthCells();

  const sortedEvents = [...calendarEvents].sort((a, b) => a.date.localeCompare(b.date));

  const legendTypes: { type: CalendarEvent["type"]; tone: CalendarEvent["tone"] }[] = [];
  calendarEvents.forEach((e) => {
    if (!legendTypes.some((l) => l.type === e.type)) legendTypes.push({ type: e.type, tone: e.tone });
  });

  return (
    <div className="space-y-7">
      <PageHeader
        title="Procurement & Contract Calendar"
        description="Key milestones across the portfolio — bid closings, evaluations, awards, APG validity and payment due dates"
        icon={<CalendarRange className="h-6 w-6" />}
        actions={
          <Button variant="outline" size="md">
            <Download className="h-4 w-4" />
            Export
          </Button>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Events this month"
          value={eventsThisMonth}
          icon={<CalendarDays className="h-5 w-5" />}
          tone="primary"
          hint="Scheduled in July 2026"
        />
        <StatCard
          label="Bid closings"
          value={bidClosings}
          icon={<CalendarClock className="h-5 w-5" />}
          tone="info"
          hint="Across the pipeline"
        />
        <StatCard
          label="Payments due"
          value={paymentsDue}
          icon={<Wallet className="h-5 w-5" />}
          tone="warning"
          hint="Contract & milestone payments"
        />
        <StatCard
          label="APG expiries"
          value={apgExpiries}
          icon={<ShieldAlert className="h-5 w-5" />}
          tone="danger"
          hint="Advance payment guarantees"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        {/* Month grid */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="July 2026"
            description="Milestone events by day — click through the table below for details"
            icon={<CalendarRange className="h-5 w-5" />}
          />
          <CardContent>
            <div className="overflow-x-auto">
              <div className="min-w-[560px]">
                <div className="mb-1 grid grid-cols-7 gap-1">
                  {WEEKDAYS.map((w) => (
                    <div
                      key={w}
                      className="px-1 py-1.5 text-center text-xs font-bold uppercase tracking-wide text-muted-foreground"
                    >
                      {w}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {monthCells.map((day, i) => {
                    if (day === null) {
                      return <div key={`blank-${i}`} className="min-h-[76px] rounded-lg" />;
                    }
                    const dateStr = `2026-07-${String(day).padStart(2, "0")}`;
                    const dayEvents = calendarEvents.filter((e) => e.date === dateStr);
                    const isToday = day === TODAY_DAY;
                    return (
                      <div
                        key={dateStr}
                        className={cn(
                          "min-h-[76px] rounded-lg border p-2",
                          isToday ? "border-primary/40 ring-2 ring-primary" : "border-border",
                        )}
                      >
                        <p
                          className={cn(
                            "text-xs font-bold",
                            isToday ? "text-primary" : "text-foreground",
                          )}
                        >
                          {day}
                        </p>
                        <div className="mt-1 space-y-0.5">
                          {dayEvents.slice(0, 2).map((e) => (
                            <div key={e.id} className="flex items-center gap-1">
                              <span
                                className={cn("h-1.5 w-1.5 shrink-0 rounded-full", toneDotClass[e.tone])}
                              />
                              <span className="truncate text-[10px] text-muted-foreground" title={e.title}>
                                {e.title}
                              </span>
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <p className="text-[10px] font-semibold text-muted-foreground">
                              +{dayEvents.length - 2} more
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-4">
              {legendTypes.map((l) => (
                <span
                  key={l.type}
                  className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                >
                  <span className={cn("h-2.5 w-2.5 rounded-full", toneDotClass[l.tone])} />
                  {l.type}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming timeline */}
        <Card>
          <CardHeader
            title="Upcoming timeline"
            description="All events, chronologically"
            icon={<ListOrdered className="h-5 w-5" />}
          />
          <CardContent className="max-h-[620px] space-y-2.5 overflow-y-auto">
            {sortedEvents.map((e, i) => {
              const prev = sortedEvents[i - 1];
              const isNewGroup = i !== 0 && prev && prev.date !== e.date;
              return (
                <div
                  key={e.id}
                  className={cn(
                    "flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-surface-2",
                    isNewGroup && "mt-3.5",
                  )}
                >
                  <div className="flex h-11 w-11 shrink-0 flex-col items-center justify-center rounded-lg bg-surface-2 text-center">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      {new Date(e.date).toLocaleDateString("en-NG", { month: "short" })}
                    </span>
                    <span className="font-display text-sm font-extrabold text-foreground">
                      {new Date(e.date).getDate()}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{e.title}</p>
                    <p className="text-xs text-muted-foreground">{e.ref}</p>
                  </div>
                  <Badge tone={e.tone}>{e.type}</Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
