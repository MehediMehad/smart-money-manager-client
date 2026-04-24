"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import IncomeFormDialog from "./IncomeFormDialog";
import DashboardPageHeader from "@/components/shared/DashboardPageHeader";

const IncomeHeader = () => {
  const router = useRouter();
  const [, startTransition] = useTransition();

  const handleSuccess = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <DashboardPageHeader
      title="Income Management"
      description="Manage your incomes"
      action={{
        label: "Add Income",
        icon: Plus,
        component: (
          <IncomeFormDialog
            mode="create"
            onSuccess={handleSuccess}
            categories={[]} // later API theke diba
          />
        ),
      }}
    />
  );
};

export default IncomeHeader;
