import { TCategory } from "@/types";

export interface TExpense {
    id: string;
    note: string;
    amount: number;
    date: string;
    category: TCategory;
}

export type TCreateExpenseForm = {
    categoryId: string;
    amount: number;
    note: string;
    date: string;
};