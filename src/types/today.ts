
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
    reminders: Reminder[];
}

export interface Transaction {
    id: string;
    time: string;
    type: string;
    category: string;
    amount: number;
    note: string;
}

export interface Reminder {
    text: string;
    type: "alert" | "reminder" | "info";
}