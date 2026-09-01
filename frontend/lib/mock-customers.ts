import type { EntityState } from "@/types";

// ─── Types ───────────────────────────────────────────────────

export interface AllocationItem {
  category: string;
  percentage: number;
  amountL: number; // in lakhs
  color: string;
}

export interface PerformancePoint {
  month: string;
  portfolio: number;
  benchmark: number;
}

export interface SectorConcentration {
  sector: string;
  percentage: number;
  limit: number;
  breached: boolean;
}

export interface BehavioralSignal {
  id: string;
  type: "risk" | "opportunity" | "anomaly";
  severity: "high" | "medium" | "low";
  label: string;
  description: string;
  date: string;
  confidence: number;
}

export interface Goal {
  name: string;
  targetAmountL: number;
  currentAmountL: number;
  targetDate: string;
  onTrack: boolean;
}

export interface Customer {
  id: string;
  name: string;
  accountId: string;
  segmentId: string;
  segmentLabel: string;
  rm: string;
  city: string;
  age: number;
  occupation: string;
  aumL: number; // total AUM in lakhs
  aumFormatted: string;
  state: EntityState;
  stateReason?: string;
  riskScore: number; // 1–10
  riskProfile: "Conservative" | "Moderate" | "Aggressive";
  returns: {
    oneMonth: number;
    threeMonth: number;
    ytd: number;
    oneYear: number;
    threeYear: number;
  };
  allocation: AllocationItem[];
  performance: PerformancePoint[];
  sectorConcentration: SectorConcentration[];
  behavioralSignals: BehavioralSignal[];
  goals: Goal[];
  lastActivity: string;
  joinedDate: string;
  relatedDecisions: string[];
}

// ─── Segment Definitions ─────────────────────────────────────

export interface Segment {
  id: string;
  label: string;
  description: string;
  icon: string;
  totalCustomers: number;
  totalAumCr: number;
  stable: number;
  watch: number;
  attention: number;
  color: string;
}

export const segments: Segment[] = [
  {
    id: "hni-equity",
    label: "HNI Equity Portfolios",
    description: "High Net Worth Individual equity-focused portfolios",
    icon: "TrendingUp",
    totalCustomers: 12_840,
    totalAumCr: 4_210,
    stable: 10_240,
    watch: 2_100,
    attention: 500,
    color: "#6366F1",
  },
  {
    id: "ultra-hni",
    label: "Ultra HNI",
    description: "Ultra high net worth multi-asset portfolios",
    icon: "Crown",
    totalCustomers: 1_240,
    totalAumCr: 18_640,
    stable: 960,
    watch: 210,
    attention: 70,
    color: "#8B5CF6",
  },
  {
    id: "mass-affluent",
    label: "Mass Affluent",
    description: "Emerging affluent goal-based portfolios",
    icon: "Users",
    totalCustomers: 84_200,
    totalAumCr: 9_840,
    stable: 72_100,
    watch: 9_800,
    attention: 2_300,
    color: "#3B82F6",
  },
  {
    id: "fixed-income",
    label: "Fixed Income",
    description: "Debt and fixed income instrument portfolios",
    icon: "ShieldCheck",
    totalCustomers: 31_400,
    totalAumCr: 8_420,
    stable: 28_200,
    watch: 2_800,
    attention: 400,
    color: "#10B981",
  },
  {
    id: "retail-sip",
    label: "Retail SIP",
    description: "Systematic Investment Plan retail investors",
    icon: "Repeat",
    totalCustomers: 184_000,
    totalAumCr: 2_840,
    stable: 158_000,
    watch: 22_400,
    attention: 3_600,
    color: "#F59E0B",
  },
];

// ─── Helpers ─────────────────────────────────────────────────

function perf(base: number, months = 12): PerformancePoint[] {
  const names = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"];
  let p = base;
  let b = base * 0.98;
  return names.map((month) => {
    p = p * (1 + (Math.random() * 0.06 - 0.02));
    b = b * (1 + (Math.random() * 0.04 - 0.015));
    return { month, portfolio: Math.round(p * 10) / 10, benchmark: Math.round(b * 10) / 10 };
  });
}

// ─── HNI Equity Customers ────────────────────────────────────

export const hniEquityCustomers: Customer[] = [
  {
    id: "hni-001",
    name: "Rajesh Kumar Mehta",
    accountId: "HNI-EQ-082134",
    segmentId: "hni-equity",
    segmentLabel: "HNI Equity",
    rm: "Priya Sharma",
    city: "Mumbai",
    age: 52,
    occupation: "Manufacturing Business Owner",
    aumL: 420,
    aumFormatted: "₹4.2 Cr",
    state: "attention",
    stateReason: "Sector concentration breached policy limit (Infrastructure 41%)",
    riskScore: 7.2,
    riskProfile: "Aggressive",
    returns: { oneMonth: 1.4, threeMonth: -2.1, ytd: 8.4, oneYear: 12.4, threeYear: 38.2 },
    allocation: [
      { category: "Equity – Large Cap",  percentage: 48, amountL: 201.6, color: "#6366F1" },
      { category: "Equity – Mid Cap",    percentage: 24, amountL: 100.8, color: "#8B5CF6" },
      { category: "Debt",                percentage: 14, amountL: 58.8,  color: "#3B82F6" },
      { category: "Gold",                percentage:  8, amountL: 33.6,  color: "#F59E0B" },
      { category: "Cash",                percentage:  6, amountL: 25.2,  color: "#475569" },
    ],
    performance: perf(380),
    sectorConcentration: [
      { sector: "Infrastructure", percentage: 41, limit: 35, breached: true },
      { sector: "Banking & Finance", percentage: 28, limit: 35, breached: false },
      { sector: "Energy",            percentage: 18, limit: 25, breached: false },
      { sector: "IT & Tech",         percentage: 13, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-001", type: "risk", severity: "high", label: "Concentration breach", description: "Infrastructure sector exceeds 35% policy limit. Breach has persisted for 22 days.", date: "2026-09-01", confidence: 97 },
      { id: "bs-002", type: "anomaly", severity: "medium", label: "Reduced RM interaction", description: "No RM meeting logged in 45 days. Historical pattern: monthly meetings.", date: "2026-08-28", confidence: 81 },
    ],
    goals: [
      { name: "Retirement Corpus", targetAmountL: 1200, currentAmountL: 420, targetDate: "2034-01-01", onTrack: true },
      { name: "Child Education",   targetAmountL: 120,  currentAmountL: 68,  targetDate: "2028-06-01", onTrack: true },
    ],
    lastActivity: "2026-08-14",
    joinedDate: "2018-03-12",
    relatedDecisions: ["DEC-2026-001"],
  },
  {
    id: "hni-002",
    name: "Sunita Agarwal",
    accountId: "HNI-EQ-091022",
    segmentId: "hni-equity",
    segmentLabel: "HNI Equity",
    rm: "Arjun Nair",
    city: "Delhi",
    age: 47,
    occupation: "Real Estate Developer",
    aumL: 680,
    aumFormatted: "₹6.8 Cr",
    state: "attention",
    stateReason: "Cash holding increased 340% in 30 days — investment inactivity",
    riskScore: 6.1,
    riskProfile: "Moderate",
    returns: { oneMonth: -0.8, threeMonth: 1.4, ytd: 6.1, oneYear: 9.8, threeYear: 31.4 },
    allocation: [
      { category: "Equity – Large Cap", percentage: 32, amountL: 217.6, color: "#6366F1" },
      { category: "Equity – Mid Cap",   percentage: 14, amountL: 95.2,  color: "#8B5CF6" },
      { category: "Debt",               percentage: 22, amountL: 149.6, color: "#3B82F6" },
      { category: "Gold",               percentage: 12, amountL: 81.6,  color: "#F59E0B" },
      { category: "Cash",               percentage: 20, amountL: 136.0, color: "#475569" },
    ],
    performance: perf(610),
    sectorConcentration: [
      { sector: "Banking & Finance", percentage: 38, limit: 35, breached: true },
      { sector: "Consumer Goods",    percentage: 22, limit: 30, breached: false },
      { sector: "Pharma",            percentage: 18, limit: 25, breached: false },
      { sector: "Energy",            percentage: 22, limit: 25, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-003", type: "risk", severity: "high", label: "Liquidity surge", description: "Cash allocation increased from 6% to 20% over 30 days. Possible confidence gap.", date: "2026-09-01", confidence: 93 },
      { id: "bs-004", type: "opportunity", severity: "medium", label: "Deployment window", description: "₹1.36 Cr idle cash. Structured product or STP opportunity.", date: "2026-09-01", confidence: 87 },
    ],
    goals: [
      { name: "Wealth Preservation", targetAmountL: 800, currentAmountL: 680, targetDate: "2030-01-01", onTrack: true },
    ],
    lastActivity: "2026-07-29",
    joinedDate: "2019-11-08",
    relatedDecisions: ["DEC-2026-002"],
  },
  {
    id: "hni-003",
    name: "Vikram Singhania",
    accountId: "HNI-EQ-074891",
    segmentId: "hni-equity",
    segmentLabel: "HNI Equity",
    rm: "Deepa Krishnan",
    city: "Bangalore",
    age: 44,
    occupation: "Tech Startup Founder",
    aumL: 920,
    aumFormatted: "₹9.2 Cr",
    state: "watch",
    stateReason: "YTD returns below benchmark by 4.2%",
    riskScore: 8.1,
    riskProfile: "Aggressive",
    returns: { oneMonth: 2.1, threeMonth: 4.8, ytd: 11.2, oneYear: 18.6, threeYear: 62.4 },
    allocation: [
      { category: "Equity – Large Cap",  percentage: 40, amountL: 368.0, color: "#6366F1" },
      { category: "Equity – Mid Cap",    percentage: 30, amountL: 276.0, color: "#8B5CF6" },
      { category: "Equity – Small Cap",  percentage: 18, amountL: 165.6, color: "#EC4899" },
      { category: "International Equity",percentage:  8, amountL: 73.6,  color: "#06B6D4" },
      { category: "Cash",                percentage:  4, amountL: 36.8,  color: "#475569" },
    ],
    performance: perf(820),
    sectorConcentration: [
      { sector: "IT & Tech",       percentage: 32, limit: 35, breached: false },
      { sector: "Banking",         percentage: 24, limit: 35, breached: false },
      { sector: "Pharma",          percentage: 20, limit: 25, breached: false },
      { sector: "Consumer",        percentage: 14, limit: 30, breached: false },
      { sector: "Auto",            percentage: 10, limit: 20, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-005", type: "anomaly", severity: "low", label: "Benchmark lag", description: "Portfolio trailing Nifty 500 by 4.2% YTD. Mid-cap drag.", date: "2026-09-01", confidence: 89 },
    ],
    goals: [
      { name: "Second Business",   targetAmountL: 500,  currentAmountL: 320,  targetDate: "2027-01-01", onTrack: false },
      { name: "Retirement",        targetAmountL: 2000, currentAmountL: 920,  targetDate: "2040-01-01", onTrack: true },
    ],
    lastActivity: "2026-09-01",
    joinedDate: "2020-06-15",
    relatedDecisions: [],
  },
  {
    id: "hni-004",
    name: "Ananya Desai",
    accountId: "HNI-EQ-062318",
    segmentId: "hni-equity",
    segmentLabel: "HNI Equity",
    rm: "Priya Sharma",
    city: "Hyderabad",
    age: 39,
    occupation: "Hospital Chain Promoter",
    aumL: 580,
    aumFormatted: "₹5.8 Cr",
    state: "stable",
    riskScore: 5.8,
    riskProfile: "Moderate",
    returns: { oneMonth: 1.8, threeMonth: 5.2, ytd: 13.4, oneYear: 16.2, threeYear: 44.8 },
    allocation: [
      { category: "Equity – Large Cap", percentage: 52, amountL: 301.6, color: "#6366F1" },
      { category: "Equity – Mid Cap",   percentage: 20, amountL: 116.0, color: "#8B5CF6" },
      { category: "Debt",               percentage: 18, amountL: 104.4, color: "#3B82F6" },
      { category: "Gold",               percentage:  6, amountL: 34.8,  color: "#F59E0B" },
      { category: "Cash",               percentage:  4, amountL: 23.2,  color: "#475569" },
    ],
    performance: perf(520),
    sectorConcentration: [
      { sector: "Healthcare",       percentage: 28, limit: 30, breached: false },
      { sector: "Banking",          percentage: 26, limit: 35, breached: false },
      { sector: "Consumer Staples", percentage: 22, limit: 30, breached: false },
      { sector: "IT",               percentage: 24, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-006", type: "opportunity", severity: "medium", label: "SIP increase candidate", description: "Regular monthly SIP. Cash flow from business improving. Upsell opportunity.", date: "2026-08-30", confidence: 78 },
    ],
    goals: [
      { name: "Hospital Expansion", targetAmountL: 300, currentAmountL: 180, targetDate: "2028-01-01", onTrack: true },
      { name: "Children Education", targetAmountL: 200, currentAmountL: 80,  targetDate: "2032-01-01", onTrack: true },
    ],
    lastActivity: "2026-08-28",
    joinedDate: "2021-02-20",
    relatedDecisions: [],
  },
  {
    id: "hni-005",
    name: "Mohanlal Choudhary",
    accountId: "HNI-EQ-083042",
    segmentId: "hni-equity",
    segmentLabel: "HNI Equity",
    rm: "Kiran Bhat",
    city: "Jaipur",
    age: 61,
    occupation: "Textile Exporter",
    aumL: 240,
    aumFormatted: "₹2.4 Cr",
    state: "watch",
    stateReason: "Portfolio drawdown -7.8% in 45 days",
    riskScore: 4.2,
    riskProfile: "Conservative",
    returns: { oneMonth: -2.4, threeMonth: -6.1, ytd: 2.4, oneYear: 5.8, threeYear: 22.4 },
    allocation: [
      { category: "Equity – Large Cap", percentage: 38, amountL: 91.2,  color: "#6366F1" },
      { category: "Debt",               percentage: 38, amountL: 91.2,  color: "#3B82F6" },
      { category: "Gold",               percentage: 14, amountL: 33.6,  color: "#F59E0B" },
      { category: "Cash",               percentage: 10, amountL: 24.0,  color: "#475569" },
    ],
    performance: perf(220),
    sectorConcentration: [
      { sector: "Banking",    percentage: 40, limit: 35, breached: true },
      { sector: "FMCG",       percentage: 30, limit: 30, breached: false },
      { sector: "Utilities",  percentage: 20, limit: 25, breached: false },
      { sector: "IT",         percentage: 10, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-007", type: "risk", severity: "high", label: "Drawdown alert", description: "Portfolio declined 7.8% in 45 days. Approaching conservative investor pain threshold.", date: "2026-09-01", confidence: 94 },
      { id: "bs-008", type: "anomaly", severity: "medium", label: "Age-risk mismatch", description: "Risk score 4.2 (Conservative) but 38% large-cap equity. Suitable for rebalancing.", date: "2026-08-20", confidence: 82 },
    ],
    goals: [
      { name: "Retirement Income", targetAmountL: 400, currentAmountL: 240, targetDate: "2027-01-01", onTrack: false },
    ],
    lastActivity: "2026-08-10",
    joinedDate: "2015-07-04",
    relatedDecisions: ["DEC-2026-001"],
  },
];

// ─── Ultra HNI Customers ──────────────────────────────────────

export const ultraHniCustomers: Customer[] = [
  {
    id: "uhni-001",
    name: "Prabhati Kapoor",
    accountId: "UHNI-PM-001244",
    segmentId: "ultra-hni",
    segmentLabel: "Ultra HNI",
    rm: "Neha Malhotra",
    city: "Mumbai",
    age: 58,
    occupation: "Pharma Group Chairman",
    aumL: 8400,
    aumFormatted: "₹84 Cr",
    state: "attention",
    stateReason: "Portfolio duration extended. Rate sensitivity high.",
    riskScore: 5.2,
    riskProfile: "Moderate",
    returns: { oneMonth: 0.4, threeMonth: 1.8, ytd: 7.2, oneYear: 10.4, threeYear: 28.6 },
    allocation: [
      { category: "Equity",               percentage: 35, amountL: 2940, color: "#6366F1" },
      { category: "Debt & Bonds",         percentage: 30, amountL: 2520, color: "#3B82F6" },
      { category: "Alternate Investments",percentage: 18, amountL: 1512, color: "#8B5CF6" },
      { category: "Real Estate",          percentage: 10, amountL:  840, color: "#10B981" },
      { category: "Gold",                 percentage:  4, amountL:  336, color: "#F59E0B" },
      { category: "Cash",                 percentage:  3, amountL:  252, color: "#475569" },
    ],
    performance: perf(7800),
    sectorConcentration: [
      { sector: "Pharma & Healthcare", percentage: 42, limit: 35, breached: true },
      { sector: "Banking",             percentage: 24, limit: 35, breached: false },
      { sector: "IT",                  percentage: 18, limit: 30, breached: false },
      { sector: "Consumer",            percentage: 16, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-uhni-001", type: "risk", severity: "high", label: "Sector bias – Pharma", description: "42% pharma exposure. Promoter-family concentration risk. Needs rebalancing.", date: "2026-09-01", confidence: 96 },
      { id: "bs-uhni-002", type: "anomaly", severity: "medium", label: "Liquidity reducing", description: "Cash position dropped from 8% to 3% over 60 days.", date: "2026-08-20", confidence: 79 },
    ],
    goals: [
      { name: "Family Office Setup",   targetAmountL: 5000, currentAmountL: 3200, targetDate: "2028-01-01", onTrack: true },
      { name: "Philanthropy Endowment",targetAmountL: 1000, currentAmountL: 240,  targetDate: "2030-01-01", onTrack: false },
    ],
    lastActivity: "2026-08-22",
    joinedDate: "2012-04-14",
    relatedDecisions: ["DEC-2026-001", "DEC-2026-002"],
  },
  {
    id: "uhni-002",
    name: "Harsha Reddy",
    accountId: "UHNI-PM-002891",
    segmentId: "ultra-hni",
    segmentLabel: "Ultra HNI",
    rm: "Vijay Ranganathan",
    city: "Hyderabad",
    age: 46,
    occupation: "Tech Unicorn Founder",
    aumL: 18200,
    aumFormatted: "₹182 Cr",
    state: "watch",
    stateReason: "Increasing international equity exposure above mandate",
    riskScore: 7.8,
    riskProfile: "Aggressive",
    returns: { oneMonth: 3.2, threeMonth: 9.4, ytd: 22.4, oneYear: 34.8, threeYear: 118.4 },
    allocation: [
      { category: "Indian Equity",        percentage: 30, amountL: 5460, color: "#6366F1" },
      { category: "International Equity", percentage: 32, amountL: 5824, color: "#06B6D4" },
      { category: "Venture / PE",         percentage: 24, amountL: 4368, color: "#EC4899" },
      { category: "Debt",                 percentage:  8, amountL: 1456, color: "#3B82F6" },
      { category: "Cash",                 percentage:  6, amountL: 1092, color: "#475569" },
    ],
    performance: perf(16000),
    sectorConcentration: [
      { sector: "Technology",    percentage: 54, limit: 40, breached: true },
      { sector: "Fintech",       percentage: 20, limit: 30, breached: false },
      { sector: "Consumer Tech", percentage: 16, limit: 25, breached: false },
      { sector: "Healthcare AI", percentage: 10, limit: 20, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-uhni-003", type: "risk", severity: "medium", label: "Tech concentration", description: "54% technology exposure across all buckets. Single-sector risk elevated.", date: "2026-09-01", confidence: 88 },
      { id: "bs-uhni-004", type: "opportunity", severity: "low", label: "Debt rebalance window", description: "Rising rates environment. Floating rate bonds could add 40bps yield.", date: "2026-08-28", confidence: 74 },
    ],
    goals: [
      { name: "Generational Wealth", targetAmountL: 50000, currentAmountL: 18200, targetDate: "2040-01-01", onTrack: true },
    ],
    lastActivity: "2026-09-01",
    joinedDate: "2021-09-20",
    relatedDecisions: [],
  },
  {
    id: "uhni-003",
    name: "Leela Krishnamurthy",
    accountId: "UHNI-PM-003421",
    segmentId: "ultra-hni",
    segmentLabel: "Ultra HNI",
    rm: "Neha Malhotra",
    city: "Chennai",
    age: 64,
    occupation: "Retired IAS Officer (Family Office)",
    aumL: 4200,
    aumFormatted: "₹42 Cr",
    state: "stable",
    riskScore: 3.4,
    riskProfile: "Conservative",
    returns: { oneMonth: 0.8, threeMonth: 2.4, ytd: 5.8, oneYear: 8.2, threeYear: 22.8 },
    allocation: [
      { category: "Debt & Bonds",      percentage: 48, amountL: 2016, color: "#3B82F6" },
      { category: "Equity – Large Cap",percentage: 22, amountL:  924, color: "#6366F1" },
      { category: "Gold",              percentage: 14, amountL:  588, color: "#F59E0B" },
      { category: "Real Estate REITs", percentage: 10, amountL:  420, color: "#10B981" },
      { category: "Cash",              percentage:  6, amountL:  252, color: "#475569" },
    ],
    performance: perf(3900),
    sectorConcentration: [
      { sector: "Banking (Bonds)", percentage: 44, limit: 50, breached: false },
      { sector: "PSU Bonds",       percentage: 32, limit: 40, breached: false },
      { sector: "Large-Cap Equity",percentage: 24, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-uhni-005", type: "opportunity", severity: "low", label: "Estate planning gap", description: "No estate planning review logged in 2 years. AUM growth warrants review.", date: "2026-08-15", confidence: 71 },
    ],
    goals: [
      { name: "Family Trust Corpus",    targetAmountL: 5000, currentAmountL: 4200, targetDate: "2027-01-01", onTrack: true },
      { name: "Charitable Foundation",  targetAmountL: 500,  currentAmountL: 280,  targetDate: "2028-01-01", onTrack: true },
    ],
    lastActivity: "2026-08-30",
    joinedDate: "2008-11-02",
    relatedDecisions: [],
  },
];

// ─── Fixed Income Customers ───────────────────────────────────

export const fixedIncomeCustomers: Customer[] = [
  {
    id: "fi-001",
    name: "Ratan Gupta",
    accountId: "FI-BD-041892",
    segmentId: "fixed-income",
    segmentLabel: "Fixed Income",
    rm: "Sonal Mehta",
    city: "Kolkata",
    age: 67,
    occupation: "Retired CFO",
    aumL: 340,
    aumFormatted: "₹3.4 Cr",
    state: "attention",
    stateReason: "Duration 5.1 yrs (breached limit 5.0 yrs) vs rising rates",
    riskScore: 2.8,
    riskProfile: "Conservative",
    returns: { oneMonth: 0.6, threeMonth: 1.8, ytd: 5.2, oneYear: 7.4, threeYear: 21.2 },
    allocation: [
      { category: "G-Sec / SDL",       percentage: 36, amountL: 122.4, color: "#3B82F6" },
      { category: "Corporate Bonds AA",percentage: 30, amountL: 102.0, color: "#6366F1" },
      { category: "FDs / Short-term",  percentage: 20, amountL: 68.0,  color: "#10B981" },
      { category: "Liquid Funds",      percentage: 14, amountL: 47.6,  color: "#475569" },
    ],
    performance: perf(310),
    sectorConcentration: [
      { sector: "Government Securities", percentage: 36, limit: 50, breached: false },
      { sector: "Banking & NBFC Bonds",  percentage: 40, limit: 40, breached: false },
      { sector: "Infrastructure Bonds",  percentage: 24, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-fi-001", type: "risk", severity: "high", label: "Duration breach", description: "Modified duration 5.1 years. Rate sensitivity elevated. 100bps move → ₹17.3L MTM impact.", date: "2026-09-01", confidence: 99 },
    ],
    goals: [
      { name: "Monthly Income", targetAmountL: 0, currentAmountL: 340, targetDate: "Ongoing", onTrack: true },
    ],
    lastActivity: "2026-08-01",
    joinedDate: "2014-03-18",
    relatedDecisions: ["DEC-2026-003"],
  },
  {
    id: "fi-002",
    name: "Mangala Iyengar",
    accountId: "FI-BD-052341",
    segmentId: "fixed-income",
    segmentLabel: "Fixed Income",
    rm: "Sonal Mehta",
    city: "Pune",
    age: 59,
    occupation: "Retired Schoolteacher",
    aumL: 92,
    aumFormatted: "₹92 L",
    state: "stable",
    riskScore: 2.1,
    riskProfile: "Conservative",
    returns: { oneMonth: 0.5, threeMonth: 1.6, ytd: 4.8, oneYear: 6.9, threeYear: 19.8 },
    allocation: [
      { category: "FDs",             percentage: 50, amountL: 46.0, color: "#10B981" },
      { category: "Debt MFs",        percentage: 30, amountL: 27.6, color: "#3B82F6" },
      { category: "Liquid Funds",    percentage: 20, amountL: 18.4, color: "#475569" },
    ],
    performance: perf(84),
    sectorConcentration: [
      { sector: "Bank FDs",   percentage: 50, limit: 60, breached: false },
      { sector: "Debt Funds", percentage: 30, limit: 40, breached: false },
      { sector: "Liquid",     percentage: 20, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-fi-002", type: "opportunity", severity: "low", label: "FD renewal window", description: "₹46L FD matures next month. Current rates 7.2%. Lock-in opportunity.", date: "2026-09-01", confidence: 88 },
    ],
    goals: [
      { name: "Monthly Pension Supplement", targetAmountL: 0, currentAmountL: 92, targetDate: "Ongoing", onTrack: true },
    ],
    lastActivity: "2026-09-01",
    joinedDate: "2019-08-14",
    relatedDecisions: [],
  },
];

// ─── Retail SIP Customers ─────────────────────────────────────

export const retailSipCustomers: Customer[] = [
  {
    id: "sip-001",
    name: "Neha Kapoor",
    accountId: "SIP-RET-182341",
    segmentId: "retail-sip",
    segmentLabel: "Retail SIP",
    rm: "Self-Service",
    city: "Bengaluru",
    age: 31,
    occupation: "Software Engineer",
    aumL: 18,
    aumFormatted: "₹18 L",
    state: "watch",
    stateReason: "SIP amount unchanged for 24 months. Income likely increased.",
    riskScore: 6.8,
    riskProfile: "Moderate",
    returns: { oneMonth: 1.6, threeMonth: 4.8, ytd: 12.4, oneYear: 16.8, threeYear: 48.2 },
    allocation: [
      { category: "Large Cap MF",     percentage: 40, amountL: 7.2, color: "#6366F1" },
      { category: "Mid Cap MF",       percentage: 30, amountL: 5.4, color: "#8B5CF6" },
      { category: "ELSS",             percentage: 20, amountL: 3.6, color: "#EC4899" },
      { category: "Liquid Fund",      percentage: 10, amountL: 1.8, color: "#475569" },
    ],
    performance: perf(14),
    sectorConcentration: [
      { sector: "IT & Tech",  percentage: 34, limit: 35, breached: false },
      { sector: "Banking",    percentage: 28, limit: 35, breached: false },
      { sector: "Consumer",   percentage: 22, limit: 30, breached: false },
      { sector: "Healthcare", percentage: 16, limit: 25, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-sip-001", type: "opportunity", severity: "medium", label: "SIP step-up opportunity", description: "Consistent SIP runner. 34% income increase likely (salary trend). SIP step-up recommendation.", date: "2026-09-01", confidence: 82 },
    ],
    goals: [
      { name: "Home Purchase",  targetAmountL: 80, currentAmountL: 18, targetDate: "2030-01-01", onTrack: true },
      { name: "Retirement",     targetAmountL: 500, currentAmountL: 18, targetDate: "2055-01-01", onTrack: true },
    ],
    lastActivity: "2026-09-01",
    joinedDate: "2022-04-01",
    relatedDecisions: [],
  },
  {
    id: "sip-002",
    name: "Amit Joshi",
    accountId: "SIP-RET-194812",
    segmentId: "retail-sip",
    segmentLabel: "Retail SIP",
    rm: "Self-Service",
    city: "Ahmedabad",
    age: 34,
    occupation: "Accountant",
    aumL: 9.4,
    aumFormatted: "₹9.4 L",
    state: "attention",
    stateReason: "Missed 2 consecutive SIP instalments",
    riskScore: 4.4,
    riskProfile: "Moderate",
    returns: { oneMonth: 0.8, threeMonth: 2.4, ytd: 7.2, oneYear: 10.4, threeYear: 28.8 },
    allocation: [
      { category: "Balanced Advantage MF", percentage: 50, amountL: 4.7, color: "#6366F1" },
      { category: "Debt MF",               percentage: 30, amountL: 2.8, color: "#3B82F6" },
      { category: "Liquid Fund",            percentage: 20, amountL: 1.9, color: "#475569" },
    ],
    performance: perf(8.4),
    sectorConcentration: [
      { sector: "Multi-Asset", percentage: 50, limit: 60, breached: false },
      { sector: "Debt",        percentage: 30, limit: 40, breached: false },
      { sector: "Liquid",      percentage: 20, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-sip-002", type: "risk", severity: "high", label: "SIP discontinuation risk", description: "2 missed SIP instalments in last 60 days. Churn probability 68%.", date: "2026-09-01", confidence: 84 },
    ],
    goals: [
      { name: "Child Education", targetAmountL: 40, currentAmountL: 9.4, targetDate: "2038-01-01", onTrack: false },
    ],
    lastActivity: "2026-07-01",
    joinedDate: "2021-11-15",
    relatedDecisions: [],
  },
];

// ─── Mass Affluent Customers ──────────────────────────────────

export const massAffluentCustomers: Customer[] = [
  {
    id: "ma-001",
    name: "Swati Bhattacharya",
    accountId: "MA-EQ-089234",
    segmentId: "mass-affluent",
    segmentLabel: "Mass Affluent",
    rm: "Rakesh Gupta",
    city: "Kolkata",
    age: 42,
    occupation: "Senior Manager – FMCG",
    aumL: 64,
    aumFormatted: "₹64 L",
    state: "stable",
    riskScore: 5.4,
    riskProfile: "Moderate",
    returns: { oneMonth: 1.4, threeMonth: 4.2, ytd: 11.8, oneYear: 14.6, threeYear: 42.4 },
    allocation: [
      { category: "Large Cap MF",  percentage: 42, amountL: 26.9, color: "#6366F1" },
      { category: "Mid Cap MF",    percentage: 22, amountL: 14.1, color: "#8B5CF6" },
      { category: "Debt MF",       percentage: 22, amountL: 14.1, color: "#3B82F6" },
      { category: "Gold ETF",      percentage: 8,  amountL: 5.1,  color: "#F59E0B" },
      { category: "Cash / Liquid", percentage: 6,  amountL: 3.8,  color: "#475569" },
    ],
    performance: perf(58),
    sectorConcentration: [
      { sector: "FMCG / Consumer", percentage: 36, limit: 35, breached: true },
      { sector: "Banking",         percentage: 28, limit: 35, breached: false },
      { sector: "IT",              percentage: 22, limit: 30, breached: false },
      { sector: "Pharma",          percentage: 14, limit: 25, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-ma-001", type: "risk", severity: "low", label: "Employer sector bias", description: "FMCG overweight likely driven by familiarity bias (employer sector).", date: "2026-08-28", confidence: 76 },
      { id: "bs-ma-002", type: "opportunity", severity: "medium", label: "Step-up SIP candidate", description: "Salary appraisal expected. SIP step-up of ₹5K/month = ₹12L extra over 5 years.", date: "2026-09-01", confidence: 80 },
    ],
    goals: [
      { name: "Home Upgrade",   targetAmountL: 80,  currentAmountL: 64, targetDate: "2028-01-01", onTrack: true },
      { name: "Child PG Abroad",targetAmountL: 50,  currentAmountL: 20, targetDate: "2032-01-01", onTrack: true },
    ],
    lastActivity: "2026-08-29",
    joinedDate: "2020-09-10",
    relatedDecisions: [],
  },
];

// ─── Additional segment customers ────────────────────────────

const directEquityCustomers: Customer[] = [
  {
    id: "de-001", name: "Ankit Rajput", accountId: "ZRD-DE-00192", segmentId: "direct-equity", segmentLabel: "Direct Equity Traders",
    rm: "Auto-Assign", city: "Mumbai", age: 32, occupation: "Software Engineer",
    aumL: 18.4, aumFormatted: "₹18.4L", state: "attention",
    stateReason: "Portfolio down 18% YTD. F&O losses offsetting equity gains. Margin utilisation at 82%.",
    riskScore: 8, riskProfile: "Aggressive",
    returns: { oneMonth: -4.2, threeMonth: -9.1, ytd: -18.0, oneYear: -12.4, threeYear: 14.2 },
    allocation: [
      { category: "Direct Equity",  percentage: 72, amountL: 13.2, color: "#6366F1" },
      { category: "F&O Margin",     percentage: 18, amountL: 3.3,  color: "#EF4444" },
      { category: "Cash / Liquid",  percentage: 10, amountL: 1.9,  color: "#475569" },
    ],
    performance: perf(-18),
    sectorConcentration: [
      { sector: "Technology",  percentage: 48, limit: 35, breached: true },
      { sector: "Banking",     percentage: 28, limit: 35, breached: false },
      { sector: "Auto",        percentage: 24, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-de-001", type: "risk", severity: "high", label: "Overtrading pattern", description: "48 trades in last 30 days — 3x normal frequency. Correlated with drawdown periods.", date: "2026-09-01", confidence: 91 },
      { id: "bs-de-002", type: "risk", severity: "high", label: "High margin utilisation", description: "Margin at 82% of limit. One adverse move could trigger margin call.", date: "2026-08-28", confidence: 88 },
    ],
    goals: [{ name: "Wealth Creation", targetAmountL: 50, currentAmountL: 18.4, targetDate: "2030-01-01", onTrack: false }],
    lastActivity: "2026-09-01", joinedDate: "2022-04-01", relatedDecisions: ["DEC-2026-001"],
  },
  {
    id: "de-002", name: "Pooja Shetty", accountId: "ZRD-DE-00841", segmentId: "direct-equity", segmentLabel: "Direct Equity Traders",
    rm: "Auto-Assign", city: "Bangalore", age: 28, occupation: "Product Manager",
    aumL: 8.2, aumFormatted: "₹8.2L", state: "watch",
    stateReason: "Concentrated in 3 IT stocks (68%). Sector under pressure.",
    riskScore: 7, riskProfile: "Aggressive",
    returns: { oneMonth: -2.1, threeMonth: 1.4, ytd: -5.2, oneYear: 8.4, threeYear: 22.1 },
    allocation: [
      { category: "Direct Equity", percentage: 84, amountL: 6.9, color: "#6366F1" },
      { category: "Liquid",        percentage: 16, amountL: 1.3, color: "#475569" },
    ],
    performance: perf(-5),
    sectorConcentration: [
      { sector: "IT",     percentage: 68, limit: 35, breached: true },
      { sector: "Banking",percentage: 22, limit: 35, breached: false },
      { sector: "FMCG",  percentage: 10, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-de-003", type: "risk", severity: "medium", label: "Sector concentration — IT", description: "68% in IT stocks. Sector down 12% in 90 days.", date: "2026-08-30", confidence: 85 },
    ],
    goals: [], lastActivity: "2026-08-31", joinedDate: "2023-01-15", relatedDecisions: [],
  },
  {
    id: "de-003", name: "Rohit Sharma", accountId: "ZRD-DE-01234", segmentId: "direct-equity", segmentLabel: "Direct Equity Traders",
    rm: "Auto-Assign", city: "Delhi", age: 38, occupation: "Business Owner",
    aumL: 42.8, aumFormatted: "₹42.8L", state: "stable",
    riskScore: 6, riskProfile: "Moderate",
    returns: { oneMonth: 1.8, threeMonth: 4.2, ytd: 11.4, oneYear: 18.2, threeYear: 42.1 },
    allocation: [
      { category: "Large Cap",  percentage: 52, amountL: 22.3, color: "#6366F1" },
      { category: "Mid Cap",    percentage: 28, amountL: 12.0, color: "#8B5CF6" },
      { category: "Cash",       percentage: 20, amountL: 8.5,  color: "#475569" },
    ],
    performance: perf(11),
    sectorConcentration: [
      { sector: "Banking",    percentage: 28, limit: 35, breached: false },
      { sector: "IT",         percentage: 22, limit: 35, breached: false },
      { sector: "Consumer",   percentage: 18, limit: 30, breached: false },
    ],
    behavioralSignals: [], goals: [], lastActivity: "2026-09-01", joinedDate: "2019-06-10", relatedDecisions: [],
  },
];

const fnoTradersCustomers: Customer[] = [
  {
    id: "fno-001", name: "Deepak Malhotra", accountId: "ZRD-FNO-00312", segmentId: "fno-traders", segmentLabel: "F&O Traders",
    rm: "Auto-Assign", city: "Mumbai", age: 35, occupation: "Trader",
    aumL: 32.0, aumFormatted: "₹32.0L", state: "attention",
    stateReason: "Cumulative F&O losses ₹8.4L in Q3. Loss exceeds 26% of capital. SEBI risk flag triggered.",
    riskScore: 9, riskProfile: "Aggressive",
    returns: { oneMonth: -8.2, threeMonth: -18.4, ytd: -26.0, oneYear: -22.1, threeYear: 8.4 },
    allocation: [
      { category: "F&O Margin",    percentage: 60, amountL: 19.2, color: "#EF4444" },
      { category: "Direct Equity", percentage: 28, amountL: 9.0,  color: "#6366F1" },
      { category: "Cash",          percentage: 12, amountL: 3.8,  color: "#475569" },
    ],
    performance: perf(-26),
    sectorConcentration: [
      { sector: "Options (Index)", percentage: 60, limit: 40, breached: true },
      { sector: "Options (Stock)", percentage: 28, limit: 30, breached: false },
      { sector: "Futures",         percentage: 12, limit: 25, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-fno-001", type: "risk", severity: "high", label: "Sustained F&O losses", description: "Third consecutive quarter of losses exceeding 20% of deployed capital.", date: "2026-09-01", confidence: 96 },
      { id: "bs-fno-002", type: "risk", severity: "high", label: "SEBI risk threshold", description: "Cumulative losses exceed SEBI-mandated disclosure threshold. Regulatory action may be required.", date: "2026-08-30", confidence: 92 },
    ],
    goals: [], lastActivity: "2026-09-01", joinedDate: "2020-11-01", relatedDecisions: ["DEC-2026-001"],
  },
  {
    id: "fno-002", name: "Meena Krishnan", accountId: "ZRD-FNO-00891", segmentId: "fno-traders", segmentLabel: "F&O Traders",
    rm: "Auto-Assign", city: "Chennai", age: 44, occupation: "Doctor",
    aumL: 55.0, aumFormatted: "₹55.0L", state: "watch",
    stateReason: "Increased option buying frequency. Premium burn rate rising.",
    riskScore: 7, riskProfile: "Aggressive",
    returns: { oneMonth: -1.4, threeMonth: 2.8, ytd: 4.2, oneYear: 9.1, threeYear: 18.4 },
    allocation: [
      { category: "Direct Equity", percentage: 55, amountL: 30.3, color: "#6366F1" },
      { category: "F&O Margin",    percentage: 30, amountL: 16.5, color: "#EF4444" },
      { category: "Liquid",        percentage: 15, amountL: 8.2,  color: "#475569" },
    ],
    performance: perf(4),
    sectorConcentration: [
      { sector: "Banking F&O", percentage: 38, limit: 35, breached: true },
      { sector: "IT F&O",      percentage: 22, limit: 35, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-fno-003", type: "risk", severity: "medium", label: "Premium erosion rising", description: "Option premium spend up 40% MoM. Win rate declining to 32%.", date: "2026-08-25", confidence: 82 },
    ],
    goals: [], lastActivity: "2026-08-31", joinedDate: "2021-03-15", relatedDecisions: [],
  },
];

const mfLumpsumCustomers: Customer[] = [
  {
    id: "mfl-001", name: "Geeta Iyer", accountId: "ZRD-MFL-00421", segmentId: "mf-lumpsum", segmentLabel: "MF Lumpsum Investors",
    rm: "Auto-Assign", city: "Pune", age: 52, occupation: "Government Employee",
    aumL: 28.4, aumFormatted: "₹28.4L", state: "stable",
    riskScore: 4, riskProfile: "Conservative",
    returns: { oneMonth: 0.8, threeMonth: 2.4, ytd: 6.2, oneYear: 10.4, threeYear: 28.1 },
    allocation: [
      { category: "Balanced Fund",  percentage: 45, amountL: 12.8, color: "#6366F1" },
      { category: "Debt MF",        percentage: 35, amountL: 9.9,  color: "#3B82F6" },
      { category: "Liquid",         percentage: 20, amountL: 5.7,  color: "#475569" },
    ],
    performance: perf(6),
    sectorConcentration: [
      { sector: "Banking",  percentage: 24, limit: 35, breached: false },
      { sector: "IT",       percentage: 18, limit: 35, breached: false },
    ],
    behavioralSignals: [], goals: [
      { name: "Retirement Corpus", targetAmountL: 200, currentAmountL: 28.4, targetDate: "2034-01-01", onTrack: true },
    ],
    lastActivity: "2026-07-15", joinedDate: "2018-04-01", relatedDecisions: [],
  },
];

const nriPortfolioCustomers: Customer[] = [
  {
    id: "nri-001", name: "Vikram Nair", accountId: "ZRD-NRI-00182", segmentId: "nri-portfolios", segmentLabel: "NRI Portfolios",
    rm: "NRI Desk", city: "Dubai (NRE)", age: 41, occupation: "Finance Director",
    aumL: 184.0, aumFormatted: "₹184.0L", state: "watch",
    stateReason: "FEMA compliance review pending. NRE to NRO transfer flagged for RBI approval.",
    riskScore: 6, riskProfile: "Moderate",
    returns: { oneMonth: 1.2, threeMonth: 3.8, ytd: 9.4, oneYear: 14.2, threeYear: 38.1 },
    allocation: [
      { category: "NRE MF (Equity)", percentage: 50, amountL: 92.0,  color: "#6366F1" },
      { category: "NRE Fixed Dep.",  percentage: 30, amountL: 55.2,  color: "#3B82F6" },
      { category: "Sovereign Gold",  percentage: 12, amountL: 22.1,  color: "#F59E0B" },
      { category: "Liquid",          percentage:  8, amountL: 14.7,  color: "#475569" },
    ],
    performance: perf(9),
    sectorConcentration: [
      { sector: "Large Cap Equity", percentage: 50, limit: 60, breached: false },
      { sector: "Fixed Income",     percentage: 30, limit: 40, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-nri-001", type: "risk", severity: "medium", label: "FEMA compliance gap", description: "NRE to NRO transfer of ₹12L requires RBI prior approval. Currently unresolved.", date: "2026-08-20", confidence: 88 },
    ],
    goals: [{ name: "India Return Fund", targetAmountL: 500, currentAmountL: 184, targetDate: "2032-01-01", onTrack: true }],
    lastActivity: "2026-08-18", joinedDate: "2017-09-01", relatedDecisions: [],
  },
];

const globalEquityCustomers: Customer[] = [
  {
    id: "ge-001", name: "Arjun Mehta", accountId: "MS-GE-00421", segmentId: "global-equity", segmentLabel: "Global Equity Mandates",
    rm: "Kavita Reddy", city: "Mumbai", age: 48, occupation: "Managing Director",
    aumL: 2400.0, aumFormatted: "₹24Cr", state: "watch",
    stateReason: "Global equity overweight 9pp above benchmark. USD/INR risk increasing.",
    riskScore: 7, riskProfile: "Aggressive",
    returns: { oneMonth: -1.8, threeMonth: 2.4, ytd: 7.2, oneYear: 12.4, threeYear: 32.1 },
    allocation: [
      { category: "US Equities",      percentage: 40, amountL: 960,  color: "#6366F1" },
      { category: "Europe / UK",      percentage: 22, amountL: 528,  color: "#8B5CF6" },
      { category: "India Equity",     percentage: 20, amountL: 480,  color: "#10B981" },
      { category: "EM / Asia",        percentage: 10, amountL: 240,  color: "#F59E0B" },
      { category: "Cash / Hedge",     percentage:  8, amountL: 192,  color: "#475569" },
    ],
    performance: perf(7),
    sectorConcentration: [
      { sector: "Technology (Global)", percentage: 42, limit: 35, breached: true },
      { sector: "Healthcare",          percentage: 22, limit: 30, breached: false },
      { sector: "Financials",          percentage: 18, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-ge-001", type: "risk", severity: "medium", label: "USD overweight risk", description: "62% of portfolio denominated in USD. INR appreciation of 2%+ would reduce INR value by ₹1.48Cr.", date: "2026-09-01", confidence: 84 },
    ],
    goals: [{ name: "Global Wealth Target", targetAmountL: 5000, currentAmountL: 2400, targetDate: "2035-01-01", onTrack: true }],
    lastActivity: "2026-09-01", joinedDate: "2016-04-01", relatedDecisions: ["DEC-2026-002"],
  },
  {
    id: "ge-002", name: "Sandhya Pillai", accountId: "MS-GE-00892", segmentId: "global-equity", segmentLabel: "Global Equity Mandates",
    rm: "Kavita Reddy", city: "Bangalore", age: 54, occupation: "Tech CEO",
    aumL: 4800.0, aumFormatted: "₹48Cr", state: "stable",
    riskScore: 6, riskProfile: "Moderate",
    returns: { oneMonth: 1.2, threeMonth: 4.8, ytd: 11.4, oneYear: 18.2, threeYear: 44.1 },
    allocation: [
      { category: "US Equities",  percentage: 35, amountL: 1680, color: "#6366F1" },
      { category: "India Equity", percentage: 30, amountL: 1440, color: "#10B981" },
      { category: "Bonds / IG",   percentage: 20, amountL: 960,  color: "#3B82F6" },
      { category: "Gold",         percentage: 10, amountL: 480,  color: "#F59E0B" },
      { category: "Cash",         percentage:  5, amountL: 240,  color: "#475569" },
    ],
    performance: perf(11),
    sectorConcentration: [
      { sector: "Technology", percentage: 30, limit: 35, breached: false },
      { sector: "Healthcare", percentage: 22, limit: 30, breached: false },
    ],
    behavioralSignals: [], goals: [], lastActivity: "2026-08-28", joinedDate: "2014-11-01", relatedDecisions: [],
  },
];

const structuredProductCustomers: Customer[] = [
  {
    id: "sp-001", name: "Pradeep Bose", accountId: "MS-SP-00221", segmentId: "structured", segmentLabel: "Structured Products",
    rm: "Arjun Mehta (PM)", city: "Kolkata", age: 61, occupation: "Industrialist",
    aumL: 3600.0, aumFormatted: "₹36Cr", state: "stable",
    riskScore: 4, riskProfile: "Conservative",
    returns: { oneMonth: 0.6, threeMonth: 2.1, ytd: 7.4, oneYear: 9.8, threeYear: 24.2 },
    allocation: [
      { category: "Capital Protection MLD", percentage: 45, amountL: 1620, color: "#6366F1" },
      { category: "Market-Linked Bond",     percentage: 30, amountL: 1080, color: "#8B5CF6" },
      { category: "G-Sec / Liquid",         percentage: 15, amountL: 540,  color: "#3B82F6" },
      { category: "Gold",                   percentage: 10, amountL: 360,  color: "#F59E0B" },
    ],
    performance: perf(7),
    sectorConcentration: [
      { sector: "Fixed Income", percentage: 60, limit: 70, breached: false },
      { sector: "Equity Linked",percentage: 40, limit: 50, breached: false },
    ],
    behavioralSignals: [], goals: [
      { name: "Estate Preservation", targetAmountL: 5000, currentAmountL: 3600, targetDate: "Ongoing", onTrack: true },
    ],
    lastActivity: "2026-08-15", joinedDate: "2012-06-01", relatedDecisions: [],
  },
];

const alternativesCustomers: Customer[] = [
  {
    id: "alt-001", name: "Roshani Kapoor", accountId: "JPM-ALT-00142", segmentId: "alternatives", segmentLabel: "Alternatives & PMS",
    rm: "Aditya Sharma", city: "Mumbai", age: 56, occupation: "Entrepreneur",
    aumL: 8400.0, aumFormatted: "₹84Cr", state: "watch",
    stateReason: "AIF Category II returns below watermark for 2 consecutive quarters.",
    riskScore: 7, riskProfile: "Aggressive",
    returns: { oneMonth: -0.4, threeMonth: 1.8, ytd: 4.2, oneYear: 8.4, threeYear: 22.1 },
    allocation: [
      { category: "AIF Cat II — RE",    percentage: 30, amountL: 2520, color: "#6366F1" },
      { category: "PMS — Multi Cap",    percentage: 28, amountL: 2352, color: "#8B5CF6" },
      { category: "PMS — Pharma",       percentage: 22, amountL: 1848, color: "#10B981" },
      { category: "PE Fund",            percentage: 12, amountL: 1008, color: "#F59E0B" },
      { category: "Liquid / Cash",      percentage:  8, amountL: 672,  color: "#475569" },
    ],
    performance: perf(4),
    sectorConcentration: [
      { sector: "Real Estate (AIF)", percentage: 30, limit: 35, breached: false },
      { sector: "Pharma (PMS)",      percentage: 22, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-alt-001", type: "risk", severity: "medium", label: "AIF below watermark", description: "Category II RE fund at ₹2,520Cr below high watermark for 6 months. No performance fee impact yet.", date: "2026-08-30", confidence: 90 },
    ],
    goals: [], lastActivity: "2026-08-22", joinedDate: "2015-08-01", relatedDecisions: ["DEC-2026-002"],
  },
];

const globalFundsCustomers: Customer[] = [
  {
    id: "gf-001", name: "Nikhil Patel", accountId: "JPM-GF-00341", segmentId: "global-funds", segmentLabel: "Global / Offshore",
    rm: "Priya Menon", city: "Singapore (GIFT)", age: 44, occupation: "Fund Manager",
    aumL: 1800.0, aumFormatted: "₹18Cr", state: "stable",
    riskScore: 6, riskProfile: "Moderate",
    returns: { oneMonth: 1.4, threeMonth: 4.2, ytd: 10.8, oneYear: 16.4, threeYear: 38.2 },
    allocation: [
      { category: "GIFT City AIF",     percentage: 40, amountL: 720, color: "#6366F1" },
      { category: "International MF",  percentage: 35, amountL: 630, color: "#8B5CF6" },
      { category: "FCNR Deposits",     percentage: 15, amountL: 270, color: "#3B82F6" },
      { category: "Cash (USD)",        percentage: 10, amountL: 180, color: "#475569" },
    ],
    performance: perf(11),
    sectorConcentration: [
      { sector: "Global Equity MF", percentage: 40, limit: 50, breached: false },
      { sector: "Fixed Income",     percentage: 25, limit: 40, breached: false },
    ],
    behavioralSignals: [], goals: [], lastActivity: "2026-08-29", joinedDate: "2018-03-01", relatedDecisions: [],
  },
];

const uhniEquityCustomers: Customer[] = [
  {
    id: "uhni-eq-001", name: "Sudhir Mehrotra", accountId: "JPM-UH-00081", segmentId: "uhni-equity", segmentLabel: "Ultra HNI Equity",
    rm: "Aditya Sharma", city: "Mumbai", age: 62, occupation: "Chairman – Listed Co.",
    aumL: 42000.0, aumFormatted: "₹420Cr", state: "attention",
    stateReason: "Promoter pledge ratio >30% on two holdings. Regulatory disclosure required within 48 hours.",
    riskScore: 8, riskProfile: "Aggressive",
    returns: { oneMonth: -2.1, threeMonth: 1.4, ytd: 8.2, oneYear: 14.8, threeYear: 42.0 },
    allocation: [
      { category: "Promoter Holdings", percentage: 48, amountL: 20160, color: "#6366F1" },
      { category: "PMS — Multi Cap",   percentage: 24, amountL: 10080, color: "#8B5CF6" },
      { category: "Fixed Income",      percentage: 18, amountL: 7560,  color: "#3B82F6" },
      { category: "Alternatives",      percentage: 10, amountL: 4200,  color: "#F59E0B" },
    ],
    performance: perf(8),
    sectorConcentration: [
      { sector: "Promoter Stake (Auto)", percentage: 48, limit: 40, breached: true },
      { sector: "Multi Cap PMS",         percentage: 24, limit: 30, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-uhe-001", type: "risk", severity: "high", label: "Promoter pledge breach", description: "Pledge >30% on two NSML-listed holdings. SEBI circular requires disclosure within 2 working days.", date: "2026-09-01", confidence: 97 },
    ],
    goals: [], lastActivity: "2026-09-01", joinedDate: "2010-04-01", relatedDecisions: ["DEC-2026-001"],
  },
];

const retailEquityCustomers: Customer[] = [
  {
    id: "re-001", name: "Suresh Kumar", accountId: "HDFC-RE-02841", segmentId: "retail-equity", segmentLabel: "Retail Equity Traders",
    rm: "Auto-Assign", city: "Jaipur", age: 29, occupation: "Sales Manager",
    aumL: 4.8, aumFormatted: "₹4.8L", state: "stable",
    riskScore: 6, riskProfile: "Moderate",
    returns: { oneMonth: 1.2, threeMonth: 3.4, ytd: 8.4, oneYear: 14.2, threeYear: 28.4 },
    allocation: [
      { category: "Direct Equity", percentage: 78, amountL: 3.7, color: "#6366F1" },
      { category: "Liquid",        percentage: 22, amountL: 1.1, color: "#475569" },
    ],
    performance: perf(8),
    sectorConcentration: [
      { sector: "Banking",   percentage: 30, limit: 35, breached: false },
      { sector: "IT",        percentage: 28, limit: 35, breached: false },
      { sector: "Auto",      percentage: 20, limit: 30, breached: false },
    ],
    behavioralSignals: [], goals: [], lastActivity: "2026-09-01", joinedDate: "2023-08-01", relatedDecisions: [],
  },
  {
    id: "re-002", name: "Kavitha Nair", accountId: "HDFC-RE-04122", segmentId: "retail-equity", segmentLabel: "Retail Equity Traders",
    rm: "Auto-Assign", city: "Kochi", age: 34, occupation: "Teacher",
    aumL: 2.2, aumFormatted: "₹2.2L", state: "watch",
    stateReason: "Account dormant 45 days. No trades since market correction.",
    riskScore: 5, riskProfile: "Moderate",
    returns: { oneMonth: 0.0, threeMonth: -1.8, ytd: 2.4, oneYear: 6.8, threeYear: 18.2 },
    allocation: [
      { category: "Direct Equity", percentage: 88, amountL: 1.9, color: "#6366F1" },
      { category: "Cash",          percentage: 12, amountL: 0.3, color: "#475569" },
    ],
    performance: perf(2),
    sectorConcentration: [
      { sector: "FMCG",    percentage: 40, limit: 35, breached: true },
      { sector: "Pharma",  percentage: 30, limit: 35, breached: false },
    ],
    behavioralSignals: [
      { id: "bs-re-001", type: "risk", severity: "medium", label: "Post-correction dormancy", description: "No activity since Aug correction. Risk of permanent disengagement.", date: "2026-08-28", confidence: 78 },
    ],
    goals: [], lastActivity: "2026-07-18", joinedDate: "2022-01-10", relatedDecisions: [],
  },
];

// ─── Additional segments (for firm-specific views) ────────────

export const additionalSegments: Segment[] = [
  { id: "direct-equity",   label: "Direct Equity Traders",  description: "Active BTST, delivery, intraday traders",    icon: "BarChart3",  totalCustomers: 4_200_000, totalAumCr: 18_000, stable: 3_024_000, watch: 882_000, attention: 294_000, color: "#6366F1" },
  { id: "fno-traders",     label: "F&O Traders",            description: "Futures & options active accounts",          icon: "Zap",        totalCustomers: 840_000,   totalAumCr: 6_400,  stable: 630_000,   watch: 168_000, attention: 42_000,  color: "#EF4444" },
  { id: "mf-lumpsum",      label: "MF Lumpsum Investors",   description: "One-time mutual fund investments",          icon: "PiggyBank",  totalCustomers: 2_100_000, totalAumCr: 8_200,  stable: 1_848_000, watch: 189_000, attention: 63_000,  color: "#F59E0B" },
  { id: "nri-portfolios",  label: "NRI / FPI Accounts",     description: "NRE-linked investment portfolios",          icon: "Globe",      totalCustomers: 640_000,   totalAumCr: 2_800,  stable: 569_600,   watch: 51_200,  attention: 19_200,  color: "#3B82F6" },
  { id: "sip-investors",   label: "SIP Investors",          description: "Monthly SIP via MF / broker platform",     icon: "Repeat",     totalCustomers: 5_800_000, totalAumCr: 12_000, stable: 4_698_000, watch: 812_000, attention: 290_000, color: "#10B981" },
  { id: "global-equity",   label: "Global Equity Mandates", description: "International equity, ETFs, global funds",  icon: "Globe",      totalCustomers: 12_000,    totalAumCr: 48_000, stable: 11_040,    watch: 720,     attention: 240,     color: "#6366F1" },
  { id: "structured",      label: "Structured Products",    description: "Capital protection, market-linked bonds",  icon: "Shield",     totalCustomers: 8_200,     totalAumCr: 28_000, stable: 7_708,     watch: 410,     attention: 82,      color: "#F59E0B" },
  { id: "alternatives",    label: "Alternatives & PMS",     description: "AIF, PMS, real estate, PE funds",          icon: "Building2",  totalCustomers: 4_200,     totalAumCr: 22_000, stable: 4_020,     watch: 140,     attention: 40,      color: "#8B5CF6" },
  { id: "global-funds",    label: "Global / Offshore",      description: "GIFT City, international MF, FCNR",        icon: "Globe",      totalCustomers: 8_400,     totalAumCr: 8_000,  stable: 7_600,     watch: 620,     attention: 180,     color: "#10B981" },
  { id: "uhni-equity",     label: "Ultra HNI Equity",       description: "₹50Cr+ portfolios, custom mandates",       icon: "Crown",      totalCustomers: 2_800,     totalAumCr: 84_000, stable: 2_580,     watch: 180,     attention: 40,      color: "#EC4899" },
  { id: "retail-equity",   label: "Retail Equity Traders",  description: "Delivery + intraday retail traders",       icon: "BarChart3",  totalCustomers: 920_000,   totalAumCr: 18_000, stable: 736_000,   watch: 138_000, attention: 46_000,  color: "#8B5CF6" },
];

// ─── All Customers Map ────────────────────────────────────────

export const customersBySegment: Record<string, Customer[]> = {
  "hni-equity":     hniEquityCustomers,
  "ultra-hni":      ultraHniCustomers,
  "mass-affluent":  massAffluentCustomers,
  "fixed-income":   fixedIncomeCustomers,
  "retail-sip":     retailSipCustomers,
  // firm-specific segments
  "direct-equity":  directEquityCustomers,
  "fno-traders":    fnoTradersCustomers,
  "mf-lumpsum":     mfLumpsumCustomers,
  "nri-portfolios": nriPortfolioCustomers,
  "sip-investors":  retailSipCustomers,       // reuse
  "global-equity":  globalEquityCustomers,
  "structured":     structuredProductCustomers,
  "alternatives":   alternativesCustomers,
  "global-funds":   globalFundsCustomers,
  "uhni-equity":    uhniEquityCustomers,
  "retail-equity":  retailEquityCustomers,
};

// ─── Helpers ─────────────────────────────────────────────────

const allSegments = [...segments, ...additionalSegments];

export function getSegment(id: string): Segment | undefined {
  return allSegments.find((s) => s.id === id);
}

export function getCustomers(segmentId: string): Customer[] {
  return customersBySegment[segmentId] ?? [];
}

export function getCustomer(segmentId: string, customerId: string): Customer | undefined {
  return customersBySegment[segmentId]?.find((c) => c.id === customerId);
}
