import { getCategories } from "@/services/Category";

const CreateDailyBudget = async () => {
  const data = await getCategories();
  console.log("++++++++++++++", data);

  return (
    <div>
      <h1>This is CreateDailyBudget component</h1>
    </div>
  );
};

export default CreateDailyBudget;
