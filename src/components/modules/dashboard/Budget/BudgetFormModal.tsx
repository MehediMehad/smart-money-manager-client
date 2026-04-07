"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { MonthPicker } from "@/components/shared/core/MonthPicker";
import { budgetSchema, BudgetFormValues } from "@/validations/budgetValidation";
import { TCategory } from "@/types";
import { createBudgetLimit, updateBudgetLimit } from "@/services/Budget";

type Props = {
  mode: "create" | "edit";
  budget?: any;
  isIcon?: boolean;
  onSuccess?: () => void;
  categories: TCategory[];
};

export default function BudgetFormModal({
  mode,
  budget,
  isIcon,
  onSuccess,
  categories,
}: Props) {
  const isEdit = mode === "edit";
  const expenseCategories = categories.filter((cat) => cat.type === "EXPENSE");

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);

  const today = new Date();
  const todayDate = format(today, "yyyy-MM-dd");
  const currentMonth = format(today, "yyyy-MM");

  const defaultType = isEdit ? (budget?.type ?? "DAILY") : "DAILY";

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      type: defaultType,
      date: isEdit
        ? (budget?.date ?? "")
        : defaultType === "DAILY"
          ? todayDate
          : "",
      month: isEdit
        ? (budget?.month ?? "")
        : defaultType === "MONTHLY"
          ? currentMonth
          : "",
      amount: isEdit && budget?.amount ? String(budget.amount) : "",
      categoryId: isEdit && budget?.categoryId ? budget.categoryId : "",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const selectedType = watch("type");
  const selectedCategoryId = watch("categoryId");

  const selectedCategory = expenseCategories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  const amountInputRef = useRef<HTMLInputElement>(null);
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;

      if (!isEdit) {
        setValue("date", todayDate, { shouldValidate: true });
        setValue("month", "", { shouldValidate: false });
      }

      return;
    }

    if (selectedType === "DAILY") {
      setValue("date", watch("date") || todayDate, { shouldValidate: true });
      setValue("month", "", { shouldValidate: true });
    } else {
      setValue("month", watch("month") || currentMonth, {
        shouldValidate: true,
      });
      setValue("date", "", { shouldValidate: true });
    }
  }, [selectedType, setValue, watch, todayDate, currentMonth, isEdit]);

  const handleCancel = () => {
    reset({
      type: isEdit ? (budget?.type ?? "DAILY") : "DAILY",
      date: isEdit ? (budget?.date ?? "") : todayDate,
      month: isEdit ? (budget?.month ?? "") : "",
      amount: isEdit && budget?.amount ? String(budget.amount) : "",
      categoryId: isEdit && budget?.categoryId ? budget.categoryId : "",
    });
  };

  const onSubmit = async (values: BudgetFormValues) => {
    try {
      let result;

      if (isEdit) {
        result = await updateBudgetLimit({
          id: budget.id,
          amount: Number(values.amount),
        });
      } else {
        result = await createBudgetLimit({
          categoryId: values.categoryId,
          amount: Number(values.amount),
          type: values.type,
          date: values.date || undefined,
          month: values.month || undefined,
        });
      }

      if (!result.success) {
        throw new Error(result.message);
      }

      toast.success(
        isEdit ? "Budget updated successfully" : "Budget created successfully",
      );

      reset({
        type: "DAILY",
        date: todayDate,
        month: "",
        amount: "",
        categoryId: "",
      });
      // close modal
      handleCancel();

      onSuccess?.();
    } catch (err: any) {
      console.error(err);
      toast.error(
        err.message || `Failed to ${isEdit ? "update" : "create"} budget`,
      );
    }
  };

  return (
    <Dialog>
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

      <DialogContent className="max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Budget" : "Create New Budget"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
            {/* Type */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={field.value}
                    onValueChange={(value: "DAILY" | "MONTHLY") => {
                      field.onChange(value);

                      if (value === "DAILY") {
                        setValue("date", watch("date") || todayDate, {
                          shouldValidate: true,
                        });
                        setValue("month", "", { shouldValidate: true });
                      } else {
                        setValue("month", watch("month") || currentMonth, {
                          shouldValidate: true,
                        });
                        setValue("date", "", { shouldValidate: true });
                      }
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select budget type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DAILY">Daily</SelectItem>
                      <SelectItem value="MONTHLY">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date or Month */}
            <FormField
              control={form.control}
              name={selectedType === "DAILY" ? "date" : "month"}
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>
                    {selectedType === "DAILY" ? "Select Date" : "Select Month"}
                  </FormLabel>

                  {selectedType === "DAILY" ? (
                    <Popover
                      open={datePickerOpen}
                      onOpenChange={setDatePickerOpen}
                      modal
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(new Date(field.value), "dd MMMM yyyy")
                              : "Pick a date"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) => {
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : "",
                            );
                            setDatePickerOpen(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Popover
                      open={monthPickerOpen}
                      onOpenChange={setMonthPickerOpen}
                      modal
                    >
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(
                                  new Date(`${field.value}-01`),
                                  "MMMM yyyy",
                                )
                              : "Pick a month"}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>

                      <PopoverContent className="w-auto p-0" align="start">
                        <MonthPicker
                          selectedMonth={
                            field.value
                              ? new Date(`${field.value}-01`)
                              : undefined
                          }
                          onMonthChange={(date) => {
                            field.onChange(date ? format(date, "yyyy-MM") : "");
                            setMonthPickerOpen(false);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Amount */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 1500"
                      {...field}
                      ref={(e) => {
                        field.ref(e);
                        amountInputRef.current = e;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category */}
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <div className="max-h-72 overflow-y-auto -mx-1 px-1">
                    {expenseCategories.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        No expense categories available
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {expenseCategories.map((cat) => (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => {
                              field.onChange(cat.id);
                              setTimeout(
                                () => amountInputRef.current?.focus(),
                                80,
                              );
                            }}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                              "border hover:bg-primary/10 hover:text-primary hover:border-primary/40",
                              field.value === cat.id
                                ? "bg-primary/15 text-primary border-primary/40 shadow-sm"
                                : "text-muted-foreground border-transparent",
                            )}
                          >
                            <span className="text-base">{cat.emoji}</span>
                            {cat.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <FormMessage />
                  {selectedCategory && (
                    <p className="text-xs text-muted-foreground mt-1.5 text-center">
                      Selected: {selectedCategory.emoji} {selectedCategory.name}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col sm:flex-row gap-3 pt-2">
              <Button type="button" variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                {isSubmitting
                  ? isEdit
                    ? "Updating..."
                    : "Creating..."
                  : isEdit
                    ? "Update Budget"
                    : "Create Budget"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
