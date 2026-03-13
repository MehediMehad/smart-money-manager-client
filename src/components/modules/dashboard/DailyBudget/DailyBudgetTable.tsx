"use client";

import { useRef, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatBDT, getStatus, getStatusBadge } from "@/lib/budget-utils";
import { createDailyBudget } from "@/services/DailyBudget";
import { toast } from "sonner";
import { ICategory } from "@/types";

type DailyBudgetItem = {
  category: string;
  budget: number;
  spent: number;
  remaining: number;
};

type Props = {
  categories: ICategory[];
  dailyBudgets: DailyBudgetItem[];
};

const DailyBudgetTable = ({ dailyBudgets, categories }: Props) => {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );
  const [budgetAmount, setBudgetAmount] = useState<string>("");

  const expenseCategories = categories.filter((cat) => cat.type === "EXPENSE");

  const amountInputRef = useRef<HTMLInputElement>(null);

  const handleCategorySelect = (cat: ICategory) => {
    setSelectedCategory(cat);

    setTimeout(() => {
      amountInputRef.current?.focus();
    }, 100);
  };

  const handleSaveNewBudget = async () => {
    if (!selectedCategory) {
      toast.error("একটি ক্যাটাগরি নির্বাচন করুন");
      return;
    }
    if (!budgetAmount || Number(budgetAmount) <= 0) {
      toast.error("বৈধ পরিমাণ দিন");
      return;
    }

    const payload = {
      categoryId: selectedCategory.id,
      amount: Number(budgetAmount),
      date: new Date().toISOString().split("T")[0] + "T00:00:00.000Z",
    };

    try {
      const response = await createDailyBudget(payload);

      if (response.success) {
        toast.success("দৈনিক বাজেট সেভ হয়েছে!");
        setSelectedCategory(null);
        setBudgetAmount("");
        setOpenAdd(false);
      } else {
        toast.error(response.message || "কিছু সমস্যা হয়েছে");
      }
    } catch (err) {
      toast.error("সার্ভারে সমস্যা হয়েছে");
      console.error(err);
    }
  };
  return (
    <>
      <Card className="rounded-2xl shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>আজকের ক্যাটাগরি বাজেট</CardTitle>
          <Dialog open={openAdd} onOpenChange={setOpenAdd}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4" /> নতুন ক্যাটাগরি যোগ
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg rounded-2xl max-w-[320px]">
              <DialogHeader className="pb-1">
                <DialogTitle className="text-base">নতুন বাজেট</DialogTitle>
                <DialogDescription className="text-xs hidden">
                  পরিমাণ → ক্যাটাগরি
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-1">
                {/* Amount Input */}
                <div className="grid gap-1">
                  <Label className="text-xs mb-1">দৈনিক বাজেট (৳)</Label>
                  <Input
                    ref={amountInputRef}
                    type="number"
                    placeholder="500"
                    value={budgetAmount}
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    min="1"
                    className="h-8 text-sm px-3 mb-1"
                    autoFocus
                  />
                </div>

                {/* Category List and Select */}
                <div className="grid gap-1">
                  <Label className="text-xs">ক্যাটাগরি</Label>

                  <div className="max-h-80 overflow-y-auto -mx-1 px-1">
                    {expenseCategories.length === 0 ? (
                      <p className="text-center text-[10px] text-muted-foreground py-1">
                        কোনো ক্যাটাগরি নেই
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {expenseCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => handleCategorySelect(cat)}
                            className={cn(
                              "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] transition-colors",
                              "hover:bg-primary/10 hover:text-primary",
                              selectedCategory?.id === cat.id
                                ? "bg-primary/15 text-primary font-medium"
                                : "text-muted-foreground/90",
                            )}
                          >
                            <span className="text-[12px]">{cat.emoji}</span>
                            <span className="max-w-[80px] truncate">
                              {cat.name.length > 10
                                ? cat.name.slice(0, 8) + ".."
                                : cat.name}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {selectedCategory && (
                  <p className="text-[10px] text-muted-foreground/80 text-center">
                    {selectedCategory.emoji} {selectedCategory.name}
                  </p>
                )}
              </div>

              <DialogFooter className="gap-2 sm:gap-0">
                <Button variant="outline" onClick={() => setOpenAdd(false)}>
                  বাতিল
                </Button>
                <Button
                  className="bg-emerald-600 hover:bg-emerald-700"
                  onClick={handleSaveNewBudget}
                  disabled={!selectedCategory || !budgetAmount}
                >
                  সেভ করুন
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/60">
              <TableRow>
                <TableHead>ক্যাটাগরি</TableHead>
                <TableHead className="text-right">বাজেট</TableHead>
                <TableHead className="text-right">খরচ</TableHead>
                <TableHead className="text-right">বাকি</TableHead>
                <TableHead className="text-center">অবস্থা</TableHead>
                <TableHead className="text-right">অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dailyBudgets.map((item) => {
                const status = getStatus(item.spent, item.budget);
                const isOver = status === "over";

                return (
                  <TableRow key={item.category} className="hover:bg-muted/50">
                    <TableCell className="font-medium">
                      {item.category}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatBDT(item.budget)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold",
                        isOver && "text-red-600",
                      )}
                    >
                      {formatBDT(item.spent)}
                    </TableCell>
                    <TableCell
                      className={cn(
                        "text-right font-semibold",
                        isOver && "text-red-600",
                      )}
                    >
                      {item.remaining >= 0
                        ? formatBDT(item.remaining)
                        : `-${formatBDT(Math.abs(item.remaining))}`}
                    </TableCell>
                    <TableCell className="text-center">
                      {getStatusBadge(status)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setOpenEdit(item.category)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!openEdit} onOpenChange={() => setOpenEdit(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl">
          <DialogHeader>
            <DialogTitle>{openEdit} — দৈনিক বাজেট আপডেট</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>দৈনিক বাজেট (৳)</Label>
              <Input type="number" defaultValue="800" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenEdit(null)}>
              বাতিল
            </Button>
            <Button>আপডেট করুন</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile floating add button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Button
          size="lg"
          className="rounded-full h-14 w-14 shadow-2xl bg-emerald-600 hover:bg-emerald-700"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </>
  );
};

export default DailyBudgetTable;
