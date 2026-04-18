"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import ExpenseFilters from "./ExpenseFilters";
import { NMTable } from "@/components/shared/core/NMTable";
import { deleteExpense, getExpenses } from "@/services/Expense";
import { getCategories } from "@/services/Category";
import { TCategory } from "@/types";
import dynamic from "next/dynamic";
import ExpenseFormModal from "./ExpenseFormModal";

const DeleteConfirmationModal = dynamic(
  () => import("@/components/shared/core/NMModal/DeleteConfirmationModal"),
  { ssr: false },
);

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

const getCurrentYearMonth = () => {
  const now = new Date();
  return {
    year: String(now.getFullYear()),
    month: String(now.getMonth() + 1).padStart(2, "0"),
  };
};

export default function Expense({ categories }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const { year: currentYear, month: currentMonth } = getCurrentYearMonth();

  const initialYear = searchParams.get("year") || currentYear;
  const initialMonth =
    searchParams.get("month")?.padStart(2, "0") || currentMonth;
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

  // Delete Modal
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    name: "",
  });

  const updateQuery = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value.trim() === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      startTransition(() => {
        const queryString = params.toString();
        router.push(queryString ? `${pathname}?${queryString}` : pathname);
      });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm.trim());
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const fetchExpenses = useCallback(async () => {
    setLoading(true);

    try {
      const result = await getExpenses({
        year,
        month,
        searchTerm: debouncedSearchTerm || undefined,
        categoryId:
          categoryFilter === ALL_CATEGORIES ? undefined : categoryFilter,
      });

      if (result?.success) {
        setExpenses(result.data || []);
      } else {
        setExpenses([]);
        toast.error(result?.message || "Failed to load expenses");
      }
    } catch (error) {
      console.error("Failed to fetch expenses:", error);
      setExpenses([]);
      toast.error("Something went wrong while loading expenses");
    } finally {
      setLoading(false);
    }
  }, [year, month, debouncedSearchTerm, categoryFilter]);

  const fetchExpenseCategories = useCallback(async () => {
    setCategoryLoading(true);

    try {
      const result = await getCategories({
        type: "EXPENSE",
        year,
        month,
      });

      setExpenseCategories(result || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setExpenseCategories([]);
      toast.error("Something went wrong while loading categories");
    } finally {
      setCategoryLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  useEffect(() => {
    fetchExpenseCategories();
  }, [fetchExpenseCategories]);

  // Reset category filter if it no longer exists
  useEffect(() => {
    const categoryExists = expenseCategories.some(
      (cat) => cat.id === categoryFilter,
    );

    if (
      categoryFilter !== ALL_CATEGORIES &&
      !categoryExists &&
      !categoryLoading
    ) {
      setCategoryFilter(ALL_CATEGORIES);
      updateQuery({ categoryId: undefined });
    }
  }, [expenseCategories, categoryFilter, categoryLoading, updateQuery]);

  const filteredExpenses = useMemo(() => {
    if (!specificDate) return expenses;

    const normalizedDay = Number(specificDate);
    if (Number.isNaN(normalizedDay)) return expenses;

    return expenses.filter((expense) => {
      const expenseDay = new Date(expense.date).getDate();
      return expenseDay === normalizedDay;
    });
  }, [expenses, specificDate]);

  const openDeleteModal = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: "", name: "" });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    const res = await deleteExpense(deleteModal.id);
    if (res.success) {
      toast.success(res.message);
      await fetchExpenses();
    } else {
      toast.error(res.message);
    }
    closeDeleteModal();
  };

  const expenseColumns = useMemo<ColumnDef<TExpense>[]>(
    () => [
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
        cell: ({ row }) => (
          <span className="line-clamp-1">{row.original.note}</span>
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {row.original.category.emoji ? (
              <span aria-hidden="true">{row.original.category.emoji}</span>
            ) : null}
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
        header: "Actions",
        cell: ({ row }) => {
          const expense = row.original;

          return (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <ExpenseFormModal
                  mode="edit"
                  expense={expense}
                  categories={categories}
                  onSuccess={async () => {
                    await fetchExpenses();
                    await fetchExpenseCategories();
                  }}
                />
              </div>

              <button
                type="button"
                aria-label={`Delete expense ${expense.note}`}
                onClick={() => openDeleteModal(expense.id, expense.note)}
                className="text-red-600 transition-colors hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📉 Expense
          </h1>
          <p className="text-sm text-muted-foreground mt-1 hidden sm:block"></p>
        </div>

        <div className="hidden sm:block">
          <ExpenseFormModal mode="create" categories={categories} />
        </div>
      </div>

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

      <NMTable
        columns={expenseColumns}
        data={filteredExpenses}
        isLoading={loading}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        item="Expense"
        name={deleteModal.name}
        isOpen={deleteModal.isOpen}
        onOpenChange={(open) => !open && closeDeleteModal()}
        onConfirm={handleDelete}
      />
    </div>
  );
}
