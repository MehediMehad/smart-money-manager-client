"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import DebtFormDialog from "./DebtFormDialog";
// import DebtFormDialog from "./DebtFormDialog";

const DebtHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogKey, setDialogKey] = useState(0);

  const handleSuccess = () => {
    setIsDialogOpen(false);

    startTransition(() => {
      router.refresh();
    });
  };

  const handleOpenDialog = () => {
    setDialogKey((prev) => prev + 1);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Debts</h1>
          <p className="mt-1 text-sm text-slate-500">
            Track who owes you money and what you need to pay back.
          </p>
        </div>

        <Button
          onClick={handleOpenDialog}
          className="hidden sm:flex items-center gap-2 py-5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700"
        >
          <Plus className="h-4 w-4" />
          Add Debt
        </Button>
      </div>

      <DebtFormDialog
        key={dialogKey}
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
      />

      {/* Mobile Add Button */}
      <Button
        onClick={handleOpenDialog}
        className="sm:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 flex items-center justify-center"
      >
        <Plus className="h-6 w-6" />
      </Button>
    </>
  );
};

export default DebtHeader;
