// src/services/SavingsGoal/index.ts
"use server";

import { serverFetch } from "@/lib/utils/serverFetch";
import { getValidToken } from "../Auth/verifyToken";
import { TApiResponse, TSavingsDashboardApiData, TSavingsGoalDetails } from "@/types";
import { revalidatePath } from "next/cache";


export const createSavingsGoal = async (data: {
    name: string;
    targetAmount: number;
    deadline: string;
}): Promise<TApiResponse<any | null>> => {
    try {
        const accessToken = await getValidToken();

        const res = await serverFetch.post("/savings-goals", {
            body: JSON.stringify({
                ...data,
                targetAmount: Math.round(data.targetAmount),
                deadline: new Date(data.deadline).toISOString(),
            }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const result: TApiResponse<any> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        console.error("createSavingsGoal error:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Failed to create savings goal",
            data: null,
        };
    }
};

export const getSavingsDashboard = async (): Promise<
    TApiResponse<TSavingsDashboardApiData | null>
> => {
    try {
        const accessToken = await getValidToken();
        const res = await serverFetch.get("/savings-goals", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        const result = await res.json();

        if (!result.success) {
            throw new Error(result.message || "Failed to fetch savings dashboard");
        }

        return result;
    } catch (error) {
        console.error("getSavingsDashboard error:", error);

        return {
            success: false,
            statusCode: 500,
            message: "Failed to fetch savings dashboard",
            data: {
                savingsGoal: [],
                monthlySavingsTrend: [],
            },
        };
    }
};

export const getSingleSavingsGoal = async (
    id: string,
): Promise<TApiResponse<TSavingsGoalDetails | null>> => {
    try {
        const accessToken = await getValidToken();

        const res = await serverFetch.get(`/savings-goals/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        const result: TApiResponse<TSavingsGoalDetails> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        console.error("getSingleSavingsGoal error:", error);

        return {
            success: false,
            statusCode: 500,
            message: "Failed to fetch savings goal",
            data: null,
        };
    }
};

export const updateSavingsGoal = async (
    id: string,
    data: {
        title?: string;
        targetAmount?: number;
        deadline?: string;
    }
): Promise<TApiResponse<any | null>> => {
    try {
        const accessToken = await getValidToken();

        const payload = {
            ...data,
            ...(data.targetAmount !== undefined
                ? { targetAmount: Math.round(data.targetAmount) }
                : {}),
            ...(data.deadline ? { deadline: new Date(data.deadline).toISOString() } : {}),
        };

        const res = await serverFetch.patch(`/savings-goals/${id}`, {
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const result: TApiResponse<any> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        console.error("updateSavingsGoal error:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Failed to update savings goal",
            data: null,
        };
    }
};

export const addSavingsAmount = async (
    id: string,
    amount: number
): Promise<TApiResponse<any | null>> => {
    try {
        const accessToken = await getValidToken();

        const res = await serverFetch.patch(`/savings-goals/add-amount/${id}`, {
            body: JSON.stringify({
                amount: Math.round(amount),
            }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });

        const result: TApiResponse<any> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        return result;
    } catch (error) {
        console.error("addSavingsAmount error:", error);
        return {
            success: false,
            statusCode: 500,
            message: "Failed to add savings amount",
            data: null,
        };
    }
};

export const deleteSavingsGoal = async (
    id: string,
): Promise<TApiResponse<null>> => {
    try {
        const accessToken = await getValidToken();

        const res = await serverFetch.delete(`/savings-goals/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
        });

        const result: TApiResponse<null> = await res.json();

        if (!result.success) {
            throw new Error(result.message);
        }

        revalidatePath("/dashboard/savings");
        return result;
    } catch (error) {
        console.error("deleteSavingsGoal error:", error);

        return {
            success: false,
            statusCode: 500,
            message: "Failed to delete savings goal",
            data: null,
        };
    }
};