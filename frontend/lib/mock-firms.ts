// ─── Firm definitions ─────────────────────────────────────────

export interface FirmSegment {
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

export interface FirmOverview {
  totalRelationships: number;
  totalAumCr: number;
  todayChanges: number;
  pendingDecisions: number;
  emergingRisks: number;
  featuredSignal: {
    title: string;
    description: string;
    affected: number;
    confidence: number;
  };
  portfolioHealth: { stable: number; watch: number; attention: number };
  segments: FirmSegment[];
}

export interface Firm {
  id: string;
  name: string;
  shortName: string;
  tagline: string;
  color: string;            // brand accent
  gradient: string;         // CSS gradient
  logo: string;             // emoji fallback
  country: string;
  type: "global-bank" | "broker" | "wealth" | "nbfc";
  demoUsers: { name: string; role: string; email: string; password: string; avatar: string }[];
  overview: FirmOverview;
}

// ─── JP Morgan ────────────────────────────────────────────────

const jpmorgan: Firm = {
  id:        "jpmorgan",
  name:      "JP Morgan Wealth Management",
  shortName: "JP Morgan",
  tagline:   "Private Bank & Wealth Management",
  color:     "#1a5fa8",
  gradient:  "linear-gradient(135deg, #0f3460 0%, #1a5fa8 100%)",
  logo:      "🏦",
  country:   "India",
  type:      "global-bank",
  demoUsers: [
    { name: "Aditya Sharma", role: "Head of Private Banking", email: "aditya@jpmorgan.com",   password: "demo", avatar: "AS" },
    { name: "Priya Menon",   role: "Senior Relationship Manager", email: "priya@jpmorgan.com", password: "demo", avatar: "PM" },
  ],
  overview: {
    totalRelationships: 82_000,
    totalAumCr:         2_24_000,
    todayChanges:       342,
    pendingDecisions:   28,
    emergingRisks:      9,
    featuredSignal: {
      title:       "UHNI fixed income reallocation underway",
      description: "4,821 UHNI clients are shifting from long-duration bonds to structured products. Duration risk is declining, but credit risk is rising. Requires policy review.",
      affected:    4821,
      confidence:  88,
    },
    portfolioHealth: { stable: 86, watch: 11, attention: 3 },
    segments: [
      { id: "uhni-equity",       label: "Ultra HNI Equity",      description: "₹50Cr+ portfolios, custom mandates",         icon: "Crown",      totalCustomers:  2_800, totalAumCr: 84_000, stable:  2_580, watch:   180, attention:  40, color: "#6366F1" },
      { id: "hni-equity",        label: "HNI Equity Portfolios",  description: "₹5–50Cr equity-focused",                    icon: "TrendingUp", totalCustomers: 18_400, totalAumCr: 62_000, stable: 15_200, watch: 2_600, attention: 600, color: "#8B5CF6" },
      { id: "fixed-income",      label: "Fixed Income / Bonds",   description: "G-Sec, Corp bonds, structured debt",        icon: "Landmark",   totalCustomers: 22_000, totalAumCr: 48_000, stable: 19_800, watch: 1_800, attention: 400, color: "#3B82F6" },
      { id: "alternatives",      label: "Alternatives & PMS",     description: "AIF, PMS, real estate, PE funds",           icon: "Building2",  totalCustomers:  4_200, totalAumCr: 22_000, stable:  4_020, watch:   140, attention:  40, color: "#F59E0B" },
      { id: "global-funds",      label: "Global / Offshore",      description: "International MF, GIFT City, FPI accounts", icon: "Globe",      totalCustomers:  8_400, totalAumCr:  8_000, stable:  7_600, watch:   620, attention: 180, color: "#10B981" },
      { id: "nri-portfolios",    label: "NRI Portfolios",         description: "NRE/NRO, FCNR, remittance-linked",          icon: "Plane",      totalCustomers: 26_200, totalAumCr:  6_000, stable: 22_800, watch: 2_800, attention: 600, color: "#EC4899" },
    ],
  },
};

// ─── Zerodha ──────────────────────────────────────────────────

const zerodha: Firm = {
  id:        "zerodha",
  name:      "Zerodha",
  shortName: "Zerodha",
  tagline:   "India's largest stock broker",
  color:     "#387ed1",
  gradient:  "linear-gradient(135deg, #1a3a5c 0%, #387ed1 100%)",
  logo:      "⚡",
  country:   "India",
  type:      "broker",
  demoUsers: [
    { name: "Rahul Nair",       role: "Risk & Surveillance Head",  email: "rahul@zerodha.com",    password: "demo", avatar: "RN" },
    { name: "Sneha Kulkarni",   role: "Compliance Officer",        email: "sneha@zerodha.com",    password: "demo", avatar: "SK" },
    { name: "Vikram Joshi",     role: "Wealth Product Manager",    email: "vikram@zerodha.com",   password: "demo", avatar: "VJ" },
  ],
  overview: {
    totalRelationships: 14_200_000,
    totalAumCr:          48_000,
    todayChanges:       1_84_000,
    pendingDecisions:   142,
    emergingRisks:       34,
    featuredSignal: {
      title:       "SIP pause surge — 2.1L customers in 30 days",
      description: "SIP pauses have spiked 38% MoM. Concentrated in ₹1,000–5,000/month ticket size. Likely driven by market volatility + Q3 tax outflows. Risk of permanent deactivation for 40% of paused SIPs.",
      affected:    2_10_000,
      confidence:  93,
    },
    portfolioHealth: { stable: 78, watch: 17, attention: 5 },
    segments: [
      { id: "direct-equity",     label: "Direct Equity Traders",   description: "Active BTST, delivery, intraday traders",   icon: "BarChart3",  totalCustomers: 4_200_000, totalAumCr: 18_000, stable: 3_024_000, watch: 882_000, attention: 294_000, color: "#6366F1" },
      { id: "sip-investors",     label: "SIP Investors",           description: "Monthly SIP via Coin / Kite MF",           icon: "Repeat",     totalCustomers: 5_800_000, totalAumCr: 12_000, stable: 4_698_000, watch: 812_000, attention: 290_000, color: "#10B981" },
      { id: "mf-lumpsum",        label: "MF Lumpsum Investors",    description: "One-time mutual fund investments",         icon: "PiggyBank",  totalCustomers: 2_100_000, totalAumCr:  8_200, stable: 1_848_000, watch: 189_000, attention:  63_000, color: "#F59E0B" },
      { id: "fno-traders",       label: "F&O Traders",             description: "Futures & Options active accounts",        icon: "Zap",        totalCustomers:   840_000, totalAumCr:  6_400, stable:   630_000, watch: 168_000, attention:  42_000, color: "#EF4444" },
      { id: "hni-equity",        label: "HNI Equity Portfolios",   description: "₹25L+ Kite accounts, high-value clients", icon: "TrendingUp", totalCustomers:   620_000, totalAumCr:  3_400, stable:   527_000, watch:  74_400, attention:  18_600, color: "#8B5CF6" },
      { id: "nri-portfolios",    label: "NRI / FPI Accounts",      description: "NRE-linked Kite + Coin portfolios",        icon: "Globe",      totalCustomers:   640_000, totalAumCr:  2_800, stable:   569_600, watch:  51_200, attention:  19_200, color: "#3B82F6" },
    ],
  },
};

// ─── Morgan Stanley ───────────────────────────────────────────

const morganstanley: Firm = {
  id:        "morganstanley",
  name:      "Morgan Stanley Wealth",
  shortName: "Morgan Stanley",
  tagline:   "Global Investment Management",
  color:     "#003087",
  gradient:  "linear-gradient(135deg, #001f5b 0%, #003087 100%)",
  logo:      "🌐",
  country:   "India",
  type:      "wealth",
  demoUsers: [
    { name: "Kavita Reddy",  role: "Director – Private Wealth",   email: "kavita@morganstanley.com", password: "demo", avatar: "KR" },
    { name: "Arjun Mehta",   role: "Senior Portfolio Manager",    email: "arjun@morganstanley.com",  password: "demo", avatar: "AM" },
  ],
  overview: {
    totalRelationships: 44_000,
    totalAumCr:         1_18_000,
    todayChanges:       218,
    pendingDecisions:   19,
    emergingRisks:       7,
    featuredSignal: {
      title:       "Global equity overweight risk rising",
      description: "12,400 portfolios are overweight global equities by >8%. USD strength and Fed policy divergence creates mark-to-market risk of ₹940 Cr across the book.",
      affected:    12_400,
      confidence:  86,
    },
    portfolioHealth: { stable: 89, watch: 8, attention: 3 },
    segments: [
      { id: "global-equity",    label: "Global Equity Mandates",   description: "International equity, ETFs, global funds",   icon: "Globe",       totalCustomers:  12_000, totalAumCr: 48_000, stable:  11_040, watch:   720, attention:  240, color: "#6366F1" },
      { id: "structured",       label: "Structured Products",      description: "Capital protection, market-linked bonds",    icon: "Shield",      totalCustomers:   8_200, totalAumCr: 28_000, stable:   7_708, watch:   410, attention:   82, color: "#F59E0B" },
      { id: "hni-equity",       label: "India HNI Equity",         description: "Domestic large/mid cap HNI portfolios",     icon: "TrendingUp",  totalCustomers:  14_400, totalAumCr: 24_000, stable:  13_104, watch: 1_008, attention:  288, color: "#8B5CF6" },
      { id: "fixed-income",     label: "Fixed Income",             description: "Sovereign + IG corporate bonds",            icon: "Landmark",    totalCustomers:   9_400, totalAumCr: 18_000, stable:   8_836, watch:   470, attention:   94, color: "#3B82F6" },
    ],
  },
};

// ─── HDFC Securities ──────────────────────────────────────────

const hdfcsec: Firm = {
  id:        "hdfcsec",
  name:      "HDFC Securities",
  shortName: "HDFC Sec",
  tagline:   "Full-service brokerage & wealth",
  color:     "#004C8F",
  gradient:  "linear-gradient(135deg, #002952 0%, #004C8F 100%)",
  logo:      "🔵",
  country:   "India",
  type:      "nbfc",
  demoUsers: [
    { name: "Suresh Iyer",    role: "Head of Retail Wealth",      email: "suresh@hdfcsec.com",   password: "demo", avatar: "SI" },
    { name: "Deepa Nambiar",  role: "Portfolio Risk Manager",     email: "deepa@hdfcsec.com",    password: "demo", avatar: "DN" },
  ],
  overview: {
    totalRelationships: 3_800_000,
    totalAumCr:          82_000,
    todayChanges:       42_000,
    pendingDecisions:    84,
    emergingRisks:       22,
    featuredSignal: {
      title:       "Mass affluent segment showing SIP stress",
      description: "8.4L customers in the ₹5,000–15,000 SIP bracket have reduced ticket size by >30% in Q3. Total projected SIP book reduction: ₹420 Cr annually.",
      affected:    8_40_000,
      confidence:  91,
    },
    portfolioHealth: { stable: 81, watch: 14, attention: 5 },
    segments: [
      { id: "hni-equity",      label: "HNI Equity Portfolios",    description: "₹10L+ equity account holders",              icon: "TrendingUp", totalCustomers:   480_000, totalAumCr: 28_000, stable:   408_000, watch: 52_800, attention: 19_200, color: "#6366F1" },
      { id: "sip-investors",   label: "SIP / MF Investors",       description: "Systematic investment plan customers",      icon: "Repeat",     totalCustomers: 1_800_000, totalAumCr: 22_000, stable: 1_476_000, watch: 252_000, attention: 72_000, color: "#10B981" },
      { id: "retail-equity",   label: "Retail Equity Traders",    description: "Delivery + intraday retail traders",        icon: "BarChart3",  totalCustomers:   920_000, totalAumCr: 18_000, stable:   736_000, watch: 138_000, attention: 46_000, color: "#8B5CF6" },
      { id: "fno-traders",     label: "F&O Segment",              description: "Options & futures retail accounts",         icon: "Zap",        totalCustomers:   360_000, totalAumCr:  8_000, stable:   252_000, watch:  79_200, attention: 28_800, color: "#EF4444" },
      { id: "fixed-income",    label: "Bonds & FD Investors",     description: "Corp bonds, govt sec, tax-free bonds",     icon: "Landmark",   totalCustomers:   240_000, totalAumCr:  6_000, stable:   216_000, watch:  19_200, attention:  4_800, color: "#3B82F6" },
    ],
  },
};

// ─── Exports ──────────────────────────────────────────────────

export const firms: Firm[] = [jpmorgan, zerodha, morganstanley, hdfcsec];

export function getFirm(id: string): Firm | undefined {
  return firms.find((f) => f.id === id);
}
