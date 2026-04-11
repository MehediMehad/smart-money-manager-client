import PieChartCard from "./PieChart";
import LineChartCard from "./LineChart";

type SourceSummaryItem = {
  name: string;
  value: number;
};

type MonthlyTrendItem = {
  month: string;
  amount: number;
};

type Props = {
  sourceSummary: SourceSummaryItem[];
  monthlyTrend: MonthlyTrendItem[];
};

const Charts = ({ sourceSummary, monthlyTrend }: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <PieChartCard
        title="Income Source Distribution"
        description="March 2026"
        data={sourceSummary}
      />

      <LineChartCard
        title="Monthly Income Trend"
        description="Last 6 Months"
        data={monthlyTrend}
      />
    </div>
  );
};

export default Charts;
