import { Wallet } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import IconBox from "./IconBox";
import { transactionColorMap, transactionIconMap } from "@/constants";
import { formatDate } from "@/lib/format";

function RecentTransactions({ transactions }: { transactions: any[] }) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {transactions.length ? (
          transactions.map((item: any) => {
            const Icon = transactionIconMap[item.type] || Wallet;
            const color = transactionColorMap[item.type] || "blue";

            return (
              <div
                key={item.id}
                className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <IconBox icon={Icon} color={color} small />

                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-slate-500">
                      {item.type} • {item.category}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={cn(
                      "font-bold",
                      item.type === "income"
                        ? "text-emerald-600"
                        : "text-red-500",
                    )}
                  >
                    {item.type === "income" ? "+" : "-"}
                    {item.amount}
                  </p>
                  <p className="text-xs text-slate-500">
                    {formatDate(item.date)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <Wallet className="h-7 w-7 text-slate-500" />
            </div>

            <h4 className="mt-4 text-sm font-semibold text-slate-700">
              No transactions yet
            </h4>

            <p className="mt-1 text-xs text-slate-500">
              Your recent transactions will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default RecentTransactions;
