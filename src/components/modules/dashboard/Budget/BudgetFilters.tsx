"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  budgetType: "DAILY" | "MONTHLY";
  selectedDate: string;
  selectedMonth: string;
  statusFilter: "ALL" | "SAFE" | "WARNING" | "OVER";
  isPending: boolean;
  onUpdateQuery: (updates: Record<string, string | undefined>) => void;
}

export default function BudgetFilters({
  budgetType,
  selectedDate,
  selectedMonth,
  statusFilter,
  isPending,
  onUpdateQuery,
}: Props) {
  const today = new Date();
  const defaultDate = today.toISOString().split("T")[0];
  const defaultMonth = `${today.getFullYear()}-${String(
    today.getMonth() + 1,
  ).padStart(2, "0")}`;

  const hasActiveFilters = statusFilter !== "ALL";

  return (
    <div className="bg-card border rounded-xl p-4 space-y-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium text-base">Filter & Sort</h3>
        {isPending && (
          <span className="text-xs text-muted-foreground animate-pulse">
            Updating...
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-4 items-end">
        <div className="space-y-1.5">
          <Label className="text-sm">Budget Type</Label>
          <div className="flex gap-2">
            <Button
              variant={budgetType === "DAILY" ? "default" : "outline"}
              size="sm"
              onClick={() =>
                onUpdateQuery({
                  type: "DAILY",
                  date: selectedDate || defaultDate,
                  month: undefined,
                  year: undefined,
                })
              }
            >
              Daily
            </Button>

            <Button
              variant={budgetType === "MONTHLY" ? "default" : "outline"}
              size="sm"
              onClick={() => {
                const value = selectedMonth || defaultMonth;
                const [year, month] = value.split("-");
                onUpdateQuery({
                  type: "MONTHLY",
                  month,
                  year,
                  date: undefined,
                });
              }}
            >
              Monthly
            </Button>
          </div>
        </div>

        {budgetType === "DAILY" && (
          <div className="space-y-1.5 min-w-[160px]">
            <Label className="text-sm">Select Date</Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) =>
                onUpdateQuery({
                  type: "DAILY",
                  date: e.target.value,
                })
              }
              className="h-9"
            />
          </div>
        )}

        {budgetType === "MONTHLY" && (
          <div className="space-y-1.5 min-w-[160px]">
            <Label className="text-sm">Select Month</Label>
            <Input
              type="month"
              value={selectedMonth}
              onChange={(e) => {
                const [year, month] = e.target.value.split("-");
                onUpdateQuery({
                  type: "MONTHLY",
                  month,
                  year,
                });
              }}
              className="h-9"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <Label className="text-sm">Status</Label>
          <Select
            value={statusFilter}
            onValueChange={(value) => onUpdateQuery({ status: value })}
          >
            <SelectTrigger className="w-[150px] h-9">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="SAFE">🟢 Safe</SelectItem>
              <SelectItem value="WARNING">🟡 Warning</SelectItem>
              <SelectItem value="OVER">🔴 Over Budget</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onUpdateQuery({ status: "ALL" })}
          >
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
