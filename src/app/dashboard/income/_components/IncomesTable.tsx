"use client";

import { deleteIncome, updateIncome } from "@/services/Income";
import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { TCategory, TIncome } from "@/types";
import { incomeColumns } from "./incomeColumns";
import IncomeFormDialog from "./IncomeFormDialog";

const IncomesTable = ({
  incomes = [],
  categories,
}: {
  incomes: TIncome[];
  categories: TCategory[];
}) => {
  const [deleting, setDeleting] = useState<any>(null);
  const [editing, setEditing] = useState<TIncome | null>(null);

  const handleEdit = (item: TIncome) => {
    setEditing(item);
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const result = await deleteIncome(deleting.id);
    if (result.success) {
      toast.success(result.message);
      setDeleting(null);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={incomes}
        columns={incomeColumns}
        onEdit={handleEdit}
        onDelete={(item) => setDeleting(item)}
        getRowKey={(item) => item.id}
        emptyMessage="No income found"
      />

      {/* Edit */}
      <IncomeFormDialog
        key={editing?.id || "edit-income"}
        open={!!editing}
        income={editing || undefined}
        categories={categories || []}
        onClose={() => setEditing(null)}
        onSuccess={() => {
          setEditing(null);
        }}
      />

      {/* Delete */}
      <DeleteConfirmationDialog
        open={!!deleting}
        onOpenChange={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete Income"
        description={`Are you sure you want to delete  ${deleting?.note}?`}
      />
    </>
  );
};

export default IncomesTable;
