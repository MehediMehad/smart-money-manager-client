import { getSavingsDashboard } from "../savings/_actions/index";
import { SavingsOverview } from "./_components/savings-overview.tsx";

export const dynamic = "force-dynamic";

export default async function SavingsPage() {
  const response = await getSavingsDashboard();

  return (
    <SavingsOverview
      goals={response.data?.savingsGoal ?? []}
      trend={response.data?.monthlySavingsTrend ?? []}
      error={!response.success ? response.message : null}
    />
  );
}
