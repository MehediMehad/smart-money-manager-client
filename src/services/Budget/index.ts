// src/services/Budget/index.ts
"use server";

import { serverFetch } from "@/lib/utils/serverFetch";
import { revalidateTag } from "next/cache";
import { getValidToken } from "../Auth/verifyToken";
import { GetBudgetsParams, TApiResponse, TCreateBudgetForm, TUpdateBudgetForm } from "@/types";

const TAG = "budgets";


export const createBudget = async (
    data: TCreateBudgetForm
): Promise<TApiResponse<any>> => {
    try {
        const accessToken = await getValidToken();

        const payload: Record<string, any> = {
            categoryId: data.categoryId,
            amount: Math.round(data.amount),
            type: data.type,
        };

        if (data.type === "DAILY") {
            if (!data.date) {
                return {
                    success: false,
                    message: "Date is required for daily budget",
                };
            }
            payload.date = `${data.date}T00:00:00.000Z`;
        }

        if (data.type === "MONTHLY") {
            if (!data.month) {
                return {
                    success: false,
                    message: "Month is required for monthly budget",
                };
            }

            const [year, month] = data.month.split("-");
            payload.year = Number(year);
            payload.month = Number(month);
        }

        console.log("payload data", payload);

        const response = await serverFetch.post("/budgets", {
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            next: { tags: [TAG] },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                message: errorData.message || "Failed to create budget",
                data: errorData.data,
            };
        }

        const result = await response.json();
        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            message: result.message || "Budget created successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to create budget",
        };
    }
};

export const getBudgets = async (params?: GetBudgetsParams) => {
    try {
        const accessToken = await getValidToken();

        const searchParams = new URLSearchParams();

        if (params?.type) searchParams.set("type", params.type);
        if (params?.date) searchParams.set("date", params.date);
        if (params?.month) searchParams.set("month", params.month);
        if (params?.year) searchParams.set("year", params.year);

        const endpoint = `/budgets${searchParams.toString() ? `?${searchParams.toString()}` : ""
            }`;

        const response = await serverFetch.get(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: { tags: [TAG] },
            cache: "no-store",
        });

        if (!response.ok) return [];

        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("getBudgets error:", error);
        return [];
    }
};

export const getSingleBudget = async (id: string) => {
    try {
        const accessToken = await getValidToken();
        const response = await serverFetch.get(`/budgets/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: { tags: [TAG] },
            cache: "no-store",
        });

        if (!response.ok) return null;

        const result = await response.json();
        return result.data || null;
    } catch (error) {
        console.error("getSingleBudget error:", error);
        return null;
    }
};

export const updateBudget = async (
    id: string,
    data: TUpdateBudgetForm
): Promise<TApiResponse> => {
    try {
        const accessToken = await getValidToken();
        const payload = {
            amount: Math.round(data.amount),
        };

        const response = await serverFetch.patch(`/budgets/${id}`, {
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                message: errorData.message || "Failed to update budget",
            };
        }

        const result = await response.json();
        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            message: result.message || "Budget updated successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to update budget",
        };
    }
};

export const deleteBudget = async (
    id: string
): Promise<TApiResponse> => {
    try {
        const accessToken = await getValidToken();

        const response = await serverFetch.delete(`/budgets/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                message: errorData.message || "Failed to delete budget",
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            message: "Budget deleted successfully",
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Failed to delete budget",
        };
    }
};