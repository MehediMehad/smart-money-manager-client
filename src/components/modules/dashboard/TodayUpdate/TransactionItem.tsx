import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const TransactionItem = ({ tx }: any) => {
  const isIncome = tx.type === "income";
  const isExpense = tx.type === "expense";

  return (
    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl",
            isIncome
              ? "bg-emerald-100 text-emerald-600"
              : isExpense
                ? "bg-rose-100 text-rose-600"
                : "bg-teal-100 text-teal-600",
          )}
        >
          {isIncome ? (
            <ArrowUpRight />
          ) : isExpense ? (
            <ArrowDownRight />
          ) : (
            <DollarSign />
          )}
        </div>

        <div>
          <p className="font-semibold text-slate-950">{tx.category}</p>
          <p className="text-xs text-slate-500">
            {tx.time} • {tx.note}
          </p>
        </div>
      </div>

      <p
        className={cn(
          "font-bold",
          isIncome
            ? "text-emerald-600"
            : isExpense
              ? "text-rose-600"
              : "text-teal-600",
        )}
      >
        {isExpense ? "-" : "+"}৳{Number(tx.amount || 0).toLocaleString()}
      </p>
    </div>
  );
};

export default TransactionItem;
