export interface ActivityItem {
  id: string;
  actor: string;
  action: string;
  target: string;
  time: string;
  type: "attendance" | "registry" | "contract" | "procurement" | "office" | "visitor" | "meeting" | "leave";
}

export const activityFeed: ActivityItem[] = [
  { id: "act-01", actor: "Grace Yakubu", action: "dispatched", target: "Q2 Interim Financial Report to World Bank", time: "18 min ago", type: "registry" },
  { id: "act-02", actor: "Front Desk", action: "checked in visitor", target: "Barr. Nuhu Adamu (Ministry of Justice)", time: "42 min ago", type: "visitor" },
  { id: "act-03", actor: "Engr. Musa Adamu", action: "advanced", target: "IT Equipment procurement to Bid Evaluation", time: "1 hr ago", type: "procurement" },
  { id: "act-04", actor: "Dr. Amina Bello", action: "approved", target: "Advance payment for Borehole Lot 2", time: "2 hr ago", type: "contract" },
  { id: "act-05", actor: "Samuel Ndyanabo", action: "released file", target: "SOLID/PAY/031 to Finance", time: "3 hr ago", type: "registry" },
  { id: "act-06", actor: "Fatima Aliyu", action: "logged maintenance", target: "Conference Room A air-conditioning fault", time: "4 hr ago", type: "office" },
  { id: "act-07", actor: "Lepwa Blessing Zadok", action: "recorded leave", target: "Zainab Umar — Sick leave (4 days)", time: "5 hr ago", type: "leave" },
  { id: "act-08", actor: "Rebecca Iliya", action: "closed action point", target: "Q1 audit query response", time: "Yesterday", type: "meeting" },
  { id: "act-09", actor: "Peter Danladi", action: "submitted", target: "Back-to-Office report — Mubi field verification", time: "Yesterday", type: "registry" },
  { id: "act-10", actor: "Yusuf Garba", action: "checked out vehicle", target: "Toyota Hilux ADM-411-SOL for Numan trip", time: "Yesterday", type: "office" },
];

export interface Alert {
  id: string;
  title: string;
  detail: string;
  severity: "critical" | "warning" | "info";
  due: string;
  href: string;
}

export const alerts: Alert[] = [
  { id: "al-01", title: "APG expiring in 3 days", detail: "BuildRight Ventures — Community Market Stalls advance guarantee lapses 10 Jul.", severity: "critical", due: "2026-07-10", href: "/dashboard/contracts" },
  { id: "al-02", title: "Overdue payment milestone", detail: "IPC 1 for Community Market Stalls is past due (28 Jun).", severity: "critical", due: "2026-06-28", href: "/dashboard/contracts" },
  { id: "al-03", title: "Action point overdue", detail: "Generator repair & power redundancy due 7 Jul — parts delayed.", severity: "warning", due: "2026-07-07", href: "/dashboard/meetings" },
  { id: "al-04", title: "Bid evaluation due", detail: "Additional vehicles (SPN-011) evaluation to conclude by 10 Jul.", severity: "warning", due: "2026-07-10", href: "/dashboard/procurement" },
  { id: "al-05", title: "3 files awaiting action", detail: "Payment, maintenance and audit files pending sign-off.", severity: "info", due: "2026-07-08", href: "/dashboard/registry" },
];

export interface Notification {
  id: string;
  title: string;
  time: string;
  read: boolean;
  type: "contract" | "procurement" | "meeting" | "registry" | "attendance";
}

export const notifications: Notification[] = [
  { id: "n-01", title: "APG for BuildRight Ventures expires in 3 days", time: "10 min ago", read: false, type: "contract" },
  { id: "n-02", title: "Q2 Financial Report dispatched successfully", time: "18 min ago", read: false, type: "registry" },
  { id: "n-03", title: "Bid evaluation scheduled — Additional vehicles", time: "1 hr ago", read: false, type: "procurement" },
  { id: "n-04", title: "6 action points raised in July W1 meeting", time: "Yesterday", read: true, type: "meeting" },
  { id: "n-05", title: "Attendance rate reached 94% this month", time: "Yesterday", read: true, type: "attendance" },
];
