import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import TransactionItem from "./TransactionItem";
import { Transaction } from "@/types";

type Props = {
  todayTransactions: Transaction[];
};

const TransactionsCard = ({ todayTransactions }: Props) => {
  const hasTransactions = todayTransactions?.length > 0;

  return (
    <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-slate-950">
          Today’s Transactions
        </CardTitle>
        <CardDescription>
          Today’s income, expenses, and savings.
        </CardDescription>
      </CardHeader>

      <CardContent>
        {hasTransactions ? (
          <div className="space-y-3">
            {todayTransactions.map((tx, i) => (
              <TransactionItem key={i} tx={tx} />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
            <div className="mb-5 text-6xl">🗂️🔍</div>

            <h3 className="text-lg font-bold text-slate-950">
              No transactions yet
            </h3>
            <p className="mt-1 text-sm text-slate-500">
              Add your first income or expense to get started.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TransactionsCard;
