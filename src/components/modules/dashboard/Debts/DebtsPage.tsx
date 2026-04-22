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
import { Plus, AlertTriangle, Pencil, Trash2, Eye } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { cn } from "@/lib/utils";

const dummyDebts = [
  // GIVEN (You gave → Receivable)
  {
    id: "g1",
    person: "Rahim Bhai",
    type: "GIVEN",
    amount: 10000,
    dueDate: "2026-04-01",
    note: "Business help",
    status: "active",
  },
  {
    id: "g2",
    person: "Karim",
    type: "GIVEN",
    amount: 15000,
    dueDate: "2026-05-10",
    note: "Personal loan",
    status: "active",
  },
  {
    id: "g3",
    person: "Jamal",
    type: "GIVEN",
    amount: 5000,
    dueDate: "2026-03-20",
    note: "Emergency",
    status: "overdue",
  },
  {
    id: "g4",
    person: "Fahim",
    type: "GIVEN",
    amount: 8000,
    dueDate: "2026-03-05",
    note: "Old debt",
    status: "paid",
  },

  // TAKEN (You took → Payable)
  {
    id: "t1",
    person: "Salam Bhai",
    type: "TAKEN",
    amount: 25000,
    dueDate: "2026-04-15",
    note: "Part of bank loan",
    status: "active",
  },
  {
    id: "t2",
    person: "Arif",
    type: "TAKEN",
    amount: 12000,
    dueDate: "2026-03-25",
    note: "From friend",
    status: "due_soon",
  },
  {
    id: "t3",
    person: "Father",
    type: "TAKEN",
    amount: 30000,
    dueDate: "2026-06-01",
    note: "Education expenses",
    status: "active",
  },
];

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function formatDateBD(dateStr: string) {
  return format(new Date(dateStr), "dd MMM yyyy", { locale: enUS });
}

function getDebtStatus(dueDate: string, paid = false) {
  if (paid) return "paid";

  const today = new Date("2026-03-04"); // current date for demo
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
    { name: "Given (Receivable)", value: totalGiven, color: "#3b82f6" },
    { name: "Taken (Payable)", value: totalTaken, color: "#ef4444" },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-12">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Given"
          value={totalGiven}
          subtitle="You will receive"
          variant="blue"
        />
        <StatCard
          title="Total Taken"
          value={totalTaken}
          subtitle="You have to pay"
          variant="red"
        />
        <StatCard
          title="Overdue"
          value={overdue}
          subtitle="Past due date"
          variant="destructive"
        />
        <StatCard
          title="Due Soon"
          value={dueSoonList.length}
          subtitle="Within next 7 days"
          variant="amber"
        />
      </div>

      {/* Urgent Alerts */}
      {(dueSoonList.length > 0 || overdue > 0) && (
        <Card className="rounded-2xl border-red-400/40 bg-red-50/30 dark:bg-red-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <AlertTriangle className="h-5 w-5" /> Urgent Debt Alerts
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
                        {d.person} ({d.type === "GIVEN" ? "Given" : "Taken"})
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Due: {formatDateBD(d.dueDate)}{" "}
                        {days < 0
                          ? `(${Math.abs(days)} days overdue)`
                          : `(${days} days left)`}
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

      {/* Tabs & Add Button */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <Tabs
            value={tab}
            onValueChange={(v) => setTab(v as "GIVEN" | "TAKEN")}
            className="w-full"
          >
            <TabsList className="grid w-full sm:w-auto sm:inline-grid grid-cols-2 gap-5 min-w-[320px]">
              <TabsTrigger value="GIVEN">Money Given (Receivable)</TabsTrigger>
              <TabsTrigger value="TAKEN">Money Taken (Payable)</TabsTrigger>
            </TabsList>
          </Tabs>

          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 sm:w-auto w-full">
                <Plus className="h-4 w-4" /> Add New Debt
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[95%] sm:max-w-md rounded-2xl">
              <DialogHeader>
                <DialogTitle>Add New Debt Record</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Person Name</Label>
                  <Input placeholder="e.g. Rahim Bhai" />
                </div>
                <div className="grid gap-2">
                  <Label>Amount (৳)</Label>
                  <Input type="number" placeholder="10000" />
                </div>
                <div className="grid gap-2">
                  <Label>Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GIVEN">
                        Given (I will receive)
                      </SelectItem>
                      <SelectItem value="TAKEN">
                        Taken (I have to pay)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Due Date</Label>
                  <Input type="date" />
                </div>
                <div className="grid gap-2">
                  <Label>Note</Label>
                  <Input placeholder="Additional details..." />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpenAdd(false)}>
                  Cancel
                </Button>
                <Button>Save Debt</Button>
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
                  <TableHead>Person</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
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
                            ? "Paid"
                            : status === "overdue"
                              ? "Overdue"
                              : status === "due_soon"
                                ? "Due Soon"
                                : "Active"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
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

      {/* Analytics - Pie Chart */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Debt Overview</CardTitle>
          <CardDescription>Given vs Taken</CardDescription>
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

      {/* Mobile floating add button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="icon"
          className="h-14 w-14 rounded-full shadow-2xl bg-gradient-to-r from-red-600 to-rose-600"
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
