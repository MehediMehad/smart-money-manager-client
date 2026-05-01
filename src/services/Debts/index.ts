"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/utils/serverFetch";
import { getValidToken } from "@/services/Auth/verifyToken";
import { TApiResponse } from "@/types";
import { TCreateDebtForm, TDebtsData } from "@/types/debts";

const TAG = "debts";

const getAuthError = () => ({
    success: false,
    statusCode: 401,
    message: "Authentication required",
    data: null,
});

export const createDebt = async (
    data: TCreateDebtForm,
): Promise<TApiResponse<any>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return getAuthError();
        }

        const payload = {
            ...data,
            amount: Math.round(Number(data.amount)),
            dueDate: new Date(data.dueDate).toISOString(),
            status: data.status || "PENDING",
            note: data.note || "",
        };

        const response = await serverFetch.post("/debts", {
            body: JSON.stringify(payload),
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
                message: result.message || "Failed to create debt",
                data: result.data ?? null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Debt created successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to create debt",
            data: null,
        };
    }
};

export const getDebts = async (
    queryString?: string,
): Promise<TApiResponse<TDebtsData | null>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return getAuthError();
        }

        const response = await serverFetch.get(
            `/debts${queryString ? `?${queryString}` : ""}`,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                next: {
                    tags: [TAG],
                    revalidate: 180,
                },
            },
        );

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: result.message || "Failed to fetch debts",
                data: null,
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Debts retrieved successfully",
            data: result.data ?? null,
        };
    } catch (error: any) {
        console.log(error);

        return {
            success: false,
            statusCode: 500,
            message:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : "Something went wrong",
            data: null,
        };
    }
};

export const getSingleDebt = async (
    id: string,
): Promise<TApiResponse<any | null>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return getAuthError();
        }

        const response = await serverFetch.get(`/debts/${id}/single`, {
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
                message: result.message || "Failed to fetch debt",
                data: null,
            };
        }

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Debt fetched successfully",
            data: result.data ?? null,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch debt",
            data: null,
        };
    }
};

export const updateDebt = async (
    id: string,
    data: Partial<TCreateDebtForm>,
): Promise<TApiResponse<any>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return getAuthError();
        }

        const payload = {
            ...data,
            ...(data.amount !== undefined
                ? { amount: Math.round(Number(data.amount)) }
                : {}),
            ...(data.dueDate !== undefined
                ? { dueDate: new Date(data.dueDate).toISOString() }
                : {}),
        };

        const response = await serverFetch.patch(`/debts/${id}`, {
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
                message: result.message || "Failed to update debt",
                data: result.data ?? null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Debt updated successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to update debt",
            data: null,
        };
    }
};

export const deleteDebt = async (
    id: string,
): Promise<TApiResponse<null>> => {
    try {
        const accessToken = await getValidToken();

        if (!accessToken) {
            return getAuthError();
        }

        const response = await serverFetch.delete(`/debts/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok) {
            return {
                success: false,
                statusCode: response.status,
                message: result.message || "Failed to delete debt",
                data: null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: response.status,
            message: result.message || "Debt deleted successfully",
            data: null,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to delete debt",
            data: null,
        };
    }
};