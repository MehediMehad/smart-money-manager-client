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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, AlertTriangle, Pencil, Trash2, Info, Eye } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { bn } from "date-fns/locale";
import { cn } from "@/lib/utils";

const dummyDebts = [
  // GIVEN (তুমি দিয়েছো → receivable)
  {
    id: "g1",
    person: "রহিম ভাই",
    type: "GIVEN",
    amount: 10000,
    dueDate: "2026-04-01",
    note: "ব্যবসায় সাহায্য",
    status: "active",
  },
  {
    id: "g2",
    person: "করিম",
    type: "GIVEN",
    amount: 15000,
    dueDate: "2026-05-10",
    note: "পার্সোনাল লোন",
    status: "active",
  },
  {
    id: "g3",
    person: "জামাল",
    type: "GIVEN",
    amount: 5000,
    dueDate: "2026-03-20",
    note: "জরুরি",
    status: "overdue",
  },
  {
    id: "g4",
    person: "ফাহিম",
    type: "GIVEN",
    amount: 8000,
    dueDate: "2026-03-05",
    note: "পুরনো ধার",
    status: "paid",
  },

  // TAKEN (তুমি নিয়েছো → payable)
  {
    id: "t1",
    person: "সালাম ভাই",
    type: "TAKEN",
    amount: 25000,
    dueDate: "2026-04-15",
    note: "ব্যাংক লোনের অংশ",
    status: "active",
  },
  {
    id: "t2",
    person: "আরিফ",
    type: "TAKEN",
    amount: 12000,
    dueDate: "2026-03-25",
    note: "বন্ধুর থেকে",
    status: "due_soon",
  },
  {
    id: "t3",
    person: "বাবা",
    type: "TAKEN",
    amount: 30000,
    dueDate: "2026-06-01",
    note: "পড়াশোনার খরচ",
    status: "active",
  },
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function formatDateBD(dateStr: string) {
  return format(new Date(dateStr), "dd MMM yyyy", { locale: bn });
}

function getDebtStatus(dueDate: string, paid = false) {
  if (paid) return "paid";

  const today = new Date("2026-03-04"); // current date
  const due = new Date(dueDate);
  const daysLeft = Math.ceil((due.getTime() - today.getTime()) / 86400000);

  if (daysLeft < 0) return "overdue";
  if (daysLeft <= 7) return "due_soon";
  return "active";
}

export default function DebtsPage() {
  const [openAdd, setOpenAdd] = useState(false);
  const [tab, setTab] = useState<"GIVEN" | "TAKEN">("GIVEN");

  const filteredDebts = useMemo(() => {
    if (tab === "GIVEN") return dummyDebts;
    return dummyDebts.filter((d) => d.type === tab);
  }, [tab]);

  const totalGiven = dummyDebts
    .filter((d) => d.type === "GIVEN" && d.status !== "paid")
    .reduce((sum, d) => sum + d.amount, 0);
  const totalTaken = dummyDebts
    .filter((d) => d.type === "TAKEN" && d.status !== "paid")
    .reduce((sum, d) => sum + d.amount, 0);
  const overdue = dummyDebts
    .filter(
      (d) => getDebtStatus(d.dueDate) === "overdue" && d.status !== "paid",
    )
    .reduce((sum, d) => sum + d.amount, 0);
  const dueSoonList = dummyDebts.filter(
    (d) => getDebtStatus(d.dueDate) === "due_soon" && d.status !== "paid",
  );

  const pieData = [
    { name: "দেওয়া (Given)", value: totalGiven, color: "#3b82f6" },
    { name: "নেওয়া (Taken)", value: totalTaken, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* 1. Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="মোট দেওয়া"
          value={totalGiven}
          subtitle="পাবো"
          variant="blue"
        />
        <StatCard
          title="মোট নেওয়া"
          value={totalTaken}
          subtitle="দিতে হবে"
          variant="red"
        />
        <StatCard
          title="শীঘ্রই পাবেন"
          value={overdue}
          subtitle="আগামী ৭ দিনের মধ্যে"
          variant="destructive"
        />
        <StatCard
          title="শীঘ্রই দিতে হবে"
          value={dueSoonList.length}
          subtitle="আগামী ৭ দিনের মধ্যে"
          variant="amber"
        />
      </div>

      {/* 6. Upcoming / Overdue Alerts */}
      {(dueSoonList.length > 0 || overdue > 0) && (
        <Card className="rounded-2xl border-red-400/40 bg-red-50/30 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" /> জরুরি ধার-দেনা সতর্কতা
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {dummyDebts
              .filter(
                (d) =>
                  ["due_soon", "overdue"].includes(getDebtStatus(d.dueDate)) &&
                  d.status !== "paid",
              )
              .map((d) => {
                const status = getDebtStatus(d.dueDate);
                const days = Math.ceil(
                  (new Date(d.dueDate).getTime() -
                    new Date("2026-03-04").getTime()) /
                    86400000,
                );
                return (
                  <div
                    key={d.id}
                    className={cn(
                      "flex items-center justify-between rounded-lg border p-3 text-sm",
                      status === "overdue"
                        ? "border-red-400 bg-red-50"
                        : "border-amber-400 bg-amber-50",
                    )}
                  >
                    <div>
                      <p className="font-medium">
                        {d.person} ({d.type === "GIVEN" ? "দেওয়া" : "নেওয়া"})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {formatDateBD(d.dueDate)}{" "}
                        {days < 0
                          ? `(${Math.abs(days)} দিন অতিক্রান্ত)`
                          : `(${days} দিন বাকি)`}
                      </p>
                    </div>
                    <p className="font-semibold text-red-600">
                      {formatBDT(d.amount)}
                    </p>
                  </div>
                );
              })}
          </CardContent>
        </Card>
      )}

      {/* Tabs: Given / Taken */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as any)}
            className="w-full"
          >
            <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-3">
              {/* <TabsTrigger value="all">সব</TabsTrigger> */}
              <TabsTrigger value="GIVEN">দেওয়া টাকা</TabsTrigger>
              <TabsTrigger value="TAKEN">নেওয়া টাকা</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 sm:w-auto w-full">
                <Plus className="h-4 w-4" /> নতুন ধার যোগ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>নতুন ধার-দেনা যোগ করুন</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>ব্যক্তির নাম</Label>
                  <Input placeholder="যেমন: রহিম ভাই" />
                </div>
                <div className="grid gap-2">
                  <Label>পরিমাণ (৳)</Label>
                  <Input type="number" placeholder="10000" />
                </div>
                <div className="grid gap-2">
                  <Label>ধরন</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="বেছে নিন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GIVEN">দেওয়া (পাবো)</SelectItem>
                      <SelectItem value="TAKEN">নেওয়া (দিতে হবে)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>নোট</Label>
                  <Input placeholder="বিস্তারিত..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAdd(false)}>
                  বাতিল
                </Button>
                <Button>সংরক্ষণ করুন</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Debt Table */}
        <Card className="rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-muted/60">
                <TableRow>
                  <TableHead>ব্যক্তি</TableHead>
                  {/* <TableHead>ধরন</TableHead> */}
                  <TableHead>পরিমাণ</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>অবস্থা</TableHead>
                  <TableHead className="text-right">অ্যাকশন</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDebts.map((debt) => {
                  const status = getDebtStatus(debt.dueDate);
                  return (
                    <TableRow key={debt.id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">
                        {debt.person}
                      </TableCell>
                      {/* <TableCell>
                        <Badge
                          variant={
                            debt.type === "GIVEN" ? "default" : "destructive"
                          }
                        >
                          {debt.type === "GIVEN" ? "দেওয়া" : "নেওয়া"}
                        </Badge>
                      </TableCell> */}
                      <TableCell
                        className={cn(
                          "font-semibold",
                          debt.type === "GIVEN"
                            ? "text-blue-600"
                            : "text-red-600",
                        )}
                      >
                        {formatBDT(debt.amount)}
                      </TableCell>
                      <TableCell>{formatDateBD(debt.dueDate)}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            status === "paid"
                              ? "secondary"
                              : status === "overdue"
                                ? "destructive"
                                : status === "due_soon"
                                  ? "outline"
                                  : "default"
                          }
                        >
                          {status === "paid"
                            ? "পরিশোধিত"
                            : status === "overdue"
                              ? "মেয়াদোত্তীর্ণ"
                              : status === "due_soon"
                                ? "শীঘ্রই শেষ হবে"
                                : "বাকি"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          {/* <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button> */}
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                          >
                            <Eye className="h-4 w-4 text-gray-500" />
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
      </div>

      {/* 5. Analytics - Given vs Taken Pie */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>ধার-দেনার অনুপাত</CardTitle>
          <CardDescription>দেওয়া vs নেওয়া</CardDescription>
        </CardHeader>
        <CardContent className="h-64 sm:h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={90}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((entry, i) => (
                  <Cell key={`cell-${i}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(v: number) => formatBDT(v)} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Mobile floating add */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-red-600 to-rose-600"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  variant = "default",
}: {
  title: string;
  value: number;
  subtitle: string;
  variant?: "default" | "blue" | "red" | "destructive" | "amber";
}) {
  const valueClass = {
    default: "text-2xl font-bold",
    blue: "text-2xl font-bold text-blue-600 dark:text-blue-400",
    red: "text-2xl font-bold text-red-600 dark:text-red-400",
    destructive: "text-2xl font-bold text-destructive",
    amber: "text-2xl font-bold text-amber-600 dark:text-amber-400",
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
