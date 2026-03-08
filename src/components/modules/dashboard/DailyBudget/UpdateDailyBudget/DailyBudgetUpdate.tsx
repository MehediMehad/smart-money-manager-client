"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = [
  "খাবার",
  "যাতায়াত",
  "বিল",
  "শপিং",
  "বিনোদন",
  "শিক্ষা",
  "অন্যান্য",
];

// Default daily budget = 0 for each category
const defaultDailyBudgets = categories.map((cat) => ({
  category: cat,
  dailyBudget: 0,
}));

export default function DailyBudgetUpdate() {
  const [dailyBudgets, setDailyBudgets] = useState(defaultDailyBudgets);

  const handleChange = (index: number, value: string) => {
    const newBudgets = [...dailyBudgets];
    newBudgets[index].dailyBudget = Number(value) || 0;
    setDailyBudgets(newBudgets);
  };

  const handleSave = () => {
    // In real app → API call to save daily budgets
    console.log("Saving daily budgets:", dailyBudgets);
    alert("দৈনিক বাজেট সেভ হয়েছে!");
  };

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/dashboard/daily-budget">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h2 className="text-2xl font-bold">দৈনিক বাজেট আপডেট করুন</h2>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>ক্যাটাগরি অনুযায়ী দৈনিক লিমিট সেট করুন</CardTitle>
          <CardDescription>
            আজকের জন্য প্রতিটি ক্যাটাগরির বাজেট দিন (০ হলে কোনো লিমিট নেই)
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {dailyBudgets.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center border-b pb-4 last:border-0"
              >
                <Label className="font-medium">{item.category}</Label>
                <div className="flex items-center gap-3">
                  <Input
                    type="number"
                    min="0"
                    value={item.dailyBudget}
                    onChange={(e) => handleChange(index, e.target.value)}
                    className="max-w-[180px]"
                    placeholder="0"
                  />
                  <span className="text-sm text-muted-foreground">৳ / দিন</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard/daily-budget">বাতিল</Link>
            </Button>
            <Button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              সেভ করুন
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
