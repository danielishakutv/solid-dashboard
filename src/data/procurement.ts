export type ProcStage =
  | "Planning"
  | "Bid Preparation"
  | "Advertised"
  | "Bid Evaluation"
  | "No-Objection"
  | "Contract Award"
  | "Completed";

export type ProcMethod = "ICB" | "NCB" | "Shopping" | "QCBS" | "Direct" | "RFQ";

export interface Procurement {
  id: string;
  ref: string;
  title: string;
  method: ProcMethod;
  category: "Works" | "Goods" | "Consultancy" | "Non-Consulting";
  stage: ProcStage;
  estimatedValue: number;
  bidClosing: string;
  evaluationDate?: string;
  awardDate?: string;
  noObjection: "Not Required" | "Pending" | "Granted";
  progress: number;
  owner: string;
}

export interface CalendarEvent {
  id: string;
  date: string;
  title: string;
  type: "Bid Closing" | "Evaluation" | "Award" | "Contract Start" | "Contract End" | "APG Expiry" | "Payment Due" | "Milestone";
  ref: string;
  tone: "info" | "warning" | "danger" | "success" | "accent";
}

export const procurements: Procurement[] = [
  { id: "p-01", ref: "SOLID/SPN-014", title: "Office IT Equipment (laptops, servers, network)", method: "NCB", category: "Goods", stage: "Advertised", estimatedValue: 41_200_000, bidClosing: "2026-07-24", evaluationDate: "2026-07-28", noObjection: "Granted", progress: 55, owner: "Engr. Musa Adamu" },
  { id: "p-02", ref: "SOLID/SPN-011", title: "Project Vehicles — Additional 2 units", method: "ICB", category: "Goods", stage: "Bid Evaluation", estimatedValue: 82_000_000, bidClosing: "2026-07-02", evaluationDate: "2026-07-10", noObjection: "Pending", progress: 68, owner: "Engr. Musa Adamu" },
  { id: "p-03", ref: "SOLID/RFP-005", title: "Livelihoods Impact Evaluation Consultancy", method: "QCBS", category: "Consultancy", stage: "Bid Preparation", estimatedValue: 64_500_000, bidClosing: "2026-08-08", noObjection: "Pending", progress: 30, owner: "Peter Danladi" },
  { id: "p-04", ref: "SOLID/SPW-018", title: "Rehabilitation of 3 Rural Health Posts", method: "NCB", category: "Works", stage: "Planning", estimatedValue: 213_000_000, bidClosing: "2026-08-22", noObjection: "Not Required", progress: 12, owner: "Engr. Musa Adamu" },
  { id: "p-05", ref: "SOLID/RFQ-021", title: "Office Stationery & Consumables (Framework)", method: "RFQ", category: "Goods", stage: "Contract Award", estimatedValue: 6_800_000, bidClosing: "2026-06-20", evaluationDate: "2026-06-25", awardDate: "2026-07-04", noObjection: "Not Required", progress: 92, owner: "Mary Joseph" },
  { id: "p-06", ref: "SOLID/RFP-004", title: "Financial Management System Consultancy", method: "QCBS", category: "Consultancy", stage: "Completed", estimatedValue: 34_900_000, bidClosing: "2026-04-15", evaluationDate: "2026-04-22", awardDate: "2026-05-02", noObjection: "Granted", progress: 100, owner: "Grace Yakubu" },
  { id: "p-07", ref: "SOLID/SPW-016", title: "Borehole Rehabilitation — Lot 2", method: "NCB", category: "Works", stage: "Completed", estimatedValue: 184_500_000, bidClosing: "2026-06-05", evaluationDate: "2026-06-12", awardDate: "2026-06-30", noObjection: "Granted", progress: 100, owner: "Engr. Musa Adamu" },
  { id: "p-08", ref: "SOLID/SPN-020", title: "Solar Power Backup for PCU Office", method: "Shopping", category: "Goods", stage: "No-Objection", estimatedValue: 28_400_000, bidClosing: "2026-07-15", evaluationDate: "2026-07-19", noObjection: "Pending", progress: 62, owner: "Fatima Aliyu" },
];

/** Upcoming calendar events (procurement, contract & payment milestones). */
export const calendarEvents: CalendarEvent[] = [
  { id: "e-01", date: "2026-07-09", title: "Vehicle delivery payment due (50%)", type: "Payment Due", ref: "SOLID/G/2026/009", tone: "warning" },
  { id: "e-02", date: "2026-07-10", title: "Bid evaluation — Additional vehicles", type: "Evaluation", ref: "SOLID/SPN-011", tone: "info" },
  { id: "e-03", date: "2026-07-10", title: "APG expiry — BuildRight Ventures", type: "APG Expiry", ref: "SOLID/W/2026/010", tone: "danger" },
  { id: "e-04", date: "2026-07-12", title: "IPC 2 payment due — Access Road", type: "Payment Due", ref: "SOLID/W/2026/004", tone: "warning" },
  { id: "e-05", date: "2026-07-15", title: "Bid closing — Solar backup", type: "Bid Closing", ref: "SOLID/SPN-020", tone: "info" },
  { id: "e-06", date: "2026-07-18", title: "Draft final report due — Baseline study", type: "Milestone", ref: "SOLID/C/2026/002", tone: "accent" },
  { id: "e-07", date: "2026-07-24", title: "Bid closing — Office IT Equipment", type: "Bid Closing", ref: "SOLID/SPN-014", tone: "info" },
  { id: "e-08", date: "2026-07-25", title: "Contract start — IT Equipment supply", type: "Contract Start", ref: "SOLID/G/2026/012", tone: "success" },
  { id: "e-09", date: "2026-07-28", title: "Bid evaluation — Office IT Equipment", type: "Evaluation", ref: "SOLID/SPN-014", tone: "info" },
  { id: "e-10", date: "2026-08-05", title: "Contract end — Project Vehicles", type: "Contract End", ref: "SOLID/G/2026/009", tone: "warning" },
  { id: "e-11", date: "2026-08-08", title: "Bid closing — Impact Evaluation", type: "Bid Closing", ref: "SOLID/RFP-005", tone: "info" },
  { id: "e-12", date: "2026-08-14", title: "APG expiry — GRV-Works Ltd", type: "APG Expiry", ref: "SOLID/W/2026/004", tone: "danger" },
  { id: "e-13", date: "2026-08-20", title: "Contract end — Baseline study", type: "Contract End", ref: "SOLID/C/2026/002", tone: "warning" },
  { id: "e-14", date: "2026-08-22", title: "Bid closing — Rural Health Posts", type: "Bid Closing", ref: "SOLID/SPW-018", tone: "info" },
  { id: "e-15", date: "2026-08-30", title: "IPC 1 payment — Borehole Lot 2", type: "Payment Due", ref: "SOLID/W/2026/007", tone: "warning" },
];

export function procurementKpis() {
  const active = procurements.filter((p) => !["Completed"].includes(p.stage)).length;
  const evaluation = procurements.filter((p) => p.stage === "Bid Evaluation").length;
  const awaitingNoObjection = procurements.filter((p) => p.noObjection === "Pending").length;
  const totalPipeline = procurements.filter((p) => p.stage !== "Completed").reduce((s, p) => s + p.estimatedValue, 0);
  const closingThisMonth = procurements.filter((p) => p.bidClosing >= "2026-07-01" && p.bidClosing <= "2026-07-31" && p.stage !== "Completed").length;
  return { active, evaluation, awaitingNoObjection, totalPipeline, closingThisMonth, total: procurements.length };
}

export const procStageOrder: ProcStage[] = [
  "Planning",
  "Bid Preparation",
  "Advertised",
  "Bid Evaluation",
  "No-Objection",
  "Contract Award",
  "Completed",
];
