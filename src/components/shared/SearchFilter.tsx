"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition, useRef } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "@/hooks/useDebounce";

interface SearchFilterProps {
  placeholder?: string;
  paramName?: string;
}

const SearchFilter = ({
  placeholder = "Search...",
  paramName = "searchTerm",
}: SearchFilterProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const queryValue = searchParams.get(paramName) || "";

  const [value, setValue] = useState(queryValue);
  const debouncedValue = useDebounce(value, 500);

  const isClearingRef = useRef(false);

  // ✅ URL change হলে input sync
  useEffect(() => {
    // Clear button click detect
    if (!queryValue) {
      isClearingRef.current = true;
      setValue("");
      return;
    }

    setValue(queryValue);
  }, [queryValue]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValue = searchParams.get(paramName) || "";

    // ✅ clear এর পরে old debounce ignore
    if (isClearingRef.current) {
      isClearingRef.current = false;
      return;
    }

    if (debouncedValue === currentValue) return;

    if (debouncedValue.trim()) {
      params.set(paramName, debouncedValue.trim());
      params.set("page", "1");
    } else {
      params.delete(paramName);
      params.delete("page");
    }

    startTransition(() => {
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    });
  }, [debouncedValue, paramName, router, searchParams]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

      <Input
        placeholder={placeholder}
        className="pl-10"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default SearchFilter;
