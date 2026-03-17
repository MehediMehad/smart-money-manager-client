"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Plus, Pencil, CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { TCategory } from "@/types";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DatePickerDemo } from "./date-piker";
// import { createBudget } from "@/services/Budget";

type Props = {
  mode: "create" | "edit";
  budget?: any; // TBudget
  isIcon?: boolean;
  onSuccess?: () => void;
  categories: TCategory[];
};

const BudgetFormModal = ({
  mode,
  budget,
  isIcon,
  onSuccess,
  categories,
}: Props) => {
  console.log("categories", categories);
  const amountInputRef = useRef<HTMLInputElement>(null);
  const expenseCategories = categories.filter((cat) => cat.type === "EXPENSE");
  const [selectedCategory, setSelectedCategory] = useState<TCategory | null>(
    null,
  );

  const [open, setOpen] = useState(false);
  const isEdit = mode === "edit";

  // Date states
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    isEdit && budget?.date ? new Date(budget.date) : undefined,
  );
  const [selectedMonth, setSelectedMonth] = useState<Date | undefined>(
    isEdit && budget?.month ? new Date(budget.month + "-01") : undefined,
  );

  const [form, setForm] = useState({
    categoryId: isEdit ? budget?.categoryId : "",
    amount: isEdit ? budget?.amount : "",
    type: isEdit ? budget?.type : "DAILY",
    date: isEdit ? budget?.date : "",
    month: isEdit ? budget?.month : "",
  });

  const handleCategorySelect = (cat: TCategory) => {
    setSelectedCategory(cat);
    setForm((prev) => ({
      ...prev,
      categoryId: cat.id,
    }));

    setTimeout(() => {
      amountInputRef.current?.focus();
    }, 100);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedMonth(undefined);
    setForm((prev) => ({
      ...prev,
      date: date ? format(date, "yyyy-MM-dd") : "",
      month: "",
    }));
  };

  const handleMonthSelect = (date: Date | undefined) => {
    setSelectedMonth(date);
    setSelectedDate(undefined);
    setForm((prev) => ({
      ...prev,
      month: date ? format(date, "yyyy-MM") : "",
      date: "",
    }));
  };

  const handleSubmit = async () => {
    if (!form.categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }
    if (form.type === "DAILY" && !form.date) {
      toast.error("Please select a date");
      return;
    }
    if (form.type === "MONTHLY" && !form.month) {
      toast.error("Please select a month");
      return;
    }

    try {
      if (isEdit) {
        // await updateBudget(budget.id, form);
        toast.success("Budget updated");
      } else {
        // await createBudget(form);
        toast.success("Budget created");
      }
      setOpen(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(
        err.message || `Failed to ${isEdit ? "update" : "create"} budget`,
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isIcon ? (
          <Button
            size="icon"
            className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            <Plus className="h-7 w-7" />
          </Button>
        ) : isEdit ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary/80"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-1.5 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
            <Plus className="h-4 w-4" />
            Add Budget
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[90%] max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Budget" : "Create New Budget"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Type Select */}
          <div className="grid gap-2">
            <Label>Type</Label>
            <DatePickerDemo />
            <Select
              value={form.type}
              onValueChange={(v) => setForm({ ...form, type: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date / Month Picker with shadcn Calendar */}
          <div className="grid gap-2">
            <Label>{form.type === "DAILY" ? "Date" : "Month"}</Label>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !(
                      (form.type === "DAILY" && selectedDate) ||
                      (form.type === "MONTHLY" && selectedMonth)
                    ) && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {form.type === "DAILY"
                    ? selectedDate
                      ? format(selectedDate, "dd MMMM yyyy")
                      : "Select a date"
                    : selectedMonth
                      ? format(selectedMonth, "MMMM yyyy")
                      : "Select a month"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                {form.type === "DAILY" ? (
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleDateSelect}
                    initialFocus
                    fromDate={new Date("2020-01-01")}
                  />
                ) : (
                  <Calendar
                    mode="single"
                    selected={selectedMonth}
                    onSelect={handleMonthSelect}
                    initialFocus
                    fromDate={new Date("2020-01-01")}
                    footer={
                      <p className="px-3 pb-3 text-center text-xs text-muted-foreground">
                        Click any date to select the month
                      </p>
                    }
                  />
                )}
              </PopoverContent>
            </Popover>
          </div>

          {/* Amount Input */}
          <div className="grid gap-2">
            <Label>Amount</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="e.g. 1500"
            />
          </div>

          {/* Category List */}
          <div className="grid gap-1">
            <Label>Category</Label>
            <div className="max-h-80 overflow-y-auto -mx-1 px-1">
              {expenseCategories.length === 0 ? (
                <p className="text-center text-[10px] text-muted-foreground py-1">
                  No categories available
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

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BudgetFormModal;
