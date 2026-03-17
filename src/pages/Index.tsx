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
          <div className="flex flex-col items-center py-4 gap-3">
            <span className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase">
              About Leaders Performance
              <span className="w-2 h-2 rounded-full bg-lioner-gold" />
            </span>
            <p className="font-serif text-xl md:text-2xl text-lioner-gold italic leading-relaxed max-w-lg text-center">
              Leaders Performance is where founders sharpen strategy, strengthen leadership and protect what they have built.
            </p>
          </div>
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
