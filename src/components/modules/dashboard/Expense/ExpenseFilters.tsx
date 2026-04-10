// @/components/modules/dashboard/Expense/ExpenseFilters.tsx
"use client";

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
import { Filter, X } from "lucide-react";
import { TCategory } from "@/types";

interface Props {
  year: string;
  month: string;
  specificDate: string;
  searchTerm: string;
  categoryFilter: string;
  categories: TCategory[];
  isPending: boolean;
  onYearChange: (value: string) => void;
  onMonthChange: (value: string) => void;
  onDateChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onReset: () => void;
}

const ALL_CATEGORIES = "all";

export default function ExpenseFilters({
  year,
  month,
  specificDate,
  searchTerm,
  categoryFilter,
  categories,
  isPending,
  onYearChange,
  onMonthChange,
  onDateChange,
  onSearchChange,
  onCategoryChange,
  onReset,
}: Props) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => String(currentYear - i));

  const hasActiveFilters =
    !!specificDate || !!searchTerm || categoryFilter !== ALL_CATEGORIES;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-xl">
            <Filter className="h-5 w-5" />
          </div>
          <h3 className="font-semibold text-lg text-gray-800">
            Filters & Search
          </h3>
          {isPending && (
            <span className="text-xs text-muted-foreground flex items-center gap-1.5 animate-pulse">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
              Updating...
            </span>
          )}
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <div className="flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={onReset}
              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
            >
              <X className="h-4 w-4" />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {/* Year */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Year</Label>
          <Select
            value={year}
            onValueChange={onYearChange}
            disabled={isPending}
          >
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

        {/* Month */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Month</Label>
          <Select value={month} onValueChange={onMonthChange}>
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
                const value = m.toString().padStart(2, "0");
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

        {/* Specific Day */}
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
            onChange={(e) => onDateChange(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Search */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">
            Search Note
          </Label>
          <Input
            placeholder="Search by note..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11"
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-gray-700">Category</Label>
          <Select value={categoryFilter} onValueChange={onCategoryChange}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_CATEGORIES}>All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.emoji} {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
