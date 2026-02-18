import { useEffect, useState } from "react";
import logoWhite from "@/assets/logo-white.png";
import heroBg from "@/assets/hero-dubai-dark.webp";
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
        <img src={heroBg} alt="" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-foreground/20" />
        <div
          className="absolute inset-0 bg-background transition-none"
          style={{ opacity: fadeOpacity }}
        />
      </div>

      {/* Hero content */}
      <section className="relative z-10 h-screen flex flex-col justify-end pb-24 md:pb-32">
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end w-full">
            <div>
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium text-background leading-[1.05] tracking-tight">
                {t("home.hero.headline1")}
                <br />
                {t("home.hero.headline2")}
                <br />
                <span className="text-lioner-gold italic">{t("home.hero.headline3")}</span>
              </h1>
            </div>
            <div className="flex flex-col items-start md:items-end gap-6">
              <p className="text-background/80 text-base md:text-lg leading-relaxed max-w-md md:text-right">
                {t("home.hero.description")}
              </p>
              <button
                onClick={openVoiceAgent}
                className="inline-flex items-center gap-3 bg-lioner-gold text-foreground rounded-full px-8 py-4 text-sm font-medium tracking-wider uppercase hover:bg-lioner-gold/90 transition-colors"
              >
                {t("home.hero.cta")}
                <span className="w-2 h-2 rounded-full bg-foreground/40" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom gradient fade */}
      <div className="relative z-10 h-32 md:h-48 -mt-32 md:-mt-48 bg-gradient-to-b from-transparent to-background" />
    </>
  );
};
