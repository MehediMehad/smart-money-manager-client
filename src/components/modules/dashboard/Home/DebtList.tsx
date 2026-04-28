import { HandCoins } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import IconBox from "./IconBox";
import { formatDate } from "@/lib/format";

function DebtList({
  title,
  items,
  color,
}: {
  title: string;
  items: { id: string; name: string; amount: number; dueDate: string }[];
  color: "green" | "red";
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {items.length ? (
          items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border bg-slate-50/50 p-3"
            >
              <div className="flex items-center gap-3">
                <IconBox
                  icon={HandCoins}
                  color={color === "green" ? "green" : "red"}
                  small
                />
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-xs text-slate-500">
                    {formatDate(item.dueDate)}
                  </p>
                </div>
              </div>

              <p
                className={cn(
                  "font-bold",
                  color === "green" ? "text-emerald-600" : "text-red-500",
                )}
              >
                {item.amount}
              </p>
            </div>
          ))
        ) : (
          <p className="text-sm text-slate-500">No debts found.</p>
        )}
      </div>
    </div>
  );
}

export default DebtList;
