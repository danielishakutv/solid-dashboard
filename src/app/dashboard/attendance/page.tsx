"use client";

import { useState } from "react";
import { Clock, Download, QrCode, UserCheck, Timer, AlarmClock, Clock3 } from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { DetailRow } from "@/components/ui/misc";
import { AreaTrend, DonutChart, BarSeries, BarList } from "@/components/charts";
import { attendanceSummary } from "@/data/staff";
import {
  attendanceKpis,
  attendanceTrend,
  weeklyPunctuality,
  checkInDistribution,
  todayLog,
  type CheckLog,
} from "@/data/attendance";

export default function AttendancePage() {
  const kpis = attendanceKpis();
  const summary = attendanceSummary();
  const [selected, setSelected] = useState<CheckLog | null>(null);

  const availabilityDonut = [
    { name: "Present", value: summary.present, colorIndex: 0 },
    { name: "Official Assignment", value: summary.assignment, colorIndex: 1 },
    { name: "Remote", value: summary.remote, colorIndex: 3 },
    { name: "On Leave", value: summary.onLeave, colorIndex: 2 },
    { name: "Sick", value: summary.sick, colorIndex: 4 },
  ].filter((d) => d.value > 0);

  const checkInItems = checkInDistribution.map((c) => ({ label: c.window, value: c.count }));

  const columns: Column<CheckLog>[] = [
    {
      key: "name",
      header: "Staff",
      sortable: true,
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
      key: "checkIn",
      header: "Check-in",
      sortable: true,
      accessor: (row) => row.checkIn ?? "",
      render: (row) =>
        row.checkIn ? (
          <span className="tabular font-medium text-foreground">{row.checkIn}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "checkOut",
      header: "Check-out",
      hideOnMobile: true,
      accessor: (row) => row.checkOut ?? "",
      render: (row) =>
        row.checkOut ? (
          <span className="tabular font-medium text-foreground">{row.checkOut}</span>
        ) : (
          <span className="text-muted-foreground">—</span>
        ),
    },
    {
      key: "hours",
      header: "Hours",
      align: "right",
      sortable: true,
      accessor: (row) => row.hours ?? 0,
      render: (row) => (row.hours != null ? `${row.hours}h` : <span className="text-muted-foreground">—</span>),
    },
    {
      key: "method",
      header: "Method",
      hideOnMobile: true,
      render: (row) => <Badge tone="neutral">{row.method}</Badge>,
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
        title="Attendance & Time Management"
        description="Live staff availability, check-in monitoring and punctuality trends across the PCU."
        icon={<Clock className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <QrCode className="h-4 w-4" />
              Check-in station
            </Button>
            <Button size="md">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Checked in"
          value={`${kpis.checkedIn}/${kpis.total}`}
          icon={<UserCheck className="h-5 w-5" />}
          tone="success"
          hint="staff present today"
        />
        <StatCard
          label="On-time rate"
          value={`${kpis.onTimeRate}%`}
          icon={<Timer className="h-5 w-5" />}
          tone="primary"
          delta={3}
          deltaLabel="vs last week"
        />
        <StatCard
          label="Late arrivals"
          value={kpis.late}
          icon={<AlarmClock className="h-5 w-5" />}
          tone="warning"
          hint="checked in after 8:00am"
        />
        <StatCard
          label="Avg check-in time"
          value={kpis.avgCheckIn}
          icon={<Clock3 className="h-5 w-5" />}
          tone="info"
          hint="across all checked-in staff"
        />
      </div>

      {/* Trend + availability */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Attendance rate trend"
            description="Monthly attendance rate, Feb – Jul 2026"
          />
          <CardContent>
            <AreaTrend
              data={attendanceTrend}
              xKey="month"
              height={280}
              valueFormatter={(v) => `${v}%`}
              series={[{ key: "rate", name: "Attendance rate", colorIndex: 0 }]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Availability today" description="Where staff stand right now" />
          <CardContent className="space-y-4">
            <DonutChart
              data={availabilityDonut}
              height={200}
              centerValue={`${summary.available}/${summary.total}`}
              centerLabel="Available"
            />
            <div className="grid grid-cols-2 gap-2 text-sm">
              <MiniStat label="Present" value={summary.present} tone="text-success" />
              <MiniStat label="Assignment" value={summary.assignment} tone="text-info" />
              <MiniStat label="Remote" value={summary.remote} tone="text-accent" />
              <MiniStat label="On leave" value={summary.onLeave} tone="text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly punctuality + check-in distribution */}
      <div className="grid gap-5 sm:grid-cols-2">
        <Card>
          <CardHeader title="This week" description="Daily punctuality breakdown" />
          <CardContent>
            <BarSeries
              data={weeklyPunctuality}
              xKey="day"
              stacked
              height={260}
              series={[
                { key: "onTime", name: "On time", colorIndex: 0 },
                { key: "late", name: "Late", colorIndex: 2 },
                { key: "absent", name: "Absent", colorIndex: 4 },
              ]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Check-in distribution" description="When staff are clocking in" />
          <CardContent>
            <BarList items={checkInItems} />
          </CardContent>
        </Card>
      </div>

      {/* Roster table */}
      <Card>
        <CardHeader title="Today's roster" description="Click a row to view full check-in detail" />
        <CardContent>
          <DataTable
            columns={columns}
            data={todayLog}
            searchable
            searchKeys={["name", "role", "status"]}
            searchPlaceholder="Search staff, role, or status…"
            pageSize={8}
            initialSort={{ key: "name", dir: "asc" }}
            onRowClick={(row) => setSelected(row)}
          />
        </CardContent>
      </Card>

      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name}
        description={selected?.role}
      >
        {selected && (
          <div className="divide-y divide-border">
            <DetailRow label="Name">{selected.name}</DetailRow>
            <DetailRow label="Role">{selected.role}</DetailRow>
            <DetailRow label="Status">
              <StatusBadge status={selected.status} />
            </DetailRow>
            <DetailRow label="Check-in">{selected.checkIn ?? "—"}</DetailRow>
            <DetailRow label="Check-out">{selected.checkOut ?? "—"}</DetailRow>
            <DetailRow label="Hours">{selected.hours != null ? `${selected.hours}h` : "—"}</DetailRow>
            <DetailRow label="Method">
              <Badge tone="neutral">{selected.method}</Badge>
            </DetailRow>
          </div>
        )}
      </Drawer>
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
