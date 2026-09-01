"use client";

import {
  TrendingUp, Crown, Users, ShieldCheck, Repeat,
  ArrowRight, Globe, BarChart3, Building2, Zap, Landmark, Plane, PiggyBank,
} from "lucide-react";
import Link from "next/link";
import GlassCard from "@/components/shared/GlassCard";
import { monitoringCategories } from "@/lib/mock-data";
import { segments as defaultSegments } from "@/lib/mock-customers";
import { useFirm } from "@/lib/firm-context";
import { formatCompact } from "@/lib/utils";
import type { FirmSegment } from "@/lib/mock-firms";
import type { Segment } from "@/lib/mock-customers";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Crown, Users, ShieldCheck, Repeat, Globe,
  BarChart3, Building2, Zap, Landmark, Plane, PiggyBank, Shield: ShieldCheck,
};

type AnySegment = FirmSegment | Segment;

export default function MonitorPage() {
  const { session } = useFirm();
  const segments: AnySegment[] = session?.firm.overview.segments ?? defaultSegments;

  const totalAttention = segments.reduce((s, g) => s + g.attention, 0);
  const totalWatch     = segments.reduce((s, g) => s + g.watch,     0);
  const totalCustomers = segments.reduce((s, g) => s + g.totalCustomers, 0);

  const firmName = session?.firm.shortName ?? "SECUREA";
  const firmColor = session?.firm.color ?? "#6366F1";

  return (
    <div className="w-full space-y-6 animate-[fadeIn_0.3s_ease-out]">

      {/* ── Header ───────────────────────────────────────── */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[24px] font-semibold text-n100 tracking-tight">Monitor</h1>
          <p className="text-n500 text-[13px] mt-1">
            {firmName} · SECUREA watches everything. You see what matters.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass-subtle text-[12px] text-n400">
            <span className="w-1.5 h-1.5 rounded-full bg-success dot-pulse" />
            Live monitoring · {formatCompact(totalCustomers)} entities
          </div>
        </div>
      </div>

      {/* ── Summary bar ──────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-4">
        <GlassCard className="p-4">
          <p className="text-[11px] text-n600 uppercase tracking-widest mb-1">Total monitored</p>
          <p className="text-[28px] font-bold text-n100">{formatCompact(totalCustomers)}</p>
          <p className="text-[12px] text-n500">across {segments.length} segments</p>
        </GlassCard>
        <GlassCard className="p-4 border-warning/15">
          <p className="text-[11px] text-n600 uppercase tracking-widest mb-1">On watch</p>
          <p className="text-[28px] font-bold text-warning">{formatCompact(totalWatch)}</p>
          <p className="text-[12px] text-n500">changes detected</p>
        </GlassCard>
        <GlassCard className="p-4 border-error/15 glow-attention">
          <p className="text-[11px] text-n600 uppercase tracking-widest mb-1">Require attention</p>
          <p className="text-[28px] font-bold text-error">{formatCompact(totalAttention)}</p>
          <p className="text-[12px] text-n500">needs action now</p>
        </GlassCard>
      </div>

      {/* ── Segment grid ─────────────────────────────────── */}
      <div>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-n600 mb-3">
          {firmName} portfolio segments — click to explore
        </p>
        <div className="grid grid-cols-1 gap-3">
          {segments.map((seg) => (
            <SegmentRow key={seg.id} segment={seg} firmColor={firmColor} />
          ))}
        </div>
      </div>

      {/* ── Bottom cards ─────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4">
        <GlassCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n500 mb-4">
            SECUREA is watching
          </p>
          <div className="grid grid-cols-2 gap-2">
            {monitoringCategories.map((cat) => (
              <div key={cat} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-success/60 shrink-0" />
                <span className="text-[12px] text-n400">{cat}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-n500 mb-4">
            Integration status
          </p>
          <div className="space-y-2.5">
            {[
              { name: "Core Banking System",  latency: "12ms" },
              { name: "Portfolio Management", latency: "8ms"  },
              { name: "CRM",                  latency: "22ms" },
              { name: "Risk Engine",          latency: "31ms" },
              { name: "Market Data Feed",     latency: "4ms"  },
              { name: "Compliance System",    latency: "18ms" },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success dot-pulse" />
                  <span className="text-[12px] text-n400">{s.name}</span>
                </div>
                <span className="text-[11px] text-n600">{s.latency}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

    </div>
  );
}

function SegmentRow({ segment, firmColor }: { segment: AnySegment; firmColor: string }) {
  const Icon = iconMap[segment.icon] || Users;
  const color = segment.color ?? firmColor;
  const stablePct    = Math.round((segment.stable    / segment.totalCustomers) * 100);
  const watchPct     = Math.round((segment.watch     / segment.totalCustomers) * 100);
  const attentionPct = Math.round((segment.attention / segment.totalCustomers) * 100);

  return (
    <Link href={`/monitor/${segment.id}`}>
      <GlassCard
        className="p-5 hover:border-white/[0.14] hover:translate-y-[-1px] transition-all duration-200 cursor-pointer"
        hover
      >
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-3 w-[260px] shrink-0">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center neu-raised shrink-0"
              style={{ background: `${color}20`, border: `1px solid ${color}30` }}
            >
              <Icon size={16} style={{ color }} />
            </div>
            <div>
              <p className="text-[14px] font-semibold text-n100">{segment.label}</p>
              <p className="text-[11px] text-n600">{segment.description}</p>
            </div>
          </div>

          <div className="w-[100px] shrink-0">
            <p className="text-[22px] font-bold text-n100 leading-none">{formatCompact(segment.totalCustomers)}</p>
            <p className="text-[11px] text-n600">clients</p>
          </div>

          <div className="w-[100px] shrink-0">
            <p className="text-[16px] font-semibold text-n200">₹{formatCompact(segment.totalAumCr)} Cr</p>
            <p className="text-[11px] text-n600">total AUM</p>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex h-1.5 rounded-full overflow-hidden mb-2 gap-0.5">
              <div className="bg-success rounded-l-full" style={{ width: `${stablePct}%` }} />
              <div className="bg-warning"                style={{ width: `${watchPct}%` }} />
              <div className="bg-error rounded-r-full"   style={{ width: `${attentionPct}%` }} />
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-success">{formatCompact(segment.stable)} stable</span>
              <span className="text-warning">{formatCompact(segment.watch)} watch</span>
              <span className="text-error">{formatCompact(segment.attention)} attention</span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-4">
            {segment.attention > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-error/10 border border-error/20 text-error text-[11px] font-medium">
                {formatCompact(segment.attention)} need attention
              </span>
            )}
            <ArrowRight size={15} className="text-n600" />
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
