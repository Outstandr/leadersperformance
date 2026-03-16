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
                    About Lionel
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p>Lionel Eersteling is the founder of Leaders Performance, a boutique advisory platform built for founders who take their companies seriously.</p>
                    <p>A former professional athlete with more than 25 years of experience in human performance, leadership and entrepreneurship, Lionel combines performance discipline with strategic business thinking.</p>
                    <p>Over the past decades he has built and scaled companies across multiple industries and worked alongside founders navigating growth, leadership challenges and complex business environments.</p>
                    <p>Today he works with a limited number of founders each year as a strategic sparring partner.</p>
                    <p>His role is not to coach from the sidelines, but to work alongside founders to:</p>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>sharpen strategic thinking</li>
                      <li>challenge blind spots</li>
                      <li>strengthen leadership discipline</li>
                      <li>improve execution inside the company</li>
                      <li>protect the capital they have built</li>
                    </ul>
                    <p>Leaders Performance operates as a boutique leadership infrastructure, supported by an international network of specialists when situations require legal, investigative or strategic expertise.</p>
                  </div>
                </div>

                <div className="w-16 h-px bg-lioner-gold" />

                {/* MISSION */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    Our Mission
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p className="text-foreground font-medium">To strengthen the founder behind the company.</p>
                    <p>At Leaders Performance we believe that companies rarely fail because of ideas.</p>
                    <p>They fail because leadership becomes unclear, decisions lose sharpness, and execution drifts.</p>
                    <p>Our mission is to help founders build companies with stronger foundations through disciplined thinking, clear leadership and structured execution.</p>
                    <p>We do this through strategic sparring, focused intervention environments and leadership infrastructure designed for founders who are serious about building enduring companies.</p>
                  </div>
                </div>

                <div className="w-16 h-px bg-lioner-gold" />

                {/* VISION */}
                <div className="space-y-8">
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight tracking-tight text-foreground">
                    Our Vision
                  </h2>
                  <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                    <p className="text-foreground font-medium">To build an environment where founders develop the clarity, discipline and leadership required to build resilient companies.</p>
                    <p>As technology accelerates and markets move faster than ever, the real competitive advantage will not be tools or tactics.</p>
                    <p>It will be leadership.</p>
                    <p>The future belongs to founders who combine:</p>
                    <ul className="space-y-2 pl-5 list-disc">
                      <li>strategic clarity</li>
                      <li>disciplined execution</li>
                      <li>strong leadership</li>
                      <li>technological awareness</li>
                      <li>personal resilience</li>
                    </ul>
                    <p>Leaders Performance exists to support those founders.</p>
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
    </section>
  );
};
