// types.ts (or wherever you define TBudget)
export type TBudget = {
    id: string;
    categoryId: string;
    category?: {
        id: string;
        name: string;
        emoji?: string;
        type: "INCOME" | "EXPENSE";
    };
    type: "DAILY" | "MONTHLY";
    amount: number;
    spent: number;          // current spent amount (should come from transactions)
    createdAt?: string;
    updatedAt?: string;
    // optional: for monthly → monthYear: "2025-03"
};

// Fake data array (you can put this in your page.tsx for testing)
export const fakeBudgets: TBudget[] = [
    {
        id: "budget_001",
        categoryId: "cat_food",
        category: { id: "cat_food", name: "Food & Dining", emoji: "🍔", type: "EXPENSE" },
        type: "DAILY",
        amount: 1200,
        spent: 450,
    },
    {
        id: "budget_002",
        categoryId: "cat_food",
        category: { id: "cat_food", name: "Food & Dining", emoji: "🍔", type: "EXPENSE" },
        type: "MONTHLY",
        amount: 28000,
        spent: 19500,
    },
    {
        id: "budget_003",
        categoryId: "cat_transport",
        category: { id: "cat_transport", name: "Transport", emoji: "🚕", type: "EXPENSE" },
        type: "DAILY",
        amount: 800,
        spent: 920,
    },
    {
        id: "budget_004",
        categoryId: "cat_transport",
        category: { id: "cat_transport", name: "Transport", emoji: "🚕", type: "EXPENSE" },
        type: "MONTHLY",
        amount: 15000,
        spent: 4200,
    },
    {
        id: "budget_005",
        categoryId: "cat_shopping",
        category: { id: "cat_shopping", name: "Shopping", emoji: "🛍️", type: "EXPENSE" },
        type: "MONTHLY",
        amount: 10000,
        spent: 11250,
    },
    {
        id: "budget_006",
        categoryId: "cat_salary",
        category: { id: "cat_salary", name: "Salary", emoji: "💰", type: "INCOME" },
        type: "MONTHLY",
        amount: 95000,
        spent: 0, // income budgets usually don't have "spent"
    },
    {
        id: "budget_007",
        categoryId: "cat_entertainment",
        category: { id: "cat_entertainment", name: "Entertainment", emoji: "🎮", type: "EXPENSE" },
        type: "DAILY",
        amount: 500,
        spent: 480,
    },
    {
        id: "budget_008",
        categoryId: "cat_bills",
        category: { id: "cat_bills", name: "Utilities & Bills", emoji: "💡", type: "EXPENSE" },
        type: "MONTHLY",
        amount: 8000,
        spent: 6200,
    },
    {
        id: "budget_009",
        categoryId: "cat_health",
        category: { id: "cat_health", name: "Health & Medical", emoji: "🏥", type: "EXPENSE" },
        type: "MONTHLY",
        amount: 5000,
        spent: 4800,
    },
    {
        id: "budget_010",
        categoryId: "cat_gifts",
        category: { id: "cat_gifts", name: "Gifts & Donations", emoji: "🎁", type: "EXPENSE" },
        type: "MONTHLY",
        amount: 3000,
        spent: 4500,
    },
];