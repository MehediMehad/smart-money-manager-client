import MainStatusCard from "@/components/modules/dashboard/TodayUpdate/MainStatusCard";
import QuickActionsCard from "@/components/modules/dashboard/TodayUpdate/QuickActionsCard";
import RemindersCard from "@/components/modules/dashboard/TodayUpdate/RemindersCard";
import SummaryCards from "@/components/modules/dashboard/TodayUpdate/SummaryCards";
import TodayHeader from "@/components/modules/dashboard/TodayUpdate/TodayHeader";
import TransactionsCard from "@/components/modules/dashboard/TodayUpdate/TransactionsCard";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarClock,
  PiggyBank,
} from "lucide-react";

const todayData = {
  date: "March 8, 2026",
  income: 2500,
  expense: 1200,
  budgetRemaining: 800,
  savingsAdded: 300,
  dailyBudget: 2000,
  dailySpentPercent: 60,
  status: "good",
};

const todayTransactions = [
  {
    time: "10:30 AM",
    type: "income",
    category: "Freelance",
    amount: 1500,
    note: "Upwork payment",
  },
  {
    time: "01:00 PM",
    type: "expense",
    category: "Food",
    amount: 200,
    note: "Lunch",
  },
  {
    time: "04:00 PM",
    type: "expense",
    category: "Transport",
    amount: 100,
    note: "Uber ride",
  },
  {
    time: "07:30 PM",
    type: "savings",
    category: "Savings",
    amount: 300,
    note: "Added to savings",
  },
];

const quickActions = [
  { label: "Add Income", icon: ArrowUpRight, color: "emerald" },
  { label: "Add Expense", icon: ArrowDownRight, color: "rose" },
  { label: "Add Savings", icon: PiggyBank, color: "blue" },
  { label: "Add Debt", icon: CalendarClock, color: "amber" },
];

const reminders = [
  { text: "Debt repayment tomorrow: ৳1,000", type: "alert" },
  { text: "Plan to add ৳300 to savings today", type: "reminder" },
  { text: "Check your monthly budget", type: "info" },
];

const TodayUpdatePage = () => {
  const isGood = todayData.status === "good";

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        <TodayHeader />
        <MainStatusCard isGood={isGood} todayData={todayData} />
        <SummaryCards todayData={todayData} />
        <QuickActionsCard quickActions={quickActions} />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <TransactionsCard todayTransactions={todayTransactions} />
          <RemindersCard reminders={reminders} />
        </div>
      </div>
    </div>
  );
};

export default TodayUpdatePage;
