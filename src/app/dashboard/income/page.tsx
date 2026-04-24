// src/app/dashboard/income/page.tsx

import { queryStringFormatter } from "@/lib/formatters";
import { getIncomes } from "@/services/Income";
import { Suspense } from "react";
import IncomeHeader from "./_components/IncomeHeader";
import IncomesFilter from "./_components/IncomesFilter";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import IncomesTable from "./_components/IncomesTable";

const IncomePage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const incomesResult = await getIncomes(queryString);

  console.log("incomesResult", incomesResult);

  // const totalPages = Math.ceil(
  //   (incomesResult?.meta?.total || 1) / (incomesResult?.meta?.limit || 1),
  // );

  return (
    <div className="space-y-6">
      <IncomeHeader />

      <IncomesFilter categories={incomesResult?.categories || []} />

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <IncomesTable incomes={incomesResult?.data || []} />

        {/* <TablePagination
          currentPage={incomesResult?.meta?.page || 1}
          totalPages={totalPages || 1}
        /> */}
      </Suspense>
    </div>
  );
};

export default IncomePage;
