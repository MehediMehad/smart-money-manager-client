import SavingsPage from "@/components/modules/dashboard/Savings/SavingsPage";
import { getSavingsGoals } from "@/services/SavingsGoal";

const Page = async () => {
  const savings = await getSavingsGoals();

  console.log("savings", savings);

  return (
    <>
      <SavingsPage />
    </>
  );
};

export default Page;
