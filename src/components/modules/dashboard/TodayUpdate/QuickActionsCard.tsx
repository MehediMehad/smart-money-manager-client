import { Button } from "@/components/ui/button";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarClock,
  PiggyBank,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const quickActions = [
  {
    label: "Add Income",
    icon: ArrowUpRight,
    style: "bg-emerald-50 border-emerald-100 text-emerald-600",
  },
  {
    label: "Add Expense",
    icon: ArrowDownRight,
    style: "bg-rose-50 border-rose-100 text-rose-600",
  },
  {
    label: "Add Savings",
    icon: PiggyBank,
    style: "bg-purple-50 border-purple-100 text-purple-600",
  },
  {
    label: "Add Debt",
    icon: CalendarClock,
    style: "bg-orange-50 border-orange-100 text-orange-600",
  },
];

const QuickActionsCard = () => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="grid gap-5 p-5 lg:grid-cols-[260px_1fr] lg:items-center">
        <div>
          <CardTitle className="text-xl font-bold text-slate-950">
            Quick Actions
          </CardTitle>
          <CardDescription className="mt-1 text-sm text-slate-500">
            Add your most common financial activity quickly.
          </CardDescription>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Button
                key={action.label}
                variant="outline"
                className={`h-16 rounded-xl border font-semibold shadow-none transition hover:scale-[1.01] ${action.style}`}
              >
                <span className="mr-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/70">
                  <Icon className="h-5 w-5" />
                </span>
                {action.label}
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
