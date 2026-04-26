"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { TExpense } from "../_lib/types";

const ExpenseViewDialog = ({
  expense,
  onClose,
}: {
  expense: TExpense | null;
  onClose: () => void;
}) => {
  return (
    <Dialog open={!!expense} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-24px)] max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Expense Details</DialogTitle>
        </DialogHeader>

        {expense && (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">
                {format(new Date(expense.date), "dd MMM yyyy")}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">
                {expense.category?.emoji} {expense.category?.name || "N/A"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold text-rose-600">
                ৳{expense.amount?.toLocaleString()}
              </span>
            </div>

            <div>
              <p className="mb-1 text-muted-foreground">Note</p>
              <p className="rounded-lg bg-muted p-3">{expense.note || "N/A"}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseViewDialog;
