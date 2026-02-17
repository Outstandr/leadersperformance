import { HomeNavigation } from "@/components/home/HomeNavigation";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeTransitionSection } from "@/components/home/HomeTransitionSection";
import { HomeFeaturesGrid } from "@/components/home/HomeFeaturesGrid";
import { HomeStorySection } from "@/components/home/HomeStorySection";
import { HomeIntroSection } from "@/components/home/HomeIntroSection";
import { HomeOfferingsSection } from "@/components/home/HomeOfferingsSection";
import { HomeTestimonialsSection } from "@/components/home/HomeTestimonialsSection";
import { HomeInsightsSection } from "@/components/home/HomeInsightsSection";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";
import { HomeFinalCTA } from "@/components/home/HomeFinalCTA";
import { HomeFooter } from "@/components/home/HomeFooter";

const Index = () => {
  return (
    <div>
      <HomeNavigation />
      <main>
        <HomeHeroSection />
        {/* All sections after hero have solid bg so they scroll over the fixed image */}
        <HomeTransitionSection />
        <div className="relative z-10 bg-background">
          <HomeFeaturesGrid />
          <HomeIntroSection />
          <HomeStorySection />
          <HomeOfferingsSection />
          <HomeTestimonialsSection />
          <HomeInsightsSection />
          <HomeFAQSection />
          <HomeFinalCTA />
        </div>
      </main>
      <div className="relative z-10 bg-background">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Index;
