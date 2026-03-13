"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ICategory } from "@/types";
import BudgetSummaryCards from "./BudgetSummaryCards";
import DailyBudgetTable from "./DailyBudgetTable";

const dummyDailyBudgets = [
  { category: "খাবার", budget: 800, spent: 650, remaining: 150 },
  { category: "যাতায়াত", budget: 300, spent: 450, remaining: -150 },
  { category: "কফি/স্ন্যাকস", budget: 200, spent: 180, remaining: 20 },
  { category: "বিনোদন", budget: 150, spent: 0, remaining: 150 },
  { category: "অন্যান্য", budget: 100, spent: 120, remaining: -20 },
];

const currentBalance = 12000;

type Props = {
  categories: ICategory[];
};

const DailyBudgetPage = ({ categories }: Props) => {
  const [selectedDate, setSelectedDate] = useState("2026-03-04");

  const dailyBudgets = dummyDailyBudgets;

  const totalBudget = useMemo(
    () => dailyBudgets.reduce((sum, b) => sum + b.budget, 0),
    [dailyBudgets],
  );
  const totalSpent = useMemo(
    () => dailyBudgets.reduce((sum, b) => sum + b.spent, 0),
    [dailyBudgets],
  );
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Date Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card rounded-2xl p-4 border shadow-sm">
        <h2 className="text-2xl font-bold">দৈনিক বাজেট</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-44"
          />
          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700">
            দেখান
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <BudgetSummaryCards
        currentBalance={currentBalance}
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        totalRemaining={totalRemaining}
      />

      {/* Table + Dialogs */}
      <DailyBudgetTable dailyBudgets={dailyBudgets} categories={categories} />
    </div>
  );
};

export default DailyBudgetPage;
