"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarClock,
  PiggyBank,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";

// Dialog Components Import

import { TCategory } from "@/types";
import IncomeFormDialog from "@/app/dashboard/income/_components/IncomeFormDialog";
import ExpenseFormDialog from "@/app/dashboard/expense/_components/ExpenseFormDialog";
import BudgetFormModal from "../Budget/BudgetFormModal";
import DebtFormDialog from "../Debts/DebtFormDialog";

type Props = {
  categories: TCategory[];
};

const QuickActionsCard = ({ categories }: Props) => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  // কোন ডায়ালগটি খোলা আছে তা ট্র্যাক করার জন্য স্টেট
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
    setOpenDialog(null); // সফল হলে বন্ধ হবে
  };

  const handleClose = () => {
    setOpenDialog(null); // ক্যানসেল বা বাইরে ক্লিক করলে বন্ধ হবে
  };

  const actions = [
    {
      id: "income",
      label: "Add Income",
      icon: ArrowUpRight,
      style:
        "bg-emerald-50 border-emerald-100 text-emerald-600 hover:bg-emerald-100",
    },
    {
      id: "expense",
      label: "Add Expense",
      icon: ArrowDownRight,
      style: "bg-rose-50 border-rose-100 text-rose-600 hover:bg-rose-100",
    },
    {
      id: "budget",
      label: "Add Budget",
      icon: PiggyBank,
      style:
        "bg-purple-50 border-purple-100 text-purple-600 hover:bg-purple-100",
    },
    {
      id: "debt",
      label: "Add Debt",
      icon: CalendarClock,
      style:
        "bg-orange-50 border-orange-100 text-orange-600 hover:bg-orange-100",
    },
  ];

  return (
    <>
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="grid gap-5 p-5 lg:grid-cols-[260px_1fr] lg:items-center">
          <div>
            <CardTitle className="text-xl font-bold text-slate-950">
              Quick Actions
            </CardTitle>
            <CardDescription className="mt-1 text-sm text-slate-500">
              Add your most common financial activity quickly.
            </CardDescription>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {actions.map((action) => {
              const Icon = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  onClick={() => setOpenDialog(action.id)}
                  className={`h-16 justify-start rounded-xl border font-semibold shadow-none transition hover:scale-[1.01] ${action.style}`}
                >
                  <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-xl bg-white/70">
                    <Icon className="h-5 w-5" />
                  </span>
                  {action.label}
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* --- Dialogs Section --- */}

      {/* Income Dialog */}
      <IncomeFormDialog
        open={openDialog === "income"}
        onClose={handleClose}
        onSuccess={handleSuccess}
        categories={categories.filter((c) => c.type === "INCOME")}
      />

      {/* Expense Dialog */}
      <ExpenseFormDialog
        open={openDialog === "expense"}
        onClose={handleClose}
        onSuccess={handleSuccess}
        categories={categories.filter((c) => c.type === "EXPENSE")}
      />

      {/* Budget Modal - এখানে onOpenChange প্রপটি যোগ করা হয়েছে */}
      <BudgetFormModal
        mode="create"
        open={openDialog === "budget"}
        onOpenChange={(isOpen) => !isOpen && handleClose()}
        onSuccess={handleSuccess}
        categories={categories}
      />

      {/* Debt Dialog */}
      <DebtFormDialog
        open={openDialog === "debt"}
        onClose={handleClose}
        onSuccess={handleSuccess}
      />
    </>
  );
};

export default QuickActionsCard;
