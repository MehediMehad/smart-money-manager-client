import { cn } from "@/lib/utils";

const DailySpendingProgress = ({ todayData }: any) => {
  return (
    <div className="rounded-2xl bg-muted p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Daily spending</span>
        <span className="font-semibold">{todayData.dailySpentPercent}%</span>
      </div>

      <div className="mt-3 h-3 overflow-hidden rounded-full bg-background">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            todayData.dailySpentPercent > 90
              ? "bg-red-600"
              : todayData.dailySpentPercent > 70
                ? "bg-amber-500"
                : "bg-emerald-500",
          )}
          style={{ width: `${todayData.dailySpentPercent}%` }}
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {todayData.expense} spent of {todayData.dailyBudget}
      </p>
    </div>
  );
};

export default DailySpendingProgress;
