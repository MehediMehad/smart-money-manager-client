import { Card, CardContent } from "@/components/ui/card";

type CategoryItem = {
  name: string;
  value: number;
};

type Props = {
  categorySummary: CategoryItem[];
  totalThisMonth: number;
};

const CategorySummary = ({ categorySummary, totalThisMonth }: Props) => {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-3">Income by Category</h3>

      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-4 pb-3">
        {categorySummary.map((src) => (
          <Card key={src.name} className="rounded-xl shadow-sm">
            <CardContent className="p-4">
              <div className="font-medium mb-1">{src.name}</div>

              <div className={`text-2xl font-bold text-emerald-600`}>
                {src.value}
              </div>

              <div className="text-xs text-muted-foreground mt-1">
                {totalThisMonth > 0
                  ? Math.round((src.value / totalThisMonth) * 100)
                  : 0}
                % of total income
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CategorySummary;
