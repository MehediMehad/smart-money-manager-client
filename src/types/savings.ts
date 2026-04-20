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