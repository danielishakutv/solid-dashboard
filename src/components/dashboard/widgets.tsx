import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  FolderOpen,
  FileSignature,
  ShoppingCart,
  Building2,
  UserCheck,
  ClipboardCheck,
} from "lucide-react";
import { alerts as allAlerts, activityFeed, type ActivityItem } from "@/data/activity";
import { cn } from "@/lib/utils";

const severityStyles = {
  critical: { ring: "border-danger/30 bg-danger-soft", icon: "text-danger", dot: "bg-danger" },
  warning: { ring: "border-warning/30 bg-warning-soft", icon: "text-warning", dot: "bg-warning" },
  info: { ring: "border-info/30 bg-info-soft", icon: "text-info", dot: "bg-info" },
};

export function AlertsPanel({ limit }: { limit?: number }) {
  const list = limit ? allAlerts.slice(0, limit) : allAlerts;
  return (
    <div className="space-y-2.5">
      {list.map((a) => {
        const s = severityStyles[a.severity];
        return (
          <Link
            key={a.id}
            href={a.href}
            className={cn(
              "group flex items-start gap-3 rounded-xl border p-3.5 transition-all hover:shadow-soft",
              s.ring,
            )}
          >
            <AlertTriangle className={cn("mt-0.5 h-5 w-5 shrink-0", s.icon)} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-foreground">{a.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{a.detail}</p>
            </div>
            <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        );
      })}
    </div>
  );
}

const typeIcon: Record<ActivityItem["type"], typeof Clock> = {
  attendance: Clock,
  registry: FolderOpen,
  contract: FileSignature,
  procurement: ShoppingCart,
  office: Building2,
  visitor: UserCheck,
  meeting: ClipboardCheck,
  leave: Clock,
};

const typeTone: Record<ActivityItem["type"], string> = {
  attendance: "bg-success-soft text-success",
  registry: "bg-info-soft text-info",
  contract: "bg-primary-soft text-primary",
  procurement: "bg-accent/10 text-accent",
  office: "bg-warning-soft text-warning",
  visitor: "bg-info-soft text-info",
  meeting: "bg-primary-soft text-primary",
  leave: "bg-success-soft text-success",
};

export function ActivityFeed({ limit }: { limit?: number }) {
  const items = limit ? activityFeed.slice(0, limit) : activityFeed;
  return (
    <ul className="space-y-1">
      {items.map((item, i) => {
        const Icon = typeIcon[item.type];
        return (
          <li key={item.id} className="relative flex gap-3 pb-4 last:pb-0">
            {i < items.length - 1 && (
              <span className="absolute left-[18px] top-9 h-full w-px bg-border" />
            )}
            <span
              className={cn(
                "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                typeTone[item.type],
              )}
            >
              <Icon className="h-4 w-4" />
            </span>
            <div className="min-w-0 flex-1 pt-1">
              <p className="text-sm leading-snug text-foreground">
                <span className="font-bold">{item.actor}</span>{" "}
                <span className="text-muted-foreground">{item.action}</span>{" "}
                <span className="font-medium">{item.target}</span>
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">{item.time}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
