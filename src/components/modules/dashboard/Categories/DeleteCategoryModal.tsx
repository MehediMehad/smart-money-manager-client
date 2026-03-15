"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { deleteCategory } from "@/services/Category";
import { Trash2 } from "lucide-react";
import { TCategory } from "@/types";

interface DeleteCategoryModalProps {
  category: TCategory;
}

export default function DeleteCategoryModal({
  category,
  //   trigger,
  //   onSuccess,
}: DeleteCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);

    try {
      await deleteCategory(category.id);
      toast.success("Category deleted successfully");
      setOpen(false);
      //   onSuccess?.();
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    } finally {
      setDeleting(false);
    }
  };

  const DeleteTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:bg-red-500/10 hover:text-red-600"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{DeleteTrigger}</DialogTrigger>

      <DialogContent className="w-[90%] max-w-sm sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Delete Category
          </DialogTitle>
          <DialogDescription className="pt-1">
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="pb-4 space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-background border text-xl shadow-sm">
              {category.emoji || "📁"}
            </div>
            <div>
              <p className="font-medium">{category.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {category.type === "INCOME" ? "Income" : "Expense"} category
              </p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete{" "}
            <span className="font-medium text-foreground">
              “{category.name}”
            </span>
            ?
          </p>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={deleting}
            className="sm:w-auto"
          >
            Cancel
          </Button>

          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={deleting}
            className="gap-2 shadow-md"
          >
            {deleting ? (
              <>Deleting...</>
            ) : (
              <>
                <Trash2 className="h-4 w-4" />
                Delete
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
