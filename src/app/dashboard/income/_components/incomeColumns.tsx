"use client";

import { DateCell } from "@/components/shared/cell/DateCell";
import { Column } from "@/components/shared/ManagementTable";
import { TIncome } from "@/types";

export const incomeColumns: Column<TIncome>[] = [
  {
    header: "Date",
    accessor: (income) => <DateCell date={income.date} />,
    sortKey: "date",
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
