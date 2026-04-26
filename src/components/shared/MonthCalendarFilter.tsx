"use client";

import { CalendarIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MonthCalendarFilterProps {
  defaultYear: string;
  defaultMonth: string;
}

const MonthCalendarFilter = ({
  defaultYear,
  defaultMonth,
}: MonthCalendarFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const currentYear = searchParams.get("year") || defaultYear;
  const currentMonth = searchParams.get("month") || defaultMonth;

  const selectedDate = new Date(
    Number(currentYear),
    Number(currentMonth) - 1,
    1,
  );

  const handleSelect = (date?: Date) => {
    if (!date) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("year", String(date.getFullYear()));
    params.set("month", String(date.getMonth() + 1).padStart(2, "0"));
    params.delete("page");

    startTransition(() => {
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });

    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          className="w-full justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {format(selectedDate, "MMMM yyyy")}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          captionLayout="dropdown"
          defaultMonth={selectedDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default MonthCalendarFilter;
