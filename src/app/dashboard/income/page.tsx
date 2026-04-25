// src/app/dashboard/income/page.tsx

import { queryStringFormatter } from "@/lib/formatters";
import { getIncomes } from "@/services/Income";
import { Suspense } from "react";
import IncomesFilter from "./_components/IncomesFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import IncomesTable from "./_components/IncomesTable";
import IncomeHeader from "./_components/IncomeHeader";
import { getCategories } from "@/services/Category";

const IncomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const incomesResult = await getIncomes(queryString);

  const queryStringCategories = queryStringFormatter({
    type: "INCOME",
  });
  const categoriesResult = await getCategories(queryStringCategories);

  const categories = categoriesResult.data;
  const allUsedCategories = incomesResult.data.allUsedCategories || [];

  return (
    <div className="space-y-6">
      <div>
        <IncomeHeader categories={categories || []} />
      </div>

      <IncomesFilter categories={allUsedCategories || []} />

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <IncomesTable incomes={incomesResult?.data.data || []} />
      </Suspense>
    </div>
  );
};

export default IncomePage;
