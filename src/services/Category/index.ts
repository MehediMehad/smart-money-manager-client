// src/services/Category/index.ts
"use server";

import config from "@/configs";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { TApiResponse } from "@/types";

const TAG = "categories";

export const createCategory = async (data: {
    name: string;
    type: "INCOME" | "EXPENSE";
    emoji: string;
}): Promise<TApiResponse<any>> => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                message: "Authentication required",
            };
        }

        if (!data.name || !data.type) {
            return {
                success: false,
                message: "Name and type are required",
            };
        }

        const res = await fetch(`${config.base_api}/categories`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
            return {
                success: false,
                message: result.message || "Failed to create category",
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: res.status,
            message: result.message || "Category created successfully",
            data: result.data,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to create category",
        };
    }
};

export const createCategories = async (data: {
    categories: {
        name: string;
        type: "INCOME" | "EXPENSE";
        emoji: string;
    }[];
}): Promise<TApiResponse<any>> => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "Authentication required",
            };
        }

        if (!data.categories?.length) {
            return {
                success: false,
                statusCode: 400,
                message: "Categories array is required",
            };
        }

        const res = await fetch(`${config.base_api}/categories/bulk-create`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data.categories),
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
            return {
                success: false,
                statusCode: res.status,
                message: result.message || "Failed to create categories",
                data: result.data,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: res.status,
            message: result.message || "Categories created successfully",
            data: result,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to create categories",
        };
    }
};

export const getCategories = async () => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "No access token found",
                data: [],
            };
        }

        const res = await fetch(`${config.base_api}/categories`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            next: { tags: [TAG] },
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
            return {
                success: false,
                statusCode: res.status,
                message: result.message || "Failed to fetch categories",
                data: [],
            };
        }

        return result.data || [];
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to fetch categories",
            data: [],
        };
    }
};

export const deleteCategory = async (id: string): Promise<TApiResponse<null>> => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                statusCode: 401,
                message: "No access token found",
                data: null,
            };
        }

        const res = await fetch(`${config.base_api}/categories/hide/${id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        const result = await res.json().catch(() => ({}));

        if (!res.ok) {
            return {
                success: false,
                statusCode: res.status,
                message: result.message || "Failed to delete category",
                data: null,
            };
        }

        revalidateTag(TAG, { expire: 0 });

        return {
            success: true,
            statusCode: res.status,
            message: result.message || "Category deleted successfully",
            data: null,
        };
    } catch (error: any) {
        return {
            success: false,
            statusCode: 500,
            message: error.message || "Failed to delete category",
            data: null,
        };
    }
};
