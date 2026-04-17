import IncomePage from "@/components/modules/dashboard/Income/IncomePage";
import { getCategories } from "@/services/Category";
import { getDashboardSummary } from "@/services/Income";

const page = async () => {
  const getSummaryResponse = await getDashboardSummary({});
  const categories = await getCategories();

  if (!getSummaryResponse.success || !getSummaryResponse.data) {
    return (
      <>
        <h1>Failed to fetch dashboard summary</h1>
      </>
    );
  }

  return (
    <>
      <IncomePage summary={getSummaryResponse.data} categories={categories} />
    </>
  );
};

export default page;
