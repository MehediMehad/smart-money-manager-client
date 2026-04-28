import { ArrowDownRight, ArrowUpRight, PiggyBank, Wallet } from "lucide-react";
import SummaryCard from "./SummaryCard";
import { TodayData } from "@/types";

const SummaryCards = ({ todayData }: { todayData: TodayData }) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard
        title="Income"
        value={todayData.income}
        icon={ArrowUpRight}
        color="emerald"
      />

      <SummaryCard
        title="Expense"
        value={todayData.expense}
        icon={ArrowDownRight}
        color="rose"
      />

      <SummaryCard
        title="Budget Remaining"
        value={todayData.budgetRemaining}
        icon={Wallet}
        color="blue"
      />

      <SummaryCard
        title="Savings Added"
        value={todayData.savingsAdded}
        icon={PiggyBank}
        color="purple"
      />
    </div>
  );
};

export default SummaryCards;
