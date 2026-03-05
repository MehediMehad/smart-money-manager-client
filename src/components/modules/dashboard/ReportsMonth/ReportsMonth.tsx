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
const currentMonth = "03"; // March

// Dummy monthly financial data (March 2026)
const monthlyData = {
  income: 78000,
  expense: 52000,
  savings: 18000,
  netBalance: 26000,
  topIncomeSource: { name: "বেতন", amount: 50000 },
  highestExpenseCategory: { name: "খাবার", amount: 14000, percent: 27 },
  savingsRate: 23,
  healthScore: 82,
  previousMonth: { income: 68000, expense: 54000, savings: 12000 },
};

// Dummy budget data (integrated with expense)
const budgetData = [
  { category: "খাবার", budget: 12000, spent: 14000, status: "over" },
  { category: "যাতায়াত", budget: 5000, spent: 4800, status: "safe" },
  { category: "বিল", budget: 6000, spent: 6200, status: "near" },
  { category: "শপিং", budget: 4000, spent: 3200, status: "safe" },
  { category: "বিনোদন", budget: 3000, spent: 4200, status: "over" },
  { category: "শিক্ষা", budget: 8000, spent: 3000, status: "safe" },
];

const incomeSources = [
  { name: "বেতন", value: 50000 },
  { name: "ফ্রিল্যান্স", value: 18000 },
  { name: "ব্যবসা", value: 8000 },
  { name: "অন্যান্য", value: 2000 },
];

const expenseCategories = [
  { name: "খাবার", value: 14000 },
  { name: "যাতায়াত", value: 4800 },
  { name: "বিল", value: 6200 },
  { name: "শপিং", value: 3200 },
  { name: "বিনোদন", value: 4200 },
  { name: "শিক্ষা", value: 3000 },
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

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

export default function MonthlyReportsPage() {
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  // In real app → fetch based on month/year
  const data = monthlyData;
  const budgets = budgetData;

  const totalBudget = useMemo(
    () => budgets.reduce((sum, b) => sum + b.budget, 0),
    [budgets],
  );
  const totalSpent = useMemo(
    () => budgets.reduce((sum, b) => sum + b.spent, 0),
    [budgets],
  );
  const totalRemaining = totalBudget - totalSpent;

  const incomeChange =
    ((data.income - data.previousMonth.income) / data.previousMonth.income) *
    100;
  const expenseChange =
    ((data.expense - data.previousMonth.expense) / data.previousMonth.expense) *
    100;
  const savingsChange =
    ((data.savings - data.previousMonth.savings) / data.previousMonth.savings) *
    100;

  const chartData = budgets.map((b) => ({
    category: b.category,
    budget: b.budget,
    spent: b.spent,
  }));
  return (
    <div className="space-y-6 pb-12">
      {/* Month Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card rounded-2xl p-4 shadow-sm border">
        <h2 className="text-2xl font-bold">
          মাসিক রিপোর্ট (
          {new Date(2000, Number(selectedMonth) - 1).toLocaleString("bn-BD", {
            month: "long",
          })}{" "}
          {selectedYear})
        </h2>
        <div className="flex flex-wrap gap-3 items-center">
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
              {[2025, 2026, 2027].map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700">
            দেখান
          </Button>

          <Button variant="outline" className="gap-2">
            PDF ডাউনলোড
          </Button>
        </div>
      </div>

      {/* 4 Main Summary Cards (আয়, খরচ, সঞ্চয়, বাকি বাজেট) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <OverviewCard
          title="মোট আয়"
          value={data.income}
          subtitle="এই মাসে"
          variant="emerald"
        />
        <OverviewCard
          title="খরচ হয়েছে"
          value={totalSpent}
          subtitle={`বাজেটের ${((totalSpent / totalBudget) * 100).toFixed(0)}%`}
          variant="red"
        />
        <OverviewCard
          title="সঞ্চয়"
          value={data.savings}
          subtitle="এই মাসে"
          variant="blue"
        />
        <OverviewCard
          title="বাকি বাজেট"
          value={totalRemaining}
          subtitle={totalRemaining >= 0 ? "অবশিষ্ট" : "অতিরিক্ত খরচ"}
          variant={totalRemaining >= 0 ? "purple" : "destructive"}
        />
      </div>

      {/* Budget vs Actual Bar Chart */}
      {/* <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>বাজেট বনাম প্রকৃত খরচ</CardTitle>
          <CardDescription>
            ক্যাটাগরি অনুযায়ী তুলনা (Over budget লাল রঙে)
          </CardDescription>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer>
            <BarChart
              data={budgetVsActual}
              margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis />
              <Tooltip formatter={(v: number) => formatBDT(v)} />
              <Legend />
              <Bar
                dataKey="budget"
                name="বাজেট"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="spent"
                name="খরচ"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card> */}

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>বাজেট বনাম খরচ তুলনা</CardTitle>
          <CardDescription>ক্যাটাগরি অনুযায়ী</CardDescription>
        </CardHeader>
        <CardContent className="h-64 sm:h-80">
          <ResponsiveContainer>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="category"
                angle={-45}
                textAnchor="end"
                height={70}
                interval={0}
              />
              <YAxis />
              <Tooltip formatter={(v: number) => formatBDT(v)} />
              <Legend />
              <Bar
                dataKey="budget"
                name="বাজেট"
                fill="#3b82f6"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="spent"
                name="খরচ"
                fill="#ef4444"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Income & Expense Breakdown */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>আয়ের উৎস বণ্টন</CardTitle>
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

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>ব্যয়ের ক্যাটাগরি বণ্টন</CardTitle>
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

      {/* Smart Insights */}
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
            text={`খরচ গত মাসের তুলনায় ${Math.abs(expenseChange).toFixed(1)}% ${expenseChange <= 0 ? "কমেছে" : "বেড়েছে"}`}
            positive={expenseChange <= 0}
          />
          <InsightItem
            text={`বাজেটের ${((totalSpent / totalBudget) * 100).toFixed(0)}% খরচ হয়েছে — ${totalRemaining >= 0 ? "নিয়ন্ত্রণে" : "সতর্কতা দরকার"}`}
            positive={totalRemaining >= 0}
          />
          <InsightItem
            text={`${budgetData.filter((b) => b.status === "over").length} টি ক্যাটাগরি বাজেট অতিক্রম করেছে`}
            positive={false}
          />
        </CardContent>
      </Card>

      {/* Daily Trend + Goal Status */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>দৈনিক আয়-ব্যয়</CardTitle>
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

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>এই মাসের লক্ষ্য অগ্রগতি</CardTitle>
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
    </div>
  );
}

// Reusable components
function OverviewCard({
  title,
  value,
  subtitle,
  variant = "default",
}: {
  title: string;
  value: number;
  subtitle: string;
  variant?: "emerald" | "red" | "blue" | "purple" | "destructive" | "default";
}) {
  const colors = {
    default: "text-foreground",
    emerald: "text-emerald-600 dark:text-emerald-400",
    red: "text-red-600 dark:text-red-400",
    blue: "text-blue-600 dark:text-blue-400",
    purple: "text-purple-600 dark:text-purple-400",
    destructive: "text-destructive",
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`text-2xl font-bold ${colors[variant] || "text-foreground"}`}
        >
          {formatBDT(value)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
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
