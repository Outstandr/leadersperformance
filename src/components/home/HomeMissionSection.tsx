import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import lionelMission from "@/assets/lionel-mission.png";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const SCROLL_SPEED = 1.2;

export const HomeMissionSection = () => {
  const { t } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [atEnd, setAtEnd] = useState(false);

  const step = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop += SCROLL_SPEED;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
      setIsPlaying(false);
      setAtEnd(true);
      return;
    }
    animRef.current = requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      animRef.current = requestAnimationFrame(step);
    } else if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, step]);

  const toggle = () => {
    if (atEnd) {
      scrollRef.current?.scrollTo({ top: 0 });
      setAtEnd(false);
      setIsPlaying(true);
    } else {
      setIsPlaying((p) => !p);
    }
  };

  return (
    <section className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex items-center justify-between mb-12">
          <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold">
            {t("home.mission.eyebrow")}
          </p>
          <button
            onClick={toggle}
            className="flex items-center gap-2 bg-foreground text-background rounded-full px-6 py-3 text-sm font-medium tracking-wider uppercase hover:bg-foreground/90 transition-colors"
          >
            {atEnd ? (
              <><RotateCcw className="w-4 h-4" />{t("home.mission.restart")}</>
            ) : isPlaying ? (
              <><Pause className="w-4 h-4" />{t("home.mission.pause")}</>
            ) : (
              <><Play className="w-4 h-4" />{t("home.mission.read")}</>
            )}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="relative">
            <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
            <div
              ref={scrollRef}
              className="max-h-[70vh] overflow-y-auto scroll-smooth"
              style={{ scrollbarWidth: "none" }}
              onScroll={() => {
                const el = scrollRef.current;
                if (el && el.scrollTop + el.clientHeight >= el.scrollHeight - 2) {
                  setAtEnd(true);
                  setIsPlaying(false);
                } else {
                  setAtEnd(false);
                }
              }}
            >
              <div className="py-16 space-y-20">
                {/* MISSION */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    {t("home.mission.heading")}
                  </h2>
                  <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold">Leaders Performance</p>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                    {t("home.mission.tagline")}
                  </p>
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>{t("home.mission.p1")}</p>
                    <p>{t("home.mission.p2")}</p>
                    <p>{t("home.mission.p3")}</p>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm font-medium tracking-wide uppercase text-foreground">
                      {t("home.mission.pillarsIntro")}
                    </p>
                    <ol className="space-y-3 text-base md:text-lg text-muted-foreground leading-relaxed pl-1">
                      <li><span className="text-lioner-gold font-medium">1. {t("home.mission.pillar1")}</span>{t("home.mission.pillar1desc")}</li>
                      <li><span className="text-lioner-gold font-medium">2. {t("home.mission.pillar2")}</span>{t("home.mission.pillar2desc")}</li>
                      <li><span className="text-lioner-gold font-medium">3. {t("home.mission.pillar3")}</span>{t("home.mission.pillar3desc")}</li>
                      <li><span className="text-lioner-gold font-medium">4. {t("home.mission.pillar4")}</span>{t("home.mission.pillar4desc")}</li>
                    </ol>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide uppercase text-foreground">
                      {t("home.mission.createLeaders")}
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed pl-1">
                      <li>{t("home.mission.bullet1")}</li>
                      <li>{t("home.mission.bullet2")}</li>
                      <li>{t("home.mission.bullet3")}</li>
                      <li>{t("home.mission.bullet4")}</li>
                    </ul>
                  </div>
                  <div className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>{t("home.mission.notOptimize")}</p>
                    <p className="text-foreground font-medium">{t("home.mission.strengthen")}</p>
                  </div>
                </div>

                <div className="w-16 h-px bg-lioner-gold" />

                {/* VISION */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    {t("home.vision.heading")}
                  </h2>
                  <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold">Leaders Performance</p>
                  <p className="text-lg md:text-xl text-foreground leading-relaxed font-medium">
                    {t("home.vision.tagline")}
                  </p>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {t("home.vision.p1")}
                  </p>
                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide uppercase text-foreground">
                      {t("home.vision.futureLeaders")}
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed pl-1">
                      <li>{t("home.vision.b1")}</li>
                      <li>{t("home.vision.b2")}</li>
                      <li>{t("home.vision.b3")}</li>
                      <li>{t("home.vision.b4")}</li>
                      <li>{t("home.vision.b5")}</li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium tracking-wide uppercase text-foreground">
                      {t("home.vision.ecosystem")}
                    </p>
                    <ul className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed pl-1">
                      <li>{t("home.vision.e1")}</li>
                      <li>{t("home.vision.e2")}</li>
                      <li>{t("home.vision.e3")}</li>
                      <li>{t("home.vision.e4")}</li>
                    </ul>
                  </div>
                  <div className="space-y-2 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>{t("home.vision.notFollowers")}</p>
                    <p className="text-foreground font-medium">{t("home.vision.autonomous")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden sticky top-24">
            <img src={lionelMission} alt="Lionel Eersteling" className="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>
  );
};
