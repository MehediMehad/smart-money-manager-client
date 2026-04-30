import { Progress } from "@/components/ui/progress";
import { TodayData } from "@/types";

const DailySpendingProgress = ({ todayData }: { todayData: TodayData }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-slate-500">Daily spending</span>
        <span className="font-bold text-slate-600">
          {todayData.todaySpentPercent || 0}%
        </span>
      </div>

      <Progress
        value={todayData.todaySpentPercent || 0}
        className="h-3 bg-slate-100"
      />

      <p className="text-sm text-slate-500">
        ৳{Number(todayData.expense || 0).toLocaleString()} spent of ৳
        {Number(todayData.todayBudget || 0).toLocaleString()}
      </p>
    </div>
  );
};

export default DailySpendingProgress;
