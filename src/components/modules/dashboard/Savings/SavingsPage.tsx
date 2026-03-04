"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Plus, Target } from "lucide-react";
import Link from "next/link";

const savingsData = [
  {
    id: "1",
    name: "নতুন ল্যাপটপ",
    target: 50000,
    saved: 20000,
    deadline: "২০২৬-০৬-৩০",
  },
  {
    id: "2",
    name: "জরুরি তহবিল",
    target: 100000,
    saved: 65000,
    deadline: "২০২৬-১২-৩১",
  },
  {
    id: "3",
    name: "বিদেশ ভ্রমণ",
    target: 200000,
    saved: 45000,
    deadline: "২০২৭-০৩-০১",
  },
  {
    id: "4",
    name: "গাড়ি কেনা",
    target: 500000,
    saved: 120000,
    deadline: "২০২৮-০১-০১",
  },
];

const SavingsPage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          সঞ্চয় লক্ষ্যসমূহ
        </h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 sm:w-auto w-full">
              <Plus className="h-4 w-4" /> নতুন লক্ষ্য যোগ করুন
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-2xl">
            <DialogHeader>
              <DialogTitle>নতুন সঞ্চয় লক্ষ্য</DialogTitle>
              <DialogDescription>লক্ষ্যের তথ্য পূরণ করুন</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>লক্ষ্য নাম</Label>
                <Input placeholder="যেমন: নতুন ল্যাপটপ" />
              </div>
              <div className="space-y-2">
                <Label>লক্ষ্য টাকা</Label>
                <Input type="number" placeholder="০" />
              </div>
              <div className="space-y-2">
                <Label>সময়সীমা</Label>
                <Input type="date" />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setOpen(false)}>সংরক্ষণ করুন</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {savingsData.map((item) => {
          const percent = Math.round((item.saved / item.target) * 100);
          const remaining = item.target - item.saved;
          return (
            <Link key={item.id} href={`/dashboard/savings/${item.id}`}>
              <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" /> {item.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      লক্ষ্য: ৳{item.target.toLocaleString("bn-BD")}
                    </span>
                    <span className="font-semibold text-primary">
                      {percent}%
                    </span>
                  </div>
                  <Progress value={percent} className="h-3" />
                  <div className="flex justify-between text-sm">
                    <span>সঞ্চিত: ৳{item.saved.toLocaleString("bn-BD")}</span>
                    <span className="text-muted-foreground">
                      বাকি: ৳{remaining.toLocaleString("bn-BD")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    সময়সীমা: {item.deadline}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default SavingsPage;
