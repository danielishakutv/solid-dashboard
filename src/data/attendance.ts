import { staff } from "./staff";

export interface CheckLog {
  id: string;
  staffId: string;
  name: string;
  role: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: string;
  hours: number | null;
  method: "Biometric" | "Web" | "Mobile" | "Manual";
}

/** Monthly attendance-rate trend (Feb–Jul 2026). */
export const attendanceTrend = [
  { month: "Feb", rate: 88, present: 14, leave: 2, assignment: 2 },
  { month: "Mar", rate: 91, present: 15, leave: 1, assignment: 2 },
  { month: "Apr", rate: 86, present: 14, leave: 2, assignment: 2 },
  { month: "May", rate: 93, present: 16, leave: 1, assignment: 1 },
  { month: "Jun", rate: 90, present: 15, leave: 2, assignment: 1 },
  { month: "Jul", rate: 94, present: 16, leave: 1, assignment: 1 },
];

/** Punctuality across the current week. */
export const weeklyPunctuality = [
  { day: "Mon", onTime: 15, late: 2, absent: 1 },
  { day: "Tue", onTime: 16, late: 1, absent: 1 },
  { day: "Wed", onTime: 14, late: 3, absent: 1 },
  { day: "Thu", onTime: 16, late: 2, absent: 0 },
  { day: "Fri", onTime: 13, late: 4, absent: 1 },
];

/** Average check-in time distribution (histogram). */
export const checkInDistribution = [
  { window: "Before 7:30", count: 4 },
  { window: "7:30–7:45", count: 5 },
  { window: "7:45–8:00", count: 4 },
  { window: "8:00–8:15", count: 2 },
  { window: "After 8:15", count: 1 },
];

function statusToLog(): CheckLog[] {
  const methods: CheckLog["method"][] = ["Biometric", "Web", "Mobile", "Manual"];
  return staff.map((s, i) => {
    const present = ["Present", "Remote", "Official Assignment"].includes(s.status);
    const checkOut = present && i % 3 !== 0 ? "17:0" + (i % 6) : null;
    const inH = s.checkIn ? Number(s.checkIn.split(":")[0]) + Number(s.checkIn.split(":")[1]) / 60 : null;
    const outH = checkOut ? Number(checkOut.split(":")[0]) + Number(checkOut.split(":")[1]) / 60 : null;
    return {
      id: `log-${s.id}`,
      staffId: s.id,
      name: s.name,
      role: s.role,
      date: "2026-07-07",
      checkIn: s.checkIn ?? null,
      checkOut,
      status: s.status,
      hours: inH && outH ? Math.round((outH - inH) * 10) / 10 : null,
      method: s.status === "Remote" ? "Mobile" : methods[i % methods.length],
    };
  });
}

export const todayLog = statusToLog();

export function attendanceKpis() {
  const present = staff.filter((s) => ["Present", "Remote", "Official Assignment"].includes(s.status));
  const late = todayLog.filter((l) => l.checkIn && Number(l.checkIn.split(":")[0]) * 60 + Number(l.checkIn.split(":")[1]) > 8 * 60).length;
  const avgIn = (() => {
    const times = todayLog.filter((l) => l.checkIn).map((l) => Number(l.checkIn!.split(":")[0]) * 60 + Number(l.checkIn!.split(":")[1]));
    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const h = Math.floor(avg / 60);
    const m = Math.round(avg % 60);
    return `${h}:${String(m).padStart(2, "0")}`;
  })();
  return {
    checkedIn: present.length,
    total: staff.length,
    late,
    avgCheckIn: avgIn,
    onTimeRate: Math.round(((present.length - late) / present.length) * 100),
  };
}
