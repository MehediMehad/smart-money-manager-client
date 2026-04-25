"use client";

import { Filter } from "lucide-react";
import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import SearchFilter from "@/components/shared/SearchFilter";
import { TCategory } from "@/types";
import SelectFilter from "@/components/shared/SelectFilter";

type Props = {
  categories: TCategory[];
};

const IncomesFilter = ({ categories }: Props = { categories: [] }) => {
  console.log("categories", categories);

  const currentDate = new Date();

  const currentYear = currentDate.getFullYear();
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - i;

    return {
      label: String(year),
      value: String(year),
    };
  });

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(2000, i).toLocaleString("en-US", {
      month: "long",
    }),
    value: String(i + 1).padStart(2, "0"),
  }));

  const categoryOptions = categories.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  console.log("categoryOptions", categoryOptions, categories);

  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-100 text-green-600">
          <Filter size={20} />
        </div>

        <h2 className="text-xl font-semibold text-slate-900">
          Filters & Search
        </h2>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Year</label>
          <SelectFilter
            paramName="year"
            placeholder="Year"
            defaultValue={String(currentYear)}
            options={yearOptions}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Month</label>
          <SelectFilter
            paramName="month"
            placeholder="Month"
            defaultValue={currentMonth}
            options={monthOptions}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Specific Day
          </label>
          <SearchFilter paramName="date_range" placeholder="Enter day (1-31)" />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Search Note
          </label>
          <SearchFilter
            paramName="searchTerm"
            placeholder="Search by note..."
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Category
          </label>
          <SelectFilter
            paramName="categoryId"
            placeholder="All Categories"
            defaultValue="all"
            options={[
              { label: "All Categories", value: "all" },
              ...categories.map((category) => ({
                label: category.name,
                value: category.id,
              })),
            ]}
          />
        </div>
      </div>

      <div className="mt-5">
        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default IncomesFilter;
