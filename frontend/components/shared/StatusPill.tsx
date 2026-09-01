import { cn, stateBg, priorityBg, patternTypeColor } from "@/lib/utils";
import type { EntityState, DecisionPriority, PatternType } from "@/types";

interface StatePillProps  { state: EntityState;       className?: string }
interface PriorityPillProps { priority: DecisionPriority; className?: string }
interface PatternPillProps { type: PatternType;         className?: string }

export function StatePill({ state, className }: StatePillProps) {
  const labels: Record<EntityState, string> = {
    stable:    "Stable",
    watch:     "Watch",
    attention: "Attention",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium border",
        stateBg(state),
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {labels[state]}
    </span>
  );
}

export function PriorityPill({ priority, className }: PriorityPillProps) {
  const labels: Record<DecisionPriority, string> = {
    critical: "Critical",
    high:     "High",
    medium:   "Medium",
    low:      "Low",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border",
        priorityBg(priority),
        className
      )}
    >
      {labels[priority]}
    </span>
  );
}

export function PatternTypePill({ type, className }: PatternPillProps) {
  const labels: Record<PatternType, string> = {
    emerging:    "⚡ Emerging",
    risk:        "⚠ Risk",
    behavioural: "◉ Behaviour",
    opportunity: "✦ Opportunity",
    anomaly:     "~ Anomaly",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border",
        patternTypeColor(type),
        className
      )}
    >
      {labels[type]}
    </span>
  );
}
