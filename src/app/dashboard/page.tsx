import { getDashboardOverview } from "@/services/Dashboard";
import OverviewChart from "@/components/modules/dashboard/Home/OverviewChart";
import BudgetOverview from "@/components/modules/dashboard/Home/BudgetOverview";
import DashboardStats from "@/components/modules/dashboard/Home/DashboardStats";
import RecentTransactions from "@/components/modules/dashboard/Home/RecentTransactions";
import SavingsGoals from "@/components/modules/dashboard/Home/SavingsGoals";
import DebtsOverview from "@/components/modules/dashboard/Home/DebtsOverview";

const DashboardPage = async () => {
  const overview = await getDashboardOverview();

  const stats = overview?.stats || [];
  const transactions = overview?.transactions || [];
  const debts = overview?.debts || { receive: [], pay: [] };
  const goals = overview?.goals || [];
  const budgets = overview?.budgets || [];
  const chartData = overview?.chartData || [];

  const totalReceive = debts.receive.reduce(
    (sum: number, item: any) => sum + item.amount,
    0,
  );

  const totalPay = debts.pay.reduce(
    (sum: number, item: any) => sum + item.amount,
    0,
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Good morning, Mehedi! 👋
            </h1>
            <p className="mt-1 text-muted-foreground">
              Here’s what’s happening with your finances today.
            </p>
          </div>
        </div>

        <DashboardStats stats={stats} />

        <div className="grid gap-4 xl:grid-cols-[1.45fr_0.8fr]">
          <div className="space-y-4">
            <OverviewChart chartData={chartData} />

            <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
              <RecentTransactions transactions={transactions} />
              <SavingsGoals goals={goals} />
            </div>
          </div>

          <div className="space-y-4">
            <BudgetOverview budgets={budgets} />

            <DebtsOverview
              debts={debts}
              totalReceive={totalReceive}
              totalPay={totalPay}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
