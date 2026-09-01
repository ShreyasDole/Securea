"use client";

import { useState } from "react";
import { ArrowRight, ExternalLink, AlertTriangle, Zap, Activity, TrendingDown, Eye } from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/shared/GlassCard";
import { PatternTypePill } from "@/components/shared/StatusPill";
import { intelligencePatterns } from "@/lib/mock-data";
import { formatCompact, relativeTime } from "@/lib/utils";
import type { PatternType } from "@/types";

type Filter = "all" | PatternType;

const filterTabs: { id: Filter; label: string; icon: React.ElementType }[] = [
  { id: "all",         label: "All",          icon: Activity    },
  { id: "risk",        label: "Risk",          icon: AlertTriangle },
  { id: "behavioural", label: "Behavioural",   icon: TrendingDown  },
  { id: "emerging",    label: "Emerging",      icon: Zap           },
  { id: "anomaly",     label: "Anomaly",       icon: Eye           },
];

// ─── Extended behavioral signals for richer Intelligence view ─

const behavioralAlerts = [
  {
    id: "ba-001",
    category: "Churn Risk",
    severity: "high",
    title: "SIP discontinuation velocity accelerating",
    description:
      "Retail SIP segment showing 18% MoM increase in missed instalments. Primary cohort: accounts aged 24–36 months. Likely trigger: market underperformance + no proactive RM touchpoint.",
    affectedCount: 3_842,
    affectedLabel: "SIP accounts",
    confidenceScore: 87,
    suggestedAction: "Automated re-engagement + SIP pause-and-resume campaign",
    segment: "Retail SIP",
    metrics: [
      { label: "Missed in Jul", value: "1,280" },
      { label: "Missed in Aug", value: "2,562" },
      { label: "Churn probability", value: "68%" },
    ],
  },
  {
    id: "ba-002",
    category: "Concentration Risk",
    severity: "high",
    title: "RM-driven sector herding in HNI equity portfolios",
    description:
      "Multiple RMs are recommending the same 3 sectors (Infrastructure, Energy, Banking) leading to correlated concentration across 3,821 HNI portfolios. Likely driven by recent sector momentum and shared research briefing.",
    affectedCount: 3_821,
    affectedLabel: "HNI portfolios",
    confidenceScore: 94,
    suggestedAction: "RM behaviour audit + diversification policy enforcement",
    segment: "HNI Equity",
    metrics: [
      { label: "Portfolios breaching limit", value: "3,821" },
      { label: "Avg concentration", value: "38%" },
      { label: "Policy limit", value: "35%" },
    ],
  },
  {
    id: "ba-003",
    category: "Engagement Risk",
    severity: "medium",
    title: "HNI segment — digital engagement declining",
    description:
      "Login frequency for HNI clients aged 50+ has dropped 24% in 60 days. Correlated with AUM increase, suggesting satisfaction — but creates advisory blind spot. High value, low engagement = risk.",
    affectedCount: 8_412,
    affectedLabel: "HNI relationships",
    confidenceScore: 76,
    suggestedAction: "Personalised portfolio review outreach via RM",
    segment: "HNI Equity",
    metrics: [
      { label: "Login drop", value: "-24%" },
      { label: "Avg AUM", value: "₹4.8 Cr" },
      { label: "Last RM contact", value: "62 days" },
    ],
  },
  {
    id: "ba-004",
    category: "Opportunity",
    severity: "low",
    title: "Young professional cohort systematically increasing SIP",
    description:
      "Customers aged 28–38 are increasing SIP amounts by avg 34% over 60 days. Strong indicator of income growth. Optimal window for goal-based planning, ELSS upsell, and portfolio upgrade.",
    affectedCount: 8_412,
    affectedLabel: "retail relationships",
    confidenceScore: 82,
    suggestedAction: "Trigger automated goal-planning session + ELSS campaign",
    segment: "Retail SIP",
    metrics: [
      { label: "Avg SIP increase", value: "+34%" },
      { label: "Est. incremental AUM", value: "₹28 Cr" },
      { label: "Conversion window", value: "30 days" },
    ],
  },
];

function ConfidenceBar({ value }: { value: number }) {
  const color = value >= 90 ? "bg-success" : value >= 75 ? "bg-warning" : "bg-n600";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1 bg-n800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${value}%` }} />
      </div>
      <span className="text-[11px] font-semibold text-n400 shrink-0">{value}%</span>
    </div>
  );
}

export default function IntelligencePage() {
  const [filter, setFilter] = useState<Filter>("all");
  const newCount = intelligencePatterns.filter((p) => p.isNew).length;

  const filtered = intelligencePatterns.filter(
    (p) => filter === "all" || p.type === filter
  );

  return (
    <div className="max-w-[1100px] mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out]">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-n100 tracking-tight">Intelligence</h1>
          <p className="text-n500 text-[13px] mt-1">
            Patterns, risks, and behaviours SECUREA discovered — without being asked.
          </p>
        </div>
        {newCount > 0 && (
          <span className="px-3 py-1.5 rounded-lg bg-secondary/10 border border-secondary/20 text-secondary text-[13px] font-medium">
            {newCount} new discoveries today
          </span>
        )}
      </div>

      {/* ── Behavioral Risk Alerts (primary) ────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n600">
            Behavioral risk alerts
          </p>
          <div className="flex-1 h-px bg-white/[0.05]" />
          <span className="text-[11px] text-n600">{behavioralAlerts.length} active</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {behavioralAlerts.map((alert) => {
            const severityStyles = {
              high:   { border: "border-error/20",   badge: "bg-error/10 text-error border-error/25",    glow: "glow-attention" },
              medium: { border: "border-warning/20",  badge: "bg-warning/10 text-warning border-warning/25", glow: "" },
              low:    { border: "border-primary/20",  badge: "bg-primary/10 text-primary border-primary/25", glow: "glow-primary" },
            } as const;
            const severityStyle = severityStyles[alert.severity as keyof typeof severityStyles] ?? severityStyles.medium;

            return (
              <GlassCard key={alert.id} className={`p-5 ${severityStyle.border} ${severityStyle.glow}`}>
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border ${severityStyle.badge}`}>
                        {alert.category}
                      </span>
                      <span className="text-[11px] text-n600">{alert.segment}</span>
                    </div>
                    <h3 className="text-[14px] font-semibold text-n100 leading-snug">
                      {alert.title}
                    </h3>
                  </div>
                </div>

                <p className="text-[12px] text-n400 leading-relaxed mb-3">
                  {alert.description}
                </p>

                {/* Metrics row */}
                <div className="flex items-center gap-4 mb-3 pt-2 border-t border-white/[0.05]">
                  {alert.metrics.map((m) => (
                    <div key={m.label}>
                      <p className="text-[10px] text-n600">{m.label}</p>
                      <p className="text-[13px] font-semibold text-n200">{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Confidence + action */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-[10px] text-n600 mb-1">Confidence</p>
                    <ConfidenceBar value={alert.confidenceScore} />
                  </div>
                  <Link
                    href="/decisions"
                    className="btn-primary text-[11px] py-1.5 shrink-0"
                  >
                    Act
                    <ArrowRight size={11} />
                  </Link>
                </div>

                <p className="text-[11px] text-n600 mt-2 pt-2 border-t border-white/[0.04]">
                  Suggested: {alert.suggestedAction}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* ── Pattern feed (secondary) ─────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 mb-3">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n600">
            SECUREA discovered
          </p>
          <div className="flex-1 h-px bg-white/[0.05]" />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 p-1 rounded-lg glass-subtle border border-white/[0.05] w-fit mb-4">
          {filterTabs.map((t) => {
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => setFilter(t.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                  filter === t.id
                    ? "bg-n700 text-n100 neu-raised"
                    : "text-n500 hover:text-n300"
                }`}
              >
                <Icon size={12} />
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {filtered.map((pattern) => (
            <GlassCard
              key={pattern.id}
              className={`p-5 ${pattern.isNew ? "border-secondary/20 glow-intel" : ""}`}
              hover
            >
              <div className="flex items-start gap-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <PatternTypePill type={pattern.type} />
                    {pattern.isNew && (
                      <span className="px-2 py-0.5 rounded-full bg-primary/15 border border-primary/25 text-primary text-[10px] font-semibold uppercase tracking-wide">New</span>
                    )}
                    <span className="text-n600 text-[11px]">Discovered {relativeTime(pattern.discoveredAt)}</span>
                  </div>
                  <h2 className="text-[15px] font-semibold text-n100 leading-snug mb-1.5">
                    {pattern.title}
                  </h2>
                  <p className="text-[12px] text-n400 leading-relaxed">{pattern.detail}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <Link href="/explore" className="btn-primary text-[11px] py-1.5">
                      Investigate <ArrowRight size={11} />
                    </Link>
                    {pattern.relatedDecisions.length > 0 && (
                      <Link href="/decisions" className="btn-ghost text-[11px] py-1.5">
                        <ExternalLink size={11} /> View decision
                      </Link>
                    )}
                  </div>
                </div>
                <div className="shrink-0 text-right space-y-3 min-w-[130px]">
                  <div>
                    <p className="text-[10px] text-n600 uppercase tracking-wide">Affected</p>
                    <p className="text-[24px] font-bold text-n100 leading-none mt-0.5">{formatCompact(pattern.affectedCount)}</p>
                    <p className="text-[11px] text-n500">{pattern.affectedLabel}</p>
                  </div>
                  {pattern.exposure && (
                    <div>
                      <p className="text-[10px] text-n600 uppercase tracking-wide">Exposure</p>
                      <p className="text-[14px] font-semibold text-n200">{pattern.exposure}</p>
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] text-n600 uppercase tracking-wide mb-1">Confidence</p>
                    <ConfidenceBar value={pattern.confidence} />
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

    </div>
  );
}
