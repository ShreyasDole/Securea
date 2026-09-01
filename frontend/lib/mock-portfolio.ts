// ─── Portfolio Holdings & Trade History ──────────────────────
// Indexed by customer ID

export interface Holding {
  id: string;
  instrument: string;
  isin: string;
  assetClass: "equity" | "debt" | "gold" | "liquid" | "alternate" | "international";
  category: string;
  units: number;
  avgCost: number;       // per unit
  currentNAV: number;    // current price per unit
  investedAmt: number;   // total invested (lakhs)
  currentValue: number;  // current value (lakhs)
  pnl: number;           // absolute P&L (lakhs)
  pnlPct: number;        // % P&L
  allocPct: number;      // % of total portfolio
  dayChange: number;     // today's change %
}

export interface Transaction {
  id: string;
  date: string;
  type: "Buy" | "Sell" | "SIP" | "Switch In" | "Switch Out" | "Redemption" | "Dividend";
  instrument: string;
  units: number;
  nav: number;
  amount: number;  // lakhs
  pnl?: number;    // realised P&L if sell/redemption
  folioNo: string;
  status: "Settled" | "Pending";
}

// ─── HNI-001: Rajesh Kumar Mehta ─────────────────────────────

export const hni001Holdings: Holding[] = [
  { id: "h1", instrument: "HDFC Flexi Cap Fund – Direct",        isin: "INF179K01VR0", assetClass: "equity",  category: "Large Cap",    units: 4820,   avgCost: 284.2,  currentNAV: 312.8,  investedAmt: 137.0,  currentValue: 150.8, pnl: 13.8,  pnlPct: 10.1, allocPct: 35.9, dayChange:  0.8 },
  { id: "h2", instrument: "Mirae Asset Large Cap – Direct",       isin: "INF769K01EW1", assetClass: "equity",  category: "Large Cap",    units: 2140,   avgCost: 218.6,  currentNAV: 248.4,  investedAmt: 46.8,   currentValue: 53.2,  pnl:  6.4,  pnlPct: 13.7, allocPct: 12.7, dayChange:  0.6 },
  { id: "h3", instrument: "Nippon India Mid Cap – Direct",        isin: "INF204K01GF5", assetClass: "equity",  category: "Mid Cap",      units: 1860,   avgCost: 186.4,  currentNAV: 198.2,  investedAmt: 34.7,   currentValue: 36.9,  pnl:  2.2,  pnlPct:  6.3, allocPct:  8.8, dayChange: -0.4 },
  { id: "h4", instrument: "SBI Infrastructure Fund – Direct",     isin: "INF200K01FN6", assetClass: "equity",  category: "Sectoral",     units: 8400,   avgCost:  82.4,  currentNAV:  94.6,  investedAmt: 69.2,   currentValue: 79.5,  pnl: 10.3,  pnlPct: 14.9, allocPct: 18.9, dayChange:  1.2 },
  { id: "h5", instrument: "ICICI Pru Banking & Financial Svcs",   isin: "INF109K01Z16", assetClass: "equity",  category: "Sectoral",     units: 3200,   avgCost: 112.8,  currentNAV: 108.4,  investedAmt: 36.1,   currentValue: 34.7,  pnl: -1.4,  pnlPct: -3.9, allocPct:  8.3, dayChange: -0.9 },
  { id: "h6", instrument: "HDFC Short Duration Fund",             isin: "INF179K01VL3", assetClass: "debt",    category: "Short Dur.",   units: 18400,  avgCost:  22.6,  currentNAV:  24.1,  investedAmt: 41.6,   currentValue: 44.3,  pnl:  2.7,  pnlPct:  6.5, allocPct: 10.6, dayChange:  0.1 },
  { id: "h7", instrument: "Sovereign Gold Bond 2024 Series III",  isin: "IN0020240039", assetClass: "gold",    category: "Gold",         units: 100,    avgCost: 6284.0, currentNAV: 7180.0, investedAmt: 62.8,   currentValue: 71.8,  pnl:  9.0,  pnlPct: 14.3, allocPct:  4.8, dayChange:  0.3 },
];

export const hni001Transactions: Transaction[] = [
  { id: "t1",  date: "2026-09-01", type: "SIP",        instrument: "HDFC Flexi Cap Fund",           units:  48.2, nav: 312.8, amount:  0.15, folioNo: "HFC-4820001", status: "Settled" },
  { id: "t2",  date: "2026-08-14", type: "Buy",        instrument: "SBI Infrastructure Fund",       units: 800,   nav:  88.2, amount:  0.71, folioNo: "SBI-2341122", status: "Settled" },
  { id: "t3",  date: "2026-08-01", type: "SIP",        instrument: "HDFC Flexi Cap Fund",           units:  47.8, nav: 314.2, amount:  0.15, folioNo: "HFC-4820001", status: "Settled" },
  { id: "t4",  date: "2026-07-22", type: "Buy",        instrument: "Nippon India Mid Cap",          units: 400,   nav: 194.6, amount:  0.78, folioNo: "NIP-1840432", status: "Settled" },
  { id: "t5",  date: "2026-07-01", type: "SIP",        instrument: "HDFC Flexi Cap Fund",           units:  49.1, nav: 305.4, amount:  0.15, folioNo: "HFC-4820001", status: "Settled" },
  { id: "t6",  date: "2026-06-12", type: "Buy",        instrument: "ICICI Pru Banking & Fin. Svcs", units: 1200,  nav: 118.4, amount:  1.42, folioNo: "ICI-3291023", status: "Settled" },
  { id: "t7",  date: "2026-06-01", type: "SIP",        instrument: "HDFC Flexi Cap Fund",           units:  50.2, nav: 298.8, amount:  0.15, folioNo: "HFC-4820001", status: "Settled" },
  { id: "t8",  date: "2026-05-18", type: "Buy",        instrument: "Sovereign Gold Bond 2024",      units:  50,   nav: 6284,  amount:  3.14, folioNo: "SGB-0001234", status: "Settled" },
  { id: "t9",  date: "2026-05-01", type: "SIP",        instrument: "HDFC Flexi Cap Fund",           units:  51.0, nav: 294.0, amount:  0.15, folioNo: "HFC-4820001", status: "Settled" },
  { id: "t10", date: "2026-04-08", type: "Buy",        instrument: "SBI Infrastructure Fund",       units: 2000,  nav:  80.4, amount:  1.61, folioNo: "SBI-2341122", status: "Settled" },
  { id: "t11", date: "2026-03-15", type: "Sell",       instrument: "ICICI Pru Banking & Fin. Svcs", units: 800,   nav: 124.2, amount:  0.99, pnl: 0.11, folioNo: "ICI-3291023", status: "Settled" },
  { id: "t12", date: "2026-02-20", type: "Buy",        instrument: "Mirae Asset Large Cap",         units: 820,   nav: 224.6, amount:  1.84, folioNo: "MIR-0091234", status: "Settled" },
  { id: "t13", date: "2026-01-10", type: "Buy",        instrument: "HDFC Short Duration Fund",      units: 4200,  nav:  22.6, amount:  0.95, folioNo: "HDF-8821034", status: "Settled" },
  { id: "t14", date: "2025-12-22", type: "SIP",        instrument: "Nippon India Mid Cap",          units: 210,   nav: 186.4, amount:  0.39, folioNo: "NIP-1840432", status: "Settled" },
  { id: "t15", date: "2025-11-14", type: "Buy",        instrument: "SBI Infrastructure Fund",       units: 3600,  nav:  76.2, amount:  2.74, folioNo: "SBI-2341122", status: "Settled" },
  { id: "t16", date: "2025-10-08", type: "Sell",       instrument: "HDFC Flexi Cap Fund",           units: 420,   nav: 284.2, amount:  1.19, pnl: 0.24, folioNo: "HFC-4820001", status: "Settled" },
  { id: "t17", date: "2025-09-01", type: "Buy",        instrument: "Mirae Asset Large Cap",         units: 1320,  nav: 198.2, amount:  2.62, folioNo: "MIR-0091234", status: "Settled" },
  { id: "t18", date: "2025-07-15", type: "Buy",        instrument: "Sovereign Gold Bond 2024",      units:  50,   nav: 5840,  amount:  2.92, folioNo: "SGB-0001234", status: "Settled" },
];

// ─── HNI-002: Sunita Agarwal ──────────────────────────────────

export const hni002Holdings: Holding[] = [
  { id: "h1", instrument: "HDFC Balanced Advantage – Direct",    isin: "INF179K01VS8", assetClass: "equity",  category: "Large Cap", units: 9840,  avgCost: 220.4, currentNAV: 248.2,  investedAmt: 216.9, currentValue: 244.4, pnl: 27.5, pnlPct: 12.7, allocPct: 35.9, dayChange:  0.4 },
  { id: "h2", instrument: "ICICI Pru Large & Mid Cap – Direct",  isin: "INF109K01Z24", assetClass: "equity",  category: "Large Cap", units: 3420,  avgCost: 182.6, currentNAV: 204.8,  investedAmt: 62.5,  currentValue: 70.1,  pnl:  7.6, pnlPct: 12.2, allocPct: 10.3, dayChange:  0.6 },
  { id: "h3", instrument: "HDFC Banking & PSU Debt Fund",        isin: "INF179K01VT6", assetClass: "debt",    category: "Short Dur.",units: 24800, avgCost:  40.2, currentNAV:  43.8,  investedAmt: 99.7,  currentValue: 108.6, pnl:  8.9, pnlPct:  8.9, allocPct: 15.9, dayChange:  0.1 },
  { id: "h4", instrument: "SBI Savings Fund – Direct",           isin: "INF200K01FP1", assetClass: "debt",    category: "Ultra ST",  units: 16200, avgCost:  22.6, currentNAV:  24.4,  investedAmt: 36.6,  currentValue: 39.5,  pnl:  2.9, pnlPct:  7.9, allocPct:  5.8, dayChange:  0.1 },
  { id: "h5", instrument: "Sovereign Gold Bond 2023",            isin: "IN0020230028", assetClass: "gold",    category: "Gold",      units: 200,   avgCost: 5820,  currentNAV:  7180,  investedAmt: 116.4, currentValue: 143.6, pnl: 27.2, pnlPct: 23.4, allocPct: 21.1, dayChange:  0.3 },
  { id: "h6", instrument: "Liquid Fund – Cash Management",       isin: "INF179K01VU4", assetClass: "liquid",  category: "Liquid",    units: 4200,  avgCost: 1200,  currentNAV:  1348,  investedAmt: 50.4,  currentValue: 56.6,  pnl:  6.2, pnlPct: 12.3, allocPct:  8.3, dayChange:  0.0 },
  { id: "h7", instrument: "Kotak Cash Management – Idle",        isin: "INF174K01AD2", assetClass: "liquid",  category: "Cash",      units: 1,     avgCost: 136.0, currentNAV:  136.0, investedAmt: 136.0, currentValue: 136.0, pnl:  0.0, pnlPct:  0.0, allocPct:  8.3, dayChange:  0.0 },
];

export const hni002Transactions: Transaction[] = [
  { id: "t1",  date: "2026-09-01", type: "SIP",        instrument: "HDFC Balanced Advantage",      units:  24.2, nav: 248.2, amount: 0.06, folioNo: "HDF-9840001", status: "Settled"  },
  { id: "t2",  date: "2026-08-28", type: "Switch In",  instrument: "Kotak Cash Mgmt (Idle Cash)",  units:   1.0, nav: 136.0, amount: 1.36, folioNo: "KOT-0001001", status: "Settled"  },
  { id: "t3",  date: "2026-08-12", type: "Sell",       instrument: "ICICI Pru Banking & Fin",      units: 1200,  nav: 124.2, amount: 1.49, pnl: 0.18, folioNo: "ICI-3291042", status: "Settled" },
  { id: "t4",  date: "2026-08-01", type: "SIP",        instrument: "HDFC Balanced Advantage",      units:  23.8, nav: 252.1, amount: 0.06, folioNo: "HDF-9840001", status: "Settled"  },
  { id: "t5",  date: "2026-07-18", type: "Switch Out", instrument: "HDFC Balanced Advantage → Cash",units: 800,  nav: 244.8, amount: 1.96, folioNo: "HDF-9840001", status: "Settled"  },
  { id: "t6",  date: "2026-07-01", type: "SIP",        instrument: "HDFC Balanced Advantage",      units:  25.0, nav: 240.0, amount: 0.06, folioNo: "HDF-9840001", status: "Settled"  },
  { id: "t7",  date: "2026-06-14", type: "Buy",        instrument: "Sovereign Gold Bond 2023",     units:  50,   nav: 6280,  amount: 3.14, folioNo: "SGB-0002034", status: "Settled"  },
  { id: "t8",  date: "2026-05-20", type: "Buy",        instrument: "HDFC Banking & PSU Debt",      units: 4800,  nav:  40.2, amount: 1.93, folioNo: "HDF-8821040", status: "Settled"  },
  { id: "t9",  date: "2026-04-10", type: "Redemption", instrument: "Axis Mid Cap – Direct",        units: 1200,  nav: 284.6, amount: 3.42, pnl: 0.86, folioNo: "AXS-1241034", status: "Settled" },
  { id: "t10", date: "2026-03-22", type: "Buy",        instrument: "ICICI Pru Large & Mid Cap",    units: 1400,  nav: 188.2, amount: 2.63, folioNo: "ICI-3291042", status: "Settled"  },
  { id: "t11", date: "2026-02-18", type: "Buy",        instrument: "Sovereign Gold Bond 2023",     units: 100,   nav: 5820,  amount: 5.82, folioNo: "SGB-0002034", status: "Settled"  },
  { id: "t12", date: "2026-01-08", type: "Buy",        instrument: "SBI Savings Fund",             units: 8200,  nav:  22.6, amount: 1.85, folioNo: "SBI-8821040", status: "Settled"  },
];

// ─── UHNI-001: Prabhati Kapoor ────────────────────────────────

export const uhni001Holdings: Holding[] = [
  { id: "h1", instrument: "Pharma & Healthcare Basket (PMS)",      isin: "PMS-PHC-0012", assetClass: "equity",       category: "Sectoral",        units: 1, avgCost: 2400, currentNAV: 3528,  investedAmt: 2400, currentValue: 3528, pnl: 1128, pnlPct: 47.0, allocPct: 42.0, dayChange: -0.6 },
  { id: "h2", instrument: "Multi-Cap Diversified PMS",             isin: "PMS-MCP-0034", assetClass: "equity",       category: "Multi-Cap",       units: 1, avgCost: 1200, currentNAV: 1344,  investedAmt: 1200, currentValue: 1344, pnl:  144, pnlPct: 12.0, allocPct: 16.0, dayChange:  0.8 },
  { id: "h3", instrument: "Govt Securities Long Duration (Bonds)", isin: "IN0020230041", assetClass: "debt",         category: "Sovereign Bonds", units: 1, avgCost: 1800, currentNAV: 1962,  investedAmt: 1800, currentValue: 1962, pnl:  162, pnlPct:  9.0, allocPct: 23.4, dayChange:  0.0 },
  { id: "h4", instrument: "HDFC AIF – Category II RE Fund",        isin: "AIF-HDFC-RE01", assetClass: "alternate",   category: "Real Estate",     units: 1, avgCost:  840, currentNAV:  924,  investedAmt:  840, currentValue:  924, pnl:   84, pnlPct: 10.0, allocPct: 11.0, dayChange:  0.0 },
  { id: "h5", instrument: "Sovereign Gold Bond 2022 Series I",     isin: "IN0020220014", assetClass: "gold",         category: "Gold",            units: 1, avgCost:  252, currentNAV:  336,  investedAmt:  252, currentValue:  336, pnl:   84, pnlPct: 33.3, allocPct:  4.0, dayChange:  0.3 },
  { id: "h6", instrument: "Cash & Money Market Holdings",          isin: "CASH-EQUIV-01", assetClass: "liquid",      category: "Cash",            units: 1, avgCost:  252, currentNAV:  252,  investedAmt:  252, currentValue:  252, pnl:    0, pnlPct:  0.0, allocPct:  3.0, dayChange:  0.0 },
];

export const uhni001Transactions: Transaction[] = [
  { id: "t1",  date: "2026-09-01", type: "Dividend", instrument: "Govt Securities – Coupon",      units: 1,    nav: 0,      amount: 12.6, folioNo: "GSEC-0012", status: "Settled" },
  { id: "t2",  date: "2026-08-22", type: "Buy",      instrument: "HDFC AIF – Category II RE",     units: 1,    nav: 840,    amount: 84.0, folioNo: "AIF-0034",  status: "Settled" },
  { id: "t3",  date: "2026-08-14", type: "Buy",      instrument: "Multi-Cap Diversified PMS",     units: 1,    nav: 1200,   amount: 120,  folioNo: "PMS-0034",  status: "Settled" },
  { id: "t4",  date: "2026-07-10", type: "Buy",      instrument: "Pharma PMS Top-up",             units: 1,    nav: 240,    amount: 240,  folioNo: "PMS-0012",  status: "Settled" },
  { id: "t5",  date: "2026-05-18", type: "Buy",      instrument: "Sovereign Gold Bond 2022",      units: 1,    nav: 252,    amount: 25.2, folioNo: "SGB-0056",  status: "Settled" },
  { id: "t6",  date: "2026-03-01", type: "Buy",      instrument: "Govt Securities 10Y",           units: 1,    nav: 1800,   amount: 180,  folioNo: "GSEC-0012", status: "Settled" },
  { id: "t7",  date: "2025-12-14", type: "Buy",      instrument: "Pharma & Healthcare PMS",       units: 1,    nav: 2400,   amount: 240,  folioNo: "PMS-0012",  status: "Settled" },
  { id: "t8",  date: "2025-09-22", type: "Sell",     instrument: "IT Sectoral Fund (exited)",     units: 1,    nav: 480,    amount: 480,  pnl: 96,  folioNo: "PMS-0018", status: "Settled" },
  { id: "t9",  date: "2025-06-10", type: "Buy",      instrument: "Multi-Cap Diversified PMS",     units: 1,    nav: 1080,   amount: 108,  folioNo: "PMS-0034",  status: "Settled" },
];

// ─── FI-001: Ratan Gupta ─────────────────────────────────────

export const fi001Holdings: Holding[] = [
  { id: "h1", instrument: "G-Sec 7.26% 2033",                    isin: "IN0020210041", assetClass: "debt",  category: "G-Sec",         units: 120,   avgCost: 101.4, currentNAV: 98.8,  investedAmt: 121.7, currentValue: 118.6, pnl: -3.1,  pnlPct: -2.5, allocPct: 34.9, dayChange: -0.2 },
  { id: "h2", instrument: "HDFC Corp Bond AA+ 2027",             isin: "INF179K01CD3", assetClass: "debt",  category: "Corp Bond AA+", units: 100,   avgCost: 102.0, currentNAV: 104.8, investedAmt: 102.0, currentValue: 104.8, pnl:  2.8,  pnlPct:  2.7, allocPct: 30.8, dayChange:  0.1 },
  { id: "h3", instrument: "SBI Fixed Deposit (3Y @ 7.1%)",       isin: "FD-SBI-03242", assetClass: "debt",  category: "FD",            units: 1,     avgCost: 68,    currentNAV:  68.0, investedAmt:  68.0, currentValue:  68.0, pnl:  0.0,  pnlPct:  0.0, allocPct: 20.0, dayChange:  0.0 },
  { id: "h4", instrument: "Nippon India Liquid Fund",             isin: "INF204K01GG3", assetClass: "liquid",category: "Liquid",        units: 18200, avgCost:  2.60, currentNAV:   2.72, investedAmt:  47.3, currentValue:  49.5, pnl:  2.2,  pnlPct:  4.7, allocPct: 14.6, dayChange:  0.0 },
];

export const fi001Transactions: Transaction[] = [
  { id: "t1",  date: "2026-09-01", type: "Dividend", instrument: "HDFC Corp Bond – Coupon",      units: 1,    nav: 0,    amount: 0.86, folioNo: "HDF-CD001", status: "Settled" },
  { id: "t2",  date: "2026-08-01", type: "Dividend", instrument: "G-Sec 7.26% – Coupon",         units: 1,    nav: 0,    amount: 4.36, folioNo: "GSEC-0041", status: "Settled" },
  { id: "t3",  date: "2026-07-14", type: "Buy",      instrument: "Nippon India Liquid Fund",      units: 3400, nav: 2.62, amount: 0.89, folioNo: "NIP-LIQ02", status: "Settled" },
  { id: "t4",  date: "2026-06-18", type: "Buy",      instrument: "HDFC Corp Bond AA+ 2027",       units: 40,   nav: 102,  amount: 4.08, folioNo: "HDF-CD001", status: "Settled" },
  { id: "t5",  date: "2026-03-22", type: "Buy",      instrument: "SBI Fixed Deposit 3Y",          units: 1,    nav: 68,   amount: 6.80, folioNo: "FD-SBI-01", status: "Settled" },
  { id: "t6",  date: "2026-02-01", type: "Dividend", instrument: "G-Sec 7.26% – Coupon",         units: 1,    nav: 0,    amount: 4.36, folioNo: "GSEC-0041", status: "Settled" },
  { id: "t7",  date: "2026-01-12", type: "Buy",      instrument: "G-Sec 7.26% 2033",              units: 40,   nav: 101.4,amount: 4.06, folioNo: "GSEC-0041", status: "Settled" },
  { id: "t8",  date: "2025-12-08", type: "Sell",     instrument: "G-Sec 6.89% 2025 (Matured)",   units: 80,   nav: 100,  amount: 8.00, pnl: 0.20, folioNo: "GSEC-0028", status: "Settled" },
  { id: "t9",  date: "2025-10-15", type: "Buy",      instrument: "HDFC Corp Bond AA+ 2027",       units: 60,   nav: 101.8,amount: 6.11, folioNo: "HDF-CD001", status: "Settled" },
  { id: "t10", date: "2025-08-01", type: "Buy",      instrument: "G-Sec 7.26% 2033",              units: 80,   nav: 101.2,amount: 8.10, folioNo: "GSEC-0041", status: "Settled" },
];

// ─── SIP-001: Neha Kapoor ─────────────────────────────────────

export const sip001Holdings: Holding[] = [
  { id: "h1", instrument: "Axis Bluechip Fund – Direct",      isin: "INF846K01EW2", assetClass: "equity",  category: "Large Cap",  units: 1840, avgCost: 42.8, currentNAV: 52.4, investedAmt: 7.88, currentValue: 9.64, pnl: 1.76, pnlPct: 22.3, allocPct: 53.6, dayChange:  0.7 },
  { id: "h2", instrument: "Parag Parikh Flexi Cap – Direct",  isin: "INF879O01019", assetClass: "equity",  category: "Mid Cap",    units:  824, avgCost: 62.4, currentNAV: 72.8, investedAmt: 5.14, currentValue: 5.99, pnl: 0.85, pnlPct: 16.5, allocPct: 33.3, dayChange:  0.5 },
  { id: "h3", instrument: "Mirae Asset ELSS Tax Saver",       isin: "INF769K01EY7", assetClass: "equity",  category: "ELSS",       units:  480, avgCost: 74.2, currentNAV: 84.6, investedAmt: 3.56, currentValue: 4.06, pnl: 0.50, pnlPct: 14.0, allocPct: 22.6, dayChange:  0.4 },
  { id: "h4", instrument: "SBI Liquid Fund – Cash",           isin: "INF200K01EX8", assetClass: "liquid",  category: "Liquid",     units:  134, avgCost: 13.2, currentNAV: 13.6, investedAmt: 1.77, currentValue: 1.82, pnl: 0.05, pnlPct:  2.8, allocPct: 10.1, dayChange:  0.0 },
];

export const sip001Transactions: Transaction[] = [
  { id: "t1",  date: "2026-09-01", type: "SIP", instrument: "Axis Bluechip Fund",           units:  18.4, nav: 52.4, amount: 0.096, folioNo: "AXS-1841234", status: "Settled" },
  { id: "t2",  date: "2026-09-01", type: "SIP", instrument: "Parag Parikh Flexi Cap",       units:   8.2, nav: 72.8, amount: 0.060, folioNo: "PPF-0082341", status: "Settled" },
  { id: "t3",  date: "2026-08-01", type: "SIP", instrument: "Axis Bluechip Fund",           units:  18.1, nav: 53.1, amount: 0.096, folioNo: "AXS-1841234", status: "Settled" },
  { id: "t4",  date: "2026-08-01", type: "SIP", instrument: "Parag Parikh Flexi Cap",       units:   8.0, nav: 75.0, amount: 0.060, folioNo: "PPF-0082341", status: "Settled" },
  { id: "t5",  date: "2026-08-01", type: "SIP", instrument: "Mirae Asset ELSS",             units:   9.6, nav: 83.2, amount: 0.080, folioNo: "MIR-0048123", status: "Settled" },
  { id: "t6",  date: "2026-07-01", type: "SIP", instrument: "Axis Bluechip Fund",           units:  18.8, nav: 51.1, amount: 0.096, folioNo: "AXS-1841234", status: "Settled" },
  { id: "t7",  date: "2026-06-01", type: "SIP", instrument: "Axis Bluechip Fund",           units:  19.2, nav: 50.0, amount: 0.096, folioNo: "AXS-1841234", status: "Settled" },
  { id: "t8",  date: "2026-05-01", type: "SIP", instrument: "Mirae Asset ELSS",             units:  10.2, nav: 78.4, amount: 0.080, folioNo: "MIR-0048123", status: "Settled" },
  { id: "t9",  date: "2026-04-01", type: "SIP", instrument: "Parag Parikh Flexi Cap",       units:   8.4, nav: 71.4, amount: 0.060, folioNo: "PPF-0082341", status: "Settled" },
  { id: "t10", date: "2026-03-01", type: "SIP", instrument: "Axis Bluechip Fund",           units:  20.1, nav: 47.8, amount: 0.096, folioNo: "AXS-1841234", status: "Settled" },
  { id: "t11", date: "2026-02-01", type: "SIP", instrument: "Mirae Asset ELSS",             units:  11.4, nav: 70.2, amount: 0.080, folioNo: "MIR-0048123", status: "Settled" },
  { id: "t12", date: "2026-01-01", type: "SIP", instrument: "Axis Bluechip Fund",           units:  22.4, nav: 42.8, amount: 0.096, folioNo: "AXS-1841234", status: "Settled" },
];

// ─── Index ────────────────────────────────────────────────────

export const holdingsByCustomer: Record<string, Holding[]> = {
  "hni-001":  hni001Holdings,
  "hni-002":  hni002Holdings,
  "uhni-001": uhni001Holdings,
  "fi-001":   fi001Holdings,
  "sip-001":  sip001Holdings,
};

export const transactionsByCustomer: Record<string, Transaction[]> = {
  "hni-001":  hni001Transactions,
  "hni-002":  hni002Transactions,
  "uhni-001": uhni001Transactions,
  "fi-001":   fi001Transactions,
  "sip-001":  sip001Transactions,
};

export function getHoldings(customerId: string): Holding[] {
  return holdingsByCustomer[customerId] ?? [];
}

export function getTransactions(customerId: string): Transaction[] {
  return transactionsByCustomer[customerId] ?? [];
}

// ─── Fallback factory for segments without specific data ──────
// Returns generic holdings/transactions when customer has no specific data

function genericHoldings(aumL: number): Holding[] {
  const e = +(aumL * 0.6).toFixed(1);
  const d = +(aumL * 0.25).toFixed(1);
  const g = +(aumL * 0.1).toFixed(1);
  const c = +(aumL * 0.05).toFixed(1);
  return [
    { id: "gh1", instrument: "HDFC Flexi Cap Fund – Direct", isin: "INF179K01VR0", assetClass: "equity",  category: "Multi Cap",  units: Math.round(e * 1000 / 312), avgCost: 290, currentNAV: 312, investedAmt: e * 0.9, currentValue: e, pnl: +(e * 0.1).toFixed(1), pnlPct: 11.2, allocPct: 60, dayChange: 0.6 },
    { id: "gh2", instrument: "ICICI Pru Corp Bond Fund",     isin: "INF109K01Z32", assetClass: "debt",    category: "Corp Bond",  units: Math.round(d * 1000 / 43),  avgCost: 40,  currentNAV: 43,  investedAmt: d * 0.95, currentValue: d, pnl: +(d * 0.05).toFixed(1), pnlPct: 5.4,  allocPct: 25, dayChange: 0.1 },
    { id: "gh3", instrument: "Sovereign Gold Bond 2024",     isin: "IN0020240039", assetClass: "gold",    category: "Gold",       units: Math.round(g * 100 / 7180), avgCost: 6200, currentNAV: 7180, investedAmt: g * 0.85, currentValue: g, pnl: +(g * 0.15).toFixed(1), pnlPct: 15.8, allocPct: 10, dayChange: 0.3 },
    { id: "gh4", instrument: "Kotak Liquid Fund",            isin: "INF174K01AD2", assetClass: "liquid",  category: "Liquid",     units: Math.round(c * 1000 / 13.5), avgCost: 13.0, currentNAV: 13.5, investedAmt: c * 0.97, currentValue: c, pnl: +(c * 0.03).toFixed(1), pnlPct: 3.2,  allocPct:  5, dayChange: 0.0 },
  ];
}

function genericTransactions(customerId: string): Transaction[] {
  return [
    { id: "gt1", date: "2026-09-01", type: "SIP",  instrument: "HDFC Flexi Cap Fund", units: 48,  nav: 312, amount: 0.15, folioNo: `GEN-${customerId}-001`, status: "Settled" },
    { id: "gt2", date: "2026-08-01", type: "SIP",  instrument: "HDFC Flexi Cap Fund", units: 47,  nav: 319, amount: 0.15, folioNo: `GEN-${customerId}-001`, status: "Settled" },
    { id: "gt3", date: "2026-07-15", type: "Buy",  instrument: "Sovereign Gold Bond", units: 10,  nav: 7100, amount: 0.71, folioNo: `GEN-${customerId}-002`, status: "Settled" },
    { id: "gt4", date: "2026-06-01", type: "SIP",  instrument: "HDFC Flexi Cap Fund", units: 49,  nav: 306, amount: 0.15, folioNo: `GEN-${customerId}-001`, status: "Settled" },
    { id: "gt5", date: "2026-04-10", type: "Buy",  instrument: "ICICI Pru Corp Bond", units: 200, nav: 41,  amount: 0.82, folioNo: `GEN-${customerId}-003`, status: "Settled" },
    { id: "gt6", date: "2026-01-15", type: "Buy",  instrument: "HDFC Flexi Cap Fund", units: 400, nav: 284, amount: 1.14, folioNo: `GEN-${customerId}-001`, status: "Settled" },
  ];
}

// Override getHoldings/getTransactions to use fallback
const _getHoldings    = getHoldings;
const _getTransactions = getTransactions;

export function getHoldingsForCustomer(customerId: string, aumL: number): Holding[] {
  const h = holdingsByCustomer[customerId];
  return h && h.length > 0 ? h : genericHoldings(aumL);
}

export function getTransactionsForCustomer(customerId: string): Transaction[] {
  const t = transactionsByCustomer[customerId];
  return t && t.length > 0 ? t : genericTransactions(customerId);
}
