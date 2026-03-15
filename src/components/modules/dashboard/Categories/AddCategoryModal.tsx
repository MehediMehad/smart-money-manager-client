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
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { createCategory } from "@/services/Category";

interface AddCategoryModalProps {
  onSuccess?: () => void; // optional callback to refresh list
  isIcon?: boolean; // Mobile FAB জন্য
}

export default function AddCategoryModal({
  onSuccess,
  isIcon,
}: AddCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "EXPENSE" as "INCOME" | "EXPENSE",
    emoji: "",
  });

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await createCategory(formData);
      if (res.success) {
        toast.success("Category created successfully");
        setFormData({ name: "", type: "EXPENSE", emoji: "💸" });
        setOpen(false);
        onSuccess?.();
      } else {
        toast.error(res.message || "Failed to create category");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
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
        ) : (
          <Button
            size="sm"
            className="gap-1.5 hidden sm:flex shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transition-all duration-200 ease-in-out py-2 px-4 rounded-lg"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[85%] mx-auto sm:max-w-sm md:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Name</Label>
            <Input
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="e.g. Food"
            />
          </div>

          <div className="grid gap-2">
            <Label>Type</Label>
            <Select
              value={formData.type}
              onValueChange={(v) =>
                setFormData({
                  ...formData,
                  type: v as "INCOME" | "EXPENSE",
                })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="INCOME">Income</SelectItem>
                <SelectItem value="EXPENSE">Expense</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Emoji</Label>
            <Input
              value={formData.emoji}
              onChange={(e) =>
                setFormData({ ...formData, emoji: e.target.value })
              }
              placeholder="e.g. 🍔"
              maxLength={2}
              className="text-center"
            />
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            size="lg"
            onClick={() => setOpen(false)}
            className="hidden sm:block shadow-md border border-gray-300 bg-white text-gray-700 hover:bg-gray-100 transition-all duration-200 ease-in-out"
          >
            Cancel
          </Button>
          <Button
            size="lg"
            onClick={handleSubmit}
            className="shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white transition-all duration-200 ease-in-out"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
