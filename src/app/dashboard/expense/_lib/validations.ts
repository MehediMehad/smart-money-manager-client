import { z } from "zod";

export const expenseSchema = z.object({
    categoryId: z.string().min(1, "Category is required"),
    amount: z.string().min(1, "Amount is required"),
    note: z.string().min(1, "Note is required"),
    date: z.string().min(1, "Date is required"),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;