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
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { cn } from "@/lib/utils";

const currentYear = 2026;
const currentMonth = 3; // March

// Dummy data for March 2026
const monthlyData = {
  income: 78000,
  expense: 52000,
  savings: 18000,
  netBalance: 26000,
  topIncomeSource: { name: "বেতন", amount: 50000 },
  highestExpenseCategory: { name: "খাবার", amount: 14000, percent: 27 },
  savingsRate: 23, // %
  healthScore: 82,
  previousMonth: {
    income: 68000,
    expense: 54000,
    savings: 12000,
  },
};

const incomeSources = [
  { name: "বেতন", value: 50000 },
  { name: "ফ্রিল্যান্স", value: 18000 },
  { name: "ব্যবসা", value: 8000 },
  { name: "অন্যান্য", value: 2000 },
];

const expenseCategories = [
  { name: "খাবার", value: 14000 },
  { name: "যাতায়াত", value: 8000 },
  { name: "বিল", value: 12000 },
  { name: "শপিং", value: 9000 },
  { name: "অন্যান্য", value: 9000 },
];

const ieComparison = [
  { name: "Income", amount: monthlyData.income, fill: "#10b981" },
  { name: "Expense", amount: monthlyData.expense, fill: "#ef4444" },
  { name: "Savings", amount: monthlyData.savings, fill: "#3b82f6" },
];

const dailyTrend = [
  { day: "০১", income: 3000, expense: 1800 },
  { day: "০৫", income: 0, expense: 2500 },
  { day: "১০", income: 45000, expense: 12000 },
  { day: "১৫", income: 8000, expense: 6000 },
  { day: "২০", income: 5000, expense: 9000 },
  { day: "২৫", income: 12000, expense: 4000 },
  { day: "৩০", income: 0, expense: 3500 },
];

const goalStatus = [
  { name: "ল্যাপটপ", target: 80000, addedThisMonth: 12000, status: "চলমান" },
  {
    name: "জরুরি তহবিল",
    target: 150000,
    addedThisMonth: 6000,
    status: "চলমান",
  },
  { name: "মোবাইল", target: 65000, addedThisMonth: 0, status: "সম্পন্ন" },
];

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#8b5cf6", "#ec4899"];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

export default function MonthlyReportsPage() {
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(
    currentMonth.toString().padStart(2, "0"),
  );

  // In real app → fetch data based on selectedYear + selectedMonth
  const data = monthlyData; // dummy

  const incomeChange =
    ((data.income - data.previousMonth.income) / data.previousMonth.income) *
    100;
  const expenseChange =
    ((data.expense - data.previousMonth.expense) / data.previousMonth.expense) *
    100;
  const savingsChange =
    ((data.savings - data.previousMonth.savings) / data.previousMonth.savings) *
    100;

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Month Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card rounded-2xl p-4 shadow-sm border">
        <h2 className="text-2xl font-bold">মাসিক রিপোর্ট</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2">
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="মাস" />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <SelectItem key={m} value={m.toString().padStart(2, "0")}>
                    {new Date(2000, m - 1).toLocaleString("bn-BD", {
                      month: "long",
                    })}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-28">
                <SelectValue placeholder="বছর" />
              </SelectTrigger>
              <SelectContent>
                {[2024, 2025, 2026, 2027].map((y) => (
                  <SelectItem key={y} value={y.toString()}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700">
            দেখান
          </Button>

          <Button variant="outline" className="gap-2">
            PDF ডাউনলোড
          </Button>
        </div>
      </div>

      {/* 2. Monthly Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="এই মাসের মোট আয়"
          value={data.income}
          variant="emerald"
        />
        <OverviewCard
          title="এই মাসের মোট ব্যয়"
          value={data.expense}
          variant="red"
        />
        <OverviewCard
          title="এই মাসের সঞ্চয়"
          value={data.savings}
          variant="blue"
        />
        <OverviewCard
          title="নেট ব্যালেন্স"
          value={data.netBalance}
          variant="purple"
        />
      </div>

      {/* 3. Income vs Expense vs Savings Bar Chart */}
      {/* <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>আয় - ব্যয় - সঞ্চয় তুলনা</CardTitle>
        </CardHeader>
        <CardContent className="h-64 sm:h-80">
          <ResponsiveContainer>
            <BarChart data={ieComparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(v: number) => formatBDT(v)} />
              <Legend />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 4. Income Breakdown */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>আয়ের উৎস বণ্টন</CardTitle>
            <CardDescription>
              সবচেয়ে বেশি আয় এসেছে {data.topIncomeSource.name} থেকে
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={incomeSources}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {incomeSources.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatBDT(v)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* 5. Expense Breakdown */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>ব্যয়ের ক্যাটাগরি বণ্টন</CardTitle>
            <CardDescription>
              সবচেয়ে বেশি খরচ {data.highestExpenseCategory.name}-এ
            </CardDescription>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={expenseCategories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {expenseCategories.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatBDT(v)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 7. Monthly Comparison Table */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>গত মাসের তুলনায় পরিবর্তন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <span>আয়</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">{formatBDT(data.income)}</span>
                <div
                  className={cn(
                    "flex items-center text-sm",
                    incomeChange >= 0 ? "text-emerald-600" : "text-red-600",
                  )}
                >
                  {incomeChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(incomeChange).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center border-b pb-3">
              <span>ব্যয়</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">{formatBDT(data.expense)}</span>
                <div
                  className={cn(
                    "flex items-center text-sm",
                    expenseChange <= 0 ? "text-emerald-600" : "text-red-600",
                  )}
                >
                  {expenseChange <= 0 ? (
                    <ArrowDownRight className="h-4 w-4" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4" />
                  )}
                  {Math.abs(expenseChange).toFixed(1)}%
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span>সঞ্চয়</span>
              <div className="flex items-center gap-2">
                <span className="font-bold">{formatBDT(data.savings)}</span>
                <div
                  className={cn(
                    "flex items-center text-sm",
                    savingsChange >= 0 ? "text-emerald-600" : "text-red-600",
                  )}
                >
                  {savingsChange >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(savingsChange).toFixed(1)}%
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 8. Smart Insights */}
      <Card className="rounded-2xl shadow-sm border-emerald-400/40 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" /> স্মার্ট ইনসাইট
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <InsightItem
            text={`আয় গত মাসের তুলনায় ${incomeChange.toFixed(1)}% ${incomeChange >= 0 ? "বেড়েছে" : "কমেছে"}`}
            positive={incomeChange >= 0}
          />
          <InsightItem
            text={`সবচেয়ে বেশি খরচ হয়েছে ${data.highestExpenseCategory.name}-এ (${data.highestExpenseCategory.percent}%)`}
            positive={false}
          />
          <InsightItem
            text={`আয়ের ${data.savingsRate}% সঞ্চয় করেছেন — ${data.savingsRate >= 20 ? "ভালো" : "উন্নতি দরকার"}`}
            positive={data.savingsRate >= 20}
          />
          <InsightItem
            text={`ফাইন্যান্সিয়াল হেলথ স্কোর: ${data.healthScore}/100 (${data.healthScore >= 70 ? "শক্তিশালী" : "মাঝারি"})`}
            positive={data.healthScore >= 70}
          />
        </CardContent>
      </Card>

      {/* 9. Daily Trend (Optional) */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>দৈনিক আয়-ব্যয়ের ধারা</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <LineChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip formatter={(v: number) => formatBDT(v)} />
              <Legend />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                name="আয়"
              />
              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                name="ব্যয়"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* 6. Goal Status This Month */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>এই মাসের সঞ্চয় লক্ষ্য অগ্রগতি</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goalStatus.map((g, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium">{g.name}</p>
                  <p className="text-sm text-muted-foreground">
                    লক্ষ্য: {formatBDT(g.target)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-emerald-600">
                    +{formatBDT(g.addedThisMonth)}
                  </p>
                  <Badge
                    variant={g.status === "সম্পন্ন" ? "default" : "secondary"}
                  >
                    {g.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function OverviewCard({
  title,
  value,
  variant = "default",
}: {
  title: string;
  value: number;
  variant?: "emerald" | "red" | "blue" | "purple" | "default";
}) {
  const colors = {
    default: "text-foreground",
    emerald: "text-emerald-600 dark:text-emerald-400",
    red: "text-red-600 dark:text-red-400",
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`text-2xl font-bold ${colors[variant]}`}>
          {formatBDT(value)}
        </div>
      </CardContent>
    </Card>
  );
}

function InsightItem({ text, positive }: { text: string; positive: boolean }) {
  return (
    <div className="flex items-start gap-3">
      {positive ? (
        <TrendingUp className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
      ) : (
        <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
      )}
      <p className="text-sm">{text}</p>
    </div>
  );
}
