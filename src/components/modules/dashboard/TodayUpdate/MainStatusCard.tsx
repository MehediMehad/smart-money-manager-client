import { CheckCircle2, AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import DailySpendingProgress from "./DailySpendingProgress";

const MainStatusCard = ({ isGood, todayData }: any) => {
  return (
    <Card
      className={cn(
        "overflow-hidden rounded-2xl border-2 shadow-sm",
        isGood ? "border-emerald-500/60" : "border-amber-500/60",
      )}
    >
      <CardContent className="p-6">
        <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
          <div className="flex gap-4">
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-2xl",
                isGood
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-amber-100 text-amber-700",
              )}
            >
              {isGood ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <AlertTriangle className="h-6 w-6" />
              )}
            </div>

            <div>
              <h2 className="text-xl font-semibold">
                You’re doing well today 🎉
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                You have {todayData.budgetRemaining} remaining from today’s
                budget.
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
