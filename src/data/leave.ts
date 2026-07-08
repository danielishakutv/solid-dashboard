import { staff } from "./staff";

export type LeaveType = "Annual" | "Casual" | "Sick" | "Maternity" | "Official Assignment" | "Training";

export interface LeaveRecord {
  id: string;
  staffId: string;
  name: string;
  role: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  days: number;
  status: "Approved" | "Pending" | "Ongoing" | "Completed" | "Rejected";
  reliever?: string;
}

export const leaveRecords: LeaveRecord[] = [
  { id: "lv-01", staffId: "s-06", name: "Hauwa Suleiman", role: "Environmental Safeguards Officer", type: "Annual", startDate: "2026-07-02", endDate: "2026-07-16", days: 11, status: "Ongoing", reliever: "Emmanuel Terkula" },
  { id: "lv-02", staffId: "s-12", name: "Zainab Umar", role: "Account / Cashier", type: "Sick", startDate: "2026-07-06", endDate: "2026-07-10", days: 4, status: "Ongoing", reliever: "Grace Yakubu" },
  { id: "lv-03", staffId: "s-05", name: "Peter Danladi", role: "M&E Officer", type: "Official Assignment", startDate: "2026-07-05", endDate: "2026-07-09", days: 5, status: "Ongoing", reliever: "—" },
  { id: "lv-04", staffId: "s-03", name: "Engr. Musa Adamu", role: "Procurement Officer", type: "Official Assignment", startDate: "2026-07-07", endDate: "2026-07-07", days: 1, status: "Ongoing", reliever: "John Bitrus" },
  { id: "lv-05", staffId: "s-09", name: "Ibrahim Musa", role: "Communications Officer", type: "Annual", startDate: "2026-07-21", endDate: "2026-08-01", days: 10, status: "Approved", reliever: "Fatima Aliyu" },
  { id: "lv-06", staffId: "s-13", name: "John Bitrus", role: "Procurement Assistant", type: "Casual", startDate: "2026-07-14", endDate: "2026-07-15", days: 2, status: "Pending", reliever: "—" },
  { id: "lv-07", staffId: "s-04", name: "Grace Yakubu", role: "Financial Management Specialist", type: "Training", startDate: "2026-07-28", endDate: "2026-07-31", days: 4, status: "Approved", reliever: "Zainab Umar" },
  { id: "lv-08", staffId: "s-14", name: "Mary Joseph", role: "Admin Assistant", type: "Annual", startDate: "2026-08-04", endDate: "2026-08-13", days: 8, status: "Pending", reliever: "Comfort Elisha" },
  { id: "lv-09", staffId: "s-16", name: "Comfort Elisha", role: "Office Assistant", type: "Casual", startDate: "2026-06-23", endDate: "2026-06-24", days: 2, status: "Completed", reliever: "—" },
  { id: "lv-10", staffId: "s-07", name: "Emmanuel Terkula", role: "Social Safeguards Officer", type: "Training", startDate: "2026-08-11", endDate: "2026-08-14", days: 4, status: "Approved", reliever: "—" },
  { id: "lv-11", staffId: "s-10", name: "Fatima Aliyu", role: "ICT / Data Officer", type: "Annual", startDate: "2026-06-09", endDate: "2026-06-13", days: 5, status: "Completed", reliever: "Ibrahim Musa" },
];

export const leaveTypeDistribution = [
  { name: "Annual", value: staff.reduce((s, x) => s + x.leave.annualUsed, 0) },
  { name: "Casual", value: 9 },
  { name: "Sick", value: 14 },
  { name: "Maternity", value: 0 },
  { name: "Training", value: 12 },
];

/** Leave & assignment forecast for staffing continuity (next 6 weeks). */
export const leaveForecast = [
  { week: "Wk 28", onLeave: 3, assignment: 2, training: 0 },
  { week: "Wk 29", onLeave: 2, assignment: 1, training: 0 },
  { week: "Wk 30", onLeave: 2, assignment: 1, training: 1 },
  { week: "Wk 31", onLeave: 1, assignment: 0, training: 2 },
  { week: "Wk 32", onLeave: 2, assignment: 1, training: 1 },
  { week: "Wk 33", onLeave: 1, assignment: 2, training: 1 },
];

export function leaveKpis() {
  const onLeaveNow = leaveRecords.filter((l) => l.status === "Ongoing").length;
  const pending = leaveRecords.filter((l) => l.status === "Pending").length;
  const upcoming = leaveRecords.filter((l) => l.status === "Approved").length;
  const avgBalance = Math.round(
    staff.reduce((s, x) => s + (x.leave.annual - x.leave.annualUsed), 0) / staff.length,
  );
  return { onLeaveNow, pending, upcoming, avgBalance };
}
