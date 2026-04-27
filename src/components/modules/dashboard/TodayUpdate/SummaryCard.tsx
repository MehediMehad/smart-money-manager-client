import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const SummaryCard = ({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: any;
  color: "emerald" | "rose" | "blue" | "teal";
}) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="mt-1 text-2xl font-bold">{value}</h3>
          </div>

          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center rounded-2xl",
              color === "emerald" && "bg-emerald-100 text-emerald-700",
              color === "rose" && "bg-rose-100 text-rose-700",
              color === "blue" && "bg-blue-100 text-blue-700",
              color === "teal" && "bg-teal-100 text-teal-700",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
