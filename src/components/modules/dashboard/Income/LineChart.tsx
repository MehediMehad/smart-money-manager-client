import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type MonthlyTrendItem = {
  month: string;
  amount: number;
};

type Props = {
  title?: string;
  description?: string;
  data: MonthlyTrendItem[];
};

const LineChartCard = ({
  title = "Monthly Income Trend",
  description = "Last 6 Months",
  data,
}: Props) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent className="h-64 sm:h-72 md:h-80">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => value} />
            <Legend />
            <Line
              type="monotone"
              dataKey="amount"
              stroke="#10b981"
              strokeWidth={2.5}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartCard;
