export interface Asset {
  id: string;
  tag: string;
  name: string;
  category: "ICT" | "Furniture" | "Vehicle" | "Generator" | "Office Equipment";
  location: string;
  assignedTo: string;
  condition: "Excellent" | "Good" | "Fair" | "Needs Repair";
  purchaseDate: string;
  value: number;
  status: "In Use" | "In Store" | "Under Repair" | "Disposed";
}

export interface Vehicle {
  id: string;
  plate: string;
  model: string;
  driver: string;
  status: "Available" | "On Trip" | "Maintenance";
  mileage: number;
  lastService: string;
  nextService: string;
  fuelLevel: number;
  trips: number;
}

export interface MaintenanceRequest {
  id: string;
  ref: string;
  item: string;
  category: string;
  reportedBy: string;
  reportedDate: string;
  priority: "Low" | "Medium" | "High";
  status: "Open" | "In Progress" | "Completed";
  assignedTo: string;
  cost?: number;
}

export interface RoomBooking {
  id: string;
  room: string;
  title: string;
  organizer: string;
  date: string;
  start: string;
  end: string;
  attendees: number;
  status: "Confirmed" | "Pending";
}

export const assets: Asset[] = [
  { id: "a-01", tag: "SOLID/ICT/001", name: "Dell Latitude Laptop", category: "ICT", location: "Coordination", assignedTo: "Dr. Amina Bello", condition: "Excellent", purchaseDate: "2025-03-14", value: 720_000, status: "In Use" },
  { id: "a-02", tag: "SOLID/ICT/007", name: "HP LaserJet Printer", category: "ICT", location: "Registry", assignedTo: "Samuel Ndyanabo", condition: "Good", purchaseDate: "2025-03-14", value: 340_000, status: "In Use" },
  { id: "a-03", tag: "SOLID/GEN/001", name: "100 KVA Perkins Generator", category: "Generator", location: "Powerhouse", assignedTo: "Facilities", condition: "Needs Repair", purchaseDate: "2025-02-28", value: 12_500_000, status: "Under Repair" },
  { id: "a-04", tag: "SOLID/FUR/014", name: "Executive Office Desk", category: "Furniture", location: "Coordination", assignedTo: "Dr. Amina Bello", condition: "Excellent", purchaseDate: "2025-05-20", value: 280_000, status: "In Use" },
  { id: "a-05", tag: "SOLID/ICT/019", name: "Conference Projector", category: "ICT", location: "Conference Room A", assignedTo: "ICT", condition: "Good", purchaseDate: "2025-06-02", value: 510_000, status: "In Use" },
  { id: "a-06", tag: "SOLID/VEH/001", name: "Toyota Hilux (Field)", category: "Vehicle", location: "Fleet", assignedTo: "Yusuf Garba", condition: "Good", purchaseDate: "2025-05-16", value: 39_000_000, status: "In Use" },
  { id: "a-07", tag: "SOLID/EQP/003", name: "Industrial Shredder", category: "Office Equipment", location: "Registry", assignedTo: "Samuel Ndyanabo", condition: "Fair", purchaseDate: "2025-04-11", value: 190_000, status: "In Use" },
  { id: "a-08", tag: "SOLID/ICT/022", name: "Network Switch & Rack", category: "ICT", location: "Server Room", assignedTo: "Fatima Aliyu", condition: "Good", purchaseDate: "2025-06-18", value: 880_000, status: "In Use" },
  { id: "a-09", tag: "SOLID/FUR/031", name: "Reception Sofa Set", category: "Furniture", location: "Front Desk", assignedTo: "Patience Michael", condition: "Good", purchaseDate: "2025-05-20", value: 450_000, status: "In Use" },
  { id: "a-10", tag: "SOLID/GEN/002", name: "20 KVA Standby Generator", category: "Generator", location: "Annex", assignedTo: "Facilities", condition: "Good", purchaseDate: "2025-03-05", value: 3_200_000, status: "In Use" },
  { id: "a-11", tag: "SOLID/ICT/030", name: "Dell PowerEdge Server", category: "ICT", location: "Server Room", assignedTo: "Fatima Aliyu", condition: "Excellent", purchaseDate: "2025-06-18", value: 2_400_000, status: "In Use" },
  { id: "a-12", tag: "SOLID/FUR/040", name: "Filing Cabinets (set of 6)", category: "Furniture", location: "Registry", assignedTo: "Registry", condition: "Good", purchaseDate: "2025-05-20", value: 720_000, status: "In Use" },
  { id: "a-13", tag: "SOLID/ICT/033", name: "Spare Laptop (Store)", category: "ICT", location: "Store", assignedTo: "—", condition: "Excellent", purchaseDate: "2025-06-30", value: 690_000, status: "In Store" },
  { id: "a-14", tag: "SOLID/EQP/009", name: "Photocopier — Canon iR", category: "Office Equipment", location: "Admin", assignedTo: "Mary Joseph", condition: "Fair", purchaseDate: "2025-04-11", value: 1_150_000, status: "In Use" },
];

export const vehicles: Vehicle[] = [
  { id: "v-01", plate: "ADM-411-SOL", model: "Toyota Hilux 2024", driver: "Yusuf Garba", status: "On Trip", mileage: 24800, lastService: "2026-06-02", nextService: "2026-09-02", fuelLevel: 62, trips: 38 },
  { id: "v-02", plate: "ADM-412-SOL", model: "Toyota Prado 2024", driver: "Assigned Pool", status: "Available", mileage: 18200, lastService: "2026-06-20", nextService: "2026-09-20", fuelLevel: 88, trips: 22 },
  { id: "v-03", plate: "ADM-208-SOL", model: "Toyota Hiace Bus", driver: "Pool Driver", status: "Maintenance", mileage: 41300, lastService: "2026-05-14", nextService: "2026-07-08", fuelLevel: 30, trips: 51 },
];

export const maintenanceRequests: MaintenanceRequest[] = [
  { id: "mr-01", ref: "MNT-2026-031", item: "100 KVA Generator — starter fault", category: "Generator", reportedBy: "Facilities", reportedDate: "2026-07-04", priority: "High", status: "In Progress", assignedTo: "PowerTech Services", cost: 850_000 },
  { id: "mr-02", ref: "MNT-2026-030", item: "Conference Room A — AC not cooling", category: "HVAC", reportedBy: "Ibrahim Musa", reportedDate: "2026-07-03", priority: "Medium", status: "Open", assignedTo: "Unassigned" },
  { id: "mr-03", ref: "MNT-2026-029", item: "Hiace Bus — brake overhaul", category: "Vehicle", reportedBy: "Yusuf Garba", reportedDate: "2026-07-01", priority: "High", status: "In Progress", assignedTo: "Northern Motors", cost: 420_000 },
  { id: "mr-04", ref: "MNT-2026-028", item: "Registry — leaking roof (rains)", category: "Building", reportedBy: "Samuel Ndyanabo", reportedDate: "2026-06-28", priority: "Medium", status: "Completed", assignedTo: "BuildRight Ventures", cost: 260_000 },
  { id: "mr-05", ref: "MNT-2026-027", item: "Photocopier — recurring paper jam", category: "Office Equipment", reportedBy: "Mary Joseph", reportedDate: "2026-06-26", priority: "Low", status: "Completed", assignedTo: "Canon Support", cost: 45_000 },
  { id: "mr-06", ref: "MNT-2026-026", item: "Front desk — faulty power socket", category: "Electrical", reportedBy: "Patience Michael", reportedDate: "2026-06-24", priority: "Medium", status: "Open", assignedTo: "Unassigned" },
];

export const roomBookings: RoomBooking[] = [
  { id: "rb-01", room: "Conference Room A", title: "Mid-year Management Review", organizer: "Dr. Amina Bello", date: "2026-07-07", start: "10:00", end: "12:30", attendees: 14, status: "Confirmed" },
  { id: "rb-02", room: "Meeting Room B", title: "Procurement Bid Opening — SPN-011", organizer: "Engr. Musa Adamu", date: "2026-07-07", start: "14:00", end: "15:30", attendees: 6, status: "Confirmed" },
  { id: "rb-03", room: "Conference Room A", title: "Safeguards Grievance Session", organizer: "Emmanuel Terkula", date: "2026-07-08", start: "09:00", end: "10:30", attendees: 5, status: "Pending" },
  { id: "rb-04", room: "Meeting Room B", title: "Finance — Q2 Retirement Review", organizer: "Grace Yakubu", date: "2026-07-08", start: "11:00", end: "13:00", attendees: 4, status: "Confirmed" },
  { id: "rb-05", room: "Conference Room A", title: "Staff Durbar & Mid-year Review", organizer: "Lepwa Blessing Zadok", date: "2026-07-18", start: "10:00", end: "13:00", attendees: 18, status: "Confirmed" },
];

export const rooms = ["Conference Room A", "Meeting Room B"];

export function officeKpis() {
  const totalAssets = assets.length;
  const assetValue = assets.reduce((s, a) => s + a.value, 0);
  const needsRepair = assets.filter((a) => a.condition === "Needs Repair" || a.status === "Under Repair").length;
  const openMaintenance = maintenanceRequests.filter((m) => m.status !== "Completed").length;
  const vehiclesAvailable = vehicles.filter((v) => v.status === "Available").length;
  const utilisation = Math.round((vehicles.filter((v) => v.status === "On Trip").length / vehicles.length) * 100);
  return { totalAssets, assetValue, needsRepair, openMaintenance, vehiclesAvailable, totalVehicles: vehicles.length, utilisation, bookingsToday: roomBookings.filter((r) => r.date === "2026-07-07").length };
}

export const assetsByCategory = [
  { name: "ICT", value: assets.filter((a) => a.category === "ICT").length },
  { name: "Furniture", value: assets.filter((a) => a.category === "Furniture").length },
  { name: "Vehicle", value: assets.filter((a) => a.category === "Vehicle").length },
  { name: "Generator", value: assets.filter((a) => a.category === "Generator").length },
  { name: "Office Equipment", value: assets.filter((a) => a.category === "Office Equipment").length },
];
