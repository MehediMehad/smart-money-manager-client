"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Download,
  Filter,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
  LineChart,
  Line,
  ComposedChart,
} from "recharts";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { cn } from "@/lib/utils";

const COLORS = {
  income: "#10b981",
  expense: "#ef4444",
  savings: "#3b82f6",
};

const dummyMonthlyData = [
  { month: "জানু", income: 42000, expense: 32000, savings: 10000 },
  { month: "ফেব্রু", income: 46500, expense: 38000, savings: 8500 },
  { month: "মার্চ", income: 79500, expense: 24500, savings: 55000 },
  { month: "এপ্রি", income: 48000, expense: 41000, savings: 7000 },
  { month: "মে", income: 52000, expense: 39000, savings: 13000 },
  { month: "জুন", income: 51000, expense: 42000, savings: 9000 },
];

const dummyNetWorthTrend = [
  { date: "2025-10", netWorth: 85000 },
  { date: "2025-11", netWorth: 92000 },
  { date: "2025-12", netWorth: 105000 },
  { date: "2026-01", netWorth: 112000 },
  { date: "2026-02", netWorth: 128000 },
  { date: "2026-03", netWorth: 158500 },
];

const dummyInsights = [
  { type: "positive", message: "এই মাসে সেভিংস রেট ৬৯% — দারুণ!" },
  { type: "warning", message: "খাবার খরচ গত মাসের তুলনায় ৩২% বেড়েছে" },
  { type: "info", message: "নেট ওয়ার্থ গত ৬ মাসে ৮৬% বৃদ্ধি পেয়েছে" },
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function formatMonth(dateStr: string) {
  return format(new Date(dateStr), "MMM yy", { locale: bn });
}

export default function ReportsPage() {
  const [period, setPeriod] = useState("this-year");

  const currentMonth = dummyMonthlyData[dummyMonthlyData.length - 1];
  const prevMonth = dummyMonthlyData[dummyMonthlyData.length - 2];

  const savingsRate = Math.round(
    (currentMonth.savings / currentMonth.income) * 100,
  );
  const incomeGrowth = Math.round(
    ((currentMonth.income - prevMonth.income) / prevMonth.income) * 100,
  );

  return (
    <div className="min-h-screen pb-20 md:pb-12 space-y-6">
      {/* Header + Filter */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            ফাইন্যান্সিয়াল রিপোর্ট
          </h1>
          <p className="text-muted-foreground">
            তোমার অর্থের পুরো ছবি এক জায়গায়
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 bg-muted/40">
            <Filter className="h-4 w-4" />
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="border-0 bg-transparent shadow-none h-7 min-w-[140px] p-0">
                <SelectValue placeholder="সময়কাল" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">এই মাস</SelectItem>
                <SelectItem value="last-3">গত ৩ মাস</SelectItem>
                <SelectItem value="this-year">এই বছর</SelectItem>
                <SelectItem value="all-time">সব সময়</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> এক্সপোর্ট
          </Button>
        </div>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportStatCard
          title="নেট ওয়ার্থ"
          value={158500}
          change="+২৩%"
          trend="up"
          subtitle="বর্তমান"
        />
        <ReportStatCard
          title="সেভিংস রেট"
          value={savingsRate}
          unit="%"
          change="+১৮%"
          trend="up"
          subtitle="এই মাসে"
          variant="blue"
        />
        <ReportStatCard
          title="মাসিক আয়"
          value={currentMonth.income}
          change={`${incomeGrowth > 0 ? "+" : ""}${incomeGrowth}%`}
          trend={incomeGrowth > 0 ? "up" : "down"}
          subtitle="vs গত মাস"
          variant="emerald"
        />
        <ReportStatCard
          title="মাসিক ব্যয়"
          value={currentMonth.expense}
          change="-৩৫%"
          trend="down"
          subtitle="vs গত মাস"
          variant="orange"
        />
      </div>

      {/* Income vs Expense Chart */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>আয় vs ব্যয় তুলনা</CardTitle>
          <CardDescription>সাম্প্রতিক মাসগুলোতে</CardDescription>
        </CardHeader>
        <CardContent className="h-64 sm:h-80">
          <ResponsiveContainer>
            <ComposedChart data={dummyMonthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: number) => formatBDT(v)} />
              <Legend />
              <Bar
                dataKey="income"
                name="আয়"
                fill={COLORS.income}
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="expense"
                name="ব্যয়"
                fill={COLORS.expense}
                radius={[4, 4, 0, 0]}
              />
              <Line
                type="monotone"
                dataKey="savings"
                name="সেভিংস"
                stroke={COLORS.savings}
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Net Worth Trend */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle>নেট ওয়ার্থের ধারা</CardTitle>
          <CardDescription>সময়ের সাথে বৃদ্ধি</CardDescription>
        </CardHeader>
        <CardContent className="h-64 sm:h-80">
          <ResponsiveContainer>
            <AreaChart data={dummyNetWorthTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatMonth} />
              <YAxis tickFormatter={(v) => `৳${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(v: number) => formatBDT(v)}
                labelFormatter={formatMonth}
              />
              <Area
                type="monotone"
                dataKey="netWorth"
                stroke="#8b5cf6"
                fill="#8b5cf620"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights / Alerts */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" /> স্মার্ট ইনসাইট
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {dummyInsights.map((insight, i) => (
            <div
              key={i}
              className={cn(
                "flex items-start gap-3 rounded-lg border p-3 text-sm",
                insight.type === "positive" &&
                  "border-emerald-400 bg-emerald-50 dark:bg-emerald-950/30",
                insight.type === "warning" &&
                  "border-amber-400 bg-amber-50 dark:bg-amber-950/30",
              )}
            >
              {insight.type === "positive" ? (
                <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
              )}
              <p>{insight.message}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Period Selector + Export at bottom too */}
      <div className="flex justify-center md:justify-end">
        <Button variant="outline" className="gap-2 w-full sm:w-auto">
          <Download className="h-4 w-4" /> রিপোর্ট ডাউনলোড করুন (PDF/CSV)
        </Button>
      </div>
    </div>
  );
}

// Reusable Stat Card for Reports
function ReportStatCard({
  title,
  value,
  unit = "",
  change,
  trend,
  subtitle,
  variant = "default",
}: {
  title: string;
  value: number | string;
  unit?: string;
  change: string;
  trend: "up" | "down" | "neutral";
  subtitle: string;
  variant?: "default" | "blue" | "emerald" | "orange";
}) {
  const valueClass = {
    default: "text-2xl md:text-3xl font-bold",
    blue: "text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400",
    emerald:
      "text-2xl md:text-3xl font-bold text-emerald-600 dark:text-emerald-400",
    orange:
      "text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400",
  }[variant];

  const changeColor =
    trend === "up"
      ? "text-emerald-600"
      : trend === "down"
        ? "text-red-600"
        : "text-muted-foreground";

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={valueClass}>
          {typeof value === "number" ? formatBDT(value) : value}
          {unit && <span className="text-xl ml-1">{unit}</span>}
        </div>
        <div className="mt-1 flex items-center gap-2 text-sm">
          <span className={cn("font-medium", changeColor)}>
            {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {change}
          </span>
          <span className="text-muted-foreground">• {subtitle}</span>
        </div>
      </CardContent>
    </Card>
  );
}
