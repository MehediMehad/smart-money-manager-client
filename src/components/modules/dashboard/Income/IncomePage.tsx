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

import IncomeFilters from "./IncomeFilters";
import { NMTable } from "@/components/shared/core/NMTable";
import { deleteIncome, getIncomes } from "@/services/Income";
import { getCategories } from "@/services/Category";
import { TCategory } from "@/types";
import dynamic from "next/dynamic";
import IncomeFormModal from "./IncomeFormModal";

const DeleteConfirmationModal = dynamic(
  () => import("@/components/shared/core/NMModal/DeleteConfirmationModal"),
  { ssr: false },
);

interface TIncome {
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

export default function Income({ categories }: Props) {
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

  const [incomes, setIncomes] = useState<TIncome[]>([]);
  const [loading, setLoading] = useState(true);

  const [incomeCategories, setIncomeCategories] = useState<TCategory[]>([]);
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

  const fetchIncomes = useCallback(async () => {
    setLoading(true);

    try {
      const result = await getIncomes({
        year,
        month,
        searchTerm: debouncedSearchTerm || undefined,
        categoryId:
          categoryFilter === ALL_CATEGORIES ? undefined : categoryFilter,
      });

      if (result?.success) {
        setIncomes(result.data || []);
      } else {
        setIncomes([]);
        toast.error(result?.message || "Failed to load incomes");
      }
    } catch (error) {
      console.error("Failed to fetch incomes:", error);
      setIncomes([]);
      toast.error("Something went wrong while loading incomes");
    } finally {
      setLoading(false);
    }
  }, [year, month, debouncedSearchTerm, categoryFilter]);

  const fetchIncomeCategories = useCallback(async () => {
    setCategoryLoading(true);

    try {
      const result = await getCategories({
        type: "INCOME",
        year,
        month,
      });

      setIncomeCategories(result || []);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setIncomeCategories([]);
      toast.error("Something went wrong while loading categories");
    } finally {
      setCategoryLoading(false);
    }
  }, [year, month]);

  useEffect(() => {
    fetchIncomes();
  }, [fetchIncomes]);

  useEffect(() => {
    fetchIncomeCategories();
  }, [fetchIncomeCategories]);

  // Reset category filter if it no longer exists
  useEffect(() => {
    const categoryExists = incomeCategories.some(
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
  }, [incomeCategories, categoryFilter, categoryLoading, updateQuery]);

  const filteredIncomes = useMemo(() => {
    if (!specificDate) return incomes;

    const normalizedDay = Number(specificDate);
    if (Number.isNaN(normalizedDay)) return incomes;

    return incomes.filter((income) => {
      const incomeDay = new Date(income.date).getDate();
      return incomeDay === normalizedDay;
    });
  }, [incomes, specificDate]);

  const openDeleteModal = (id: string, name: string) => {
    setDeleteModal({ isOpen: true, id, name });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ isOpen: false, id: "", name: "" });
  };

  const handleDelete = async () => {
    if (!deleteModal.id) return;

    const res = await deleteIncome(deleteModal.id);
    if (res.success) {
      toast.success(res.message);
      await fetchIncomes();
    } else {
      toast.error(res.message);
    }
    closeDeleteModal();
  };

  const incomeColumns = useMemo<ColumnDef<TIncome>[]>(
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
          <span className="font-medium text-emerald-600">
            ৳{row.original.amount.toLocaleString()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const income = row.original;

          return (
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <IncomeFormModal
                  mode="edit"
                  income={income}
                  categories={categories}
                  onSuccess={async () => {
                    await fetchIncomes();
                    await fetchIncomeCategories();
                  }}
                />
              </div>

              <button
                type="button"
                aria-label={`Delete income ${income.note}`}
                onClick={() => openDeleteModal(income.id, income.note)}
                className="text-red-600 transition-colors hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    [categories],
  );

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📈 Income
          </h1>
        </div>

        <div className="hidden sm:block">
          <IncomeFormModal
            mode="create"
            categories={categories}
            onSuccess={async () => {
              await fetchIncomes();
              await fetchIncomeCategories();
            }}
          />
        </div>
      </div>

      <IncomeFilters
        year={year}
        month={month}
        specificDate={specificDate}
        searchTerm={searchTerm}
        categoryFilter={categoryFilter}
        categories={incomeCategories}
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
        columns={incomeColumns}
        data={filteredIncomes}
        isLoading={loading}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        item="Income"
        name={deleteModal.name}
        isOpen={deleteModal.isOpen}
        onOpenChange={(open) => !open && closeDeleteModal()}
        onConfirm={handleDelete}
      />
    </div>
  );
}
