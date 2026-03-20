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
          <div className="flex flex-col items-center pt-[54px] pb-4 gap-[50px]">
            <span className="inline-flex items-center gap-3 bg-foreground text-background rounded-full px-8 py-4 text-xs font-medium tracking-[0.2em] uppercase">
              About Leaders Performance
              <span className="w-2 h-2 rounded-full bg-lioner-gold" />
            </span>
            <p className="font-serif text-lg md:text-3xl text-lioner-gold italic leading-relaxed max-w-2xl text-center">
              Leaders Performance is where founders sharpen strategy,
              <br className="hidden md:block" />
              strengthen leadership and protect what they have built.
            </p>
          </div>
          <HomeMissionSection />
          <section className="py-12 bg-[hsl(var(--lioner-charcoal))]">
            <div className="container mx-auto px-4 max-w-4xl text-center">
              <blockquote className="text-xl md:text-2xl lg:text-3xl font-light text-white leading-relaxed italic">
                "I help founders see where their company is leaking money — and fix the structure behind it."
              </blockquote>
              <p className="mt-6 text-2xl md:text-3xl text-[hsl(var(--lioner-gold))] font-semibold font-serif">- Lionel -</p>
            </div>
          </section>
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
