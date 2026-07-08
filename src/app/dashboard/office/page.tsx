"use client";

import { useState } from "react";
import {
  Building2,
  Download,
  Plus,
  Package,
  AlertTriangle,
  Wrench,
  Car,
  Fuel,
  Users,
  CalendarClock,
  Gauge,
} from "lucide-react";
import { PageHeader, SectionTitle } from "@/components/ui/page-header";
import { StatCard } from "@/components/ui/stat-card";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge, StatusBadge, type BadgeTone } from "@/components/ui/badge";
import { DataTable, type Column } from "@/components/ui/data-table";
import { Drawer } from "@/components/ui/drawer";
import { DetailRow, EmptyState } from "@/components/ui/misc";
import { SegmentedTabs } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { DonutChart } from "@/components/charts";
import {
  assets,
  vehicles,
  maintenanceRequests,
  roomBookings,
  assetsByCategory,
  officeKpis,
  type Asset,
  type Vehicle,
  type MaintenanceRequest,
  type RoomBooking,
} from "@/data/office";
import { formatNaira, formatNumber } from "@/lib/utils";

type SectionValue = "assets" | "fleet" | "maintenance" | "rooms";

const TODAY = "2026-07-07";

const conditionTone: Record<Asset["condition"], BadgeTone> = {
  Excellent: "success",
  Good: "info",
  Fair: "warning",
  "Needs Repair": "danger",
};

const priorityTone: Record<MaintenanceRequest["priority"], BadgeTone> = {
  High: "danger",
  Medium: "warning",
  Low: "neutral",
};

const vehicleStatusTone: Record<Vehicle["status"], BadgeTone> = {
  Available: "success",
  "On Trip": "info",
  Maintenance: "warning",
};

const bookingStatusTone: Record<RoomBooking["status"], BadgeTone> = {
  Confirmed: "success",
  Pending: "warning",
};

export default function OfficeAdministrationPage() {
  const k = officeKpis();
  const [section, setSection] = useState<SectionValue>("assets");
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const highPriorityOpen = maintenanceRequests.filter(
    (m) => m.priority === "High" && m.status !== "Completed",
  ).length;

  const todaysBookings = roomBookings.filter((b) => b.date === TODAY);
  const upcomingBookings = roomBookings.filter((b) => b.date !== TODAY);

  const assetColumns: Column<Asset>[] = [
    {
      key: "tag",
      header: "Tag",
      sortable: true,
      className: "font-mono text-xs font-semibold text-foreground",
    },
    {
      key: "name",
      header: "Name",
      render: (row) => (
        <span className="block max-w-[220px] truncate font-medium text-foreground" title={row.name}>
          {row.name}
        </span>
      ),
    },
    { key: "category", header: "Category", hideOnMobile: true },
    { key: "location", header: "Location", hideOnMobile: true },
    {
      key: "condition",
      header: "Condition",
      render: (row) => <Badge tone={conditionTone[row.condition]}>{row.condition}</Badge>,
    },
    {
      key: "value",
      header: "Value",
      align: "right",
      sortable: true,
      accessor: (row) => row.value,
      render: (row) => formatNaira(row.value, { compact: true }),
    },
    {
      key: "status",
      header: "Status",
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  const maintenanceColumns: Column<MaintenanceRequest>[] = [
    {
      key: "ref",
      header: "Ref",
      className: "font-mono text-xs font-semibold text-foreground",
    },
    {
      key: "item",
      header: "Item",
      render: (row) => (
        <span className="block max-w-[240px] truncate font-medium text-foreground" title={row.item}>
          {row.item}
        </span>
      ),
    },
    { key: "category", header: "Category", hideOnMobile: true },
    { key: "reportedBy", header: "Reported by", hideOnMobile: true },
    {
      key: "priority",
      header: "Priority",
      render: (row) => <Badge tone={priorityTone[row.priority]}>{row.priority}</Badge>,
    },
    { key: "assignedTo", header: "Assigned to" },
    {
      key: "cost",
      header: "Cost",
      align: "right",
      accessor: (row) => row.cost ?? 0,
      render: (row) => (row.cost ? formatNaira(row.cost) : "—"),
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
        title="Office Administration"
        description="Track assets, vehicle fleet, facility maintenance and meeting room bookings across the office."
        icon={<Building2 className="h-6 w-6" />}
        actions={
          <>
            <Button variant="outline" size="md">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="md">
              <Plus className="h-4 w-4" />
              New request
            </Button>
          </>
        }
      />

      {/* KPI row */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total assets"
          value={formatNumber(k.totalAssets)}
          icon={<Package className="h-5 w-5" />}
          tone="primary"
          hint={`${formatNaira(k.assetValue, { compact: true })} value`}
        />
        <StatCard
          label="Needs repair"
          value={k.needsRepair}
          icon={<AlertTriangle className="h-5 w-5" />}
          tone="danger"
          hint="Flagged assets"
        />
        <StatCard
          label="Open maintenance"
          value={k.openMaintenance}
          icon={<Wrench className="h-5 w-5" />}
          tone="warning"
          hint={`${highPriorityOpen} high priority`}
        />
        <StatCard
          label="Fleet available"
          value={`${k.vehiclesAvailable}/${k.totalVehicles}`}
          icon={<Car className="h-5 w-5" />}
          tone="success"
          hint={`${k.utilisation}% utilisation`}
        />
      </div>

      {/* Section tabs */}
      <div className="space-y-5">
        <SegmentedTabs
          tabs={[
            { value: "assets", label: "Assets", count: assets.length },
            { value: "fleet", label: "Fleet", count: vehicles.length },
            { value: "maintenance", label: "Maintenance", count: maintenanceRequests.length },
            { value: "rooms", label: "Rooms", count: roomBookings.length },
          ]}
          value={section}
          onChange={(v) => setSection(v as SectionValue)}
        />

        {section === "assets" && (
          <div className="grid gap-5 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardContent>
                <DataTable
                  columns={assetColumns}
                  data={assets}
                  searchKeys={["tag", "name", "category", "assignedTo"]}
                  searchPlaceholder="Search assets…"
                  pageSize={8}
                  onRowClick={(row) => setSelectedAsset(row)}
                />
              </CardContent>
            </Card>
            <Card>
              <CardHeader title="By category" description="Asset count by category" />
              <CardContent>
                <DonutChart
                  data={assetsByCategory}
                  centerValue={String(k.totalAssets)}
                  centerLabel="Assets"
                />
              </CardContent>
            </Card>
          </div>
        )}

        {section === "fleet" && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <Card key={v.id} className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-display text-lg font-extrabold tracking-tight text-foreground">
                      {v.plate}
                    </p>
                    <p className="text-sm text-muted-foreground">{v.model}</p>
                  </div>
                  <Badge tone={vehicleStatusTone[v.status]}>{v.status}</Badge>
                </div>

                <div>
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 font-semibold text-foreground">
                      <Fuel className="h-3.5 w-3.5 text-muted-foreground" />
                      Fuel {v.fuelLevel}%
                    </span>
                  </div>
                  <Progress value={v.fuelLevel} tone={v.fuelLevel > 50 ? "success" : "warning"} />
                </div>

                <div className="divide-y divide-border rounded-xl border border-border px-3">
                  <DetailRow label="Driver">{v.driver}</DetailRow>
                  <DetailRow label="Mileage">
                    <span className="inline-flex items-center gap-1">
                      <Gauge className="h-3.5 w-3.5 text-muted-foreground" />
                      {formatNumber(v.mileage)} km
                    </span>
                  </DetailRow>
                  <DetailRow label="Last service">{v.lastService}</DetailRow>
                  <DetailRow label="Next service">{v.nextService}</DetailRow>
                  <DetailRow label="Trips completed">{v.trips}</DetailRow>
                </div>
              </Card>
            ))}
          </div>
        )}

        {section === "maintenance" && (
          <Card>
            <CardContent>
              <DataTable
                columns={maintenanceColumns}
                data={maintenanceRequests}
                searchKeys={["ref", "item", "category", "reportedBy", "assignedTo"]}
                searchPlaceholder="Search maintenance requests…"
                pageSize={8}
              />
            </CardContent>
          </Card>
        )}

        {section === "rooms" && (
          <div className="space-y-6">
            <Card>
              <CardHeader
                title="Today's bookings"
                description={`${todaysBookings.length} booking${todaysBookings.length === 1 ? "" : "s"} scheduled for today`}
                icon={<CalendarClock className="h-5 w-5" />}
              />
              <CardContent>
                {todaysBookings.length === 0 ? (
                  <EmptyState
                    icon={<CalendarClock size={22} />}
                    title="No bookings today"
                    description="Meeting rooms are free for the rest of the day."
                  />
                ) : (
                  <div className="space-y-3">
                    {todaysBookings.map((b) => (
                      <div
                        key={b.id}
                        className="flex flex-col gap-3 rounded-xl border border-border p-4 sm:flex-row sm:items-center"
                      >
                        <div className="flex h-14 w-20 shrink-0 flex-col items-center justify-center rounded-lg bg-surface-2 text-center">
                          <span className="font-display text-sm font-extrabold text-foreground">
                            {b.start}–{b.end}
                          </span>
                          <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                            {b.room}
                          </span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="truncate font-semibold text-foreground">{b.title}</p>
                            <Badge tone={bookingStatusTone[b.status]}>{b.status}</Badge>
                          </div>
                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            Organized by {b.organizer}
                          </p>
                        </div>
                        <div className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
                          <Users className="h-3.5 w-3.5" />
                          {b.attendees} attendees
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="space-y-4">
              <SectionTitle>Upcoming bookings ({upcomingBookings.length})</SectionTitle>
              {upcomingBookings.length === 0 ? (
                <Card>
                  <CardContent>
                    <EmptyState
                      icon={<CalendarClock size={22} />}
                      title="No upcoming bookings"
                      description="New room bookings will appear here."
                    />
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {upcomingBookings.map((b) => (
                    <Card key={b.id} className="space-y-3 p-5">
                      <div className="flex items-center justify-between gap-2">
                        <Badge tone="neutral">{b.room}</Badge>
                        <Badge tone={bookingStatusTone[b.status]}>{b.status}</Badge>
                      </div>
                      <p className="font-semibold text-foreground">{b.title}</p>
                      <div className="space-y-1 text-xs text-muted-foreground">
                        <p>
                          {new Date(b.date).toLocaleDateString("en-NG", {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          })}{" "}
                          · {b.start}–{b.end}
                        </p>
                        <p>Organizer: {b.organizer}</p>
                        <p className="flex items-center gap-1.5">
                          <Users className="h-3.5 w-3.5" />
                          {b.attendees} attendees
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Asset detail drawer */}
      <Drawer
        open={!!selectedAsset}
        onClose={() => setSelectedAsset(null)}
        title={selectedAsset?.tag}
        description={selectedAsset?.name}
      >
        {selectedAsset && (
          <div className="divide-y divide-border">
            <DetailRow label="Tag">{selectedAsset.tag}</DetailRow>
            <DetailRow label="Name">{selectedAsset.name}</DetailRow>
            <DetailRow label="Category">{selectedAsset.category}</DetailRow>
            <DetailRow label="Location">{selectedAsset.location}</DetailRow>
            <DetailRow label="Assigned to">{selectedAsset.assignedTo}</DetailRow>
            <DetailRow label="Condition">
              <Badge tone={conditionTone[selectedAsset.condition]}>{selectedAsset.condition}</Badge>
            </DetailRow>
            <DetailRow label="Purchase date">{selectedAsset.purchaseDate}</DetailRow>
            <DetailRow label="Value">{formatNaira(selectedAsset.value)}</DetailRow>
            <DetailRow label="Status">
              <StatusBadge status={selectedAsset.status} />
            </DetailRow>
          </div>
        )}
      </Drawer>
    </div>
  );
}
