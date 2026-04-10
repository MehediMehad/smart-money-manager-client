// app/dashboard/expense/page.tsx
import ExpenseView from "@/components/modules/dashboard/Expense/Expense";
import { getCategories } from "@/services/Category";

const ExpensePage = async () => {
  const categories = await getCategories();

  return <ExpenseView categories={categories || []} />;
};

export default ExpensePage;
