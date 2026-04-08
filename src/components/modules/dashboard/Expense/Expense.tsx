"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, Filter } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";

const dummyExpenses = [
  {
    id: "e1",
    date: "2026-03-04",
    category: "Food",
    amount: 450,
    note: "Lunch at restaurant",
  },
  {
    id: "e2",
    date: "2026-03-04",
    category: "Transport",
    amount: 380,
    note: "Uber ride",
  },
  {
    id: "e3",
    date: "2026-03-03",
    category: "Food",
    amount: 1200,
    note: "Grocery shopping",
  },
  {
    id: "e4",
    date: "2026-03-03",
    category: "Bills",
    amount: 3200,
    note: "Internet bill",
  },
  {
    id: "e5",
    date: "2026-03-02",
    category: "Education",
    amount: 5000,
    note: "Course payment",
  },
  {
    id: "e6",
    date: "2026-03-01",
    category: "Food",
    amount: 2800,
    note: "Monthly grocery",
  },
  {
    id: "e7",
    date: "2026-02-28",
    category: "Transport",
    amount: 1400,
    note: "Bus + Rickshaw",
  },
  {
    id: "e8",
    date: "2026-02-15",
    category: "Entertainment",
    amount: 1800,
    note: "Movie ticket",
  },
  {
    id: "e9",
    date: "2026-04-01",
    category: "Food",
    amount: 600,
    note: "Dinner",
  },
];

const categories = [
  "All Categories",
  "Food",
  "Transport",
  "Bills",
  "Education",
  "Entertainment",
  "Shopping",
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("en-US");
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return format(d, "dd MMM yyyy", { locale: enUS });
}

export default function ExpensePage() {
  const searchParams = useSearchParams();

  // Read initial values from URL query params
  const initialYear = searchParams.get("year") || "2026";
  const initialMonth = searchParams.get("month")?.padStart(2, "0") || "03";
  const initialDate = searchParams.get("date") || "";
  const initialSearch = searchParams.get("searchTerm") || "";

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [specificDate, setSpecificDate] = useState(initialDate);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [openAdd, setOpenAdd] = useState(false);

  // Filtered expenses logic
  const filteredExpenses = useMemo(() => {
    return dummyExpenses.filter((exp) => {
      const expDate = new Date(exp.date);
      const expYear = expDate.getFullYear().toString();
      const expMonth = (expDate.getMonth() + 1).toString().padStart(2, "0");
      const expDay = expDate.getDate().toString().padStart(2, "0");

      // Year filter
      if (expYear !== year) return false;

      // Month filter
      if (expMonth !== month) return false;

      // Specific date filter (optional)
      if (specificDate && expDay !== specificDate.padStart(2, "0"))
        return false;

      // Category filter
      if (
        categoryFilter !== "All Categories" &&
        exp.category !== categoryFilter
      )
        return false;

      // Search term in note or category
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          exp.note.toLowerCase().includes(term) ||
          exp.category.toLowerCase().includes(term)
        );
      }

      return true;
    });
  }, [year, month, specificDate, categoryFilter, searchTerm]);

  // Update URL when filters change (for shareable links)
  useEffect(() => {
    const params = new URLSearchParams();
    if (year) params.set("year", year);
    if (month) params.set("month", month);
    if (specificDate) params.set("date", specificDate);
    if (searchTerm) params.set("searchTerm", searchTerm);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, "", newUrl);
  }, [year, month, specificDate, searchTerm]);

  return (
    <div className="space-y-6 pb-20">
      {/* Header & Add Button */}
      <div className="flex flex-col gap-4 bg-card rounded-2xl p-4 border shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">Expense</h2>

          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <div className="hidden sm:block">
                <Button className="gap-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700">
                  <Plus className="h-4 w-4" /> Add New Expense
                </Button>
              </div>
            </DialogTrigger>

            <DialogContent className="max-w-xl rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
                <DialogDescription>
                  Enter accurate details for this expense
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label>Amount (৳)</Label>
                  <Input type="number" placeholder="0" />
                </div>

                <div className="grid gap-2">
                  <Label>Date</Label>
                  <Input type="date" defaultValue="2026-03-04" />
                </div>

                <div className="grid gap-2">
                  <Label>Note / Description</Label>
                  <Textarea placeholder="e.g. Lunch at Coffee Shop" />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAdd(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpenAdd(false)}>Save Expense</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex flex-col gap-1">
            <Label className="text-xs">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs">Month</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Month" />
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
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs">Specific Day (Optional)</Label>
            <Input
              type="number"
              min="1"
              max="31"
              placeholder="Day (1-31)"
              value={specificDate}
              onChange={(e) => setSpecificDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs">Search (Note/Category)</Label>
            <Input
              placeholder="e.g. Grocery"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="w-[200px] flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
          <Filter className="h-4 w-4" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="border-0 shadow-none p-0 h-auto w-36">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Expense Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Note</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="w-24 text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    No expenses found. Try changing the filters.
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((exp) => (
                  <TableRow key={exp.id} className="hover:bg-muted/60">
                    <TableCell className="font-medium">
                      {formatDate(exp.date)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{exp.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-xs truncate">
                      {exp.note}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-destructive">
                      {formatBDT(exp.amount)}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Mobile Floating Add Button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="icon"
          className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
