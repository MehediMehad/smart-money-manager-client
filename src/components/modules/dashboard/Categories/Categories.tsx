"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { toast } from "sonner";
import { deleteCategory } from "@/services/Category";
import { TCategory } from "@/types";
import CategoryCard from "./CategoryCard";
import AddCategoryModal from "./AddCategoryModal";

interface Props {
  categories: TCategory[];
}

export default function CategoriesPage({ categories }: Props) {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    }
  };

  const incomeCats = categories?.filter((c) => c.type === "INCOME");
  const expenseCats = categories?.filter((c) => c.type === "EXPENSE");

  return (
    <div className="space-y-6">
      {/* Header + Add Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
            Manage income and expense categories
          </p>
        </div>

        {/* Add Category Modal */}
        <div className="hidden sm:block">
          <AddCategoryModal />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="EXPENSE" className="space-y-5 !mt-3 sm:!mt-6">
        <TabsList className="grid w-full sm:max-w-xs mx-auto sm:mx-0 sm:inline-grid grid-cols-2">
          <TabsTrigger
            value="EXPENSE"
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-full data-[state=active]:shadow-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white hover:data-[state=active]:from-emerald-700 hover:data-[state=active]:to-teal-700 transition-all duration-200 ease-in-out"
          >
            <ArrowDownCircle className="h-4 w-4" />
            Expense
          </TabsTrigger>
          <TabsTrigger
            value="INCOME"
            className="flex-1 flex items-center justify-center gap-2 py-2 text-sm rounded-full data-[state=active]:shadow-2xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-600 data-[state=active]:to-teal-600 data-[state=active]:text-white hover:data-[state=active]:from-emerald-700 hover:data-[state=active]:to-teal-700 transition-all duration-200 ease-in-out"
          >
            <ArrowUpCircle className="h-4 w-4" />
            Income
          </TabsTrigger>
        </TabsList>

        <TabsContent value="EXPENSE">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {expenseCats?.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onDelete={() => handleDelete(cat.id)}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="INCOME">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
            {incomeCats?.map((cat) => (
              <CategoryCard
                key={cat.id}
                category={cat}
                onDelete={() => handleDelete(cat.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Empty state */}
      {categories.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No categories added yet</p>
          <div className="flex justify-center items-center mt-3">
            <AddCategoryModal />
          </div>
        </div>
      )}

      {/* Mobile FAB */}
      <div className="fixed bottom-10 right-6 z-50 md:hidden">
        <AddCategoryModal isIcon />
      </div>
    </div>
  );
}
