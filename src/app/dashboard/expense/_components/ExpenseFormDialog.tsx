"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

import { cn } from "@/lib/utils";
import { TCategory } from "@/types";
import { ExpenseFormValues, expenseSchema } from "../_lib/validations";
import { createExpense, updateExpense } from "../_actions";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  expense?: any;
  categories: TCategory[];
};

export default function ExpenseFormDialog({
  open,
  onClose,
  onSuccess,
  expense,
  categories = [],
}: Props) {
  const isEdit = Boolean(expense);
  const expenseCategories = categories;

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const noteInputRef = useRef<HTMLTextAreaElement>(null);

  const today = new Date();
  const todayDate = format(today, "yyyy-MM-dd");

  const getDefaultValues = (): ExpenseFormValues => {
    if (isEdit && expense) {
      return {
        categoryId: expense.categoryId || expense.category?.id || "",
        amount: expense.amount ? String(expense.amount) : "",
        note: expense.note || "",
        date: expense.date
          ? format(new Date(expense.date), "yyyy-MM-dd")
          : todayDate,
      };
    }

    return {
      categoryId: "",
      amount: "",
      note: "",
      date: todayDate,
    };
  };

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const selectedCategoryId = watch("categoryId");
  const selectedCategory = expenseCategories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  useEffect(() => {
    if (open) {
      reset(getDefaultValues());
    }
  }, [open, expense, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: ExpenseFormValues) => {
    try {
      let result;

      if (isEdit && expense?.id) {
        result = await updateExpense(expense.id, {
          categoryId: values.categoryId,
          amount: Number(values.amount),
          note: values.note,
          date: values.date,
        });
      } else {
        result = await createExpense({
          categoryId: values.categoryId,
          amount: Number(values.amount),
          note: values.note,
          date: values.date,
        });
      }

      if (!result.success) {
        throw new Error(result.message || "Operation failed");
      }

      toast.success(
        isEdit
          ? "Expense updated successfully"
          : "Expense created successfully",
      );

      reset(getDefaultValues());
      setDatePickerOpen(false);
      onSuccess();
    } catch (err: any) {
      toast.error(
        err?.message || `Failed to ${isEdit ? "update" : "create"} expense`,
      );
    }
  };

  const handleClose = () => {
    reset(getDefaultValues());
    setDatePickerOpen(false);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) handleClose();
      }}
    >
      <DialogContent className="w-[95%] sm:w-full overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Expense" : "Add New Expense"}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-2">Date</FormLabel>
                  <Popover
                    open={datePickerOpen}
                    onOpenChange={setDatePickerOpen}
                    modal
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start py-5 text-left font-normal",
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
                          if (!date) return;
                          field.onChange(format(date, "yyyy-MM-dd"));
                          setDatePickerOpen(false);
                        }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                                () => noteInputRef.current?.focus(),
                                100,
                              );
                            }}
                            className={cn(
                              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors border",
                              field.value === cat.id
                                ? "bg-primary/15 text-primary border-primary/40 shadow-sm"
                                : "text-muted-foreground border-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/40",
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
                    <p className="text-xs text-muted-foreground mt-1 text-center">
                      Selected: {selectedCategory.emoji} {selectedCategory.name}
                    </p>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount (৳)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="e.g. 25000"
                      className="py-5"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Note / Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Expense source or details"
                      className="min-h-[100px] py-3 resize-y"
                      {...field}
                      ref={(e) => {
                        field.ref(e);
                        noteInputRef.current = e;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col sm:flex-row gap-3 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
              >
                {isSubmitting
                  ? isEdit
                    ? "Saving..."
                    : "Adding Expense..."
                  : isEdit
                    ? "Save Changes"
                    : "Add Expense"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
