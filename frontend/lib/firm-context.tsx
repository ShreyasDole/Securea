"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Firm } from "./mock-firms";

interface FirmSession {
  firm: Firm;
  user: { name: string; role: string; avatar: string };
}

interface FirmCtx {
  session: FirmSession | null;
  login:  (session: FirmSession) => void;
  logout: () => void;
}

const FirmContext = createContext<FirmCtx>({
  session: null,
  login:   () => {},
  logout:  () => {},
});

export function FirmProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<FirmSession | null>(null);
  const [loaded, setLoaded]   = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("securea-session");
      if (raw) setSession(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  function login(s: FirmSession) {
    setSession(s);
    localStorage.setItem("securea-session", JSON.stringify(s));
  }

  function logout() {
    setSession(null);
    localStorage.removeItem("securea-session");
  }

  if (!loaded) return null;

  return (
    <FirmContext.Provider value={{ session, login, logout }}>
      {children}
    </FirmContext.Provider>
  );
}

export const useFirm = () => useContext(FirmContext);
