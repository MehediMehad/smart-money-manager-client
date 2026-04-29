import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DebtList from "./DebtList";

function DebtsOverview({ debts, totalReceive, totalPay }: any) {
  return (
    <Card className="rounded-2xl border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle>Debts Overview</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          <DebtList
            title="People Owe You"
            totalLabel="Total"
            total={totalReceive}
            items={debts.receive}
            color="green"
            emptyTitle="No one owes you"
            emptyText="Great! No money is pending."
          />

          <DebtList
            title="You Owe"
            totalLabel="Total"
            total={totalPay}
            items={debts.pay}
            color="red"
            emptyTitle="No one to pay"
            emptyText="Great! You don't have any dues."
          />
        </div>
      </CardContent>
    </Card>
  );
}

export default DebtsOverview;
