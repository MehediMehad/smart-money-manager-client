import { z } from "zod";

export const incomeSchema = z.object({
    categoryId: z.string().min(1, "Category is required"),
    amount: z.string().min(1, "Amount is required"),
    note: z.string().min(1, "Note is required"),
    date: z.string().min(1, "Date is required"),
});

export type IncomeFormValues = z.infer<typeof incomeSchema>;