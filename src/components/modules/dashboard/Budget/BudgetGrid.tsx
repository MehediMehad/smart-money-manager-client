import { TBudget } from "@/constants";
import BudgetCard from "./BudgetCard";

interface Props {
  budgets: TBudget[];
}

export default function BudgetGrid({ budgets }: Props) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {budgets.map((budget) => (
        <BudgetCard key={budget.id} budget={budget} />
      ))}
    </div>
  );
}
