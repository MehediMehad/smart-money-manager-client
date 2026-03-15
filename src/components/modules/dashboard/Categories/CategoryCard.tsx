import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TCategory } from "@/types";
import { Trash2 } from "lucide-react";

const CategoryCard = ({
  category,
  onDelete,
}: {
  category: TCategory;
  onDelete: () => void;
}) => {
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
      <Button
        variant="ghost"
        size="icon"
        onClick={onDelete}
        className="text-destructive hover:bg-red-500/10"
      >
        <Trash2 className="h-4 w-4 text-red-500 " size={18} />
      </Button>
    </Card>
  );
};

export default CategoryCard;
