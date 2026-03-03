import ChartSection from "@/components/modules/dashboard/Home/ChartSection";
import SummarySection from "@/components/modules/dashboard/Home/SummarySection";

const DashboardHome = () => {
  return (
    <>
      <h2 className="mb-6 text-2xl font-bold text-foreground">
        আর্থিক সারসংক্ষেপ
      </h2>
      <SummarySection />
      <div className="mb-8">
        <ChartSection />
      </div>
      <div className="mb-8">{/* <SavingsGoals /> */}</div>
      {/* <DebtList /> */}
    </>
  );
};

export default DashboardHome;
