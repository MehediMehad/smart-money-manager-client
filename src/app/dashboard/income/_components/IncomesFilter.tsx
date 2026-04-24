"use client";

import ClearFiltersButton from "@/components/shared/ClearFiltersButton";
import SearchFilter from "@/components/shared/SearchFilter";
import SelectFilter from "@/components/shared/SelectFilter";
import { TCategory } from "@/types";

type Props = {
  categories: TCategory[];
};

const IncomesFilter = ({ categories }: Props = { categories: [] }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <SearchFilter paramName="searchTerm" placeholder="Search note..." />
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <SelectFilter
          paramName="month"
          placeholder="Month"
          options={Array.from({ length: 12 }, (_, i) => ({
            label: new Date(2000, i).toLocaleString("en-US", {
              month: "long",
            }),
            value: String(i + 1).padStart(2, "0"),
          }))}
        />

        <SelectFilter
          paramName="year"
          placeholder="Year"
          options={Array.from({ length: 5 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return { label: String(year), value: String(year) };
          })}
        />

        <SearchFilter paramName="date_range" placeholder="1-31" />

        <ClearFiltersButton />
      </div>
    </div>
  );
};

export default IncomesFilter;
