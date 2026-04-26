import { TCategory } from "@/types"

export interface TIncome {
    id: string
    note: string
    amount: number
    date: string
    category: TCategory
}


export type TCreateIncomeForm = {
    categoryId: string;
    amount: number;
    note: string;
    date: string;
};

