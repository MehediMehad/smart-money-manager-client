import FeaturesSection from "@/components/modules/common/Home/FeaturesSection";
import HeroSection from "@/components/modules/common/Home/HeroSection";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
    </div>
  );
};

export default HomePage;
