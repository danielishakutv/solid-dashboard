"use client";

import { useMemo, useState } from "react";
import {
  Users,
  Plus,
  Download,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  CalendarDays,
  UserCheck,
  Building2,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge, type BadgeTone } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { Tabs } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DetailRow } from "@/components/ui/misc";
import { BarList, DonutChart } from "@/components/charts";
import { staff, departments } from "@/data/staff";

const employmentTone: Record<string, BadgeTone> = {
  Core: "primary",
  Contract: "info",
  Support: "neutral",
};

export default function StaffDirectoryPage() {
  const [department, setDepartment] = useState<string>("all");
  const [selected, setSelected] = useState<(typeof staff)[number] | null>(null);

  const totalStaff = staff.length;
  const coreStaff = staff.filter((s) => s.employmentType === "Core").length;
  const contractSupport = staff.filter(
    (s) => s.employmentType === "Contract" || s.employmentType === "Support",
  ).length;
  const departmentCount = new Set(staff.map((s) => s.department)).size;

  const byDepartment = useMemo(() => {
    return departments
      .map((d) => ({ label: d, value: staff.filter((s) => s.department === d).length }))
      .filter((d) => d.value > 0)
      .sort((a, b) => b.value - a.value);
  }, []);

  const employmentDonut = useMemo(() => {
    const core = staff.filter((s) => s.employmentType === "Core").length;
    const contract = staff.filter((s) => s.employmentType === "Contract").length;
    const support = staff.filter((s) => s.employmentType === "Support").length;
    return [
      { name: "Core", value: core, colorIndex: 0 },
      { name: "Contract", value: contract, colorIndex: 1 },
      { name: "Support", value: support, colorIndex: 2 },
    ].filter((d) => d.value > 0);
  }, []);

  const departmentTabs = useMemo(() => {
    const used = departments.filter((d) => staff.some((s) => s.department === d));
    return [
      { value: "all", label: "All", count: staff.length },
      ...used.map((d) => ({
        value: d,
        label: d,
        count: staff.filter((s) => s.department === d).length,
      })),
    ];
  }, []);

  const filteredStaff = useMemo(() => {
    if (department === "all") return staff;
    return staff.filter((s) => s.department === department);
  }, [department]);

  const columns: Column<(typeof staff)[number]>[] = [
    {
      key: "name",
      header: "Name",
      sortable: true,
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar name={row.name} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-foreground">{row.name}</p>
            <p className="truncate text-xs text-muted-foreground">{row.role}</p>
          </div>
        </div>
      ),
    },
    {
      key: "department",
      header: "Department",
      sortable: true,
      accessor: (row) => row.department,
    },
    {
      key: "employmentType",
      header: "Type",
      render: (row) => <Badge tone={employmentTone[row.employmentType]}>{row.employmentType}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      key: "contact",
      header: "Contact",
      hideOnMobile: true,
      render: (row) => <span className="text-sm text-muted-foreground">{row.phone}</span>,
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Staff Directory"
        description="Personnel records, roles and leave balances for all project staff"
        icon={<Users className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" />
              Add staff
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total staff"
          value={totalStaff}
          icon={<Users className="h-5 w-5" />}
          tone="primary"
          hint="Across all departments"
        />
        <StatCard
          label="Core staff"
          value={coreStaff}
          icon={<UserCheck className="h-5 w-5" />}
          tone="info"
          hint="Permanent project staff"
        />
        <StatCard
          label="Contract & support"
          value={contractSupport}
          icon={<Briefcase className="h-5 w-5" />}
          tone="accent"
          hint="Contract and support roles"
        />
        <StatCard
          label="Departments"
          value={departmentCount}
          icon={<Building2 className="h-5 w-5" />}
          tone="success"
          hint="Active organisational units"
        />
      </div>

      {/* Charts */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="Staff by department" description="Headcount per organisational unit" />
          <CardContent>
            <BarList items={byDepartment} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Employment type" description="Core, contract and support split" />
          <CardContent>
            <DonutChart
              data={employmentDonut}
              centerValue={String(totalStaff)}
              centerLabel="Staff"
            />
          </CardContent>
        </Card>
      </div>

      {/* Directory */}
      <Card>
        <CardHeader
          title="Directory"
          description="Search, filter and open a staff record for full details"
        />
        <CardContent>
          <div className="mb-4 overflow-x-auto">
            <Tabs tabs={departmentTabs} value={department} onChange={setDepartment} />
          </div>
          <DataTable
            columns={columns}
            data={filteredStaff}
            searchable
            searchPlaceholder="Search staff by name, role, department or email…"
            searchKeys={["name", "role", "department", "email"]}
            pageSize={8}
            onRowClick={(row) => setSelected(row)}
            emptyMessage="No staff found in this department"
          />
        </CardContent>
      </Card>

      {/* Detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title="Staff profile"
        width="max-w-md"
      >
        {selected && (
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={selected.name} size="lg" ring />
              <div className="min-w-0">
                <p className="truncate font-display text-lg font-bold text-foreground">
                  {selected.name}
                </p>
                <p className="truncate text-sm text-muted-foreground">{selected.role}</p>
                <Badge tone="neutral" className="mt-1.5">
                  {selected.department}
                </Badge>
              </div>
            </div>

            <div className="divide-y divide-border rounded-xl border border-border px-4">
              <DetailRow label="Email">
                <span className="inline-flex items-center gap-1.5">
                  <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                  {selected.email}
                </span>
              </DetailRow>
              <DetailRow label="Phone">
                <span className="inline-flex items-center gap-1.5">
                  <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                  {selected.phone}
                </span>
              </DetailRow>
              <DetailRow label="Location">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
                  {selected.location}
                </span>
              </DetailRow>
              <DetailRow label="Employment type">
                <Badge tone={employmentTone[selected.employmentType]}>
                  {selected.employmentType}
                </Badge>
              </DetailRow>
              <DetailRow label="Join date">
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-3.5 w-3.5 text-muted-foreground" />
                  {selected.joinDate}
                </span>
              </DetailRow>
              <DetailRow label="Supervisor">{selected.supervisor ?? "—"}</DetailRow>
              <DetailRow label="Status">
                <StatusBadge status={selected.status} />
              </DetailRow>
            </div>

            <div>
              <p className="mb-3 text-sm font-bold text-foreground">Leave balances</p>
              <div className="space-y-4">
                <LeaveBar
                  label="Annual leave"
                  value={
                    ((selected.leave.annual - selected.leave.annualUsed) / selected.leave.annual) * 100
                  }
                  sub={`${selected.leave.annual - selected.leave.annualUsed} of ${selected.leave.annual} days`}
                  tone="primary"
                />
                <LeaveBar
                  label="Casual leave"
                  value={100}
                  sub={`${selected.leave.casual} of ${selected.leave.casual} days`}
                  tone="info"
                />
                <LeaveBar
                  label="Sick leave"
                  value={100}
                  sub={`${selected.leave.sick} of ${selected.leave.sick} days`}
                  tone="accent"
                />
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}

function LeaveBar({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: number;
  sub: string;
  tone: "primary" | "info" | "accent";
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{label}</span>
        <span className="text-xs text-muted-foreground">{sub}</span>
      </div>
      <Progress value={value} tone={tone} />
    </div>
  );
}
