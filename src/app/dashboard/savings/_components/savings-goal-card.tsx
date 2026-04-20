import Link from "next/link";
import { Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  formatGoalDate,
  getDailyRequiredAmount,
  getDaysLeft,
  getGoalProgress,
  getRemainingAmount,
  isGoalCompleted,
} from "@/lib/savings/utils";
import { TSavingsGoal } from "@/types";

type Props = {
  goal: TSavingsGoal;
};

const SavingsGoalCard = ({ goal }: Props) => {
  const progress = getGoalProgress(goal.savedAmount, goal.targetAmount);
  const remaining = getRemainingAmount(goal.savedAmount, goal.targetAmount);
  const daysLeft = getDaysLeft(goal.deadline);
  const dailyNeed = getDailyRequiredAmount(goal);
  const completed = isGoalCompleted(goal);

  return (
    <Link href={`/dashboard/savings/${goal.id}`}>
      <Card
        className={cn(
          "overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg",
          completed &&
            "border-2 border-emerald-500/50 bg-emerald-50/30 dark:bg-emerald-950/20",
        )}
      >
        <CardContent className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold">{goal.name}</h3>
            {completed ? <Trophy className="h-6 w-6 text-yellow-500" /> : null}
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>

            <div className="h-2.5 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
              <div
                className={cn(
                  "h-full",
                  completed ? "bg-yellow-500" : "bg-emerald-600",
                )}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground">Saved</p>
              <p className="font-bold text-emerald-600">{goal.savedAmount}</p>
            </div>
            <div className="text-right">
              <p className="text-muted-foreground">Remaining</p>
              <p className="font-bold">{remaining}</p>
            </div>
          </div>

          <div className="space-y-1 border-t pt-2 text-xs">
            <p>Deadline: {formatGoalDate(goal.deadline)}</p>

            {!completed && daysLeft > 0 ? (
              <p className={cn(daysLeft < 15 && "font-medium text-amber-600")}>
                Daily required: {dailyNeed}
              </p>
            ) : null}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SavingsGoalCard;
