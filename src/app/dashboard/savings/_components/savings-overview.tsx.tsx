import Link from "next/link";
import {
  AlertTriangle,
  Trophy,
  LineChart as LineChartIcon,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import {
  // formatCurrency,
  formatGoalDate,
  getDailyRequiredAmount,
  getDaysLeft,
  getGoalProgress,
  getRemainingAmount,
  isGoalCompleted,
} from "@/lib/savings/utils";
import { TMonthlySavingsTrend, TSavingsGoal } from "@/types";
import { CreateGoalDialog } from "./create-goal-dialog";
import { SavingsChart } from "./savings-chart";
import StatCard from "./stat-card";
import DataNotFount from "../../../../components/shared/DataNotFount";
import ErrorMessage from "@/components/shared/ErrorMessage";

type Props = {
  goals: TSavingsGoal[];
  trend: TMonthlySavingsTrend[];
  error: string | null;
};

export const SavingsOverview = ({ goals, trend, error }: Props) => {
  const totalSaved = goals.reduce((sum, goal) => sum + goal.savedAmount, 0);
  const activeGoals = goals.filter((goal) => !isGoalCompleted(goal)).length;
  const completedGoals = goals.filter(isGoalCompleted).length;
  const thisMonthSaved = trend.at(-1)?.saved ?? 0;

  const urgentGoals = goals.filter((goal) => {
    if (isGoalCompleted(goal)) return false;
    const daysLeft = getDaysLeft(goal.deadline);
    return daysLeft > 0 && daysLeft <= 30;
  });

  const deadlineOverdue = goals.filter((goal) => {
    if (isGoalCompleted(goal)) return false;
    const daysLeft = getDaysLeft(goal.deadline);
    return daysLeft < 0;
  });

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          title="Total Saved"
          value={totalSaved}
          subtitle="Across all goals"
          variant="emerald"
        />
        <StatCard
          title="Active Goals"
          value={activeGoals}
          subtitle="In progress"
        />
        <StatCard
          title="Completed Goals"
          value={completedGoals}
          subtitle="Achieved"
          variant="purple"
        />
        <StatCard
          title="Saved This Month"
          value={thisMonthSaved}
          subtitle="Current month"
          variant="blue"
        />
      </div>

      {error ? <ErrorMessage error={error} /> : null}

      {urgentGoals.length > 0 && (
        <Card className="rounded-2xl border-amber-400/50 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-5 w-5" />
              Urgent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {urgentGoals.map((goal) => (
              <div
                key={goal.id}
                className="flex items-center justify-between rounded-lg border bg-background/60 p-3 text-sm"
              >
                <div>
                  <p className="font-medium">{goal.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {getDaysLeft(goal.deadline)} days left
                  </p>
                </div>
                <p className="font-semibold text-amber-600">
                  Daily needed: {getDailyRequiredAmount(goal)}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active Savings Goals</h2>
          <CreateGoalDialog />
        </div>

        {goals.length === 0 ? (
          <DataNotFount message="No active savings goals found." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => {
              const progress = getGoalProgress(
                goal.savedAmount,
                goal.targetAmount,
              );
              const remaining = getRemainingAmount(
                goal.savedAmount,
                goal.targetAmount,
              );
              const daysLeft = getDaysLeft(goal.deadline);
              const dailyNeed = getDailyRequiredAmount(goal);
              const completed = isGoalCompleted(goal);

              return (
                <Link key={goal.id} href={`/dashboard/savings/${goal.id}`}>
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
                        {completed ? (
                          <Trophy className="h-6 w-6 text-yellow-500" />
                        ) : null}
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress
                          </span>
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
                          <p className="font-bold text-emerald-600">
                            {goal.savedAmount}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-muted-foreground">Remaining</p>
                          <p className="font-bold">{remaining}</p>
                        </div>
                      </div>

                      <div className="space-y-1 border-t pt-2 text-xs">
                        <p>Deadline: {formatGoalDate(goal.deadline)}</p>

                        {!completed && daysLeft > 0 ? (
                          <p
                            className={cn(
                              daysLeft < 15 && "font-medium text-amber-600",
                            )}
                          >
                            Daily required: {dailyNeed}
                          </p>
                        ) : null}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <Card className="overflow-hidden rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2 text-xl">
                <LineChartIcon className="h-5 w-5 text-emerald-600" />
                Savings Growth
              </CardTitle>
              <CardDescription className="mt-1">
                Monthly savings trend
              </CardDescription>
            </div>

            <div className="text-right">
              <p className="text-xs text-muted-foreground">This Month</p>
              <p className="text-2xl font-semibold text-emerald-600">
                {thisMonthSaved}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="h-80 pt-2">
          <SavingsChart data={trend} />
        </CardContent>
      </Card>
    </div>
  );
};
