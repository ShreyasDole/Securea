import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { EntityState, DecisionPriority, DecisionType, PatternType } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number): string {
  if (n >= 10_000_000) return `${(n / 10_000_000).toFixed(1)}Cr`;
  if (n >= 100_000)    return `${(n / 100_000).toFixed(1)}L`;
  if (n >= 1_000)      return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("en-IN");
}

export function formatCompact(n: number): string {
  if (n >= 10_000_000) return `${(n / 10_000_000).toFixed(2)}Cr`;
  if (n >= 100_000)    return `${(n / 100_000).toFixed(1)}L`;
  if (n >= 1_000)      return `${(n / 1_000).toFixed(0)}K`;
  return n.toLocaleString("en-IN");
}

export function stateColor(state: EntityState): string {
  return {
    stable:    "text-success",
    watch:     "text-warning",
    attention: "text-error",
  }[state];
}

export function stateBg(state: EntityState): string {
  return {
    stable:    "bg-success/10 text-success border-success/20",
    watch:     "bg-warning/10 text-warning border-warning/20",
    attention: "bg-error/10  text-error  border-error/20",
  }[state];
}

export function priorityBg(priority: DecisionPriority): string {
  return {
    critical: "bg-error/15   text-error   border-error/25",
    high:     "bg-warning/15 text-warning border-warning/25",
    medium:   "bg-primary/15 text-primary border-primary/25",
    low:      "bg-n600/15    text-n400    border-n600/25",
  }[priority];
}

export function decisionTypeLabel(type: DecisionType): string {
  return {
    risk:         "Risk",
    opportunity:  "Opportunity",
    compliance:   "Compliance",
    behavioural:  "Behavioural",
    credit:       "Credit",
    fraud:        "Fraud",
  }[type];
}

export function patternTypeLabel(type: PatternType): string {
  return {
    emerging:    "Emerging pattern",
    risk:        "Risk pattern",
    behavioural: "Behaviour shift",
    opportunity: "Opportunity",
    anomaly:     "Anomaly",
  }[type];
}

export function patternTypeColor(type: PatternType): string {
  return {
    emerging:    "text-primary   bg-primary/10   border-primary/20",
    risk:        "text-error     bg-error/10     border-error/20",
    behavioural: "text-warning   bg-warning/10   border-warning/20",
    opportunity: "text-success   bg-success/10   border-success/20",
    anomaly:     "text-secondary bg-n700/30      border-n600/30",
  }[type];
}

export function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);
  if (mins  < 60)   return `${mins}m ago`;
  if (hours < 24)   return `${hours}h ago`;
  return `${days}d ago`;
}

export function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}
