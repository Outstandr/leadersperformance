import { Button } from "@/components/ui/button";
import { ArrowRight, Activity } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ScanIntroStepProps {
  onStart: () => void;
}

const ui = {
  en: {
    eyebrow: "Founder Strategic Advisory",
    heading: "Founders Pressure Scan",
    description: "Discover where decision bottlenecks, founder dependency and leadership misalignment are creating hidden pressure in your company.",
    bullets: [
      "12 targeted questions across 4 critical dimensions",
      "Instant pressure score with traffic-light diagnosis",
      "Personalized strategic recommendations",
    ],
    cta: "Start the Scan",
    time: "Takes approximately 3 minutes",
  },
  nl: {
    eyebrow: "Founder Strategisch Advies",
    heading: "Founders Drukscan",
    description: "Ontdek waar beslissingsknelpunten, founderafhankelijkheid en leiderschapsmisafstemming verborgen druk creëren in uw bedrijf.",
    bullets: [
      "12 gerichte vragen over 4 kritieke dimensies",
      "Directe drukscore met stoplichtdiagnose",
      "Gepersonaliseerde strategische aanbevelingen",
    ],
    cta: "Start de scan",
    time: "Duurt ongeveer 3 minuten",
  },
};

export function ScanIntroStep({ onStart }: ScanIntroStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;

  return (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-none border-2 border-lioner-gold/50 mb-4">
          <Activity className="w-7 h-7 text-lioner-gold" />
        </div>
        <span className="block text-xs uppercase tracking-widest text-lioner-gold/70 font-semibold mb-3">
          {t.eyebrow}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 font-sans">
          {t.heading}
        </h2>
        <p className="text-foreground/60 max-w-md mx-auto">
          {t.description}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {t.bullets.map((bullet, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className="w-2 h-2 rounded-full bg-lioner-gold mt-2 shrink-0" />
            <span className="text-sm text-foreground/80">{bullet}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onStart}
        className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider"
      >
        {t.cta}
        <ArrowRight className="w-5 h-5 ml-3" />
      </Button>

      <p className="text-xs text-center text-foreground/30 mt-4">{t.time}</p>
    </div>
  );
}
