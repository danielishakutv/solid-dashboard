"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Download,
  Plus,
  FileSearch,
  Hourglass,
  Wallet,
  Layers,
  PieChart,
  BarChart3,
  ListChecks,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeTone } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { Progress } from "@/components/ui/progress";
import { DetailRow } from "@/components/ui/misc";
import { DonutChart, BarList } from "@/components/charts";
import {
  procurements,
  procStageOrder,
  procurementKpis,
  type Procurement,
  type ProcMethod,
  type ProcStage,
} from "@/data/procurement";
import { formatNaira } from "@/lib/utils";

const methodTone: Record<ProcMethod, BadgeTone> = {
  ICB: "primary",
  NCB: "info",
  Shopping: "accent",
  QCBS: "success",
  Direct: "neutral",
  RFQ: "warning",
};

const noObjectionTone: Record<Procurement["noObjection"], BadgeTone> = {
  Granted: "success",
  Pending: "warning",
  "Not Required": "neutral",
};

function stageTone(stage: ProcStage): BadgeTone {
  if (stage === "Completed") return "success";
  if (stage === "Bid Evaluation") return "warning";
  if (stage === "Contract Award") return "primary";
  return "info";
}

export default function ProcurementPage() {
  const [selected, setSelected] = useState<Procurement | null>(null);
  const k = procurementKpis();

  const methodTally = new Map<string, number>();
  procurements.forEach((p) => methodTally.set(p.method, (methodTally.get(p.method) ?? 0) + 1));
  const methodDonutData = Array.from(methodTally.entries()).map(([name, value], i) => ({
    name,
    value,
    colorIndex: i,
  }));

  const categoryTally = new Map<string, number>();
  procurements.forEach((p) => categoryTally.set(p.category, (categoryTally.get(p.category) ?? 0) + 1));
  const categoryBarData = Array.from(categoryTally.entries())
    .map(([label, value], i) => ({ label, value, colorIndex: i }))
    .sort((a, b) => b.value - a.value);

  const columns: Column<Procurement>[] = [
    {
      key: "ref",
      header: "Ref",
      sortable: true,
      accessor: (row) => row.ref,
      render: (row) => <span className="font-semibold text-foreground">{row.ref}</span>,
    },
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <span
          className="block max-w-[260px] truncate text-sm font-medium text-foreground"
          title={row.title}
        >
          {row.title}
        </span>
      ),
    },
    {
      key: "method",
      header: "Method",
      render: (row) => <Badge tone={methodTone[row.method]}>{row.method}</Badge>,
    },
    {
      key: "stage",
      header: "Stage",
      render: (row) => <Badge tone={stageTone(row.stage)}>{row.stage}</Badge>,
    },
    {
      key: "estimatedValue",
      header: "Est. value",
      align: "right",
      sortable: true,
      accessor: (row) => row.estimatedValue,
      render: (row) => (
        <span className="font-bold tabular text-foreground">
          {formatNaira(row.estimatedValue, { compact: true })}
        </span>
      ),
    },
    {
      key: "bidClosing",
      header: "Bid closing",
      sortable: true,
      accessor: (row) => row.bidClosing,
      hideOnMobile: true,
    },
    {
      key: "noObjection",
      header: "No-Objection",
      hideOnMobile: true,
      render: (row) => <Badge tone={noObjectionTone[row.noObjection]}>{row.noObjection}</Badge>,
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Procurement"
        description="Track solicitations across the procurement pipeline — from planning and advertisement through bid evaluation, no-objection and contract award"
        icon={<ShoppingCart className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" />
              New procurement
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active procurements"
          value={k.active}
          icon={<ShoppingCart className="h-5 w-5" />}
          tone="primary"
          hint={`${k.total} total in the system`}
        />
        <StatCard
          label="In evaluation"
          value={k.evaluation}
          icon={<FileSearch className="h-5 w-5" />}
          tone="info"
          hint="Bids currently under evaluation"
        />
        <StatCard
          label="Awaiting No-Objection"
          value={k.awaitingNoObjection}
          icon={<Hourglass className="h-5 w-5" />}
          tone="warning"
          hint="Pending development partner clearance"
        />
        <StatCard
          label="Pipeline value"
          value={formatNaira(k.totalPipeline, { compact: true })}
          icon={<Wallet className="h-5 w-5" />}
          tone="accent"
          hint="Estimated value, excluding completed"
        />
      </div>

      {/* Pipeline board */}
      <Card>
        <CardHeader
          title="Procurement pipeline"
          description="Every active solicitation, organised by stage"
          icon={<Layers className="h-5 w-5" />}
        />
        <CardContent>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {procStageOrder.map((stage) => {
              const items = procurements.filter((p) => p.stage === stage);
              return (
                <div key={stage} className="min-w-[240px] shrink-0 rounded-xl bg-surface-2 p-3">
                  <div className="mb-3 flex items-center justify-between gap-2 px-0.5">
                    <p className="text-sm font-bold text-foreground">{stage}</p>
                    <Badge tone="neutral">{items.length}</Badge>
                  </div>
                  <div className="space-y-2.5">
                    {items.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-border px-3 py-6 text-center text-xs text-muted-foreground">
                        No items
                      </div>
                    ) : (
                      items.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setSelected(p)}
                          className="w-full rounded-lg border border-border bg-surface p-3 text-left shadow-card transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lift"
                        >
                          <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
                            {p.title}
                          </p>
                          <p className="mt-1 text-xs text-muted-foreground">{p.ref}</p>
                          <div className="mt-2.5 flex items-center justify-between gap-2">
                            <Badge tone={methodTone[p.method]}>{p.method}</Badge>
                            <span className="text-xs font-bold tabular text-foreground">
                              {formatNaira(p.estimatedValue, { compact: true })}
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Breakdown charts */}
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader title="By method" description="Procurement count per solicitation method" icon={<PieChart className="h-5 w-5" />} />
          <CardContent>
            <DonutChart data={methodDonutData} centerValue={String(procurements.length)} centerLabel="Total" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="By category" description="Procurement count per spend category" icon={<BarChart3 className="h-5 w-5" />} />
          <CardContent>
            <BarList items={categoryBarData} />
          </CardContent>
        </Card>
      </div>

      {/* All procurements table */}
      <Card>
        <CardHeader
          title="All procurements"
          description="Search, sort and open any record for full detail"
          icon={<ListChecks className="h-5 w-5" />}
        />
        <CardContent>
          <DataTable
            columns={columns}
            data={procurements}
            searchable
            searchPlaceholder="Search by ref, title, method or owner…"
            searchKeys={["ref", "title", "method", "owner"]}
            pageSize={8}
            onRowClick={(row) => setSelected(row)}
            emptyMessage="No procurements found"
          />
        </CardContent>
      </Card>

      {/* Detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.ref}
        description={selected?.title}
        width="max-w-md"
      >
        {selected && (
          <div className="space-y-6">
            <div className="divide-y divide-border rounded-xl border border-border px-4">
              <DetailRow label="Reference">{selected.ref}</DetailRow>
              <DetailRow label="Title">{selected.title}</DetailRow>
              <DetailRow label="Method">
                <Badge tone={methodTone[selected.method]}>{selected.method}</Badge>
              </DetailRow>
              <DetailRow label="Category">{selected.category}</DetailRow>
              <DetailRow label="Stage">
                <Badge tone={stageTone(selected.stage)}>{selected.stage}</Badge>
              </DetailRow>
              <DetailRow label="Estimated value">{formatNaira(selected.estimatedValue)}</DetailRow>
              <DetailRow label="Bid closing">{selected.bidClosing}</DetailRow>
              <DetailRow label="Evaluation date">{selected.evaluationDate ?? "—"}</DetailRow>
              <DetailRow label="Award date">{selected.awardDate ?? "—"}</DetailRow>
              <DetailRow label="No-Objection">
                <Badge tone={noObjectionTone[selected.noObjection]}>{selected.noObjection}</Badge>
              </DetailRow>
              <DetailRow label="Owner">{selected.owner}</DetailRow>
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-foreground">Progress</span>
                <span className="text-xs text-muted-foreground">{selected.progress}%</span>
              </div>
              <Progress value={selected.progress} tone="primary" />
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
