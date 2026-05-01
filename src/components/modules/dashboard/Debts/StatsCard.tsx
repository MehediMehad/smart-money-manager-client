import { Card, CardContent } from "@/components/ui/card";
import React from "react";

type StatsTone = "green" | "red" | "blue" | "purple";
interface StatsCardProps {
  title: string;
  value: string;
  caption: string;
  icon: React.ReactElement<{ className?: string }>;
  color: StatsTone;
}

const colors: Record<StatsTone, string> = {
  green: "bg-emerald-50 text-emerald-600",
  red: "bg-red-50 text-red-500",
  blue: "bg-blue-50 text-blue-600",
  purple: "bg-violet-50 text-violet-600",
};

const StatsCard = ({ title, value, caption, icon, color }: StatsCardProps) => {
  return (
    <Card className="rounded-2xl border-slate-200 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={`rounded-2xl p-4 ${colors[color]}`}>
          {React.cloneElement(icon, { className: "h-6 w-6" })}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          <p className="mt-1 text-xs text-slate-400">{caption}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
