import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const sections = [
  { id: "home", labelEn: "HOME", labelNl: "HOME" },
  { id: "features", labelEn: "WHAT WE DO", labelNl: "WAT WE DOEN" },
  { id: "about", labelEn: "ABOUT ME", labelNl: "OVER MIJ" },
  { id: "mission", labelEn: "OUR PURPOSE", labelNl: "ONS DOEL" },
  { id: "pillars", labelEn: "OUR PROCESS", labelNl: "ONS PROCES" },
  { id: "articles", labelEn: "ARTICLES", labelNl: "ARTIKELEN" },
  { id: "faq", labelEn: "FAQ", labelNl: "FAQ" },
];

export const HomeScrollSpy = () => {
  const [activeSection, setActiveSection] = useState("home");
  const { language } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          // Pick the one with highest intersection ratio
          const best = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActiveSection(best.target.id);
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-3">
      {sections.map(({ id, labelEn, labelNl }) => {
        const isActive = activeSection === id;
        const label = language === "nl" ? labelNl : labelEn;
        return (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            className="group flex items-center gap-3 cursor-pointer"
            aria-label={`Scroll to ${label}`}
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
