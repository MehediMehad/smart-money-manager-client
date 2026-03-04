"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
import { Plus, Pencil, Trash2, TrendingUp, Filter } from "lucide-react";
import { TiStarOutline } from "react-icons/ti";
import { Textarea } from "@/components/ui/textarea";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { cn } from "@/lib/utils";

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

const monthlyTrendDummy = [
  { month: "অক্টো", amount: 32000 },
  { month: "নভে", amount: 38000 },
  { month: "ডিসে", amount: 41000 },
  { month: "জানু", amount: 42000 },
  { month: "ফেব্রু", amount: 46500 },
  { month: "মার্চ", amount: 79500 },
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

export default function IncomePage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [sourceFilter, setSourceFilter] = useState("all");
  const [searchNote, setSearchNote] = useState("");

  const filteredIncomes = useMemo(() => {
    return dummyIncomes.filter((item) => {
      const matchSource =
        sourceFilter === "all" || item.source === sourceFilter;
      const matchNote =
        !searchNote ||
        item.note.toLowerCase().includes(searchNote.toLowerCase());
      return matchSource && matchNote;
    });
  }, [sourceFilter, searchNote]);

  const totalThisMonth = dummyIncomes
    .filter((i) => i.date.startsWith("2026-03"))
    .reduce((sum, i) => sum + i.amount, 0);

  const todayIncome = dummyIncomes
    .filter((i) => i.date === "2026-03-04")
    .reduce((sum, i) => sum + i.amount, 0);

  const avgDaily = Math.round(totalThisMonth / 31);

  const mainSource = sourceSummaryDummy.reduce(
    (prev, curr) => (curr.value > prev.value ? curr : prev),
    sourceSummaryDummy[0],
  );

  return (
    <div className="min-h-screen pb-24 md:pb-12 space-y-6">
      {/* 1. Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="এই মাসের আয়"
          value={totalThisMonth}
          subtitle="মার্চ ২০২৬"
          variant="emerald"
        />
        <StatCard
          title="আজকের আয়"
          value={todayIncome}
          subtitle="৪ মার্চ"
          variant="blue"
        />
        <StatCard title="গড় দৈনিক" value={avgDaily} subtitle="এই মাসে" />
        <StatCard
          title="প্রধান উৎস"
          value={mainSource.value}
          subtitle={mainSource.name}
          variant="purple"
        />
      </div>

      {/* 2. Charts – stack on mobile, side by side on lg+ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart - Source Distribution */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>আয়ের উৎস বণ্টন</CardTitle>
            <CardDescription>মার্চ ২০২৬</CardDescription>
          </CardHeader>
          <CardContent className="h-64 sm:h-72 md:h-80">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={sourceSummaryDummy}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {sourceSummaryDummy.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatBDT(v)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart - Monthly Trend */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle>মাসভিত্তিক আয়ের ধারা</CardTitle>
            <CardDescription>সর্বশেষ ৬ মাস</CardDescription>
          </CardHeader>
          <CardContent className="h-64 sm:h-72 md:h-80">
            <ResponsiveContainer>
              <LineChart data={monthlyTrendDummy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(v: number) => formatBDT(v)} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* 7. Financial Insight Section */}
      <Card className="rounded-2xl shadow-sm border-emerald-400/40 bg-emerald-50/30 dark:bg-emerald-950/20">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
            <TrendingUp className="h-5 w-5" /> ফাইন্যান্সিয়াল হেলথ ইনসাইট
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
            </div>
            <p>
              গত মাসের তুলনায় আয়{" "}
              <strong className="text-emerald-600">৭১%</strong> বেড়েছে
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-1.5">
              <TiStarOutline className="h-4 w-4 text-emerald-600" />
            </div>
            <p>
              প্রধান আয়ের উৎস <strong>বেতন</strong> — মোট আয়ের ৬৩%
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Filters + Add Button */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-3 md:static md:py-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 bg-muted/40">
              <Filter className="h-4 w-4" />
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
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

            <Input
              placeholder="নোট সার্চ..."
              className="max-w-[220px] h-10"
              value={searchNote}
              onChange={(e) => setSearchNote(e.target.value)}
            />
          </div>

          <Button
            onClick={() => setOpenAdd(true)}
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
            {filteredIncomes.map((item) => (
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

      {/* 6. Source Summary  */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">উৎস অনুযায়ী সারাংশ</h3>
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4 pb-3">
          {sourceSummaryDummy.map((src) => (
            <Card key={src.name} className="rounded-xl shadow-sm">
              <CardContent className="p-4">
                <div className="font-medium mb-1">{src.name}</div>
                <div className="text-2xl font-bold text-emerald-600">
                  {formatBDT(src.value)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  মোট আয়ের {Math.round((src.value / totalThisMonth) * 100)}%
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Add Income Modal */}
      <Dialog open={openAdd} onOpenChange={setOpenAdd}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>নতুন আয় যোগ করুন</DialogTitle>
            <DialogDescription>সঠিক তথ্য দিয়ে সেভ করুন</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>আয়ের উৎস</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="বেছে নিন" />
                </SelectTrigger>
                <SelectContent>
                  {sourceSummaryDummy.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="অন্যান্য">অন্যান্য</SelectItem>
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
              <Label>নোট (ঐচ্ছিক)</Label>
              <Textarea placeholder="বিস্তারিত লিখুন..." rows={3} />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <Button variant="outline" onClick={() => setOpenAdd(false)}>
              বাতিল
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              সংরক্ষণ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile floating add button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}

// Reusable Stat Card
function StatCard({
  title,
  value,
  subtitle,
  variant = "default",
}: {
  title: string;
  value: number;
  subtitle: string;
  variant?: "default" | "emerald" | "blue" | "purple";
}) {
  const valueClass = {
    default: "text-2xl font-bold",
    emerald: "text-2xl font-bold text-emerald-600 dark:text-emerald-400",
    blue: "text-2xl font-bold text-blue-600 dark:text-blue-400",
    purple: "text-2xl font-bold text-purple-600 dark:text-purple-400",
  }[variant];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={valueClass}>{formatBDT(value)}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
}
