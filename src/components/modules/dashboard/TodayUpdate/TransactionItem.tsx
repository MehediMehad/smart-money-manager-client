import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

const TransactionItem = ({ tx }: any) => {
  return (
    <div className="flex items-center justify-between rounded-2xl border bg-white p-4">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full",
            tx.type === "income"
              ? "bg-emerald-100 text-emerald-700"
              : tx.type === "expense"
                ? "bg-rose-100 text-rose-700"
                : "bg-teal-100 text-teal-700",
          )}
        >
          {tx.type === "income" ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : tx.type === "expense" ? (
            <ArrowDownRight className="h-4 w-4" />
          ) : (
            <DollarSign className="h-4 w-4" />
          )}
        </div>

        <div>
          <p className="font-medium">{tx.category}</p>
          <p className="text-xs text-muted-foreground">
            {tx.time} • {tx.note}
          </p>
        </div>
      </div>

      <p
        className={cn(
          "font-semibold",
          tx.type === "income"
            ? "text-emerald-600"
            : tx.type === "expense"
              ? "text-rose-600"
              : "text-teal-600",
        )}
      >
        {tx.type === "expense" ? "-" : "+"}
        {tx.amount}
      </p>
    </div>
  );
};

export default TransactionItem;
