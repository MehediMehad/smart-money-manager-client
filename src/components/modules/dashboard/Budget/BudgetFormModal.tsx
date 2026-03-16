"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Pencil } from "lucide-react";
import { toast } from "sonner";
// import { createBudget, updateBudget } from "@/services/Budget"; // ← your services

type Props = {
  mode: "create" | "edit";
  budget?: any; // TBudget
  isIcon?: boolean;
  onSuccess?: () => void;
};

export default function BudgetFormModal({
  mode,
  budget,
  isIcon,
  onSuccess,
}: Props) {
  const [open, setOpen] = useState(false);
  const isEdit = mode === "edit";

  const [form, setForm] = useState({
    categoryId: isEdit ? budget?.categoryId : "",
    amount: isEdit ? budget?.amount : "",
    type: isEdit ? budget?.type : "DAILY",
    // date / month-year logic can be added here
  });

  const handleSubmit = async () => {
    if (!form.categoryId) {
      toast.error("Please select a category");
      return;
    }
    if (!form.amount || Number(form.amount) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    try {
      if (isEdit) {
        // await updateBudget(budget.id, form);
        toast.success("Budget updated");
      } else {
        // await createBudget(form);
        toast.success("Budget created");
      }
      setOpen(false);
      onSuccess?.();
    } catch (err: any) {
      toast.error(
        err.message || `Failed to ${isEdit ? "update" : "create"} budget`,
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isIcon ? (
          <Button
            size="icon"
            className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            <Plus className="h-7 w-7" />
          </Button>
        ) : isEdit ? (
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:text-primary/80"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        ) : (
          <Button className="gap-1.5 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
            <Plus className="h-4 w-4" />
            Add Budget
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[90%] max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Budget" : "Create New Budget"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Category</Label>
            <Select
              value={form.categoryId}
              onValueChange={(v) => setForm({ ...form, categoryId: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {/* Populate from your categories – you can pass categories as prop or fetch */}
                <SelectItem value="cat-food">Food</SelectItem>
                <SelectItem value="cat-travel">Travel</SelectItem>
                {/* ... */}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Type</Label>
            <Select
              value={form.type}
              onValueChange={(v) => setForm({ ...form, type: v })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Amount (BDT)</Label>
            <Input
              type="number"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              placeholder="e.g. 1500"
            />
          </div>

          {/* Optional: Date / Month picker depending on type */}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-3">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            {isEdit ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
