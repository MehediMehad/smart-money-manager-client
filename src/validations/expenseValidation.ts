import { z } from "zod";

export const expenseSchema = z.object({
    date: z.string().min(1, "Date is required"),

    categoryId: z.string().min(1, "Please select a category"),

    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
            message: "Amount must be a positive number",
        }),

    note: z
        .string()
        .min(1, "Note/Description is required")
        .max(500, "Note cannot exceed 500 characters"),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;