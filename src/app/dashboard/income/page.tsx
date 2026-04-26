// src/app/dashboard/income/page.tsx
import { queryStringFormatter } from "@/lib/formatters";
import { Suspense } from "react";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import IncomesTable from "./_components/IncomesTable";
import IncomeHeader from "./_components/IncomeHeader";
import { getCategories2 } from "@/services/Category";
import { getIncomes } from "./_actions";

const IncomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const [incomesResult, categoriesResult] = await Promise.all([
    getIncomes(queryString),
    getCategories2(queryStringFormatter({ type: "INCOME" })),
  ]);

  const categories = categoriesResult.data;
  const incomes = incomesResult.data;

  return (
    <div className="space-y-6">
      <div>
        <IncomeHeader categories={categories || []} />
      </div>

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <IncomesTable incomes={incomes || []} categories={categories || []} />
      </Suspense>
    </div>
  );
};

export default IncomePage;
