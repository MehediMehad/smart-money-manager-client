import BudgetSummaryCard from "./BudgetSummaryCard";

type SummaryCardProps = {
  currentBalance: number;
  totalBudget: number;
  totalSpent: number;
  totalRemaining: number;
};

const BudgetSummaryCards = ({
  currentBalance,
  totalBudget,
  totalSpent,
  totalRemaining,
}: SummaryCardProps) => {
  const spentPercentage =
    totalBudget > 0 ? ((totalSpent / totalBudget) * 100).toFixed(0) : "0";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      <BudgetSummaryCard
        title="বর্তমান ব্যালেন্স"
        value={currentBalance}
        subtitle="আজকের শুরুতে"
        variant="emerald"
      />
      <BudgetSummaryCard
        title="দৈনিক বাজেট"
        value={totalBudget}
        subtitle="আজকের জন্য"
        variant="blue"
      />
      <BudgetSummaryCard
        title="খরচ হয়েছে"
        value={totalSpent}
        subtitle={`বাজেটের ${spentPercentage}%`}
        variant="red"
      />
      <BudgetSummaryCard
        title="বাকি আছে"
        value={totalRemaining}
        subtitle={totalRemaining >= 0 ? "অবশিষ্ট" : "অতিরিক্ত খরচ"}
        variant={totalRemaining >= 0 ? "purple" : "destructive"}
      />
    </div>
  );
};
export default BudgetSummaryCards;
