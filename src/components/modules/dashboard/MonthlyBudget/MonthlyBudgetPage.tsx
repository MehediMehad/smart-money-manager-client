"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const currentYear = 2026;
const currentMonth = "03"; // March

// Dummy budget data for March 2026
const dummyBudgets = [
  { category: "খাবার", budget: 12000, spent: 9500, remaining: 2500 },
  { category: "যাতায়াত", budget: 5000, spent: 6200, remaining: -1200 },
  {
    category: "বিল (ইন্টারনেট+বিদ্যুৎ)",
    budget: 6000,
    spent: 4800,
    remaining: 1200,
  },
  { category: "শপিং", budget: 4000, spent: 1800, remaining: 2200 },
  { category: "বিনোদন", budget: 3000, spent: 4200, remaining: -1200 },
  { category: "শিক্ষা", budget: 8000, spent: 3000, remaining: 5000 },
];

function formatBDT(amount: number) {
  return "৳" + Math.abs(amount).toLocaleString("bn-BD");
}

function getStatus(spent: number, budget: number) {
  const percent = (spent / budget) * 100;
  if (percent > 100) return "over";
  if (percent > 80) return "near";
  return "safe";
}

function getStatusBadge(status: string) {
  if (status === "over")
    return <Badge variant="destructive">Over Budget</Badge>;
  if (status === "near")
    return (
      <Badge variant="outline" className="border-amber-500 text-amber-700">
        Near Limit
      </Badge>
    );
  return <Badge variant="secondary">Safe</Badge>;
}

export default function MonthlyBudget() {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());
  const [openEdit, setOpenEdit] = useState<string | null>(null);

  // In real app → fetch based on month/year
  const budgets = dummyBudgets;

  const totalBudget = useMemo(
    () => budgets.reduce((sum, b) => sum + b.budget, 0),
    [budgets],
  );
  const totalSpent = useMemo(
    () => budgets.reduce((sum, b) => sum + b.spent, 0),
    [budgets],
  );
  const totalRemaining = totalBudget - totalSpent;

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* 1. Month Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card rounded-2xl p-4 border shadow-sm">
        <h2 className="text-2xl font-bold">মাসিক বাজেট</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
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
            <SelectTrigger className="w-32">
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
            আপডেট করুন
          </Button>
        </div>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <BudgetSummaryCard
          title="মোট বাজেট"
          value={totalBudget}
          subtitle="এই মাসে"
          variant="emerald"
        />
        <BudgetSummaryCard
          title="মোট খরচ"
          value={totalSpent}
          subtitle="এ পর্যন্ত"
          variant="red"
        />
        <BudgetSummaryCard
          title="বাকি বাজেট"
          value={totalRemaining}
          subtitle={totalRemaining >= 0 ? "অবশিষ্ট" : "অতিরিক্ত খরচ"}
          variant={totalRemaining >= 0 ? "blue" : "destructive"}
        />
      </div>

      {/* 4. Budget List Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>ক্যাটাগরি বাজেট</CardTitle>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead>বাজেট</TableHead>
                <TableHead>খরচ</TableHead>
                <TableHead>বাকি</TableHead>
                <TableHead>অবস্থা</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((item, index) => {
                const status = getStatus(item.spent, item.budget);
                const percent = Math.min(
                  Math.round((item.spent / item.budget) * 100),
                  100,
                );
                const isOver = status === "over";

                return (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {item.category}
                    </TableCell>
                    <TableCell>{formatBDT(item.budget)}</TableCell>
                    <TableCell
                      className={cn(
                        "font-semibold",
                        isOver ? "text-red-600" : "text-foreground",
                      )}
                    >
                      {formatBDT(item.spent)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "font-semibold",
                        isOver ? "text-red-600" : "",
                      )}
                    >
                      {item.remaining >= 0
                        ? formatBDT(item.remaining)
                        : `-${formatBDT(Math.abs(item.remaining))}`}
                    </TableCell>
                    <TableCell>{getStatusBadge(status)}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end pr-2 gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => setOpenEdit(item.category)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Modal (placeholder - same form as add) */}
      <Dialog open={!!openEdit} onOpenChange={() => setOpenEdit(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{openEdit} বাজেট আপডেট করুন</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>বাজেট পরিমাণ (৳)</Label>
              <Input type="number" defaultValue="12000" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(null)}>
              বাতিল
            </Button>
            <Button>আপডেট করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function BudgetSummaryCard({
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
        <div className={`text-2xl font-bold ${colors[variant]}`}>
          {formatBDT(value)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
