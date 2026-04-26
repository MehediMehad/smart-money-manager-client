"use client";

import DateRangeFilter from "@/components/shared/DateRangeFilter";
import { Column } from "@/components/shared/ManagementTable";
import { format } from "date-fns";
import { TIncome } from "../_lib/types";

export const incomeColumns: Column<TIncome>[] = [
  {
    header: (
      <div className="flex items-center">
        <span>Date</span>
        <DateRangeFilter compact />
      </div>
    ),
    accessor: (row) => format(new Date(row.date), "dd MMM yyyy"),
  },
  {
    header: "Note",
    accessor: (income) => (
      <span className="line-clamp-1">{income.note || "N/A"}</span>
    ),
    className: "hidden md:table-cell",
  },
  {
    header: "Category",
    accessor: (income) => (
      <div className="flex items-center gap-2">
        <span>{income.category?.emoji}</span>
        <span>{income.category?.name || "N/A"}</span>
      </div>
    ),
    className: "hidden md:table-cell",
  },
  {
    header: "Amount",
    accessor: (income) => (
      <span className="font-medium text-emerald-600">
        ৳{income.amount?.toLocaleString()}
      </span>
    ),
    sortKey: "amount",
  },
];
