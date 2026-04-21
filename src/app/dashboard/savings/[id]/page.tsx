import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Target } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  getDailyRequiredAmount,
  getDaysLeft,
  getExceededAmount,
  getGoalProgress,
  getRawProgressPercentage,
  getRemainingAmount,
  isGoalCompleted,
} from "../_lib/calculations";
import { GoalActions } from "./_components/goal-actions";
import { TSavingsGoalTransaction } from "../_lib/types";
import { formatGoalDate } from "../_lib/formatters";
import { getSingleSavingsGoal } from "../_actions";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SavingsGoalDetailPage({ params }: Props) {
  const { id } = await params;
  const response = await getSingleSavingsGoal(id);

  if (!response.success || !response.data) {
    notFound();
  }

  const goal = response.data;
  const transactions: TSavingsGoalTransaction[] = response.data.transactions;

  const progress = getGoalProgress(goal.savedAmount, goal.targetAmount);
  const rawProgress = getRawProgressPercentage(
    goal.savedAmount,
    goal.targetAmount,
  );
  const remaining = getRemainingAmount(goal.savedAmount, goal.targetAmount);
  const exceeded = getExceededAmount(goal.savedAmount, goal.targetAmount);
  const daysLeft = getDaysLeft(goal.deadline);
  const dailyNeed = getDailyRequiredAmount(goal);
  const completed = isGoalCompleted(goal);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center gap-3">
        <Link href="/dashboard/savings">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>

        <h1 className="flex items-center gap-2 text-2xl font-bold">
          <Target className="h-6 w-6 text-emerald-600" />
          {goal.name}
        </h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-2xl shadow-sm md:col-span-2">
          <CardHeader>
            <CardTitle>Progress</CardTitle>
            <CardDescription>
              {completed
                ? `Goal completed${exceeded > 0 ? ` • exceeded by ${exceeded}` : ""}`
                : `You have completed ${rawProgress}% of your goal`}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Progress value={progress} className="h-3" />

              <div className="flex justify-between text-sm font-medium">
                <span className="text-emerald-600">{goal.savedAmount}</span>
                <span className="text-muted-foreground">
                  {goal.targetAmount}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground">Target</p>
                <p className="text-lg font-bold">{goal.targetAmount}</p>
              </div>

              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground">
                  {completed ? "Exceeded" : "Remaining"}
                </p>
                <p className="text-lg font-bold">
                  {completed ? exceeded : remaining}
                </p>
              </div>

              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground">Days Left</p>
                <p className="text-lg font-bold">{daysLeft}</p>
              </div>

              <div className="rounded-lg bg-muted/40 p-3">
                <p className="text-xs text-muted-foreground">Daily Required</p>
                <p className="text-lg font-bold text-amber-600">{dailyNeed}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h2 className="mb-3 flex items-center gap-2 font-medium">
                <Calendar className="h-4 w-4" />
                Timeline
              </h2>

              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Created:</span>{" "}
                  {formatGoalDate(goal.createdAt)}
                </p>
                <p>
                  <span className="text-muted-foreground">Deadline:</span>{" "}
                  {formatGoalDate(goal.deadline)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <GoalActions
          goalId={goal.id}
          goalName={goal.name}
          targetAmount={goal.targetAmount}
          deadline={goal.deadline}
        />
      </div>

      <Card className="rounded-2xl shadow-sm">
        <CardHeader>
          <CardTitle>Savings History</CardTitle>
          <CardDescription>All contributions to this goal</CardDescription>
        </CardHeader>

        <CardContent>
          {transactions.length > 0 ? (
            <div className="space-y-4">
              {transactions
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .map((tx) => (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-lg font-semibold text-emerald-600">
                        {tx.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Contribution added
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {formatGoalDate(tx.createdAt)}
                    </p>
                  </div>
                ))}
            </div>
          ) : (
            <p className="py-8 text-center text-muted-foreground">
              No transactions yet. Add your first contribution.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
