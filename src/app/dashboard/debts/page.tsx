// src/app/dashboard/debts/page.tsx

import { Suspense } from "react";

import { queryStringFormatter } from "@/lib/formatters";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { TDebtsData } from "@/types/debts";
import DebtHeader from "@/components/modules/dashboard/Debts/DebtHeader";
import SummaryCards from "@/components/modules/dashboard/Debts/SummaryCards";
import DebtsTable from "@/components/modules/dashboard/Debts/DebtsTable";
import { getDebts } from "@/services/Debts";

const DebtsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  const debtsResult = await getDebts(queryString);

  const debtsPayload = debtsResult.data as TDebtsData | undefined;

  const meta = debtsPayload?.meta;
  const debts = debtsPayload?.data || [];

  return (
    <div className="space-y-6">
      <DebtHeader />

      <SummaryCards meta={meta} />

      <Suspense fallback={<TableSkeleton columns={6} rows={10} />}>
        <DebtsTable debts={debts} />
      </Suspense>
    </div>
  );
};

export default DebtsPage;
