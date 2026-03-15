import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { deleteCategory } from "@/services/Category";
import { TCategory } from "@/types";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import DeleteCategoryModal from "./DeleteCategoryModal";

const CategoryCard = ({ category }: { category: TCategory }) => {
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      await deleteCategory(id);
      toast.success("Category deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete category");
    }
  };
  return (
    <Card className="flex items-center justify-between p-3 rounded-xl shadow-sm hover:shadow-md transition-all">
      {/* Left Side */}
      <div className="flex items-center gap-3">
        {/* Emoji */}
        <div className="h-11 w-11 flex items-center justify-center rounded-full bg-muted text-xl">
          {category.emoji}
        </div>

        {/* Name + Type */}
        <div className="flex flex-col">
          <p className="font-medium text-sm leading-none">{category.name}</p>

          <Badge
            variant="secondary"
            className={`text-[10px] mt-1 w-fit bg-gray-100 text-gray-700`}
          >
            {category.type === "INCOME" ? "Income" : "Expense"}
          </Badge>
        </div>
      </div>

      {/* Delete Button */}
      <div className="flex items-center gap-1">
        <DeleteCategoryModal category={category} />
      </div>
    </Card>
  );
};

export default CategoryCard;
