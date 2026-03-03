import { Progress } from "@/components/ui/progress";

const savingsGoals = [
  { name: "নতুন ল্যাপটপ", target: 50000, saved: 20000 },
  { name: "জরুরি তহবিল", target: 100000, saved: 65000 },
  { name: "ভ্রমণ ফান্ড", target: 30000, saved: 12000 },
];

const SavingsGoals = () => {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-foreground">
        সঞ্চয় লক্ষ্য
      </h3>
      <div className="space-y-6">
        {savingsGoals.map((goal, i) => {
          const percentage = Math.round((goal.saved / goal.target) * 100);
          return (
            <div key={i}>
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-foreground">{goal.name}</span>
                <span className="text-sm text-muted-foreground">
                  {percentage}%
                </span>
              </div>
              <Progress value={percentage} className="h-2.5 mb-2" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>সঞ্চিত: ৳{goal.saved.toLocaleString("bn-BD")}</span>
                <span>লক্ষ্য: ৳{goal.target.toLocaleString("bn-BD")}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SavingsGoals;
