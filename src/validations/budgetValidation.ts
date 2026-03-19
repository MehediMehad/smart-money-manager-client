import { z } from "zod";

export const budgetSchema = z.object({
    type: z.enum(["DAILY", "MONTHLY"], {
        required_error: "Please select budget type",
    }),

    date: z.string().optional(),
    month: z.string().optional(),

    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Amount must be a positive number",
        }),

    categoryId: z.string().min(1, "Please select a category"),
}).refine(
    (data) => {
        if (data.type === "DAILY") {
            return !!data.date;
        }
        if (data.type === "MONTHLY") {
            return !!data.month;
        }
        return false;
    },
    {
        message: "Date is required for daily budgets / Month is required for monthly budgets",
        path: ["date"], // or ["month"] — we show it on date field for simplicity
    }
);

export type BudgetFormValues = z.infer<typeof budgetSchema>;