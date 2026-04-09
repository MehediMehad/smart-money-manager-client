"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { toast } from "sonner";

interface TExpense {
  id: string;
  note: string;
  amount: number;
  date: string;
  category: {
    id: string;
    name: string;
    emoji?: string;
  };
}

interface Props {
  expenses: TExpense[];
  loading?: boolean;
  onDelete: (id: string, note: string) => void;
}

function formatBDT(amount: number) {
  return "৳" + amount.toLocaleString("en-US");
}

function formatDate(dateStr: string) {
  return format(new Date(dateStr), "dd MMM yyyy", { locale: enUS });
}

export default function ExpenseGrid({
  expenses,
  loading = false,
  onDelete,
}: Props) {
  if (loading) {
    return <div className="text-center py-12">Loading expenses...</div>;
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {expenses.map((exp) => (
        <Card
          key={exp.id}
          className="rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden"
        >
          <CardContent className="p-5 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-semibold text-lg">
                  {exp.category?.name || "Unknown"}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(exp.date)}
                </p>
              </div>

              <Badge variant="outline" className="text-xs">
                {exp.category?.emoji}
              </Badge>
            </div>

            <div className="text-right">
              <p className="text-2xl font-bold text-destructive">
                {formatBDT(exp.amount)}
              </p>
            </div>

            {exp.note && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {exp.note}
              </p>
            )}

            <div className="flex gap-2 pt-2 border-t">
              <Button
                variant="outline"
                size="sm"
                className="flex-1"
                onClick={() => toast.info("Edit feature coming soon")}
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </Button>

              <Button
                variant="destructive"
                size="sm"
                className="flex-1"
                onClick={() => onDelete(exp.id, exp.note)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
