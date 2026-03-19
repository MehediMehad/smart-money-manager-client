"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useMemo } from "react";

interface MonthPickerProps {
  selectedMonth: Date | undefined;
  onMonthChange: (date: Date) => void;
  className?: string;
}

export function MonthPicker({
  selectedMonth,
  onMonthChange,
  className,
}: MonthPickerProps) {
  // Default to current year if nothing is selected
  const displayYear = selectedMonth?.getFullYear() ?? new Date().getFullYear();

  const handleYearChange = (delta: number) => {
    const newYear = displayYear + delta;
    // If we had a selected month, keep the same month in new year
    if (selectedMonth) {
      const newDate = new Date(selectedMonth);
      newDate.setFullYear(newYear);
      onMonthChange(newDate);
    } else {
      // Otherwise just update the display year (selection happens on click)
      onMonthChange(new Date(newYear, 0, 1));
    }
  };

  const months = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => {
      const date = new Date(displayYear, i, 1);
      const isSelected =
        selectedMonth &&
        selectedMonth.getMonth() === i &&
        selectedMonth.getFullYear() === displayYear;

      return {
        date,
        name: format(date, "MMM"),
        isSelected,
      };
    });
  }, [displayYear, selectedMonth]);

  return (
    <div className={cn("p-3 min-w-[260px]", className)}>
      {/* Year navigation */}
      <div className="flex items-center justify-between mb-3 px-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleYearChange(-1)}
          className="h-8 w-8 p-0"
        >
          ←
        </Button>

        <span className="text-sm font-medium">{displayYear}</span>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleYearChange(1)}
          className="h-8 w-8 p-0"
        >
          →
        </Button>
      </div>

      {/* Month grid */}
      <div className="grid grid-cols-3 gap-2">
        {months.map(({ date, name, isSelected }) => (
          <button
            key={name}
            type="button"
            onClick={() => onMonthChange(date)}
            className={cn(
              "h-10 text-sm font-medium rounded-md transition-colors",
              "border border-transparent",
              "hover:border-primary/30 hover:bg-primary/5",
              isSelected
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "text-muted-foreground",
            )}
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}
