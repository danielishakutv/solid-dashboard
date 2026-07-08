export type ContractStatus = "Active" | "Ongoing" | "Completed" | "Pending" | "Overdue";
export type PaymentStatus = "Paid" | "Pending" | "Due" | "Overdue" | "Scheduled";

export interface Contract {
  id: string;
  ref: string;
  title: string;
  contractor: string;
  category: "Works" | "Goods" | "Consultancy" | "Non-Consulting";
  value: number;
  paid: number;
  startDate: string;
  endDate: string;
  status: ContractStatus;
  progress: number;
  apgValidTo?: string;
  manager: string;
}

export interface PaymentMilestone {
  id: string;
  contractRef: string;
  contractTitle: string;
  contractor: string;
  milestone: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  type: "Advance" | "Interim" | "Tranche" | "Final" | "Retention";
}

export const contracts: Contract[] = [
  { id: "ct-01", ref: "SOLID/W/2026/007", title: "Borehole Rehabilitation — Lot 2 (12 sites)", contractor: "AquaFlow Nigeria Ltd", category: "Works", value: 184_500_000, paid: 55_350_000, startDate: "2026-07-01", endDate: "2026-12-15", status: "Active", progress: 18, apgValidTo: "2026-09-30", manager: "Engr. Musa Adamu" },
  { id: "ct-02", ref: "SOLID/W/2026/004", title: "Access Road Works — Numan Corridor (8.5km)", contractor: "GRV-Works Ltd", category: "Works", value: 642_000_000, paid: 288_900_000, startDate: "2026-04-20", endDate: "2026-11-30", status: "Ongoing", progress: 45, apgValidTo: "2026-08-14", manager: "Engr. Musa Adamu" },
  { id: "ct-03", ref: "SOLID/C/2026/002", title: "Baseline & Feasibility Study — Livelihoods", contractor: "SahelDev Consult", category: "Consultancy", value: 96_800_000, paid: 77_440_000, startDate: "2026-03-10", endDate: "2026-08-20", status: "Ongoing", progress: 80, manager: "Peter Danladi" },
  { id: "ct-04", ref: "SOLID/G/2026/012", title: "Supply of Office IT Equipment", contractor: "TechBridge Systems", category: "Goods", value: 41_200_000, paid: 0, startDate: "2026-07-25", endDate: "2026-09-10", status: "Pending", progress: 0, manager: "Fatima Aliyu" },
  { id: "ct-05", ref: "SOLID/G/2026/009", title: "Supply of Project Vehicles (2 units)", contractor: "Northern Motors Ltd", category: "Goods", value: 78_000_000, paid: 39_000_000, startDate: "2026-05-15", endDate: "2026-08-05", status: "Ongoing", progress: 60, apgValidTo: "2026-08-31", manager: "Lepwa Blessing Zadok" },
  { id: "ct-06", ref: "SOLID/C/2026/006", title: "Environmental & Social Impact Assessment", contractor: "GreenAudit Partners", category: "Consultancy", value: 58_400_000, paid: 58_400_000, startDate: "2026-02-18", endDate: "2026-06-30", status: "Completed", progress: 100, manager: "Hauwa Suleiman" },
  { id: "ct-07", ref: "SOLID/N/2026/003", title: "Office Security — CCTV & Access Control", contractor: "SecureGate Ltd", category: "Non-Consulting", value: 22_300_000, paid: 22_300_000, startDate: "2025-11-20", endDate: "2026-02-28", status: "Completed", progress: 100, manager: "Daniel Ayuba" },
  { id: "ct-08", ref: "SOLID/W/2026/010", title: "Rehabilitation of Community Market Stalls", contractor: "BuildRight Ventures", category: "Works", value: 127_600_000, paid: 25_520_000, startDate: "2026-06-05", endDate: "2026-10-30", status: "Overdue", progress: 22, apgValidTo: "2026-07-10", manager: "Engr. Musa Adamu" },
  { id: "ct-09", ref: "SOLID/C/2026/008", title: "Financial Management System Consultancy", contractor: "LedgerLogic Advisory", category: "Consultancy", value: 34_900_000, paid: 17_450_000, startDate: "2026-05-02", endDate: "2026-09-15", status: "Ongoing", progress: 52, manager: "Grace Yakubu" },
  { id: "ct-10", ref: "SOLID/G/2026/014", title: "Supply of Office Furniture & Fittings", contractor: "Sahel Furnitures Ltd", category: "Goods", value: 18_700_000, paid: 18_700_000, startDate: "2026-05-10", endDate: "2026-06-25", status: "Completed", progress: 100, manager: "Mary Joseph" },
];

export const paymentMilestones: PaymentMilestone[] = [
  { id: "pm-01", contractRef: "SOLID/W/2026/007", contractTitle: "Borehole Rehabilitation Lot 2", contractor: "AquaFlow Nigeria Ltd", milestone: "Advance Payment (30%)", amount: 55_350_000, dueDate: "2026-07-05", status: "Paid", type: "Advance" },
  { id: "pm-02", contractRef: "SOLID/W/2026/007", contractTitle: "Borehole Rehabilitation Lot 2", contractor: "AquaFlow Nigeria Ltd", milestone: "IPC 1 — 40% works", amount: 36_900_000, dueDate: "2026-08-30", status: "Scheduled", type: "Interim" },
  { id: "pm-03", contractRef: "SOLID/W/2026/004", contractTitle: "Access Road Works, Numan", contractor: "GRV-Works Ltd", milestone: "IPC 2 — subgrade completion", amount: 96_300_000, dueDate: "2026-07-12", status: "Due", type: "Interim" },
  { id: "pm-04", contractRef: "SOLID/C/2026/002", contractTitle: "Baseline & Feasibility Study", contractor: "SahelDev Consult", milestone: "Draft final report", amount: 19_360_000, dueDate: "2026-07-18", status: "Pending", type: "Tranche" },
  { id: "pm-05", contractRef: "SOLID/G/2026/009", contractTitle: "Supply of Project Vehicles", contractor: "Northern Motors Ltd", milestone: "Delivery & inspection (50%)", amount: 39_000_000, dueDate: "2026-07-09", status: "Due", type: "Interim" },
  { id: "pm-06", contractRef: "SOLID/W/2026/010", contractTitle: "Community Market Stalls", contractor: "BuildRight Ventures", milestone: "IPC 1 — foundations", amount: 25_520_000, dueDate: "2026-06-28", status: "Overdue", type: "Interim" },
  { id: "pm-07", contractRef: "SOLID/C/2026/009", contractTitle: "FMS Consultancy", contractor: "LedgerLogic Advisory", milestone: "Milestone 2 — configuration", amount: 8_725_000, dueDate: "2026-07-22", status: "Pending", type: "Tranche" },
  { id: "pm-08", contractRef: "SOLID/C/2026/002", contractTitle: "Baseline & Feasibility Study", contractor: "SahelDev Consult", milestone: "Retention release", amount: 4_840_000, dueDate: "2026-08-25", status: "Scheduled", type: "Retention" },
  { id: "pm-09", contractRef: "SOLID/W/2026/004", contractTitle: "Access Road Works, Numan", contractor: "GRV-Works Ltd", milestone: "Advance Payment (30%)", amount: 192_600_000, dueDate: "2026-04-25", status: "Paid", type: "Advance" },
  { id: "pm-10", contractRef: "SOLID/G/2026/012", contractTitle: "Office IT Equipment", contractor: "TechBridge Systems", milestone: "Advance Payment (25%)", amount: 10_300_000, dueDate: "2026-07-28", status: "Scheduled", type: "Advance" },
];

/** Contract portfolio value trend by month (₦ millions committed vs disbursed). */
export const disbursementTrend = [
  { month: "Feb", committed: 80, disbursed: 22 },
  { month: "Mar", committed: 177, disbursed: 61 },
  { month: "Apr", committed: 819, disbursed: 254 },
  { month: "May", committed: 916, disbursed: 331 },
  { month: "Jun", committed: 1044, disbursed: 468 },
  { month: "Jul", committed: 1228, disbursed: 583 },
];

export function contractKpis() {
  const totalValue = contracts.reduce((s, c) => s + c.value, 0);
  const totalPaid = contracts.reduce((s, c) => s + c.paid, 0);
  const active = contracts.filter((c) => ["Active", "Ongoing"].includes(c.status)).length;
  const completed = contracts.filter((c) => c.status === "Completed").length;
  const overdue = contracts.filter((c) => c.status === "Overdue").length;
  const pendingPayments = paymentMilestones.filter((p) => ["Due", "Pending", "Overdue"].includes(p.status));
  const pendingAmount = pendingPayments.reduce((s, p) => s + p.amount, 0);
  const apgExpiringSoon = contracts.filter((c) => c.apgValidTo && c.apgValidTo <= "2026-08-15").length;
  return {
    totalValue,
    totalPaid,
    outstanding: totalValue - totalPaid,
    active,
    completed,
    overdue,
    pendingPaymentsCount: pendingPayments.length,
    pendingAmount,
    apgExpiringSoon,
    disbursementRate: Math.round((totalPaid / totalValue) * 100),
  };
}
