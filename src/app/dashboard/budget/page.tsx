// app/dashboard/budget/page.tsx
import BudgetPage from "@/components/modules/dashboard/Budget/BudgetPage";
import { getBudgets } from "@/services/Budget";
import { getCategories } from "@/services/Category";

const Page = async () => {
  const budgets = await getBudgets();
  const categories = await getCategories();

  return (
    <>
      <BudgetPage budgets={budgets || []} categories={categories || []} />
    </>
  );
};

export default Page;
