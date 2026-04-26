// src/app/dashboard/income/_actions/index.ts
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/utils/serverFetch";
import { getValidToken } from "@/services/Auth/verifyToken";
import { TApiResponse } from "@/types";
import { TCreateIncomeForm } from "../_lib/types";

const TAG = "incomes";

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

export async function getIncomes(queryString?: string) {
    try {
        const accessToken = await getValidToken();
        const response = await serverFetch.get(`/incomes${queryString ? `?${queryString}` : ""}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: {
                tags: [TAG],
                revalidate: 180
            }
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}

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
    data: Partial<TCreateIncomeForm>
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

