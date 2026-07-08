"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  Clock,
  FileSignature,
  Users,
  AlertCircle,
} from "lucide-react";
import { Logo, LogoMark } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input, Label } from "@/components/ui/field";
import { useAuth, DEMO_USERS, type Role } from "@/lib/auth";
import { cn } from "@/lib/utils";

const roleButtons: { role: Role; label: string; icon: typeof Clock }[] = [
  { role: "coordinator", label: "Coordinator", icon: ShieldCheck },
  { role: "admin", label: "Admin Officer", icon: Users },
  { role: "management", label: "Management", icon: FileSignature },
];

const highlights = [
  { icon: Clock, title: "Real-time attendance", text: "Live staff availability & check-in monitoring" },
  { icon: FileSignature, title: "Contract & payment tracking", text: "Milestones, APG validity & disbursement" },
  { icon: Sparkles, title: "Management dashboard", text: "Monthly performance at a glance" },
];

export default function LoginPage() {
  const { login, loginAs, user, loading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace("/dashboard");
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const res = await login(email, password);
    setSubmitting(false);
    if (res.ok) router.replace("/dashboard");
    else setError(res.error ?? "Login failed");
  };

  const quickLogin = (role: Role) => {
    loginAs(role);
    router.replace("/dashboard");
  };

  const fillDemo = () => {
    setEmail(DEMO_USERS[0].email);
    setPassword(DEMO_USERS[0].password);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Brand panel */}
      <div className="relative hidden w-1/2 overflow-hidden brand-gradient lg:flex lg:flex-col">
        <div className="absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -left-16 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl" />

        <div className="relative z-10 flex flex-1 flex-col p-12 text-white">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
              <LogoMark className="h-7 w-7" />
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-extrabold">SOLID</span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/70">
                Adamawa PCU
              </span>
            </span>
          </Link>

          <div className="my-auto max-w-md">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Administrative Command Centre
            </span>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-balance">
              Run the project office with clarity and control.
            </h1>
            <p className="mt-4 text-white/80">
              One secure workspace for attendance, registry, contracts, procurement and
              management reporting — built for the SOLID Project Coordinating Unit.
            </p>

            <div className="mt-10 space-y-4">
              {highlights.map((h) => (
                <div key={h.title} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur">
                    <h.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-bold">{h.title}</p>
                    <p className="text-sm text-white/75">{h.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="relative z-10 text-sm text-white/60">
            World Bank–supported · Adamawa State Government
          </p>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex w-full flex-col items-center justify-center px-5 py-10 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex items-center justify-between lg:hidden">
            <Logo />
          </div>

          <div className="mb-8">
            <h2 className="font-display text-2xl font-extrabold text-foreground">Welcome back</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Sign in to your SOLID administrative workspace.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="flex items-start gap-2 rounded-xl border border-danger/20 bg-danger-soft px-3.5 py-3 text-sm text-danger animate-fade-in">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@solid.ad.gov.ng"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button type="button" className="mb-1.5 text-xs font-semibold text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-11"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPw ? "Hide password" : "Show password"}
                >
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" loading={submitting} className="w-full">
              Sign in
              {!submitting && <ArrowRight className="h-4 w-4" />}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 rounded-2xl border border-dashed border-primary/30 bg-primary-soft/40 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold uppercase tracking-wide text-primary">Demo access</p>
              <button
                onClick={fillDemo}
                className="text-xs font-semibold text-primary hover:underline"
              >
                Autofill
              </button>
            </div>
            <div className="mt-2 space-y-1 text-sm">
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Email</span>
                <code className="rounded bg-surface px-1.5 py-0.5 text-xs font-semibold text-foreground">
                  coordinator@solid.ad.gov.ng
                </code>
              </p>
              <p className="flex items-center justify-between">
                <span className="text-muted-foreground">Password</span>
                <code className="rounded bg-surface px-1.5 py-0.5 text-xs font-semibold text-foreground">
                  solid2025
                </code>
              </p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2">
              {roleButtons.map((r) => (
                <button
                  key={r.role}
                  onClick={() => quickLogin(r.role)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl border border-border bg-surface px-2 py-2.5 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-soft",
                  )}
                >
                  <r.icon className="h-4 w-4 text-primary" />
                  <span className="text-[11px] font-bold text-foreground">{r.label}</span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link href="/" className="font-semibold text-primary hover:underline">
              ← Back to homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
