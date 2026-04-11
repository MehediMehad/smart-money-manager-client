import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type StatCardProps = {
  title: string;
  value: number;
  subtitle: string;
  variant?: "default" | "emerald" | "blue" | "purple";
};

const StatCard = ({
  title,
  value,
  subtitle,
  variant = "default",
}: StatCardProps) => {
  const valueClass = {
    default: "text-2xl font-bold",
    emerald: "text-2xl font-bold text-emerald-600 dark:text-emerald-400",
    blue: "text-2xl font-bold text-blue-600 dark:text-blue-400",
    purple: "text-2xl font-bold text-purple-600 dark:text-purple-400",
  }[variant];

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className={valueClass}>{value}</div>
        <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
      </CardContent>
    </Card>
  );
};

export default StatCard;
