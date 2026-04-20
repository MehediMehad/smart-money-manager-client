import { AlertTriangle, LineChart as LineChartIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  getDailyRequiredAmount,
  getDaysLeft,
  isGoalCompleted,
} from "@/lib/savings/utils";
import { TMonthlySavingsTrend, TSavingsGoal } from "@/types";
import { CreateGoalDialog } from "./create-goal-dialog";
import { SavingsChart } from "./savings-chart";
import StatCard from "./stat-card";
import DataNotFount from "../../../../components/shared/DataNotFount";
import ErrorMessage from "@/components/shared/ErrorMessage";
import SavingsGoalCard from "./savings-goal-card";
import SavingsAlertCard from "./savings-alert";

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

  const deadlineOverGoals = goals.filter((goal) => {
    if (isGoalCompleted(goal)) return false;
    const daysLeft = getDaysLeft(goal.deadline);
    return daysLeft <= 0;
  });

  const alertGoals = [...deadlineOverGoals, ...urgentGoals];

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

      <SavingsAlertCard alertGoals={alertGoals} />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Active Savings Goals</h2>
          <CreateGoalDialog />
        </div>

        {goals.length === 0 ? (
          <DataNotFount message="No active savings goals found." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal) => (
              <SavingsGoalCard key={goal.id} goal={goal} />
            ))}
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
