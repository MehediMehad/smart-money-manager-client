"use client";

import { useState, useMemo } from "react";
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
];

const categorySummaryDummy = [
  { name: "খাবার", value: 9450, budget: 8000 },
  { name: "যাতায়াত", value: 3580, budget: 4000 },
  { name: "বিল", value: 3200, budget: 5000 },
  { name: "শিক্ষা", value: 5000, budget: 10000 },
  { name: "বিনোদন", value: 1800, budget: 3000 },
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function formatDateBD(dateStr: string) {
  const d = new Date(dateStr);
  return format(d, "dd MMM", { locale: bn });
}

// const [openAdd, setOpenAdd] = useState(false);
// const [categoryFilter, setCategoryFilter] = useState("all");
// const [searchNote, setSearchNote] = useState("");

// const filteredExpenses = useMemo(() => {
//   return dummyExpenses.filter((exp) => {
//     const matchCategory =
//       categoryFilter === "all" || exp.category === categoryFilter;
//     const matchSearch =
//       searchNote === "" ||
//       exp.note.toLowerCase().includes(searchNote.toLowerCase());
//     return matchCategory && matchSearch;
//   });
// }, [categoryFilter, searchNote]);

const ExpenseTable = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-5">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
            <Filter className="h-4 w-4" />
            {/* <Select value={categoryFilter} onValueChange={setCategoryFilter}> */}
            <Select>
              <SelectTrigger className="border-0 shadow-none p-0 h-auto w-36">
                <SelectValue placeholder="ক্যাটাগরি" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ক্যাটাগরি</SelectItem>
                {categorySummaryDummy.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* <Input
            placeholder="নোট সার্চ করুন..."
            className="max-w-xs"
            // value={searchNote}
            // onChange={(e) => setSearchNote(e.target.value)}
          /> */}
        </div>

        {/* <Dialog open={openAdd} onOpenChange={setOpenAdd}> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-orange-600 to-rose-600 hover:from-orange-700 hover:to-rose-700">
              <Plus className="h-4 w-4" /> নতুন ব্যয় যোগ করুন
            </Button>
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
                    {categorySummaryDummy.map((c) => (
                      <SelectItem key={c.name} value={c.name}>
                        {c.name}
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
              <Button
                className="mt-2 sm:mt-0"
                variant="outline"
                // onClick={() => setOpenAdd(false)}
              >
                বাতিল
              </Button>
              {/* <Button onClick={() => setOpenAdd(false)}>ব্যয় যোগ করুন</Button> */}
              <Button>ব্যয় যোগ করুন</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Expense Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>তারিখ</TableHead>
              <TableHead>ক্যাটাগরি</TableHead>
              <TableHead>নোট</TableHead>
              <TableHead className="text-right">পরিমাণ</TableHead>
              <TableHead className="w-20 text-right">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyExpenses.map((exp) => (
              <TableRow key={exp.id} className="hover:bg-muted/60">
                <TableCell className="font-medium">
                  {formatDateBD(exp.date)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{exp.category}</Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
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
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};

export default ExpenseTable;
