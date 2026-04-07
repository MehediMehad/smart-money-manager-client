import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { TBudget } from "@/constants";
import { cn } from "@/lib/utils";

interface Props {
  budget: TBudget;
}

export default function BudgetCard({ budget }: Props) {
  const spent = budget.spent ?? 0;
  const amount = budget.amount ?? 0;
  const percent = amount > 0 ? (spent / amount) * 100 : 0;
  const percentRounded = Math.round(percent);
  const remaining = amount - spent;

  const isOver = percent > 100;
  const isWarning = percent > 80 && percent <= 100;
  const isSafe = percent <= 80;

  const statusColor = isOver
    ? "bg-red-600"
    : isWarning
      ? "bg-amber-500"
      : "bg-emerald-600";

  const statusBg = isOver
    ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800/40"
    : isWarning
      ? "bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800/40"
      : "bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/50 dark:border-emerald-800/30";

  const statusText = isOver
    ? `Over Budget (${percentRounded}%)`
    : isWarning
      ? `Warning (${percentRounded}%)`
      : `On Track (${percentRounded}%)`;

  return (
    <Card
      className={cn(
        "rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border",
        statusBg,
        isOver && "border-red-500/50",
        isWarning && "border-amber-500/50",
        isSafe && "border-emerald-500/50",
      )}
    >
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between items-start">
          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <span>{budget.category?.emoji}</span>
              <span>{budget.category?.name || "Unnamed Budget"}</span>
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {budget.type} Budget
            </p>
          </div>

          {(isOver || isWarning) && (
            <AlertTriangle
              className={cn(
                "h-6 w-6",
                isOver ? "text-red-500" : "text-amber-500",
              )}
            />
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span
              className={cn(
                "font-medium",
                isOver && "text-red-600",
                isWarning && "text-amber-600",
                isSafe && "text-emerald-600",
              )}
            >
              {percentRounded}%
            </span>
          </div>

          <div className="h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className={cn("h-full transition-all duration-500", statusColor)}
              style={{ width: `${Math.min(percentRounded, 100)}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-muted-foreground">Budget</p>
            <p className="font-bold text-emerald-600">
              {amount.toLocaleString()} BDT
            </p>
          </div>
          <div className="text-right">
            <p className="text-muted-foreground">Spent</p>
            <p
              className={cn(
                "font-bold",
                isOver && "text-red-600",
                isWarning && "text-amber-600",
              )}
            >
              {spent.toLocaleString()} BDT
            </p>
          </div>
        </div>

        <div className="text-xs space-y-1.5 pt-2 border-t">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Remaining</span>
            <span
              className={cn("font-medium", remaining < 0 && "text-red-600")}
            >
              {remaining.toLocaleString()} BDT
            </span>
          </div>

          <p
            className={cn(
              "font-medium",
              isOver
                ? "text-red-600"
                : isWarning
                  ? "text-amber-600"
                  : "text-emerald-600",
            )}
          >
            {statusText}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
