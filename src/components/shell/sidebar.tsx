"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogOut, ChevronRight } from "lucide-react";
import { navGroups } from "@/data/nav";
import { Logo } from "@/components/brand/logo";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

export function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-border px-5">
        <Link href="/dashboard" onClick={onNavigate}>
          <Logo />
        </Link>
        {onNavigate && (
          <button
            onClick={onNavigate}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground hover:bg-surface-2 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-5">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-muted-foreground/70">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => {
                const active = isActive(pathname, item.href);
                const Icon = item.icon;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all",
                        active
                          ? "bg-primary text-primary-foreground shadow-soft"
                          : "text-muted-foreground hover:bg-surface-2 hover:text-foreground",
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-[18px] w-[18px] shrink-0",
                          active ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground",
                        )}
                      />
                      <span className="flex-1 truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={cn(
                            "rounded-full px-1.5 py-0.5 text-[10px] font-bold",
                            active ? "bg-white/20 text-white" : "bg-danger-soft text-danger",
                          )}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-border p-3">
        <div className="flex items-center gap-3 rounded-xl px-2 py-2">
          <Avatar name={user?.name ?? "User"} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-foreground">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">{user?.roleLabel}</p>
          </div>
          <button
            onClick={logout}
            aria-label="Sign out"
            title="Sign out"
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-danger-soft hover:text-danger"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar({
  mobileOpen,
  onClose,
}: {
  mobileOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm animate-fade-in"
            onClick={onClose}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[80%] animate-slide-in-right shadow-lift">
            <SidebarContent onNavigate={onClose} />
          </div>
        </div>
      )}
    </>
  );
}

/** Small breadcrumb helper used in the topbar. */
export function useCurrentNav() {
  const pathname = usePathname();
  for (const group of navGroups) {
    for (const item of group.items) {
      if (isActive(pathname, item.href)) return { item, group };
    }
  }
  return null;
}

export { ChevronRight };
