import { ArrowDownLeft, ArrowUpRight, Clock, WalletCards } from "lucide-react";
import StatsCard from "./StatsCard";
import { TDebtMeta } from "@/types/debts";

type Props = {
  meta?: TDebtMeta | null;
};

const formatCurrency = (value?: number) => {
  return `৳${Number(value || 0).toLocaleString()}`;
};

const SummaryCards = ({ meta }: Props) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatsCard
        title="People Owe You"
        value={formatCurrency(meta?.totalGiven)}
        caption="Total receivable"
        icon={<ArrowDownLeft />}
        color="green"
      />

      <StatsCard
        title="You Owe"
        value={formatCurrency(meta?.totalTaken)}
        caption="Total payable"
        icon={<ArrowUpRight />}
        color="red"
      />

      <StatsCard
        title="Upcoming Receive"
        value={formatCurrency(meta?.upcomingReceivableIn7Days)}
        caption="Due within 7 days"
        icon={<Clock />}
        color="blue"
      />

      <StatsCard
        title="Upcoming Payable"
        value={formatCurrency(meta?.upcomingPayableIn7Days)}
        caption="Due within 7 days"
        icon={<WalletCards />}
        color="purple"
      />
    </div>
  );
};

export default SummaryCards;
