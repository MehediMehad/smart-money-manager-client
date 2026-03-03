import CTASection from "@/components/modules/common/Home/CTASection";
import FeaturesSection from "@/components/modules/common/Home/FeaturesSection";
import HeroSection from "@/components/modules/common/Home/HeroSection";
import HowItWorksSection from "@/components/modules/common/Home/HowItWorksSection";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </div>
  );
};

export default HomePage;
