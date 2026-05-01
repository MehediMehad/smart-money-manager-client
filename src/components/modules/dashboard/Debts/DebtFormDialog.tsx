"use client";

import { useEffect, useState } from "react";
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
import { TDebt, TDebtStatus, TDebtType } from "@/types/debts";
import { DebtFormValues, debtSchema } from "@/validations/debtsValidations";
import { createDebt, updateDebt } from "@/services/Debts";

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  debt?: TDebt;
};

const debtTypes: { label: string; value: TDebtType; hint: string }[] = [
  {
    label: "Given",
    value: "GIVEN",
    hint: "People owe you",
  },
  {
    label: "Taken",
    value: "TAKEN",
    hint: "You owe someone",
  },
];

const debtStatuses: { label: string; value: TDebtStatus }[] = [
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Paid",
    value: "PAID",
  },
  //   {
  //     label: "Overdue",
  //     value: "OVERDUE",
  //   },
];

export default function DebtFormDialog({
  open,
  onClose,
  onSuccess,
  debt,
}: Props) {
  const isEdit = Boolean(debt);

  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const today = new Date();
  const todayDate = format(today, "yyyy-MM-dd");

  const getDefaultValues = (): DebtFormValues => {
    if (isEdit && debt) {
      return {
        person: debt.person || "",
        amount: debt.amount ? String(debt.amount) : "",
        type: debt.type || "GIVEN",
        dueDate: debt.dueDate
          ? format(new Date(debt.dueDate), "yyyy-MM-dd")
          : todayDate,
        status: debt.status || "PENDING",
        note: debt.note || "",
      };
    }

    return {
      person: "",
      amount: "",
      type: "GIVEN",
      dueDate: todayDate,
      status: "PENDING",
      note: "",
    };
  };

  const form = useForm<DebtFormValues>({
    resolver: zodResolver(debtSchema),
    defaultValues: getDefaultValues(),
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = form;

  useEffect(() => {
    if (open) {
      reset(getDefaultValues());
    }
  }, [open, debt, isEdit]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (values: DebtFormValues) => {
    try {
      const payload = {
        person: values.person.trim(),
        amount: Number(values.amount),
        type: values.type,
        dueDate: values.dueDate,
        status: values.status,
        note: values.note?.trim() || "",
      };

      const result =
        isEdit && debt?.id
          ? await updateDebt(debt.id, payload)
          : await createDebt(payload);

      if (!result.success) {
        throw new Error(result.message || "Operation failed");
      }

      toast.success(
        result.message ||
          (isEdit ? "Debt updated successfully" : "Debt created successfully"),
      );

      reset(getDefaultValues());
      setDatePickerOpen(false);
      onSuccess();
    } catch (err: any) {
      toast.error(
        err?.message || `Failed to ${isEdit ? "update" : "create"} debt`,
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
          <DialogTitle>{isEdit ? "Edit Debt" : "Add New Debt"}</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 py-4">
            <FormField
              control={form.control}
              name="person"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Person</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Robin"
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
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Debt Type</FormLabel>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {debtTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => field.onChange(type.value)}
                        className={cn(
                          "rounded-xl border p-4 text-left transition-colors",
                          field.value === type.value
                            ? "border-primary bg-primary/10 text-primary shadow-sm"
                            : "border-border hover:bg-muted",
                        )}
                      >
                        <p className="font-medium">{type.label}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {type.hint}
                        </p>
                      </button>
                    ))}
                  </div>

                  <FormMessage />
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
                      placeholder="e.g. 5000"
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
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="mb-2">Due Date</FormLabel>

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
                            : "Pick a due date"}
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
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>

                  <div className="flex flex-wrap gap-2">
                    {debtStatuses.map((status) => (
                      <button
                        key={status.value}
                        type="button"
                        onClick={() => field.onChange(status.value)}
                        className={cn(
                          "inline-flex items-center rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                          field.value === status.value
                            ? "border-primary bg-primary/10 text-primary"
                            : "border-transparent text-muted-foreground hover:border-primary/40 hover:bg-primary/10 hover:text-primary",
                        )}
                      >
                        {status.label}
                      </button>
                    ))}
                  </div>

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
                      placeholder="e.g. Personal loan"
                      className="min-h-[100px] py-3 resize-y"
                      {...field}
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
                    : "Adding Debt..."
                  : isEdit
                    ? "Save Changes"
                    : "Add Debt"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
