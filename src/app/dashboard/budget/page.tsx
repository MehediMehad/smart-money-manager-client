// app/dashboard/budget/page.tsx
import BudgetPage from "@/components/modules/dashboard/Budget/BudgetPage";
import { getBudgets } from "@/services/Budget";
import { getCategories } from "@/services/Category";

type Props = {
  searchParams: Promise<{
    type?: "DAILY" | "MONTHLY";
    date?: string;
    month?: string;
    year?: string;
    status?: "ALL" | "SAFE" | "WARNING" | "OVER";
  }>;
};

export default async function BudgetsPage({ searchParams }: Props) {
  const sp = await searchParams;

  const today = new Date();
  const currentDate = today.toISOString().split("T")[0];
  const currentMonth = String(today.getMonth() + 1).padStart(2, "0");
  const currentYear = String(today.getFullYear());

  const type = sp.type === "MONTHLY" ? "MONTHLY" : "DAILY";
  const date = sp.date || currentDate;
  const month = sp.month || currentMonth;
  const year = sp.year || currentYear;
  const status = sp.status || "ALL";

  const [budgets, categories] = await Promise.all([
    getBudgets({ type, date, month, year }),
    getCategories(),
  ]);

  return (
    <BudgetPage
      budgets={budgets}
      categories={categories}
      initialFilters={{
        type,
        date,
        month: `${year}-${month}`,
        year,
        status,
      }}
    />
  );
}
