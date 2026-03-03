import SummaryCard from "@/components/shared/Card/SummaryCard";
import { Wallet, TrendingDown, Scale, PiggyBank } from "lucide-react";

const SummarySection = () => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <SummaryCard
        label="মোট আয়"
        amount="৳২,৯২,০০০"
        trend="up"
        trendText="গত মাসে +৮%"
        icon={<Wallet className="h-5 w-5 text-primary" />}
      />

      <SummaryCard
        label="মোট ব্যয়"
        amount="৳১,৯৯,০০০"
        trend="down"
        trendText="গত মাসে -৫%"
        icon={<TrendingDown className="h-5 w-5 text-destructive" />}
      />

      <SummaryCard
        label="বর্তমান ব্যালেন্স"
        amount="৳৯৩,০০০"
        trend="up"
        trendText="+১২% বৃদ্ধি"
        icon={<Scale className="h-5 w-5 text-primary" />}
      />

      <SummaryCard
        label="মোট সঞ্চয়"
        amount="৳৯৭,০০০"
        trend="up"
        trendText="+১৫% বৃদ্ধি"
        icon={<PiggyBank className="h-5 w-5 text-primary" />}
      />
    </div>
  );
};

export default SummarySection;
