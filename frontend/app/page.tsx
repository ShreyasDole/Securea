"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import {
  TrendingUp, TrendingDown, AlertTriangle, Zap, Eye,
  ArrowRight, CheckCircle2, Brain, Shield, Activity,
  ChevronRight, Users, BarChart2,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell,
} from "recharts";
import GlassCard from "@/components/shared/GlassCard";
import { useFirm } from "@/lib/firm-context";
import { decisions, intelligencePatterns } from "@/lib/mock-data";
import { formatCompact, greeting } from "@/lib/utils";

// ─── AUM trend mock (12 months) ──────────────────────────────
function aumTrend(baseCr: number) {
  const months = ["Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep"];
  let v = baseCr * 0.78;
  return months.map((m) => {
    v = +(v * (1 + (Math.random() * 0.06 - 0.01))).toFixed(0);
    return { month: m, aum: v };
  });
}

// ─── Segment sparkline ────────────────────────────────────────
const STATE_COLORS = { stable: "#10B981", watch: "#F59E0B", attention: "#EF4444" } as const;

export default function OverviewPage() {
  const { session }  = useFirm();
  const firm         = session?.firm;
  const ov           = firm?.overview;
  const userName     = session?.user.name.split(" ")[0] ?? "there";
  const userRole     = session?.user.role ?? "";

  // Derived data
  const totalRel     = ov?.totalRelationships ?? 2_400_000;
  const totalAumCr   = ov?.totalAumCr        ?? 48_210;
  const todayChanges = ov?.todayChanges       ?? 184;
  const pending      = ov?.pendingDecisions   ?? 14;
  const risks        = ov?.emergingRisks      ?? 6;
  const health       = ov?.portfolioHealth    ?? { stable: 82, watch: 14, attention: 4 };
  const signal       = ov?.featuredSignal;
  const segments     = ov?.segments ?? [];

  const totalAttention = segments.reduce((s, g) => s + g.attention, 0);
  const topDecisions   = decisions.filter((d) => d.status === "pending").slice(0, 4);
  const topPatterns    = intelligencePatterns.slice(0, 3);
  const trend          = aumTrend(totalAumCr);

  return (
    <div className="w-full space-y-4 animate-[fadeIn_0.3s_ease-out]">

      {/* ══ 1. HEADER ══════════════════════════════════════════ */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[26px] font-semibold text-n100 tracking-tight leading-tight">
            {greeting()}, {userName}.
          </h1>
          <p className="text-n500 text-[13px] mt-0.5">{userRole} · {firm?.name}</p>
        </div>
        <div className="flex items-center gap-3 mt-1">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-subtle text-[12px] text-n400 border border-white/[0.06]">
            <span className="w-1.5 h-1.5 rounded-full bg-success dot-pulse" />
            Live · {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true })}
          </div>
        </div>
      </div>

      {/* ══ 2. KPI STRIP ═══════════════════════════════════════ */}
      <div className="grid grid-cols-5 gap-3">
        <KpiCard
          label="Monitored"
          value={formatCompact(totalRel)}
          sub={`₹${formatCompact(totalAumCr)} Cr AUM`}
          icon={<Users size={15} className="text-primary" />}
          color="primary"
          href="/monitor"
        />
        <KpiCard
          label="Changed today"
          value={formatCompact(todayChanges)}
          sub="material shifts"
          icon={<Activity size={15} className="text-info" />}
          color="info"
          href="/monitor"
        />
        <KpiCard
          label="Need attention"
          value={formatCompact(totalAttention)}
          sub="require action now"
          icon={<AlertTriangle size={15} className="text-error" />}
          color="error"
          href="/monitor"
          pulse
        />
        <KpiCard
          label="Decisions pending"
          value={String(pending)}
          sub="waiting for approval"
          icon={<CheckCircle2 size={15} className="text-warning" />}
          color="warning"
          href="/monitor"
        />
        <KpiCard
          label="Emerging risks"
          value={String(risks)}
          sub="discovered by SECUREA"
          icon={<Brain size={15} className="text-intel" />}
          color="intel"
          href="/intelligence"
        />
      </div>

      {/* ══ 3. MAIN GRID ═══════════════════════════════════════ */}
      <div className="grid grid-cols-3 gap-4">

        {/* LEFT (2/3) ─────────────────────────────────────────── */}
        <div className="col-span-2 space-y-4">

          {/* Featured signal */}
          <GlassCard className="p-5" glow="intel">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-intel/15 border border-intel/25 flex items-center justify-center">
                  <Zap size={13} className="text-intel" />
                </div>
                <span className="text-[11px] font-semibold uppercase tracking-widest text-intel">SECUREA noticed</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-intel/10 border border-intel/20 text-intel text-[11px] font-medium shrink-0">
                {signal?.confidence ?? 91}% confidence
              </span>
            </div>
            <h2 className="text-[17px] font-semibold text-n100 leading-snug mb-2">
              {signal?.title ?? "HNI customers increasing cash allocation while reducing investment activity"}
            </h2>
            <p className="text-[13px] text-n400 leading-relaxed mb-4">
              {signal?.description ?? "Behavioural pattern detected across 48,231 relationships. SECUREA recommends immediate investigation before initiating any product action."}
            </p>
            <div className="flex items-center gap-6">
              <div className="px-3 py-2 rounded-lg glass-subtle border border-white/[0.05]">
                <p className="text-[20px] font-bold text-n100">{formatCompact(signal?.affected ?? 48231)}</p>
                <p className="text-[11px] text-n500">relationships affected</p>
              </div>
              <Link href="/intelligence" className="btn-primary text-[12px] py-1.5">
                Investigate <ArrowRight size={12} />
              </Link>
              <Link href="/ask" className="btn-ghost text-[12px] py-1.5">
                Ask SECUREA <ArrowRight size={12} />
              </Link>
            </div>
          </GlassCard>

          {/* Decisions */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-n600">Decisions requiring attention</p>
              <Link href="/monitor" className="text-[11px] text-primary hover:text-secondary transition-colors flex items-center gap-1">
                View all <ChevronRight size={11} />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {topDecisions.map((dec) => (
                <DecisionMiniCard key={dec.id} dec={dec} />
              ))}
            </div>
          </div>

          {/* AUM Trend chart */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-n500">AUM trend — 12 months</p>
                <p className="text-[22px] font-bold text-n100 mt-0.5">₹{formatCompact(totalAumCr)} Cr</p>
              </div>
              <div className="flex items-center gap-1.5 text-success text-[13px] font-semibold">
                <TrendingUp size={14} />
                +12.4% YoY
              </div>
            </div>
            <ResponsiveContainer width="100%" height={140}>
              <AreaChart data={trend} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="aumGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0.0}  />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" tick={{ fill: "#64748B", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false}
                  tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <Tooltip
                  contentStyle={{ background: "rgba(15,23,42,0.92)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12, color: "#F1F5F9" }}
                  formatter={(v) => [`₹${formatCompact(Number(v))} Cr`, "AUM"]}
                />
                <Area type="monotone" dataKey="aum" stroke="#6366F1" strokeWidth={2} fill="url(#aumGrad)" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </div>

        {/* RIGHT (1/3) ─────────────────────────────────────────── */}
        <div className="space-y-4">

          {/* Portfolio health */}
          <GlassCard className="p-5">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-n500 mb-4">Portfolio health</p>
            <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-4">
              <div className="bg-success rounded-l-full" style={{ width: `${health.stable}%` }} />
              <div className="bg-warning"               style={{ width: `${health.watch}%` }} />
              <div className="bg-error rounded-r-full"  style={{ width: `${health.attention}%` }} />
            </div>
            <div className="space-y-3">
              {[
                { label: "Stable",    pct: health.stable,    color: "bg-success", text: "text-success" },
                { label: "Watch",     pct: health.watch,     color: "bg-warning", text: "text-warning" },
                { label: "Attention", pct: health.attention, color: "bg-error",   text: "text-error"   },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${row.color}`} />
                    <span className="text-[13px] text-n400">{row.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-1.5 bg-n800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.pct}%` }} />
                    </div>
                    <span className={`text-[13px] font-semibold w-8 text-right ${row.text}`}>{row.pct}%</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/[0.05]">
              <p className="text-[11px] text-n600">Total monitored</p>
              <p className="text-[22px] font-bold text-n100 mt-0.5">{formatCompact(totalRel)}</p>
              <p className="text-[11px] text-n500">relationships across {segments.length} segments</p>
            </div>
          </GlassCard>

          {/* Segments quick view */}
          {segments.length > 0 && (
            <GlassCard className="p-5">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-n500">Segments</p>
                <Link href="/monitor" className="text-[11px] text-primary hover:text-secondary flex items-center gap-1">
                  Monitor <ChevronRight size={11} />
                </Link>
              </div>
              <div className="space-y-3">
                {segments.slice(0, 5).map((seg) => {
                  const attPct = Math.round((seg.attention / seg.totalCustomers) * 100);
                  const watchPct = Math.round((seg.watch / seg.totalCustomers) * 100);
                  return (
                    <Link key={seg.id} href={`/monitor/${seg.id}`} className="block group">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-sm shrink-0" style={{ background: seg.color }} />
                        <p className="text-[12px] text-n300 font-medium group-hover:text-n100 transition-colors truncate flex-1">{seg.label}</p>
                        {attPct > 0 && (
                          <span className="text-[10px] text-error font-semibold shrink-0">{formatCompact(seg.attention)} !</span>
                        )}
                      </div>
                      <div className="flex h-1 rounded-full overflow-hidden gap-px ml-4">
                        <div className="bg-success" style={{ width: `${Math.round((seg.stable / seg.totalCustomers) * 100)}%` }} />
                        <div className="bg-warning"  style={{ width: `${watchPct}%` }} />
                        <div className="bg-error"    style={{ width: `${attPct}%` }} />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </GlassCard>
          )}

          {/* Intelligence feed */}
          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-n500">Intelligence</p>
              <Link href="/intelligence" className="text-[11px] text-primary hover:text-secondary flex items-center gap-1">
                All <ChevronRight size={11} />
              </Link>
            </div>
            <div className="space-y-3">
              {topPatterns.map((p) => {
                const dot = p.type === "risk" ? "bg-error" : p.type === "behavioural" ? "bg-warning" : "bg-intel";
                return (
                  <div key={p.id} className="p-3 rounded-xl glass-subtle border border-white/[0.04]">
                    <div className="flex items-start gap-2">
                      <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${dot}`} />
                      <div>
                        <p className="text-[12px] font-medium text-n200 leading-snug">{p.title}</p>
                        <p className="text-[11px] text-n600 mt-0.5">{formatCompact(p.affectedCount)} affected · {p.confidence}% conf.</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* ══ 4. SEGMENT BAR CHART ════════════════════════════════ */}
      {segments.length > 0 && (
        <GlassCard className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-n500">Segment attention distribution</p>
              <p className="text-[13px] text-n400 mt-0.5">Entities requiring action across portfolio segments</p>
            </div>
            <Link href="/monitor" className="btn-ghost text-[12px] py-1.5">
              <BarChart2 size={13} />View Monitor
            </Link>
          </div>
          <ResponsiveContainer width="100%" height={130}>
            <BarChart data={segments.slice(0, 6).map(s => ({
              name: s.label.split(" ").slice(0, 2).join(" "),
              stable:    s.stable,
              watch:     s.watch,
              attention: s.attention,
            }))} margin={{ top: 0, right: 4, left: -20, bottom: 0 }}>
              <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#64748B", fontSize: 10 }} axisLine={false} tickLine={false}
                tickFormatter={(v) => formatCompact(v)} />
              <Tooltip
                contentStyle={{ background: "rgba(15,23,42,0.92)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12, color: "#F1F5F9" }}
                formatter={(v, name) => [formatCompact(Number(v)), String(name).charAt(0).toUpperCase() + String(name).slice(1)]}
              />
              <Bar dataKey="stable"    fill="#10B981" radius={[2,2,0,0]} maxBarSize={40} />
              <Bar dataKey="watch"     fill="#F59E0B" radius={[2,2,0,0]} maxBarSize={40} />
              <Bar dataKey="attention" fill="#EF4444" radius={[2,2,0,0]} maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex items-center gap-5 mt-1 justify-end">
            {[["Stable","#10B981"],["Watch","#F59E0B"],["Attention","#EF4444"]].map(([l,c])=>(
              <div key={l} className="flex items-center gap-1.5 text-[11px] text-n600">
                <div className="w-2 h-2 rounded-sm" style={{background:c}} />{l}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

    </div>
  );
}

// ─── KPI Card ─────────────────────────────────────────────────
function KpiCard({ label, value, sub, icon, color, href, pulse }: {
  label: string; value: string; sub: string; icon: React.ReactNode;
  color: "primary"|"info"|"error"|"warning"|"intel"; href: string; pulse?: boolean;
}) {
  const border = {
    primary: "hover:border-primary/30", info: "hover:border-info/30",
    error: "border-error/15 hover:border-error/30", warning: "hover:border-warning/30",
    intel: "hover:border-intel/30",
  }[color];
  const glow = { error: "glow-attention", primary: "", info: "", warning: "", intel: "glow-intel" }[color];

  return (
    <Link href={href}>
      <GlassCard className={`p-4 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 ${border} ${glow}`} hover>
        <div className="flex items-center justify-between mb-3">
          <div className="w-7 h-7 rounded-lg glass-subtle border border-white/[0.06] flex items-center justify-center">
            {icon}
          </div>
          {pulse && <span className="w-2 h-2 rounded-full bg-error dot-pulse" />}
        </div>
        <p className="text-[26px] font-bold text-n100 leading-none">{value}</p>
        <p className="text-[11px] text-n500 mt-1 uppercase tracking-wide">{label}</p>
        <p className="text-[11px] text-n600 mt-0.5">{sub}</p>
      </GlassCard>
    </Link>
  );
}

// ─── Decision Mini Card ───────────────────────────────────────
function DecisionMiniCard({ dec }: { dec: (typeof decisions)[number] }) {
  const isCrit = dec.priority === "critical";
  return (
    <GlassCard className={`p-4 ${isCrit ? "border-error/20" : "border-warning/15"}`}>
      <div className="flex items-start gap-2 mb-2">
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
          isCrit ? "bg-error/15 text-error" : "bg-warning/15 text-warning"}`}>
          {dec.priority.toUpperCase()}
        </span>
        <span className="text-n600 text-[10px] font-mono">{dec.id}</span>
      </div>
      <p className="text-[13px] font-semibold text-n100 leading-snug mb-1">{dec.title}</p>
      <p className="text-[11px] text-n500 line-clamp-2 mb-3">{dec.summary}</p>
      <div className="flex items-center justify-between">
        <div>
          {dec.exposure && <p className="text-[14px] font-bold text-n200">{dec.exposure}</p>}
          <p className="text-[10px] text-n600">{formatCompact(dec.affectedCount)} {dec.affectedLabel}</p>
        </div>
        <Link href="/monitor" className="flex items-center gap-1 text-[11px] text-primary hover:text-secondary transition-colors">
          Review <ChevronRight size={11} />
        </Link>
      </div>
    </GlassCard>
  );
}
