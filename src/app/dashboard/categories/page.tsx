import CategoriesPage from "@/components/modules/dashboard/Categories/Categories";
import { getCategories } from "@/services/Category";

const Page = async () => {
  const categories = await getCategories();

  return (
    <>
      <CategoriesPage categories={categories || []} />
    </>
  );
};

export default Page;
