"use client";

import { useState } from "react";
import {
  FileSignature,
  Wallet,
  CircleDollarSign,
  Clock,
  ShieldAlert,
  Download,
  Plus,
  AlertTriangle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge, type BadgeTone } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SegmentedTabs } from "@/components/ui/tabs";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { DetailRow, EmptyState } from "@/components/ui/misc";
import { BarSeries, DonutChart } from "@/components/charts";
import {
  contracts,
  paymentMilestones,
  disbursementTrend,
  contractKpis,
  type Contract,
  type PaymentMilestone,
} from "@/data/contracts";
import { formatNaira, daysBetween, cn } from "@/lib/utils";

const TODAY = "2026-07-07";
const APG_WATCH_CUTOFF = "2026-08-31";

const CATEGORY_COLOR: Record<Contract["category"], number> = {
  Works: 0,
  Goods: 1,
  Consultancy: 2,
  "Non-Consulting": 3,
};

const MILESTONE_TYPE_TONE: Record<PaymentMilestone["type"], BadgeTone> = {
  Advance: "info",
  Interim: "primary",
  Tranche: "accent",
  Final: "success",
  Retention: "warning",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function progressTone(status: Contract["status"]) {
  if (status === "Overdue") return "danger" as const;
  if (status === "Completed") return "success" as const;
  if (status === "Pending") return "warning" as const;
  return "primary" as const;
}

export default function ContractsPage() {
  const k = contractKpis();
  const [tab, setTab] = useState<"contracts" | "payments">("contracts");
  const [selected, setSelected] = useState<Contract | null>(null);

  const categoryDonut = (Object.keys(CATEGORY_COLOR) as Contract["category"][])
    .map((category) => ({
      name: category,
      value: contracts.filter((c) => c.category === category).length,
      colorIndex: CATEGORY_COLOR[category],
    }))
    .filter((d) => d.value > 0);

  const apgWatch = contracts
    .filter((c): c is Contract & { apgValidTo: string } => Boolean(c.apgValidTo) && c.apgValidTo! <= APG_WATCH_CUTOFF)
    .sort((a, b) => a.apgValidTo.localeCompare(b.apgValidTo));

  const selectedMilestones = selected
    ? paymentMilestones.filter((p) => p.contractRef === selected.ref)
    : [];

  const contractColumns: Column<Contract>[] = [
    {
      key: "ref",
      header: "Ref",
      className: "font-mono text-xs text-muted-foreground",
    },
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <span className="block max-w-[240px] truncate font-medium text-foreground" title={row.title}>
          {row.title}
        </span>
      ),
    },
    {
      key: "contractor",
      header: "Contractor",
      hideOnMobile: true,
      render: (row) => <span className="text-muted-foreground">{row.contractor}</span>,
    },
    {
      key: "value",
      header: "Value",
      align: "right",
      sortable: true,
      accessor: (row) => row.value,
      render: (row) => (
        <span className="font-semibold tabular text-foreground">
          {formatNaira(row.value, { compact: true })}
        </span>
      ),
    },
    {
      key: "progress",
      header: "Progress",
      render: (row) => (
        <div className="space-y-1" style={{ width: 120 }}>
          <Progress value={row.progress} tone={progressTone(row.status)} size="sm" />
          <span className="text-[11px] font-medium text-muted-foreground">{row.progress}%</span>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const paymentColumns: Column<PaymentMilestone>[] = [
    {
      key: "contractTitle",
      header: "Contract",
      render: (row) => (
        <span className="block max-w-[220px] truncate font-medium text-foreground" title={row.contractTitle}>
          {row.contractTitle}
        </span>
      ),
    },
    {
      key: "milestone",
      header: "Milestone",
      render: (row) => <span className="text-muted-foreground">{row.milestone}</span>,
    },
    {
      key: "type",
      header: "Type",
      render: (row) => <Badge tone={MILESTONE_TYPE_TONE[row.type]}>{row.type}</Badge>,
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      sortable: true,
      accessor: (row) => row.amount,
      render: (row) => (
        <span className="font-semibold tabular text-foreground">{formatNaira(row.amount, { compact: true })}</span>
      ),
    },
    {
      key: "dueDate",
      header: "Due date",
      sortable: true,
      accessor: (row) => row.dueDate,
      render: (row) => <span className="text-muted-foreground">{formatDate(row.dueDate)}</span>,
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
        title="Contracts & Payments"
        description="Monitor contract awards, delivery milestones, advance payment guarantees and disbursement across the portfolio."
        icon={<FileSignature className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" />
              New contract
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Portfolio value"
          value={formatNaira(k.totalValue, { compact: true })}
          icon={<Wallet className="h-5 w-5" />}
          tone="primary"
          hint={`${k.active} active · ${k.completed} completed`}
        />
        <StatCard
          label="Disbursed"
          value={formatNaira(k.totalPaid, { compact: true })}
          icon={<CircleDollarSign className="h-5 w-5" />}
          tone="success"
          hint={`${k.disbursementRate}% of portfolio`}
        />
        <StatCard
          label="Pending payments"
          value={formatNaira(k.pendingAmount, { compact: true })}
          icon={<Clock className="h-5 w-5" />}
          tone="warning"
          hint={`${k.pendingPaymentsCount} milestones`}
        />
        <StatCard
          label="APG expiring soon"
          value={k.apgExpiringSoon}
          icon={<ShieldAlert className="h-5 w-5" />}
          tone="danger"
          hint="Advance payment guarantees"
        />
      </div>

      {/* Trend + category mix */}
      <div className="grid gap-5 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Commitments vs disbursement (₦m)"
            description="Cumulative committed value against actual disbursement"
          />
          <CardContent>
            <BarSeries
              data={disbursementTrend}
              xKey="month"
              height={280}
              valueFormatter={(v) => `₦${v}m`}
              series={[
                { key: "committed", name: "Committed", colorIndex: 1 },
                { key: "disbursed", name: "Disbursed", colorIndex: 0 },
              ]}
            />
            <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-[#2a78d6]" />
                Committed
              </span>
              <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                <span className="h-2.5 w-2.5 rounded-[3px] bg-[#0d9488]" />
                Disbursed
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Contracts by category" />
          <CardContent className="space-y-4">
            <DonutChart
              data={categoryDonut}
              height={190}
              centerValue={`${contracts.length}`}
              centerLabel="Contracts"
            />
            <div className="space-y-2">
              {categoryDonut.map((d) => (
                <div key={d.name} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-2 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="h-2.5 w-2.5 rounded-[3px]"
                      style={{
                        background: ["#0d9488", "#2a78d6", "#d97706", "#7c3aed"][d.colorIndex ?? 0],
                      }}
                    />
                    {d.name}
                  </span>
                  <span className="font-display font-extrabold text-foreground">{d.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* APG watch */}
      <Card>
        <CardHeader
          title="APG watch"
          description="Contracts with advance payment guarantees expiring by 31 Aug 2026"
          icon={<AlertTriangle className="h-5 w-5" />}
          action={<Badge tone="danger">{apgWatch.length}</Badge>}
        />
        <CardContent>
          {apgWatch.length === 0 ? (
            <EmptyState icon={<ShieldAlert size={22} />} title="No APGs expiring soon" description="All advance payment guarantees are clear of the watch window." />
          ) : (
            <div className="flex gap-3.5 overflow-x-auto pb-1">
              {apgWatch.map((c) => {
                const days = daysBetween(TODAY, c.apgValidTo);
                const critical = days <= 14;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelected(c)}
                    className={cn(
                      "flex w-64 shrink-0 flex-col gap-2.5 rounded-xl border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-lift",
                      critical ? "border-danger/30 bg-danger-soft" : "border-warning/30 bg-warning-soft",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className={cn("font-display text-2xl font-extrabold tabular", critical ? "text-danger" : "text-warning")}>
                        {days}
                        <span className="ml-1 text-xs font-semibold uppercase tracking-wide">days</span>
                      </span>
                      <Badge tone={critical ? "danger" : "warning"} dot>
                        {critical ? "Critical" : "Watch"}
                      </Badge>
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-foreground">{c.contractor}</p>
                      <p className="font-mono text-xs text-muted-foreground">{c.ref}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">APG valid to {formatDate(c.apgValidTo)}</p>
                  </button>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Tables */}
      <div className="space-y-4">
        <SegmentedTabs
          tabs={[
            { value: "contracts", label: "Contracts", count: contracts.length },
            { value: "payments", label: "Payment milestones", count: paymentMilestones.length },
          ]}
          value={tab}
          onChange={(v) => setTab(v as "contracts" | "payments")}
        />

        <Card>
          <CardContent>
            {tab === "contracts" ? (
              <DataTable
                columns={contractColumns}
                data={contracts}
                searchKeys={["ref", "title", "contractor"]}
                searchPlaceholder="Search contracts…"
                initialSort={{ key: "value", dir: "desc" }}
                pageSize={8}
                onRowClick={(row) => setSelected(row)}
              />
            ) : (
              <DataTable
                columns={paymentColumns}
                data={paymentMilestones}
                searchKeys={["contractTitle", "milestone", "contractor", "contractRef"]}
                searchPlaceholder="Search payment milestones…"
                pageSize={8}
              />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contract detail drawer */}
      <Drawer
        open={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title}
        description={selected?.contractor}
        width="max-w-lg"
      >
        {selected && (
          <div className="space-y-6">
            <Badge tone="primary">{selected.category}</Badge>

            <div className="divide-y divide-border rounded-xl border border-border px-4">
              <DetailRow label="Reference">{selected.ref}</DetailRow>
              <DetailRow label="Value">{formatNaira(selected.value)}</DetailRow>
              <DetailRow label="Paid">{formatNaira(selected.paid)}</DetailRow>
              <DetailRow label="Outstanding">{formatNaira(selected.value - selected.paid)}</DetailRow>
              <DetailRow label="Start date">{formatDate(selected.startDate)}</DetailRow>
              <DetailRow label="End date">{formatDate(selected.endDate)}</DetailRow>
              <DetailRow label="Manager">{selected.manager}</DetailRow>
              <DetailRow label="APG valid to">{selected.apgValidTo ? formatDate(selected.apgValidTo) : "—"}</DetailRow>
              <DetailRow label="Status">
                <StatusBadge status={selected.status} />
              </DetailRow>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="font-semibold text-muted-foreground">Delivery progress</span>
                <span className="font-bold text-foreground">{selected.progress}%</span>
              </div>
              <Progress value={selected.progress} tone={progressTone(selected.status)} />
            </div>

            <div>
              <p className="mb-2.5 text-sm font-bold text-foreground">Payment milestones</p>
              {selectedMilestones.length === 0 ? (
                <p className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
                  No payment milestones recorded for this contract.
                </p>
              ) : (
                <div className="space-y-2">
                  {selectedMilestones.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface-2/60 px-3.5 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-foreground">{m.milestone}</p>
                        <p className="text-xs text-muted-foreground">{formatNaira(m.amount, { compact: true })} · due {formatDate(m.dueDate)}</p>
                      </div>
                      <StatusBadge status={m.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
