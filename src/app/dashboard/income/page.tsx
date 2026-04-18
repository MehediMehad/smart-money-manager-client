// app/dashboard/income/page.tsx

import IncomePage from "@/components/modules/dashboard/Income/IncomePage";
import { getCategories } from "@/services/Category";

const page = async () => {
  const categories = await getCategories();
  return (
    <>
      <IncomePage categories={categories || []} />
    </>
  );
};

export default page;
