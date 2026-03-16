"use server";

import config from "@/configs";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

/**
 * Create budget
 */

export const createBudget = async (data: {
    name: string;
    type: "INCOME" | "EXPENSE";
    emoji: string;
}) => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            throw new Error("Authentication required");
        }

        if (!data.name || !data.type) {
            throw new Error("Name and type are required");
        }

        const payload = {
            name: data.name,
            type: data.type,
            emoji: data.emoji,
        };

        const res = await fetch(`${config.base_api}/budgets`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.message ||
                `Failed to create budget (HTTP ${res.status})`
            );
        }

        const result = await res.json();

        revalidateTag("budgets", { expire: 0 });

        return {
            success: true,
            data: result.data || result,
            message: result.message || "Budget created successfully",
        };
    } catch (error: any) {
        console.error("createBudget error:", error);

        return {
            success: false,
            message: error?.message || "Failed to create budget",
            error: error,
        };
    }
};

// Get all budgets
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



