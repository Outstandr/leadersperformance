import { HomeNavigation } from "@/components/home/HomeNavigation";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeFeaturesGrid } from "@/components/home/HomeFeaturesGrid";
import { HomeShowcaseSection } from "@/components/home/HomeShowcaseSection";
import { HomeIntroSection } from "@/components/home/HomeIntroSection";
import { HomeOfferingsSection } from "@/components/home/HomeOfferingsSection";
import { HomeTestimonialsSection } from "@/components/home/HomeTestimonialsSection";
import { HomeInsightsSection } from "@/components/home/HomeInsightsSection";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";
import { HomeFinalCTA } from "@/components/home/HomeFinalCTA";
import { HomeFooter } from "@/components/home/HomeFooter";

const Index = () => {
  return (
    <div className="bg-background">
      <HomeNavigation />
      <main>
        <HomeHeroSection />
        <HomeFeaturesGrid />
        <HomeShowcaseSection />
        <HomeIntroSection />
        <HomeOfferingsSection />
        <HomeTestimonialsSection />
        <HomeInsightsSection />
        <HomeFAQSection />
        <HomeFinalCTA />
      </main>
      <HomeFooter />
    </div>
  );
};

export default Index;
