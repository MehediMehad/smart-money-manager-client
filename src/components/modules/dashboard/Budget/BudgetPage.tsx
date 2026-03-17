"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, Pencil } from "lucide-react";
import BudgetFormModal from "./BudgetFormModal";
import { TBudget } from "@/constants";
import { cn } from "@/lib/utils";
import { TCategory } from "@/types";

interface Props {
  budgets: TBudget[];
  categories: TCategory[];
}

export default function BudgetPage({ budgets, categories }: Props) {
  const [budgetType, setBudgetType] = useState<"DAILY" | "MONTHLY">("DAILY");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "SAFE" | "WARNING" | "OVER"
  >("ALL");

  const getBudgetStatus = (budget: TBudget): "SAFE" | "WARNING" | "OVER" => {
    const spent = budget.spent ?? 0;
    const percent = budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
    if (percent > 100) return "OVER";
    if (percent > 80) return "WARNING";
    return "SAFE";
  };

  const filteredBudgets = budgets.filter((b) => {
    if (b.type !== budgetType) return false;

    if (budgetType === "DAILY" && selectedDate) {
      if (!("date" in b) || b.date !== selectedDate) return false;
    }
    if (budgetType === "MONTHLY" && selectedMonth) {
      if (!("monthYear" in b) || b.monthYear !== selectedMonth) return false;
    }

    if (statusFilter === "ALL") return true;
    return getBudgetStatus(b) === statusFilter;
  });

  const alertBudgets = budgets
    .filter((b) => {
      const status = getBudgetStatus(b);
      return status === "WARNING" || status === "OVER";
    })
    .sort((a, b) => {
      const sa = getBudgetStatus(a);
      const sb = getBudgetStatus(b);
      if (sa === "OVER" && sb !== "OVER") return -1;
      if (sb === "OVER" && sa !== "OVER") return 1;
      return 0;
    });

  const hasActiveFilters =
    selectedDate || selectedMonth || statusFilter !== "ALL";

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📊 Budget Management
          </h1>
          <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
            Set daily and monthly spending limits and track your progress
          </p>
        </div>
        <div className="hidden sm:block">
          <BudgetFormModal mode="create" categories={categories} />
        </div>
      </div>

      {/* Filter Section */}
      <div className="bg-card border rounded-xl p-4 space-y-4 shadow-sm">
        <h3 className="font-medium text-base">Filter & Sort</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-4 items-end">
          <div className="space-y-1.5">
            <Label className="text-sm">Budget Type</Label>
            <div className="flex gap-2">
              <Button
                variant={budgetType === "DAILY" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setBudgetType("DAILY");
                  setSelectedMonth("");
                }}
              >
                Daily
              </Button>
              <Button
                variant={budgetType === "MONTHLY" ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setBudgetType("MONTHLY");
                  setSelectedDate("");
                }}
              >
                Monthly
              </Button>
            </div>
          </div>

          {budgetType === "DAILY" && (
            <div className="space-y-1.5 min-w-[160px]">
              <Label className="text-sm">Select Date</Label>
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="h-9"
              />
            </div>
          )}

          {budgetType === "MONTHLY" && (
            <div className="space-y-1.5 min-w-[160px]">
              <Label className="text-sm">Select Month</Label>
              <Input
                type="month"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="h-9"
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label className="text-sm">Status</Label>
            <Select
              value={statusFilter}
              onValueChange={(v) => setStatusFilter(v as any)}
            >
              <SelectTrigger className="w-[150px] h-9">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Status</SelectItem>
                <SelectItem value="SAFE">🟢 Safe</SelectItem>
                <SelectItem value="WARNING">🟡 Warning</SelectItem>
                <SelectItem value="OVER">🔴 Over Budget</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedDate("");
                setSelectedMonth("");
                setStatusFilter("ALL");
              }}
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Budget Cards Grid */}
      {filteredBudgets.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredBudgets.map((budget) => {
            const spent = budget.spent ?? 0;
            const percent =
              budget.amount > 0 ? (spent / budget.amount) * 100 : 0;
            const percentRounded = Math.round(percent); // for display
            const remaining = budget.amount - spent;

            const isOver = percent > 100;
            const isWarning = percent > 80 && percent <= 100;
            const isSafe = percent <= 80;

            const statusColor = isOver
              ? "bg-red-600"
              : isWarning
                ? "bg-amber-500"
                : "bg-emerald-600";

            const statusBg = isOver
              ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/40"
              : isWarning
                ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40"
                : "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30";

            const statusText = isOver
              ? `Over Budget (${percentRounded}%)`
              : isWarning
                ? `Warning (${percentRounded}%)`
                : `On Track (${percentRounded}%)`;

            return (
              <div key={budget.id} className="block">
                <Card
                  className={cn(
                    "rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border",
                    statusBg,
                    isOver && "border-red-500/50 animate-pulse-subtle", // subtle pulse for over
                    isWarning && "border-amber-500/50",
                    isSafe && "border-emerald-500/50",
                  )}
                >
                  <CardContent className="p-5 space-y-4">
                    {/* Header */}
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold text-lg">
                          {budget.category?.name || "Unnamed Budget"}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {budget.type} Budget
                        </p>
                      </div>

                      {isOver && (
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                      )}
                      {isWarning && (
                        <AlertTriangle className="h-6 w-6 text-amber-500" />
                      )}
                    </div>

                    {/* Progress Bar – allow going beyond 100% visually */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress</span>
                        <span
                          className={`font-medium ${isOver ? "text-red-600" : ""}`}
                        >
                          {percentRounded}%
                        </span>
                      </div>
                      <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${statusColor}`}
                          style={{ width: `${Math.min(percentRounded, 100)}%` }} // cap width at 100% for bar
                        />
                      </div>
                    </div>

                    {/* Amounts */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Budget</p>
                        <p className="font-bold text-emerald-600">
                          {budget.amount.toLocaleString()} BDT
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-muted-foreground">Spent</p>
                        <p
                          className={`font-bold ${isOver ? "text-red-600" : ""}`}
                        >
                          {spent.toLocaleString()} BDT
                        </p>
                      </div>
                    </div>

                    {/* Remaining + Status */}
                    <div className="text-xs space-y-1.5 pt-2 border-t">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Remaining</span>
                        <span
                          className={`font-medium ${remaining < 0 ? "text-red-600" : ""}`}
                        >
                          {remaining.toLocaleString()} BDT
                        </span>
                      </div>

                      <p
                        className={`font-medium ${isOver ? "text-red-600" : isWarning ? "text-amber-600" : "text-emerald-600"}`}
                      >
                        {statusText}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16 text-muted-foreground border rounded-xl bg-card/50">
          <p className="text-lg font-medium">
            {hasActiveFilters
              ? "No budgets match your filters"
              : "No budgets found yet"}
          </p>
          <p className="mt-2">
            {hasActiveFilters
              ? "Try adjusting date/month or status"
              : "Start by adding a daily or monthly budget"}
          </p>
          <div className="mt-6">
            <BudgetFormModal mode="create" categories={categories} />
          </div>
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                setSelectedDate("");
                setSelectedMonth("");
                setStatusFilter("ALL");
              }}
            >
              Reset Filters
            </Button>
          )}
        </div>
      )}

      {/* Alerts */}
      {/* {alertBudgets.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-amber-700 dark:text-amber-500">
            <AlertTriangle className="h-5 w-5" />
            Budget Alerts
          </h2>
          <div className="space-y-2">
            {alertBudgets.map((b) => {
              const status = getBudgetStatus(b);
              const percent = Math.round((b.spent / b.amount) * 100);
              const isOver = status === "OVER";
              const exceeded = Math.round(b.spent - b.amount);

              return (
                <div
                  key={b.id}
                  className={`p-3 rounded-lg border ${
                    isOver
                      ? "bg-red-50 border-red-200 text-red-800 dark:bg-red-950/40 dark:border-red-800/50 dark:text-red-200"
                      : "bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-950/40 dark:border-amber-800/50 dark:text-amber-200"
                  }`}
                >
                  <div className="font-medium flex items-center gap-2">
                    {isOver ? "🔴 Over budget" : "🟡 Warning"} —{" "}
                    {b.category?.name || "Unknown"} ({b.type.toLowerCase()})
                  </div>
                  <div className="text-sm mt-1 opacity-90">
                    {isOver
                      ? `Exceeded by ${exceeded.toLocaleString()} BDT`
                      : `Used ${percent}% (${b.spent.toLocaleString()} / ${b.amount.toLocaleString()} BDT)`}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )} */}

      {/* Mobile FAB */}
      <div className="fixed bottom-10 right-6 z-50 md:hidden">
        <BudgetFormModal mode="create" isIcon categories={categories} />
      </div>
    </div>
  );
}
