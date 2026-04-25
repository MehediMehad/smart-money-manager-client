// src/services/Category/index.ts
"use server";

import config from "@/configs";
import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { TApiResponse } from "@/types";
import { getValidToken } from "../Auth/verifyToken";
import { serverFetch } from "@/lib/utils/serverFetch";

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

type TGetCategoriesParams = {
    type?: "EXPENSE" | "INCOME";
    year?: string;
    month?: string;
    searchTerm?: string;
};

export const getCategories2 = async (params?: TGetCategoriesParams) => {
    try {
        const accessToken = (await cookies()).get("accessToken")?.value;

        if (!accessToken) {
            return {
                success: false,
                data: [],
                message: "No access token found",
            };
        }

        const query = new URLSearchParams();

        if (params?.type) query.append("type", params.type);
        if (params?.year) query.append("year", params.year);
        if (params?.month) query.append("month", params.month);
        if (params?.searchTerm) query.append("searchTerm", params.searchTerm);

        const res = await fetch(
            `${config.base_api}/categories?${query.toString()}`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
                cache: "no-store",
            }
        );

        const result = await res.json();

        if (!res.ok) {
            return {
                success: false,
                data: [],
                message: result?.message || "Failed to fetch categories",
            };
        }

        return result.data;
    } catch (error: any) {
        return {
            success: false,
            data: [],
            message: error.message || "Failed to fetch categories",
        };
    }
};

export async function getCategories(queryString?: string) {
    try {
        const accessToken = await getValidToken();
        const response = await serverFetch.get(`/categories${queryString ? `?${queryString}` : ""}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            next: {
                tags: ["categories"],
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
