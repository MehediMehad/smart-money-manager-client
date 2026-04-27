
export interface TodayData {
    date: string;
    income: number;
    expense: number;
    budgetRemaining: number;
    savingsAdded: number;
    todayBudget: number;
    todaySpentPercent: number;
    status: "good" | "warning" | "danger";
    transactions: Transaction[];
    reminders: TReminder[];
}

export interface Transaction {
    id: string;
    time: string;
    type: string;
    category: string;
    amount: number;
    note: string;
}

export interface TReminder {
    text: string;
    type: "alert" | "reminder" | "info";
}