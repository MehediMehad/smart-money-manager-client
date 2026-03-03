"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const lineData = [
  { month: "জানু", আয়: 45000, ব্যয়: 30000 },
  { month: "ফেব্রু", আয়: 48000, ব্যয়: 35000 },
  { month: "মার্চ", আয়: 42000, ব্যয়: 28000 },
  { month: "এপ্রি", আয়: 50000, ব্যয়: 38000 },
  { month: "মে", আয়: 55000, ব্যয়: 32000 },
  { month: "জুন", আয়: 52000, ব্যয়: 36000 },
];

const pieData = [
  { name: "খাবার", value: 12000 },
  { name: "বাড়ি ভাড়া", value: 15000 },
  { name: "যাতায়াত", value: 5000 },
  { name: "বিনোদন", value: 3000 },
  { name: "অন্যান্য", value: 5000 },
];

const COLORS = [
  "hsl(152, 55%, 42%)",
  "hsl(210, 80%, 55%)",
  "hsl(38, 92%, 50%)",
  "hsl(340, 65%, 55%)",
  "hsl(260, 50%, 55%)",
];

const ChartSection = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          আয় বনাম ব্যয়
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(150, 15%, 90%)" />
            <XAxis dataKey="month" tick={{ fontSize: 13 }} />
            <YAxis tick={{ fontSize: 13 }} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="আয়"
              stroke="hsl(152, 55%, 42%)"
              strokeWidth={2.5}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="ব্যয়"
              stroke="hsl(0, 72%, 55%)"
              strokeWidth={2.5}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-foreground">
          খরচের বিভাগ
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="value"
            >
              {pieData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartSection;
