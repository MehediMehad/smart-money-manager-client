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
import { Filter } from "lucide-react";
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
  const hasActiveFilters =
    !!specificDate || !!searchTerm || categoryFilter !== ALL_CATEGORIES;

  console.log("categories", categories);

  return (
    <div className="bg-card border rounded-xl p-4 space-y-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-medium text-base">Filter & Search</h3>
        {isPending && (
          <span className="text-xs text-muted-foreground animate-pulse">
            Updating...
          </span>
        )}
      </div>

      <div className="flex flex-wrap gap-x-6 gap-y-4 items-end">
        <div className="space-y-1.5">
          <Label className="text-sm">Year</Label>
          <Select value={year} onValueChange={onYearChange}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm">Month</Label>
          <Select value={month} onValueChange={onMonthChange}>
            <SelectTrigger className="w-[180px] h-9">
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

        <div className="space-y-1.5 min-w-[180px]">
          <Label className="text-sm">Specific Day</Label>
          <Input
            type="number"
            min="1"
            max="31"
            placeholder="Day (1-31)"
            value={specificDate}
            onChange={(e) => onDateChange(e.target.value)}
          />
        </div>

        <div className="space-y-1.5 min-w-[240px]">
          <Label className="text-sm">Search</Label>
          <Input
            placeholder="Search note..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label className="text-sm">Category</Label>
          <div className="flex items-center gap-2 border rounded-md px-4 py-2 w-fit">
            <Filter className="h-4 w-4" />
            <Select value={categoryFilter} onValueChange={onCategoryChange}>
              <SelectTrigger className="border-0 shadow-none p-0 h-auto w-44">
                <SelectValue />
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

        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset}>
            Clear all
          </Button>
        )}
      </div>
    </div>
  );
}
