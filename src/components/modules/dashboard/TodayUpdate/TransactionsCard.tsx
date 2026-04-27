import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TransactionItem from "./TransactionItem";

const TransactionsCard = ({ todayTransactions }: any) => {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Today’s Transactions</CardTitle>
          <CardDescription>
            Latest income, expenses, and savings.
          </CardDescription>
        </div>

        <Button variant="ghost" size="sm">
          See All
        </Button>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {todayTransactions.map((tx: any, i: number) => (
            <TransactionItem key={i} tx={tx} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
