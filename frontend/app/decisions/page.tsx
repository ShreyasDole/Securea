"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight, CheckCircle2, Clock, Eye, Zap } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import { PriorityPill } from "@/components/shared/StatusPill";
import { decisions } from "@/lib/mock-data";
import { formatCompact, relativeTime, decisionTypeLabel } from "@/lib/utils";
import type { DecisionStatus, FinancialDecision } from "@/types";

type FilterStatus = DecisionStatus | "all";

const statusTabs: { id: FilterStatus; label: string }[] = [
  { id: "all",       label: "All" },
  { id: "pending",   label: "Pending" },
  { id: "in_review", label: "In Review" },
  { id: "resolved",  label: "Resolved" },
];

export default function DecisionsPage() {
  const [filter, setFilter] = useState<FilterStatus>("pending");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered =
    filter === "all"
      ? decisions
      : decisions.filter((d) => d.status === filter);

  const pendingCount   = decisions.filter((d) => d.status === "pending").length;
  const inReviewCount  = decisions.filter((d) => d.status === "in_review").length;

  return (
    <div className="max-w-[960px] mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out]">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-n100 tracking-tight">Decisions</h1>
          <p className="text-n500 text-[13px] mt-1">
            Financial decisions requiring attention or action.
          </p>
        </div>
        <div className="flex items-center gap-3 text-[13px]">
          <span className="px-3 py-1.5 rounded-lg bg-error/10 border border-error/20 text-error font-medium">
            {pendingCount} pending
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/20 text-warning font-medium">
            {inReviewCount} in review
          </span>
        </div>
      </div>

      {/* ── Filter tabs ─────────────────────────────────────────── */}
      <div className="flex items-center gap-1 p-1 rounded-lg glass-subtle border border-white/[0.05] w-fit">
        {statusTabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            className={`px-4 py-1.5 rounded-md text-[12px] font-medium transition-all capitalize ${
              filter === t.id
                ? "bg-n700 text-n100 neu-raised"
                : "text-n500 hover:text-n300"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* ── Decision cards ──────────────────────────────────────── */}
      <div className="space-y-3">
        {filtered.map((dec) => (
          <DecisionCard
            key={dec.id}
            decision={dec}
            expanded={expanded === dec.id}
            onToggle={() => setExpanded(expanded === dec.id ? null : dec.id)}
          />
        ))}
      </div>

    </div>
  );
}

function DecisionCard({
  decision,
  expanded,
  onToggle,
}: {
  decision: FinancialDecision;
  expanded: boolean;
  onToggle: () => void;
}) {
  const typeColor: Record<string, string> = {
    risk:        "text-error",
    opportunity: "text-success",
    compliance:  "text-primary",
    behavioural: "text-warning",
    credit:      "text-info",
    fraud:       "text-error",
  };

  return (
    <GlassCard
      className={`overflow-hidden transition-all duration-200 ${
        decision.priority === "critical" ? "border-error/20 glow-attention" : ""
      }`}
    >
      {/* Card header — always visible */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Meta row */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <PriorityPill priority={decision.priority} />
              <span
                className={`text-[11px] font-semibold uppercase tracking-wide ${typeColor[decision.type] || "text-n500"}`}
              >
                {decisionTypeLabel(decision.type)}
              </span>
              <span className="text-n600 text-[11px]">·</span>
              <span className="text-n600 text-[11px] font-mono">{decision.id}</span>
              {decision.dueAt && (
                <>
                  <span className="text-n600 text-[11px]">·</span>
                  <span className="text-[11px] text-warning flex items-center gap-1">
                    <Clock size={10} />
                    Due {relativeTime(decision.dueAt)}
                  </span>
                </>
              )}
            </div>

            {/* Title */}
            <h2 className="text-[16px] font-semibold text-n100 leading-snug mb-1.5">
              {decision.title}
            </h2>

            {/* Summary */}
            <p className="text-[13px] text-n400 leading-relaxed">{decision.summary}</p>
          </div>

          {/* Right: exposure + toggle */}
          <div className="shrink-0 text-right">
            {decision.exposure && (
              <p className="text-[20px] font-bold text-n100">{decision.exposure}</p>
            )}
            <p className="text-[11px] text-n600 mt-0.5">
              {formatCompact(decision.affectedCount)} {decision.affectedLabel}
            </p>
            <button
              onClick={onToggle}
              className="mt-3 flex items-center gap-1 text-[11px] text-n500 hover:text-n300 transition-colors ml-auto"
            >
              {expanded ? "Collapse" : "Review"}
              {expanded ? <ChevronDown size={11} /> : <ChevronRight size={11} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expanded detail */}
      {expanded && (
        <div className="border-t border-white/[0.06] animate-[slideUp_0.2s_ease-out]">
          <div className="p-5 grid grid-cols-2 gap-6">
            {/* Why */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-n600 mb-2">
                Why this decision
              </p>
              <p className="text-[13px] text-n400 leading-relaxed">{decision.reason}</p>
            </div>

            {/* SECUREA recommendation */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-n600 mb-2">
                SECUREA recommends
              </p>
              <p className="text-[13px] text-n200 leading-relaxed">
                {decision.recommendation}
              </p>
            </div>
          </div>

          {/* Policy constraints */}
          {decision.policyConstraints.length > 0 && (
            <div className="px-5 pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-widest text-n600 mb-2">
                Policy constraints
              </p>
              <div className="flex flex-wrap gap-2">
                {decision.policyConstraints.map((c) => (
                  <span
                    key={c}
                    className="px-2.5 py-1 rounded-md bg-n800 border border-white/[0.06] text-[12px] text-n400"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="px-5 py-4 border-t border-white/[0.06] flex items-center gap-3">
            <button className="btn-primary text-[13px]">
              <CheckCircle2 size={13} />
              {decision.requiredAction}
            </button>
            <button className="btn-ghost text-[13px]">
              <Eye size={13} />
              Ask why
            </button>
            {decision.confidence && (
              <span className="ml-auto text-[11px] text-n600">
                Confidence {decision.confidence}%
              </span>
            )}
            {decision.owner && (
              <span className="text-[11px] text-n600">· Owner: {decision.owner}</span>
            )}
          </div>
        </div>
      )}

      {/* Quick action bar — when collapsed */}
      {!expanded && (
        <div className="px-5 py-3 border-t border-white/[0.04] flex items-center gap-3">
          <button
            onClick={onToggle}
            className="btn-primary text-[12px] py-1.5"
          >
            Review
          </button>
          <button className="btn-ghost text-[12px] py-1.5">
            <Zap size={12} />
            Ask why
          </button>
          {decision.owner && (
            <span className="ml-auto text-[11px] text-n600">
              {decision.owner}
            </span>
          )}
        </div>
      )}
    </GlassCard>
  );
}
