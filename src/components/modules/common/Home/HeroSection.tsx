import dashboardPreview from "@/assets/dashboard-preview.png";
import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl text-foreground animate-fade-in">
          Smart Money Manager
        </h1>
        <p
          className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground animate-fade-in"
          style={{ animationDelay: "0.15s" }}
        >
          Track your income and expenses, grow your savings, and manage debts
          easily all in one place.
        </p>
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in"
          style={{ animationDelay: "0.3s" }}
        >
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg hover:opacity-90 transition-all duration-200 hover:shadow-xl bg-gradient-to-r from-emerald-700 to-teal-600 hover:from-emerald-800 hover:to-teal-700"
          >
            Get Started
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-8 py-3 text-base font-semibold text-gray-600 hover:bg-accent transition-all duration-200"
          >
            View Dashboard
          </Link>
        </div>
        <div
          className="mx-auto max-w-4xl animate-fade-in"
          style={{ animationDelay: "0.45s" }}
        >
          <div className="rounded-2xl border border-border bg-card shadow-2xl overflow-hidden">
            <Image
              src={dashboardPreview}
              alt="Smart Money Manager dashboard preview"
              width={1000}
              height={1000}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
