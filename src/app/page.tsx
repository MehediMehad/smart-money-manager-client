import CTASection from "@/components/modules/common/Home/CTASection";
import FeaturesSection from "@/components/modules/common/Home/FeaturesSection";
import Footer from "@/components/modules/common/Home/Footer";
import HeroSection from "@/components/modules/common/Home/HeroSection";
import HowItWorksSection from "@/components/modules/common/Home/HowItWorksSection";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
      <Footer /> */}
      <Link href={"/login"} className="text-3xl font-bold underline">
        Login!
      </Link>
    </div>
  );
};

export default HomePage;
