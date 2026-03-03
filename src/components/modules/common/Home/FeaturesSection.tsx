import { TrendingUp, Target, HandCoins } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "আয় ও ব্যয় ট্র্যাকিং",
    description: "প্রতিদিনের আয়-ব্যয়ের হিসাব সহজভাবে সংরক্ষণ করুন।",
  },
  {
    icon: Target,
    title: "সঞ্চয় লক্ষ্য নির্ধারণ",
    description: "নির্দিষ্ট লক্ষ্য ঠিক করুন এবং অগ্রগতি দেখুন।",
  },
  {
    icon: HandCoins,
    title: "ধার-দেনা ব্যবস্থাপনা",
    description: "কে কত টাকা নিয়েছে বা দিয়েছে তা ভুলবেন না আর কখনও।",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-foreground md:text-4xl">
          আপনার অর্থ ব্যবস্থাপনার জন্য প্রয়োজনীয় সবকিছু
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
