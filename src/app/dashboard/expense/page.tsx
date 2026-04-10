// app/dashboard/expense/page.tsx
import Expense from "@/components/modules/dashboard/Expense/Expense";
import { getCategories } from "@/services/Category";

const ExpensePage = async () => {
  const categories = await getCategories();

  return <Expense categories={categories || []} />;
};

export default ExpensePage;
