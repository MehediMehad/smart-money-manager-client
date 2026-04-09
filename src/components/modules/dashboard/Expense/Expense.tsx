"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ExpenseHeader from "./ExpenseHeader";
import { getExpenses, deleteExpense } from "@/services/Expense";
import { TCategory } from "@/types";
import { toast } from "sonner";
import ExpenseFilters from "./ExpenseFilters";
import ExpenseGrid from "./ExpenseGrid";

interface TExpense {
  id: string;
  note: string;
  amount: number;
  date: string;
  category: {
    id: string;
    name: string;
    emoji?: string;
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

  const hasActiveFilters =
    !!specificDate ||
    !!debouncedSearchTerm ||
    categoryFilter !== ALL_CATEGORIES;

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <ExpenseHeader categories={categories} />

      <ExpenseFilters
        year={year}
        month={month}
        specificDate={specificDate}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        categories={categories}
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

      {filteredExpenses.length > 0 ? (
        <ExpenseGrid
          expenses={filteredExpenses}
          loading={loading || isPending}
          onDelete={handleDelete}
        />
      ) : (
        <div className="text-center py-12">
          {hasActiveFilters ? (
            <p className="text-muted-foreground">
              No expenses found for the selected filters
            </p>
          ) : (
            <p className="text-muted-foreground">
              No expenses found for the selected month
            </p>
          )}
        </div>
      )}
    </div>
  );
}
