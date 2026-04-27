import MainStatusCard from "@/components/modules/dashboard/TodayUpdate/MainStatusCard";
import QuickActionsCard from "@/components/modules/dashboard/TodayUpdate/QuickActionsCard";
import RemindersCard from "@/components/modules/dashboard/TodayUpdate/RemindersCard";
import SummaryCards from "@/components/modules/dashboard/TodayUpdate/SummaryCards";
import TodayHeader from "@/components/modules/dashboard/TodayUpdate/TodayHeader";
import TransactionsCard from "@/components/modules/dashboard/TodayUpdate/TransactionsCard";
import { getTodayUpdate } from "@/services/ToDayUpdate";
import { TodayData } from "@/types";

const TodayUpdatePage = async () => {
  const todayData: TodayData = await getTodayUpdate();

  const metaData = {
    date: todayData.date,
    income: todayData.income,
    expense: todayData.expense,
    budgetRemaining: todayData.budgetRemaining,
    savingsAdded: todayData.savingsAdded,
    todayBudget: todayData.todayBudget,
    todaySpentPercent: todayData.todaySpentPercent,
    status: todayData.status,
  };

  const transactions = todayData.transactions;
  const reminders = todayData.reminders;

  return (
    <div className="min-h-screen">
      <div className="mx-auto space-y-6">
        <TodayHeader />
        <MainStatusCard todayData={metaData} />
        <SummaryCards todayData={todayData} />
        <QuickActionsCard />

        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <TransactionsCard todayTransactions={transactions} />
          <RemindersCard reminders={reminders} />
        </div>
      </div>
    </div>
  );
};

export default TodayUpdatePage;
