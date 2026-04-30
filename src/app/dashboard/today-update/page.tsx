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

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="mx-auto space-y-6 py-6">
        <TodayHeader />

        <MainStatusCard todayData={todayData} />
        <SummaryCards todayData={todayData} />
        <QuickActionsCard />

        <div className="grid gap-6 lg:grid-cols-[1.05fr_1fr]">
          <TransactionsCard todayTransactions={todayData.transactions} />
          <RemindersCard reminders={todayData.reminders} />
        </div>
      </div>
    </div>
  );
};

export default TodayUpdatePage;
