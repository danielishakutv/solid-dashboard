import Link from "next/link";
import {
  ArrowRight,
  Clock,
  FolderOpen,
  FileSignature,
  ShoppingCart,
  Building2,
  Users,
  UserCheck,
  ClipboardCheck,
  CalendarRange,
  PlaneTakeoff,
  BarChart3,
  ShieldCheck,
  Zap,
  Smartphone,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { LandingNav } from "@/components/landing/landing-nav";
import { HeroPreview } from "@/components/landing/hero-preview";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "12", label: "Integrated modules" },
  { value: "18", label: "Staff onboarded" },
  { value: "94%", label: "Attendance rate" },
  { value: "₦1.2B", label: "Contracts monitored" },
];

const features = [
  { icon: Clock, title: "Attendance & Time", text: "One-click check-in, live availability board and automatic supervisor alerts.", tone: "text-success bg-success-soft" },
  { icon: FolderOpen, title: "Electronic Registry", text: "Track incoming, outgoing and internal correspondence with a full file-movement register.", tone: "text-info bg-info-soft" },
  { icon: FileSignature, title: "Contracts & Payments", text: "Monitor awards, milestones, APG validity, tranches and outstanding balances.", tone: "text-primary bg-primary-soft" },
  { icon: ShoppingCart, title: "Procurement Pipeline", text: "From planning to award — bid closings, evaluations and No-Objection status.", tone: "text-accent bg-accent/10" },
  { icon: Building2, title: "Office Administration", text: "Asset register, fleet utilisation, maintenance tickets and room bookings.", tone: "text-warning bg-warning-soft" },
  { icon: UserCheck, title: "Visitor Management", text: "Electronic register, ID badges and monthly visitor statistics for security.", tone: "text-info bg-info-soft" },
  { icon: ClipboardCheck, title: "Meeting Action Tracker", text: "Turn management decisions into tracked actions with owners and deadlines.", tone: "text-primary bg-primary-soft" },
  { icon: PlaneTakeoff, title: "Leave Planner", text: "Annual, casual, sick and training leave with continuity and balance tracking.", tone: "text-success bg-success-soft" },
  { icon: BarChart3, title: "Performance Dashboard", text: "A monthly snapshot of every administrative indicator for management.", tone: "text-accent bg-accent/10" },
];

const modules = [
  { icon: Clock, label: "Attendance", href: "/dashboard/attendance" },
  { icon: Users, label: "Staff Directory", href: "/dashboard/staff" },
  { icon: PlaneTakeoff, label: "Leave Planner", href: "/dashboard/leave" },
  { icon: FolderOpen, label: "Registry & Files", href: "/dashboard/registry" },
  { icon: FileSignature, label: "Contracts", href: "/dashboard/contracts" },
  { icon: ShoppingCart, label: "Procurement", href: "/dashboard/procurement" },
  { icon: CalendarRange, label: "Calendar", href: "/dashboard/calendar" },
  { icon: Building2, label: "Office Admin", href: "/dashboard/office" },
  { icon: UserCheck, label: "Visitors", href: "/dashboard/visitors" },
  { icon: ClipboardCheck, label: "Meetings", href: "/dashboard/meetings" },
  { icon: BarChart3, label: "Reports", href: "/dashboard/reports" },
];

const outcomes = [
  "Improved staff accountability and workforce visibility",
  "Faster document retrieval and file tracking",
  "Better contract and payment monitoring",
  "Enhanced administrative efficiency across units",
  "Stronger internal controls and audit readiness",
  "Compliance with World Bank project requirements",
];

const pillars = [
  { icon: Zap, title: "Fast", text: "Instant, app-like navigation built on Next.js — no waiting between pages." },
  { icon: Smartphone, title: "Mobile-first", text: "Every screen works cleanly on phones, tablets and desktops." },
  { icon: ShieldCheck, title: "Secure by design", text: "Role-based access, visitor badges and complete audit trails." },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10 grid-pattern opacity-[0.4] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
        <div className="absolute -top-40 left-1/2 -z-10 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1.5 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                SOLID Project · Adamawa State PCU
              </span>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl lg:text-6xl">
                The administrative <span className="brand-gradient-text">command centre</span> for your project office.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Attendance, registry, contracts, procurement, assets and management reporting —
                unified in one fast, beautiful dashboard built for the Project Coordinating Unit.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Launch live demo
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <a href="#features">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore features
                  </Button>
                </a>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                No setup required · Demo login:{" "}
                <code className="rounded bg-surface-2 px-1.5 py-0.5 text-xs font-semibold text-foreground">
                  coordinator@solid.ad.gov.ng
                </code>
              </p>
            </div>

            <div className="animate-fade-in animate-delay-200">
              <HeroPreview />
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-surface p-6 shadow-card sm:grid-cols-4 sm:gap-6">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-display text-3xl font-extrabold text-foreground sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Everything in one place</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Twelve administrative systems, one workspace
            </h2>
            <p className="mt-4 text-muted-foreground">
              Every initiative in the Administrative Improvement Plan — digitised, automated and
              connected so nothing falls through the cracks.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl border border-border bg-surface p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-lift"
              >
                <span className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${f.tone}`}>
                  <f.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars band */}
      <section className="border-y border-border bg-surface-2/40 py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl brand-gradient text-white shadow-soft">
                <p.icon className="h-6 w-6" />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold text-foreground">{p.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="scroll-mt-20 py-20 sm:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-wider text-primary">Explore the demo</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Jump straight into any module
            </h2>
            <p className="mt-4 text-muted-foreground">
              Fully interactive with realistic demo data. Sign in once and browse freely.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {modules.map((m) => (
              <Link
                key={m.href}
                href="/login"
                className="group flex items-center gap-3 rounded-xl border border-border bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <m.icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-foreground">{m.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section id="outcomes" className="scroll-mt-20 pb-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-card">
            <div className="grid lg:grid-cols-2">
              <div className="relative overflow-hidden brand-gradient p-10 text-white sm:p-12">
                <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
                <p className="relative text-sm font-bold uppercase tracking-wider text-white/80">Expected outcomes</p>
                <h2 className="relative mt-3 font-display text-3xl font-extrabold leading-tight">
                  Built to deliver measurable administrative improvement.
                </h2>
                <p className="relative mt-4 text-white/80">
                  Aligned with the SOLID Project Administrative Improvement Plan and World Bank
                  project management requirements.
                </p>
                <Link href="/login" className="relative mt-8 inline-block">
                  <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                    Open the dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              <div className="p-10 sm:p-12">
                <ul className="space-y-4">
                  {outcomes.map((o) => (
                    <li key={o} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                      <span className="text-sm font-medium text-foreground">{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface-2/30">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col items-start justify-between gap-8 sm:flex-row">
            <div className="max-w-sm">
              <Logo />
              <p className="mt-4 text-sm text-muted-foreground">
                Administrative Performance Dashboard for the SOLID Project, Adamawa State Project
                Coordinating Unit. A demonstration environment.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-10 sm:gap-16">
              <div>
                <p className="text-sm font-bold text-foreground">Product</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li><a href="#features" className="hover:text-foreground">Features</a></li>
                  <li><a href="#modules" className="hover:text-foreground">Modules</a></li>
                  <li><Link href="/login" className="hover:text-foreground">Live demo</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">Project</p>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>Adamawa State PCU</li>
                  <li>World Bank supported</li>
                  <li>Administrative Unit</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row">
            <p>© 2026 SOLID Project · Adamawa State Government. Demo data is illustrative.</p>
            <p>Built with Next.js · Designed for the PCU</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
