"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { format } from "date-fns";

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
import { CalendarIcon, Pencil, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

import { MonthPicker } from "@/components/shared/core/MonthPicker";
import { budgetSchema, BudgetFormValues } from "@/validations/budgetValidation";
import { TCategory } from "@/types";
import { createBudgetLimit, updateBudgetLimit } from "@/services/Budget";

type Props = {
  mode: "create" | "edit";
  budget?: any; // improve type later if possible
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

  const form = useForm<BudgetFormValues>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      type: isEdit ? (budget?.type ?? "DAILY") : "DAILY",
      date: isEdit && budget?.date ? budget.date : "",
      month: isEdit && budget?.month ? budget.month : "",
      amount: isEdit && budget?.amount ? String(budget.amount) : "",
      categoryId: isEdit && budget?.categoryId ? budget.categoryId : "",
    },
  });

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const selectedType = watch("type");
  const selectedCategoryId = watch("categoryId");

  const selectedCategory = expenseCategories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  const amountInputRef = useRef<HTMLInputElement>(null);

  // Reset dependent fields when type changes
  useEffect(() => {
    if (selectedType === "DAILY") {
      setValue("month", "", { shouldValidate: true });
    } else {
      setValue("date", "", { shouldValidate: true });
    }
  }, [selectedType, setValue]);

  const onSubmit = async (values: BudgetFormValues) => {
    try {
      let result;

      if (isEdit) {
        // Only amount is updatable
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

      form.reset();
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

      <DialogContent className="w-[90%] max-w-md rounded-2xl">
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
                  <FormControl>
                    <select
                      {...field}
                      className={cn(
                        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                      )}
                    >
                      <option value="DAILY">Daily</option>
                      <option value="MONTHLY">Monthly</option>
                    </select>
                  </FormControl>
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
                  <Popover modal>
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
                            ? selectedType === "DAILY"
                              ? format(new Date(field.value), "dd MMMM yyyy")
                              : format(
                                  new Date(field.value + "-01"),
                                  "MMMM yyyy",
                                )
                            : selectedType === "DAILY"
                              ? "Pick a date"
                              : "Pick a month"}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      {selectedType === "DAILY" ? (
                        <Calendar
                          mode="single"
                          selected={
                            field.value ? new Date(field.value) : undefined
                          }
                          onSelect={(date) =>
                            field.onChange(
                              date ? format(date, "yyyy-MM-dd") : "",
                            )
                          }
                          initialFocus
                        />
                      ) : (
                        <MonthPicker
                          selectedMonth={
                            field.value
                              ? new Date(field.value + "-01")
                              : undefined
                          }
                          onMonthChange={(date) =>
                            field.onChange(date ? format(date, "yyyy-MM") : "")
                          }
                        />
                      )}
                    </PopoverContent>
                  </Popover>
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
                              // optional: auto focus amount
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
              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
              >
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
