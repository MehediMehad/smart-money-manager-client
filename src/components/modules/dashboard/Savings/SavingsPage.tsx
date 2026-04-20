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
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, AlertTriangle, Trophy, LineChart } from "lucide-react";
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";
import Link from "next/link";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const savingsGoals = [
  {
    id: "1",
    name: "New Laptop 💻",
    target: 80000,
    saved: 32000,
    deadline: "2026-07-15",
  },
  {
    id: "2",
    name: "Emergency Fund 🏦",
    target: 150000,
    saved: 98000,
    deadline: "2026-12-31",
  },
  {
    id: "3",
    name: "International Trip ✈️",
    target: 250000,
    saved: 45000,
    deadline: "2027-04-01",
  },
  {
    id: "4",
    name: "New Smartphone 📱",
    target: 65000,
    saved: 62000,
    deadline: "2026-05-20",
  },
];

const monthlySavingsTrend = [
  { month: "Oct", saved: 12000 },
  { month: "Nov", saved: 18000 },
  { month: "Dec", saved: 22000 },
  { month: "Jan", saved: 15000 },
  { month: "Feb", saved: 28000 },
  { month: "Mar", saved: 34000 },
  { month: "April", saved: 90000 },
];

function daysLeft(deadline: string) {
  const d = new Date(deadline);
  const today = new Date("2026-03-04"); // You can make this dynamic later
  const diff = d.getTime() - today.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function dailyRequired(target: number, saved: number, deadline: string) {
  const days = daysLeft(deadline);
  if (days <= 0) return 0;
  return Math.ceil((target - saved) / days);
}

export default function SavingsDashboard() {
  const [openAddGoal, setOpenAddGoal] = useState(false);

  const totalSaved = useMemo(
    () => savingsGoals.reduce((sum, g) => sum + g.saved, 0),
    [],
  );
  const activeGoals = savingsGoals.filter((g) => g.saved < g.target).length;
  const completedGoals = savingsGoals.filter((g) => g.saved >= g.target).length;
  const thisMonthSaved =
    monthlySavingsTrend[monthlySavingsTrend.length - 1]?.saved || 0;

  const urgentGoals = savingsGoals
    .filter((g) => g.saved < g.target)
    .filter((g) => daysLeft(g.deadline) <= 30 && daysLeft(g.deadline) > 0);

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Saved"
          value={totalSaved}
          subtitle="Across all goals"
          variant="emerald"
        />
        <StatCard
          title="Active Goals"
          value={activeGoals}
          subtitle="In progress"
        />
        <StatCard
          title="Completed Goals"
          value={completedGoals}
          subtitle="Achieved 🎉"
          variant="purple"
        />
        <StatCard
          title="Saved This Month"
          value={thisMonthSaved}
          subtitle="March 2026"
          variant="blue"
        />
      </div>

      {/* Urgent Deadline Alerts */}
      {urgentGoals.length > 0 && (
        <Card className="rounded-2xl border-amber-400/50 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" /> Urgent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {urgentGoals.map((g) => (
              <div
                key={g.id}
                className="flex items-center justify-between rounded-lg border bg-background/60 p-3 text-sm"
              >
                <div>
                  <p className="font-medium">{g.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {daysLeft(g.deadline)} days left until deadline
                  </p>
                </div>
                <p className="font-semibold text-amber-600">
                  Daily needed: {dailyRequired(g.target, g.saved, g.deadline)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Active Goals */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">Active Savings Goals</h3>
          <Dialog open={openAddGoal} onOpenChange={setOpenAddGoal}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-emerald-700 to-teal-600">
                <Plus className="h-4 w-4" /> New Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>Create New Savings Goal</DialogTitle>
                <DialogDescription>
                  Plan for your dreams and financial targets
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Goal Name</Label>
                  <Input placeholder="e.g. New Laptop" />
                </div>
                <div className="grid gap-2">
                  <Label>Target Amount (৳)</Label>
                  <Input type="number" placeholder="80000" />
                </div>
                <div className="grid gap-2">
                  <Label>Deadline</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>Note (Optional)</Label>
                  <Input placeholder="Additional details..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAddGoal(false)}>
                  Cancel
                </Button>
                <Button>Create Goal</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savingsGoals.map((goal) => {
            const percent = Math.min(
              Math.round((goal.saved / goal.target) * 100),
              100,
            );
            const remaining = goal.target - goal.saved;
            const days = daysLeft(goal.deadline);
            const dailyNeed = dailyRequired(
              goal.target,
              goal.saved,
              goal.deadline,
            );
            const isCompleted = percent >= 100;

            return (
              <Link key={goal.id} href={`/dashboard/savings/${goal.id}`}>
                <Card
                  className={cn(
                    "rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden",
                    isCompleted &&
                      "border-2 border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20",
                  )}
                >
                  <CardContent className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-lg">{goal.name}</h4>
                      {isCompleted && (
                        <Trophy className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span className="font-medium">{percent}%</span>
                      </div>
                      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${
                            isCompleted ? "bg-yellow-500" : "bg-emerald-600"
                          }`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Saved</p>
                        <p className="font-bold text-emerald-600">
                          {goal.saved}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Remaining</p>
                        <p className="font-bold">{remaining}</p>
                      </div>
                    </div>

                    <div className="text-xs space-y-1 pt-2 border-t">
                      <p>
                        Deadline:{" "}
                        {format(new Date(goal.deadline), "dd MMM yyyy")}
                      </p>
                      {days > 0 && !isCompleted && (
                        <p
                          className={
                            days < 15 ? "text-amber-600 font-medium" : ""
                          }
                        >
                          Daily required: {dailyNeed}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Savings Growth Chart */}
      {/* Savings Growth Chart - Beautiful Version */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <LineChart className="h-5 w-5 text-emerald-600" />
                Savings Growth
              </CardTitle>
              <CardDescription className="mt-1">
                Monthly savings trend • March 2026
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">This Month</p>
              <p className="text-2xl font-semibold text-emerald-600">
                ৳
                {monthlySavingsTrend[
                  monthlySavingsTrend.length - 1
                ]?.saved.toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="h-80 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLine data={monthlySavingsTrend}>
              <defs>
                <linearGradient
                  id="savingsGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
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
                  `৳${value.toLocaleString("en-US")}`,
                  "Saved",
                ]}
                labelStyle={{ color: "#374151", fontWeight: 600 }}
              />

              {/* Gradient Area */}
              <Area
                type="natural" // Smooth natural curve
                dataKey="saved"
                stroke="none"
                fill="url(#savingsGradient)"
              />

              {/* Main Line */}
              <Line
                type="natural"
                dataKey="saved"
                stroke="#10b981"
                strokeWidth={4}
                dot={{
                  fill: "#10b981",
                  strokeWidth: 3,
                  stroke: "#fff",
                  r: 6,
                }}
                activeDot={{
                  r: 8,
                  fill: "#10b981",
                  stroke: "#fff",
                  strokeWidth: 3,
                }}
              />
            </RechartsLine>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Mobile floating add button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600"
          onClick={() => setOpenAddGoal(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  variant = "default",
}: {
  title: string;
  value: number | string;
  subtitle: string;
  variant?: string;
}) {
  const colors = {
    default: "text-foreground",
    emerald: "text-emerald-600 dark:text-emerald-400",
    purple: "text-purple-600 dark:text-purple-400",
    blue: "text-blue-600 dark:text-blue-400",
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
          className={`text-2xl font-bold ${colors[variant as keyof typeof colors] || ""}`}
        >
          {typeof value === "number" ? value : value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
