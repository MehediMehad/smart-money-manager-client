// app/dashboard/budget/page.tsx
import BudgetPage from "@/components/modules/dashboard/Budget/BudgetPage";
import { getBudgets } from "@/services/Budget";

const Page = async () => {
  const budgets = await getBudgets();

  return (
    <>
      <BudgetPage budgets={budgets || []} />
    </>
  );
};

export default Page;
