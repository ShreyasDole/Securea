// ─── Core Domain Types ────────────────────────────────────────

export type EntityState = "stable" | "watch" | "attention";
export type DecisionStatus = "pending" | "in_review" | "resolved" | "actioned";
export type DecisionPriority = "critical" | "high" | "medium" | "low";
export type DecisionType = "risk" | "opportunity" | "compliance" | "behavioural" | "credit" | "fraud";
export type PatternType = "emerging" | "risk" | "behavioural" | "opportunity" | "anomaly";

// ─── Institution ─────────────────────────────────────────────

export interface Institution {
  id: string;
  name: string;
  totalRelationships: number;
  totalPortfolios: number;
  totalAccounts: number;
  aum: string;
  aumRaw: number;
}

// ─── Overview Stats ───────────────────────────────────────────

export interface TodayStats {
  importantChanges: number;
  decisionsRequiringAttention: number;
  emergingRisks: number;
  lastUpdated: string;
}

export interface PortfolioHealth {
  stable:    { count: number; percentage: number };
  watch:     { count: number; percentage: number };
  attention: { count: number; percentage: number };
}

// ─── Featured Signal ─────────────────────────────────────────

export interface Signal {
  id: string;
  type: PatternType;
  title: string;
  description: string;
  affectedCount: number;
  affectedLabel: string;
  potentialImpact?: string;
  confidence: number;
  createdAt: string;
  urgent: boolean;
}

// ─── Monitor ─────────────────────────────────────────────────

export interface EntityGroup {
  id: string;
  label: string;
  icon: string;
  total: number;
  stable: number;
  watch: number;
  attention: number;
}

export interface MonitoredEntity {
  id: string;
  groupId: string;
  name: string;
  identifier: string;
  state: EntityState;
  stateReason: string;
  changedAt: string;
  exposure?: string;
  tags: string[];
}

// ─── Financial Decision ───────────────────────────────────────

export interface FinancialDecision {
  id: string;
  type: DecisionType;
  priority: DecisionPriority;
  status: DecisionStatus;
  title: string;
  summary: string;
  affectedCount: number;
  affectedLabel: string;
  exposure?: string;
  reason: string;
  recommendation: string;
  confidence?: number;
  policyConstraints: string[];
  requiredAction: string;
  owner?: string;
  createdAt: string;
  updatedAt: string;
  dueAt?: string;
  linkedSignalId?: string;
}

// ─── Intelligence Pattern ─────────────────────────────────────

export interface IntelligencePattern {
  id: string;
  type: PatternType;
  title: string;
  detail: string;
  affectedCount: number;
  affectedLabel: string;
  exposure?: string;
  confidence: number;
  isNew: boolean;
  discoveredAt: string;
  relatedDecisions: string[];
}

// ─── Explore ─────────────────────────────────────────────────

export type ExploreEntityType = "relationship" | "portfolio" | "account" | "decision" | "pattern";

export interface ExploreResult {
  id: string;
  type: ExploreEntityType;
  title: string;
  subtitle: string;
  state?: EntityState;
  meta: Record<string, string>;
}

// ─── Ask SECUREA ─────────────────────────────────────────────

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  linkedData?: {
    type: string;
    count?: number;
    cta?: string;
    href?: string;
  };
  createdAt: string;
}
