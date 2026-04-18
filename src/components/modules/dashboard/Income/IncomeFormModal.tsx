"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { toast } from "sonner";
import { CalendarIcon, Pencil, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { createIncome, updateIncome } from "@/services/Income";
import { IncomeFormValues, incomeSchema } from "@/validations/incomeValidation";

type Props = {
  mode: "create" | "edit";
  income?: any;
  isIcon?: boolean;
  onSuccess?: () => void | Promise<void>;
  categories: TCategory[];
};

export default function IncomeFormModal({
  mode,
  income,
  isIcon,
  onSuccess,
  categories,
}: Props) {
  const isEdit = mode === "edit";
  const incomeCategories = categories.filter((cat) => cat.type === "INCOME");

  const [open, setOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const noteInputRef = useRef<HTMLTextAreaElement>(null);

  const today = new Date();
  const todayDate = format(today, "yyyy-MM-dd");

  const getDefaultValues = (): IncomeFormValues => {
    if (isEdit && income) {
      return {
        categoryId: income.categoryId || income.category?.id || "",
        amount: income.amount ? String(income.amount) : "",
        note: income.note || "",
        date: income.date
          ? format(new Date(income.date), "yyyy-MM-dd")
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

  const form = useForm<IncomeFormValues>({
    resolver: zodResolver(incomeSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    watch,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  const selectedCategoryId = watch("categoryId");
  const selectedCategory = incomeCategories.find(
    (cat) => cat.id === selectedCategoryId,
  );

  useEffect(() => {
    if (open) {
      reset(getDefaultValues());
    }
  }, [open, income, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: IncomeFormValues) => {
    try {
      let result;

      if (isEdit && income?.id) {
        result = await updateIncome(income.id, {
          categoryId: values.categoryId,
          amount: Number(values.amount),
          note: values.note,
          date: values.date,
        });
      } else {
        result = await createIncome({
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
        isEdit ? "Income updated successfully" : "Income created successfully",
      );

      reset(getDefaultValues());
      setDatePickerOpen(false);
      setOpen(false);

      await onSuccess?.();
    } catch (err: any) {
      toast.error(
        err?.message || `Failed to ${isEdit ? "update" : "create"} income`,
      );
    }
  };

  const handleCancel = () => {
    reset(getDefaultValues());
    setDatePickerOpen(false);
    setOpen(false);
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
            className="text-blue-600 transition-colors hover:text-blue-700 hover:bg-blue-100"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-2 py-5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700">
            <Plus className="h-4 w-4" />
            Add Income
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-[90%] md:max-w-xl rounded-2xl">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Income" : "Add New Income"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date</FormLabel>
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
                    {incomeCategories.length === 0 ? (
                      <p className="text-center text-sm text-muted-foreground py-4">
                        No income categories available
                      </p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {incomeCategories.map((cat) => (
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
                      placeholder="Income source or details"
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
                    : "Adding Income..."
                  : isEdit
                    ? "Update Income"
                    : "Add Income"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
