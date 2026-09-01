"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { useFirm } from "@/lib/firm-context";

export default function Shell({ children }: { children: React.ReactNode }) {
  const { session } = useFirm();
  const pathname    = usePathname();
  const router      = useRouter();

  useEffect(() => {
    if (!session && pathname !== "/login") {
      router.replace("/login");
    }
  }, [session, pathname, router]);

  // On login page — render bare (no chrome)
  if (pathname === "/login") {
    return <>{children}</>;
  }

  // Not yet auth'd — blank while redirect fires
  if (!session) return null;

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-base)" }}>
      <Sidebar />
      <div className="flex flex-col flex-1 min-w-0">
        <TopBar />
        <main className="flex-1 overflow-auto scrollbar-thin p-6 w-full">
          {children}
        </main>
      </div>
    </div>
  );
}
