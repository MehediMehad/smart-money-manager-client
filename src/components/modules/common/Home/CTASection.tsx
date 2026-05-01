import Link from "next/link";

const CTASection = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold text-accent-foreground md:text-4xl">
          Start Managing Your Money Today.
        </h2>
        <Link
          href="/dashboard"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg hover:opacity-90 transition-all duration-200 hover:shadow-xl"
        >
          Go to Dashboard
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
