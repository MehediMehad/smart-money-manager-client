"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  ArrowUpRight,
  ArrowDownRight,
  Utensils,
  Bus,
  DollarSign,
  PiggyBank,
  AlertTriangle,
  CheckCircle2,
  CalendarClock,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Dummy data for today (2026-03-08)
const todayData = {
  date: "৮ মার্চ ২০২৬",
  income: 2500,
  expense: 1200,
  budgetRemaining: 800,
  savingsAdded: 300,
  dailyBudget: 2000,
  dailySpentPercent: 60,
  status: "good", // "good" | "warning" | "danger"
};

const todayTransactions = [
  {
    time: "১০:৩০ AM",
    type: "income",
    category: "ফ্রিল্যান্স",
    amount: 1500,
    note: "Upwork",
  },
  {
    time: "০১:০০ PM",
    type: "expense",
    category: "খাবার",
    amount: 200,
    note: "দুপুরের খাবার",
  },
  {
    time: "০৪:০০ PM",
    type: "expense",
    category: "যাতায়াত",
    note: "উবার",
    amount: 100,
  },
  {
    time: "০৪:০০ PM",
    type: "expense",
    category: "যাতায়াত",
    amount: 100,
    note: "উবার",
  },
  {
    time: "০৭:৩০ PM",
    type: "savings",
    category: "সঞ্চয়",
    note: "সঞ্চয়ে ৳৩০০ যোগ করা",
    amount: 300,
  },
];

const quickActions = [
  { label: "আয় যোগ করুন", icon: ArrowUpRight, color: "emerald" },
  { label: "ব্যয় যোগ করুন", icon: ArrowDownRight, color: "rose" },
  { label: "সঞ্চয় যোগ করুন", icon: PiggyBank, color: "blue" },
  { label: "ধার/দেনা যোগ করুন", icon: CalendarClock, color: "amber" },
];

const reminders = [
  { text: "আজ সঞ্চয়ে ৳৩০০ যোগ করার পরিকল্পনা", type: "reminder" },
  { text: "আগামীকাল ধার পরিশোধ: ৳১০০০", type: "alert" },
  { text: "মাসিক বাজেট চেক করুন", type: "info" },
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

export default function TodayUpdate() {
  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Page Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">
          আজকের আর্থিক আপডেট
        </h1>
      </div>

      {/* Today's Financial Status */}
      <Card
        className={`rounded-2xl shadow-sm border-2 ${(todayData.status === "good") === true ? "border-emerald-500" : ""}`} //border-emerald-500
      >
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            {todayData.status === "good" ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            )}
            <div>
              <h3 className="font-semibold text-lg">
                আজকের আর্থিক অবস্থা:{" "}
                {todayData.status === "good" ? "ভালো 👍" : "সতর্কতা দরকার ⚠"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {todayData.budgetRemaining >= 0
                  ? "আপনি বাজেটের মধ্যে আছেন।"
                  : "আজ বাজেট অতিক্রম হয়েছে।"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* 4. Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <Button
            key={i}
            variant="outline"
            className={cn(
              "h-24 flex flex-col items-center justify-center gap-2 border-2 hover:border-primary/50 transition-colors",
              action.color === "emerald" && "hover:border-emerald-500",
              action.color === "rose" && "hover:border-rose-500",
              action.color === "blue" && "hover:border-blue-500",
              action.color === "amber" && "hover:border-amber-500",
            )}
          >
            <action.icon className="h-6 w-6" />
            <span className="text-sm font-medium">{action.label}</span>
          </Button>
        ))}
      </div>

      {/* 1. Today Summary Cards */}
      {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TodayCard
          title="আজকের মোট আয়"
          value={todayData.income}
          icon={ArrowUpRight}
          color="emerald"
        />
        <TodayCard
          title="আজকের মোট ব্যয়"
          value={todayData.expense}
          icon={ArrowDownRight}
          color="rose"
        />
        <TodayCard
          title="আজকের বাজেট অবশিষ্ট"
          value={todayData.budgetRemaining}
          icon={DollarSign}
          color={todayData.budgetRemaining >= 0 ? "blue" : "destructive"}
        />
        <TodayCard
          title="আজকের সঞ্চয় যোগ"
          value={todayData.savingsAdded}
          icon={PiggyBank}
          color="teal"
        />
      </div> */}

      {/* 3. Daily Budget Progress */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>আজকের বাজেট</CardTitle>
          <CardDescription>
            দৈনিক বাজেট: {formatBDT(todayData.dailyBudget)}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>ব্যয় হয়েছে: {formatBDT(todayData.expense)}</span>
              <span>{todayData.dailySpentPercent}%</span>
            </div>
            <div
              className={cn(
                "h-3 bg-gray-200 rounded-full overflow-hidden",
                todayData.dailySpentPercent > 90
                  ? "bg-red-100"
                  : todayData.dailySpentPercent > 70
                    ? "bg-amber-100"
                    : "bg-emerald-100",
              )}
            >
              <div
                className={cn(
                  "h-full transition-all",
                  todayData.dailySpentPercent > 90
                    ? "bg-red-600"
                    : todayData.dailySpentPercent > 70
                      ? "bg-amber-500"
                      : "bg-emerald-500",
                )}
                style={{ width: `${todayData.dailySpentPercent}%` }}
              />
            </div>
          </div>

          {todayData.dailySpentPercent > 70 && (
            <div className="flex items-center gap-2 text-sm text-amber-700 bg-amber-50 p-3 rounded-lg">
              <AlertTriangle className="h-4 w-4" />
              <p>
                বাজেটের {todayData.dailySpentPercent}% ইতিমধ্যে ব্যয় হয়েছে।
                সতর্ক থাকুন।
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 2. Today Transactions */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>আজকের লেনদেন</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {todayTransactions.map((tx, i) => (
              <div
                key={i}
                className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "p-2 rounded-full",
                      tx.type === "income"
                        ? "bg-emerald-100 text-emerald-700"
                        : tx.type === "expense"
                          ? "bg-rose-100 text-rose-700"
                          : "bg-teal-100 text-teal-700",
                    )}
                  >
                    {tx.type === "income" ? (
                      <ArrowUpRight className="h-4 w-4" />
                    ) : tx.type === "expense" ? (
                      <ArrowDownRight className="h-4 w-4" />
                    ) : (
                      <DollarSign className="h-4 w-4" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{tx.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {tx.time} • {tx.note}{" "}
                    </p>
                  </div>
                </div>
                <p
                  className={cn(
                    "font-semibold",
                    tx.type === "income"
                      ? "text-emerald-600"
                      : tx.type === "expense"
                        ? "text-rose-600"
                        : "text-teal-600",
                  )}
                >
                  {tx.type === "income"
                    ? "+"
                    : tx.type === "expense"
                      ? "-"
                      : "+"}
                  {formatBDT(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 5. Upcoming Reminders */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>আজকের গুরুত্বপূর্ণ স্মরণিকা</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {reminders.map((rem, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border p-3 bg-muted/30"
            >
              {rem.type === "alert" && (
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              )}
              {rem.type === "reminder" && (
                <CalendarClock className="h-5 w-5 text-blue-600" />
              )}
              {rem.type === "info" && (
                <TrendingUp className="h-5 w-5 text-emerald-600" />
              )}
              <p className="text-sm">{rem.text}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

function TodayCard({
  title,
  value,
  icon: Icon,
  color = "foreground",
}: {
  title: string;
  value: number;
  icon: any;
  color?: string;
}) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold mt-1">{formatBDT(value)}</p>
          </div>
          <div
            className={cn(
              "p-3 rounded-full",
              color === "emerald" && "bg-emerald-100 text-emerald-700",
              color === "rose" && "bg-rose-100 text-rose-700",
              color === "blue" && "bg-blue-100 text-blue-700",
              color === "teal" && "bg-teal-100 text-teal-700",
              color === "destructive" && "bg-red-100 text-red-700",
              color === "purple" && "bg-purple-100 text-purple-700",
            )}
          >
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
