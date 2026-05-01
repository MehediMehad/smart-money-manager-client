"use client";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { cn } from "@/lib/utils";
import { TDebt } from "@/types/debts";

type Props = {
  debt: TDebt | null;
  onClose: () => void;
};

const formatCurrency = (value?: number) => {
  return `৳${Number(value || 0).toLocaleString()}`;
};

const formatDate = (date?: string | null) => {
  if (!date) return "N/A";

  return format(new Date(date), "dd MMM yyyy");
};

const getTypeLabel = (type?: string) => {
  if (type === "GIVEN") return "Given";
  if (type === "TAKEN") return "Taken";

  return "N/A";
};

const getTypeClassName = (type?: string) => {
  if (type === "GIVEN") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (type === "TAKEN") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  return "bg-muted text-muted-foreground border-border";
};

const getStatusClassName = (status?: string) => {
  if (status === "PAID") {
    return "bg-emerald-50 text-emerald-700 border-emerald-200";
  }

  if (status === "OVERDUE") {
    return "bg-red-50 text-red-700 border-red-200";
  }

  return "bg-amber-50 text-amber-700 border-amber-200";
};

export default function DebtViewDialog({ debt, onClose }: Props) {
  return (
    <Dialog
      open={!!debt}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose();
      }}
    >
      <DialogContent className="w-[95%] sm:w-full rounded-2xl">
        <DialogHeader>
          <DialogTitle>Debt Details</DialogTitle>
        </DialogHeader>

        {debt && (
          <div className="space-y-4 py-4">
            <div className="rounded-2xl border bg-muted/30 p-4">
              <p className="text-sm text-muted-foreground">Amount</p>
              <p
                className={cn(
                  "mt-1 text-3xl font-bold",
                  debt.type === "GIVEN" ? "text-emerald-600" : "text-red-600",
                )}
              >
                {formatCurrency(debt.amount)}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoItem label="Person" value={debt.person || "N/A"} />

              <div>
                <p className="text-sm text-muted-foreground">Type</p>
                <span
                  className={cn(
                    "mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
                    getTypeClassName(debt.type),
                  )}
                >
                  {getTypeLabel(debt.type)}
                </span>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <span
                  className={cn(
                    "mt-1 inline-flex rounded-full border px-2.5 py-1 text-xs font-medium",
                    getStatusClassName(debt.status),
                  )}
                >
                  {debt.status || "N/A"}
                </span>
              </div>

              <InfoItem label="Due Date" value={formatDate(debt.dueDate)} />

              <InfoItem label="Created At" value={formatDate(debt.createdAt)} />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">Note</p>
              <p className="mt-1 whitespace-pre-wrap rounded-xl border bg-background p-3 text-sm">
                {debt.note || "N/A"}
              </p>
            </div>
          </div>
        )}

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => {
  return (
    <div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
};
