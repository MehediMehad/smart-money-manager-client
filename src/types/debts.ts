export type TDebtType = "GIVEN" | "TAKEN";
export type TDebtStatus = "PENDING" | "PAID" | "OVERDUE";

export type TCreateDebtForm = {
    person: string;
    amount: number;
    type: TDebtType;
    dueDate: string;
    status?: TDebtStatus;
    note?: string;
};

export type TDebt = {
    id: string;
    userId: string;
    person: string;
    amount: number;
    type: TDebtType;
    dueDate: string;
    status: TDebtStatus;
    note?: string | null;
    createdAt: string;
};

export type TDebtMeta = {
    total: number;
    totalGiven: number;
    totalTaken: number;
    upcomingPayableIn7Days: number;
    upcomingReceivableIn7Days: number;
};

export type TDebtsData = {
    meta: TDebtMeta;
    data: TDebt[];
};