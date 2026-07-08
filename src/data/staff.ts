export type AttendanceStatus =
  | "Present"
  | "On Leave"
  | "Official Assignment"
  | "Remote"
  | "Sick Leave"
  | "Absent";

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: AttendanceStatus;
  checkIn?: string;
  checkOut?: string;
  employmentType: "Core" | "Contract" | "Support";
  gender: "M" | "F";
  leave: { annual: number; casual: number; sick: number; annualUsed: number };
  supervisor?: string;
}

/** Reference "today" for the demo — keeps all relative dates coherent. */
export const TODAY = "2026-07-07";

export const departments = [
  "Coordination",
  "Administration",
  "Procurement",
  "Finance",
  "Monitoring & Evaluation",
  "Safeguards",
  "Internal Audit",
  "Communications",
  "ICT",
  "Support Services",
] as const;

export const staff: Staff[] = [
  {
    id: "s-01",
    name: "Dr. Amina Bello",
    role: "Project Coordinator",
    department: "Coordination",
    email: "coordinator@solid.ad.gov.ng",
    phone: "+234 803 111 2201",
    location: "Yola HQ",
    joinDate: "2025-02-03",
    status: "Present",
    checkIn: "07:52",
    employmentType: "Core",
    gender: "F",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 6 },
  },
  {
    id: "s-02",
    name: "Lepwa Blessing Zadok",
    role: "Administrative Officer",
    department: "Administration",
    email: "admin@solid.ad.gov.ng",
    phone: "+234 806 445 9912",
    location: "Yola HQ",
    joinDate: "2025-02-10",
    status: "Present",
    checkIn: "07:41",
    employmentType: "Core",
    gender: "F",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 4 },
    supervisor: "Dr. Amina Bello",
  },
  {
    id: "s-03",
    name: "Engr. Musa Adamu",
    role: "Procurement Officer",
    department: "Procurement",
    email: "procurement@solid.ad.gov.ng",
    phone: "+234 802 337 4410",
    location: "Yola HQ",
    joinDate: "2025-02-17",
    status: "Official Assignment",
    checkIn: "08:05",
    employmentType: "Core",
    gender: "M",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 9 },
    supervisor: "Dr. Amina Bello",
  },
  {
    id: "s-04",
    name: "Grace Yakubu",
    role: "Financial Management Specialist",
    department: "Finance",
    email: "fms@solid.ad.gov.ng",
    phone: "+234 807 990 1123",
    location: "Yola HQ",
    joinDate: "2025-02-17",
    status: "Present",
    checkIn: "07:38",
    employmentType: "Core",
    gender: "F",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 3 },
    supervisor: "Dr. Amina Bello",
  },
  {
    id: "s-05",
    name: "Peter Danladi",
    role: "Monitoring & Evaluation Officer",
    department: "Monitoring & Evaluation",
    email: "me@solid.ad.gov.ng",
    phone: "+234 809 220 7781",
    location: "Field — Mubi",
    joinDate: "2025-03-02",
    status: "Official Assignment",
    checkIn: "07:15",
    employmentType: "Core",
    gender: "M",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 11 },
    supervisor: "Dr. Amina Bello",
  },
  {
    id: "s-06",
    name: "Hauwa Suleiman",
    role: "Environmental Safeguards Officer",
    department: "Safeguards",
    email: "env@solid.ad.gov.ng",
    phone: "+234 803 556 2290",
    location: "Yola HQ",
    joinDate: "2025-03-02",
    status: "On Leave",
    employmentType: "Core",
    gender: "F",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 18 },
    supervisor: "Dr. Amina Bello",
  },
  {
    id: "s-07",
    name: "Emmanuel Terkula",
    role: "Social Safeguards Officer",
    department: "Safeguards",
    email: "social@solid.ad.gov.ng",
    phone: "+234 805 118 3345",
    location: "Yola HQ",
    joinDate: "2025-03-09",
    status: "Present",
    checkIn: "07:59",
    employmentType: "Core",
    gender: "M",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 5 },
    supervisor: "Dr. Amina Bello",
  },
  {
    id: "s-08",
    name: "Rebecca Iliya",
    role: "Internal Auditor",
    department: "Internal Audit",
    email: "audit@solid.ad.gov.ng",
    phone: "+234 806 771 9908",
    location: "Yola HQ",
    joinDate: "2025-03-16",
    status: "Present",
    checkIn: "07:47",
    employmentType: "Core",
    gender: "F",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 2 },
    supervisor: "Dr. Amina Bello",
  },
  {
    id: "s-09",
    name: "Ibrahim Musa",
    role: "Communications Officer",
    department: "Communications",
    email: "comms@solid.ad.gov.ng",
    phone: "+234 802 443 6650",
    location: "Yola HQ",
    joinDate: "2025-03-23",
    status: "Remote",
    checkIn: "08:12",
    employmentType: "Core",
    gender: "M",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 7 },
    supervisor: "Dr. Amina Bello",
  },
  {
    id: "s-10",
    name: "Fatima Aliyu",
    role: "ICT / Data Officer",
    department: "ICT",
    email: "ict@solid.ad.gov.ng",
    phone: "+234 809 664 1120",
    location: "Yola HQ",
    joinDate: "2025-03-23",
    status: "Present",
    checkIn: "07:33",
    employmentType: "Core",
    gender: "F",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 4 },
    supervisor: "Lepwa Blessing Zadok",
  },
  {
    id: "s-11",
    name: "Samuel Ndyanabo",
    role: "Registry / Records Officer",
    department: "Administration",
    email: "registry@solid.ad.gov.ng",
    phone: "+234 803 229 4471",
    location: "Yola HQ",
    joinDate: "2025-04-06",
    status: "Present",
    checkIn: "07:44",
    employmentType: "Core",
    gender: "M",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 3 },
    supervisor: "Lepwa Blessing Zadok",
  },
  {
    id: "s-12",
    name: "Zainab Umar",
    role: "Account / Cashier",
    department: "Finance",
    email: "cashier@solid.ad.gov.ng",
    phone: "+234 806 332 0091",
    location: "Yola HQ",
    joinDate: "2025-04-06",
    status: "Sick Leave",
    employmentType: "Core",
    gender: "F",
    leave: { annual: 30, casual: 7, sick: 12, annualUsed: 8 },
    supervisor: "Grace Yakubu",
  },
  {
    id: "s-13",
    name: "John Bitrus",
    role: "Procurement Assistant",
    department: "Procurement",
    email: "proc.assist@solid.ad.gov.ng",
    phone: "+234 802 990 5567",
    location: "Yola HQ",
    joinDate: "2025-04-20",
    status: "Present",
    checkIn: "07:56",
    employmentType: "Contract",
    gender: "M",
    leave: { annual: 21, casual: 5, sick: 10, annualUsed: 6 },
    supervisor: "Engr. Musa Adamu",
  },
  {
    id: "s-14",
    name: "Mary Joseph",
    role: "Admin Assistant",
    department: "Administration",
    email: "admin.assist@solid.ad.gov.ng",
    phone: "+234 809 447 2218",
    location: "Yola HQ",
    joinDate: "2025-04-20",
    status: "Present",
    checkIn: "07:40",
    employmentType: "Contract",
    gender: "F",
    leave: { annual: 21, casual: 5, sick: 10, annualUsed: 5 },
    supervisor: "Lepwa Blessing Zadok",
  },
  {
    id: "s-15",
    name: "Yusuf Garba",
    role: "Project Driver",
    department: "Support Services",
    email: "driver1@solid.ad.gov.ng",
    phone: "+234 803 118 9934",
    location: "Field — Numan",
    joinDate: "2025-04-27",
    status: "Official Assignment",
    checkIn: "06:58",
    employmentType: "Support",
    gender: "M",
    leave: { annual: 21, casual: 5, sick: 10, annualUsed: 4 },
    supervisor: "Lepwa Blessing Zadok",
  },
  {
    id: "s-16",
    name: "Comfort Elisha",
    role: "Office Assistant",
    department: "Support Services",
    email: "support1@solid.ad.gov.ng",
    phone: "+234 806 552 7743",
    location: "Yola HQ",
    joinDate: "2025-04-27",
    status: "Present",
    checkIn: "07:29",
    employmentType: "Support",
    gender: "F",
    leave: { annual: 21, casual: 5, sick: 10, annualUsed: 2 },
    supervisor: "Lepwa Blessing Zadok",
  },
  {
    id: "s-17",
    name: "Daniel Ayuba",
    role: "Security Supervisor",
    department: "Support Services",
    email: "security@solid.ad.gov.ng",
    phone: "+234 802 664 1102",
    location: "Yola HQ",
    joinDate: "2025-05-04",
    status: "Present",
    checkIn: "06:45",
    employmentType: "Support",
    gender: "M",
    leave: { annual: 21, casual: 5, sick: 10, annualUsed: 3 },
    supervisor: "Daniel Ayuba",
  },
  {
    id: "s-18",
    name: "Patience Michael",
    role: "Front Desk Officer",
    department: "Administration",
    email: "frontdesk@solid.ad.gov.ng",
    phone: "+234 809 223 8890",
    location: "Yola HQ",
    joinDate: "2025-05-04",
    status: "Remote",
    checkIn: "08:03",
    employmentType: "Contract",
    gender: "F",
    leave: { annual: 21, casual: 5, sick: 10, annualUsed: 6 },
    supervisor: "Lepwa Blessing Zadok",
  },
];

export const staffById = (id: string) => staff.find((s) => s.id === id);
export const staffByName = (name: string) => staff.find((s) => s.name === name);

export const attendanceStatusMeta: Record<
  AttendanceStatus,
  { label: string; tone: "success" | "warning" | "info" | "accent" | "danger" | "neutral" }
> = {
  Present: { label: "Present", tone: "success" },
  "On Leave": { label: "On Leave", tone: "warning" },
  "Official Assignment": { label: "Official Assignment", tone: "info" },
  Remote: { label: "Remote Work", tone: "accent" },
  "Sick Leave": { label: "Sick Leave", tone: "danger" },
  Absent: { label: "Absent", tone: "danger" },
};

export function attendanceSummary() {
  const total = staff.length;
  const counts = staff.reduce(
    (acc, s) => {
      acc[s.status] = (acc[s.status] ?? 0) + 1;
      return acc;
    },
    {} as Record<AttendanceStatus, number>,
  );
  const present = counts["Present"] ?? 0;
  const remote = counts["Remote"] ?? 0;
  const assignment = counts["Official Assignment"] ?? 0;
  const leave = (counts["On Leave"] ?? 0) + (counts["Sick Leave"] ?? 0);
  const available = present + remote + assignment;
  return {
    total,
    present,
    remote,
    assignment,
    leave,
    sick: counts["Sick Leave"] ?? 0,
    onLeave: counts["On Leave"] ?? 0,
    absent: counts["Absent"] ?? 0,
    available,
    attendanceRate: Math.round((available / total) * 100),
    counts,
  };
}
