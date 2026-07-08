import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  Clock,
  FolderOpen,
  FileSignature,
  ShoppingCart,
  Building2,
  Users,
  UserCheck,
  ClipboardCheck,
  CalendarRange,
  PlaneTakeoff,
  BarChart3,
  Settings,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, description: "Monthly administrative performance" },
    ],
  },
  {
    label: "Human Resources",
    items: [
      { label: "Attendance", href: "/dashboard/attendance", icon: Clock, description: "Staff check-in & availability" },
      { label: "Staff Directory", href: "/dashboard/staff", icon: Users, description: "Personnel records" },
      { label: "Leave Planner", href: "/dashboard/leave", icon: PlaneTakeoff, description: "Leave & continuity planning" },
    ],
  },
  {
    label: "Records & Registry",
    items: [
      { label: "Registry & Files", href: "/dashboard/registry", icon: FolderOpen, description: "Correspondence & file movement" },
    ],
  },
  {
    label: "Contracts & Procurement",
    items: [
      { label: "Contracts & Payments", href: "/dashboard/contracts", icon: FileSignature, description: "Contract & payment monitoring" },
      { label: "Procurement", href: "/dashboard/procurement", icon: ShoppingCart, description: "Procurement pipeline" },
      { label: "Calendar", href: "/dashboard/calendar", icon: CalendarRange, description: "Procurement & contract milestones" },
    ],
  },
  {
    label: "Operations",
    items: [
      { label: "Office Administration", href: "/dashboard/office", icon: Building2, description: "Assets, fleet & facilities" },
      { label: "Visitor Management", href: "/dashboard/visitors", icon: UserCheck, description: "Visitor register & badges" },
      { label: "Meeting Tracker", href: "/dashboard/meetings", icon: ClipboardCheck, description: "Action point follow-up" },
    ],
  },
  {
    label: "Insights",
    items: [
      { label: "Reports", href: "/dashboard/reports", icon: BarChart3, description: "Administrative reports" },
      { label: "Settings", href: "/dashboard/settings", icon: Settings, description: "Preferences & account" },
    ],
  },
];

export const allNavItems = navGroups.flatMap((g) => g.items);
