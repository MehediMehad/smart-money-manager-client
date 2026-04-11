import IncomePage from "@/components/modules/dashboard/Income/IncomePage";
import { getDashboardSummary } from "@/services/Income";

const page = async () => {
  const getSummaryResponse = await getDashboardSummary();

  if (!getSummaryResponse.success || !getSummaryResponse.data) {
    return (
      <>
        <h1>Failed to fetch dashboard summary</h1>
      </>
    );
  }

  return (
    <>
      <IncomePage summary={getSummaryResponse.data} />
    </>
  );
};

export default page;
