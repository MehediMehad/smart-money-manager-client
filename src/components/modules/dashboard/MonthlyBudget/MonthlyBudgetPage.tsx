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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogDescription } from "@radix-ui/react-dialog";

const currentYear = 2026;
const currentMonth = "03"; // March

// Dummy budget data for March 2026
const dummyBudgets = [
  { category: "Food", budget: 12000, spent: 9500, remaining: 2500 },
  { category: "Transportation", budget: 5000, spent: 6200, remaining: -1200 },
  {
    category: "Bills (Internet + Electricity)",
    budget: 6000,
    spent: 4800,
    remaining: 1200,
  },
  { category: "Shopping", budget: 4000, spent: 1800, remaining: 2200 },
  { category: "Entertainment", budget: 3000, spent: 4200, remaining: -1200 },
  { category: "Education", budget: 8000, spent: 3000, remaining: 5000 },
];

const currentBalance = 50000;

function formatBDT(amount: number) {
  return "৳" + Math.abs(amount).toLocaleString("en-US");
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
  const [openAdd, setOpenAdd] = useState(false);
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
      {/* 1. Month & Year Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card rounded-2xl p-6 border shadow-sm">
        <h2 className="text-xl font-bold tracking-tight">Monthly Budget</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-44 h-11">
              <SelectValue placeholder="Select Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <SelectItem key={m} value={m.toString().padStart(2, "0")}>
                  {new Date(2000, m - 1).toLocaleString("en-US", {
                    month: "long",
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-32 h-11">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {[2025, 2026, 2027, 2028].map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 h-11 px-6">
            Download
          </Button>
        </div>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <BudgetSummaryCard
          title="Current Balance"
          value={currentBalance}
          subtitle="Latest balance"
          variant="emerald"
        />
        <BudgetSummaryCard
          title="Total Budget"
          value={totalBudget}
          subtitle="This month"
          variant="blue"
        />
        <BudgetSummaryCard
          title="Total Spent"
          value={totalSpent}
          subtitle="This month"
          variant="red"
        />
        <BudgetSummaryCard
          title="Remaining Budget"
          value={totalRemaining}
          subtitle={totalRemaining >= 0 ? "Left to spend" : "Overspent"}
          variant={totalRemaining >= 0 ? "purple" : "destructive"}
        />
      </div>

      {/* 3. Budget List Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl">Category Budgets</CardTitle>
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4" /> Add New Budget
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>New Category Budget</DialogTitle>
                <DialogDescription>Set budget for this month</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="transportation">
                        Transportation
                      </SelectItem>
                      <SelectItem value="bills">Bills</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="others">Others</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Budget Amount (৳)</Label>
                  <Input type="number" placeholder="8000" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAdd(false)}>
                  Cancel
                </Button>
                <Button>Save Budget</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Spent</TableHead>
                <TableHead>Remaining</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {budgets.map((item, index) => {
                const status = getStatus(item.spent, item.budget);
                const isOver = status === "over";

                return (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {item.category}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatBDT(item.budget)}
                    </TableCell>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setOpenEdit(item.category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Modal */}
      <Dialog open={!!openEdit} onOpenChange={() => setOpenEdit(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>Update Budget - {openEdit}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Budget Amount (৳)</Label>
              <Input type="number" placeholder="Enter amount" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(null)}>
              Cancel
            </Button>
            <Button>Update Budget</Button>
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
        <div className={`text-3xl font-bold ${colors[variant]}`}>
          {formatBDT(value)}
        </div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
