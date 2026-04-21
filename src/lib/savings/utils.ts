import { format } from "date-fns";
import { TSavingsGoal } from "@/types";

const DAY_IN_MS = 1000 * 60 * 60 * 24;

export function getDaysLeft(deadline: string, now = new Date()): number {
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / DAY_IN_MS));
}

export const getDeadLineOver = (deadline: string, now = new Date()): boolean => {
    const end = new Date(deadline);
    const diff = end.getTime() - now.getTime();
    return diff < 0;
}

export function getGoalProgress(savedAmount: number, targetAmount: number): number {
    if (targetAmount <= 0) return 0;
    return Math.min(100, Math.round((savedAmount / targetAmount) * 100));
}

export function getExceededAmount(savedAmount: number, targetAmount: number): number {
    return Math.max(0, savedAmount - targetAmount);
}

export function getRawProgressPercentage(savedAmount: number, targetAmount: number): number {
    if (targetAmount <= 0) return 0;
    return Math.round((savedAmount / targetAmount) * 100);
}

export function getRemainingAmount(savedAmount: number, targetAmount: number): number {
    return Math.max(0, targetAmount - savedAmount);
}

export function getDailyRequiredAmount(goal: TSavingsGoal, now = new Date()): number {
    const daysLeft = getDaysLeft(goal.deadline, now);
    const remaining = getRemainingAmount(goal.savedAmount, goal.targetAmount);

    if (daysLeft <= 0 || remaining <= 0) return 0;
    return Math.ceil(remaining / daysLeft);
}


export function isGoalCompleted(goal: TSavingsGoal): boolean {
    return goal.savedAmount >= goal.targetAmount;
}


export function formatGoalDate(date: string): string {
    return format(new Date(date), "dd MMM yyyy");
}