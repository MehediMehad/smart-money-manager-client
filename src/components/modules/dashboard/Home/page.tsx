import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  ShoppingBag,
  Utensils,
  Wallet,
  HandCoins,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getDashboardOverview } from "@/services/Dashboard";
import OverviewChart from "./OverviewChart";
// import OverviewChart from "@/components/modules/dashboard/Home/OverviewChart";

const debts = {
  receive: [
    { name: "Rahim", amount: 5000, due: "Due in 12 days" },
    { name: "Karim", amount: 4000, due: "Due in 28 days" },
    { name: "Sohan", amount: 3500, due: "Due in 45 days" },
  ],
  pay: [
    { name: "Arafat", amount: 4500, due: "Due in 10 days" },
    { name: "Credit Card", amount: 3000, due: "Due in 25 days" },
    { name: "Personal Loan", amount: 2000, due: "Due in 40 days" },
  ],
};

const stats = [
  {
    title: "Total Balance",
    value: 26200,
    change: "+12.5%",
    icon: Wallet,
    color: "blue",
  },
  {
    title: "Total Income",
    value: 68500,
    change: "+18.3%",
    icon: ArrowDown,
    color: "green",
  },
  {
    title: "Total Expense",
    value: 42300,
    change: "-8.2%",
    icon: ArrowUp,
    color: "red",
  },
  {
    title: "Total Savings",
    value: 18500,
    change: "+15.7%",
    icon: CreditCard,
    color: "purple",
  },
];

const transactions = [
  {
    title: "Upwork Payment",
    category: "Income • Freelance",
    amount: 25000,
    type: "income",
    date: "Today",
    icon: Wallet,
  },
  {
    title: "Dinner with Friends",
    category: "Expense • Food",
    amount: 850,
    type: "expense",
    date: "Today",
    icon: Utensils,
  },
  {
    title: "Uber Ride",
    category: "Expense • Transport",
    amount: 420,
    type: "expense",
    date: "Yesterday",
    icon: CreditCard,
  },
  {
    title: "Groceries",
    category: "Expense • Shopping",
    amount: 1250,
    type: "expense",
    date: "May 10, 2025",
    icon: ShoppingBag,
  },
  {
    title: "Client Payment",
    category: "Income • Project",
    amount: 15000,
    type: "income",
    date: "May 9, 2025",
    icon: Wallet,
  },
];

const goals = [
  {
    name: "New Laptop",
    saved: 42000,
    target: 90000,
    percent: 47,
  },
  {
    name: "Emergency Fund",
    saved: 76000,
    target: 150000,
    percent: 51,
  },
  {
    name: "Europe Trip",
    saved: 25000,
    target: 100000,
    percent: 25,
  },
];

const DashboardPage = async () => {
  const getOverviewData = await getDashboardOverview();

  console.log("getDashboardOverview", getOverviewData);

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Good morning, Mehedi! 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here’s what’s happening with your finances today.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => (
            <Card
              key={item.title}
              className="rounded-2xl border-slate-200 bg-white shadow-sm"
            >
              <CardContent className="flex items-center gap-5 p-6">
                <IconBox icon={item.icon} color={item.color} />

                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>
                  <h2 className="mt-2 text-2xl font-bold">{item.value}</h2>
                  <p
                    className={cn(
                      "mt-3 text-xs font-medium",
                      item.change.startsWith("-")
                        ? "text-red-500"
                        : "text-emerald-600",
                    )}
                  >
                    {item.change}{" "}
                    <span className="font-normal text-slate-500">
                      from last month
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.45fr_0.8fr]">
          {/* Left side */}
          <div className="space-y-6">
            {/* <OverviewChart /> */}

            {/* Bottom left */}
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              {/* Recent Transactions */}
              <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  {transactions.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <IconBox
                          icon={item.icon}
                          color={item.type === "income" ? "green" : "blue"}
                          small
                        />
                        <div>
                          <p className="font-semibold">{item.title}</p>
                          <p className="text-sm text-slate-500">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p
                          className={cn(
                            "font-bold",
                            item.type === "income"
                              ? "text-emerald-600"
                              : "text-red-500",
                          )}
                        >
                          {item.type === "income" ? "+" : "-"}
                          {item.amount}
                        </p>
                        <p className="text-xs text-slate-500">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Savings Goals */}
              <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Savings Goals</CardTitle>
                  <Button variant="ghost" size="sm" className="text-xs">
                    View All
                  </Button>
                </CardHeader>

                <CardContent className="space-y-4">
                  {goals.map((goal) => {
                    const remaining = goal.target - goal.saved;

                    return (
                      <div
                        key={goal.name}
                        className="rounded-2xl border bg-slate-50/60 p-4 transition hover:shadow-sm"
                      >
                        {/* Top */}
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{goal.name}</p>
                          <span className="text-sm font-semibold text-primary">
                            {goal.percent}%
                          </span>
                        </div>

                        {/* Amount */}
                        <div className="mt-1 flex items-center justify-between text-sm text-slate-500">
                          <span>
                            {goal.saved} / {goal.target}
                          </span>
                          <span className="text-xs">{remaining} left</span>
                        </div>

                        {/* Progress */}
                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                          <div
                            className="h-full rounded-full bg-primary transition-all"
                            style={{ width: `${goal.percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6">
            <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
              <CardHeader>
                <CardTitle>Debts Overview</CardTitle>
              </CardHeader>

              <CardContent className="space-y-5">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border bg-emerald-50/50 p-4">
                    <div className="flex items-center gap-3">
                      <IconBox icon={TrendingDown} color="green" small />
                      <div>
                        <p className="text-xs text-slate-500">
                          Total to Receive
                        </p>
                        <p className="text-xl font-bold text-emerald-600">
                          12,500
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-red-50/50 p-4">
                    <div className="flex items-center gap-3">
                      <IconBox icon={TrendingUp} color="red" small />
                      <div>
                        <p className="text-xs text-slate-500">Total to Pay</p>
                        <p className="text-xl font-bold text-red-500">9,500</p>
                      </div>
                    </div>
                  </div>
                </div>

                <DebtList
                  title="People Owe You"
                  items={debts.receive}
                  color="green"
                />

                <DebtList title="You Owe" items={debts.pay} color="red" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

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
        color === "rose" && "bg-rose-50 text-rose-500",
      )}
    >
      <Icon className={small ? "h-5 w-5" : "h-6 w-6"} />
    </div>
  );
}

function DebtList({
  title,
  items,
  color,
}: {
  title: string;
  items: { name: string; amount: number; due: string }[];
  color: "green" | "red";
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold">{title}</h3>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          View All
        </Button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl border bg-slate-50/50 p-3"
          >
            <div className="flex items-center gap-3">
              <IconBox
                icon={HandCoins}
                color={color === "green" ? "green" : "red"}
                small
              />
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-xs text-slate-500">{item.due}</p>
              </div>
            </div>

            <p
              className={cn(
                "font-bold",
                color === "green" ? "text-emerald-600" : "text-red-500",
              )}
            >
              {item.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
