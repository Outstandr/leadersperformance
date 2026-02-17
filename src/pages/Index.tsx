import { HomeNavigation } from "@/components/home/HomeNavigation";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeTransitionSection } from "@/components/home/HomeTransitionSection";
import { HomeFeaturesGrid } from "@/components/home/HomeFeaturesGrid";
import { HomeMissionSection } from "@/components/home/HomeMissionSection";
import { HomeIntroSection } from "@/components/home/HomeIntroSection";
import { HomePillarsSection } from "@/components/home/HomePillarsSection";
import { HomeFooter } from "@/components/home/HomeFooter";
import { HomeFAQSection } from "@/components/home/HomeFAQSection";
import { HomeGoldLines } from "@/components/home/HomeGoldLines";
import { HomeArticlesSection } from "@/components/home/HomeArticlesSection";

const Index = () => {
  return (
    <div>
      <HomeNavigation />
      <main>
        <HomeHeroSection />
        <HomeTransitionSection />
        <div className="relative z-10 bg-background">
          <HomeGoldLines />
          <HomeFeaturesGrid />
          <HomeIntroSection />
          <HomeMissionSection />
          <HomePillarsSection />
          <HomeArticlesSection />
          <HomeFAQSection />
        </div>
      </main>
      <div className="relative z-10 bg-background">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Index;
