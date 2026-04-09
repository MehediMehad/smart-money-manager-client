import { TCategory } from "@/types";
import BudgetFormModal from "../Budget/BudgetFormModal";

interface Props {
  categories: TCategory[];
}

export default function ExpenseHeader({ categories }: Props) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📊 Expense
        </h1>
        <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
          Set daily and monthly spending limits and track your progress
        </p>
      </div>

      <div className="hidden sm:block">
        <BudgetFormModal mode="create" categories={categories} />
      </div>
    </div>
  );
}
