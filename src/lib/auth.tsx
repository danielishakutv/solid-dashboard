"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type Role = "coordinator" | "admin" | "management";

export interface DemoUser {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  roleLabel: string;
  title: string;
  avatar?: string;
  /** Whether this demo account can currently be used to sign in. */
  enabled: boolean;
}

export const DEMO_USERS: DemoUser[] = [
  {
    id: "u-admin",
    name: "Lepwa Blessing Zadok",
    email: "admin@solid.ad.gov.ng",
    password: "solid2025",
    role: "admin",
    roleLabel: "Admin Officer",
    title: "Administrative Officer",
    enabled: true,
  },
  {
    id: "u-coord",
    name: "Dr. Amina Bello",
    email: "coordinator@solid.ad.gov.ng",
    password: "solid2025",
    role: "coordinator",
    roleLabel: "Project Coordinator",
    title: "Project Coordinator, Adamawa PCU",
    enabled: false,
  },
  {
    id: "u-mgmt",
    name: "Ibrahim Musa",
    email: "management@solid.ad.gov.ng",
    password: "solid2025",
    role: "management",
    roleLabel: "Management",
    title: "Management (Read-only)",
    enabled: false,
  },
];

export type SessionUser = Omit<DemoUser, "password" | "enabled">;

interface AuthContextValue {
  user: SessionUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  loginAs: (role: Role) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "solid-session";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {
      /* noop */
    }
    setLoading(false);
  }, []);

  const persist = useCallback((u: SessionUser | null) => {
    setUser(u);
    try {
      if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      else localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* noop */
    }
  }, []);

  const login = useCallback<AuthContextValue["login"]>(
    async (email, password) => {
      // Simulate a short network round-trip for realism.
      await new Promise((r) => setTimeout(r, 550));
      const match = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password,
      );
      if (!match) {
        return { ok: false, error: "Invalid email or password. Try the demo credentials below." };
      }
      if (!match.enabled) {
        return {
          ok: false,
          error: "This demo account isn't available yet. Please sign in with the Admin Officer demo login.",
        };
      }
      const { password: _pw, enabled: _en, ...session } = match;
      persist(session);
      return { ok: true };
    },
    [persist],
  );

  const loginAs = useCallback(
    (role: Role) => {
      const match = DEMO_USERS.find((u) => u.role === role);
      if (!match || !match.enabled) return;
      const { password: _pw, enabled: _en, ...session } = match;
      persist(session);
    },
    [persist],
  );

  const logout = useCallback(() => persist(null), [persist]);

  const value = useMemo(
    () => ({ user, loading, login, loginAs, logout }),
    [user, loading, login, loginAs, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
