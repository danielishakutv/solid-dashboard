export type ActionStatus = "Pending" | "Ongoing" | "Completed" | "Overdue";

export interface ActionPoint {
  id: string;
  meeting: string;
  meetingDate: string;
  action: string;
  responsible: string;
  deadline: string;
  status: ActionStatus;
  remarks: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  chair: string;
  attendees: number;
  actionsRaised: number;
  actionsClosed: number;
}

export const meetings: Meeting[] = [
  { id: "mtg-01", title: "Management Meeting — July W1", date: "2026-07-03", chair: "Dr. Amina Bello", attendees: 11, actionsRaised: 6, actionsClosed: 2 },
  { id: "mtg-02", title: "Procurement Review Committee", date: "2026-06-26", chair: "Engr. Musa Adamu", attendees: 5, actionsRaised: 4, actionsClosed: 3 },
  { id: "mtg-03", title: "Management Meeting — June W4", date: "2026-06-19", chair: "Dr. Amina Bello", attendees: 12, actionsRaised: 5, actionsClosed: 5 },
  { id: "mtg-04", title: "Finance & Audit Sitting", date: "2026-06-12", chair: "Grace Yakubu", attendees: 4, actionsRaised: 3, actionsClosed: 3 },
];

export const actionPoints: ActionPoint[] = [
  { id: "ap-01", meeting: "Management Meeting — July W1", meetingDate: "2026-07-03", action: "Finalise APG renewal with BuildRight before expiry", responsible: "Grace Yakubu", deadline: "2026-07-09", status: "Ongoing", remarks: "Contractor engaged; guarantee draft under review." },
  { id: "ap-02", meeting: "Management Meeting — July W1", meetingDate: "2026-07-03", action: "Submit Q2 Interim Financial Report to World Bank", responsible: "Grace Yakubu", deadline: "2026-07-06", status: "Completed", remarks: "Dispatched ref SOLID/OUT/2026/0098." },
  { id: "ap-03", meeting: "Management Meeting — July W1", meetingDate: "2026-07-03", action: "Conclude bid evaluation for additional vehicles", responsible: "Engr. Musa Adamu", deadline: "2026-07-10", status: "Ongoing", remarks: "Evaluation committee constituted." },
  { id: "ap-04", meeting: "Management Meeting — July W1", meetingDate: "2026-07-03", action: "Resolve Conference Room A air-conditioning fault", responsible: "Lepwa Blessing Zadok", deadline: "2026-07-08", status: "Pending", remarks: "Awaiting technician assignment." },
  { id: "ap-05", meeting: "Management Meeting — July W1", meetingDate: "2026-07-03", action: "Circulate revised leave planner to all units", responsible: "Lepwa Blessing Zadok", deadline: "2026-07-11", status: "Pending", remarks: "" },
  { id: "ap-06", meeting: "Management Meeting — July W1", meetingDate: "2026-07-03", action: "Complete generator repair and restore power redundancy", responsible: "Daniel Ayuba", deadline: "2026-07-07", status: "Overdue", remarks: "Parts sourcing delayed by supplier." },
  { id: "ap-07", meeting: "Procurement Review Committee", meetingDate: "2026-06-26", action: "Publish Invitation to Bid for IT equipment", responsible: "Engr. Musa Adamu", deadline: "2026-07-03", status: "Completed", remarks: "Advertised ref SOLID/SPN-014." },
  { id: "ap-08", meeting: "Procurement Review Committee", meetingDate: "2026-06-26", action: "Obtain No-Objection for vehicle procurement", responsible: "Engr. Musa Adamu", deadline: "2026-07-12", status: "Ongoing", remarks: "Submission with Task Team." },
  { id: "ap-09", meeting: "Management Meeting — June W4", meetingDate: "2026-06-19", action: "Onboard 2 contract support staff", responsible: "Lepwa Blessing Zadok", deadline: "2026-06-30", status: "Completed", remarks: "Both resumed 20 June." },
  { id: "ap-10", meeting: "Finance & Audit Sitting", meetingDate: "2026-06-12", action: "Respond to Q1 audit query on retirements", responsible: "Rebecca Iliya", deadline: "2026-06-27", status: "Completed", remarks: "Response filed and accepted." },
  { id: "ap-11", meeting: "Management Meeting — July W1", meetingDate: "2026-07-03", action: "Roll out visitor ID-badge printing at front desk", responsible: "Fatima Aliyu", deadline: "2026-07-15", status: "Ongoing", remarks: "Badge printer configured; templates in test." },
];

export function meetingKpis() {
  const total = actionPoints.length;
  const completed = actionPoints.filter((a) => a.status === "Completed").length;
  const overdue = actionPoints.filter((a) => a.status === "Overdue").length;
  const ongoing = actionPoints.filter((a) => a.status === "Ongoing").length;
  const pending = actionPoints.filter((a) => a.status === "Pending").length;
  return {
    total,
    completed,
    overdue,
    ongoing,
    pending,
    completionRate: Math.round((completed / total) * 100),
    meetingsHeld: meetings.length,
  };
}
