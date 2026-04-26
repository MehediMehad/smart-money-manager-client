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
  date: "March 8, 2026",
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
    time: "10:30 AM",
    type: "income",
    category: "Freelance",
    amount: 1500,
    note: "Upwork",
  },
  {
    time: "01:00 PM",
    type: "expense",
    category: "Food",
    amount: 200,
    note: "Lunch",
  },
  {
    time: "04:00 PM",
    type: "expense",
    category: "Transport",
    note: "Uber",
    amount: 100,
  },
  {
    time: "04:00 PM",
    type: "expense",
    category: "Transport",
    amount: 100,
    note: "Uber",
  },
  {
    time: "07:30 PM",
    type: "savings",
    category: "Savings",
    note: "Added ৳300 to savings",
    amount: 300,
  },
];

const quickActions = [
  { label: "Add Income", icon: ArrowUpRight, color: "emerald" },
  { label: "Add Expense", icon: ArrowDownRight, color: "rose" },
  { label: "Add Savings", icon: PiggyBank, color: "blue" },
  { label: "Add Loan/Debt", icon: CalendarClock, color: "amber" },
];

const reminders = [
  { text: "Plan to add ৳300 to savings today", type: "reminder" },
  { text: "Debt repayment tomorrow: ৳1000", type: "alert" },
  { text: "Check monthly budget", type: "info" },
];

export default function TodayUpdate() {
  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Page Header */}
      <div className="text-center sm:text-left">
        <h1 className="text-3xl font-bold tracking-tight">
          Today's Financial Update
        </h1>
      </div>

      {/* Today's Financial Status */}
      <Card
        className={`rounded-2xl shadow-sm border-2 ${
          todayData.status === "good" ? "border-emerald-500" : ""
        }`}
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
                Today's Financial Status:{" "}
                {todayData.status === "good" ? "Good 👍" : "Needs Attention ⚠"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {todayData.budgetRemaining >= 0
                  ? "You are within budget."
                  : "Budget exceeded today."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
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

      {/* Daily Budget */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Today's Budget</CardTitle>
          <CardDescription>
            Daily Budget: {todayData.dailyBudget}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Spent: {todayData.expense}</span>
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
                {todayData.dailySpentPercent}% of your budget is already spent.
                Stay cautious.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>Today's Transactions</CardTitle>
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
                      {tx.time} • {tx.note}
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
                  {tx.amount}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reminders */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Important Reminders</CardTitle>
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
