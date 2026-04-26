// src/app/dashboard/expense/_actions/index.tsx
"use server";

import { revalidateTag } from "next/cache";
import { serverFetch } from "@/lib/utils/serverFetch";
import {
  TApiResponse,
  TUpdateExpenseForm,
  TCreateExpenseForm,
  TGetExpensesParams,
} from "@/types";
import { getValidToken } from "@/services/Auth/verifyToken";

const TAG = "expenses";

export const createExpense = async (
  data: TCreateExpenseForm,
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

// getExpenses
export async function getExpenses(queryString?: string) {
  try {
    const accessToken = await getValidToken();
    const response = await serverFetch.get(
      `/expenses${queryString ? `?${queryString}` : ""}`,
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
    const result = await response.json();
    return result;
  } catch (error: any) {
    console.log(error);
    return {
      success: false,
      message: `${process.env.NODE_ENV === "development" ? error.message : "Something went wrong"}`,
    };
  }
}

export const getSingleExpense = async (
  id: string,
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
  data: TUpdateExpenseForm,
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
      ...(data.date !== undefined
        ? { date: new Date(data.date).toISOString() }
        : {}),
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
  id: string,
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
