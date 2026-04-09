import Expense from "@/components/modules/dashboard/Expense/Expense";
import { getCategories } from "@/services/Category";

const ExpensePage = async () => {
  const categoriesRes = await getCategories();

  return <Expense categories={categoriesRes || []} />;
};
export default ExpensePage;
