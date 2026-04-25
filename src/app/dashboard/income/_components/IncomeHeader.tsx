"use client";
import { TCategory } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import IncomeFormDialog from "./IncomeFormDialog";
import { Button } from "@/components/ui/button";

type Props = {
  categories: TCategory[];
};

const IncomeHeader = ({ categories }: Props = { categories: [] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  //force remount to reset state of form
  const [dialogKey, setDialogKey] = useState(0);

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1); // Force remount
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📈 Income
        </h1>
      </div>

      <Button
        onClick={handleOpenDialog}
        className="gap-2 py-5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700"
      >
        Add Income
      </Button>

      <IncomeFormDialog
        key={dialogKey}
        open={isDialogOpen}
        categories={categories || []}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />
    </div>
  );
};

export default IncomeHeader;
