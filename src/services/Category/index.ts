"use server";

import config from "@/configs";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

/**
 * Create Single Category
 */

export const createCategory = async (data: {
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

        const res = await fetch(`${config.base_api}/categories`, {
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
                `Failed to create category (HTTP ${res.status})`
            );
        }

        const result = await res.json();

        revalidateTag("categories", { expire: 0 });

        return {
            success: true,
            data: result.data || result,
            message: "Category created successfully",
        };
    } catch (error: any) {
        console.error("createCategory error:", error);

        return {
            success: false,
            message: error?.message || "Failed to create category",
            error: error,
        };
    }
};

/**
 * Create Multiple Categories
 */

export const createCategories = async (data: {
    categories: {
        name: string;
        type: "INCOME" | "EXPENSE";
        emoji: string;
    }[];
}) => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            throw new Error("Authentication required");
        }

        if (!data.categories || data.categories.length === 0) {
            throw new Error("Categories array is required");
        }

        const res = await fetch(`${config.base_api}/categories/bulk-create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data.categories),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(
                errorData.message ||
                `Failed to create categories (HTTP ${res.status})`
            );
        }

        const result = await res.json();

        revalidateTag("categories", { expire: 0 });

        return {
            success: true,
            data: result.data || result,
            message: "Categories created successfully",
        };
    } catch (error: any) {
        console.error("createCategories error:", error);

        return {
            success: false,
            message: error?.message || "Failed to create categories",
            error: error,
        };
    }
};
// Get all categories
export const getCategories = async () => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            throw new Error("No access token found");
        }

        const res = await fetch(`${config.base_api}/categories`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            next: {
                tags: ["categories"],
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${res.status}`);
        }

        const result = await res.json();
        return result.data ?? [];
    } catch (error: any) {
        console.error("getCategories error:", error);
        throw new Error(error?.message || "Failed to fetch categories");
    }
};


// Delete Category
export const deleteCategory = async (id: string) => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            throw new Error("No access token found");
        }

        const res = await fetch(`${config.base_api}/categories/hide/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${res.status}`);
        }

        const result = await res.json();
        revalidateTag("categories", { expire: 0 });

        return result.data;
    } catch (error: any) {
        console.error("deleteCategory error:", error);
        throw new Error(error?.message || "Failed to delete category");
    }
};

