import { AlertTriangle, CalendarClock, TrendingUp } from "lucide-react";

const ReminderItem = ({ rem }: any) => {
  return (
    <div className="flex gap-3 rounded-2xl border bg-background p-4">
      {rem.type === "alert" && (
        <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-600" />
      )}
      {rem.type === "reminder" && (
        <CalendarClock className="mt-0.5 h-5 w-5 text-blue-600" />
      )}
      {rem.type === "info" && (
        <TrendingUp className="mt-0.5 h-5 w-5 text-emerald-600" />
      )}

      <p className="text-sm leading-6">{rem.text}</p>
    </div>
  );
};

export default ReminderItem;
