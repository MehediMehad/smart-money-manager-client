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

interface YearCalendarFilterProps {
  defaultYear: string;
}

const YearCalendarFilter = ({ defaultYear }: YearCalendarFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const currentYear = searchParams.get("year") || defaultYear;

  const selectedDate = new Date(Number(currentYear), 0, 1);

  const handleSelect = (date?: Date) => {
    if (!date) return;

    const params = new URLSearchParams(searchParams.toString());

    params.set("year", String(date.getFullYear()));
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
          {currentYear}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
          captionLayout="dropdown-years"
          fromYear={2020}
          toYear={new Date().getFullYear()}
          defaultMonth={selectedDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
};

export default YearCalendarFilter;
