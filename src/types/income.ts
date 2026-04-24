export interface TIncome {
    id: string
    note: string
    amount: number
    date: string
    category: Category
}

export interface Category {
    id: string
    name: string
    emoji: string
    type: string
}


export type TIncomeRow = {
    id: string;
    date: string;
    source: string;
    amount: number;
    note: string;
};


export type TCreateIncomeForm = {
    categoryId: string;
    amount: number;
    note: string;
    date: string;
};


export type TUpdateIncomeForm = {
    categoryId?: string;
    amount?: number;
    note?: string;
    date?: string;
};

export type TGetIncomesParams = {
    searchTerm?: string;
    categoryId?: string;
    date?: string;
    month?: string;
    year?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export type TDashboardSummary = {
    totalThisMonth: number;
    todayIncome: number;
    avgDaily: number;
    mainCategory: {
        name: string;
        value: number;
    };
    categorySummary: {
        name: string;
        value: number;
        color: string;
    }[];
    incomes: {
        id: string;
        date: string;
        source: string;
        amount: number;
        note: string;
    }[];
};