"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
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
import { bn } from "date-fns/locale";

const dummyExpenses = [
  {
    id: "e1",
    date: "2026-03-04",
    category: "খাবার",
    amount: 450,
    note: "দুপুরের খাবার",
  },
  {
    id: "e2",
    date: "2026-03-04",
    category: "যাতায়াত",
    amount: 380,
    note: "উবার",
  },
  {
    id: "e3",
    date: "2026-03-03",
    category: "খাবার",
    amount: 1200,
    note: "গ্রোসারি",
  },
  {
    id: "e4",
    date: "2026-03-03",
    category: "বিল",
    amount: 3200,
    note: "ইন্টারনেট বিল",
  },
  {
    id: "e5",
    date: "2026-03-02",
    category: "শিক্ষা",
    amount: 5000,
    note: "কোর্স পেমেন্ট",
  },
  {
    id: "e6",
    date: "2026-03-01",
    category: "খাবার",
    amount: 2800,
    note: "মাসিক বাজার",
  },
  {
    id: "e7",
    date: "2026-02-28",
    category: "যাতায়াত",
    amount: 1400,
    note: "বাস + রিকশা",
  },
  {
    id: "e8",
    date: "2026-02-15",
    category: "বিনোদন",
    amount: 1800,
    note: "সিনেমা",
  },
  {
    id: "e9",
    date: "2026-04-01",
    category: "খাবার",
    amount: 600,
    note: "রাতের খাবার",
  },
];

const categories = [
  "সব ক্যাটাগরি",
  "খাবার",
  "যাতায়াত",
  "বিল",
  "শিক্ষা",
  "বিনোদন",
  "শপিং",
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function formatDateBD(dateStr: string) {
  const d = new Date(dateStr);
  return format(d, "dd MMM yyyy", { locale: bn });
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
  const [categoryFilter, setCategoryFilter] = useState("সব ক্যাটাগরি");

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
      if (categoryFilter !== "সব ক্যাটাগরি" && exp.category !== categoryFilter)
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

  // Update URL when filters change (optional - for shareable links)
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
      {/* Filters Section */}
      <div className="flex flex-col gap-4 bg-card rounded-2xl p-4 border shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-2xl font-bold">ব্যয় তালিকা</h2>

          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <div className="hidden sm:block">
                <Button className="gap-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700">
                  <Plus className="h-4 w-4" /> নতুন ব্যয় যোগ করুন
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="w-[90%] sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>নতুন খরচ যোগ করুন</DialogTitle>
                <DialogDescription>সঠিক তথ্য দিয়ে সেভ করুন</DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>ক্যাটাগরি</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="বেছে নিন" />
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
                  <Label>পরিমাণ (৳)</Label>
                  <Input type="number" placeholder="0" />
                </div>

                <div className="grid gap-2">
                  <Label>তারিখ</Label>
                  <Input type="date" defaultValue="2026-03-04" />
                </div>

                <div className="grid gap-2">
                  <Label>নোট / বিবরণ</Label>
                  <Textarea placeholder="যেমন: দুপুরের খাবার - কফি শপ" />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAdd(false)}>
                  বাতিল
                </Button>
                <Button onClick={() => setOpenAdd(false)}>
                  ব্যয় যোগ করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filter Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="flex flex-col gap-1">
            <Label className="text-xs">বছর</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger>
                <SelectValue placeholder="বছর" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2025">2025</SelectItem>
                <SelectItem value="2026">2026</SelectItem>
                <SelectItem value="2027">2027</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs">মাস</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger>
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
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs">নির্দিষ্ট তারিখ (ঐচ্ছিক)</Label>
            <Input
              type="number"
              min="1"
              max="31"
              placeholder="দিন (1-31)"
              value={specificDate}
              onChange={(e) => setSpecificDate(e.target.value)}
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label className="text-xs">সার্চ (নোট/ক্যাটাগরি)</Label>
            <Input
              placeholder="যেমন: গ্রোসারি"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        {/* <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm bg-muted/40">
            <Filter className="h-4 w-4" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="border-0 shadow-none p-0 h-auto w-40">
                <SelectValue placeholder="ক্যাটাগরি" />
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

          {(year !== "2026" ||
            month !== "03" ||
            specificDate ||
            searchTerm ||
            categoryFilter !== "সব ক্যাটাগরি") && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setYear("2026");
                setMonth("03");
                setSpecificDate("");
                setSearchTerm("");
                setCategoryFilter("সব ক্যাটাগরি");
              }}
            >
              ফিল্টার রিসেট করুন
            </Button>
          )}
        </div> */}
        <div className="w-[200px] flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
          <Filter className="h-4 w-4" />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="border-0 shadow-none p-0 h-auto w-36">
              <SelectValue placeholder="ক্যাটাগরি" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
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
                <TableHead>তারিখ</TableHead>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead>নোট</TableHead>
                <TableHead className="text-right">পরিমাণ</TableHead>
                <TableHead className="w-24 text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredExpenses.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-8 text-muted-foreground"
                  >
                    কোনো ব্যয় পাওয়া যায়নি। ফিল্টার পরিবর্তন করুন।
                  </TableCell>
                </TableRow>
              ) : (
                filteredExpenses.map((exp) => (
                  <TableRow key={exp.id} className="hover:bg-muted/60">
                    <TableCell className="font-medium">
                      {formatDateBD(exp.date)}
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

      {/* Floating Add Button on Mobile */}
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
