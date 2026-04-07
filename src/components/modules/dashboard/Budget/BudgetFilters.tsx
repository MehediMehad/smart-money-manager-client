"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { MonthPicker } from "@/components/shared/core/MonthPicker";
import { cn } from "@/lib/utils";

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
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [monthPickerOpen, setMonthPickerOpen] = useState(false);

  const today = new Date();
  const defaultDate = format(today, "yyyy-MM-dd");
  const defaultMonth = format(today, "yyyy-MM");

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
          <div className="space-y-1.5 min-w-[220px]">
            <Label className="text-sm">Select Date</Label>

            <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-9 justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate
                    ? format(new Date(selectedDate), "dd MMMM yyyy")
                    : "Pick a date"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate ? new Date(selectedDate) : undefined}
                  onSelect={(date) => {
                    onUpdateQuery({
                      type: "DAILY",
                      date: date ? format(date, "yyyy-MM-dd") : defaultDate,
                    });
                    setDatePickerOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {budgetType === "MONTHLY" && (
          <div className="space-y-1.5 min-w-[220px]">
            <Label className="text-sm">Select Month</Label>

            <Popover open={monthPickerOpen} onOpenChange={setMonthPickerOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full h-9 justify-start text-left font-normal",
                    !selectedMonth && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedMonth
                    ? format(new Date(`${selectedMonth}-01`), "MMMM yyyy")
                    : "Pick a month"}
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0" align="start">
                <MonthPicker
                  selectedMonth={
                    selectedMonth ? new Date(`${selectedMonth}-01`) : undefined
                  }
                  onMonthChange={(date) => {
                    const value = date ? format(date, "yyyy-MM") : defaultMonth;
                    const [year, month] = value.split("-");

                    onUpdateQuery({
                      type: "MONTHLY",
                      month,
                      year,
                    });

                    setMonthPickerOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
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
