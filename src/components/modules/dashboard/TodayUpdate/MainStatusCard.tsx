import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import DailySpendingProgress from "./DailySpendingProgress";
import { TodayData } from "@/types";

const MainStatusCard = ({ todayData }: { todayData: TodayData }) => {
  const isGood = todayData.status === "good";

  return (
    <Card
      className={cn(
        "rounded-2xl border bg-white shadow-sm",
        isGood ? "border-emerald-200" : "border-amber-200",
      )}
    >
      <CardContent className="p-5 sm:p-6">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:items-center">
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
                isGood
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-amber-100 text-amber-600",
              )}
            >
              {isGood ? (
                <CheckCircle2 className="h-7 w-7" />
              ) : (
                <AlertTriangle className="h-7 w-7" />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-950">
                {isGood
                  ? "You’re doing well today! 🎉"
                  : "Watch your spending today"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                You have ৳{Number(todayData.budgetRemaining).toLocaleString()}{" "}
                remaining from today’s budget.
              </p>
            </div>
          </div>

          <DailySpendingProgress todayData={todayData} />
        </div>
      </CardContent>
    </Card>
  );
};

export default MainStatusCard;
