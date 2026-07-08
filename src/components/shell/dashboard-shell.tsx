"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { LogoMark } from "@/components/brand/logo";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";

function Splash() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-background">
      <div className="animate-pulse-ring rounded-2xl">
        <LogoMark className="h-14 w-14 animate-fade-in-scale" />
      </div>
      <p className="text-sm font-medium text-muted-foreground">Loading your workspace…</p>
    </div>
  );
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) router.replace("/login");
  }, [loading, user, router]);

  if (loading || !user) return <Splash />;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
      <div className="lg:pl-64">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6 sm:py-8">{children}</main>
        <footer className="mx-auto max-w-[1400px] px-4 py-6 sm:px-6">
          <div className="flex flex-col items-center justify-between gap-2 border-t border-border pt-5 text-xs text-muted-foreground sm:flex-row">
            <p>© 2026 SOLID Project · Adamawa State Project Coordinating Unit</p>
            <p className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              Demo environment · Data is illustrative
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
