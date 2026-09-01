"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft, Search, ChevronRight, TrendingUp, TrendingDown, Minus,
  AlertTriangle, Eye,
} from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import { StatePill } from "@/components/shared/StatusPill";
import { getSegment, getCustomers } from "@/lib/mock-customers";
import { formatCompact } from "@/lib/utils";
import type { Customer } from "@/lib/mock-customers";
import type { EntityState } from "@/types";

type SortKey = "name" | "aum" | "returns" | "risk" | "state";
type StateFilter = EntityState | "all";

export default function SegmentPage() {
  const { groupId } = useParams<{ groupId: string }>();
  const segment  = getSegment(groupId);
  const allCustomers = getCustomers(groupId);

  const [search,      setSearch]      = useState("");
  const [stateFilter, setStateFilter] = useState<StateFilter>("all");
  const [sortKey,     setSortKey]     = useState<SortKey>("state");

  if (!segment) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-n500">
        <p className="text-[16px]">Segment not found.</p>
        <Link href="/monitor" className="text-primary text-[13px] mt-2">← Back to Monitor</Link>
      </div>
    );
  }

  const filtered = allCustomers
    .filter((c) => {
      const matchSearch = !search ||
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.accountId.toLowerCase().includes(search.toLowerCase()) ||
        c.city.toLowerCase().includes(search.toLowerCase());
      const matchState = stateFilter === "all" || c.state === stateFilter;
      return matchSearch && matchState;
    })
    .sort((a, b) => {
      if (sortKey === "aum")     return b.aumL - a.aumL;
      if (sortKey === "returns") return b.returns.oneYear - a.returns.oneYear;
      if (sortKey === "risk")    return b.riskScore - a.riskScore;
      if (sortKey === "state") {
        const order: Record<EntityState, number> = { attention: 0, watch: 1, stable: 2 };
        return order[a.state] - order[b.state];
      }
      return a.name.localeCompare(b.name);
    });

  const attentionCount = allCustomers.filter((c) => c.state === "attention").length;
  const watchCount     = allCustomers.filter((c) => c.state === "watch").length;

  return (
    <div className="w-full space-y-5 animate-[fadeIn_0.3s_ease-out]">

      {/* ── Breadcrumb ────────────────────────────────────────── */}
      <div className="flex items-center gap-2 text-[12px] text-n600">
        <Link href="/monitor" className="hover:text-n300 flex items-center gap-1 transition-colors">
          <ArrowLeft size={12} />
          Monitor
        </Link>
        <span>/</span>
        <span className="text-n300">{segment.label}</span>
      </div>

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[22px] font-semibold text-n100 tracking-tight">{segment.label}</h1>
          <p className="text-n500 text-[13px] mt-0.5">{segment.description}</p>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <span className="px-3 py-1.5 rounded-lg bg-error/10 border border-error/20 text-error font-medium">
            {attentionCount} attention
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20 text-warning font-medium">
            {watchCount} watch
          </span>
          <span className="text-n500 text-[12px]">
            {formatCompact(segment.totalCustomers)} total · ₹{segment.totalAumCr} Cr AUM
          </span>
        </div>
      </div>

      {/* ── Search + filters ──────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-n600 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, account ID, city..."
            className="w-full glass-subtle rounded-lg pl-9 pr-4 py-2 text-[13px] text-n200 placeholder:text-n600 focus:outline-none border border-white/[0.07] focus:border-primary/30 transition-all"
          />
        </div>

        {/* State filter */}
        <div className="flex items-center gap-1 p-1 rounded-lg glass-subtle border border-white/[0.05]">
          {(["all", "attention", "watch", "stable"] as StateFilter[]).map((s) => (
            <button
              key={s}
              onClick={() => setStateFilter(s)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all capitalize ${
                stateFilter === s
                  ? "bg-n700 text-n100 neu-raised"
                  : "text-n500 hover:text-n300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="glass-subtle border border-white/[0.07] rounded-lg px-3 py-2 text-[12px] text-n400 focus:outline-none bg-transparent"
        >
          <option value="state">Sort: Priority</option>
          <option value="aum">Sort: AUM ↓</option>
          <option value="returns">Sort: 1Y Returns</option>
          <option value="risk">Sort: Risk Score</option>
          <option value="name">Sort: Name</option>
        </select>
      </div>

      {/* ── Customer list ─────────────────────────────────────── */}
      <div>
        <p className="text-[11px] text-n600 mb-3">
          Showing {filtered.length} of {allCustomers.length} clients
        </p>
        <div className="space-y-2">
          {filtered.map((customer) => (
            <CustomerRow key={customer.id} customer={customer} segmentId={groupId} />
          ))}
          {filtered.length === 0 && (
            <GlassCard className="p-8 text-center">
              <p className="text-n500">No customers match your filter.</p>
            </GlassCard>
          )}
        </div>
      </div>

    </div>
  );
}

function CustomerRow({ customer, segmentId }: { customer: Customer; segmentId: string }) {
  const returnColor =
    customer.returns.oneYear > 0 ? "text-success" : "text-error";
  const ReturnIcon =
    customer.returns.oneYear > 0 ? TrendingUp : customer.returns.oneYear < 0 ? TrendingDown : Minus;

  return (
    <Link href={`/monitor/${segmentId}/${customer.id}`}>
      <GlassCard
        className={`p-4 transition-all duration-200 hover:border-white/[0.14] hover:translate-y-[-1px] cursor-pointer ${
          customer.state === "attention" ? "border-error/15" : ""
        }`}
        hover
      >
        <div className="flex items-center gap-5">
          {/* Avatar + name */}
          <div className="flex items-center gap-3 w-[220px] shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/40 to-secondary/40 border border-white/[0.1] flex items-center justify-center text-[12px] font-semibold text-n200 shrink-0">
              {customer.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div className="min-w-0">
              <p className="text-[14px] font-medium text-n100 truncate">{customer.name}</p>
              <p className="text-[11px] text-n600 font-mono">{customer.accountId}</p>
            </div>
          </div>

          {/* State */}
          <div className="w-[100px] shrink-0">
            <StatePill state={customer.state} />
          </div>

          {/* City + RM */}
          <div className="w-[140px] shrink-0">
            <p className="text-[12px] text-n300">{customer.city}</p>
            <p className="text-[11px] text-n600">RM: {customer.rm}</p>
          </div>

          {/* AUM */}
          <div className="w-[100px] shrink-0">
            <p className="text-[15px] font-semibold text-n100">{customer.aumFormatted}</p>
            <p className="text-[11px] text-n600">AUM</p>
          </div>

          {/* Returns */}
          <div className="w-[90px] shrink-0">
            <p className={`text-[15px] font-semibold flex items-center gap-1 ${returnColor}`}>
              <ReturnIcon size={13} />
              {customer.returns.oneYear > 0 ? "+" : ""}{customer.returns.oneYear}%
            </p>
            <p className="text-[11px] text-n600">1Y return</p>
          </div>

          {/* Risk score */}
          <div className="w-[80px] shrink-0">
            <p className="text-[15px] font-semibold text-n200">{customer.riskScore}</p>
            <p className="text-[11px] text-n600">{customer.riskProfile}</p>
          </div>

          {/* Signals */}
          <div className="flex-1 min-w-0">
            {customer.stateReason && (
              <div className="flex items-start gap-1.5">
                {customer.state === "attention" && (
                  <AlertTriangle size={12} className="text-error shrink-0 mt-0.5" />
                )}
                <p className="text-[12px] text-n500 leading-snug line-clamp-2">
                  {customer.stateReason}
                </p>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="flex items-center gap-1 text-[11px] text-primary">
              <Eye size={11} />
              View
            </span>
            <ChevronRight size={14} className="text-n600" />
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
