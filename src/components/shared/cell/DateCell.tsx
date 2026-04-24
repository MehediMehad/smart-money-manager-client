"use client";

interface DateCellProps {
  date?: string | Date;
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function DateCell({ date }: DateCellProps) {
  return <span className="text-sm">{formatDateTime(date!)}</span>;
}
