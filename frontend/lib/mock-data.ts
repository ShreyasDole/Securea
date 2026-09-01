import type {
  Institution,
  TodayStats,
  PortfolioHealth,
  Signal,
  EntityGroup,
  MonitoredEntity,
  FinancialDecision,
  IntelligencePattern,
  ExploreResult,
  ChatMessage,
} from "@/types";

// ─── Institution ─────────────────────────────────────────────

export const institution: Institution = {
  id: "inst-001",
  name: "Meridian Capital",
  totalRelationships: 2_400_000,
  totalPortfolios: 184_000,
  totalAccounts: 31_000,
  aum: "₹48,210 Cr",
  aumRaw: 48210,
};

// ─── Today Stats ─────────────────────────────────────────────

export const todayStats: TodayStats = {
  importantChanges: 27,
  decisionsRequiringAttention: 14,
  emergingRisks: 6,
  lastUpdated: "2026-09-01T16:30:00+05:30",
};

// ─── Portfolio Health ─────────────────────────────────────────

export const portfolioHealth: PortfolioHealth = {
  stable:    { count: 150_880, percentage: 82 },
  watch:     { count: 25_760,  percentage: 14 },
  attention: { count: 7_360,   percentage: 4  },
};

// ─── Featured Signal ─────────────────────────────────────────

export const featuredSignal: Signal = {
  id: "sig-001",
  type: "behavioural",
  title: "A significant change in HNI liquidity behaviour.",
  description:
    "HNI customers are increasing cash allocation while simultaneously reducing long-term investment activity. Three correlated behavioural shifts detected.",
  affectedCount: 48_231,
  affectedLabel: "relationships",
  potentialImpact: "₹312 Cr opportunity",
  confidence: 91,
  createdAt: "2026-09-01T06:00:00Z",
  urgent: true,
};

// ─── Monitor Entity Groups ────────────────────────────────────

export const entityGroups: EntityGroup[] = [
  {
    id: "group-portfolios-customer",
    label: "Customer portfolios",
    icon: "Users",
    total: 2_400_000,
    stable: 1_987_200,
    watch: 384_000,
    attention: 28_800,
  },
  {
    id: "group-portfolios-investment",
    label: "Investment portfolios",
    icon: "BarChart3",
    total: 184_000,
    stable: 150_880,
    watch: 25_760,
    attention: 7_360,
  },
  {
    id: "group-accounts-institutional",
    label: "Institutional accounts",
    icon: "Building2",
    total: 31_000,
    stable: 28_520,
    watch: 2_170,
    attention: 310,
  },
];

export const monitoringCategories = [
  "Portfolio behaviour",
  "Risk exposure",
  "Liquidity",
  "Concentration",
  "Customer activity",
  "Product usage",
  "Performance",
  "Anomalies",
  "Financial goals",
  "Policy conditions",
];

// ─── Monitored Entities Requiring Attention ───────────────────

export const attentionEntities: MonitoredEntity[] = [
  {
    id: "ent-001",
    groupId: "group-portfolios-investment",
    name: "HNI Equity Portfolio Cluster A",
    identifier: "PF-HNI-A-3821",
    state: "attention",
    stateReason: "Sector concentration exceeded 35% threshold",
    changedAt: "2026-09-01T10:14:00Z",
    exposure: "₹842 Cr",
    tags: ["concentration", "rebalance"],
  },
  {
    id: "ent-002",
    groupId: "group-portfolios-customer",
    name: "Ultra HNI – Liquidity Shift Cohort",
    identifier: "CRP-UHNI-L-48231",
    state: "attention",
    stateReason: "Behavioural pattern: increasing cash, reducing AUM",
    changedAt: "2026-09-01T08:00:00Z",
    exposure: "₹312 Cr",
    tags: ["behavioural", "liquidity"],
  },
  {
    id: "ent-003",
    groupId: "group-accounts-institutional",
    name: "Meridian Fixed Income Fund – Corp",
    identifier: "INST-MFIF-C-0021",
    state: "attention",
    stateReason: "Duration risk increased 22% in 15 days",
    changedAt: "2026-09-01T07:45:00Z",
    exposure: "₹1,240 Cr",
    tags: ["duration", "fixed-income"],
  },
  {
    id: "ent-004",
    groupId: "group-portfolios-investment",
    name: "Mid-Cap Growth Portfolio Cluster",
    identifier: "PF-MCGP-0198",
    state: "watch",
    stateReason: "Drawdown approaching policy limit (-7.4%)",
    changedAt: "2026-09-01T11:20:00Z",
    exposure: "₹204 Cr",
    tags: ["drawdown", "policy"],
  },
  {
    id: "ent-005",
    groupId: "group-portfolios-customer",
    name: "Retail SIP Cohort – Equity",
    identifier: "CRP-SIP-EQ-2024",
    state: "watch",
    stateReason: "SIP discontinuation rate +18% vs 30-day avg",
    changedAt: "2026-09-01T09:00:00Z",
    tags: ["churn", "sip"],
  },
];

// ─── Financial Decisions ──────────────────────────────────────

export const decisions: FinancialDecision[] = [
  {
    id: "DEC-2026-001",
    type: "risk",
    priority: "critical",
    status: "pending",
    title: "Concentration risk across HNI equity portfolios",
    summary:
      "3,821 portfolios have exceeded sector concentration policy thresholds. Exposure concentrated in three sectors over a 30-day period.",
    affectedCount: 3_821,
    affectedLabel: "portfolios",
    exposure: "₹842 Cr",
    reason:
      "Sector concentration increased 14% over 30 days. Infrastructure, Energy, and Banking sectors now represent 38% of aggregate HNI equity allocation — above the 35% policy ceiling.",
    recommendation:
      "Initiate phased rebalancing across affected portfolios. Prioritise top 500 by exposure. SECUREA recommends reviewing before any new inflows into affected sectors.",
    confidence: 94,
    policyConstraints: ["Max sector concentration: 35%", "Rebalancing requires RM sign-off for >₹5 Cr"],
    requiredAction: "Review and approve rebalancing plan",
    owner: "Portfolio Risk Committee",
    createdAt: "2026-09-01T10:30:00Z",
    updatedAt: "2026-09-01T10:30:00Z",
    dueAt: "2026-09-02T18:00:00Z",
    linkedSignalId: "INT-2026-002",
  },
  {
    id: "DEC-2026-002",
    type: "opportunity",
    priority: "high",
    status: "pending",
    title: "HNI liquidity shift — product opportunity",
    summary:
      "48,231 HNI relationships are moving into higher cash positions. This signals unmet product need or confidence gap.",
    affectedCount: 48_231,
    affectedLabel: "relationships",
    exposure: "₹312 Cr",
    reason:
      "Customers with >₹50L AUM are increasing cash allocation (+31%) while reducing equity exposure. Behavioural pattern correlated with Q3 market volatility and lack of structured product offering.",
    recommendation:
      "Evaluate deployment of capital protection or structured product suite to this segment. SECUREA estimates ₹312 Cr re-deployable within 90 days with right product positioning.",
    confidence: 88,
    policyConstraints: ["Product suitability check required for structured products", "RM outreach requires CRM action"],
    requiredAction: "Approve product campaign and CRM action",
    owner: "Head of Wealth Products",
    createdAt: "2026-09-01T08:00:00Z",
    updatedAt: "2026-09-01T08:00:00Z",
    dueAt: "2026-09-05T18:00:00Z",
    linkedSignalId: "sig-001",
  },
  {
    id: "DEC-2026-003",
    type: "risk",
    priority: "high",
    status: "pending",
    title: "Duration risk in Fixed Income Fund",
    summary:
      "Meridian Fixed Income Fund — Corp has seen duration increase 22% in 15 days against rising rate environment.",
    affectedCount: 1,
    affectedLabel: "institutional account",
    exposure: "₹1,240 Cr",
    reason:
      "Modified duration increased from 4.2 to 5.1 years against a rising rate environment. 100bps rate move implies ₹63 Cr mark-to-market impact.",
    recommendation:
      "Review duration management strategy. Consider short-duration swaps or partial rotation to floating rate instruments.",
    confidence: 91,
    policyConstraints: ["Duration limit: 5.0 years (breached)", "Hedging requires Treasury approval"],
    requiredAction: "Treasury review and hedging authorisation",
    owner: "Fixed Income Desk",
    createdAt: "2026-09-01T07:45:00Z",
    updatedAt: "2026-09-01T07:45:00Z",
    dueAt: "2026-09-01T23:59:00Z",
    linkedSignalId: "INT-2026-003",
  },
  {
    id: "DEC-2026-004",
    type: "compliance",
    priority: "medium",
    status: "in_review",
    title: "KYC refresh overdue — 2,140 accounts",
    summary:
      "2,140 accounts have KYC documentation due for renewal. Regulatory deadline: 30 September 2026.",
    affectedCount: 2_140,
    affectedLabel: "accounts",
    reason:
      "Periodic KYC renewal cycle. Non-renewal triggers transactional freeze per SEBI circular. 30 days to deadline.",
    recommendation:
      "Initiate automated KYC renewal outreach via CRM. Flag accounts with >₹1 Cr for priority RM-led renewal.",
    confidence: 100,
    policyConstraints: ["SEBI KYC Circular 2024 — mandatory renewal", "Freeze on transactions post-deadline"],
    requiredAction: "Approve CRM campaign + RM priority list",
    owner: "Compliance Team",
    createdAt: "2026-08-28T09:00:00Z",
    updatedAt: "2026-09-01T09:00:00Z",
    dueAt: "2026-09-15T18:00:00Z",
  },
];

// ─── Intelligence Patterns ────────────────────────────────────

export const intelligencePatterns: IntelligencePattern[] = [
  {
    id: "INT-2026-001",
    type: "behavioural",
    title:
      "Customers with increasing liquidity are simultaneously reducing long-term investment activity.",
    detail:
      "Three correlated behavioural shifts identified: higher cash allocation, reduced equity SIP continuity, and declining product interaction. Pattern concentrated in HNI segment aged 45–60.",
    affectedCount: 48_231,
    affectedLabel: "relationships",
    exposure: "₹312 Cr",
    confidence: 91,
    isNew: true,
    discoveredAt: "2026-09-01T06:00:00Z",
    relatedDecisions: ["DEC-2026-002"],
  },
  {
    id: "INT-2026-002",
    type: "risk",
    title:
      "Sector concentration increasing simultaneously across three related sectors.",
    detail:
      "Infrastructure, Energy, and Banking sector weights have increased in correlated fashion across HNI equity portfolios. Likely driven by common RM recommendations or automated rebalancing toward sector momentum.",
    affectedCount: 3_821,
    affectedLabel: "portfolios",
    exposure: "₹842 Cr",
    confidence: 94,
    isNew: true,
    discoveredAt: "2026-09-01T09:00:00Z",
    relatedDecisions: ["DEC-2026-001"],
  },
  {
    id: "INT-2026-003",
    type: "anomaly",
    title:
      "HNI trading frequency declined 18% in the last 30 days — below historical range.",
    detail:
      "HNI segment transaction frequency has fallen to lowest point in 24 months. Not explained by market conditions alone. Correlated with increased cash balances and reduced RM interaction logs.",
    affectedCount: 21_400,
    affectedLabel: "relationships",
    confidence: 87,
    isNew: false,
    discoveredAt: "2026-08-31T20:00:00Z",
    relatedDecisions: ["DEC-2026-002"],
  },
  {
    id: "INT-2026-004",
    type: "emerging",
    title:
      "New cohort forming: young professional segment increasing SIP sizes materially.",
    detail:
      "Customers aged 28–38 are increasing SIP amounts by an average of 34% over 60 days. Strong signal for upsell of equity-linked products and goal-based planning tools.",
    affectedCount: 8_412,
    affectedLabel: "relationships",
    exposure: "₹28 Cr incremental AUM potential",
    confidence: 82,
    isNew: true,
    discoveredAt: "2026-09-01T12:00:00Z",
    relatedDecisions: [],
  },
];

// ─── Explore Results ──────────────────────────────────────────

export const exploreResults: ExploreResult[] = [
  {
    id: "exp-001",
    type: "portfolio",
    title: "HNI Equity Portfolio Cluster A",
    subtitle: "3,821 portfolios · ₹842 Cr exposure",
    state: "attention",
    meta: { "Sector breach": "Infrastructure 38%", "Decision": "DEC-2026-001" },
  },
  {
    id: "exp-002",
    type: "relationship",
    title: "Ultra HNI – Liquidity Shift Cohort",
    subtitle: "48,231 relationships · ₹312 Cr",
    state: "attention",
    meta: { "Pattern": "Cash increase + SIP reduction", "Confidence": "91%" },
  },
  {
    id: "exp-003",
    type: "account",
    title: "Meridian Fixed Income Fund – Corp",
    subtitle: "Institutional · ₹1,240 Cr AUM",
    state: "attention",
    meta: { "Duration": "5.1 years (limit 5.0)", "Decision": "DEC-2026-003" },
  },
  {
    id: "exp-004",
    type: "decision",
    title: "Concentration Risk — HNI Equity",
    subtitle: "DEC-2026-001 · Critical · Pending",
    meta: { "Affected": "3,821 portfolios", "Due": "Tomorrow 6pm" },
  },
  {
    id: "exp-005",
    type: "pattern",
    title: "HNI Trading Frequency Decline",
    subtitle: "INT-2026-003 · Anomaly · Confidence 87%",
    meta: { "Affected": "21,400 relationships", "Trend": "30-day low" },
  },
];

// ─── Chat Messages (Ask SECUREA) ──────────────────────────────

export const initialMessages: ChatMessage[] = [
  {
    id: "msg-001",
    role: "assistant",
    content:
      "I am monitoring 2.4M relationships, 184K portfolios, and ₹48,210 Cr in assets. I found 3 material changes today that warrant your attention.",
    linkedData: {
      type: "overview",
      count: 3,
      cta: "View decisions",
      href: "/decisions",
    },
    createdAt: "2026-09-01T16:30:00Z",
  },
];

export const suggestedQuestions = [
  "What's happening across my book today?",
  "Which portfolios need immediate attention?",
  "Why is HNI liquidity increasing?",
  "What should we do about concentration risk?",
  "Show me all compliance decisions due this week.",
  "Which segments have the highest opportunity right now?",
];
