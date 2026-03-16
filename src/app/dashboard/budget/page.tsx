// app/dashboard/budget/page.tsx
// import { getBudgets } from "@/services/Budget"; // ← your service
import BudgetPage from "@/components/modules/dashboard/Budget/BudgetPage";
import { fakeBudgets } from "@/constants";

const Page = async () => {
  //   const budgets = await getBudgets(); // assume returns TBudget[]

  return (
    <>
      <BudgetPage budgets={fakeBudgets || []} />
    </>
  );
};

export default Page;
