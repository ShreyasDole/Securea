import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: "primary" | "intel" | "attention" | "stable" | "none";
  onClick?: () => void;
  hover?: boolean;
}

export default function GlassCard({
  children,
  className,
  glow = "none",
  onClick,
  hover = false,
}: GlassCardProps) {
  const glowClass = {
    primary:   "glow-primary",
    intel:     "glow-intel",
    attention: "glow-attention",
    stable:    "glow-stable",
    none:      "",
  }[glow];

  return (
    <div
      onClick={onClick}
      className={cn(
        "aether-card",
        glowClass,
        // On hover: lift + brighten the glass slightly
        hover && [
          "cursor-pointer",
          "transition-all duration-200",
          "hover:-translate-y-[2px]",
          "hover:border-white/[0.18]",
          "hover:shadow-[0_12px_40px_rgba(0,0,0,0.55),-2px_-2px_6px_rgba(255,255,255,0.04),inset_0_1px_0_rgba(255,255,255,0.14)]",
        ],
        onClick && "cursor-pointer",
        className
      )}
    >
      {children}
    </div>
  );
}
