import { useEffect, useState } from "react";
import logoWhite from "@/assets/logo-white.png";
import heroBg from "@/assets/hero-dubai-skyline-new.png";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";


export const HomeHeroSection = () => {
  const { t } = useLanguage();
  const { openVoiceAgent } = useVoiceAgent();
  const [fadeOpacity, setFadeOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowH = window.innerHeight;
      const progress = Math.min(Math.max((scrollY - windowH * 0.1) / (windowH * 0.4), 0), 1);
      setFadeOpacity(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed background with Dubai cityscape */}
      <div className="fixed inset-0 z-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover object-center" width={1920} height={1080} fetchPriority="high" />
        <div className="absolute inset-0 bg-foreground/20" />
        <div
          className="absolute inset-0 bg-background transition-none"
          style={{ opacity: fadeOpacity }}
        />
      </div>

      {/* Hero content */}
      <section className="relative z-10 h-screen flex flex-col justify-end pb-[15rem] sm:pb-[15rem] md:pb-[15rem] lg:pb-[15rem]">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 w-full">
            <div className="flex flex-col gap-5 max-w-3xl">
              <h1 className="font-serif text-[clamp(2.75rem,8vw,6.5rem)] font-medium text-background leading-[1.05] tracking-tight">
                {t("home.hero.headline1")}
                <br />
                <span className="text-lioner-gold italic">{t("home.hero.headline2")} {t("home.hero.headline3")}</span>
              </h1>
              <p className="text-background/90 font-normal text-sm sm:text-base md:text-lg leading-relaxed max-w-md drop-shadow-md">
                {t("home.hero.description")}
              </p>
            </div>
            <button
              onClick={openVoiceAgent}
              className="inline-flex items-center gap-3 bg-lioner-gold text-foreground rounded-full px-6 sm:px-8 py-3.5 sm:py-4 text-xs sm:text-sm font-medium tracking-wider uppercase hover:bg-lioner-gold/90 transition-colors whitespace-nowrap self-start md:self-end shrink-0"
            >
              {t("home.hero.cta")}
              <span className="w-2 h-2 rounded-full bg-foreground/40" />
            </button>
          </div>
        </div>
      </section>

      {/* Bottom gradient fade */}
      <div className="relative z-10 h-32 md:h-48 -mt-32 md:-mt-48 bg-gradient-to-b from-transparent to-background pointer-events-none" />
    </>
  );
};
