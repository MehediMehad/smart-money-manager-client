import { CalendarDays, WalletCards } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatDate } from "@/lib/format";

type Debt = {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
};

type DebtListProps = {
  title: string;
  totalLabel: string;
  total: number;
  items: Debt[];
  color: "green" | "red";
  emptyTitle: string;
  emptyText: string;
};

function DebtList({
  title,
  totalLabel,
  total,
  items,
  color,
  emptyTitle,
  emptyText,
}: DebtListProps) {
  const isGreen = color === "green";

  return (
    <div className="overflow-hidden  rounded-2xl border border-slate-200 bg-white">
      <div className="border-b p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>

        <p
          className={cn(
            "mt-2 text-lg font-semibold",
            isGreen ? "text-emerald-600" : "text-red-500",
          )}
        >
          {totalLabel} {total}
        </p>
      </div>

      {items.length ? (
        <div className="divide-y min-h-[250px]">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between px-4 py-4"
            >
              <div>
                <p className="font-semibold">{item.name}</p>

                <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                  <CalendarDays className="h-3.5 w-3.5" />
                  <span>{formatDate(item.dueDate)}</span>
                </div>
              </div>

              <p
                className={cn(
                  "font-bold",
                  isGreen ? "text-emerald-600" : "text-red-500",
                )}
              >
                {item.amount}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex min-h-[250px] flex-col items-center justify-center px-6 text-center">
          <div
            className={cn(
              "flex h-16 w-16 items-center justify-center rounded-full",
              isGreen
                ? "bg-emerald-50 text-emerald-600"
                : "bg-red-100 text-red-500",
            )}
          >
            <WalletCards className="h-7 w-7" />
          </div>

          <h4 className="mt-4 font-bold">{emptyTitle}</h4>
          <p className="mt-1 text-sm text-slate-500">{emptyText}</p>
        </div>
      )}
    </div>
  );
}

export default DebtList;
