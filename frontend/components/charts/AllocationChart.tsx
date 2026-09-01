"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import type { AllocationItem } from "@/lib/mock-customers";

interface Props {
  data: AllocationItem[];
  totalFormatted: string;
}

export default function AllocationChart({ data, totalFormatted }: Props) {
  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={100}
            paddingAngle={2}
            dataKey="percentage"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} opacity={0.9} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const item = payload[0].payload as AllocationItem;
                return (
                  <div className="glass-strong rounded-lg px-3 py-2 text-[12px]">
                    <p className="text-n200 font-medium">{item.category}</p>
                    <p className="text-n400">{item.percentage}% · ₹{item.amountL >= 100 ? `${(item.amountL / 100).toFixed(1)} Cr` : `${item.amountL.toFixed(1)} L`}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-[11px] text-n600 uppercase tracking-wider">Total AUM</p>
        <p className="text-[15px] font-bold text-n100 mt-0.5">{totalFormatted}</p>
      </div>
    </div>
  );
}
