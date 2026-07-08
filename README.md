# SOLID Project — Administrative Performance Dashboard

A modern, responsive **frontend demo** of the digital administrative command centre for the
**SOLID Project, Adamawa State Project Coordinating Unit (PCU)**. It digitises the initiatives in
the project's *Administrative Improvement Plan* — attendance, registry, contracts, procurement,
assets, visitors, meetings, leave and management reporting — in one fast, beautiful workspace.

> ⚠️ **Demo only.** All data is illustrative and lives in the browser. There is no backend,
> database or persistence yet. Authentication is simulated for demonstration.

---

## Quick start

```bash
npm install      # already run
npm run dev      # start the dev server
```

Then open **http://localhost:3000** (or the port shown in the terminal).

### Demo login

| Field | Value |
|------|-------|
| Email | `admin@solid.ad.gov.ng` |
| Password | `solid2025` |

The login screen has an **Autofill** shortcut and a one-click **Admin Officer** button.
For now only the **Admin Officer** demo account is active; the Coordinator and Management
accounts are shown but disabled ("Soon").

---

## What's inside

| Area | Route | Highlights |
|------|-------|-----------|
| **Landing page** | `/` | Marketing intro, live dashboard preview, feature & module tour |
| **Login** | `/login` | Split-screen auth with demo credentials & quick role login |
| **Overview** | `/dashboard` | Monthly performance snapshot, health score, KPIs, alerts, activity |
| **Attendance** | `/dashboard/attendance` | Live availability, punctuality trends, today's roster |
| **Staff Directory** | `/dashboard/staff` | Personnel records, profiles, leave balances |
| **Leave Planner** | `/dashboard/leave` | Leave register, continuity forecast, balances |
| **Registry & Files** | `/dashboard/registry` | Correspondence, project files, file-movement register |
| **Contracts & Payments** | `/dashboard/contracts` | Portfolio, milestones, APG watch, disbursement |
| **Procurement** | `/dashboard/procurement` | Pipeline board, methods, No-Objection status |
| **Calendar** | `/dashboard/calendar` | Procurement & contract milestone calendar |
| **Office Administration** | `/dashboard/office` | Assets, fleet, maintenance, room bookings |
| **Visitor Management** | `/dashboard/visitors` | Register, ID badges, statistics |
| **Meeting Action Tracker** | `/dashboard/meetings` | Action points, owners, deadlines, status |
| **Reports** | `/dashboard/reports` | Report library & monthly performance report |
| **Settings** | `/dashboard/settings` | Profile, appearance (light/dark), notifications |

Every screen is **fully responsive** (mobile → desktop) and supports **light & dark themes**
(toggle in the top bar or Settings).

---

## Tech stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** with a custom, token-based design system (light/dark via CSS variables)
- **Recharts** for charts (CVD-safe, theme-aware palette)
- **lucide-react** icons · **Plus Jakarta Sans** + **Inter** fonts

## Project structure

```
src/
├── app/                 # routes (landing, login, dashboard/*)
├── components/
│   ├── ui/              # design-system primitives (Button, Card, DataTable, …)
│   ├── charts.tsx       # Recharts wrappers
│   ├── shell/           # sidebar, topbar, dashboard shell + auth guard
│   ├── landing/         # landing-page sections
│   ├── dashboard/       # shared dashboard widgets
│   └── brand/           # logo
├── data/                # typed demo data for every module
└── lib/                 # auth, theme, utils, chart theme
```

## Notes & next steps

See **`REVIEW_NOTES.md`** for a full walkthrough of what's built, known limitations, and the
recommended path to a production system (backend, real auth, persistence).
