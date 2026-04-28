import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

const colorClasses = {
  emerald: {
    bg: "bg-emerald-100",
    text: "text-emerald-600",
    icon: "text-emerald-600",
  },
  rose: {
    bg: "bg-rose-100",
    text: "text-rose-600",
    icon: "text-rose-600",
  },
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    icon: "text-blue-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    icon: "text-purple-600",
  },
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
  const styles = colorClasses[color];

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm ">
      <CardContent className="p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-slate-500">{title}</p>

            <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-950">
              ৳{Number(value).toLocaleString()}
            </h3>
          </div>

          <div
            className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl",
              styles.bg,
            )}
          >
            <Icon className={cn("h-5 w-5", styles.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
