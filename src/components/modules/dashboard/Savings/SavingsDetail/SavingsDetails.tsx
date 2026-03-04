"use client";

import { useState } from "react";
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
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  ArrowLeft,
  Plus,
  Target,
  Calendar,
  Trash2,
  Pencil,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

const dummyGoal = {
  id: "1",
  name: "নতুন ল্যাপটপ 💻",
  target: 80000,
  saved: 32000,
  deadline: "2026-07-15",
  note: "M3 Max, 32GB RAM, Space Black",
  transactions: [
    { date: "2026-01-05", amount: 15000, note: "বোনাস থেকে" },
    { date: "2026-02-10", amount: 8000, note: "ফ্রিল্যান্স পেমেন্ট" },
    { date: "2026-03-01", amount: 9000, note: "মাসিক সেভিংস" },
  ],
};

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("bn-BD");
}

function daysLeft(deadline: string) {
  const d = new Date(deadline);
  const today = new Date("2026-03-04");
  return Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export default function SavingsGoalDetail() {
  const [openAddMoney, setOpenAddMoney] = useState(false);
  const percent = Math.round((dummyGoal.saved / dummyGoal.target) * 100);
  const remaining = dummyGoal.target - dummyGoal.saved;
  const dailyNeed = Math.ceil(
    remaining / Math.max(daysLeft(dummyGoal.deadline), 1),
  );

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/savings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <Target className="h-6 w-6 text-emerald-600" />
          {dummyGoal.name}
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Main Progress Card */}
        <Card className="md:col-span-2 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>অগ্রগতি</CardTitle>
            <CardDescription>
              আপনি এখন পর্যন্ত {percent}% পথ অতিক্রম করেছেন
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Progress value={percent} className="h-3" />
              <div className="flex justify-between text-sm font-medium">
                <span className="text-emerald-600">
                  {formatBDT(dummyGoal.saved)}
                </span>
                <span className="text-muted-foreground">
                  / {formatBDT(dummyGoal.target)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted/40 rounded-lg">
                <p className="text-xs text-muted-foreground">বাকি</p>
                <p className="text-lg font-bold">{formatBDT(remaining)}</p>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg">
                <p className="text-xs text-muted-foreground">দিন বাকি</p>
                <p className="text-lg font-bold">
                  {daysLeft(dummyGoal.deadline)}
                </p>
              </div>
              <div className="p-3 bg-muted/40 rounded-lg">
                <p className="text-xs text-muted-foreground">দৈনিক দরকার</p>
                <p className="text-lg font-bold text-amber-600">
                  {formatBDT(dailyNeed)}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <h4 className="font-medium mb-3 flex items-center gap-2">
                <Calendar className="h-4 w-4" /> সময়সীমা
              </h4>
              <p className="text-sm">
                {format(new Date(dummyGoal.deadline), "dd MMMM yyyy", {
                  locale: bn,
                })}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="rounded-2xl shadow-sm h-fit">
          <CardHeader>
            <CardTitle>দ্রুত অ্যাকশন</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Dialog open={openAddMoney} onOpenChange={setOpenAddMoney}>
              <DialogTrigger asChild>
                <Button className="w-full gap-2 bg-emerald-600 hover:bg-emerald-700">
                  <Plus className="h-4 w-4" /> টাকা যোগ করুন
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-sm rounded-2xl">
                <DialogHeader>
                  <DialogTitle>সঞ্চয়ে টাকা যোগ করুন</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label>পরিমাণ (৳)</Label>
                    <Input type="number" placeholder="5000" />
                  </div>
                  <div className="space-y-2">
                    <Label>নোট (ঐচ্ছিক)</Label>
                    <Input placeholder="বোনাস থেকে..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    variant="outline"
                    onClick={() => setOpenAddMoney(false)}
                  >
                    বাতিল
                  </Button>
                  <Button onClick={() => setOpenAddMoney(false)}>
                    যোগ করুন
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="w-full gap-2">
              <Pencil className="h-4 w-4" /> লক্ষ্য সম্পাদনা
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" /> লক্ষ্য মুছে ফেলুন
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Transaction History */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>সঞ্চয়ের ইতিহাস</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dummyGoal.transactions.map((tx, i) => (
              <div
                key={i}
                className="flex justify-between items-center border-b pb-3 last:border-0"
              >
                <div>
                  <p className="font-medium">{formatBDT(tx.amount)}</p>
                  <p className="text-xs text-muted-foreground">{tx.note}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(tx.date), "dd MMM yyyy", { locale: bn })}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
