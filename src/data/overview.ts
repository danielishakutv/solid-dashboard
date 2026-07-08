import { attendanceSummary } from "./staff";
import { registryKpis } from "./registry";
import { contractKpis } from "./contracts";
import { procurementKpis } from "./procurement";
import { officeKpis } from "./office";
import { meetingKpis } from "./meetings";
import { leaveKpis } from "./leave";
import { visitorKpis } from "./visitors";

/** Aggregated indicators for the Monthly Administrative Performance Dashboard. */
export function overviewKpis() {
  return {
    attendance: attendanceSummary(),
    registry: registryKpis(),
    contracts: contractKpis(),
    procurement: procurementKpis(),
    office: officeKpis(),
    meetings: meetingKpis(),
    leave: leaveKpis(),
    visitors: visitorKpis(),
  };
}

/** Composite administrative health score (0–100) shown as the hero gauge. */
export function healthScore() {
  const att = attendanceSummary().attendanceRate; // 94
  const meeting = meetingKpis().completionRate; // ~ 45
  const disb = contractKpis().disbursementRate; // ~ 47
  const registry = 100 - Math.min(100, registryKpis().outstanding * 6);
  const composite = Math.round(att * 0.3 + meeting * 0.2 + disb * 0.25 + registry * 0.25);
  return Math.min(100, composite);
}

/** Radar-style balance across administrative pillars. */
export const pillarPerformance = [
  { pillar: "Attendance", score: 94 },
  { pillar: "Registry", score: 82 },
  { pillar: "Contracts", score: 71 },
  { pillar: "Procurement", score: 76 },
  { pillar: "Facilities", score: 68 },
  { pillar: "Governance", score: 79 },
];

/** Monthly composite trend for the hero area chart. */
export const performanceTrend = [
  { month: "Feb", attendance: 88, disbursement: 22, compliance: 74 },
  { month: "Mar", attendance: 91, disbursement: 34, compliance: 78 },
  { month: "Apr", attendance: 86, disbursement: 41, compliance: 80 },
  { month: "May", attendance: 93, disbursement: 46, compliance: 83 },
  { month: "Jun", attendance: 90, disbursement: 51, compliance: 85 },
  { month: "Jul", attendance: 94, disbursement: 58, compliance: 88 },
];

export const monthLabel = "July 2026";
