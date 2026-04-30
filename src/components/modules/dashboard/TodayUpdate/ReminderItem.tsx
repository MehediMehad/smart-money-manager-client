import { TReminder } from "@/types";
import {
  AlertTriangle,
  CalendarClock,
  ChevronRight,
  TrendingUp,
  PiggyBank,
} from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap = {
  alert: {
    icon: AlertTriangle,
    style: "bg-amber-100 text-amber-600",
  },
  reminder: {
    icon: CalendarClock,
    style: "bg-blue-100 text-blue-600",
  },
  info: {
    icon: TrendingUp,
    style: "bg-emerald-100 text-emerald-600",
  },
  savings: {
    icon: PiggyBank,
    style: "bg-purple-100 text-purple-600",
  },
};

const ReminderItem = ({ rem }: { rem: TReminder }) => {
  const item = iconMap[rem.type as keyof typeof iconMap] || iconMap.info;
  const Icon = item.icon;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:bg-slate-50">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-9 w-9 items-center justify-center rounded-xl",
            item.style,
          )}
        >
          <Icon className="h-5 w-5" />
        </div>

        <p className="text-sm font-medium text-slate-600">{rem.text}</p>
      </div>

      <ChevronRight className="h-5 w-5 text-slate-400" />
    </div>
  );
};

export default ReminderItem;
