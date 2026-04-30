import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const colorClasses = {
  emerald: "bg-emerald-100 text-emerald-600",
  rose: "bg-rose-100 text-rose-600",
  blue: "bg-blue-100 text-blue-600",
  purple: "bg-purple-100 text-purple-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
  gray: "bg-gray-100 text-gray-600",
  indigo: "bg-indigo-100 text-indigo-600",
  pink: "bg-pink-100 text-pink-600",
  cyan: "bg-cyan-100 text-cyan-600",
};

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: LucideIcon;
  color: keyof typeof colorClasses;
}) => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardContent className="flex items-center gap-5 p-5">
        <div
          className={cn(
            "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl",
            colorClasses[color],
          )}
        >
          <Icon className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-1 text-2xl font-bold text-slate-950">
            ৳{Number(value || 0).toLocaleString()}
          </h3>
          <p className="mt-1 text-xs font-semibold text-blue-600">
            0%{" "}
            <span className="font-medium text-slate-500">from last month</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
