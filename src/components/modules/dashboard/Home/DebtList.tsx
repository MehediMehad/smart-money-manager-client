import { Badge } from "@/components/ui/badge";

const given = [
  { name: "রহিম", amount: "৳৫,০০০", date: "১৫ মার্চ ২০২৬", status: "বাকি" },
  {
    name: "করিম",
    amount: "৳৩,০০০",
    date: "১০ ফেব্রু ২০২৬",
    status: "পরিশোধিত",
  },
];

const received = [
  { name: "সালমা", amount: "৳১০,০০০", date: "২০ মার্চ ২০২৬", status: "বাকি" },
  { name: "জামিল", amount: "৳২,০০০", date: "০৫ জানু ২০২৬", status: "পরিশোধিত" },
];

const DebtTable = ({ title, data }: { title: string; data: typeof given }) => (
  <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
    <h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
    <div className="space-y-3">
      {data.map((item, i) => (
        <div
          key={i}
          className="flex items-center justify-between rounded-lg bg-muted/50 px-4 py-3"
        >
          <div>
            <p className="font-medium text-foreground">{item.name}</p>
            <p className="text-sm text-muted-foreground">{item.date}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-foreground">{item.amount}</span>
            <Badge
              variant={item.status === "পরিশোধিত" ? "secondary" : "destructive"}
            >
              {item.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DebtList = () => {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <DebtTable title="আপনি যাদের টাকা দিয়েছেন" data={given} />
      <DebtTable title="আপনি যাদের কাছে টাকা পেয়েছেন" data={received} />
    </div>
  );
};

export default DebtList;
