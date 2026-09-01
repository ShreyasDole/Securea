"use client";

import { useState } from "react";
import { Bell, Search, Settings, Sun, Moon, LogOut, ChevronDown } from "lucide-react";
import { todayStats } from "@/lib/mock-data";
import { useTheme } from "@/lib/theme-context";
import { useFirm } from "@/lib/firm-context";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const { theme, toggle }   = useTheme();
  const { session, logout } = useFirm();
  const router              = useRouter();
  const [showMenu, setMenu] = useState(false);

  const now     = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
  const dateStr = now.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short", year: "numeric" });

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <header className="topbar-glass sticky top-0 z-20 flex items-center justify-between h-14 px-6">
      {/* Left */}
      <div className="flex items-center gap-2 text-[12px] text-n500">
        {session && (
          <>
            <span
              className="text-n300 font-medium px-2 py-0.5 rounded-full border text-[11px]"
              style={{ borderColor: `${session.firm.color}35`, color: session.firm.color, background: `${session.firm.color}10` }}
            >
              {session.firm.shortName}
            </span>
            <span>·</span>
          </>
        )}
        <span>{dateStr}</span>
        <span>·</span>
        <span>{timeStr}</span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-1">
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/[0.07] text-n500 text-[12px] hover:border-white/[0.12] hover:text-n400 transition-all"
          aria-label="Search"
        >
          <Search size={13} />
          <span>Search</span>
          <kbd className="ml-2 px-1.5 py-0.5 rounded bg-n800 text-n600 text-[10px] border border-white/[0.06]">⌘K</kbd>
        </button>

        <button
          className="relative flex items-center justify-center w-8 h-8 rounded-lg text-n500 hover:text-n300 hover:bg-white/[0.04] transition-all ml-1"
          aria-label="Notifications"
        >
          <Bell size={15} />
          {todayStats.decisionsRequiringAttention > 0 && (
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-error" />
          )}
        </button>

        <button
          onClick={toggle}
          className="flex items-center justify-center w-8 h-8 rounded-lg text-n500 hover:text-n300 hover:bg-white/[0.04] transition-all"
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
        >
          {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button className="flex items-center justify-center w-8 h-8 rounded-lg text-n500 hover:text-n300 hover:bg-white/[0.04] transition-all">
          <Settings size={15} />
        </button>

        {/* User menu */}
        {session && (
          <div className="relative ml-2">
            <button
              onClick={() => setMenu(!showMenu)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-white/[0.04] transition-all"
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-[11px] font-semibold text-white">
                {session.user.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-[12px] font-medium text-n200 leading-none">{session.user.name.split(" ")[0]}</p>
                <p className="text-[10px] text-n600 leading-none mt-0.5">{session.user.role.split(" ").slice(0, 2).join(" ")}</p>
              </div>
              <ChevronDown size={12} className="text-n600" />
            </button>

            {showMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setMenu(false)} />
                <div className="absolute right-0 top-full mt-1 w-[200px] aether-card py-1 z-20">
                  <div className="px-3 py-2 border-b border-white/[0.05]">
                    <p className="text-[13px] font-medium text-n100">{session.user.name}</p>
                    <p className="text-[11px] text-n500">{session.user.role}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-[13px] text-error hover:bg-error/5 transition-colors"
                  >
                    <LogOut size={13} />
                    Switch organisation
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
