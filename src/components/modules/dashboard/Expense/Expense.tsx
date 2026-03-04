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
import { Plus, Pencil, Trash2, AlertTriangle, Filter } from "lucide-react";
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

const COLORS = [
  "#f97316",
  "#3b82f6",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
];

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

const monthlyTrendDummy = [
  { month: "জানু", amount: 21800 },
  { month: "ফেব্রু", amount: 24700 },
  { month: "মার্চ", amount: 24500 },
];

const categorySummaryDummy = [
  { name: "খাবার", value: 9450, budget: 8000 },
  { name: "যাতায়াত", value: 3580, budget: 4000 },
  { name: "বিল", value: 3200, budget: 5000 },
  { name: "শিক্ষা", value: 5000, budget: 10000 },
  { name: "বিনোদন", value: 1800, budget: 3000 },
];

const smartAlertsDummy = [
  {
    type: "warning",
    message: "খাবার খাতে গত মাসের তুলনায় ২৮% বেশি খরচ হচ্ছে",
  },
  { type: "danger", message: "যাতায়াত বাজেট ৪৫% অতিক্রম করেছে" },
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function formatDateBD(dateStr: string) {
  const d = new Date(dateStr);
  return format(d, "dd MMM", { locale: bn });
}

export default function ExpensePage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchNote, setSearchNote] = useState("");

  const filteredExpenses = useMemo(() => {
    return dummyExpenses.filter((exp) => {
      const matchCategory =
        categoryFilter === "all" || exp.category === categoryFilter;
      const matchSearch =
        searchNote === "" ||
        exp.note.toLowerCase().includes(searchNote.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [categoryFilter, searchNote]);

  const totalThisMonth = dummyExpenses.reduce(
    (sum, exp) => sum + exp.amount,
    0,
  );
  const todayExpense = dummyExpenses
    .filter((exp) => exp.date === "2026-03-04")
    .reduce((sum, exp) => sum + exp.amount, 0);

  return (
    <div className="space-y-6 pb-20">
      {/* ── Summary Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              ব্যালেন্স
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatBDT(38500)}</div>
            <p className="text-xs text-muted-foreground">এই মুহূর্তে</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              এই মাসের ব্যয়
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {formatBDT(totalThisMonth)}
            </div>
            <p className="text-xs text-muted-foreground">বাজেট ৳৫০,০০০</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              আজকের ব্যয়
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {formatBDT(todayExpense)}
            </div>
            <p className="text-xs text-muted-foreground">দৈনিক গড় ৳৮৫০</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              গড় ব্যয়/দিন
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳৮১৭</div>
            <p className="text-xs text-muted-foreground">এই মাসে</p>
          </CardContent>
        </Card>
      </div>

      {/* ── Charts ── */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pie Chart - Category Breakdown */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>ক্যাটাগরি অনুযায়ী ব্যয়</CardTitle>
            <CardDescription>মার্চ ২০২৬</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categorySummaryDummy}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categorySummaryDummy.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => formatBDT(Number(val))} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart - Monthly Trend */}
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>মাসভিত্তিক ব্যয়ের ধারা</CardTitle>
            <CardDescription>সর্বশেষ ৬ মাস</CardDescription>
          </CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer>
              <LineChart data={monthlyTrendDummy}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(val) => formatBDT(Number(val))} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#f97316"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* ── Smart Alerts ── */}
      {smartAlertsDummy.length > 0 && (
        <Card className="rounded-2xl shadow-sm border-orange-400/40 bg-orange-50/40 dark:bg-orange-950/30">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
              <AlertTriangle className="h-5 w-5" /> স্মার্ট সতর্কতা
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {smartAlertsDummy.map((alert, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 rounded-lg border p-3 ${
                  alert.type === "danger"
                    ? "border-red-400 bg-red-50 dark:bg-red-950/40"
                    : "border-orange-300 bg-orange-50 dark:bg-orange-950/30"
                }`}
              >
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                <p className="text-sm">{alert.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* ── Filters & Add Button ── */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 text-sm">
            <Filter className="h-4 w-4" />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
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

          <Input
            placeholder="নোট সার্চ করুন..."
            className="max-w-xs"
            value={searchNote}
            onChange={(e) => setSearchNote(e.target.value)}
          />
        </div>

        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
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
                onClick={() => setOpenAdd(false)}
              >
                বাতিল
              </Button>
              <Button onClick={() => setOpenAdd(false)}>ব্যয় যোগ করুন</Button>
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
            {filteredExpenses.map((exp) => (
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

      {/* Category Summary Cards  */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4 pb-2">
        {categorySummaryDummy.map((cat) => {
          const percent = Math.round((cat.value / cat.budget) * 100);
          return (
            <Card key={cat.name} className=" rounded-xl shadow-sm">
              <CardContent className="p-4">
                <div className="font-medium mb-1">{cat.name}</div>
                <div className="text-lg font-bold">{formatBDT(cat.value)}</div>
                <div className="text-xs text-muted-foreground mb-2">
                  বাজেট: {formatBDT(cat.budget)}
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      percent > 90
                        ? "bg-red-500"
                        : percent > 70
                          ? "bg-orange-500"
                          : "bg-emerald-500"
                    }`}
                    style={{ width: `${Math.min(percent, 100)}%` }}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
