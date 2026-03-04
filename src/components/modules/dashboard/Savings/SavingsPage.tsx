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
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Target, AlertTriangle, Trophy, LineChart } from "lucide-react";
import {
  LineChart as RechartsLine,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { cn } from "@/lib/utils";

const savingsGoals = [
  {
    id: "1",
    name: "নতুন ল্যাপটপ 💻",
    target: 80000,
    saved: 32000,
    deadline: "2026-07-15",
    note: "M3 MacBook Pro",
  },
  {
    id: "2",
    name: "জরুরি তহবিল 🏦",
    target: 150000,
    saved: 98000,
    deadline: "2026-12-31",
    note: "৬ মাসের খরচ",
  },
  {
    id: "3",
    name: "বিদেশ ভ্রমন ✈️",
    target: 250000,
    saved: 45000,
    deadline: "2027-04-01",
    note: "থাইল্যান্ড + মালয়েশিয়া",
  },
  {
    id: "4",
    name: "নতুন মোবাইল 📱",
    target: 65000,
    saved: 62000,
    deadline: "2026-05-20",
    note: "iPhone 16 Pro",
  },
];

const monthlySavingsTrend = [
  { month: "অক্টো", saved: 12000 },
  { month: "নভে", saved: 18000 },
  { month: "ডিসে", saved: 22000 },
  { month: "জানু", saved: 15000 },
  { month: "ফেব্রু", saved: 28000 },
  { month: "মার্চ", saved: 34000 },
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function daysLeft(deadline: string) {
  const d = new Date(deadline);
  const today = new Date("2026-03-04"); // current date from context
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
          title="মোট সঞ্চয়"
          value={totalSaved}
          subtitle="সব লক্ষ্য মিলিয়ে"
          variant="emerald"
        />
        <StatCard title="চলমান লক্ষ্য" value={activeGoals} subtitle="সক্রিয়" />
        <StatCard
          title="সম্পন্ন লক্ষ্য"
          value={completedGoals}
          subtitle="অর্জিত 🎉"
          variant="purple"
        />
        <StatCard
          title="এই মাসে সেভ"
          value={thisMonthSaved}
          subtitle="মার্চ ২০২৬"
          variant="blue"
        />
      </div>

      {/* Urgent Deadline Alerts */}
      {urgentGoals.length > 0 && (
        <Card className="rounded-2xl border-amber-400/50 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" /> জরুরি সতর্কতা
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
                    ডেডলাইন বাকি {daysLeft(g.deadline)} দিন
                  </p>
                </div>
                <p className="font-semibold text-amber-600">
                  দৈনিক দরকার:{" "}
                  {formatBDT(dailyRequired(g.target, g.saved, g.deadline))}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Active Goals */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-semibold">চলমান লক্ষ্যসমূহ</h3>
          <Dialog open={openAddGoal} onOpenChange={setOpenAddGoal}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                <Plus className="h-4 w-4" /> নতুন লক্ষ্য
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>নতুন সঞ্চয় লক্ষ্য</DialogTitle>
                <DialogDescription>
                  আপনার স্বপ্নের জন্য পরিকল্পনা করুন
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>লক্ষ্যের নাম</Label>
                  <Input placeholder="যেমন: নতুন ল্যাপটপ" />
                </div>
                <div className="grid gap-2">
                  <Label>লক্ষ্য পরিমাণ (৳)</Label>
                  <Input type="number" placeholder="80000" />
                </div>
                <div className="grid gap-2">
                  <Label>সময়সীমা</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>নোট (ঐচ্ছিক)</Label>
                  <Input placeholder="বিস্তারিত..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAddGoal(false)}>
                  বাতিল
                </Button>
                <Button>লক্ষ্য তৈরি করুন</Button>
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
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-lg">{goal.name}</h4>
                      {isCompleted && (
                        <Trophy className="h-6 w-6 text-yellow-500" />
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">অগ্রগতি</span>
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
                        <p className="text-muted-foreground">সঞ্চিত</p>
                        <p className="font-bold text-emerald-600">
                          {formatBDT(goal.saved)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">বাকি</p>
                        <p className="font-bold">{formatBDT(remaining)}</p>
                      </div>
                    </div>

                    <div className="text-xs space-y-1 pt-2 border-t">
                      <p>
                        সময়সীমা:{" "}
                        {format(new Date(goal.deadline), "dd MMM yyyy", {
                          locale: bn,
                        })}
                      </p>
                      {days > 0 && !isCompleted && (
                        <p
                          className={
                            days < 15 ? "text-amber-600 font-medium" : ""
                          }
                        >
                          দৈনিক দরকার: {formatBDT(dailyNeed)}
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
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5" /> সঞ্চয়ের বৃদ্ধি
          </CardTitle>
          <CardDescription>মাসভিত্তিক সেভিংস ট্রেন্ড</CardDescription>
        </CardHeader>
        <CardContent className="h-64 sm:h-72">
          <ResponsiveContainer>
            <RechartsLine data={monthlySavingsTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(v: number) => formatBDT(v)} />
              <Line
                type="monotone"
                dataKey="saved"
                stroke="#10b981"
                strokeWidth={2.5}
                dot={{ r: 4 }}
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
          {typeof value === "number" ? formatBDT(value) : value}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
