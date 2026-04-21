import Link from "next/link";
import { CheckCircle2, Trophy } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TSavingsGoal } from "../_lib/types";
import {
  getDailyRequiredAmount,
  getDaysLeft,
  getDeadLineOver,
  getExceededAmount,
  getGoalProgress,
  getRemainingAmount,
  isGoalCompleted,
} from "../_lib/calculations";
import { formatGoalDate } from "../_lib/formatters";

type Props = {
  goal: TSavingsGoal;
};

const SavingsGoalCard = ({ goal }: Props) => {
  const progress = getGoalProgress(goal.savedAmount, goal.targetAmount);
  const remaining = getRemainingAmount(goal.savedAmount, goal.targetAmount);
  const exceeded = getExceededAmount(goal.savedAmount, goal.targetAmount);
  const daysLeft = getDaysLeft(goal.deadline);
  const dailyNeed = getDailyRequiredAmount(goal);
  const completed = isGoalCompleted(goal);
  const deadlineOver = getDeadLineOver(goal.deadline);

  return (
    <Link href={`/dashboard/savings/${goal.id}`}>
      <Card
        className={cn(
          "overflow-hidden rounded-2xl shadow-sm transition-all duration-300 hover:shadow-lg",
          // completed &&
          //   "border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/10",
          // deadlineOver &&
          //   !completed &&
          //   "border-2 border-red-500/40 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/10",
        )}
      >
        <CardContent className="space-y-4 p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1 flex-1 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{goal.name}</h3>

              {completed ? (
                <div className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Completed
                </div>
              ) : deadlineOver ? (
                <div className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
                  Deadline Over
                </div>
              ) : (
                <div className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
                  Deadline in {daysLeft} {daysLeft === 1 ? "day" : "days"}
                </div>
              )}
            </div>

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
                  completed
                    ? "bg-gradient-to-r from-emerald-500 to-teal-500"
                    : deadlineOver
                      ? "bg-red-500"
                      : "bg-emerald-600",
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
              <p className="text-muted-foreground">
                {completed ? "Exceeded" : "Remaining"}
              </p>
              <p className="font-bold">{completed ? exceeded : remaining}</p>
            </div>
          </div>

          <div className="space-y-1 border-t pt-2 text-xs">
            <p>Deadline: {formatGoalDate(goal.deadline)}</p>

            {completed ? (
              <p className="font-medium text-emerald-600">
                Goal achieved successfully
              </p>
            ) : deadlineOver ? (
              <p className="font-medium text-red-600">
                You missed the deadline
              </p>
            ) : daysLeft < 15 ? (
              <p className={cn(daysLeft < 15 && "font-medium text-amber-600")}>
                Deadline in {daysLeft} {daysLeft === 1 ? "day" : "days"} days
              </p>
            ) : (
              <p className={cn(daysLeft && "font-medium text-amber-600")}>
                You need to save at least {dailyNeed} per day
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default SavingsGoalCard;
