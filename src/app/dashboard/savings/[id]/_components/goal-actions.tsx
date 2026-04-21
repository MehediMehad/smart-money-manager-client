import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddSavingsAmountDialog } from "./add-savings-amount-dialog";
import { EditGoalDialog } from "./edit-goal-dialog";
import { DeleteGoalDialog } from "./delete-goal-dialog";

type Props = {
  goalId: string;
  goalName: string;
  targetAmount: number;
  deadline: string;
};

export function GoalActions({
  goalId,
  goalName,
  targetAmount,
  deadline,
}: Props) {
  return (
    <Card className="h-full rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <AddSavingsAmountDialog goalId={goalId} />

        <EditGoalDialog
          goalId={goalId}
          goalName={goalName}
          targetAmount={targetAmount}
          deadline={deadline}
        />

        <DeleteGoalDialog goalId={goalId} goalName={goalName} />
      </CardContent>
    </Card>
  );
}
