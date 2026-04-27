import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReminderItem from "./ReminderItem";
import { Reminder } from "@/types";

interface Props {
  reminders: Reminder[];
}

const RemindersCard = ({ reminders }: Props) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader>
        <CardTitle>Things to Remember</CardTitle>
        <CardDescription>
          Important notes for today and tomorrow.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {reminders?.map((rem: any, i: number) => (
          <ReminderItem key={i} rem={rem} />
        ))}
      </CardContent>
    </Card>
  );
};

export default RemindersCard;
