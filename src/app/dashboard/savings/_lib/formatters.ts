import { format } from "date-fns";

export function formatGoalDate(date: string): string {
    return format(new Date(date), "dd MMM yyyy");
}