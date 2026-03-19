import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";

export const HomePillarsSection = () => {
  const { t } = useLanguage();
  const { openVoiceAgent } = useVoiceAgent();

  const steps = [
    { title: t("home.pillars.title1"), description: t("home.pillars.desc1") },
    { title: t("home.pillars.title2"), description: t("home.pillars.desc2") },
    { title: t("home.pillars.title3"), description: t("home.pillars.desc3") },
    { title: t("home.pillars.title4"), description: t("home.pillars.desc4") },
    { title: t("home.pillars.title5"), description: t("home.pillars.desc5") },
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const idx = Math.min(Math.floor(v * steps.length), steps.length - 1);
    setActiveIndex(idx);
  });

  const formattedNumber = String(activeIndex + 1);

  // Split description into paragraphs and render bullet points
  const renderDescription = (desc: string) => {
    return desc.split("\n\n").map((block, i) => {
      if (block.startsWith("•") || block.includes("\n•")) {
        const lines = block.split("\n").filter(Boolean);
        return (
          <ul key={i} className={`space-y-1 ${i > 0 ? "mt-4" : ""}`}>
            {lines.map((line, j) => (
              <li key={j} className="text-base text-muted-foreground flex items-start gap-2">
                <span className="text-lioner-gold mt-1.5 shrink-0">•</span>
                <span>{line.replace(/^•\s*/, "")}</span>
              </li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className={`text-base md:text-lg text-muted-foreground leading-relaxed ${i > 0 ? "mt-4" : ""}`}>
          {block}
        </p>
      );
    });
  };

  return (
    <section ref={containerRef} className="relative bg-background" style={{ height: `${steps.length * 100}vh` }}>
      {/* Decorative gold swirling lines */}
      <div className="sticky top-0 h-screen pointer-events-none z-0 overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1400 900"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M-100,200 C200,100 300,500 600,300 S900,600 1200,200 S1500,400 1600,300" stroke="hsl(42 35% 53% / 0.12)" strokeWidth="1.5" fill="none" />
          <path d="M-50,500 C150,200 400,700 700,400 S1000,100 1300,500 S1500,200 1600,400" stroke="hsl(42 35% 53% / 0.08)" strokeWidth="1" fill="none" />
          <path d="M100,100 C300,400 500,50 800,350 S1100,700 1400,150" stroke="hsl(42 35% 53% / 0.10)" strokeWidth="1.2" fill="none" />
          <path d="M-200,600 C100,300 350,800 650,450 S950,50 1250,600 S1450,300 1600,500" stroke="hsl(42 35% 53% / 0.06)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      {/* Sticky content panel */}
      <div className="sticky top-0 h-screen z-10" style={{ marginTop: `-100vh` }}>
        <div className="container mx-auto px-6 max-w-7xl h-full flex items-center">
          <div className="w-full flex items-center justify-between">
            {/* Left: step text */}
            <div className="max-w-lg">
              <p className="text-xs font-medium tracking-[0.3em] uppercase text-lioner-gold mb-4">
                {t("home.pillars.eyebrow")}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-medium text-foreground/60 mb-8">
                {t("home.pillars.heading")}
              </h2>
              <motion.h3
                key={`title-${activeIndex}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight tracking-tight text-foreground mb-6"
              >
                {steps[activeIndex].title}
              </motion.h3>
              <motion.div
                key={`desc-${activeIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="mb-8"
              >
                {renderDescription(steps[activeIndex].description)}
              </motion.div>
              <button
                onClick={() => openVoiceAgent()}
                className="inline-block border border-lioner-gold text-lioner-gold px-8 py-3 text-sm font-medium tracking-widest uppercase hover:bg-lioner-gold hover:text-white transition-all duration-300"
              >
                {t("home.pillars.cta")}
              </button>
            </div>

            {/* Right: large number */}
            <motion.span
              key={formattedNumber}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 0.15, y: 0 }}
              transition={{ duration: 0.4 }}
              className="font-serif text-[12rem] md:text-[18rem] lg:text-[24rem] font-bold leading-none text-lioner-gold select-none hidden md:block"
            >
              {formattedNumber}
            </motion.span>
          </div>
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="sticky bottom-8 z-20 flex flex-col items-center animate-bounce pointer-events-none">
        <ChevronDown className="w-10 h-10 text-foreground/70" />
        <ChevronDown className="w-10 h-10 text-foreground/40 -mt-5" />
      </div>

      {/* Invisible scroll spacers — one per step to drive scrollYProgress */}
      <div className="relative z-0">
        {steps.map((_, i) => (
          <div key={i} className="h-screen" />
        ))}
      </div>
    </section>
  );
};
