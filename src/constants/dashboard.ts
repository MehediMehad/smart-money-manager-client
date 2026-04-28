import {
    ArrowDown,
    ArrowUp,
    CreditCard,
    Wallet,
    HandCoins,
} from "lucide-react";

export const statIconMap: Record<string, any> = {
    "Total Balance": Wallet,
    "Total Income": ArrowDown,
    "Total Expense": ArrowUp,
    "Total Savings": CreditCard,
};

export const statColorMap: Record<string, string> = {
    "Total Balance": "blue",
    "Total Income": "green",
    "Total Expense": "red",
    "Total Savings": "purple",
};

export const transactionIconMap: Record<string, any> = {
    income: Wallet,
    expense: CreditCard,
    savings: CreditCard,
    debts: HandCoins,
};

export const transactionColorMap: Record<string, string> = {
    income: "green",
    expense: "red",
    savings: "purple",
    debts: "orange",
};