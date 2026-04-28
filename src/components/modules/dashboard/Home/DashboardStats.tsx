import { Wallet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import IconBox from "./IconBox";
import { statColorMap, statIconMap } from "@/constants";

function DashboardStats({ stats }: { stats: any[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item: any) => {
        const Icon = statIconMap[item.title] || Wallet;
        const color = statColorMap[item.title] || "blue";

        return (
          <Card
            key={item.title}
            className="rounded-2xl border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="flex items-center gap-5 p-6">
              <IconBox icon={Icon} color={color} />

              <div>
                <p className="text-sm text-slate-500">{item.title}</p>
                <h2 className="mt-2 text-2xl font-bold">{item.value}</h2>

                <p
                  className={cn(
                    "mt-3 text-xs font-medium",
                    item.change?.startsWith("-")
                      ? "text-red-500"
                      : "text-emerald-600",
                  )}
                >
                  {item.change || "0%"}{" "}
                  <span className="font-normal text-slate-500">
                    from last month
                  </span>
                </p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default DashboardStats;
