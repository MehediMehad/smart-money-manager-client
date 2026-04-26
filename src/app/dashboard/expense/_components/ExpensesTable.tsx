"use client";

import { useState } from "react";
import { toast } from "sonner";
import DeleteConfirmationDialog from "@/components/shared/DeleteConfirmationDialog";
import ManagementTable from "@/components/shared/ManagementTable";
import { expenseColumns } from "./expenseColumns";
import ExpenseFormDialog from "./ExpenseFormDialog";
import { deleteExpense } from "../_actions";
import { TExpense } from "../_lib/types";
import { TCategory } from "@/types";
import ExpenseViewDialog from "./ExpenseViewDialog";

const ExpensesTable = ({
  expenses = [],
  categories,
}: {
  expenses: TExpense[];
  categories: TCategory[];
}) => {
  const [viewing, setViewing] = useState<TExpense | null>(null);
  const [deleting, setDeleting] = useState<any>(null);
  const [editing, setEditing] = useState<TExpense | null>(null);

  const handleEdit = (item: TExpense) => {
    setEditing(item);
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    const result = await deleteExpense(deleting.id);
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
          data={expenses}
          columns={expenseColumns}
          onView={(item) => setViewing(item)}
          onEdit={handleEdit}
          onDelete={(item) => setDeleting(item)}
          getRowKey={(item) => item.id}
          emptyMessage="No expense found"
        />
      </div>

      <ExpenseViewDialog expense={viewing} onClose={() => setViewing(null)} />

      {/* Edit */}
      <ExpenseFormDialog
        key={editing?.id || "edit-expense"}
        open={!!editing}
        expense={editing || undefined}
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
        title="Delete Expense"
        description={`Are you sure you want to delete  ${deleting?.note}?`}
      />
    </>
  );
};

export default ExpensesTable;
