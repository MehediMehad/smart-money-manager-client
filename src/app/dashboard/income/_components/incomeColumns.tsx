"use client";

import { Column } from "@/components/shared/ManagementTable";
import { TIncome } from "@/types";
import IncomeDateRangeFilter from "./IncomeDateRangeFilter";
import { format } from "date-fns";

export const incomeColumns: Column<TIncome>[] = [
  {
    header: (
      <div className="flex items-center">
        <span>Date</span>
        <IncomeDateRangeFilter compact />
      </div>
    ),
    accessor: (row) => format(new Date(row.date), "dd MMM yyyy"),
  },
  {
    header: "Note",
    accessor: (income) => (
      <span className="line-clamp-1">{income.note || "N/A"}</span>
    ),
  },
  {
    header: "Category",
    accessor: (income) => (
      <div className="flex items-center gap-2">
        <span>{income.category?.emoji}</span>
        <span>{income.category?.name || "N/A"}</span>
      </div>
    ),
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
