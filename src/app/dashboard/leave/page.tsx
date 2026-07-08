"use client";

import { useState } from "react";
import {
  PlaneTakeoff,
  Download,
  Plus,
  CalendarClock,
  ClipboardCheck,
  CalendarCheck,
  Wallet,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs } from "@/components/ui/tabs";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { DetailRow } from "@/components/ui/misc";
import { DonutChart, BarSeries } from "@/components/charts";
import {
  leaveRecords,
  leaveTypeDistribution,
  leaveForecast,
  leaveKpis,
  type LeaveRecord,
  type LeaveType,
} from "@/data/leave";
import { staff } from "@/data/staff";

const typeTone: Record<LeaveType, "primary" | "danger" | "info" | "accent" | "warning"> = {
  Annual: "primary",
  Sick: "danger",
  Casual: "info",
  Training: "accent",
  "Official Assignment": "info",
  Maternity: "warning",
};

const statusTabs = ["Ongoing", "Approved", "Pending", "Completed"] as const;

export default function LeavePage() {
  const k = leaveKpis();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<(typeof leaveRecords)[number] | null>(null);

  const typeData = leaveTypeDistribution.filter((d) => d.value > 0);
  const totalTypeDays = typeData.reduce((sum, d) => sum + d.value, 0);

  const tabs = [
    { value: "all", label: "All", count: leaveRecords.length },
    ...statusTabs.map((s) => ({
      value: s,
      label: s,
      count: leaveRecords.filter((r) => r.status === s).length,
    })),
  ];

  const filteredRecords =
    statusFilter === "all" ? leaveRecords : leaveRecords.filter((r) => r.status === statusFilter);

  const columns: Column<LeaveRecord>[] = [
    {
      key: "name",
      header: "Staff",
      render: (row) => (
        <div className="flex min-w-0 items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{row.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (row) => <Badge tone={typeTone[row.type]}>{row.type}</Badge>,
    },
    {
      key: "period",
      header: "Period",
      render: (row) => (
        <span className="whitespace-nowrap text-sm text-muted-foreground">
          {row.startDate} → {row.endDate}
        </span>
      ),
      hideOnMobile: true,
    },
    {
      key: "days",
      header: "Days",
      align: "right",
      accessor: (row) => row.days,
      sortable: true,
    },
    {
      key: "reliever",
      header: "Reliever",
      render: (row) => <span className="text-sm text-muted-foreground">{row.reliever ?? "—"}</span>,
      hideOnMobile: true,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Leave Planner"
        description="Track staff leave, approvals and staffing continuity across the project team."
        icon={<PlaneTakeoff className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" />
              Request leave
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="On leave now"
          value={k.onLeaveNow}
          icon={<CalendarClock className="h-5 w-5" />}
          tone="warning"
          hint="Currently away from duty"
        />
        <StatCard
          label="Pending approvals"
          value={k.pending}
          icon={<ClipboardCheck className="h-5 w-5" />}
          tone="info"
          hint="Awaiting sign-off"
        />
        <StatCard
          label="Upcoming approved"
          value={k.upcoming}
          icon={<CalendarCheck className="h-5 w-5" />}
          tone="accent"
          hint="Scheduled ahead"
        />
        <StatCard
          label="Avg annual balance"
          value={`${k.avgBalance} days`}
          icon={<Wallet className="h-5 w-5" />}
          tone="success"
          hint="Per staff member"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Leave by type" description="Days taken across leave categories" />
          <CardContent>
            <DonutChart
              data={typeData}
              height={240}
              valueFormatter={(v) => `${v} days`}
              centerLabel="Days"
              centerValue={String(totalTypeDays)}
            />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {typeData.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2 text-sm"
                >
                  <Badge tone={typeTone[d.name as LeaveType] ?? "neutral"} dot>
                    {d.name}
                  </Badge>
                  <span className="font-display font-extrabold text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="6-week continuity forecast"
            description="Projected absences across the coming weeks"
          />
          <CardContent>
            <BarSeries
              data={leaveForecast}
              xKey="week"
              height={260}
              stacked
              series={[
                { key: "onLeave", name: "On leave", colorIndex: 2 },
                { key: "assignment", name: "Assignment", colorIndex: 1 },
                { key: "training", name: "Training", colorIndex: 3 },
              ]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Leave register */}
      <Card>
        <CardHeader title="Leave register" description="All recorded leave and assignment periods" />
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredRecords}
            searchKeys={["name", "type", "status"]}
            searchPlaceholder="Search staff, type or status…"
            pageSize={8}
            onRowClick={(row) => setSelected(row)}
            toolbar={
              <Tabs tabs={tabs} value={statusFilter} onChange={setStatusFilter} />
            }
          />
        </CardContent>
      </Card>

      {/* Annual leave balances */}
      <Card>
        <CardHeader title="Annual leave balances" description="Days remaining against each staff member's entitlement" />
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {staff.map((s) => {
              const pct = Math.round((s.leave.annualUsed / s.leave.annual) * 100);
              const daysLeft = s.leave.annual - s.leave.annualUsed;
              return (
                <div key={s.id} className="rounded-xl border border-border bg-surface-2/40 p-3.5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Avatar name={s.name} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{s.name}</p>
                        <p className="truncate text-xs text-muted-foreground">{s.role}</p>
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-muted-foreground">{pct}%</span>
                  </div>
                  <Progress value={pct} tone={pct > 70 ? "warning" : "primary"} size="sm" />
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {daysLeft} of {s.leave.annual} days left
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Record detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        description={selected?.role}
        footer={
          <Button variant="outline" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected && (
          <div className="divide-y divide-border">
            <DetailRow label="Staff">{selected.name}</DetailRow>
            <DetailRow label="Role">{selected.role}</DetailRow>
            <DetailRow label="Type">
              <Badge tone={typeTone[selected.type]}>{selected.type}</Badge>
            </DetailRow>
            <DetailRow label="Period">
              {selected.startDate} → {selected.endDate}
            </DetailRow>
            <DetailRow label="Days">{selected.days}</DetailRow>
            <DetailRow label="Reliever">{selected.reliever ?? "—"}</DetailRow>
            <DetailRow label="Status">
              <StatusBadge status={selected.status} />
            </DetailRow>
          </div>
        )}
      </Drawer>
    </div>
  );
}
