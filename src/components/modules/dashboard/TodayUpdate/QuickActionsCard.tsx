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

const QuickActionsCard = () => {
  const quickActions = [
    {
      label: "Add Income",
      icon: ArrowUpRight,
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      hover: "hover:border-emerald-200 hover:bg-emerald-50",
    },
    {
      label: "Add Expense",
      icon: ArrowDownRight,
      bg: "bg-rose-100",
      text: "text-rose-600",
      hover: "hover:border-rose-200 hover:bg-rose-50",
    },
    {
      label: "Add Savings",
      icon: PiggyBank,
      bg: "bg-purple-100",
      text: "text-purple-600",
      hover: "hover:border-purple-200 hover:bg-purple-50",
    },
    {
      label: "Add Debt",
      icon: CalendarClock,
      bg: "bg-orange-100",
      text: "text-orange-600",
      hover: "hover:border-orange-200 hover:bg-orange-50",
    },
  ];

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-slate-950">
          Quick Actions
        </CardTitle>
        <CardDescription className="text-sm text-slate-500">
          Add your most common financial activity quickly.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, i) => {
            const Icon = action.icon;

            return (
              <Button
                key={i}
                variant="outline"
                className={`h-20 justify-center gap-3 rounded-2xl border-slate-200 bg-white text-slate-900 shadow-none transition-all ${action.hover}`}
              >
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.bg}`}
                >
                  <Icon className={`h-5 w-5 ${action.text}`} />
                </span>

                <span className="text-sm font-semibold">{action.label}</span>
              </Button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
