

export * from "./dashboard"; import {
    ArrowDownRight,
    ArrowUpRight,
    HandCoins,
    PiggyBank,
    Wallet,
} from "lucide-react";

export const statIconMap: Record<string, any> = {
    "Total Balance": Wallet,
    "Total Income": ArrowDownRight,
    "Total Expense": ArrowUpRight,
    "Total Savings": PiggyBank,
};

export const statColorMap: Record<string, string> = {
    "Total Balance": "blue",
    "Total Income": "green",
    "Total Expense": "red",
    "Total Savings": "purple",
};

export const transactionIconMap: Record<string, any> = {
    income: Wallet,
    expense: ArrowUpRight,
    savings: PiggyBank,
    debts: HandCoins,
};

export const transactionColorMap: Record<string, string> = {
    income: "green",
    expense: "red",
    savings: "purple",
    debts: "orange",
};