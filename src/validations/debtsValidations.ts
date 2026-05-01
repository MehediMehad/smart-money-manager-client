import { z } from "zod";

export const debtSchema = z.object({
    person: z
        .string()
        .trim()
        .min(1, "Person name is required")
        .max(80, "Person name is too long"),

    amount: z
        .string()
        .min(1, "Amount is required")
        .refine((value) => !Number.isNaN(Number(value)), {
            message: "Amount must be a valid number",
        })
        .refine((value) => Number(value) > 0, {
            message: "Amount must be greater than 0",
        }),

    type: z.enum(["GIVEN", "TAKEN"]),

    dueDate: z.string().min(1, "Due date is required"),

    status: z.enum(["PENDING", "PAID", "OVERDUE"]),

    note: z.string(),
});

export type DebtFormValues = z.infer<typeof debtSchema>;
