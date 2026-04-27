import { cn } from "@/lib/utils";

export interface TodayData {
  date: string;
  income: number;
  expense: number;
  budgetRemaining: number;
  savingsAdded: number;
  todayBudget: number;
  todaySpentPercent: number;
  status: "good" | "warning" | "danger";
}

const DailySpendingProgress = ({ todayData }: { todayData: TodayData }) => {
  return (
    <div className="rounded-2xl bg-muted p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Daily spending</span>
        <span className="font-semibold">{todayData.todaySpentPercent}%</span>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-background">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            todayData.todaySpentPercent > 90
              ? "bg-red-600"
              : todayData.todaySpentPercent > 70
                ? "bg-amber-500"
                : "bg-emerald-500",
          )}
          style={{ width: `${todayData.todaySpentPercent}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {todayData.expense} spent of {todayData.todayBudget}
      </p>
    </div>
  );
};

export default DailySpendingProgress;
