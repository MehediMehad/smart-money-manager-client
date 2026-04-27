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
    { label: "Add Income", icon: ArrowUpRight, color: "emerald" },
    { label: "Add Expense", icon: ArrowDownRight, color: "rose" },
    { label: "Add Savings", icon: PiggyBank, color: "blue" },
    { label: "Add Debt", icon: CalendarClock, color: "amber" },
  ];
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>
          Add your most common financial activity quickly.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action: any, i: number) => (
            <Button
              key={i}
              variant="outline"
              className="h-24 flex-col gap-2 rounded-2xl"
            >
              <action.icon className="h-5 w-5" />
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
