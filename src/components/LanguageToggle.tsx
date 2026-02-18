import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { Language } from "@/lib/i18n/LanguageContext";

export const LanguageToggle = ({ dark = false }: { dark?: boolean }) => {
  const { language, setLanguage } = useLanguage();

  const toggle = (lang: Language) => setLanguage(lang);

  const baseClass = "text-[11px] font-semibold tracking-widest uppercase px-2 py-0.5 transition-all duration-200";
  const activeClass = dark
    ? "text-background border-b-2 border-lioner-gold"
    : "text-foreground border-b-2 border-lioner-gold";
  const inactiveClass = dark
    ? "text-background/40 hover:text-background/70"
    : "text-muted-foreground hover:text-foreground";

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => toggle("en")}
        className={`${baseClass} ${language === "en" ? activeClass : inactiveClass}`}
      >
        EN
      </button>
      <span className={`text-[10px] ${dark ? "text-background/30" : "text-muted-foreground/30"}`}>|</span>
      <button
        onClick={() => toggle("nl")}
        className={`${baseClass} ${language === "nl" ? activeClass : inactiveClass}`}
      >
        NL
      </button>
    </div>
  );
};
