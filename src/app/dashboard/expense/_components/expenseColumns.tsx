"use client";

import DateRangeFilter from "@/components/shared/DateRangeFilter";
import { Column } from "@/components/shared/ManagementTable";
import { format } from "date-fns";
import { TExpense } from "../_lib/types";

export const expenseColumns: Column<TExpense>[] = [
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
    accessor: (expense) => (
      <span className="line-clamp-1">{expense.note || "N/A"}</span>
    ),
    className: "hidden md:table-cell",
  },
  {
    header: "Category",
    accessor: (expense) => (
      <div className="flex items-center gap-2">
        <span>{expense.category?.emoji}</span>
        <span>{expense.category?.name || "N/A"}</span>
      </div>
    ),
    className: "hidden md:table-cell",
  },
  {
    header: "Amount",
    accessor: (expense) => (
      <span className="font-medium text-rose-600">
        ৳{expense.amount?.toLocaleString()}
      </span>
    ),
    sortKey: "amount",
  },
];
