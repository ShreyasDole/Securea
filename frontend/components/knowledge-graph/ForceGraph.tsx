"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const ForceGraph2D = require("react-force-graph-2d").default;

// ─── Types ────────────────────────────────────────────────────────────────────

type NodeType = "entity" | "asset" | "risk" | "signal" | "process" | "metric";

interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  description: string;
  detail: string;
  value: string;
  x?: number;
  y?: number;
}

interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  label: string;
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const NODE_COLORS: Record<NodeType, string> = {
  entity:  "#6366f1",
  asset:   "#22c55e",
  risk:    "#ef4444",
  signal:  "#f59e0b",
  process: "#a855f7",
  metric:  "#06b6d4",
};

const NODE_SIZES: Record<NodeType, number> = {
  entity:  10,
  asset:   8,
  risk:    9,
  signal:  7,
  process: 7,
  metric:  6,
};

const TYPE_LABELS: Record<NodeType, string> = {
  entity:  "Entity",
  asset:   "Asset",
  risk:    "Risk",
  signal:  "Signal",
  process: "Process",
  metric:  "Metric",
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const RAW_NODES: GraphNode[] = [
  // Entities
  { id: "amc",          label: "AMC",                  type: "entity",  description: "Asset Management Company",           detail: "Manages ₹2.4T AUM across 18 fund groups. Regulated by SEBI.",               value: "₹2.4T AUM"     },
  { id: "hni-group",    label: "HNI Group",             type: "entity",  description: "High Net Worth Individual Group",    detail: "3,821 HNI portfolios. Avg AUM ₹4.8Cr per client. Equity-heavy.",           value: "3,821 clients"  },
  { id: "retail-group", label: "Retail Group",          type: "entity",  description: "Retail SIP Investor Group",          detail: "28,400 retail SIP accounts. Avg monthly SIP ₹8,200. Mostly millennials.",  value: "28,400 accounts"},
  { id: "rm",           label: "RM Team",               type: "entity",  description: "Relationship Manager Team",          detail: "142 RMs managing HNI relationships. Avg 26 clients/RM. SLA: 48hr.",        value: "142 RMs"        },
  { id: "family-office",label: "Family Office",         type: "entity",  description: "Ultra-HNI Family Office Client",     detail: "₹180Cr AUM, 3 generations, multi-asset. Complex estate planning needs.",   value: "₹180Cr AUM"    },
  { id: "pension-fund", label: "Pension Fund",          type: "entity",  description: "Institutional Pension Fund Client",  detail: "₹650Cr corpus. Strict liquidity & SEBI compliance requirements.",          value: "₹650Cr corpus"  },

  // Assets
  { id: "equity",       label: "Equity Portfolio",      type: "asset",   description: "Large-cap & Mid-cap Equity",         detail: "₹890Cr across 3,821 HNI accounts. Sector tilt: Infra 22%, Energy 18%, Banking 16%.", value: "₹890Cr"      },
  { id: "sip",          label: "SIP Fund",              type: "asset",   description: "Systematic Investment Plans",        detail: "₹28Cr monthly inflow, 28,400 active SIPs. YTD XIRR: 14.2%.",               value: "₹28Cr/month"   },
  { id: "bonds",        label: "Bonds Portfolio",       type: "asset",   description: "Fixed Income & Debt Securities",     detail: "₹340Cr corporate bonds. Avg duration 4.2yr. AAA 60%, AA 30%, A 10%.",     value: "₹340Cr"        },
  { id: "infra-fund",   label: "Infra Fund",            type: "asset",   description: "Infrastructure Sector Fund",         detail: "₹120Cr in power, roads, ports. 3-year lock-in. Illiquid.",                 value: "₹120Cr"        },
  { id: "alternatives", label: "Alternatives",          type: "asset",   description: "Alternative Investments",           detail: "₹85Cr in REITs, InvITs, structured products for Family Office.",           value: "₹85Cr"         },

  // Risks
  { id: "market-risk",        label: "Market Risk",         type: "risk",    description: "Systematic Market Exposure",         detail: "Beta: 1.18 vs Nifty. Equity drawdown potential: -22% in bear case.",       value: "Beta 1.18"      },
  { id: "concentration-risk", label: "Concentration Risk",  type: "risk",    description: "Sector / Stock Concentration",       detail: "38% avg allocation to top 3 sectors across 3,821 HNI portfolios. Limit: 35%.", value: "38% avg"     },
  { id: "churn-risk",         label: "Churn Risk",          type: "risk",    description: "Client Attrition Risk",              detail: "18% MoM SIP discontinuation surge. Churn probability: 68% for at-risk cohort.", value: "68% prob"    },
  { id: "liquidity-risk",     label: "Liquidity Risk",      type: "risk",    description: "Redemption & Liquidity Mismatch",    detail: "₹42Cr locked in 3-5yr instruments. Crunch risk if redemptions spike.",      value: "₹42Cr locked"  },
  { id: "credit-risk",        label: "Credit Risk",         type: "risk",    description: "Credit / Default Risk",              detail: "10% in 'A' rated bonds. 2 issuers on watchlist. Exposure: ₹34Cr.",         value: "₹34Cr exposure" },

  // Signals
  { id: "sip-discontinuation",label: "SIP Drop",            type: "signal",  description: "SIP Discontinuation Surge",          detail: "1,280 SIPs missed Jul → 2,562 Aug. Cohort: 24–36 month accounts. Confidence: 87%.", value: "+18% MoM"  },
  { id: "sector-herding",     label: "Sector Herding",      type: "signal",  description: "RM-Driven Sector Concentration",     detail: "Multiple RMs recommending same 3 sectors. 3,821 portfolios breach limit. Confidence: 94%.", value: "3,821 breach"},
  { id: "engagement-drop",    label: "Engagement Drop",     type: "signal",  description: "HNI Digital Disengagement",          detail: "Login frequency for HNI (50+) dropped 24% in 60 days. Advisory blind spot.", value: "-24% logins"  },
  { id: "redemption-spike",   label: "Redemption Spike",    type: "signal",  description: "Abnormal Redemption Activity",       detail: "3.2x normal redemption velocity. Correlated with market correction -6.4%.", value: "3.2x spike"   },
  { id: "volatility-surge",   label: "Volatility Surge",    type: "signal",  description: "Portfolio Volatility Alert",         detail: "30-day rolling vol: 28% annualized vs 18% historical avg. Infra-driven.",   value: "28% vol"      },

  // Processes
  { id: "rebalancing",     label: "Rebalancing",         type: "process", description: "Portfolio Rebalancing Process",      detail: "Auto-triggered for portfolios with >5% sector drift. 124 portfolios queued.", value: "124 queued"  },
  { id: "compliance",      label: "Compliance Review",   type: "process", description: "Regulatory Compliance Check",        detail: "SEBI concentration limit scan. Weekly automated + quarterly full audit.",     value: "Weekly scan"  },
  { id: "rm-outreach",     label: "RM Outreach",         type: "process", description: "Relationship Manager Engagement",    detail: "Automated trigger for proactive RM contact with at-risk clients. SLA: 48hr.", value: "48hr SLA"    },
  { id: "risk-assessment", label: "Risk Assessment",     type: "process", description: "Periodic Risk Evaluation",           detail: "Daily VaR, weekly stress tests, monthly full risk report across all fund groups.", value: "Daily"    },

  // Metrics
  { id: "var",                  label: "VaR",              type: "metric",  description: "Value at Risk (95% CI, 1-day)",      detail: "Current VaR: ₹18.4Cr (1-day, 95%). Limit ₹20Cr. Headroom: ₹1.6Cr.",       value: "₹18.4Cr"     },
  { id: "sharpe",               label: "Sharpe Ratio",     type: "metric",  description: "Risk-Adjusted Return",              detail: "Equity Sharpe: 1.42 vs benchmark 1.18. Alpha: 3.2% annualized.",            value: "1.42"         },
  { id: "aum",                  label: "AUM",              type: "metric",  description: "Assets Under Management",           detail: "Total AUM: ₹2.4T. MoM: +1.8%. YTD: +12.4%. 8 consecutive positive quarters.", value: "₹2.4T"      },
  { id: "concentration-ratio",  label: "Conc. Ratio",      type: "metric",  description: "Portfolio Concentration Ratio",     detail: "HHI: 0.38 (limit 0.35). 3,821 portfolios flagged. Breach since Aug 12.",      value: "HHI 0.38"    },
  { id: "churn-rate",           label: "Churn Rate",       type: "metric",  description: "Monthly Client Churn Rate",         detail: "MoM churn: 0.82% (SIP segment). Target: <0.5%. Trend: increasing.",         value: "0.82%"        },
];

const RAW_LINKS: GraphLink[] = [
  // Entity hierarchy
  { source: "amc",          target: "hni-group",    label: "manages"       },
  { source: "amc",          target: "retail-group", label: "manages"       },
  { source: "hni-group",    target: "rm",           label: "assigned to"   },
  { source: "rm",           target: "family-office",label: "serves"        },
  { source: "rm",           target: "pension-fund", label: "serves"        },

  // Holdings
  { source: "hni-group",    target: "equity",       label: "holds"         },
  { source: "hni-group",    target: "bonds",        label: "holds"         },
  { source: "hni-group",    target: "infra-fund",   label: "holds"         },
  { source: "retail-group", target: "sip",          label: "holds"         },
  { source: "retail-group", target: "equity",       label: "holds"         },
  { source: "family-office",target: "alternatives", label: "holds"         },
  { source: "family-office",target: "bonds",        label: "holds"         },
  { source: "pension-fund", target: "bonds",        label: "holds"         },

  // Asset → Risk
  { source: "equity",       target: "market-risk",        label: "exposes to"  },
  { source: "equity",       target: "concentration-risk",  label: "exposes to"  },
  { source: "sip",          target: "churn-risk",          label: "exposes to"  },
  { source: "bonds",        target: "credit-risk",         label: "exposes to"  },
  { source: "bonds",        target: "liquidity-risk",      label: "exposes to"  },
  { source: "infra-fund",   target: "concentration-risk",  label: "amplifies"   },
  { source: "infra-fund",   target: "liquidity-risk",      label: "exposes to"  },
  { source: "alternatives", target: "liquidity-risk",      label: "exposes to"  },

  // Risk → Signal
  { source: "churn-risk",         target: "sip-discontinuation", label: "triggers"  },
  { source: "concentration-risk", target: "sector-herding",      label: "triggers"  },
  { source: "market-risk",        target: "volatility-surge",    label: "triggers"  },
  { source: "liquidity-risk",     target: "redemption-spike",    label: "triggers"  },
  { source: "engagement-drop",    target: "churn-risk",          label: "elevates"  },

  // Signal → Process
  { source: "sip-discontinuation",label: "requires",  target: "rm-outreach"    },
  { source: "sector-herding",     label: "requires",  target: "compliance"     },
  { source: "volatility-surge",   label: "triggers",  target: "rebalancing"    },
  { source: "volatility-surge",   label: "triggers",  target: "risk-assessment"},
  { source: "engagement-drop",    label: "requires",  target: "rm-outreach"    },
  { source: "redemption-spike",   label: "triggers",  target: "risk-assessment"},

  // → Metrics
  { source: "rebalancing",        target: "sharpe",               label: "improves"      },
  { source: "risk-assessment",    target: "var",                  label: "calculates"    },
  { source: "market-risk",        target: "var",                  label: "quantified by" },
  { source: "concentration-risk", target: "concentration-ratio",  label: "quantified by" },
  { source: "churn-risk",         target: "churn-rate",           label: "quantified by" },
  { source: "equity",             target: "sharpe",               label: "measured by"   },
  { source: "amc",                target: "aum",                  label: "tracked by"    },
  { source: "hni-group",          target: "aum",                  label: "contributes to"},
  { source: "retail-group",       target: "aum",                  label: "contributes to"},
];

// ─── Tooltip ──────────────────────────────────────────────────────────────────

function Tooltip({ node, mousePos, dims }: { node: GraphNode; mousePos: { x: number; y: number }; dims: { width: number; height: number } }) {
  const TOOLTIP_W = 260;
  const TOOLTIP_H = 110;
  const GAP = 14;

  let left = mousePos.x + GAP;
  let top  = mousePos.y + GAP;

  if (left + TOOLTIP_W > dims.width)  left = mousePos.x - TOOLTIP_W - GAP;
  if (top  + TOOLTIP_H > dims.height) top  = mousePos.y - TOOLTIP_H - GAP;

  const color = NODE_COLORS[node.type];

  return (
    <div
      className="absolute z-50 pointer-events-none select-none"
      style={{ left, top, width: TOOLTIP_W }}
    >
      <div
        className="rounded-xl border p-3 backdrop-blur-md"
        style={{ background: "rgba(10,10,18,0.92)", borderColor: color + "40" }}
      >
        <div className="flex items-center gap-2 mb-1.5">
          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />
          <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color }}>
            {TYPE_LABELS[node.type]}
          </span>
          <span className="ml-auto text-[11px] font-bold text-white">{node.value}</span>
        </div>
        <p className="text-[13px] font-semibold text-white leading-snug mb-1">{node.label}</p>
        <p className="text-[11px] text-white/50 mb-1.5">{node.description}</p>
        <p className="text-[11px] text-white/70 leading-relaxed">{node.detail}</p>
      </div>
    </div>
  );
}

// ─── Legend ───────────────────────────────────────────────────────────────────

const LEGEND_TYPES: { type: NodeType | "all"; label: string }[] = [
  { type: "all",     label: "All"      },
  { type: "entity",  label: "Entity"   },
  { type: "asset",   label: "Asset"    },
  { type: "risk",    label: "Risk"     },
  { type: "signal",  label: "Signal"   },
  { type: "process", label: "Process"  },
  { type: "metric",  label: "Metric"   },
];

function Legend({ active, onSelect }: { active: NodeType | "all"; onSelect: (t: NodeType | "all") => void }) {
  return (
    <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 rounded-xl border border-white/[0.07] p-3 backdrop-blur-md" style={{ background: "rgba(10,10,18,0.85)" }}>
      <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-0.5">Filter</p>
      {LEGEND_TYPES.map(({ type, label }) => {
        const color = type === "all" ? "#888" : NODE_COLORS[type];
        const isActive = active === type;
        return (
          <button
            key={type}
            onClick={() => onSelect(type)}
            className="flex items-center gap-2 text-[12px] font-medium transition-all rounded-md px-2 py-0.5"
            style={{
              color: isActive ? "#fff" : "rgba(255,255,255,0.4)",
              background: isActive ? color + "20" : "transparent",
            }}
          >
            {type !== "all" && <span className="w-2 h-2 rounded-full shrink-0" style={{ background: color }} />}
            {type === "all" && <span className="w-2 h-2 rounded-full shrink-0 border border-white/30" />}
            {label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar({ nodeCount, linkCount }: { nodeCount: number; linkCount: number }) {
  return (
    <div className="absolute bottom-3 left-3 z-10 flex items-center gap-4 rounded-xl border border-white/[0.07] px-4 py-2 backdrop-blur-md" style={{ background: "rgba(10,10,18,0.85)" }}>
      <div>
        <p className="text-[10px] text-white/30 uppercase tracking-wider">Nodes</p>
        <p className="text-[13px] font-bold text-white">{nodeCount}</p>
      </div>
      <div className="w-px h-6 bg-white/10" />
      <div>
        <p className="text-[10px] text-white/30 uppercase tracking-wider">Relationships</p>
        <p className="text-[13px] font-bold text-white">{linkCount}</p>
      </div>
      <div className="w-px h-6 bg-white/10" />
      <p className="text-[11px] text-white/30">Scroll to zoom · Drag to pan</p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ForceGraphComponent() {
  const containerRef                        = useRef<HTMLDivElement>(null);
  const [dims, setDims]                     = useState({ width: 800, height: 600 });
  const [hoveredNode, setHoveredNode]       = useState<GraphNode | null>(null);
  const [mousePos, setMousePos]             = useState({ x: 0, y: 0 });
  const [filter, setFilter]                 = useState<NodeType | "all">("all");
  const hoveredRef                          = useRef<GraphNode | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const r = entries[0].contentRect;
      setDims({ width: r.width, height: r.height });
    });
    obs.observe(el);
    setDims({ width: el.offsetWidth, height: el.offsetHeight });
    return () => obs.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleNodeHover = useCallback((node: GraphNode | null) => {
    hoveredRef.current = node;
    setHoveredNode(node);
    if (containerRef.current) {
      containerRef.current.style.cursor = node ? "pointer" : "default";
    }
  }, []);

  const graphData = useMemo(() => {
    if (filter === "all") {
      return { nodes: RAW_NODES.map(n => ({ ...n })), links: RAW_LINKS.map(l => ({ ...l })) };
    }
    const primaryIds = new Set(RAW_NODES.filter(n => n.type === filter).map(n => n.id));
    const visibleIds  = new Set<string>();
    RAW_LINKS.forEach(l => {
      const src = l.source as string;
      const tgt = l.target as string;
      if (primaryIds.has(src) || primaryIds.has(tgt)) {
        visibleIds.add(src);
        visibleIds.add(tgt);
      }
    });
    return {
      nodes: RAW_NODES.filter(n => visibleIds.has(n.id)).map(n => ({ ...n })),
      links: RAW_LINKS.filter(l => visibleIds.has(l.source as string) && visibleIds.has(l.target as string)).map(l => ({ ...l })),
    };
  }, [filter]);

  const nodeCanvasObject = useCallback((node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const r       = NODE_SIZES[node.type] ?? 6;
    const color   = NODE_COLORS[node.type] ?? "#888";
    const hovered = hoveredRef.current?.id === node.id;
    const x       = node.x ?? 0;
    const y       = node.y ?? 0;

    if (hovered) {
      ctx.shadowBlur  = 24;
      ctx.shadowColor = color;
    }

    ctx.beginPath();
    ctx.arc(x, y, hovered ? r + 1.5 : r, 0, 2 * Math.PI);
    ctx.fillStyle = hovered ? color : color + "bb";
    ctx.fill();

    ctx.strokeStyle = hovered ? "#ffffff99" : color + "55";
    ctx.lineWidth   = hovered ? 1.5 : 0.8;
    ctx.stroke();
    ctx.shadowBlur  = 0;

    if (globalScale >= 0.45) {
      const fontSize = Math.min(Math.max(10 / globalScale, 3), 11);
      ctx.font        = `600 ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.fillStyle   = hovered ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.65)";
      ctx.textAlign   = "center";
      ctx.textBaseline = "top";
      ctx.fillText(node.label, x, y + r + 2);
      ctx.textBaseline = "alphabetic";
    }
  }, []);

  const nodePointerAreaPaint = useCallback((node: GraphNode, color: string, ctx: CanvasRenderingContext2D) => {
    const r = (NODE_SIZES[node.type] ?? 6) + 6;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);
    ctx.fill();
  }, []);

  const linkColor = useCallback(() => "rgba(255,255,255,0.10)", []);
  const linkWidth = useCallback(() => 0.8, []);

  const linkDirectionalParticleColor = useCallback((link: GraphLink) => {
    const srcId = typeof link.source === "object" ? (link.source as GraphNode).id : link.source;
    const src   = RAW_NODES.find(n => n.id === srcId);
    return src ? NODE_COLORS[src.type] + "99" : "#ffffff44";
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden" onMouseMove={handleMouseMove}>
      {dims.width > 0 && (
        <ForceGraph2D
          graphData={graphData}
          width={dims.width}
          height={dims.height}
          backgroundColor="#080810"
          nodeCanvasObject={nodeCanvasObject}
          nodeCanvasObjectMode={() => "replace"}
          nodePointerAreaPaint={nodePointerAreaPaint}
          linkColor={linkColor}
          linkWidth={linkWidth}
          linkDirectionalArrowLength={4}
          linkDirectionalArrowRelPos={0.9}
          linkDirectionalParticles={1}
          linkDirectionalParticleWidth={1.5}
          linkDirectionalParticleSpeed={0.004}
          linkDirectionalParticleColor={linkDirectionalParticleColor}
          onNodeHover={handleNodeHover}
          cooldownTicks={120}
          d3AlphaDecay={0.015}
          d3VelocityDecay={0.25}
          enableNodeDrag
          enableZoomInteraction
          enablePanInteraction
        />
      )}

      <Legend active={filter} onSelect={setFilter} />

      <StatsBar nodeCount={graphData.nodes.length} linkCount={graphData.links.length} />

      {hoveredNode && (
        <Tooltip node={hoveredNode} mousePos={mousePos} dims={dims} />
      )}
    </div>
  );
}
