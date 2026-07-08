"use client";

import { useState } from "react";
import {
  UserCheck,
  Plus,
  Download,
  Printer,
  Users,
  CalendarClock,
  TrendingUp,
  Clock,
  Phone,
  CalendarDays,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer, Modal } from "@/components/ui/drawer";
import { Label, Input, Select } from "@/components/ui/field";
import { DetailRow } from "@/components/ui/misc";
import { AreaTrend, DonutChart } from "@/components/charts";
import { visitors, visitorTrend, visitorsByPurpose, visitorKpis, type Visitor } from "@/data/visitors";
import { staff } from "@/data/staff";

const purposeOptions = [
  "Meeting with staff",
  "Contract / documentation submission",
  "Delivery / supply",
  "Interview",
  "Official / oversight visit",
  "Community engagement",
  "Other",
];

export default function VisitorsPage() {
  const k = visitorKpis();
  const [selected, setSelected] = useState<Visitor | null>(null);
  const [registerOpen, setRegisterOpen] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    organization: "",
    phone: "",
    purpose: purposeOptions[0],
    host: staff[0]?.name ?? "",
  });

  const purposeTotal = visitorsByPurpose.reduce((sum, p) => sum + p.value, 0);

  const columns: Column<Visitor>[] = [
    {
      key: "badge",
      header: "Badge",
      sortable: true,
      render: (row) => <span className="font-mono text-sm font-bold text-primary">{row.badge}</span>,
    },
    {
      key: "name",
      header: "Visitor",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{row.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.organization}</p>
          </div>
        </div>
      ),
    },
    {
      key: "purpose",
      header: "Purpose",
      hideOnMobile: true,
      render: (row) => (
        <span className="block max-w-[220px] truncate" title={row.purpose}>
          {row.purpose}
        </span>
      ),
    },
    {
      key: "host",
      header: "Host",
      hideOnMobile: true,
    },
    {
      key: "timeIn",
      header: "Time in",
    },
    {
      key: "timeOut",
      header: "Time out",
      render: (row) => row.timeOut ?? "—",
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const closeRegister = () => setRegisterOpen(false);

  return (
    <div className="space-y-7">
      <PageHeader
        title="Visitor Management"
        description="Front-desk visitor register — ID badges, check-in/out tracking and visit statistics"
        icon={<UserCheck className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="md" onClick={() => setRegisterOpen(true)}>
              <Plus className="h-4 w-4" />
              Register visitor
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="On-site now"
          value={k.onsite}
          icon={<Users className="h-5 w-5" />}
          tone="success"
          hint="Currently checked in"
        />
        <StatCard
          label="Today"
          value={k.today}
          icon={<CalendarClock className="h-5 w-5" />}
          tone="primary"
          hint="Visitors logged today"
        />
        <StatCard
          label="This month"
          value={k.thisMonth}
          icon={<TrendingUp className="h-5 w-5" />}
          tone="info"
          hint="Total visits this month"
        />
        <StatCard
          label="Avg duration"
          value={k.avgDuration}
          icon={<Clock className="h-5 w-5" />}
          tone="accent"
          hint="Average time on site"
        />
      </div>

      {/* Trend + breakdown */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Visitor volume" description="Monthly visitor traffic trend" />
          <CardContent>
            <AreaTrend
              data={visitorTrend}
              xKey="month"
              height={260}
              valueFormatter={(v) => `${v} visitors`}
              series={[{ key: "visitors", name: "Visitors", colorIndex: 1 }]}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="By purpose" description="Visits grouped by category" />
          <CardContent>
            <DonutChart
              data={visitorsByPurpose}
              centerValue={String(purposeTotal)}
              centerLabel="Total visits"
            />
            <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
              {visitorsByPurpose.map((p, i) => (
                <span key={p.name} className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-[3px]"
                    style={{
                      background: ["#0d9488", "#2a78d6", "#d97706", "#7c3aed", "#e11d48"][i % 5],
                    }}
                  />
                  <span className="truncate">{p.name}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Visitor register */}
      <Card>
        <CardHeader
          title="Visitor register"
          description="Search and open any entry to view its printable ID badge"
        />
        <CardContent>
          <DataTable
            columns={columns}
            data={visitors}
            searchable
            searchPlaceholder="Search by name, organization, purpose, host or badge…"
            searchKeys={["name", "organization", "purpose", "host", "badge"]}
            pageSize={8}
            onRowClick={(row) => setSelected(row)}
            emptyMessage="No visitors found"
          />
        </CardContent>
      </Card>

      {/* Visitor ID badge drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Visitor badge"
        description="Preview and print the visitor's ID badge"
        width="max-w-md"
        footer={
          <Button onClick={() => {}}>
            <Printer className="h-4 w-4" />
            Print badge
          </Button>
        }
      >
        {selected && (
          <div className="space-y-6">
            {/* Printable ID badge card */}
            <div className="overflow-hidden rounded-2xl border border-border shadow-card">
              <div className="brand-gradient px-5 pt-6 pb-10 text-center text-white">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-white/80">
                  Visitor Pass
                </p>
                <p className="mt-1 font-display text-base font-extrabold">
                  SOLID Project · Adamawa State PCU
                </p>
              </div>
              <div className="relative -mt-8 flex flex-col items-center px-5 pb-6">
                <Avatar name={selected.name} size="lg" ring className="ring-4 ring-surface shadow-lift" />
                <p className="mt-3 text-center font-display text-lg font-bold text-foreground">
                  {selected.name}
                </p>
                <p className="text-center text-sm text-muted-foreground">{selected.organization}</p>

                <div className="mt-4 rounded-xl bg-surface-2 px-6 py-2.5 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Badge No.
                  </p>
                  <p className="font-display text-2xl font-extrabold tabular text-primary">
                    {selected.badge}
                  </p>
                </div>

                <div className="mt-5 grid w-full grid-cols-2 gap-3 border-t border-border pt-4 text-center text-xs">
                  <div>
                    <p className="text-muted-foreground">Purpose</p>
                    <p className="mt-0.5 truncate font-semibold text-foreground" title={selected.purpose}>
                      {selected.purpose}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Host</p>
                    <p className="mt-0.5 truncate font-semibold text-foreground" title={selected.host}>
                      {selected.host}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Date</p>
                    <p className="mt-0.5 font-semibold text-foreground">{selected.date}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Time in</p>
                    <p className="mt-0.5 font-semibold text-foreground">{selected.timeIn}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="divide-y divide-border rounded-xl border border-border px-4">
              <DetailRow label="Phone">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  {selected.phone}
                </span>
              </DetailRow>
              <DetailRow label="Status">
                <StatusBadge status={selected.status} />
              </DetailRow>
            </div>
          </div>
        )}
      </Drawer>

      {/* Register visitor modal */}
      <Modal
        open={registerOpen}
        onClose={closeRegister}
        title="Register visitor"
        description="Log a new visitor and issue a check-in badge"
        footer={
          <>
            <Button variant="outline" onClick={closeRegister}>
              Cancel
            </Button>
            <Button onClick={closeRegister}>
              <UserCheck className="h-4 w-4" />
              Check in visitor
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full name</Label>
            <Input
              id="fullName"
              placeholder="e.g. Barr. Nuhu Adamu"
              value={form.fullName}
              onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="organization">Organization</Label>
            <Input
              id="organization"
              placeholder="e.g. State Ministry of Justice"
              value={form.organization}
              onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="purpose">Purpose</Label>
              <Select
                id="purpose"
                value={form.purpose}
                onChange={(e) => setForm((f) => ({ ...f, purpose: e.target.value }))}
              >
                {purposeOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <Label htmlFor="host">Host</Label>
              <Select
                id="host"
                value={form.host}
                onChange={(e) => setForm((f) => ({ ...f, host: e.target.value }))}
              >
                {staff.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5" />
            Visitor will be checked in with today&apos;s date and time — demo only, not persisted.
          </div>
        </div>
      </Modal>
    </div>
  );
}
