export interface Visitor {
  id: string;
  badge: string;
  name: string;
  organization: string;
  purpose: string;
  host: string;
  date: string;
  timeIn: string;
  timeOut: string | null;
  status: "Checked In" | "Checked Out";
  phone: string;
}

export const visitors: Visitor[] = [
  { id: "vs-01", badge: "V-072", name: "Barr. Nuhu Adamu", organization: "State Ministry of Justice", purpose: "Contract legal review", host: "Dr. Amina Bello", date: "2026-07-07", timeIn: "09:12", timeOut: null, status: "Checked In", phone: "+234 803 220 1140" },
  { id: "vs-02", badge: "V-071", name: "Mrs. Fatima Bala", organization: "World Bank (Task Team)", purpose: "Implementation support mission", host: "Dr. Amina Bello", date: "2026-07-07", timeIn: "08:45", timeOut: null, status: "Checked In", phone: "+234 809 551 2201" },
  { id: "vs-03", badge: "V-070", name: "Engr. Sunday Okoro", organization: "GRV-Works Ltd", purpose: "IPC 2 documentation submission", host: "Engr. Musa Adamu", date: "2026-07-07", timeIn: "10:30", timeOut: "11:20", status: "Checked Out", phone: "+234 802 447 8890" },
  { id: "vs-04", badge: "V-069", name: "Aisha Mohammed", organization: "Adamawa Women's Cooperative", purpose: "Partnership discussion", host: "Emmanuel Terkula", date: "2026-07-07", timeIn: "11:05", timeOut: null, status: "Checked In", phone: "+234 806 119 3345" },
  { id: "vs-05", badge: "V-068", name: "David Yohanna", organization: "TechBridge Systems", purpose: "IT equipment pre-delivery survey", host: "Fatima Aliyu", date: "2026-07-06", timeIn: "13:20", timeOut: "14:50", status: "Checked Out", phone: "+234 809 662 7781" },
  { id: "vs-06", badge: "V-067", name: "Hon. Grace Bitrus", organization: "State House of Assembly", purpose: "Oversight courtesy visit", host: "Dr. Amina Bello", date: "2026-07-06", timeIn: "10:00", timeOut: "11:15", status: "Checked Out", phone: "+234 803 998 2210" },
  { id: "vs-07", badge: "V-066", name: "Yakubu Danjuma", organization: "PowerTech Services", purpose: "Generator repair — site assessment", host: "Facilities", date: "2026-07-06", timeIn: "09:30", timeOut: "12:10", status: "Checked Out", phone: "+234 802 334 5567" },
  { id: "vs-08", badge: "V-065", name: "Rev. Peter Nggada", organization: "Numan Community Liaison", purpose: "Grievance follow-up", host: "Emmanuel Terkula", date: "2026-07-05", timeIn: "14:00", timeOut: "15:05", status: "Checked Out", phone: "+234 806 220 9912" },
];

/** Monthly visitor volume trend. */
export const visitorTrend = [
  { month: "Feb", visitors: 41 },
  { month: "Mar", visitors: 58 },
  { month: "Apr", visitors: 52 },
  { month: "May", visitors: 67 },
  { month: "Jun", visitors: 61 },
  { month: "Jul", visitors: 18 },
];

export const visitorsByPurpose = [
  { name: "Contractors / Suppliers", value: 34 },
  { name: "Government / Oversight", value: 22 },
  { name: "Development Partners", value: 15 },
  { name: "Community / NGO", value: 19 },
  { name: "Others", value: 10 },
];

export function visitorKpis() {
  const today = visitors.filter((v) => v.date === "2026-07-07");
  const onsite = visitors.filter((v) => v.status === "Checked In").length;
  return {
    today: today.length,
    onsite,
    thisMonth: 18,
    avgDuration: "1h 12m",
  };
}
