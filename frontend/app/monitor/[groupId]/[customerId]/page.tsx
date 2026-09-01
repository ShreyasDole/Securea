"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, TrendingUp, TrendingDown, Shield, AlertTriangle, Zap,
  CheckCircle2, Target, Clock, ChevronRight, BarChart3, List,
  GitBranch, Cpu, ArrowUpRight, ArrowDownRight, Minus,
} from "lucide-react";
import dynamic from "next/dynamic";
import GlassCard from "@/components/shared/GlassCard";
import { StatePill } from "@/components/shared/StatusPill";
import { getSegment, getCustomer } from "@/lib/mock-customers";
import { getHoldingsForCustomer, getTransactionsForCustomer } from "@/lib/mock-portfolio";
import { decisions } from "@/lib/mock-data";
import { cn, formatCompact } from "@/lib/utils";
import type { Holding, Transaction } from "@/lib/mock-portfolio";

const AllocationChart  = dynamic(() => import("@/components/charts/AllocationChart"),  { ssr: false });
const PerformanceChart = dynamic(() => import("@/components/charts/PerformanceChart"), { ssr: false });

type Tab = "overview" | "holdings" | "transactions" | "decisions";

const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
  { id: "overview",      label: "Overview",      icon: BarChart3  },
  { id: "holdings",      label: "Holdings",       icon: List       },
  { id: "transactions",  label: "Transactions",   icon: ArrowUpRight },
  { id: "decisions",     label: "Decisions",      icon: GitBranch  },
];

export default function FinancialTwinPage() {
  const { groupId, customerId } = useParams<{ groupId: string; customerId: string }>();
  const [activeTab, setActiveTab] = useState<Tab>("overview");

  const segment  = getSegment(groupId);
  const customer = getCustomer(groupId, customerId);
  const holdings = getHoldingsForCustomer(customerId, customer?.aumL ?? 100);
  const txns     = getTransactionsForCustomer(customerId);

  if (!customer || !segment) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-n500">
        <p className="text-[16px]">Client not found.</p>
        <Link href={`/monitor/${groupId}`} className="text-primary text-[13px] mt-2">← Back</Link>
      </div>
    );
  }

  const relatedDecisions = decisions.filter((d) => customer.relatedDecisions.includes(d.id));
  const totalInvested    = holdings.reduce((s, h) => s + h.investedAmt, 0);
  const totalCurrent     = holdings.reduce((s, h) => s + h.currentValue, 0);
  const totalPnL         = totalCurrent - totalInvested;
  const totalPnLPct      = totalInvested > 0 ? (totalPnL / totalInvested) * 100 : 0;
  const r1y              = customer.returns.oneYear;

  return (
    <div className="w-full space-y-4 animate-[fadeIn_0.3s_ease-out]">

      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-[12px] text-n600">
        <Link href="/monitor" className="hover:text-n300 flex items-center gap-1 transition-colors">
          <ArrowLeft size={12} />Monitor
        </Link>
        <span>/</span>
        <Link href={`/monitor/${groupId}`} className="hover:text-n300 transition-colors">
          {segment.label}
        </Link>
        <span>/</span>
        <span className="text-n300">{customer.name}</span>
      </div>

      {/* ── Financial Twin Header ─────────────────────────────── */}
      <GlassCard className="p-5">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 to-secondary/30 border border-white/[0.1] flex items-center justify-center text-[20px] font-bold text-n100 shrink-0 neu-raised">
              {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-[20px] font-semibold text-n100">{customer.name}</h1>
                <StatePill state={customer.state} />
                <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-semibold uppercase tracking-wide flex items-center gap-1">
                  <Cpu size={9} />Financial Twin
                </span>
              </div>
              <div className="flex items-center gap-3 text-[12px] text-n500 flex-wrap">
                <span className="font-mono">{customer.accountId}</span>
                <span>·</span><span>{customer.segmentLabel}</span>
                <span>·</span><span>{customer.city}</span>
                <span>·</span><span>Age {customer.age}</span>
                <span>·</span><span>{customer.occupation}</span>
                <span>·</span><span>RM: {customer.rm}</span>
              </div>
              {customer.stateReason && (
                <div className="flex items-center gap-1.5 mt-1.5">
                  <AlertTriangle size={12} className="text-error" />
                  <p className="text-[12px] text-error">{customer.stateReason}</p>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 shrink-0 text-right">
            <div>
              <p className="text-[11px] text-n600">Total AUM</p>
              <p className="text-[22px] font-bold text-n100">{customer.aumFormatted}</p>
            </div>
            <div>
              <p className="text-[11px] text-n600">Total P&amp;L</p>
              <p className={`text-[22px] font-bold ${totalPnL >= 0 ? "text-success" : "text-error"}`}>
                {totalPnL >= 0 ? "+" : ""}₹{Math.abs(totalPnL).toFixed(1)}L
              </p>
              <p className={`text-[11px] ${totalPnLPct >= 0 ? "text-success" : "text-error"}`}>
                {totalPnLPct >= 0 ? "+" : ""}{totalPnLPct.toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-[11px] text-n600">Risk Profile</p>
              <p className={`text-[22px] font-bold ${customer.riskScore >= 7 ? "text-error" : customer.riskScore >= 5 ? "text-warning" : "text-success"}`}>
                {customer.riskScore}<span className="text-[14px] text-n500">/10</span>
              </p>
              <p className="text-[11px] text-n600">{customer.riskProfile}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ── Tabs ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 p-1 rounded-xl glass-subtle border border-white/[0.05] w-fit">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg text-[13px] font-medium transition-all",
                isActive
                  ? "bg-primary text-white neu-raised"
                  : "text-n500 hover:text-n300"
              )}
            >
              <Icon size={13} />
              {t.label}
              {t.id === "decisions" && relatedDecisions.length > 0 && (
                <span className={cn(
                  "px-1.5 py-0.5 rounded-full text-[10px] font-bold",
                  isActive ? "bg-white/20 text-white" : "bg-error/20 text-error"
                )}>
                  {relatedDecisions.length}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ── Tab Content ───────────────────────────────────────── */}
      {activeTab === "overview" && (
        <OverviewTab customer={customer} holdings={holdings} r1y={r1y} />
      )}
      {activeTab === "holdings" && (
        <HoldingsTab holdings={holdings} totalInvested={totalInvested} totalCurrent={totalCurrent} totalPnL={totalPnL} totalPnLPct={totalPnLPct} />
      )}
      {activeTab === "transactions" && (
        <TransactionsTab txns={txns} />
      )}
      {activeTab === "decisions" && (
        <DecisionsTab customer={customer} relatedDecisions={relatedDecisions} />
      )}

    </div>
  );
}

// ── OVERVIEW TAB ────────────────────────────────────────────────

function OverviewTab({ customer, holdings, r1y }: { customer: ReturnType<typeof getCustomer>; holdings: Holding[]; r1y: number }) {
  if (!customer) return null;
  return (
    <div className="space-y-4">
      {/* Metrics row */}
      <div className="grid grid-cols-5 gap-3">
        {[
          { label: "1Y Return",    value: `${r1y > 0 ? "+" : ""}${r1y}%`,                          color: r1y >= 0 ? "text-success" : "text-error" },
          { label: "YTD",          value: `${customer.returns.ytd > 0 ? "+" : ""}${customer.returns.ytd}%`, color: customer.returns.ytd >= 0 ? "text-success" : "text-error" },
          { label: "3Y Return",    value: `+${customer.returns.threeYear}%`,                          color: "text-success" },
          { label: "Last Active",  value: new Date(customer.lastActivity).toLocaleDateString("en-IN", { day: "numeric", month: "short" }), color: "text-n200" },
          { label: "Member Since", value: new Date(customer.joinedDate).getFullYear().toString(),     color: "text-n200" },
        ].map((m) => (
          <GlassCard key={m.label} className="p-4">
            <p className="text-[11px] text-n600 uppercase tracking-wider mb-1">{m.label}</p>
            <p className={`text-[20px] font-bold ${m.color}`}>{m.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n500 mb-2">Asset allocation</p>
          <AllocationChart data={customer.allocation} totalFormatted={customer.aumFormatted} />
          <div className="mt-2 space-y-1.5">
            {customer.allocation.map((a) => (
              <div key={a.category} className="flex justify-between text-[12px]">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-sm" style={{ background: a.color }} />
                  <span className="text-n400">{a.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-n300 font-medium">{a.percentage}%</span>
                  <span className="text-n600">₹{a.amountL >= 100 ? `${(a.amountL / 100).toFixed(1)}Cr` : `${a.amountL.toFixed(1)}L`}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="col-span-2 p-5">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-n500">12-month performance</p>
            <div className="flex items-center gap-4 text-[11px]">
              <span className="flex items-center gap-1.5 text-primary"><div className="w-4 h-0.5 bg-primary rounded" />Portfolio</span>
              <span className="flex items-center gap-1.5 text-n600"><div className="w-4 h-0.5 bg-n600 rounded" />Benchmark</span>
            </div>
          </div>
          <PerformanceChart data={customer.performance} />
          <div className="flex items-center gap-6 mt-3 pt-3 border-t border-white/[0.05]">
            {[
              { label: "1M",  v: customer.returns.oneMonth },
              { label: "3M",  v: customer.returns.threeMonth },
              { label: "YTD", v: customer.returns.ytd },
              { label: "1Y",  v: customer.returns.oneYear },
              { label: "3Y",  v: customer.returns.threeYear },
            ].map((r) => (
              <div key={r.label} className="text-center">
                <p className="text-[10px] text-n600">{r.label}</p>
                <p className={`text-[13px] font-semibold mt-0.5 ${r.v >= 0 ? "text-success" : "text-error"}`}>
                  {r.v > 0 ? "+" : ""}{r.v}%
                </p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Concentration + Behavioral Signals */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n500 mb-4">Sector concentration</p>
          <div className="space-y-3">
            {customer.sectorConcentration.map((s) => (
              <div key={s.sector}>
                <div className="flex justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] text-n300">{s.sector}</span>
                    {s.breached && <span className="px-1.5 py-0.5 rounded bg-error/15 text-error text-[10px] font-semibold border border-error/25">BREACH</span>}
                  </div>
                  <span className={`text-[12px] font-semibold ${s.breached ? "text-error" : "text-n300"}`}>
                    {s.percentage}% <span className="text-n600 font-normal">/ {s.limit}%</span>
                  </span>
                </div>
                <div className="h-1.5 bg-n800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.breached ? "bg-error" : "bg-primary"}`}
                    style={{ width: `${Math.min((s.percentage / s.limit) * 100, 100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n500 mb-4">Behavioral signals</p>
          <div className="space-y-3">
            {customer.behavioralSignals.map((s) => {
              const style = { high: "bg-error/10 border-error/25 text-error", medium: "bg-warning/10 border-warning/25 text-warning", low: "bg-primary/10 border-primary/25 text-primary" }[s.severity];
              return (
                <div key={s.id} className={`p-3 rounded-lg border ${style}`}>
                  <p className="text-[12px] font-semibold mb-0.5">{s.type === "risk" ? "⚠" : s.type === "opportunity" ? "✦" : "~"} {s.label}</p>
                  <p className="text-[11px] opacity-75 leading-snug">{s.description}</p>
                  <p className="text-[10px] opacity-50 mt-1">{s.date} · {s.confidence}% confidence</p>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </div>

      {/* Goals */}
      {customer.goals.length > 0 && (
        <GlassCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n500 mb-4">Financial goals</p>
          <div className="grid grid-cols-2 gap-4">
            {customer.goals.map((goal) => {
              const pct = goal.targetAmountL > 0 ? Math.min(Math.round((goal.currentAmountL / goal.targetAmountL) * 100), 100) : 100;
              return (
                <div key={goal.name} className="p-4 rounded-lg glass-subtle border border-white/[0.05]">
                  <div className="flex justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target size={13} className="text-primary" />
                      <p className="text-[13px] font-medium text-n100">{goal.name}</p>
                    </div>
                    {goal.onTrack
                      ? <span className="flex items-center gap-1 text-[11px] text-success"><CheckCircle2 size={11} />On track</span>
                      : <span className="flex items-center gap-1 text-[11px] text-warning"><Clock size={11} />At risk</span>
                    }
                  </div>
                  {goal.targetAmountL > 0 && (
                    <>
                      <div className="flex justify-between text-[11px] text-n600 mb-1.5">
                        <span>₹{goal.currentAmountL >= 100 ? `${(goal.currentAmountL / 100).toFixed(1)}Cr` : `${goal.currentAmountL}L`}</span>
                        <span>Target ₹{goal.targetAmountL >= 100 ? `${(goal.targetAmountL / 100).toFixed(1)}Cr` : `${goal.targetAmountL}L`}</span>
                      </div>
                      <div className="h-1.5 bg-n800 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${goal.onTrack ? "bg-success" : "bg-warning"}`} style={{ width: `${pct}%` }} />
                      </div>
                      <p className="text-[11px] text-n600 mt-1">{pct}% · {goal.targetDate === "Ongoing" ? "Ongoing" : new Date(goal.targetDate).getFullYear()}</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}
    </div>
  );
}

// ── HOLDINGS TAB ────────────────────────────────────────────────

function HoldingsTab({ holdings, totalInvested, totalCurrent, totalPnL, totalPnLPct }: {
  holdings: Holding[]; totalInvested: number; totalCurrent: number; totalPnL: number; totalPnLPct: number;
}) {
  const assetClasses = [...new Set(holdings.map((h) => h.assetClass))];

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Invested", value: `₹${totalInvested.toFixed(1)}L`, color: "text-n100" },
          { label: "Current Value", value: `₹${totalCurrent.toFixed(1)}L`, color: "text-primary" },
          { label: "Total P&L", value: `${totalPnL >= 0 ? "+" : ""}₹${Math.abs(totalPnL).toFixed(1)}L`, color: totalPnL >= 0 ? "text-success" : "text-error" },
          { label: "Overall Return", value: `${totalPnLPct >= 0 ? "+" : ""}${totalPnLPct.toFixed(1)}%`, color: totalPnLPct >= 0 ? "text-success" : "text-error" },
        ].map((m) => (
          <GlassCard key={m.label} className="p-4">
            <p className="text-[11px] text-n600 uppercase tracking-wider mb-1">{m.label}</p>
            <p className={`text-[20px] font-bold ${m.color}`}>{m.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Holdings table */}
      <GlassCard className="overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-white/[0.05]">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n500">{holdings.length} holdings</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-n600 border-b border-white/[0.04]">
                <th className="text-left px-5 py-3 font-medium">Instrument</th>
                <th className="text-left px-3 py-3 font-medium">Class</th>
                <th className="text-right px-3 py-3 font-medium">Units</th>
                <th className="text-right px-3 py-3 font-medium">Avg Cost</th>
                <th className="text-right px-3 py-3 font-medium">Current NAV</th>
                <th className="text-right px-3 py-3 font-medium">Invested</th>
                <th className="text-right px-3 py-3 font-medium">Current Value</th>
                <th className="text-right px-3 py-3 font-medium">P&amp;L</th>
                <th className="text-right px-3 py-3 font-medium">Return</th>
                <th className="text-right px-5 py-3 font-medium">Alloc %</th>
              </tr>
            </thead>
            <tbody>
              {holdings.map((h, i) => {
                const pnlPos = h.pnl >= 0;
                return (
                  <tr key={h.id} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i === holdings.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-5 py-3">
                      <p className="text-n200 font-medium">{h.instrument}</p>
                      <p className="text-n600 text-[11px] font-mono">{h.isin}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${
                        h.assetClass === "equity" ? "bg-primary/10 text-primary border-primary/20" :
                        h.assetClass === "debt" ? "bg-info/10 text-info border-info/20" :
                        h.assetClass === "gold" ? "bg-warning/10 text-warning border-warning/20" :
                        "bg-n700/40 text-n400 border-n600/30"
                      }`}>{h.category}</span>
                    </td>
                    <td className="px-3 py-3 text-right text-n300">{h.units.toLocaleString("en-IN")}</td>
                    <td className="px-3 py-3 text-right text-n400">₹{h.avgCost.toFixed(1)}</td>
                    <td className="px-3 py-3 text-right text-n300">₹{h.currentNAV.toFixed(1)}</td>
                    <td className="px-3 py-3 text-right text-n400">₹{h.investedAmt.toFixed(1)}L</td>
                    <td className="px-3 py-3 text-right font-medium text-n200">₹{h.currentValue.toFixed(1)}L</td>
                    <td className={`px-3 py-3 text-right font-semibold ${pnlPos ? "text-success" : "text-error"}`}>
                      {pnlPos ? "+" : ""}₹{Math.abs(h.pnl).toFixed(1)}L
                    </td>
                    <td className={`px-3 py-3 text-right font-semibold ${pnlPos ? "text-success" : "text-error"}`}>
                      <span className="flex items-center justify-end gap-1">
                        {pnlPos ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />}
                        {h.pnlPct.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-5 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-12 h-1.5 bg-n800 rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${h.allocPct}%` }} />
                        </div>
                        <span className="text-n400 w-8">{h.allocPct.toFixed(1)}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ── TRANSACTIONS TAB ────────────────────────────────────────────

function TransactionsTab({ txns }: { txns: Transaction[] }) {
  const [typeFilter, setTypeFilter] = useState("All");
  const types = ["All", "Buy", "Sell", "SIP", "Switch In", "Switch Out", "Redemption", "Dividend"];
  const filtered = typeFilter === "All" ? txns : txns.filter((t) => t.type === typeFilter);

  return (
    <div className="space-y-4">
      {/* Summary stats */}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Total transactions",     value: String(txns.length), color: "text-n100" },
          { label: "Total invested (buys)",  value: `₹${txns.filter(t => t.type === "Buy" || t.type === "SIP").reduce((s,t) => s + t.amount, 0).toFixed(1)}L`, color: "text-primary" },
          { label: "Realisations (sells)",   value: `₹${txns.filter(t => t.type === "Sell" || t.type === "Redemption").reduce((s,t) => s + t.amount, 0).toFixed(1)}L`, color: "text-n200" },
          { label: "Realised P&L",           value: `₹${txns.filter(t => t.pnl).reduce((s,t) => s + (t.pnl || 0), 0).toFixed(2)}L`, color: "text-success" },
        ].map((m) => (
          <GlassCard key={m.label} className="p-4">
            <p className="text-[11px] text-n600 uppercase tracking-wider mb-1">{m.label}</p>
            <p className={`text-[20px] font-bold ${m.color}`}>{m.value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Type filter */}
      <div className="flex items-center gap-1.5 flex-wrap">
        {types.map((t) => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all border",
              typeFilter === t
                ? "bg-primary/15 text-primary border-primary/25"
                : "glass-subtle text-n500 border-white/[0.05] hover:text-n300"
            )}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Transaction table */}
      <GlassCard className="overflow-hidden">
        <div className="px-5 pt-4 pb-3 border-b border-white/[0.05]">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n500">
            {filtered.length} transaction{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-n600 border-b border-white/[0.04]">
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-3 py-3 font-medium">Type</th>
                <th className="text-left px-3 py-3 font-medium">Instrument</th>
                <th className="text-right px-3 py-3 font-medium">Units</th>
                <th className="text-right px-3 py-3 font-medium">NAV / Price</th>
                <th className="text-right px-3 py-3 font-medium">Amount</th>
                <th className="text-right px-3 py-3 font-medium">Realised P&amp;L</th>
                <th className="text-left px-3 py-3 font-medium">Folio</th>
                <th className="text-right px-5 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((t, i) => {
                const typeStyle: Record<string, string> = {
                  "Buy":        "bg-success/10 text-success border-success/20",
                  "SIP":        "bg-primary/10 text-primary border-primary/20",
                  "Sell":       "bg-error/10 text-error border-error/20",
                  "Redemption": "bg-error/10 text-error border-error/20",
                  "Switch In":  "bg-warning/10 text-warning border-warning/20",
                  "Switch Out": "bg-warning/10 text-warning border-warning/20",
                  "Dividend":   "bg-intel/10 text-intel border-intel/20",
                };
                return (
                  <tr key={t.id} className={`border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors ${i === filtered.length - 1 ? "border-b-0" : ""}`}>
                    <td className="px-5 py-3 text-n400">{t.date}</td>
                    <td className="px-3 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${typeStyle[t.type] || "bg-n700/30 text-n400 border-n600/30"}`}>
                        {t.type}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-n200 font-medium max-w-[200px] truncate">{t.instrument}</td>
                    <td className="px-3 py-3 text-right text-n400">{t.units.toLocaleString("en-IN")}</td>
                    <td className="px-3 py-3 text-right text-n400">₹{t.nav.toFixed(1)}</td>
                    <td className="px-3 py-3 text-right font-semibold text-n200">₹{t.amount.toFixed(2)}L</td>
                    <td className="px-3 py-3 text-right">
                      {t.pnl !== undefined ? (
                        <span className={`font-semibold ${t.pnl >= 0 ? "text-success" : "text-error"}`}>
                          {t.pnl >= 0 ? "+" : ""}₹{t.pnl.toFixed(2)}L
                        </span>
                      ) : (
                        <span className="text-n700">—</span>
                      )}
                    </td>
                    <td className="px-3 py-3 text-n600 font-mono text-[11px]">{t.folioNo}</td>
                    <td className="px-5 py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${t.status === "Settled" ? "text-success" : "text-warning"}`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

// ── DECISIONS TAB ────────────────────────────────────────────────

const ASK_WHY_ANSWERS: Record<string, string[]> = {
  "DEC-2026-001": [
    "Infrastructure, Energy, and Banking sectors collectively represent 38% of this portfolio — 3pp above the 35% policy ceiling.",
    "The breach has persisted for 22 days. Under policy, breaches >15 days require RM review.",
    "SECUREA recommends phased rebalancing: reduce Infrastructure by 4–5pp first, then reassess Energy exposure.",
  ],
  "DEC-2026-002": [
    "Cash allocation increased from 12% to 31% over 90 days — a 19pp shift that SECUREA flags as a behavioural anomaly.",
    "Correlated signals: equity SIP paused, no new product subscriptions in Q3. Indicates confidence gap or liquidity need.",
    "Recommended action: schedule a review call to understand intent before deploying structured product offering.",
  ],
  "DEC-2026-003": [
    "The client's bond duration is 8.4 years — above the 7Y policy ceiling.",
    "With expected rate cuts of 50–75bps in the next 2 quarters, duration extension is opportunistic but carries MTM risk.",
    "SECUREA recommends maintaining exposure but setting a stop-loss review trigger at 5% MTM loss.",
  ],
};

function DecisionCard({ dec, customerName }: {
  dec: (typeof decisions)[number];
  customerName: string;
}) {
  const [status, setStatus]       = useState<"pending" | "approved" | "dismissed">("pending");
  const [showAskWhy, setAskWhy]   = useState(false);
  const [askLoading, setAskLoading] = useState(false);
  const [whyPoints, setWhyPoints] = useState<string[]>([]);

  function handleApprove() {
    setStatus("approved");
    setAskWhy(false);
  }

  function handleDismiss() {
    setStatus("dismissed");
    setAskWhy(false);
  }

  function handleAskWhy() {
    if (showAskWhy) { setAskWhy(false); return; }
    setAskLoading(true);
    setAskWhy(true);
    setTimeout(() => {
      setWhyPoints(ASK_WHY_ANSWERS[dec.id] ?? ["SECUREA is analysing this decision. No additional context available."]);
      setAskLoading(false);
    }, 800);
  }

  if (status === "approved") {
    return (
      <GlassCard className="p-5 border-success/20">
        <div className="flex items-center gap-3">
          <CheckCircle2 size={18} className="text-success shrink-0" />
          <div className="flex-1">
            <p className="text-[14px] font-semibold text-success">Decision approved — {dec.title}</p>
            <p className="text-[12px] text-n500 mt-0.5">Logged at {new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })} · Action queued for execution</p>
          </div>
          <button onClick={() => setStatus("pending")} className="text-[11px] text-n600 hover:text-n400 transition-colors">Undo</button>
        </div>
      </GlassCard>
    );
  }

  if (status === "dismissed") {
    return (
      <GlassCard className="p-4 border-white/[0.04] opacity-60">
        <div className="flex items-center justify-between">
          <p className="text-[13px] text-n500 line-through">{dec.title}</p>
          <button onClick={() => setStatus("pending")} className="text-[11px] text-n600 hover:text-n400 transition-colors">Restore</button>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className={`overflow-hidden ${dec.priority === "critical" ? "border-error/20 glow-attention" : "border-warning/15"}`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${
                dec.priority === "critical" ? "bg-error/15 text-error border-error/25" : "bg-warning/15 text-warning border-warning/25"
              }`}>{dec.priority.toUpperCase()}</span>
              <span className="text-n600 text-[11px] font-mono">{dec.id}</span>
            </div>
            <h3 className="text-[16px] font-semibold text-n100 mb-1.5">{dec.title}</h3>
            <p className="text-[13px] text-n400 leading-relaxed">{dec.summary}</p>
          </div>
          <div className="shrink-0 text-right">
            {dec.exposure && <p className="text-[20px] font-bold text-n100">{dec.exposure}</p>}
            <p className="text-[11px] text-n600 mt-0.5">{formatCompact(dec.affectedCount)} {dec.affectedLabel}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/[0.05]">
          <div>
            <p className="text-[11px] text-n600 uppercase tracking-widest mb-1.5">Why this decision</p>
            <p className="text-[12px] text-n400 leading-relaxed">{dec.reason}</p>
          </div>
          <div>
            <p className="text-[11px] text-n600 uppercase tracking-widest mb-1.5">SECUREA recommends</p>
            <p className="text-[12px] text-n200 leading-relaxed">{dec.recommendation}</p>
          </div>
        </div>

        {dec.policyConstraints.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {dec.policyConstraints.map((c) => (
              <span key={c} className="px-2 py-0.5 rounded bg-n800 border border-white/[0.06] text-[11px] text-n500">{c}</span>
            ))}
          </div>
        )}

        {/* Ask why panel */}
        {showAskWhy && (
          <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/15">
            <p className="text-[11px] font-semibold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Zap size={11} />SECUREA reasoning
            </p>
            {askLoading ? (
              <div className="flex items-center gap-2 text-n500 text-[12px]">
                <div className="w-3 h-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                Analysing...
              </div>
            ) : (
              <ol className="space-y-2">
                {whyPoints.map((pt, i) => (
                  <li key={i} className="flex gap-2 text-[12px] text-n300 leading-relaxed">
                    <span className="text-primary font-semibold shrink-0">{i + 1}.</span>
                    {pt}
                  </li>
                ))}
              </ol>
            )}
          </div>
        )}
      </div>

      {/* Action bar */}
      <div className="px-5 py-3 border-t border-white/[0.05] flex items-center gap-3">
        <button onClick={handleApprove} className="btn-primary text-[12px] py-1.5">
          <CheckCircle2 size={12} />
          {dec.requiredAction}
        </button>
        <button
          onClick={handleAskWhy}
          className={`btn-ghost text-[12px] py-1.5 transition-all ${showAskWhy ? "bg-primary/10 text-primary border-primary/25" : ""}`}
        >
          <Zap size={12} />{showAskWhy ? "Hide" : "Ask why"}
        </button>
        <button
          onClick={handleDismiss}
          className="btn-ghost text-[12px] py-1.5"
          style={{ color: "var(--tw-error, #EF4444)", borderColor: "rgba(239,68,68,0.2)" }}
        >
          Dismiss
        </button>
        {dec.confidence && (
          <span className="ml-auto text-[11px] text-n600">Confidence {dec.confidence}%</span>
        )}
      </div>
    </GlassCard>
  );
}

function DecisionsTab({ customer, relatedDecisions }: {
  customer: NonNullable<ReturnType<typeof getCustomer>>;
  relatedDecisions: typeof decisions;
}) {
  return (
    <div className="space-y-4">
      <GlassCard className="p-5">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/20 flex items-center justify-center">
            <Cpu size={14} className="text-primary" />
          </div>
          <div>
            <p className="text-[14px] font-semibold text-n100">SECUREA Decision Intelligence</p>
            <p className="text-[12px] text-n500">Decisions generated for {customer.name}</p>
          </div>
        </div>
      </GlassCard>

      {relatedDecisions.length === 0 ? (
        <GlassCard className="p-8 text-center">
          <CheckCircle2 size={28} className="text-success mx-auto mb-3" />
          <p className="text-[15px] font-medium text-n200">No pending decisions</p>
          <p className="text-[13px] text-n500 mt-1">This client's portfolio is within all policy thresholds.</p>
        </GlassCard>
      ) : (
        <div className="space-y-3">
          {relatedDecisions.map((dec) => (
            <DecisionCard key={dec.id} dec={dec} customerName={customer.name} />
          ))}
        </div>
      )}

      {/* Behavioral signals as additional context */}
      {customer.behavioralSignals.length > 0 && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n600 mb-3 mt-4">Supporting intelligence</p>
          <div className="space-y-2">
            {customer.behavioralSignals.map((s) => {
              const style = { high: "border-error/20", medium: "border-warning/20", low: "border-primary/15" }[s.severity];
              return (
                <GlassCard key={s.id} className={`p-4 ${style}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[13px] font-medium text-n100 mb-0.5">{s.label}</p>
                      <p className="text-[12px] text-n400">{s.description}</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[11px] text-n600">{s.date}</p>
                      <p className="text-[11px] text-n600">{s.confidence}% conf.</p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
