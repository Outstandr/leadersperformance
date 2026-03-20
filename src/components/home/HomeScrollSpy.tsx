import { useEffect, useState, useRef } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const processSteps = [
  { index: 0, labelEn: "SITUATION ASSESSMENT", labelNl: "SITUATIEBEOORDELING" },
  { index: 1, labelEn: "STRATEGIC DIAGNOSIS", labelNl: "STRATEGISCHE DIAGNOSE" },
  { index: 2, labelEn: "INTERVENTION ENVIRONMENT", labelNl: "INTERVENTIEOMGEVING" },
  { index: 3, labelEn: "STRUCTURAL RESET", labelNl: "STRUCTURELE RESET" },
  { index: 4, labelEn: "STRATEGIC CONTINUATION", labelNl: "STRATEGISCHE CONTINUÏTEIT" },
];

export const HomeScrollSpy = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const pillarsEl = document.getElementById("pillars");
      if (!pillarsEl) return;

      const rect = pillarsEl.getBoundingClientRect();
      const sectionHeight = pillarsEl.offsetHeight;
      const windowHeight = window.innerHeight;

      // Show only when pillars section is in view
      const inView = rect.top < windowHeight * 0.5 && rect.bottom > windowHeight * 0.5;
      setIsVisible(inView);

      if (inView) {
        const scrolled = -rect.top;
        const scrollableHeight = sectionHeight - windowHeight;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableHeight));
        const idx = Math.min(Math.floor(progress * processSteps.length), processSteps.length - 1);
        setActiveStep(idx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
      {processSteps.map(({ index, labelEn, labelNl }) => {
        const isActive = activeStep === index;
        const label = language === "nl" ? labelNl : labelEn;
        return (
          <button
            key={index}
            className="group flex items-center gap-3 cursor-default"
            aria-label={label}
          >
            <span
              className={`text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 ${
                isActive
                  ? "text-lioner-gold opacity-100"
                  : "text-foreground/50 opacity-0 group-hover:opacity-100"
              }`}
            >
              {label}
            </span>
            <span
              className={`rounded-full border-2 transition-all duration-300 ${
                isActive
                  ? "w-4 h-4 bg-lioner-gold border-lioner-gold"
                  : "w-3 h-3 border-foreground/30 group-hover:border-foreground/60"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
};
