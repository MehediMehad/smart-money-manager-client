
import type { TCategory } from "./category";

export type BudgetType = "DAILY" | "MONTHLY";

export type TBudget = {
    id: string;
    categoryId?: string;
    amount: number;
    spent?: number;
    type: BudgetType;
    date?: string | null;
    month?: string | number | null;
    year?: string | number | null;
    category?: TCategory | null;
    createdAt?: string;
    updatedAt?: string;
};

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
