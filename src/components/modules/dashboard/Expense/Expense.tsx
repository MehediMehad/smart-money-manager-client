"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const dummyExpense = [
  {
    id: "1",
    date: "২০২৬-০৩-০১",
    category: "খাবার",
    amount: "৳৫,০০০",
    note: "মাসিক বাজার",
  },
  {
    id: "2",
    date: "২০২৬-০৩-০২",
    category: "যাতায়াত",
    amount: "৳৩,০০০",
    note: "বাস ও রিকশা",
  },
  {
    id: "3",
    date: "২০২৬-০৩-০৩",
    category: "বিল",
    amount: "৳৮,০০০",
    note: "বিদ্যুৎ ও গ্যাস",
  },
  {
    id: "4",
    date: "২০২৬-০৩-০৪",
    category: "শিক্ষা",
    amount: "৳৫,০০০",
    note: "কোর্স ফি",
  },
  {
    id: "5",
    date: "২০২৬-০৩-০৫",
    category: "বিনোদন",
    amount: "৳৪,০০০",
    note: "সিনেমা ও ডাইনিং",
  },
];

const barData = [
  { name: "জানু", amount: 22000 },
  { name: "ফেব্রু", amount: 25000 },
  { name: "মার্চ", amount: 18000 },
];

const categories = [
  { value: "all", label: "সব" },
  { value: "transport", label: "যাতায়াত" },
  { value: "food", label: "খাবার" },
  { value: "entertainment", label: "বিনোদন" },
  { value: "internet", label: "ইন্টারনেট/মোবাইল বিল" },
  { value: "outside_food", label: "বাইরে খাওয়া" },
  { value: "shopping", label: "কেনাকাটা" },
  { value: "loan", label: "ঋণ পরিশোধ" },
  { value: "clothing", label: "পোশাক" },
  { value: "medical", label: "চিকিৎসা" },
  { value: "education", label: "শিক্ষা" },
  { value: "gift", label: "উপহার" },
];

const Expense = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">ব্যয় তালিকা</h2>
        <div className="flex gap-3 flex-wrap">
          <Select>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="ক্যাটাগরি" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> ব্যয় যোগ করুন
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>নতুন ব্যয় যোগ করুন</DialogTitle>
                <DialogDescription>ব্যয়ের তথ্য পূরণ করুন</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>ক্যাটাগরি</Label>
                  <Input placeholder="যেমন: খাবার" />
                </div>
                <div className="space-y-2">
                  <Label>পরিমাণ</Label>
                  <Input type="number" placeholder="০" />
                </div>
                <div className="space-y-2">
                  <Label>তারিখ</Label>
                  <Input type="date" />
                </div>
                <div className="space-y-2">
                  <Label>নোট</Label>
                  <Textarea placeholder="অতিরিক্ত তথ্য..." />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={() => setOpen(false)}>সংরক্ষণ করুন</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card className="rounded-2xl shadow-sm mb-6">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>তারিখ</TableHead>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead>পরিমাণ</TableHead>
                <TableHead>নোট</TableHead>
                <TableHead className="text-right">একশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyExpense.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell className="font-semibold text-destructive">
                    {item.amount}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {item.note}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">এই মাসের মোট ব্যয়</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-destructive">৳২৫,০০০</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">মাসভিত্তিক ব্যয়</CardTitle>
          </CardHeader>
          <CardContent className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--destructive))"
                  radius={[6, 6, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Expense;
