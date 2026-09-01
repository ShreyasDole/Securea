"use client";

import { useState } from "react";
import { Search, Users, BarChart3, Building2, GitBranch, Sparkles, ChevronRight } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import { StatePill } from "@/components/shared/StatusPill";
import { exploreResults } from "@/lib/mock-data";
import type { ExploreEntityType, ExploreResult } from "@/types";

const typeFilters: { id: ExploreEntityType | "all"; label: string; icon: React.ElementType }[] = [
  { id: "all",          label: "All",          icon: Search     },
  { id: "relationship", label: "Relationships", icon: Users      },
  { id: "portfolio",    label: "Portfolios",    icon: BarChart3  },
  { id: "account",      label: "Accounts",      icon: Building2  },
  { id: "decision",     label: "Decisions",     icon: GitBranch  },
  { id: "pattern",      label: "Patterns",      icon: Sparkles   },
];

const suggestions = [
  "Show portfolios with concentration breach",
  "HNI segment with decreasing AUM",
  "All decisions due this week",
  "Accounts with KYC overdue",
  "Portfolios in Fixed Income with high duration",
  "Relationships affected by liquidity pattern",
];

export default function ExplorePage() {
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<ExploreEntityType | "all">("all");

  const filtered = exploreResults.filter((r) => {
    const matchType  = typeFilter === "all" || r.type === typeFilter;
    const matchQuery = !query || r.title.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  return (
    <div className="max-w-[960px] mx-auto space-y-6 animate-[fadeIn_0.3s_ease-out]">

      {/* ── Header ─────────────────────────────────────────────── */}
      <div>
        <h1 className="text-[24px] font-semibold text-n100 tracking-tight">Explore</h1>
        <p className="text-n500 text-[13px] mt-1">
          Navigate the institution&apos;s financial world. Start anywhere.
        </p>
      </div>

      {/* ── Search bar ─────────────────────────────────────────── */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-n500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search relationships, portfolios, decisions, patterns..."
          className="w-full glass-strong rounded-xl px-4 py-4 pl-11 text-[14px] text-n200 placeholder:text-n600 focus:outline-none focus:border-primary/40 transition-all"
          style={{ background: "rgba(30,41,59,0.6)" }}
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-n500 hover:text-n300 text-[12px]"
          >
            Clear
          </button>
        )}
      </div>

      {/* ── Type filters ───────────────────────────────────────── */}
      <div className="flex items-center gap-2 flex-wrap">
        {typeFilters.map((f) => {
          const Icon = f.icon;
          const active = typeFilter === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setTypeFilter(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all border ${
                active
                  ? "bg-primary/15 text-primary border-primary/25 neu-raised"
                  : "glass-subtle text-n500 border-white/[0.05] hover:text-n300 hover:border-white/[0.1]"
              }`}
            >
              <Icon size={12} />
              {f.label}
            </button>
          );
        })}
      </div>

      {/* ── Suggestions (when no query) ──────────────────────── */}
      {!query && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n600 mb-3">
            Suggested explorations
          </p>
          <div className="grid grid-cols-2 gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="aether-card-sm px-4 py-3 text-left text-[13px] text-n400 hover:text-n200 transition-colors flex items-center justify-between group"
              >
                <span>{s}</span>
                <ChevronRight size={13} className="text-n600 group-hover:text-n400 transition-colors shrink-0" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Results ─────────────────────────────────────────────── */}
      {(query || typeFilter !== "all") && (
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n600 mb-3">
            {filtered.length} results
          </p>
          <div className="space-y-2">
            {filtered.map((result) => (
              <ExploreResultRow key={result.id} result={result} />
            ))}
            {filtered.length === 0 && (
              <GlassCard className="p-8 text-center">
                <p className="text-n500 text-[14px]">No results found.</p>
                <p className="text-n600 text-[12px] mt-1">
                  Try broadening your search or using Ask SECUREA.
                </p>
              </GlassCard>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

function ExploreResultRow({ result }: { result: ExploreResult }) {
  const typeIcon: Record<string, React.ElementType> = {
    relationship: Users,
    portfolio:    BarChart3,
    account:      Building2,
    decision:     GitBranch,
    pattern:      Sparkles,
  };

  const typeLabel: Record<string, string> = {
    relationship: "Relationship",
    portfolio:    "Portfolio",
    account:      "Account",
    decision:     "Decision",
    pattern:      "Pattern",
  };

  const Icon = typeIcon[result.type] || Search;

  return (
    <GlassCard className="p-4" hover>
      <div className="flex items-start gap-4">
        <div className="w-8 h-8 rounded-lg bg-n800 flex items-center justify-center shrink-0 neu-raised">
          <Icon size={14} className="text-n400" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] text-n600 font-medium uppercase tracking-wide">
              {typeLabel[result.type]}
            </span>
            {result.state && <StatePill state={result.state} />}
          </div>
          <p className="text-[14px] font-medium text-n100">{result.title}</p>
          <p className="text-[12px] text-n500 mt-0.5">{result.subtitle}</p>
          {Object.keys(result.meta).length > 0 && (
            <div className="flex items-center gap-3 mt-2 flex-wrap">
              {Object.entries(result.meta).map(([k, v]) => (
                <span key={k} className="text-[11px] text-n600">
                  <span className="text-n700">{k}:</span>{" "}
                  <span className="text-n500">{v}</span>
                </span>
              ))}
            </div>
          )}
        </div>
        <ChevronRight size={14} className="text-n600 shrink-0 mt-1" />
      </div>
    </GlassCard>
  );
}
