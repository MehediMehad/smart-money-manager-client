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
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Dummy daily budget data (example for 2026-03-04)
const dummyDailyBudgets = [
  { category: "খাবার", budget: 800, spent: 650, remaining: 150 },
  { category: "যাতায়াত", budget: 300, spent: 450, remaining: -150 },
  { category: "কফি/স্ন্যাকস", budget: 200, spent: 180, remaining: 20 },
  { category: "বিনোদন", budget: 150, spent: 0, remaining: 150 },
  { category: "অন্যান্য", budget: 100, spent: 120, remaining: -20 },
];

const currentBalance = 12000; // আজকের ব্যালেন্স (যেমন monthly থেকে আসতে পারে)

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
  if (status === "over") return <Badge variant="destructive">Over</Badge>;
  if (status === "near")
    return (
      <Badge variant="outline" className="border-amber-500 text-amber-700">
        Near
      </Badge>
    );
  return <Badge variant="secondary">Safe</Badge>;
}

export default function DailyBudget() {
  const [selectedDate, setSelectedDate] = useState("2026-03-04"); // default today
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState<string | null>(null);

  // In real app → fetch based on selectedDate
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
      {/* 1. Date Selector */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card rounded-2xl p-4 border shadow-sm">
        <h2 className="text-2xl font-bold">দৈনিক বাজেট</h2>
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex flex-col gap-1">
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-44"
            />
          </div>

          <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700">
            দেখান
          </Button>
        </div>
      </div>

      {/* 2. Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <BudgetSummaryCard
          title="বর্তমান ব্যালেন্স"
          value={currentBalance}
          subtitle="আজকের শুরুতে"
          variant="emerald"
        />
        <BudgetSummaryCard
          title="দৈনিক বাজেট"
          value={totalBudget}
          subtitle="আজকের জন্য"
          variant="blue"
        />
        <BudgetSummaryCard
          title="খরচ হয়েছে"
          value={totalSpent}
          subtitle={`বাজেটের ${((totalSpent / totalBudget) * 100).toFixed(0)}%`}
          variant="red"
        />
        <BudgetSummaryCard
          title="বাকি আছে"
          value={totalRemaining}
          subtitle={totalRemaining >= 0 ? "অবশিষ্ট" : "অতিরিক্ত খরচ"}
          variant={totalRemaining >= 0 ? "purple" : "destructive"}
        />
      </div>

      {/* 3. Daily Budget Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>আজকের ক্যাটাগরি বাজেট</CardTitle>
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4" /> নতুন ক্যাটাগরি যোগ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>নতুন দৈনিক বাজেট যোগ করুন</DialogTitle>
                <DialogDescription>
                  আজকের জন্য ক্যাটাগরি সেট করুন
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="বেছে নিন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="খাবার">খাবার</SelectItem>
                      <SelectItem value="যাতায়াত">যাতায়াত</SelectItem>
                      <SelectItem value="কফি/স্ন্যাকস">কফি/স্ন্যাকস</SelectItem>
                      <SelectItem value="বিনোদন">বিনোদন</SelectItem>
                      <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>দৈনিক বাজেট (৳)</Label>
                  <Input type="number" placeholder="500" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAdd(false)}>
                  বাতিল
                </Button>
                <Button>সেভ করুন</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead className="text-right">বাজেট</TableHead>
                <TableHead className="text-right">খরচ</TableHead>
                <TableHead className="text-right">বাকি</TableHead>
                <TableHead className="text-center">অবস্থা</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyBudgets.map((item, index) => {
                const status = getStatus(item.spent, item.budget);
                const isOver = status === "over";

                return (
                  <TableRow key={index} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatBDT(item.budget)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold",
                        isOver ? "text-red-600" : "",
                      )}
                    >
                      {formatBDT(item.spent)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold",
                        isOver ? "text-red-600" : "",
                      )}
                    >
                      {item.remaining >= 0
                        ? formatBDT(item.remaining)
                        : `-${formatBDT(Math.abs(item.remaining))}`}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
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

      {/* Edit Modal (placeholder) */}
      <Dialog open={!!openEdit} onOpenChange={() => setOpenEdit(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{openEdit} — দৈনিক বাজেট আপডেট</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>দৈনিক বাজেট (৳)</Label>
              <Input type="number" defaultValue="800" />
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

      {/* Mobile floating add button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-2xl bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
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
