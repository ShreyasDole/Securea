"use client";

import dynamic from "next/dynamic";
import { Network } from "lucide-react";

const ForceGraph = dynamic(
  () => import("@/components/knowledge-graph/ForceGraph"),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
          <p className="text-n500 text-[13px]">Initialising graph…</p>
        </div>
      </div>
    ),
  }
);

export default function KnowledgeGraphPage() {
  return (
    <div className="flex flex-col h-full animate-[fadeIn_0.3s_ease-out]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4 shrink-0">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-7 h-7 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center">
              <Network size={14} className="text-primary" />
            </div>
            <h1 className="text-[24px] font-semibold text-n100 tracking-tight">Knowledge Graph</h1>
          </div>
          <p className="text-n500 text-[13px] ml-9">
            Entity relationships, risk linkages, and behavioral signals — mapped.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-n600 border border-white/[0.06] rounded-lg px-3 py-2 glass-subtle">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          30 nodes · 40 relationships
        </div>
      </div>

      {/* Graph canvas */}
      <div className="flex-1 min-h-0 rounded-xl border border-white/[0.06] overflow-hidden" style={{ background: "#080810" }}>
        <ForceGraph />
      </div>
    </div>
  );
}
