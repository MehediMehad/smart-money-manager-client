import { TrendingUp, Target, HandCoins } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Income & Expense Tracking",
    description: "Easily keep records of your daily income and expenses.",
  },
  {
    icon: Target,
    title: "Set Savings Goals",
    description: "Set specific goals and track your progress.",
  },
  {
    icon: HandCoins,
    title: "Debt Management",
    description: "Never forget who borrowed or paid how much money again.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          Everything You Need to Manage Your Money
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-border bg-card p-8 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <div className="mb-5 inline-flex rounded-xl bg-accent p-3">
                <feature.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
