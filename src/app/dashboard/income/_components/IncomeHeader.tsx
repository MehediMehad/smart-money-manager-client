import IncomeFormModal from "@/components/modules/dashboard/Income/IncomeFormModal";
import { TCategory } from "@/types";

type Props = {
  categories: TCategory[];
};

const IncomeHeader = ({ categories }: Props = { categories: [] }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📈 Income
        </h1>
      </div>

      <div className="hidden sm:block">
        <IncomeFormModal mode="create" categories={categories || []} />
      </div>
    </div>
  );
};

export default IncomeHeader;
