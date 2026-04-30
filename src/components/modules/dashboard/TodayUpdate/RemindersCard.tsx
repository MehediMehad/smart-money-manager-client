import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReminderItem from "./ReminderItem";
import { TReminder } from "@/types";

const RemindersCard = ({ reminders }: { reminders: TReminder[] }) => {
  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-950">
          Things to Remember
        </CardTitle>
        <CardDescription>
          Important notes for today and tomorrow.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {reminders?.map((rem, i) => (
          <ReminderItem key={i} rem={rem} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RemindersCard;
