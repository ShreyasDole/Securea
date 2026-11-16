"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Radio,
  Sparkles,
  Search,
  MessageSquare,
  Network,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useFirm } from "@/lib/firm-context";

const primaryNav = [
  { href: "/",                  icon: LayoutDashboard, label: "Overview"         },
  { href: "/monitor",           icon: Radio,           label: "Monitor"          },
  { href: "/intelligence",      icon: Sparkles,        label: "Intelligence"     },
  { href: "/knowledge-graph",   icon: Network,         label: "Knowledge Graph"  },
];

const secondaryNav = [
  { href: "/explore", icon: Search,        label: "Explore"     },
  { href: "/ask",     icon: MessageSquare, label: "Ask SECUREA" },
];

export default function Sidebar() {
  const pathname        = usePathname();
  const { session }     = useFirm();
  const firm            = session?.firm;

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("securea-sidebar");
    if (saved === "collapsed") setCollapsed(true);
  }, []);

  function toggle() {
    const next = !collapsed;
    setCollapsed(next);
    localStorage.setItem("securea-sidebar", next ? "collapsed" : "open");
  }

  const w = collapsed ? "w-[60px]" : "w-60";

  return (
    <aside className={cn("sidebar-glass flex flex-col min-h-screen shrink-0 z-30 transition-all duration-300", w)}>
      {/* Brand + toggle */}
      <div className="flex items-center justify-between px-3 h-14 border-b border-white/[0.05] overflow-hidden">
        {!collapsed && (
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0 neu-raised">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" fill="white" fillOpacity="0.9"/>
                <path d="M7 4L10 5.75V9.25L7 11L4 9.25V5.75L7 4Z" fill="white" fillOpacity="0.3"/>
              </svg>
            </div>
            <span className="font-semibold text-[15px] tracking-wide text-n100 truncate">SECUREA</span>
          </div>
        )}

        {collapsed && (
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shrink-0 neu-raised mx-auto">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" fill="white" fillOpacity="0.9"/>
              <path d="M7 4L10 5.75V9.25L7 11L4 9.25V5.75L7 4Z" fill="white" fillOpacity="0.3"/>
            </svg>
          </div>
        )}

        {!collapsed && (
          <button
            onClick={toggle}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-n600 hover:text-n300 hover:bg-white/[0.05] transition-all shrink-0"
            title="Collapse sidebar"
          >
            <PanelLeftClose size={14} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 pt-4 space-y-0.5 overflow-hidden">
        {primaryNav.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            collapsed={collapsed}
          />
        ))}

        <div className="my-3 border-t border-white/[0.05]" />

        {secondaryNav.map((item) => (
          <NavItem
            key={item.href}
            {...item}
            active={pathname === item.href}
            collapsed={collapsed}
            secondary
          />
        ))}

        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={toggle}
            className="w-full flex items-center justify-center py-2.5 mt-2 rounded-lg text-n600 hover:text-n300 hover:bg-white/[0.04] transition-all"
            title="Expand sidebar"
          >
            <PanelLeftOpen size={15} />
          </button>
        )}
      </nav>

      {/* Firm footer */}
      {firm && (
        <div className={cn("border-t border-white/[0.05] overflow-hidden", collapsed ? "px-2 py-3" : "px-4 py-4")}>
          {collapsed ? (
            <div
              className="w-8 h-8 rounded-md flex items-center justify-center text-[14px] mx-auto"
              style={{ background: `${firm.color}18`, border: `1px solid ${firm.color}30` }}
              title={firm.name}
            >
              {firm.logo}
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center text-[14px] shrink-0"
                style={{ background: `${firm.color}18`, border: `1px solid ${firm.color}30` }}
              >
                {firm.logo}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-n200 truncate">{firm.shortName}</p>
                <p className="text-[11px] text-n500 truncate">{firm.type.replace("-", " ")}</p>
              </div>
              <ChevronRight size={12} className="text-n600 shrink-0" />
            </div>
          )}
        </div>
      )}
    </aside>
  );
}

function NavItem({
  href,
  icon: Icon,
  label,
  active,
  secondary = false,
  collapsed = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  active: boolean;
  secondary?: boolean;
  collapsed?: boolean;
}) {
  return (
    <Link
      href={href}
      title={collapsed ? label : undefined}
      className={cn(
        "group flex items-center gap-3 rounded-lg text-[13px] font-medium transition-all duration-150 overflow-hidden",
        collapsed ? "justify-center px-0 py-2.5" : "px-3 py-2.5",
        active
          ? "bg-primary/15 text-primary border border-primary/20 neu-raised"
          : secondary
          ? "text-n500 hover:text-n300 hover:bg-white/[0.04] border border-transparent"
          : "text-n400 hover:text-n200 hover:bg-white/[0.04] border border-transparent"
      )}
    >
      <Icon size={15} className={cn("shrink-0 transition-colors", active ? "text-primary" : "text-current")} />
      {!collapsed && (
        <>
          <span>{label}</span>
          {active && <div className="ml-auto w-1 h-1 rounded-full bg-primary" />}
        </>
      )}
    </Link>
  );
}
