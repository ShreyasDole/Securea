"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { PerformancePoint } from "@/lib/mock-customers";

interface Props {
  data: PerformancePoint[];
}

export default function PerformanceChart({ data }: Props) {
  const min = Math.min(...data.map((d) => Math.min(d.portfolio, d.benchmark)));
  const max = Math.max(...data.map((d) => Math.max(d.portfolio, d.benchmark)));
  const pad = (max - min) * 0.1;

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#6366F1" stopOpacity={0.25} />
            <stop offset="95%" stopColor="#6366F1" stopOpacity={0.02} />
          </linearGradient>
          <linearGradient id="benchmarkGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%"  stopColor="#475569" stopOpacity={0.15} />
            <stop offset="95%" stopColor="#475569" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: "#475569", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={[min - pad, max + pad]}
          tick={{ fill: "#475569", fontSize: 10 }}
          axisLine={false}
          tickLine={false}
          width={40}
          tickFormatter={(v) =>
            v >= 100 ? `₹${(v / 100).toFixed(0)}Cr` : `₹${v.toFixed(0)}L`
          }
        />
        <Tooltip
          content={({ active, payload, label }) => {
            if (active && payload?.length) {
              return (
                <div className="glass-strong rounded-lg px-3 py-2 text-[12px]">
                  <p className="text-n400 mb-1">{label}</p>
                  <p className="text-primary font-medium">Portfolio: ₹{Number(payload[0]?.value).toFixed(1)}L</p>
                  <p className="text-n500">Benchmark: ₹{Number(payload[1]?.value).toFixed(1)}L</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Area
          type="monotone"
          dataKey="portfolio"
          stroke="#6366F1"
          strokeWidth={2}
          fill="url(#portfolioGrad)"
          dot={false}
          activeDot={{ r: 4, fill: "#6366F1", strokeWidth: 0 }}
        />
        <Area
          type="monotone"
          dataKey="benchmark"
          stroke="#475569"
          strokeWidth={1.5}
          strokeDasharray="4 3"
          fill="url(#benchmarkGrad)"
          dot={false}
          activeDot={{ r: 3, fill: "#475569", strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
