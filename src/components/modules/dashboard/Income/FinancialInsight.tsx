import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { TiStarOutline } from "react-icons/ti";

type Props = {
  totalThisMonth: number;
  mainSource: {
    name: string;
    value: number;
  };
};

const FinancialInsight = ({ totalThisMonth, mainSource }: Props) => {
  return (
    <Card className="rounded-2xl shadow-sm border-emerald-400/40 bg-emerald-50/30 dark:bg-emerald-950/20">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
          <TrendingUp className="h-5 w-5" /> Financial Health Insight
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-1.5">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>
          <p>
            Income increased by{" "}
            <strong className="text-emerald-600">71%</strong> compared to last
            month
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-emerald-100 dark:bg-emerald-900/50 p-1.5">
            <TiStarOutline className="h-4 w-4 text-emerald-600" />
          </div>
          <p>
            Primary income source is <strong>{mainSource.name}</strong> —{" "}
            {totalThisMonth > 0
              ? Math.round((mainSource.value / totalThisMonth) * 100)
              : 0}
            % of total income
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialInsight;
