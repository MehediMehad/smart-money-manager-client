"use client";

import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { incomeColumns } from "./incomeColumns";
import IncomeFormDialog from "./IncomeFormDialog";
import IncomeViewDialog from "./IncomeViewDialog";
import { deleteIncome } from "../_actions";
import { TIncome } from "../_lib/types";
import { TCategory } from "@/types";

const IncomesTable = ({
  incomes = [],
  categories,
}: {
  incomes: TIncome[];
  categories: TCategory[];
}) => {
  const [viewing, setViewing] = useState<TIncome | null>(null);
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
      <div className="overflow-x-auto">
        <ManagementTable
          data={incomes}
          columns={incomeColumns}
          onView={(item) => setViewing(item)}
          onEdit={handleEdit}
          onDelete={(item) => setDeleting(item)}
          getRowKey={(item) => item.id}
          emptyMessage="No income found"
        />
      </div>

      <IncomeViewDialog income={viewing} onClose={() => setViewing(null)} />

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
