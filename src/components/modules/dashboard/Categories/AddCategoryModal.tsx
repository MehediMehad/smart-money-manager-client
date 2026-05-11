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
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface AddCategoryModalProps {
  onSuccess?: () => void; // optional callback to refresh list
  isIcon?: boolean; // Mobile FAB
}

export default function AddCategoryModal({
  onSuccess,
  isIcon,
}: AddCategoryModalProps) {
  const [open, setOpen] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
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
    if (!formData.emoji) {
      toast.error("Emoji is required");
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

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setFormData({ ...formData, emoji: emojiData.emoji });
    setShowPicker(false); // picker auto close
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
            size="lg"
            className="hidden sm:flex items-center gap-2 py-5 bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="w-[85%] top-[40%] mx-auto sm:max-w-sm md:max-w-lg rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4 relative">
          {/* Name */}
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

          {/* Type */}
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

          {/* Emoji Picker */}
          <div className="grid gap-2 relative">
            <Label>Emoji</Label>
            <Input
              value={formData.emoji}
              placeholder="Select an emoji"
              readOnly
              className="text-center cursor-pointer"
              onClick={() => setShowPicker((prev) => !prev)}
            />
            {showPicker && (
              <div className="absolute z-50 mt-2">
                <EmojiPicker
                  onEmojiClick={onEmojiClick}
                  searchDisabled={false}
                  skinTonesDisabled={false}
                  autoFocusSearch={false}
                />
              </div>
            )}
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
