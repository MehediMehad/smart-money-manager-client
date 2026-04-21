import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { AddSavingsAmountDialog } from "./add-savings-amount-dialog";
import { EditGoalDialog } from "./edit-goal-dialog";
import { DeleteGoalDialog } from "./delete-goal-dialog";

type Props = {
  goalId: string;
  goalName: string;
  targetAmount: number;
  deadline: string;
  isCompleted: boolean;
};

export function GoalActions({
  goalId,
  goalName,
  targetAmount,
  deadline,
  isCompleted,
}: Props) {
  return (
    <Card className="h-full rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {isCompleted ? (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-300">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
              <p>
                This goal is already completed. Add Money and Edit Goal are
                disabled.
              </p>
            </div>
          </div>
        ) : (
          <>
            <AddSavingsAmountDialog goalId={goalId} />
            <EditGoalDialog
              goalId={goalId}
              goalName={goalName}
              targetAmount={targetAmount}
              deadline={deadline}
            />
            <DeleteGoalDialog goalId={goalId} goalName={goalName} />
          </>
        )}
      </CardContent>
    </Card>
  );
}
