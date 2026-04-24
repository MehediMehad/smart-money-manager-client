"use client";

import { deleteIncome } from "@/services/Income";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import IncomeFormDialog from "./IncomeFormDialog";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { TIncome } from "@/types";
import { incomeColumns } from "./incomeColumns";

const IncomesTable = ({ incomes }: { incomes: TIncome[] }) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const [deleting, setDeleting] = useState<any>(null);
  const [editing, setEditing] = useState<any>(null);

  const handleRefresh = () => {
    startTransition(() => router.refresh());
  };

  const confirmDelete = async () => {
    if (!deleting) return;

    const result = await deleteIncome(deleting.id);

    if (result.success) {
      toast.success(result.message);
      setDeleting(null);
      handleRefresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <ManagementTable
        data={incomes}
        columns={incomeColumns}
        onEdit={(item) => setEditing(item)}
        onDelete={(item) => setDeleting(item)}
        getRowKey={(item) => item.id}
        emptyMessage="No income found"
      />

      {/* Edit */}
      {/* <IncomeFormDialog
        mode="edit"
        income={editing}
        open={!!editing}
        onSuccess={() => {
          setEditing(null);
          handleRefresh();
        }}
        onClose={() => setEditing(null)}
        categories={[]}
      /> */}

      {/* Delete */}
      <DeleteConfirmationDialog
        open={!!deleting}
        onOpenChange={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete Income"
        description={`Delete ${deleting?.note}?`}
      />
    </>
  );
};

export default IncomesTable;
