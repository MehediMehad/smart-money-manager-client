import { getSavingsDashboard } from "@/services/SavingsGoal";
import { SavingsOverview } from "./_components/savings-overview.tsx";

export const dynamic = "force-dynamic";

export default async function SavingsPage() {
  const response = await getSavingsDashboard();

  console.log("response", response);

  return (
    <SavingsOverview
      goals={response.data?.savingsGoal ?? []}
      trend={response.data?.monthlySavingsTrend ?? []}
      error={!response.success ? response.message : null}
    />
  );
}
