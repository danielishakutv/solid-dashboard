export type CorrespondenceType = "Incoming" | "Outgoing" | "Internal Memo";
export type FileStatus = "In Circulation" | "Filed" | "Awaiting Action" | "Archived";

export interface Correspondence {
  id: string;
  ref: string;
  subject: string;
  type: CorrespondenceType;
  from: string;
  to: string;
  date: string;
  category: string;
  priority: "Routine" | "Important" | "Urgent";
  status: "Received" | "Dispatched" | "In Review" | "Actioned" | "Filed";
  assignedTo: string;
}

export interface ProjectFile {
  id: string;
  ref: string;
  title: string;
  category: string;
  status: FileStatus;
  openedDate: string;
  heldBy: string;
  location: string;
  documents: number;
  lastMovement: string;
}

export interface FileMovement {
  id: string;
  fileRef: string;
  fileTitle: string;
  from: string;
  to: string;
  date: string;
  purpose: string;
  returned: boolean;
}

export const fileCategories = [
  "Incoming Correspondence",
  "Outgoing Correspondence",
  "Internal Memoranda",
  "Personal Files",
  "Contract Files",
  "NGO Correspondence",
  "Back-to-Office Reports",
  "Procurement Files",
  "Payment Files",
  "Office Maintenance",
];

export const correspondence: Correspondence[] = [
  { id: "c-01", ref: "SOLID/IN/2026/0142", subject: "Quarterly disbursement confirmation — Q2 2026", type: "Incoming", from: "World Bank Country Office", to: "Project Coordinator", date: "2026-07-06", category: "Payment Files", priority: "Important", status: "In Review", assignedTo: "Grace Yakubu" },
  { id: "c-02", ref: "SOLID/OUT/2026/0098", subject: "Submission of Q2 Interim Financial Report", type: "Outgoing", from: "Project Coordinator", to: "State Ministry of Finance", date: "2026-07-06", category: "Payment Files", priority: "Urgent", status: "Dispatched", assignedTo: "Grace Yakubu" },
  { id: "c-03", ref: "SOLID/MEMO/2026/0051", subject: "Staff durbar & mid-year review — 18 July", type: "Internal Memo", from: "Admin Officer", to: "All Staff", date: "2026-07-05", category: "Internal Memoranda", priority: "Routine", status: "Actioned", assignedTo: "Lepwa Blessing Zadok" },
  { id: "c-04", ref: "SOLID/IN/2026/0141", subject: "Request for No-Objection — Vehicle procurement", type: "Incoming", from: "World Bank Task Team", to: "Procurement Officer", date: "2026-07-04", category: "Procurement Files", priority: "Urgent", status: "In Review", assignedTo: "Engr. Musa Adamu" },
  { id: "c-05", ref: "SOLID/OUT/2026/0097", subject: "Invitation to Bid — Office IT Equipment (SPN-014)", type: "Outgoing", from: "Procurement Officer", to: "Prospective Bidders", date: "2026-07-03", category: "Procurement Files", priority: "Important", status: "Dispatched", assignedTo: "Engr. Musa Adamu" },
  { id: "c-06", ref: "SOLID/IN/2026/0140", subject: "Community grievance — Numan access road works", type: "Incoming", from: "Numan LGA Liaison", to: "Social Safeguards", date: "2026-07-03", category: "NGO Correspondence", priority: "Important", status: "Actioned", assignedTo: "Emmanuel Terkula" },
  { id: "c-07", ref: "SOLID/BTO/2026/0033", subject: "Back-to-Office: M&E field verification, Mubi", type: "Internal Memo", from: "M&E Officer", to: "Project Coordinator", date: "2026-07-02", category: "Back-to-Office Reports", priority: "Routine", status: "Filed", assignedTo: "Peter Danladi" },
  { id: "c-08", ref: "SOLID/IN/2026/0139", subject: "APG extension notice — Contractor GRV-Works Ltd", type: "Incoming", from: "GRV-Works Ltd", to: "Finance", date: "2026-07-01", category: "Contract Files", priority: "Important", status: "In Review", assignedTo: "Grace Yakubu" },
  { id: "c-09", ref: "SOLID/OUT/2026/0096", subject: "Contract award letter — Borehole rehabilitation Lot 2", type: "Outgoing", from: "Project Coordinator", to: "AquaFlow Nigeria Ltd", date: "2026-06-30", category: "Contract Files", priority: "Important", status: "Dispatched", assignedTo: "Engr. Musa Adamu" },
  { id: "c-10", ref: "SOLID/MEMO/2026/0050", subject: "Revised office opening hours during rains", type: "Internal Memo", from: "Admin Officer", to: "All Staff", date: "2026-06-29", category: "Internal Memoranda", priority: "Routine", status: "Filed", assignedTo: "Lepwa Blessing Zadok" },
  { id: "c-11", ref: "SOLID/IN/2026/0138", subject: "Audit query response — Q1 retirement", type: "Incoming", from: "State Auditor-General", to: "Internal Audit", date: "2026-06-27", category: "Payment Files", priority: "Urgent", status: "Actioned", assignedTo: "Rebecca Iliya" },
  { id: "c-12", ref: "SOLID/OUT/2026/0095", subject: "Nomination for World Bank procurement training", type: "Outgoing", from: "Admin Officer", to: "World Bank Learning", date: "2026-06-26", category: "Outgoing Correspondence", priority: "Routine", status: "Dispatched", assignedTo: "Lepwa Blessing Zadok" },
  { id: "c-13", ref: "SOLID/IN/2026/0137", subject: "Delivery note — Office furniture (PO-2026-021)", type: "Incoming", from: "Sahel Furnitures Ltd", to: "Admin Officer", date: "2026-06-25", category: "Procurement Files", priority: "Routine", status: "Filed", assignedTo: "Mary Joseph" },
  { id: "c-14", ref: "SOLID/MEMO/2026/0049", subject: "Data protection & records handling guidelines", type: "Internal Memo", from: "ICT Officer", to: "All Staff", date: "2026-06-24", category: "Internal Memoranda", priority: "Important", status: "Actioned", assignedTo: "Fatima Aliyu" },
  { id: "c-15", ref: "SOLID/IN/2026/0136", subject: "Partnership proposal — Adamawa Women's Cooperative", type: "Incoming", from: "AWC Secretariat", to: "Project Coordinator", date: "2026-06-23", category: "NGO Correspondence", priority: "Routine", status: "In Review", assignedTo: "Dr. Amina Bello" },
];

export const projectFiles: ProjectFile[] = [
  { id: "f-01", ref: "SOLID/CF/012", title: "Contract File — Borehole Rehabilitation Lot 2", category: "Contract Files", status: "In Circulation", openedDate: "2026-06-30", heldBy: "Grace Yakubu", location: "Finance", documents: 24, lastMovement: "2026-07-06" },
  { id: "f-02", ref: "SOLID/PF/008", title: "Procurement File — IT Equipment SPN-014", category: "Procurement Files", status: "In Circulation", openedDate: "2026-07-03", heldBy: "Engr. Musa Adamu", location: "Procurement", documents: 11, lastMovement: "2026-07-05" },
  { id: "f-03", ref: "SOLID/PAY/031", title: "Payment File — Q2 2026 Disbursement", category: "Payment Files", status: "Awaiting Action", openedDate: "2026-07-01", heldBy: "Registry", location: "Registry", documents: 8, lastMovement: "2026-07-06" },
  { id: "f-04", ref: "SOLID/HR/003", title: "Personal File — P. Danladi (M&E)", category: "Personal Files", status: "Filed", openedDate: "2025-03-02", heldBy: "Registry", location: "Registry Cabinet A", documents: 19, lastMovement: "2026-06-20" },
  { id: "f-05", ref: "SOLID/BTO/007", title: "Back-to-Office Reports — 2026", category: "Back-to-Office Reports", status: "In Circulation", openedDate: "2026-01-14", heldBy: "Dr. Amina Bello", location: "Coordination", documents: 33, lastMovement: "2026-07-02" },
  { id: "f-06", ref: "SOLID/MNT/004", title: "Office Maintenance — Generator & AC", category: "Office Maintenance", status: "Awaiting Action", openedDate: "2026-05-11", heldBy: "Admin Officer", location: "Administration", documents: 6, lastMovement: "2026-07-04" },
  { id: "f-07", ref: "SOLID/NGO/002", title: "NGO Correspondence — Adamawa Women's Coop", category: "NGO Correspondence", status: "In Circulation", openedDate: "2026-06-23", heldBy: "Dr. Amina Bello", location: "Coordination", documents: 5, lastMovement: "2026-06-23" },
  { id: "f-08", ref: "SOLID/CF/009", title: "Contract File — Access Road Works, Numan", category: "Contract Files", status: "In Circulation", openedDate: "2026-04-18", heldBy: "Engr. Musa Adamu", location: "Procurement", documents: 41, lastMovement: "2026-07-01" },
  { id: "f-09", ref: "SOLID/IN/2026", title: "Incoming Correspondence Register — 2026", category: "Incoming Correspondence", status: "In Circulation", openedDate: "2026-01-02", heldBy: "Samuel Ndyanabo", location: "Registry", documents: 142, lastMovement: "2026-07-06" },
  { id: "f-10", ref: "SOLID/OUT/2026", title: "Outgoing Correspondence Register — 2026", category: "Outgoing Correspondence", status: "In Circulation", openedDate: "2026-01-02", heldBy: "Samuel Ndyanabo", location: "Registry", documents: 98, lastMovement: "2026-07-06" },
  { id: "f-11", ref: "SOLID/AUD/001", title: "Internal Audit Working Papers — Q2", category: "Payment Files", status: "Awaiting Action", openedDate: "2026-06-15", heldBy: "Rebecca Iliya", location: "Internal Audit", documents: 15, lastMovement: "2026-07-03" },
  { id: "f-12", ref: "SOLID/CF/005", title: "Contract File — CCTV & Access Control", category: "Contract Files", status: "Archived", openedDate: "2025-11-20", heldBy: "Registry", location: "Archive Room", documents: 27, lastMovement: "2026-03-30" },
];

export const fileMovements: FileMovement[] = [
  { id: "m-01", fileRef: "SOLID/PAY/031", fileTitle: "Payment File — Q2 2026 Disbursement", from: "Registry", to: "Grace Yakubu (Finance)", date: "2026-07-06", purpose: "Payment processing & review", returned: false },
  { id: "m-02", fileRef: "SOLID/CF/012", fileTitle: "Borehole Rehabilitation Lot 2", from: "Procurement", to: "Grace Yakubu (Finance)", date: "2026-07-06", purpose: "Advance payment verification", returned: false },
  { id: "m-03", fileRef: "SOLID/PF/008", fileTitle: "IT Equipment SPN-014", from: "Registry", to: "Engr. Musa Adamu", date: "2026-07-05", purpose: "Bid document compilation", returned: false },
  { id: "m-04", fileRef: "SOLID/MNT/004", fileTitle: "Office Maintenance — Generator & AC", from: "Administration", to: "Dr. Amina Bello", date: "2026-07-04", purpose: "Approval of repair quote", returned: false },
  { id: "m-05", fileRef: "SOLID/BTO/007", fileTitle: "Back-to-Office Reports 2026", from: "Registry", to: "Dr. Amina Bello", date: "2026-07-02", purpose: "Review of field report", returned: true },
  { id: "m-06", fileRef: "SOLID/AUD/001", fileTitle: "Internal Audit Working Papers Q2", from: "Internal Audit", to: "Dr. Amina Bello", date: "2026-07-03", purpose: "Management response", returned: false },
  { id: "m-07", fileRef: "SOLID/CF/008", fileTitle: "Access Road Works, Numan", from: "Procurement", to: "Emmanuel Terkula", date: "2026-07-01", purpose: "Grievance cross-check", returned: true },
  { id: "m-08", fileRef: "SOLID/HR/003", fileTitle: "Personal File — P. Danladi", from: "Registry", to: "Lepwa Blessing Zadok", date: "2026-06-20", purpose: "Leave record update", returned: true },
];

export function registryKpis() {
  const incoming = correspondence.filter((c) => c.type === "Incoming").length;
  const outgoing = correspondence.filter((c) => c.type === "Outgoing").length;
  const memos = correspondence.filter((c) => c.type === "Internal Memo").length;
  const inCirculation = projectFiles.filter((f) => f.status === "In Circulation").length;
  const awaiting = projectFiles.filter((f) => f.status === "Awaiting Action").length;
  const outstanding = fileMovements.filter((m) => !m.returned).length;
  return { incoming, outgoing, memos, inCirculation, awaiting, outstanding, totalFiles: projectFiles.length };
}

/** Monthly correspondence volume trend. */
export const correspondenceTrend = [
  { month: "Feb", incoming: 21, outgoing: 14 },
  { month: "Mar", incoming: 26, outgoing: 18 },
  { month: "Apr", incoming: 23, outgoing: 16 },
  { month: "May", incoming: 29, outgoing: 22 },
  { month: "Jun", incoming: 24, outgoing: 19 },
  { month: "Jul", incoming: 19, outgoing: 12 },
];
