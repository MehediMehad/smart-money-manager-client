import { AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDailyRequiredAmount, getDaysLeft } from "@/lib/savings/utils";
import { TSavingsGoal } from "@/types";

type Props = {
  alertGoals: TSavingsGoal[];
};

const SavingsAlertCard = ({ alertGoals }: Props) => {
  if (alertGoals.length === 0) return null;

  return (
    <Card className="rounded-2xl border border-red-200 bg-red-50/60 dark:bg-red-950/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-red-600">
          <AlertTriangle className="h-5 w-5" />
          Alerts
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {alertGoals.map((goal) => {
          const daysLeft = getDaysLeft(goal.deadline);
          const isOverdue = daysLeft <= 0;

          return (
            <div
              key={goal.id}
              className="flex items-center justify-between rounded-lg border bg-background/60 p-3 text-sm"
            >
              <div>
                <p className="font-medium">{goal.name}</p>

                {isOverdue ? (
                  <p className="text-xs text-red-500">Deadline over</p>
                ) : (
                  <p className="text-xs text-amber-500">
                    Deadline in {daysLeft} days
                  </p>
                )}
              </div>

              <p
                className={
                  isOverdue
                    ? "font-semibold text-red-600"
                    : "font-semibold text-amber-600"
                }
              >
                {isOverdue
                  ? "Target not reached"
                  : `Daily needed: ${getDailyRequiredAmount(goal)}`}
              </p>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default SavingsAlertCard;
