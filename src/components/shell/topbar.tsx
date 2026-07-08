"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, Menu, Search, Check, ChevronRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { notifications } from "@/data/activity";
import { useCurrentNav } from "./sidebar";
import { cn } from "@/lib/utils";

function useClickOutside<T extends HTMLElement>(onClose: () => void) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);
  return ref;
}

export function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const { user, logout } = useAuth();
  const current = useCurrentNav();
  const [notifOpen, setNotifOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;

  const notifRef = useClickOutside<HTMLDivElement>(() => setNotifOpen(false));
  const menuRef = useClickOutside<HTMLDivElement>(() => setMenuOpen(false));

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-border bg-surface/80 px-4 backdrop-blur-xl sm:px-6">
      <button
        onClick={onMenuClick}
        className="flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground hover:bg-surface-2 lg:hidden"
        aria-label="Open menu"
      >
        <Menu size={20} />
      </button>

      {/* Breadcrumb */}
      <div className="hidden items-center gap-1.5 text-sm md:flex">
        <span className="font-medium text-muted-foreground">SOLID</span>
        <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
        <span className="font-bold text-foreground">{current?.item.label ?? "Dashboard"}</span>
      </div>

      {/* Search */}
      <div className="relative ml-auto hidden w-full max-w-xs sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          placeholder="Search records, files, contracts…"
          className="h-10 w-full rounded-xl border border-border bg-surface-2/50 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/40 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ring/30"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
        <ThemeToggle />

        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotifOpen((o) => !o)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell size={18} />
            {unread > 0 && (
              <span className="absolute right-2 top-2 flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-danger ring-2 ring-surface" />
              </span>
            )}
          </button>
          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 origin-top-right animate-fade-in-scale rounded-2xl border border-border bg-surface shadow-lift">
              <div className="flex items-center justify-between border-b border-border px-4 py-3">
                <p className="font-display text-sm font-bold text-foreground">Notifications</p>
                <span className="rounded-full bg-danger-soft px-2 py-0.5 text-[11px] font-bold text-danger">
                  {unread} new
                </span>
              </div>
              <div className="max-h-80 overflow-y-auto py-1">
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={cn(
                      "flex gap-3 px-4 py-2.5 transition-colors hover:bg-surface-2",
                      !n.read && "bg-primary-soft/40",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                        n.read ? "bg-transparent" : "bg-primary",
                      )}
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{n.title}</p>
                      <p className="text-xs text-muted-foreground">{n.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                href="/dashboard"
                onClick={() => setNotifOpen(false)}
                className="block border-t border-border px-4 py-2.5 text-center text-sm font-semibold text-primary hover:bg-surface-2"
              >
                View all activity
              </Link>
            </div>
          )}
        </div>

        {/* User menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-2 rounded-xl border border-border bg-surface py-1 pl-1 pr-2 transition-colors hover:bg-surface-2"
          >
            <Avatar name={user?.name ?? "User"} size="sm" />
            <span className="hidden text-left sm:block">
              <span className="block text-xs font-bold leading-tight text-foreground">
                {user?.name?.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="block text-[11px] leading-tight text-muted-foreground">
                {user?.roleLabel}
              </span>
            </span>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 origin-top-right animate-fade-in-scale rounded-2xl border border-border bg-surface p-1.5 shadow-lift">
              <div className="border-b border-border px-3 py-2.5">
                <p className="text-sm font-bold text-foreground">{user?.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
              </div>
              <Link
                href="/dashboard/settings"
                onClick={() => setMenuOpen(false)}
                className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-2"
              >
                Account settings
              </Link>
              <Link
                href="/dashboard/reports"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-2"
              >
                My reports
              </Link>
              <button
                onClick={logout}
                className="mt-1 flex w-full items-center gap-2 rounded-lg border-t border-border px-3 py-2 text-sm font-semibold text-danger hover:bg-danger-soft"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export { Check };
