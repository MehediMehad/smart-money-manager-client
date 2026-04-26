// src/app/dashboard/expense/page.tsx
import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { getCategories2 } from "@/services/Category";
import { getExpenses } from "./_actions";
import ExpenseHeader from "./_components/ExpenseHeader";
import ExpensesTable from "./_components/ExpensesTable";

const ExpensePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const [expensesResult, categoriesResult] = await Promise.all([
    getExpenses(queryString),
    getCategories2(queryStringFormatter({ type: "EXPENSE" })),
  ]);

  const categories = categoriesResult.data;
  const expenses = expensesResult.data;

  return (
    <div className="space-y-6">
      <ExpenseHeader categories={categories || []} />

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <ExpensesTable
          expenses={expenses || []}
          categories={categories || []}
        />
      </Suspense>
    </div>
  );
};

export default ExpensePage;
