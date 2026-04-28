"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = Array.from({ length: 31 }, (_, i) => {
  const day = i + 1;

  return {
    date: `May ${day}`,
    income:
      42000 +
      day * 850 +
      Math.sin(day / 1.7) * 7000 +
      (day % 5 === 0 ? 9000 : 0),
    expense:
      24000 +
      day * 520 +
      Math.sin(day / 1.4) * 3500 +
      (day % 6 === 0 ? 4500 : 0),
  };
});

const OverviewChart = () => {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Overview</CardTitle>
        <Button variant="outline" className="rounded-xl">
          This Month
          <ChevronRight className="ml-2 h-4 w-4 rotate-90" />
        </Button>
      </CardHeader>

      <CardContent>
        <div className="mb-6 flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            Income
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            Expense
          </div>
        </div>

        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid vertical={false} stroke="#EEF2F7" />
              <XAxis
                dataKey="date"
                interval={2}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12, fill: "#64748b" }}
                tickFormatter={(value) => `${value / 1000}k`}
              />
              <Tooltip
                cursor={{ stroke: "#CBD5E1", strokeDasharray: "4 4" }}
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
                }}
                formatter={(value: number, name) => [
                  `$ ${value.toLocaleString()}`,
                  name === "income" ? "Income" : "Expense",
                ]}
              />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#22C55E"
                strokeWidth={2}
                dot={{ r: 3, fill: "#22C55E", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#F87171"
                strokeWidth={2}
                dot={{ r: 3, fill: "#F87171", strokeWidth: 0 }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
