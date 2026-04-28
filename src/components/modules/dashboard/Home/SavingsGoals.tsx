import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function SavingsGoals({ goals }: { goals: any[] }) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Savings Goals</CardTitle>
        <Button variant="ghost" size="sm" className="text-xs">
          View All
        </Button>
      </CardHeader>

      <CardContent className="space-y-4">
        {goals.length ? (
          goals.map((goal: any) => {
            const remaining = Math.max(goal.target - goal.saved, 0);
            const percent = Math.min(goal.percent, 100);

            return (
              <div
                key={goal.id}
                className="rounded-2xl border bg-slate-50/60 p-4 transition hover:shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{goal.name}</p>
                  <span className="text-sm font-semibold text-primary">
                    {goal.percent}%
                  </span>
                </div>

                <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
                  <span>
                    {goal.saved} / {goal.target}
                  </span>
                  <span className="text-xs">{remaining} left</span>
                </div>

                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-500">No savings goals found.</p>
        )}
      </CardContent>
    </Card>
  );
}

export default SavingsGoals;
