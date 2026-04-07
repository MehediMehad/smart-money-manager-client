import { Button } from "@/components/ui/button";
import BudgetFormModal from "./BudgetFormModal";
import { TCategory } from "@/types";

interface Props {
  hasActiveFilters: boolean;
  categories: TCategory[];
  onReset: () => void;
}

export default function BudgetEmptyState({
  hasActiveFilters,
  categories,
  onReset,
}: Props) {
  return (
    <div className="text-center py-16 text-muted-foreground border rounded-xl bg-card/50">
      <p className="text-lg font-medium">
        {hasActiveFilters
          ? "No budgets match your filters"
          : "No budgets found yet"}
      </p>
      <p className="mt-2">
        {hasActiveFilters
          ? "Try changing the status filter"
          : "Start by adding a daily or monthly budget"}
      </p>

      <div className="mt-6">
        <BudgetFormModal mode="create" categories={categories} />
      </div>

      {hasActiveFilters && (
        <Button variant="outline" size="sm" className="mt-4" onClick={onReset}>
          Reset Filters
        </Button>
      )}
    </div>
  );
}
