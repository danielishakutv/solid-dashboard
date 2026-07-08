"use client";

import Link from "next/link";
import {
  Clock,
  FileSignature,
  Wallet,
  ClipboardCheck,
  Users,
  FolderOpen,
  ShoppingCart,
  Building2,
  UserCheck,
  Download,
  ArrowRight,
  TrendingUp,
  CalendarDays,
} from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RingProgress, Progress } from "@/components/ui/progress";
import { AreaTrend, DonutChart, BarList } from "@/components/charts";
import { AlertsPanel, ActivityFeed } from "@/components/dashboard/widgets";
import { overviewKpis, healthScore, performanceTrend, pillarPerformance, monthLabel } from "@/data/overview";
import { attendanceSummary } from "@/data/staff";
import { calendarEvents } from "@/data/procurement";
import { formatNaira, compactNumber } from "@/lib/utils";

export default function DashboardPage() {
  const k = overviewKpis();
  const att = attendanceSummary();
  const score = healthScore();
  const monthlyAttendance = performanceTrend[performanceTrend.length - 1].attendance;

  const staffDonut = [
    { name: "Present", value: att.present, colorIndex: 0 },
    { name: "Official Assignment", value: att.assignment, colorIndex: 1 },
    { name: "Remote", value: att.remote, colorIndex: 3 },
    { name: "On Leave", value: att.onLeave, colorIndex: 2 },
    { name: "Sick", value: att.sick, colorIndex: 4 },
  ].filter((d) => d.value > 0);

  const upcoming = calendarEvents.slice(0, 5);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Administrative Overview"
        description={`Monthly performance snapshot · ${monthLabel} · Adamawa State PCU`}
        icon={<TrendingUp className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <CalendarDays className="h-4 w-4" />
              {monthLabel}
            </Button>
            <Link href="/dashboard/reports">
              <Button size="md">
                <Download className="h-4 w-4" />
                Export report
              </Button>
            </Link>
          </>
        }
      />

      {/* Hero KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Attendance rate"
          value={`${monthlyAttendance}%`}
          icon={<Clock className="h-5 w-5" />}
          tone="success"
          delta={4}
          deltaLabel="vs last month"
        />
        <StatCard
          label="Contracts under management"
          value={k.contracts.active}
          icon={<FileSignature className="h-5 w-5" />}
          tone="primary"
          hint={`${formatNaira(k.contracts.totalValue, { compact: true })} portfolio value`}
        />
        <StatCard
          label="Pending payments"
          value={k.contracts.pendingPaymentsCount}
          icon={<Wallet className="h-5 w-5" />}
          tone="warning"
          hint={`${formatNaira(k.contracts.pendingAmount, { compact: true })} outstanding`}
        />
        <StatCard
          label="Action points closed"
          value={`${k.meetings.completionRate}%`}
          icon={<ClipboardCheck className="h-5 w-5" />}
          tone="accent"
          delta={-6}
          deltaLabel={`${k.meetings.overdue} overdue`}
        />
      </div>

      {/* Health + trend */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Performance trend"
            description="Attendance, disbursement & compliance over the last 6 months"
            action={
              <Badge tone="success" dot>
                On track
              </Badge>
            }
          />
          <CardContent>
            <AreaTrend
              data={performanceTrend}
              xKey="month"
              height={280}
              valueFormatter={(v) => `${v}%`}
              series={[
                { key: "attendance", name: "Attendance", colorIndex: 0 },
                { key: "disbursement", name: "Disbursement", colorIndex: 1 },
                { key: "compliance", name: "Compliance", colorIndex: 3 },
              ]}
            />
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                { label: "Attendance", c: 0 },
                { label: "Disbursement", c: 1 },
                { label: "Compliance", c: 3 },
              ].map((l) => (
                <span key={l.label} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <span className={`h-2.5 w-2.5 rounded-[3px] ${["bg-[#0d9488]", "bg-[#2a78d6]", "bg-[#7c3aed]"][l.c === 0 ? 0 : l.c === 1 ? 1 : 2]}`} />
                  {l.label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Admin health score" description="Composite of key indicators" />
          <CardContent className="flex flex-1 flex-col items-center justify-center gap-4">
            <RingProgress value={score} size={150} stroke={13} tone="primary" sublabel="Health index" />
            <div className="grid w-full grid-cols-2 gap-2 text-center">
              <div className="rounded-xl bg-surface-2 p-2.5">
                <p className="font-display text-lg font-extrabold text-success">{monthlyAttendance}%</p>
                <p className="text-[11px] text-muted-foreground">Attendance</p>
              </div>
              <div className="rounded-xl bg-surface-2 p-2.5">
                <p className="font-display text-lg font-extrabold text-primary">{k.contracts.disbursementRate}%</p>
                <p className="text-[11px] text-muted-foreground">Disbursement</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Indicator groups */}
      <div className="grid gap-5 lg:grid-cols-3">
        {/* HR */}
        <Card>
          <CardHeader title="Human resources" icon={<Users className="h-5 w-5" />} />
          <CardContent className="space-y-4">
            <DonutChart
              data={staffDonut}
              height={180}
              centerValue={`${att.available}/${att.total}`}
              centerLabel="Available"
            />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <MiniStat label="Present" value={att.present} tone="text-success" />
              <MiniStat label="Assignment" value={att.assignment} tone="text-info" />
              <MiniStat label="On leave" value={att.onLeave} tone="text-warning" />
              <MiniStat label="Sick" value={att.sick} tone="text-danger" />
            </div>
          </CardContent>
        </Card>

        {/* Registry */}
        <Card>
          <CardHeader title="Registry & correspondence" icon={<FolderOpen className="h-5 w-5" />} />
          <CardContent className="space-y-3.5">
            <IndicatorRow label="Incoming received" value={k.registry.incoming} />
            <IndicatorRow label="Outgoing dispatched" value={k.registry.outgoing} />
            <IndicatorRow label="Files in circulation" value={k.registry.inCirculation} />
            <IndicatorRow label="Awaiting action" value={k.registry.awaiting} tone="warning" />
            <IndicatorRow label="Outstanding file movements" value={k.registry.outstanding} tone="danger" />
            <Link href="/dashboard/registry" className="flex items-center gap-1 pt-1 text-sm font-semibold text-primary hover:underline">
              Open registry <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </CardContent>
        </Card>

        {/* Procurement & contracts */}
        <Card>
          <CardHeader title="Procurement & contracts" icon={<ShoppingCart className="h-5 w-5" />} />
          <CardContent className="space-y-3.5">
            <IndicatorRow label="Active contracts" value={k.contracts.active} />
            <IndicatorRow label="Procurements in pipeline" value={k.procurement.active} />
            <IndicatorRow label="Awaiting No-Objection" value={k.procurement.awaitingNoObjection} tone="warning" />
            <IndicatorRow label="Milestone payments due" value={k.contracts.pendingPaymentsCount} tone="warning" />
            <IndicatorRow label="APG expiring soon" value={k.contracts.apgExpiringSoon} tone="danger" />
            <div className="pt-1">
              <div className="mb-1 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Disbursement progress</span>
                <span className="font-bold text-foreground">{k.contracts.disbursementRate}%</span>
              </div>
              <Progress value={k.contracts.disbursementRate} tone="primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pillars + alerts */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Administrative pillar performance"
            description="Balanced scorecard across the improvement plan"
          />
          <CardContent>
            <BarList
              items={pillarPerformance.map((p, i) => ({ label: p.pillar, value: p.score, colorIndex: i }))}
              valueFormatter={(v) => `${v}%`}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Priority alerts"
            action={<Badge tone="danger">{4}</Badge>}
          />
          <CardContent>
            <AlertsPanel limit={4} />
          </CardContent>
        </Card>
      </div>

      {/* Activity + upcoming */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Recent activity"
            action={
              <Link href="/dashboard/meetings" className="text-sm font-semibold text-primary hover:underline">
                View all
              </Link>
            }
          />
          <CardContent>
            <ActivityFeed limit={6} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Upcoming milestones" icon={<CalendarDays className="h-5 w-5" />} />
          <CardContent className="space-y-3">
            {upcoming.map((e) => (
              <Link
                key={e.id}
                href="/dashboard/calendar"
                className="flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:bg-surface-2"
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
                <Badge tone={e.tone === "danger" ? "danger" : e.tone === "warning" ? "warning" : "info"}>
                  {e.type}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function MiniStat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-display font-extrabold ${tone}`}>{value}</span>
    </div>
  );
}

function IndicatorRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone?: "warning" | "danger";
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`font-display text-lg font-extrabold tabular ${
          tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-foreground"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
