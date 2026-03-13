"use server";

import config from "@/configs";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";
import { revalidateTag } from "next/cache";

/**
 * Create Daily Budget
 */

export const createDailyBudget = async (data: {
    categoryId: string;
    amount: number;
    date: string; // ISO string
}) => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            throw new Error("Authentication required");
        }

        if (!data.categoryId || !data.amount || data.amount <= 0) {
            throw new Error("Category ID and valid amount are required");
        }

        // Optional: validate date format if needed
        const dateObj = new Date(data.date);
        if (isNaN(dateObj.getTime())) {
            throw new Error("Invalid date format");
        }

        const payload = {
            categoryId: data.categoryId,
            amount: Number(data.amount),
            date: data.date,
        };

        const res = await fetch(`${config.base_api}/daily-budgets`, {
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
                `Failed to create daily budget (HTTP ${res.status})`
            );
        }

        const result = await res.json();

        // Important: revalidate data so UI updates
        revalidateTag("daily-budgets", { expire: 0 });

        return {
            success: true,
            data: result.data || result,
            message: "Daily budget created successfully",
        };
    } catch (error: any) {
        console.error("createDailyBudget error:", error);
        return {
            success: false,
            message: error?.message || "Failed to create daily budget",
            error: error,
        };
    }
};

