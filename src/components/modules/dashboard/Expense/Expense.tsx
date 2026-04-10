"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ExpenseHeader from "./ExpenseHeader";
import { getExpenses, deleteExpense } from "@/services/Expense";
import { getCategories } from "@/services/Category";
import { TCategory } from "@/types";
import { toast } from "sonner";
import ExpenseFilters from "./ExpenseFilters";
import { NMTable } from "@/components/shared/core/NMTable";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Trash2 } from "lucide-react";

interface TExpense {
  id: string;
  note: string;
  amount: number;
  date: string;
  category: {
    id: string;
    name: string;
    emoji: string;
    type: "EXPENSE" | "INCOME";
  };
}

interface Props {
  categories: TCategory[];
}

const ALL_CATEGORIES = "all";

export default function ExpensePage({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const initialYear = searchParams.get("year") || "2026";
  const initialMonth = searchParams.get("month")?.padStart(2, "0") || "03";
  const initialDate = searchParams.get("date") || "";
  const initialSearch = searchParams.get("searchTerm") || "";
  const initialCategory = searchParams.get("categoryId") || ALL_CATEGORIES;

  const [year, setYear] = useState(initialYear);
  const [month, setMonth] = useState(initialMonth);
  const [specificDate, setSpecificDate] = useState(initialDate);
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(initialSearch);
  const [categoryFilter, setCategoryFilter] = useState(initialCategory);

  const [expenses, setExpenses] = useState<TExpense[]>([]);
  const [loading, setLoading] = useState(true);

  const [expenseCategories, setExpenseCategories] = useState<TCategory[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(false);

  const updateQuery = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value.trim() === "") params.delete(key);
      else params.set(key, value);
    });

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`);
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchExpenses = async () => {
    setLoading(true);

    try {
      const result = await getExpenses({
        year,
        month,
        searchTerm: debouncedSearchTerm || undefined,
        categoryId:
          categoryFilter === ALL_CATEGORIES ? undefined : categoryFilter,
      });

      if (result.success) {
        setExpenses(result.data || []);
      } else {
        toast.error(result.message || "Failed to load expenses");
        setExpenses([]);
      }
    } catch {
      toast.error("Something went wrong while loading expenses");
      setExpenses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [year, month, debouncedSearchTerm, categoryFilter]);

  const filteredExpenses = useMemo(() => {
    if (!specificDate) return expenses;

    return expenses.filter((expense) => {
      const day = new Date(expense.date).getDate().toString();
      return day === specificDate;
    });
  }, [expenses, specificDate]);

  const fetchCategories = async () => {
    setCategoryLoading(true);
    try {
      const result = await getCategories({
        type: "EXPENSE",
        year,
        month,
      });
      const categories = result || [];
      setExpenseCategories(categories);
    } catch {
      setExpenseCategories([]);
      toast.error("Something went wrong while loading categories");
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    const exists = expenseCategories.some((cat) => cat.id === categoryFilter);

    if (categoryFilter !== "all" && !exists) {
      setCategoryFilter("all");
      updateQuery({
        categoryId: undefined,
      });
    }
  }, [expenseCategories, categoryFilter]);

  useEffect(() => {
    fetchCategories();
  }, [year, month]);

  const handleDelete = async (id: string, note: string) => {
    if (!confirm(`Delete expense "${note}"?`)) return;

    const res = await deleteExpense(id);

    if (res.success) {
      toast.success("Expense deleted successfully");
      fetchExpenses();
    } else {
      toast.error(res.message || "Failed to delete expense");
    }
  };

  const expenseColumns: ColumnDef<TExpense>[] = [
    {
      accessorKey: "date",
      header: "Date",
      cell: ({ row }) => {
        const date = new Date(row.original.date);
        return date.toLocaleDateString("en-GB");
      },
    },
    {
      accessorKey: "note",
      header: "Note",
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          {row.original.category.emoji && (
            <span>{row.original.category.emoji}</span>
          )}
          <span>{row.original.category.name}</span>
        </div>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-medium">
          ৳{row.original.amount.toLocaleString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => {
        const expense = row.original;

        return (
          <div className="flex gap-3">
            {/* Edit Button */}
            <button
              onClick={() => {
                // Edit logic এখানে লিখবে (modal খুলবে)
                alert(`Edit expense: ${expense.note}`); // পরে Modal দিয়ে replace করবে
              }}
              className="text-blue-600 hover:text-blue-700 transition-colors"
            >
              <Edit size={18} />
            </button>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(expense.id, expense.note)}
              className="text-red-600 hover:text-red-700 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <ExpenseHeader categories={categories} />

      <ExpenseFilters
        year={year}
        month={month}
        specificDate={specificDate}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        categories={expenseCategories}
        isPending={isPending}
        onYearChange={(value) => {
          setYear(value);
          updateQuery({ year: value });
        }}
        onMonthChange={(value) => {
          setMonth(value);
          updateQuery({ month: value });
        }}
        onDateChange={(value) => {
          setSpecificDate(value);
          updateQuery({ date: value || undefined });
        }}
        onSearchChange={(value) => {
          setSearchTerm(value);
          updateQuery({ searchTerm: value || undefined });
        }}
        onCategoryChange={(value) => {
          setCategoryFilter(value);
          updateQuery({
            categoryId: value === ALL_CATEGORIES ? undefined : value,
          });
        }}
        onReset={() => {
          setSpecificDate("");
          setSearchTerm("");
          setCategoryFilter(ALL_CATEGORIES);
          updateQuery({
            date: undefined,
            searchTerm: undefined,
            categoryId: undefined,
          });
        }}
      />

      {/* TABLE */}
      <NMTable
        columns={expenseColumns}
        data={filteredExpenses}
        isLoading={loading}
      />
    </div>
  );
}
