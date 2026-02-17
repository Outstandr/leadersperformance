import { HomeNavigation } from "@/components/home/HomeNavigation";
import { HomeHeroSection } from "@/components/home/HomeHeroSection";
import { HomeTransitionSection } from "@/components/home/HomeTransitionSection";
import { HomeFeaturesGrid } from "@/components/home/HomeFeaturesGrid";
import { HomeStorySection } from "@/components/home/HomeStorySection";
import { HomeIntroSection } from "@/components/home/HomeIntroSection";
import { HomePillarsSection } from "@/components/home/HomePillarsSection";
import { HomeFooter } from "@/components/home/HomeFooter";

const Index = () => {
  return (
    <div>
      <HomeNavigation />
      <main>
        <HomeHeroSection />
        <HomeTransitionSection />
        <div className="relative z-10 bg-background">
          <HomeFeaturesGrid />
          <HomeIntroSection />
          <HomeStorySection />
          <HomePillarsSection />
        </div>
      </main>
      <div className="relative z-10 bg-background">
        <HomeFooter />
      </div>
    </div>
  );
};

export default Index;
