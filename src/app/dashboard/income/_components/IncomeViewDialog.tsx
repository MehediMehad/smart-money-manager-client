"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { TIncome } from "../_lib/types";

const IncomeViewDialog = ({
  income,
  onClose,
}: {
  income: TIncome | null;
  onClose: () => void;
}) => {
  return (
    <Dialog open={!!income} onOpenChange={onClose}>
      <DialogContent className="w-[calc(100vw-24px)] max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>Income Details</DialogTitle>
        </DialogHeader>

        {income && (
          <div className="space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Date</span>
              <span className="font-medium">
                {format(new Date(income.date), "dd MMM yyyy")}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Category</span>
              <span className="font-medium">
                {income.category?.emoji} {income.category?.name || "N/A"}
              </span>
            </div>

            <div className="flex justify-between gap-4">
              <span className="text-muted-foreground">Amount</span>
              <span className="font-semibold text-emerald-600">
                ৳{income.amount?.toLocaleString()}
              </span>
            </div>

            <div>
              <p className="mb-1 text-muted-foreground">Note</p>
              <p className="rounded-lg bg-muted p-3">{income.note || "N/A"}</p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default IncomeViewDialog;
