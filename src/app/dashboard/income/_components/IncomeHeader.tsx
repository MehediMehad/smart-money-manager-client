"use client";
import { TCategory } from "@/types";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import IncomeFormDialog from "./IncomeFormDialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        className="hidden sm:flex items-center gap-2 py-5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700"
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

      {/* Mobile Add Button */}
      {/* Mobile Add Button */}
      <Button
        onClick={handleOpenDialog}
        className="sm:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default IncomeHeader;
