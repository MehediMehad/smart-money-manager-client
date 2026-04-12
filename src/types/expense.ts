export type TCreateExpenseForm = {
    categoryId: string;
    amount: number;
    note: string;
    date: string;
};

export type TUpdateExpenseForm = {
    categoryId?: string;
    amount?: number;
    note?: string;
    date?: string;
};

export type TGetExpensesParams = {
    searchTerm?: string;
    categoryId?: string;
    month?: string;
    year?: string;
    date_range?: string;
};