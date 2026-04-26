"use client";

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface IncomeDateRangeFilterProps {
  compact?: boolean;
}

/**
 * IncomeDateRangeFilter
 *
 * Purpose:
 * - Handle year, month, date_range filter with single calendar
 * - URL sync: ?year=2026&month=04&date_range=1-31
 * - Only current visible month date can be selected
 */

const IncomeDateRangeFilter = ({
  compact = false,
}: IncomeDateRangeFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Next.js transition for smooth URL update
  const [isPending, startTransition] = useTransition();

  // Popover open/close state
  const [open, setOpen] = useState(false);

  const today = new Date();

  /**
   * Get current year & month from URL
   * fallback: current system date
   */
  const year = Number(searchParams.get("year")) || today.getFullYear();
  const month = Number(searchParams.get("month")) || today.getMonth() + 1;

  /**
   * Get last date of current month (e.g. Feb = 28/29)
   */
  const lastDateOfMonth = new Date(year, month, 0).getDate();

  /**
   * Parse date_range param
   * fallback: full month (1-lastDate)
   */
  const dateRangeParam =
    searchParams.get("date_range") || `1-${lastDateOfMonth}`;

  const [fromDay, toDay] = dateRangeParam.split("-").map(Number);

  /**
   * Convert URL params → DateRange object
   */
  const urlSelectedRange: DateRange = useMemo(() => {
    return {
      from: new Date(year, month - 1, fromDay || 1),
      to: new Date(year, month - 1, toDay || lastDateOfMonth),
    };
  }, [year, month, fromDay, toDay, lastDateOfMonth]);

  /**
   * Local state for selected range (UI control)
   */
  const [selectedRange, setSelectedRange] =
    useState<DateRange>(urlSelectedRange);

  /**
   * Calendar current visible month
   */
  const [calendarMonth, setCalendarMonth] = useState<Date>(
    new Date(year, month - 1, 1),
  );

  /**
   * Sync URL → UI state
   */
  useEffect(() => {
    setSelectedRange(urlSelectedRange);
    setCalendarMonth(new Date(year, month - 1, 1));
  }, [urlSelectedRange, year, month]);

  /**
   * Update URL যখন date range select করা হয়
   */
  const updateUrl = (range: DateRange) => {
    if (!range.from) return;

    const from = range.from;
    const to = range.to || range.from;

    const params = new URLSearchParams(searchParams.toString());

    params.set("year", String(from.getFullYear()));
    params.set("month", String(from.getMonth() + 1).padStart(2, "0"));
    params.set("date_range", `${from.getDate()}-${to.getDate()}`);

    // Reset pagination
    params.delete("page");

    startTransition(() => {
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });
  };

  /**
   * Disable:
   * - future dates
   * - other months (only current calendar month allowed)
   */
  const isDateDisabled = (date: Date) => {
    return (
      date > today ||
      date.getMonth() !== calendarMonth.getMonth() ||
      date.getFullYear() !== calendarMonth.getFullYear()
    );
  };

  /**
   * Custom range selection logic
   * (to avoid react-day-picker default range bug)
   */
  const handleDayClick = (day: Date) => {
    if (isDateDisabled(day)) return;

    // First click OR reset
    if (!selectedRange?.from || selectedRange.to) {
      setSelectedRange({
        from: day,
        to: undefined,
      });
      return;
    }

    const from = selectedRange.from;

    // Build final range
    const finalRange: DateRange =
      day < from ? { from: day, to: from } : { from, to: day };

    setSelectedRange(finalRange);
    updateUrl(finalRange);

    // Close calendar after complete selection
    setOpen(false);
  };

  /**
   * Month change handler
   * - change calendar view
   * - reset selected range (UX clean)
   */
  const handleMonthChange = (month: Date) => {
    setCalendarMonth(month);

    setSelectedRange({
      from: undefined,
      to: undefined,
    });
  };

  /**
   * Button label text
   */
  //   const label = selectedRange?.from
  //     ? selectedRange.to
  //       ? `${format(selectedRange.from, "dd MMM yyyy")} - ${format(
  //           selectedRange.to,
  //           "dd MMM yyyy",
  //         )}`
  //       : format(selectedRange.from, "dd MMM yyyy")
  //     : "Select date";

  const label = selectedRange?.from
    ? selectedRange.to
      ? `${format(selectedRange.from, "MMM d")} - ${format(
          selectedRange.to,
          "MMM d, yyyy",
        )}`
      : format(selectedRange.from, "MMM d, yyyy")
    : "Select date";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {/* Trigger Button */}
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant={compact ? "link" : "default"}
          disabled={isPending}
          className="justify-start text-left font-normal"
        >
          {!compact && <CalendarIcon className="mr-2 h-4 w-4" />}
          {compact ? (
            <div className="flex items-center h-8 gap-1.5 text-base font-medium text-slate-600 hover:text-slate-900">
              <span className="text-slate-500 text-xs ">({label})</span>
              <CalendarIcon className="h-4 w-4 text-emerald-600" />
            </div>
          ) : (
            label
          )}
        </Button>

        {/* <Button
          type="button"
          variant="ghost"
          disabled={isPending}
          className={
            compact
              ? "h-8 gap-1.5 px-2 text-xs font-medium text-slate-600 hover:text-slate-900"
              : "w-full justify-start text-left font-normal"
          }
        >
          {!compact && <CalendarIcon className="mr-2 h-4 w-4" />}

          {compact ? (
            <Button>
              <span className="text-slate-500">Date</span>
              <span className="text-slate-400">({label})</span>
              <CalendarIcon className="h-4 w-4 text-emerald-600" />
            </Button>
          ) : (
            label
          )}
        </Button> */}
      </PopoverTrigger>

      {/* Calendar Popover */}
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={selectedRange}
          month={calendarMonth}
          onMonthChange={handleMonthChange}
          onDayClick={handleDayClick}
          numberOfMonths={1}
          disabled={isDateDisabled}
          toMonth={today}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default IncomeDateRangeFilter;
