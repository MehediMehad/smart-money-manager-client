// src/services/Income/index.ts
// src/services/Income/index.ts
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/utils/serverFetch";
import { getValidToken } from "../Auth/verifyToken";
import { TApiResponse } from "@/types";

const TAG = "incomes";

export type TCreateIncomeForm = {
    categoryId: string;
    amount: number;
    note: string;
    date: string;
};

export type TUpdateIncomeForm = {
    categoryId?: string;
    amount?: number;
    note?: string;
    date?: string;
};

export type TGetIncomesParams = {
    searchTerm?: string;
    categoryId?: string;
    date?: string;
    month?: string;
    year?: string;
    page?: string;
    limit?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export type TDashboardSummary = {
    totalThisMonth: number;
    todayIncome: number;
    avgDaily: number;
    mainSource: {
        name: string;
        value: number;
    };
    sourceSummary: {
        name: string;
        value: number;
        // color: string;
    }[];
    monthlyTrend: {
        month: string;
        amount: number;
    }[];
    incomes: {
        id: string;
        date: string;
        source: string;
        amount: number;
        note: string;
    }[];
};

export const createIncome = async (
    data: TCreateIncomeForm
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

        const response = await serverFetch.post("/incomes", {
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
                message: result.message || "Failed to create income",
                data: result.data ?? null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Income created successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to create income",
            data: null,
        };
    }
};

export const getIncomes = async (
    params?: TGetIncomesParams
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
        if (params?.date) searchParams.set("date", params.date);
        if (params?.month) searchParams.set("month", params.month);
        if (params?.year) searchParams.set("year", params.year);
        if (params?.page) searchParams.set("page", params.page);
        if (params?.limit) searchParams.set("limit", params.limit);
        if (params?.sortBy) searchParams.set("sortBy", params.sortBy);
        if (params?.sortOrder) searchParams.set("sortOrder", params.sortOrder);

        const endpoint = `/incomes${searchParams.toString() ? `?${searchParams.toString()}` : ""
            }`;

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
                message: result.message || "Failed to fetch incomes",
                data: [],
                meta: result.meta,
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Incomes fetched successfully",
            data: result.data ?? [],
            meta: result.meta,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch incomes",
            data: [],
        };
    }
};

export const getSingleIncome = async (
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

        const response = await serverFetch.get(`/incomes/${id}/single`, {
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
                message: result.message || "Failed to fetch income",
                data: null,
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Income fetched successfully",
            data: result.data ?? null,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch income",
            data: null,
        };
    }
};

export const updateIncome = async (
    id: string,
    data: TUpdateIncomeForm
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
            ...(data.amount !== undefined
                ? { amount: Math.round(data.amount) }
                : {}),
            ...(data.date !== undefined
                ? { date: new Date(data.date).toISOString() }
                : {}),
        };

        const response = await serverFetch.patch(`/incomes/${id}`, {
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
                message: result.message || "Failed to update income",
                data: result.data ?? null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Income updated successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to update income",
            data: null,
        };
    }
};

export const deleteIncome = async (
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

        const response = await serverFetch.delete(`/incomes/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: result.message || "Failed to delete income",
                data: null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Income deleted successfully",
            data: null,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to delete income",
            data: null,
        };
    }
};

export const getDashboardSummary = async (): Promise<
    TApiResponse<TDashboardSummary | null>
> => {
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

        const response = await serverFetch.get("/incomes/dashboard-summary", {
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
                message: result.message || "Failed to fetch dashboard summary",
                data: null,
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Dashboard summary fetched successfully",
            data: result.data ?? null,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch dashboard summary",
            data: null,
        };
    }
};