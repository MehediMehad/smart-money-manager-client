import { ArrowUpRight, ArrowDownRight, Wallet, PiggyBank } from "lucide-react";
import SummaryCard from "./SummaryCard";
import { TodayData } from "@/types";

const SummaryCards = ({ todayData }: { todayData: TodayData }) => {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
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
        title="Remaining"
        value={todayData.budgetRemaining}
        icon={Wallet}
        color="blue"
      />
      <SummaryCard
        title="Savings"
        value={todayData.savingsAdded}
        icon={PiggyBank}
        color="teal"
      />
    </div>
  );
};

export default SummaryCards;
