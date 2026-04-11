// src/services/Expense/index.ts
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/utils/serverFetch";
import { getValidToken } from "../Auth/verifyToken";
import { TApiResponse } from "@/types";

const TAG = "expenses";

export type TCreateExpenseForm = {
    categoryId: string;
    amount: number;
    note: string;
    date: string;
};

export type TUpdateExpenseForm = {
    categoryId?: string;
    amount?: number;
    note?: string;
    date?: string;
};

export type TGetExpensesParams = {
    searchTerm?: string;
    categoryId?: string;
    month?: string;
    year?: string;
    date_range?: string;
};

export const createExpense = async (
    data: TCreateExpenseForm
): Promise<TApiResponse<any>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Authentication required",
                data: null,
            };
        }

        console.log("data", data);


        const response = await serverFetch.post("/expenses", {
            body: JSON.stringify({
                ...data,
                amount: Math.round(data.amount),
                date: new Date(data.date).toISOString(),
            }),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            next: { tags: [TAG] },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: result.message || "Failed to create expense",
                data: result.data ?? null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Expense created successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to create expense",
            data: null,
        };
    }
};

export const getExpenses = async (
    params?: TGetExpensesParams
): Promise<TApiResponse<any[]>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Authentication required",
                data: [],
            };
        }

        const searchParams = new URLSearchParams();

        if (params?.searchTerm) searchParams.set("searchTerm", params.searchTerm);
        if (params?.categoryId) searchParams.set("categoryId", params.categoryId);
        if (params?.month) searchParams.set("month", params.month);
        if (params?.year) searchParams.set("year", params.year);
        if (params?.date_range) searchParams.set("date_range", params.date_range);

        const endpoint = `/expenses${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;

        const response = await serverFetch.get(endpoint, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-cache",
            next: { tags: [TAG] },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: result.message || "Failed to fetch expenses",
                data: [],
                meta: result.meta,
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Expenses fetched successfully",
            data: result.data ?? [],
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch expenses",
            data: [],
        };
    }
};

export const getSingleExpense = async (
    id: string
): Promise<TApiResponse<any | null>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Authentication required",
                data: null,
            };
        }

        const response = await serverFetch.get(`/expenses/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            cache: "no-store",
            next: { tags: [TAG] },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: result.message || "Failed to fetch expense",
                data: null,
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Expense fetched successfully",
            data: result.data ?? null,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch expense",
            data: null,
        };
    }
};

export const updateExpense = async (
    id: string,
    data: TUpdateExpenseForm
): Promise<TApiResponse<any>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Authentication required",
                data: null,
            };
        }

        const payload = {
            ...data,
            ...(data.amount !== undefined ? { amount: Math.round(data.amount) } : {}),
            ...(data.date !== undefined ? { date: new Date(data.date).toISOString() } : {}),
        };

        const response = await serverFetch.patch(`/expenses/${id}`, {
            body: JSON.stringify(payload),
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: result.message || "Failed to update expense",
                data: result.data ?? null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Expense updated successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to update expense",
            data: null,
        };
    }
};

export const deleteExpense = async (
    id: string
): Promise<TApiResponse<null>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Authentication required",
                data: null,
            };
        }

        const response = await serverFetch.delete(`/expenses/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: result.message || "Failed to delete expense",
                data: null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Expense deleted successfully",
            data: null,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to delete expense",
            data: null,
        };
    }
};