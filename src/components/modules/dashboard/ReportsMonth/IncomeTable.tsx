"use client";

import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2, TrendingUp, Filter } from "lucide-react";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

const COLORS = [
  "#10b981",
  "#3b82f6",
  "#f59e0b",
  "#8b5cf6",
  "#ec4899",
  "#f97316",
];

const dummyIncomes = [
  {
    id: "i1",
    date: "2026-03-01",
    source: "বেতন",
    amount: 50000,
    note: "মার্চ মাসের বেতন",
  },
  {
    id: "i2",
    date: "2026-03-03",
    source: "ফ্রিল্যান্সিং",
    amount: 18000,
    note: "Upwork প্রজেক্ট",
  },
  {
    id: "i3",
    date: "2026-02-25",
    source: "ব্যবসা",
    amount: 22000,
    note: "অনলাইন শপ সেল",
  },
  {
    id: "i4",
    date: "2026-02-20",
    source: "বিনিয়োগ",
    amount: 7000,
    note: "ডিভিডেন্ড",
  },
  {
    id: "i5",
    date: "2026-02-15",
    source: "টিউশন",
    amount: 12000,
    note: "দুইজন ছাত্র",
  },
  {
    id: "i6",
    date: "2026-03-04",
    source: "ফ্রিল্যান্সিং",
    amount: 9500,
    note: "ছোট ফিক্স",
  },
];

const sourceSummaryDummy = [
  { name: "বেতন", value: 50000, color: COLORS[0] },
  { name: "ফ্রিল্যান্সিং", value: 27500, color: COLORS[1] },
  { name: "ব্যবসা", value: 22000, color: COLORS[2] },
  { name: "বিনিয়োগ", value: 7000, color: COLORS[3] },
  { name: "টিউশন", value: 12000, color: COLORS[4] },
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function formatDateBD(dateStr: string) {
  const d = new Date(dateStr);
  return format(d, "dd MMM", { locale: bn });
}
// const [openAdd, setOpenAdd] = useState(false);
// const [sourceFilter, setSourceFilter] = useState("all");
// const [searchNote, setSearchNote] = useState("");

// const filteredIncomes = useMemo(() => {
//   return dummyIncomes.filter((item) => {
//     const matchSource = sourceFilter === "all" || item.source === sourceFilter;
//     const matchNote =
//       !searchNote || item.note.toLowerCase().includes(searchNote.toLowerCase());
//     return matchSource && matchNote;
//   });
// }, [sourceFilter, searchNote]);

const IncomeTable = () => {
  return (
    <div className="w-full">
      {/* Filters + Add Button */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-3 md:static md:py-0 mb-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 bg-muted/40">
              <Filter className="h-4 w-4" />
              <Select>
                <SelectTrigger className="border-0 bg-transparent shadow-none h-7 min-w-[130px] p-0">
                  <SelectValue placeholder="উৎস" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">সব উৎস</SelectItem>
                  {sourceSummaryDummy.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <Input
              placeholder="নোট সার্চ..."
              className="max-w-[220px] h-10"
              //   value={searchNote}
              //   onChange={(e) => setSearchNote(e.target.value)}
            /> */}
          </div>

          <Button
            // onClick={() => setOpenAdd(true)}
            className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 sm:w-auto w-full"
          >
            <Plus className="h-4 w-4" /> নতুন আয় যোগ করুন
          </Button>
        </div>
      </div>

      {/* 4. Income History Table */}
      {/* Income History Table */}
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/60">
            <TableRow>
              <TableHead className="">তারিখ</TableHead>
              <TableHead className="">উৎস</TableHead>
              <TableHead className="">নোট</TableHead>
              <TableHead className="text-right">পরিমাণ</TableHead>
              <TableHead className="w-24 text-right">অ্যাকশন</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummyIncomes.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell className="font-medium">
                  {formatDateBD(item.date)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="bg-background">
                    {item.source}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {item.note}
                </TableCell>
                <TableCell className="text-right font-semibold text-emerald-600">
                  {formatBDT(item.amount)}
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

export default IncomeTable;
