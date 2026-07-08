"use client";

import { useState } from "react";
import {
  ClipboardCheck,
  Download,
  Plus,
  CheckCircle2,
  AlertTriangle,
  Hourglass,
  CalendarDays,
  Users,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs } from "@/components/ui/tabs";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { DetailRow } from "@/components/ui/misc";
import { DonutChart, BarSeries } from "@/components/charts";
import { meetings, actionPoints, meetingKpis, type ActionPoint, type ActionStatus } from "@/data/meetings";

const statusTabs: ActionStatus[] = ["Pending", "Ongoing", "Completed", "Overdue"];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-NG", { day: "numeric", month: "short", year: "numeric" });
}

export default function MeetingsPage() {
  const k = meetingKpis();
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selected, setSelected] = useState<(typeof actionPoints)[number] | null>(null);

  const meetingChartData = meetings.map((m, i) => ({
    label: `M${i + 1}`,
    title: m.title,
    actionsRaised: m.actionsRaised,
    actionsClosed: m.actionsClosed,
  }));

  const statusData = [
    { name: "Completed", value: k.completed, colorIndex: 0 },
    { name: "Ongoing", value: k.ongoing, colorIndex: 1 },
    { name: "Pending", value: k.pending, colorIndex: 2 },
    { name: "Overdue", value: k.overdue, colorIndex: 4 },
  ].filter((d) => d.value > 0);

  const tabs = [
    { value: "all", label: "All", count: actionPoints.length },
    ...statusTabs.map((s) => ({
      value: s,
      label: s,
      count: actionPoints.filter((a) => a.status === s).length,
    })),
  ];

  const filteredActions =
    statusFilter === "all" ? actionPoints : actionPoints.filter((a) => a.status === statusFilter);

  const columns: Column<ActionPoint>[] = [
    {
      key: "action",
      header: "Action",
      className: "max-w-[260px]",
      render: (row) => (
        <span className="block max-w-[240px] truncate font-medium text-foreground" title={row.action}>
          {row.action}
        </span>
      ),
    },
    {
      key: "meeting",
      header: "Meeting",
      hideOnMobile: true,
      render: (row) => (
        <span className="block max-w-[200px] truncate text-xs text-muted-foreground" title={row.meeting}>
          {row.meeting}
        </span>
      ),
    },
    {
      key: "responsible",
      header: "Responsible",
      render: (row) => (
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar name={row.responsible} size="sm" />
          <span className="truncate text-sm font-medium text-foreground">{row.responsible}</span>
        </div>
      ),
    },
    {
      key: "deadline",
      header: "Deadline",
      accessor: (row) => row.deadline,
      sortable: true,
      render: (row) => <span className="whitespace-nowrap text-sm text-muted-foreground">{row.deadline}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "remarks",
      header: "Remarks",
      hideOnMobile: true,
      render: (row) => (
        <span className="block max-w-[220px] truncate text-sm text-muted-foreground" title={row.remarks}>
          {row.remarks || "—"}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Meeting Action Tracker"
        description="Track management decisions from meetings through to closure across the project team."
        icon={<ClipboardCheck className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" />
              New action
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Action completion"
          value={`${k.completionRate}%`}
          icon={<CheckCircle2 className="h-5 w-5" />}
          tone="success"
          hint="Actions closed to date"
        />
        <StatCard
          label="Overdue"
          value={k.overdue}
          icon={<AlertTriangle className="h-5 w-5" />}
          tone="danger"
          hint="Past deadline, unresolved"
        />
        <StatCard
          label="Ongoing"
          value={k.ongoing}
          icon={<Hourglass className="h-5 w-5" />}
          tone="info"
          hint="Currently in progress"
        />
        <StatCard
          label="Meetings held"
          value={k.meetingsHeld}
          icon={<CalendarDays className="h-5 w-5" />}
          tone="primary"
          hint="Recorded this quarter"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader title="Actions by meeting" description="Raised vs. closed action points per meeting" />
          <CardContent>
            <BarSeries
              data={meetingChartData}
              xKey="label"
              height={260}
              series={[
                { key: "actionsRaised", name: "Raised", colorIndex: 1 },
                { key: "actionsClosed", name: "Closed", colorIndex: 0 },
              ]}
            />
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {meetingChartData.map((m) => (
                <span key={m.label} className="text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">{m.label}</span> — {m.title}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Status breakdown" description="All recorded action points" />
          <CardContent>
            <DonutChart data={statusData} height={220} centerValue={String(k.total)} centerLabel="Actions" />
            <div className="mt-4 grid grid-cols-2 gap-2">
              {statusData.map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">{d.name}</span>
                  <span className="font-display font-extrabold text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent meetings */}
      <Card>
        <CardHeader title="Recent meetings" description="Latest management and committee sittings" />
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            {meetings.map((m) => {
              const pct = m.actionsRaised > 0 ? Math.round((m.actionsClosed / m.actionsRaised) * 100) : 0;
              return (
                <div key={m.id} className="rounded-xl border border-border bg-surface-2/40 p-4">
                  <p className="truncate text-sm font-semibold text-foreground">{m.title}</p>
                  <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {formatDate(m.date)}
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-2">
                      <Avatar name={m.chair} size="sm" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">{m.chair}</p>
                        <p className="text-xs text-muted-foreground">Chair</p>
                      </div>
                    </div>
                    <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted-foreground">
                      <Users className="h-3.5 w-3.5" />
                      {m.attendees}
                    </span>
                  </div>
                  <div className="mt-4">
                    <Progress value={pct} tone={pct === 100 ? "success" : pct >= 50 ? "info" : "warning"} size="sm" />
                    <p className="mt-1.5 text-xs text-muted-foreground">
                      {m.actionsClosed}/{m.actionsRaised} actions closed
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Status filter */}
      <Tabs tabs={tabs} value={statusFilter} onChange={setStatusFilter} />

      {/* Action points table */}
      <Card>
        <CardHeader title="Action points" description="All tracked action points from meeting minutes" />
        <CardContent>
          <DataTable
            columns={columns}
            data={filteredActions}
            searchKeys={["action", "meeting", "responsible"]}
            searchPlaceholder="Search action, meeting or responsible…"
            pageSize={8}
            onRowClick={(row) => setSelected(row)}
          />
        </CardContent>
      </Card>

      {/* Action point detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Action point"
        description={selected?.meeting}
        footer={
          <Button variant="outline" onClick={() => setSelected(null)}>
            Close
          </Button>
        }
      >
        {selected && (
          <div className="space-y-1">
            <div className="divide-y divide-border">
              <DetailRow label="Action">{selected.action}</DetailRow>
              <DetailRow label="Meeting">{selected.meeting}</DetailRow>
              <DetailRow label="Meeting date">{formatDate(selected.meetingDate)}</DetailRow>
              <DetailRow label="Responsible">{selected.responsible}</DetailRow>
              <DetailRow label="Deadline">{selected.deadline}</DetailRow>
              <DetailRow label="Status">
                <StatusBadge status={selected.status} />
              </DetailRow>
            </div>
            <div className="pt-4">
              <p className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted-foreground">Remarks</p>
              <p className="rounded-xl bg-surface-2 p-3.5 text-sm text-foreground">
                {selected.remarks || "No remarks recorded."}
              </p>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
