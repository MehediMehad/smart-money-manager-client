"use client";

import { useState, useEffect } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/services/Category";
import { TCategory } from "@/types";
import CategoryCard from "./CategoryCard";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<TCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [openAdd, setOpenAdd] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "EXPENSE" as "INCOME" | "EXPENSE",
    emoji: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getCategories();
        setCategories(data);
      } catch (err: any) {
        toast.error("Failed to load categories");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const res = await createCategory(formData);
      if (res.success) {
        toast.success("Category created successfully");
        setCategories((prev) => [...prev, res.data]);
        setFormData({ name: "", type: "EXPENSE", emoji: "💸" });
        setOpenAdd(false);
      } else {
        toast.error(res.message || "Failed to create category");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const originalCategories = [...categories];
    setCategories((prev) => prev.filter((c) => c.id !== id)); // optimistic update

    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
      setCategories(originalCategories); // rollback on error
    }
  };

  const incomeCats = categories.filter((c) => c.type === "INCOME");
  const expenseCats = categories.filter((c) => c.type === "EXPENSE");

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1 hidden sm:block ">
            Manage income and expense categories
          </p>
        </div>

        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="gap-1.5 hidden sm:flex
             shadow-2xl
             bg-gradient-to-r from-emerald-600 to-teal-600
             hover:from-emerald-700 hover:to-teal-700
             text-white
             transition-all duration-200 ease-in-out py-5 px-4 rounded-lg"
            >
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="w-[85%] mx-auto sm:max-w-sm md:max-w-md rounded-2xl">
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
                  className="text-center "
                />
              </div>
            </div>
            <DialogFooter className="flex flex-col sm:flex-row gap-2">
              {/* Cancel Button */}
              <Button
                variant="outline"
                size="lg"
                onClick={() => setOpenAdd(false)}
                className="hidden sm:block shadow-md border border-gray-300
               bg-white text-gray-700
               hover:bg-gray-100
               transition-all duration-200 ease-in-out"
              >
                Cancel
              </Button>

              {/* Save Button */}
              <Button
                size="lg"
                onClick={handleSubmit}
                className="shadow-2xl
               bg-gradient-to-r from-emerald-600 to-teal-600
               hover:from-emerald-700 hover:to-teal-700
               text-white
               transition-all duration-200 ease-in-out"
              >
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="EXPENSE" className="space-y-5 !mt-3 !sm:mt-6 ">
        <TabsList className="grid w-full sm:max-w-xs mx-auto sm:mx-0 sm:inline-grid grid-cols-2">
          <TabsTrigger
            value="EXPENSE"
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-full
               data-[state=active]:shadow-2xl
               data-[state=active]:bg-gradient-to-r
               data-[state=active]:from-emerald-600
               data-[state=active]:to-teal-600
               data-[state=active]:text-white
               hover:data-[state=active]:from-emerald-700
               hover:data-[state=active]:to-teal-700
               transition-all duration-200 ease-in-out"
          >
            <ArrowDownCircle className="h-4 w-4" />
            Expense
          </TabsTrigger>

          <TabsTrigger
            value="INCOME"
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-full
               data-[state=active]:shadow-2xl
               data-[state=active]:bg-gradient-to-r
               data-[state=active]:from-emerald-600
               data-[state=active]:to-teal-600
               data-[state=active]:text-white
               hover:data-[state=active]:from-emerald-700
               hover:data-[state=active]:to-teal-700
               transition-all duration-200 ease-in-out"
          >
            <ArrowUpCircle className="h-4 w-4" />
            Income
          </TabsTrigger>
        </TabsList>

        {/* EXPENSE Tabs Content */}
        <TabsContent value="EXPENSE">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {expenseCats.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onDelete={() => handleDelete(cat.id)}
              />
            ))}
          </div>
        </TabsContent>

        {/* INCOME Tabs Content */}
        <TabsContent value="INCOME">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {incomeCats.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onDelete={() => handleDelete(cat.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty State */}
      {categories.length === 0 && !loading && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No categories added yet</p>
          <Button
            variant="outline"
            className="mt-4"
            onClick={() => setOpenAdd(true)}
          >
            Add Your First Category
          </Button>
        </div>
      )}

      {/* Mobile floating add button */}
      <div className="fixed bottom-10 right-6 z-50 md:hidden">
        <Button
          size="icon"
          className="rounded-full h-14 w-14 shadow-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          onClick={() => setOpenAdd(true)}
        >
          <Plus className="h-7 w-7" />
        </Button>
      </div>
    </div>
  );
}
