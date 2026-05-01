"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";

import { debtColumns } from "./debtColumns";
import { TDebt } from "@/types/debts";
import { deleteDebt } from "@/services/Debts";
import DebtFormDialog from "./DebtFormDialog";
import DebtViewDialog from "./DebtViewDialog";

const DebtsTable = ({ debts = [] }: { debts: TDebt[] }) => {
  const router = useRouter();

  const [viewing, setViewing] = useState<TDebt | null>(null);
  const [deleting, setDeleting] = useState<TDebt | null>(null);
  const [editing, setEditing] = useState<TDebt | null>(null);

  const handleEdit = (item: TDebt) => {
    setEditing(item);
  };

  const confirmDelete = async () => {
    if (!deleting) return;

    const result = await deleteDebt(deleting.id);

    if (result.success) {
      toast.success(result.message);
      setDeleting(null);
      router.refresh();
    } else {
      toast.error(result.message);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <ManagementTable
          data={debts}
          columns={debtColumns}
          onView={(item) => setViewing(item)}
          onEdit={handleEdit}
          onDelete={(item) => setDeleting(item)}
          getRowKey={(item) => item.id}
          emptyMessage="No debt found"
        />
      </div>

      <DebtViewDialog debt={viewing} onClose={() => setViewing(null)} />

      {/* Edit */}
      <DebtFormDialog
        key={editing?.id || "edit-debt"}
        open={!!editing}
        debt={editing || undefined}
        onClose={() => setEditing(null)}
        onSuccess={() => {
          setEditing(null);
          router.refresh();
        }}
      />

      {/* Delete */}
      <DeleteConfirmationDialog
        open={!!deleting}
        onOpenChange={() => setDeleting(null)}
        onConfirm={confirmDelete}
        title="Delete Debt"
        description={`Are you sure you want to delete debt record for ${deleting?.person}?`}
      />
    </>
  );
};

export default DebtsTable;
