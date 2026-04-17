"use client";

import { useMemo, useState, useCallback } from "react";
import { ColumnDef } from "@tanstack/react-table";
import dynamic from "next/dynamic";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

import { deleteIncome } from "@/services/Income";
import { TCategory, TDashboardSummary, TIncomeRow } from "@/types";

import StatCard from "./StatCard";
import FinancialInsight from "./FinancialInsight";
import SourceSummary from "./SourceSummary";
import IncomeFormModal from "./IncomeFormModal";
import { NMTable } from "@/components/shared/core/NMTable";

const DeleteConfirmationModal = dynamic(
  () => import("@/components/shared/core/NMModal/DeleteConfirmationModal"),
  { ssr: false },
);

type Props = {
  summary: TDashboardSummary;
  categories: TCategory[];
  onRefresh?: () => Promise<void> | void;
};

export default function IncomePage({ summary, categories, onRefresh }: Props) {
  const [sourceFilter, setSourceFilter] = useState("all");
  const [searchNote, setSearchNote] = useState("");

  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    id: "",
    name: "",
  });

  const {
    totalThisMonth,
    todayIncome,
    avgDaily,
    mainSource,
    sourceSummary,
    incomes,
  } = summary;

  const filteredIncomes = useMemo(() => {
    return incomes.filter((item) => {
      const matchSource =
        sourceFilter === "all" || item.source === sourceFilter;
      const matchNote =
        !searchNote ||
        item.note.toLowerCase().includes(searchNote.toLowerCase());

      return matchSource && matchNote;
    });
  }, [incomes, sourceFilter, searchNote]);

  const openDeleteModal = (id: string, name: string) => {
    setDeleteModal({
      isOpen: true,
      id,
      name,
    });
  };

  const closeDeleteModal = () => {
    setDeleteModal({
      isOpen: false,
      id: "",
      name: "",
    });
  };

  const handleDelete = useCallback(async () => {
    if (!deleteModal.id) return;

    const res = await deleteIncome(deleteModal.id);

    if (res.success) {
      toast.success(res.message || "Income deleted successfully");
      await onRefresh?.();
    } else {
      toast.error(res.message || "Failed to delete income");
    }

    closeDeleteModal();
  }, [deleteModal.id, onRefresh]);

  const incomeColumns = useMemo<ColumnDef<TIncomeRow>[]>(
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
        accessorKey: "source",
        header: "Source",
      },
      {
        accessorKey: "note",
        header: "Note",
        cell: ({ row }) => (
          <span className="line-clamp-1">{row.original.note || "—"}</span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-semibold text-emerald-600">
            ৳{row.original.amount.toLocaleString()}
          </span>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const income = row.original;
          const matchedCategory = categories.find(
            (cat) => cat.name === income.source && cat.type === "INCOME",
          );

          return (
            <div className="flex items-center gap-2">
              <IncomeFormModal
                mode="edit"
                income={{
                  ...income,
                  category: matchedCategory
                    ? {
                        id: matchedCategory.id,
                        name: matchedCategory.name,
                        emoji: matchedCategory.emoji,
                      }
                    : undefined,
                  categoryId: matchedCategory?.id,
                }}
                categories={categories}
                onSuccess={onRefresh}
              />

              <button
                type="button"
                aria-label={`Delete income ${income.note}`}
                onClick={() =>
                  openDeleteModal(income.id, income.note || "income")
                }
                className="text-red-600 transition-colors hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          );
        },
      },
    ],
    [categories, onRefresh],
  );

  return (
    <div className="min-h-screen pb-24 md:pb-12 space-y-6">
      {/* Filters + Add Button */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm py-3 md:static md:py-0">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3 items-center">
            <div className="inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 bg-muted/40">
              <Filter className="h-4 w-4" />
              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="border-0 bg-transparent shadow-none h-7 min-w-[140px] p-0">
                  <SelectValue placeholder="Source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sources</SelectItem>
                  {sourceSummary.map((s) => (
                    <SelectItem key={s.name} value={s.name}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Input
              placeholder="Search by note..."
              className="max-w-[240px] h-10"
              value={searchNote}
              onChange={(e) => setSearchNote(e.target.value)}
            />
          </div>

          <IncomeFormModal
            mode="create"
            categories={categories}
            onSuccess={onRefresh}
          />
        </div>
      </div>

      {/* 1. Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Income This Month"
          value={totalThisMonth}
          subtitle="March 2026"
          variant="emerald"
        />
        <StatCard
          title="Today's Income"
          value={todayIncome}
          subtitle={new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
          variant="blue"
        />
        <StatCard
          title="Average Daily Income"
          value={avgDaily}
          subtitle="This Month"
          variant="emerald"
        />
        <StatCard
          title="Main Source"
          value={mainSource.value}
          subtitle={mainSource.name}
          variant="purple"
        />
      </div>

      {/* 2. Charts */}
      {/* <Charts sourceSummary={sourceSummary} monthlyTrend={monthlyTrend} /> */}

      {/* Income History Table */}
      <NMTable
        columns={incomeColumns}
        data={filteredIncomes}
        isLoading={false}
      />

      {/* Financial Insight Section */}
      <FinancialInsight
        totalThisMonth={totalThisMonth}
        mainSource={mainSource}
      />

      {/* Source Summary */}
      <SourceSummary
        sourceSummary={sourceSummary}
        totalThisMonth={totalThisMonth}
      />

      {/* Delete Modal */}
      <DeleteConfirmationModal
        item="Income"
        name={deleteModal.name}
        isOpen={deleteModal.isOpen}
        onOpenChange={(open) => !open && closeDeleteModal()}
        onConfirm={handleDelete}
      />

      {/* Mobile floating add button */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <IncomeFormModal
          mode="create"
          categories={categories}
          onSuccess={onRefresh}
          isIcon
        />
      </div>
    </div>
  );
}
