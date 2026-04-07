"use client";

import { useMemo, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BudgetHeader from "./BudgetHeader";
import BudgetFilters from "./BudgetFilters";
import BudgetAlerts from "./BudgetAlerts";
import BudgetGrid from "./BudgetGrid";
import BudgetFormModal from "./BudgetFormModal";
import { TBudget } from "@/constants";
import { TCategory } from "@/types";
import BudgetEmptyState from "./BudgetEmptyState";
import { getAlertBudgets, getBudgetStatus } from "./budget.utils";

interface Props {
  budgets: TBudget[];
  categories: TCategory[];
  initialFilters: {
    type: "DAILY" | "MONTHLY";
    date: string;
    month: string;
    year: string;
    status: "ALL" | "SAFE" | "WARNING" | "OVER";
  };
}

export default function BudgetPage({
  budgets,
  categories,
  initialFilters,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const budgetType = initialFilters.type;
  const selectedDate = initialFilters.date;
  const selectedMonth = initialFilters.month;
  const statusFilter = initialFilters.status;

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value) params.delete(key);
      else params.set(key, value);
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  const filteredBudgets = useMemo(() => {
    if (statusFilter === "ALL") return budgets;
    return budgets.filter((budget) => getBudgetStatus(budget) === statusFilter);
  }, [budgets, statusFilter]);

  const alertBudgets = useMemo(
    () => getAlertBudgets(filteredBudgets),
    [filteredBudgets],
  );

  const hasActiveFilters = statusFilter !== "ALL";

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <BudgetHeader categories={categories} />

      <BudgetFilters
        budgetType={budgetType}
        selectedDate={selectedDate}
        selectedMonth={selectedMonth}
        statusFilter={statusFilter}
        isPending={isPending}
        onUpdateQuery={updateQuery}
      />

      {/* {statusFilter === "ALL" && <BudgetAlerts budgets={alertBudgets} />} */}

      {filteredBudgets.length > 0 ? (
        <BudgetGrid budgets={filteredBudgets} />
      ) : (
        <BudgetEmptyState
          hasActiveFilters={hasActiveFilters}
          categories={categories}
          onReset={() => updateQuery({ status: "ALL" })}
        />
      )}

      <div className="fixed bottom-10 right-6 z-50 md:hidden">
        <BudgetFormModal mode="create" isIcon categories={categories} />
      </div>
    </div>
  );
}
