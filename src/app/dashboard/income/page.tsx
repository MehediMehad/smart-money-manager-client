"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const dummyIncome = [
  {
    id: "1",
    date: "২০২৬-০৩-০১",
    source: "বেতন",
    amount: "৳৫০,০০০",
    note: "মার্চ মাসের বেতন",
  },
  {
    id: "2",
    date: "২০২৬-০২-২৫",
    source: "ফ্রিল্যান্সিং",
    amount: "৳১৫,০০০",
    note: "ওয়েব ডেভেলপমেন্ট প্রজেক্ট",
  },
  {
    id: "3",
    date: "২০২৬-০২-২০",
    source: "ব্যবসা",
    amount: "৳২৫,০০০",
    note: "অনলাইন শপ",
  },
  {
    id: "4",
    date: "২০২৬-০২-১৫",
    source: "বিনিয়োগ",
    amount: "৳৮,০০০",
    note: "শেয়ার লভ্যাংশ",
  },
  {
    id: "5",
    date: "২০২৬-০২-১০",
    source: "টিউশন",
    amount: "৳১২,০০০",
    note: "২ জন ছাত্র",
  },
];

const IncomePage = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">আয় তালিকা</h2>
        <div className="flex gap-3 flex-wrap">
          <Input type="date" className="w-40" />
          <Input type="date" className="w-40" />
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> আয় যোগ করুন
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl">
              <DialogHeader>
                <DialogTitle>নতুন আয় যোগ করুন</DialogTitle>
                <DialogDescription>আয়ের তথ্য পূরণ করুন</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>উৎস</Label>
                  <Input placeholder="যেমন: বেতন" />
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
      <Card className="rounded-2xl shadow-sm">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>তারিখ</TableHead>
                <TableHead>উৎস</TableHead>
                <TableHead>পরিমাণ</TableHead>
                <TableHead>নোট</TableHead>
                <TableHead className="text-right">একশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyIncome.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.date}</TableCell>
                  <TableCell>{item.source}</TableCell>
                  <TableCell className="font-semibold text-primary">
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
    </>
  );
};

export default IncomePage;
