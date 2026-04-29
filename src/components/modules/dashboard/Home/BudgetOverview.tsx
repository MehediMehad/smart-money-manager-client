import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { CalendarDays } from "lucide-react";

type TBudget = {
  title: string;
  budget: number;
  spent: number;
  percent: number;
  left: number;
  color: "green" | "purple";
};

function BudgetOverview({ budgets }: { budgets: TBudget[] }) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {budgets.map((item) => (
          <div key={item.title}>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">{item.title}</h3>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-7 text-xs",
                  item.color === "green" && "text-emerald-600",
                  item.color === "purple" && "text-violet-600",
                )}
              >
                View Details
              </Button>
            </div>

            <div className="rounded-2xl border p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex flex-1 items-center gap-4">
                  <IconBox
                    icon={CalendarDays}
                    color={item.color === "green" ? "green" : "purple"}
                    small
                  />

                  <div className="flex-1">
                    <div className="grid grid-cols-2 divide-x">
                      <div>
                        <p className="text-sm text-slate-500">Budget</p>
                        <p className="mt-1 text-xl font-bold">
                          ৳{item.budget.toLocaleString()}
                        </p>
                      </div>

                      <div className="pl-6">
                        <p className="text-sm text-slate-500">Spent</p>
                        <p className="mt-1 text-xl font-bold text-red-500">
                          ৳{item.spent.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(${
                        item.color === "green" ? "#10b981" : "#8b5cf6"
                      } ${item.percent * 3.6}deg, #e5e7eb 0deg)`,
                    }}
                  />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white">
                    <span
                      className={cn(
                        "text-lg font-bold",
                        item.color === "green"
                          ? "text-emerald-600"
                          : "text-violet-600",
                      )}
                    >
                      {item.percent}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <div className="h-2 overflow-hidden rounded-full bg-slate-200">
                  <div
                    className={cn(
                      "h-full rounded-full",
                      item.color === "green" && "bg-emerald-500",
                      item.color === "purple" && "bg-violet-500",
                    )}
                    style={{ width: `${item.percent}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-sm text-slate-500">
                  <span>{item.percent}% of budget used</span>
                  <span>৳{item.left.toLocaleString()} left</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default BudgetOverview;

function IconBox({
  icon: Icon,
  color,
  small = false,
}: {
  icon: any;
  color: string;
  small?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-2xl",
        small ? "h-11 w-11" : "h-14 w-14",
        color === "blue" && "bg-blue-50 text-blue-600",
        color === "green" && "bg-emerald-50 text-emerald-600",
        color === "red" && "bg-red-50 text-red-500",
        color === "purple" && "bg-violet-50 text-violet-600",
        color === "orange" && "bg-orange-50 text-orange-500",
      )}
    >
      <Icon className={small ? "h-5 w-5" : "h-6 w-6"} />
    </div>
  );
}
