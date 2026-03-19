"use server";

import config from "@/configs";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

type ServerActionResponse<T = any> = {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
};

export const createBudgetLimit = async (data: {
    categoryId: string;
    amount: number;
    type: "DAILY" | "MONTHLY";
    date?: string;     // "2025-03-19" for daily
    month?: string;    // "2025-03" for monthly
}): Promise<ServerActionResponse> => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;
        if (!accessToken) {
            return { success: false, message: "Authentication required" };
        }

        const payload: any = {
            categoryId: data.categoryId,
            amount: Math.round(data.amount),
            type: data.type,
        };

        if (data.type === "DAILY") {
            if (!data.date) {
                return { success: false, message: "Date is required for daily budget" };
            }
            payload.date = data.date;
        } else if (data.type === "MONTHLY") {
            if (!data.month) {
                return { success: false, message: "Month is required for monthly budget" };
            }
            const [year, month] = data.month.split("-");
            payload.month = Number(month);
            payload.year = Number(year);
        }

        console.log("dsdsd++++++++++++++++++", payload, "================");


        const res = await fetch(`${config.base_api}/budgets`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        let result;
        try {
            result = await res.json();
        } catch {
            result = {};
        }

        if (!res.ok) {
            throw new Error(
                result.message || result.error || `Server error (${res.status})`
            );
        }

        revalidateTag("budgets", { expire: 0 });

        return {
            success: true,
            message: result.message || "Budget created successfully",
            data: result.data || result,
        };
    } catch (err: any) {
        console.error("[createBudgetLimit]", err);
        return {
            success: false,
            message: err.message || "Failed to create budget",
        };
    }
};

export const updateBudgetLimit = async (data: {
    id: string;
    amount: number;
    // type is NOT sent on update — backend doesn't allow changing type
}): Promise<ServerActionResponse> => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;
        if (!accessToken) {
            return { success: false, message: "Authentication required" };
        }

        if (!data.id) {
            return { success: false, message: "Budget ID is required" };
        }

        const payload = {
            amount: Math.round(data.amount),
        };

        const res = await fetch(`${config.base_api}/budgets/${data.id}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        let result;
        try {
            result = await res.json();
        } catch {
            result = {};
        }

        if (!res.ok) {
            throw new Error(
                result.message || result.error || `Server error (${res.status})`
            );
        }

        revalidateTag("budgets", { expire: 0 });

        return {
            success: true,
            message: result.message || "Budget updated successfully",
            data: result.data || result,
        };
    } catch (err: any) {
        console.error("[updateBudgetLimit]", err);
        return {
            success: false,
            message: err.message || "Failed to update budget",
        };
    }
};
// const accessToken = (await cookies()).get("accessToken")?.value;
// Get all budgets //  revalidateTag("budgets", { expire: 0 });
export const getBudgets = async () => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            throw new Error("No access token found");
        }

        const res = await fetch(`${config.base_api}/budgets`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            next: {
                tags: ["budgets"],
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${res.status}`);
        }

        const result = await res.json();
        return result.data ?? [];
    } catch (error: any) {
        console.error("getBudgets error:", error);
        throw new Error(error?.message || "Failed to fetch budgets");
    }
};



