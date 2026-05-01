import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TBudget } from "@/types";
import { AlertTriangle } from "lucide-react";

export default function BudgetAlerts({ budgets }: { budgets: TBudget[] }) {
  const alerts = budgets
    .filter((b) => {
      const percent = (b.spent ?? 0) / b.amount;
      return percent > 0.8; // show warning or over
    })
    .map((b) => {
      const percent = ((b.spent ?? 0) / b.amount) * 100;
      const isOver = percent > 100;
      return {
        ...b,
        isOver,
        percent: Math.round(percent),
        exceededBy: isOver ? Math.round((b.spent ?? 0) - b.amount) : 0,
      };
    })
    .sort((a, b) => (b.isOver ? 1 : 0) - (a.isOver ? 1 : 0)); // over first

  if (alerts.length === 0) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold flex items-center gap-2 text-amber-700">
        <AlertTriangle className="h-5 w-5" />
        Budget Alerts
      </h2>

      {alerts.map((alert) => (
        <Alert
          key={alert.id}
          variant={alert.isOver ? "destructive" : "default"}
          className={alert.isOver ? "" : "border-amber-500/50 bg-amber-50/50"}
        >
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>
            {alert.category?.name} {alert.type.toLowerCase()} budget
          </AlertTitle>
          <AlertDescription>
            {alert.isOver
              ? `Exceeded by ${alert.exceededBy} BDT`
              : `Used ${alert.percent}% — be careful`}
          </AlertDescription>
        </Alert>
      ))}
    </div>
  );
}
