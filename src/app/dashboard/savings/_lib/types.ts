export type TSavingsGoalApiItem = {
    id: string;
    name: string;
    targetAmount: number;
    savedAmount: number;
    deadline: string;
};

export type TMonthlySavingsTrendItem = {
    month: string;
    saved: number;
};

export type TSavingsDashboardApiData = {
    savingsGoal: TSavingsGoalApiItem[];
    monthlySavingsTrend: TMonthlySavingsTrendItem[];
};


export type TSavingsGoalDetails = {
    id: string;
    userId: string;
    name: string;
    targetAmount: number;
    savedAmount: number;
    deadline: string;
    createdAt: string;
    transactions: TSavingsGoalTransaction[];
};

export type TSavingsGoalTransaction = {
    id: string;
    goalId: string;
    amount: number;
    createdAt: string;
};

export type TSavingsGoal = {
    id: string;
    name: string;
    targetAmount: number;
    savedAmount: number;
    deadline: string;
};

export type TMonthlySavingsTrend = {
    month: string;
    saved: number;
};

export type TSavingsDashboard = {
    goals: TSavingsGoal[];
    trend: TMonthlySavingsTrend[];
};