const steps = [
  { number: "1", title: "Add Income & Expenses" },
  { number: "2", title: "Set Savings Goals" },
  { number: "3", title: "Analyze Reports" },
];

const HowItWorksSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-14 text-center text-3xl font-bold text-foreground md:text-4xl">
          How It Works
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700 text-2xl font-bold text-primary-foreground shadow-md">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
