

export type BudgetType = "DAILY" | "MONTHLY";

export type TCreateBudgetForm = {
    categoryId: string;
    amount: number;
    type: BudgetType;
    date?: string;   // for DAILY -> "2025-03-19"
    month?: string;  // for MONTHLY -> "2025-03"
};

export type TUpdateBudgetForm = {
    amount: number;
};

export type GetBudgetsParams = {
    type?: BudgetType;
    date?: string;
    month?: string;
    year?: string;
};
