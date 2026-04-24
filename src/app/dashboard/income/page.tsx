// src/app/dashboard/income/page.tsx
"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Filter, Trash2, X } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NMTable } from "@/components/shared/core/NMTable";

type TCategory = {
  id: string;
  name: string;
  emoji: string;
  type: "EXPENSE" | "INCOME";
};

type TIncome = {
  id: string;
  note: string;
  amount: number;
  date: string;
  category: TCategory;
};

const ALL_CATEGORIES = "all";

const fakeCategories: TCategory[] = [
  { id: "1", name: "Salary", emoji: "💼", type: "INCOME" },
  { id: "2", name: "Freelance", emoji: "🧑‍💻", type: "INCOME" },
  { id: "3", name: "Business", emoji: "🏪", type: "INCOME" },
  { id: "4", name: "Bonus", emoji: "🎁", type: "INCOME" },
];

const fakeIncomes: TIncome[] = [
  {
    id: "1",
    note: "Monthly salary",
    amount: 45000,
    date: "2026-04-01",
    category: fakeCategories[0],
  },
  {
    id: "2",
    note: "Website project payment",
    amount: 18000,
    date: "2026-04-08",
    category: fakeCategories[1],
  },
  {
    id: "3",
    note: "Shop profit",
    amount: 12000,
    date: "2026-04-15",
    category: fakeCategories[2],
  },
  {
    id: "4",
    note: "Performance bonus",
    amount: 7000,
    date: "2026-04-20",
    category: fakeCategories[3],
  },
];

export default function Page() {
  const now = new Date();

  const [year, setYear] = useState(String(now.getFullYear()));
  const [month, setMonth] = useState(
    String(now.getMonth() + 1).padStart(2, "0"),
  );
  const [specificDate, setSpecificDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState(ALL_CATEGORIES);
  const [incomes, setIncomes] = useState<TIncome[]>(fakeIncomes);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  const filteredIncomes = useMemo(() => {
    return incomes.filter((income) => {
      const incomeDate = new Date(income.date);

      const matchYear = String(incomeDate.getFullYear()) === year;
      const matchMonth =
        String(incomeDate.getMonth() + 1).padStart(2, "0") === month;

      const matchDay = specificDate
        ? incomeDate.getDate() === Number(specificDate)
        : true;

      const matchSearch = searchTerm
        ? income.note.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchCategory =
        categoryFilter === ALL_CATEGORIES
          ? true
          : income.category.id === categoryFilter;

      return (
        matchYear && matchMonth && matchDay && matchSearch && matchCategory
      );
    });
  }, [incomes, year, month, specificDate, searchTerm, categoryFilter]);

  const hasActiveFilters =
    !!specificDate || !!searchTerm || categoryFilter !== ALL_CATEGORIES;

  const handleReset = () => {
    setSpecificDate("");
    setSearchTerm("");
    setCategoryFilter(ALL_CATEGORIES);
  };

  const handleDelete = (id: string) => {
    setIncomes((prev) => prev.filter((income) => income.id !== id));
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
            <span>{row.original.category.emoji}</span>
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
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="text-blue-600 transition-colors hover:text-blue-700"
            >
              <Edit size={18} />
            </button>

            <button
              type="button"
              onClick={() => handleDelete(row.original.id)}
              className="text-red-600 transition-colors hover:text-red-700"
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <div className="space-y-6 pb-24 md:pb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            📈 Income
          </h1>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 text-emerald-600 rounded-xl">
              <Filter className="h-5 w-5" />
            </div>
            <h3 className="font-semibold text-lg text-gray-800">
              Filters & Search
            </h3>
          </div>

          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <X className="h-4 w-4" />
              Clear All Filters
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Month</Label>
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                  const value = String(m).padStart(2, "0");
                  return (
                    <SelectItem key={value} value={value}>
                      {new Date(2000, m - 1).toLocaleString("en-US", {
                        month: "long",
                      })}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Specific Day
            </Label>
            <Input
              type="number"
              min="1"
              max="31"
              placeholder="Enter day (1-31)"
              value={specificDate}
              onChange={(e) => setSpecificDate(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Search Note
            </Label>
            <Input
              placeholder="Search by note..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-11"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">
              Category
            </Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="h-11">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CATEGORIES}>All Categories</SelectItem>
                {fakeCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <NMTable
        columns={incomeColumns}
        data={filteredIncomes}
        isLoading={false}
      />
    </div>
  );
}
