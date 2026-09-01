import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Aether Neutral Scale
        n900: "#0F172A",
        n800: "#1E293B",
        n700: "#334155",
        n600: "#475569",
        n500: "#64748B",
        n400: "#94A3B8",
        n300: "#CBD5E1",
        n200: "#E2E8F0",
        n100: "#F1F5F9",
        n50:  "#F8FAFC",

        // Aether Brand
        primary:        "#6366F1",
        "primary-strong": "#4F46E5",
        secondary:      "#8B5CF6",
        accent:         "#EC4899",
        info:           "#3B82F6",
        success:        "#10B981",
        warning:        "#F59E0B",
        error:          "#EF4444",

        // SECUREA semantic
        stable:     "#10B981",
        watch:      "#F59E0B",
        attention:  "#EF4444",
        intel:      "#8B5CF6",

        // Base surface
        base:       "#0B0F1A",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-1": ["57px", { lineHeight: "64px", fontWeight: "700" }],
        "display-2": ["45px", { lineHeight: "52px", fontWeight: "700" }],
        h1: ["32px", { lineHeight: "40px", fontWeight: "700" }],
        h2: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        h3: ["20px", { lineHeight: "28px", fontWeight: "600" }],
        h4: ["18px", { lineHeight: "24px", fontWeight: "600" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
        body:       ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-sm":  ["13px", { lineHeight: "18px", fontWeight: "400" }],
        label:      ["12px", { lineHeight: "16px", fontWeight: "500" }],
        caption:    ["11px", { lineHeight: "14px", fontWeight: "400" }],
        overline:   ["11px", { lineHeight: "14px", fontWeight: "600" }],
      },
      spacing: {
        1:  "4px",
        2:  "8px",
        3:  "12px",
        4:  "16px",
        5:  "20px",
        6:  "24px",
        8:  "32px",
        10: "40px",
        12: "48px",
        16: "64px",
        20: "80px",
        24: "96px",
      },
      borderRadius: {
        xs:   "6px",
        sm:   "8px",
        md:   "12px",
        lg:   "16px",
        xl:   "20px",
        "2xl":"24px",
        full: "9999px",
      },
      boxShadow: {
        "neu-raised":
          "8px 8px 20px rgba(0,0,0,0.6), -3px -3px 10px rgba(255,255,255,0.025)",
        "neu-pressed":
          "inset 4px 4px 12px rgba(0,0,0,0.6), inset -2px -2px 6px rgba(255,255,255,0.02)",
        "neu-focus":
          "0 0 0 2px #6366F1, 8px 8px 20px rgba(0,0,0,0.5), -3px -3px 10px rgba(255,255,255,0.02)",
        "glass-border":
          "0 0 0 1px rgba(255,255,255,0.08)",
        "card-glow-primary":
          "0 0 40px rgba(99,102,241,0.08)",
        "card-glow-intel":
          "0 0 40px rgba(139,92,246,0.08)",
        "card-glow-attention":
          "0 0 40px rgba(239,68,68,0.08)",
      },
      backdropBlur: {
        xs:  "4px",
        sm:  "8px",
        md:  "12px",
        lg:  "20px",
        xl:  "32px",
      },
      animation: {
        "pulse-slow":  "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-in":     "fadeIn 0.2s ease-out",
        "slide-up":    "slideUp 0.25s ease-out",
        "shimmer":     "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn:  { from: { opacity: "0" }, to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
