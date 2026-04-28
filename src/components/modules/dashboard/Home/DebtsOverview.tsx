import { TrendingDown, TrendingUp } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import IconBox from "./IconBox";
import DebtList from "./DebtList";

function DebtsOverview({
  debts,
  totalReceive,
  totalPay,
}: {
  debts: {
    receive: {
      id: string;
      name: string;
      amount: number;
      dueDate: string;
    }[];
    pay: {
      id: string;
      name: string;
      amount: number;
      dueDate: string;
    }[];
  };
  totalReceive: number;
  totalPay: number;
}) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Debts Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl border bg-emerald-50/50 p-4">
            <div className="flex items-center gap-3">
              <IconBox icon={TrendingDown} color="green" small />
              <div>
                <p className="text-xs text-slate-500">Total to Receive</p>
                <p className="text-xl font-bold text-emerald-600">
                  {totalReceive}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-red-50/50 p-4">
            <div className="flex items-center gap-3">
              <IconBox icon={TrendingUp} color="red" small />
              <div>
                <p className="text-xs text-slate-500">Total to Pay</p>
                <p className="text-xl font-bold text-red-500">{totalPay}</p>
              </div>
            </div>
          </div>
        </div>

        <DebtList title="People Owe You" items={debts.receive} color="green" />

        <DebtList title="You Owe" items={debts.pay} color="red" />
      </CardContent>
    </Card>
  );
}

export default DebtsOverview;
