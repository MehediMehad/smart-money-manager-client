import DailyBudget from "@/components/modules/dashboard/DailyBudget/DailyBudget";
import { getCategories } from "@/services/Category";

const DailyBudgetPage = async () => {
  const categories = await getCategories();
  console.log(categories);

  return (
    <>
      <DailyBudget categories={categories} />
    </>
  );
};

export default DailyBudgetPage;
