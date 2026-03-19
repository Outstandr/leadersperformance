import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, RotateCcw, ChevronDown } from "lucide-react";
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
        <div className="mb-12 space-y-4">
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
          <div className="flex flex-col items-start mt-4 animate-bounce">
            <ChevronDown className="w-10 h-10 text-foreground/70" />
            <ChevronDown className="w-10 h-10 text-foreground/40 -mt-5" />
          </div>
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
                {/* ABOUT LIONEL */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    {t("home.mission.heading")}
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>{t("home.about.p1")}</p>
                    <p>{t("home.about.p2")}</p>
                    <p>{t("home.about.p3")}</p>
                    <p>{t("home.about.p4")}</p>
                    <p>{t("home.about.p5")}</p>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>{t("home.about.b1")}</li>
                      <li>{t("home.about.b2")}</li>
                      <li>{t("home.about.b3")}</li>
                      <li>{t("home.about.b4")}</li>
                      <li>{t("home.about.b5")}</li>
                    </ul>
                    <p>{t("home.about.closing")}</p>
                  </div>
                </div>

                <div className="w-16 h-px bg-lioner-gold" />

                {/* MISSION */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    {t("home.missionNew.heading")}
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p className="text-foreground font-medium">{t("home.missionNew.tagline")}</p>
                    <p>{t("home.missionNew.p1")}</p>
                    <p>{t("home.missionNew.p2")}</p>
                    <p>{t("home.missionNew.p3")}</p>
                    <p>{t("home.missionNew.p4")}</p>
                  </div>
                </div>

                <div className="w-16 h-px bg-lioner-gold" />

                {/* VISION */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    {t("home.visionNew.heading")}
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p className="text-foreground font-medium">{t("home.visionNew.tagline")}</p>
                    <p>{t("home.visionNew.p1")}</p>
                    <p>{t("home.visionNew.p2")}</p>
                    <p>{t("home.visionNew.p3")}</p>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>{t("home.visionNew.b1")}</li>
                      <li>{t("home.visionNew.b2")}</li>
                      <li>{t("home.visionNew.b3")}</li>
                      <li>{t("home.visionNew.b4")}</li>
                      <li>{t("home.visionNew.b5")}</li>
                    </ul>
                    <p>{t("home.visionNew.closing")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-[3/4] overflow-hidden sticky top-24">
            <img src={lionelMission} alt="Lionel Eersteling" className="w-full h-full object-cover" width={600} height={800} loading="lazy" />
          </div>
        </div>
      </div>
      {/* Scroll down indicator */}
      <div className="flex flex-col items-center mt-12 animate-bounce">
        <ChevronDown className="w-10 h-10 text-foreground/70" />
        <ChevronDown className="w-10 h-10 text-foreground/40 -mt-5" />
      </div>
    </section>
  );
};
