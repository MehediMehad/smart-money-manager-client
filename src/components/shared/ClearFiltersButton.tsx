"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

interface ClearFiltersButtonProps {
  preserveParams?: string[];
  excludeFromCount?: string[];
  onBeforeClear?: () => boolean | void;
  onAfterClear?: () => void;
  variant?: "ghost" | "outline" | "destructive" | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  label?: string;
  showCount?: boolean;
}

const ClearFiltersButton = ({
  preserveParams = [],
  excludeFromCount = ["year", "month", "page", "limit", "sortBy", "sortOrder"],
  onBeforeClear,
  onAfterClear,
  variant = "ghost",
  size = "default",
  className = "h-10 px-3",
  label = "Clear",
  showCount = true,
}: ClearFiltersButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const activeFiltersCount = Array.from(searchParams.keys()).filter(
    (key) => !excludeFromCount.includes(key),
  ).length;

  const handleClear = () => {
    if (onBeforeClear) {
      const shouldProceed = onBeforeClear();

      if (shouldProceed === false) return;
    }

    const params = new URLSearchParams();

    preserveParams.forEach((param) => {
      const value = searchParams.get(param);

      if (value) {
        params.set(param, value);
      }
    });

    startTransition(() => {
      const queryString = params.toString();

      router.replace(
        queryString ? `?${queryString}` : window.location.pathname,
        {
          scroll: false,
        },
      );
    });

    onAfterClear?.();
  };

  if (activeFiltersCount === 0) {
    return null;
  }

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClear}
      disabled={isPending}
      className={className}
    >
      <X className="mr-1 h-4 w-4" />
      {label}
      {showCount && ` (${activeFiltersCount})`}
    </Button>
  );
};

export default ClearFiltersButton;
