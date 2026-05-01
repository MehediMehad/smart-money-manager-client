"use client";

import DateRangeFilter from "@/components/shared/DateRangeFilter";
import { Column } from "@/components/shared/ManagementTable";
import { TDebt, TDebtStatus } from "@/types/debts";
import { format } from "date-fns";

// "PENDING" | "PAID" | "OVERDUE";
const statusColor: Record<TDebtStatus, string> = {
  PENDING: "bg-yellow-50 text-yellow-700 border-yellow-200",
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  OVERDUE: "bg-red-50 text-red-700 border-red-200",
};

const formatDate = (date?: string | null) => {
  if (!date) return "N/A";
  return format(new Date(date), "dd MMM yyyy");
};

export const debtColumns: Column<TDebt>[] = [
  {
    header: (
      <div className="flex items-center">
        <span>Due Date</span>
        {/* <DateRangeFilter compact /> */}
      </div>
    ),
    accessor: (debt) => formatDate(debt.dueDate),
  },
  {
    header: "Person",
    accessor: (debt) => (
      <span className="font-medium line-clamp-1">{debt.person || "N/A"}</span>
    ),
  },
  {
    header: "Type",
    accessor: (debt) => (
      <span
        className={
          debt.type === "GIVEN"
            ? "inline-flex rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
            : "inline-flex rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700"
        }
      >
        {debt.type === "GIVEN" ? "Given" : "Taken"}
      </span>
    ),
  },
  {
    header: "Amount",
    accessor: (debt) => (
      <span
        className={
          debt.type === "GIVEN"
            ? "font-medium text-emerald-600"
            : "font-medium text-red-600"
        }
      >
        ৳{Number(debt.amount || 0).toLocaleString()}
      </span>
    ),
    // sortKey: "amount",
  },
  {
    header: "Status",
    accessor: (debt) => (
      <span
        className={`inline-flex rounded-full ${statusColor[debt.status]} px-2.5 py-1 text-xs font-medium`}
      >
        {debt.status}
      </span>
    ),
    className: "hidden md:table-cell",
  },
  {
    header: "Note",
    accessor: (debt) => (
      <span className="line-clamp-1">{debt.note || "N/A"}</span>
    ),
    className: "hidden lg:table-cell",
  },
];
