"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";
import { TMonthlySavingsTrend } from "../_lib/types";

export function SavingsChart({ data }: { data: TMonthlySavingsTrend[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <defs>
          <linearGradient id="savingsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.35} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#e5e7eb"
          vertical={false}
        />

        <XAxis
          dataKey="month"
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          tickFormatter={(value) => `৳${(value / 1000).toFixed(0)}k`}
          tick={{ fill: "#6b7280", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "none",
            borderRadius: "12px",
            boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
            padding: "12px 16px",
          }}
          formatter={(value: number) => [
            new Intl.NumberFormat("en-BD", {
              style: "currency",
              currency: "BDT",
              maximumFractionDigits: 0,
            }).format(value),
            "Saved",
          ]}
          labelStyle={{ color: "#374151", fontWeight: 600 }}
        />

        <Area
          type="natural"
          dataKey="saved"
          stroke="none"
          fill="url(#savingsGradient)"
        />

        <Line
          type="natural"
          dataKey="saved"
          stroke="#10b981"
          strokeWidth={4}
          dot={{ fill: "#10b981", strokeWidth: 3, stroke: "#fff", r: 6 }}
          activeDot={{ r: 8, fill: "#10b981", stroke: "#fff", strokeWidth: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
