import { TBudget } from "@/types";

export const getBudgetStatus = (
    budget: TBudget,
): "SAFE" | "WARNING" | "OVER" => {
    const spent = budget.spent ?? 0;
    const amount = budget.amount ?? 0;
    const percent = amount > 0 ? (spent / amount) * 100 : 0;

    if (percent > 100) return "OVER";
    if (percent > 80) return "WARNING";
    return "SAFE";
};

export const getBudgetPercent = (budget: TBudget) => {
    const spent = budget.spent ?? 0;
    const amount = budget.amount ?? 0;
    return amount > 0 ? (spent / amount) * 100 : 0;
};

export const getAlertBudgets = (budgets: TBudget[]) => {
    return budgets
        .filter((budget) => {
            const status = getBudgetStatus(budget);
            return status === "WARNING" || status === "OVER";
        })
        .sort((a, b) => {
            const statusA = getBudgetStatus(a);
            const statusB = getBudgetStatus(b);

            if (statusA === "OVER" && statusB !== "OVER") return -1;
            if (statusB === "OVER" && statusA !== "OVER") return 1;

            return getBudgetPercent(b) - getBudgetPercent(a);
        });
};
