"use client";

import { useState } from "react";
import {
  FolderOpen,
  Plus,
  Download,
  Inbox,
  Send,
  Files,
  AlertTriangle,
} from "lucide-react";
import { PageHeader } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge, type BadgeTone } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { DetailRow } from "@/components/ui/misc";
import { SegmentedTabs } from "@/components/ui/tabs";
import { AreaTrend, BarList } from "@/components/charts";
import {
  correspondence,
  projectFiles,
  fileMovements,
  correspondenceTrend,
  registryKpis,
  type Correspondence,
  type ProjectFile,
  type FileMovement,
} from "@/data/registry";
import { formatNumber } from "@/lib/utils";

type SectionValue = "correspondence" | "files" | "movements";

const typeTone: Record<Correspondence["type"], BadgeTone> = {
  Incoming: "info",
  Outgoing: "primary",
  "Internal Memo": "accent",
};

const priorityTone: Record<Correspondence["priority"], BadgeTone> = {
  Urgent: "danger",
  Important: "warning",
  Routine: "neutral",
};

export default function RegistryPage() {
  const k = registryKpis();
  const [section, setSection] = useState<SectionValue>("correspondence");
  const [selected, setSelected] = useState<Correspondence | null>(null);

  const categoryCounts = projectFiles.reduce<Record<string, number>>((acc, f) => {
    acc[f.category] = (acc[f.category] ?? 0) + 1;
    return acc;
  }, {});
  const filesByCategory = Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([label, value], i) => ({ label, value, colorIndex: i }));

  const correspondenceColumns: Column<Correspondence>[] = [
    {
      key: "ref",
      header: "Ref",
      sortable: true,
      className: "font-mono text-xs font-semibold text-foreground",
    },
    {
      key: "subject",
      header: "Subject",
      render: (row) => (
        <span className="block max-w-[260px] truncate font-medium text-foreground" title={row.subject}>
          {row.subject}
        </span>
      ),
    },
    {
      key: "type",
      header: "Type",
      render: (row) => <Badge tone={typeTone[row.type]}>{row.type}</Badge>,
    },
    {
      key: "route",
      header: "From → To",
      hideOnMobile: true,
      render: (row) => (
        <span className="text-muted-foreground">
          {row.from} <span className="mx-1">→</span> {row.to}
        </span>
      ),
    },
    { key: "date", header: "Date", sortable: true },
    {
      key: "priority",
      header: "Priority",
      render: (row) => <Badge tone={priorityTone[row.priority]}>{row.priority}</Badge>,
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const projectFileColumns: Column<ProjectFile>[] = [
    { key: "ref", header: "Ref", className: "font-mono text-xs font-semibold text-foreground" },
    {
      key: "title",
      header: "Title",
      render: (row) => (
        <span className="block max-w-[240px] truncate font-medium text-foreground" title={row.title}>
          {row.title}
        </span>
      ),
    },
    { key: "category", header: "Category", hideOnMobile: true },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
    { key: "heldBy", header: "Held by" },
    {
      key: "documents",
      header: "Docs",
      align: "right",
      sortable: true,
      accessor: (row) => row.documents,
    },
  ];

  const movementColumns: Column<FileMovement>[] = [
    { key: "fileRef", header: "File ref", className: "font-mono text-xs font-semibold text-foreground" },
    {
      key: "fileTitle",
      header: "Title",
      render: (row) => (
        <span className="block max-w-[220px] truncate font-medium text-foreground" title={row.fileTitle}>
          {row.fileTitle}
        </span>
      ),
    },
    { key: "from", header: "From" },
    { key: "to", header: "To" },
    { key: "date", header: "Date", sortable: true },
    { key: "purpose", header: "Purpose", hideOnMobile: true },
    {
      key: "returned",
      header: "Returned",
      render: (row) => <StatusBadge status={row.returned ? "Completed" : "In Circulation"} />,
    },
  ];

  return (
    <div className="space-y-7">
      <PageHeader
        title="Registry & File Management"
        description="Track incoming and outgoing correspondence, project files, and file movements across the office."
        icon={<FolderOpen className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <Download className="h-4 w-4" />
              Export register
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" />
              Log correspondence
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Incoming received"
          value={formatNumber(k.incoming)}
          icon={<Inbox className="h-5 w-5" />}
          tone="info"
          hint="This period"
        />
        <StatCard
          label="Outgoing dispatched"
          value={formatNumber(k.outgoing)}
          icon={<Send className="h-5 w-5" />}
          tone="primary"
          hint="This period"
        />
        <StatCard
          label="Files in circulation"
          value={formatNumber(k.inCirculation)}
          icon={<Files className="h-5 w-5" />}
          tone="accent"
          hint={`${formatNumber(k.totalFiles)} files total`}
        />
        <StatCard
          label="Awaiting action"
          value={formatNumber(k.awaiting)}
          icon={<AlertTriangle className="h-5 w-5" />}
          tone="warning"
          hint={`${formatNumber(k.outstanding)} outstanding movements`}
        />
      </div>

      {/* Correspondence volume trend */}
      <Card>
        <CardHeader
          title="Correspondence volume"
          description="Incoming vs outgoing correspondence over the last 6 months"
        />
        <CardContent>
          <AreaTrend
            data={correspondenceTrend}
            xKey="month"
            height={280}
            series={[
              { key: "incoming", name: "Incoming", colorIndex: 1 },
              { key: "outgoing", name: "Outgoing", colorIndex: 0 },
            ]}
          />
        </CardContent>
      </Card>

      {/* Section tabs */}
      <div className="space-y-5">
        <SegmentedTabs
          tabs={[
            { value: "correspondence", label: "Correspondence", count: correspondence.length },
            { value: "files", label: "Project Files", count: projectFiles.length },
            { value: "movements", label: "File Movements", count: fileMovements.length },
          ]}
          value={section}
          onChange={(v) => setSection(v as SectionValue)}
        />

        {section === "correspondence" && (
          <Card>
            <CardContent>
              <DataTable
                columns={correspondenceColumns}
                data={correspondence}
                searchKeys={["ref", "subject", "from", "to", "category"]}
                searchPlaceholder="Search correspondence…"
                pageSize={8}
                onRowClick={(row) => setSelected(row)}
              />
            </CardContent>
          </Card>
        )}

        {section === "files" && (
          <div className="grid gap-5 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent>
                <DataTable
                  columns={projectFileColumns}
                  data={projectFiles}
                  searchKeys={["ref", "title", "category", "heldBy"]}
                  searchPlaceholder="Search project files…"
                  pageSize={8}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="Files by category" description="Top categories by file count" />
              <CardContent>
                <BarList items={filesByCategory} />
              </CardContent>
            </Card>
          </div>
        )}

        {section === "movements" && (
          <Card>
            <CardContent>
              <DataTable
                columns={movementColumns}
                data={fileMovements}
                searchKeys={["fileRef", "fileTitle", "from", "to", "purpose"]}
                searchPlaceholder="Search file movements…"
                pageSize={8}
              />
            </CardContent>
          </Card>
        )}
      </div>

      {/* Correspondence detail drawer */}
      <Drawer
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.ref}
        description={selected?.subject}
      >
        {selected && (
          <div className="divide-y divide-border">
            <DetailRow label="Reference">{selected.ref}</DetailRow>
            <DetailRow label="Subject">{selected.subject}</DetailRow>
            <DetailRow label="Type">
              <Badge tone={typeTone[selected.type]}>{selected.type}</Badge>
            </DetailRow>
            <DetailRow label="From">{selected.from}</DetailRow>
            <DetailRow label="To">{selected.to}</DetailRow>
            <DetailRow label="Date">{selected.date}</DetailRow>
            <DetailRow label="Category">{selected.category}</DetailRow>
            <DetailRow label="Priority">
              <Badge tone={priorityTone[selected.priority]}>{selected.priority}</Badge>
            </DetailRow>
            <DetailRow label="Status">
              <StatusBadge status={selected.status} />
            </DetailRow>
            <DetailRow label="Assigned to">{selected.assignedTo}</DetailRow>
          </div>
        )}
      </Drawer>
    </div>
  );
}
