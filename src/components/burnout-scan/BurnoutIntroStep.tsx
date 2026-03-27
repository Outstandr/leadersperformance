import { Button } from "@/components/ui/button";
import { ArrowRight, Flame } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface BurnoutIntroStepProps {
  onStart: () => void;
}

const ui = {
  en: {
    eyebrow: "Founder Risk Intelligence",
    heading: "The Founder Risk Assessment",
    description: "Discover your Founder Risk Score. Identify whether you are approaching burnout or already operating in a burnout phase.",
    bullets: [
      "10 targeted questions across 5 pressure indicators",
      "Instant FBR Score with risk classification",
      "Unlock the Full Diagnostic for your complete burnout phase analysis",
    ],
    cta: "Take the Founder Pressure Test",
    time: "Takes approximately 90 seconds",
  },
  nl: {
    eyebrow: "Founder Risico Intelligentie",
    heading: "The Founder Risk Assessment",
    description: "Ontdek uw Founder Risk Score. Identificeer of u burnout nadert of al in een burnout-fase opereert.",
    bullets: [
      "10 gerichte vragen over 5 drukindicatoren",
      "Directe FBR Score met risicoclassificatie",
      "Ontgrendel de Volledige Diagnostiek voor uw complete burnout-faseanalyse",
    ],
    cta: "Doe de Founder Druktest",
    time: "Duurt ongeveer 90 seconden",
  },
};

export function BurnoutIntroStep({ onStart }: BurnoutIntroStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;

  return (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-none border-2 border-red-500/50 mb-4">
          <Flame className="w-7 h-7 text-red-500" />
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
            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
            <span className="text-sm text-foreground/80">{bullet}</span>
          </div>
        ))}
      </div>

      <Button
        onClick={onStart}
        className="w-full bg-red-600 hover:bg-red-700 text-white rounded-none py-6 text-base font-bold uppercase tracking-wider"
      >
        {t.cta}
        <ArrowRight className="w-5 h-5 ml-3" />
      </Button>

      <p className="text-xs text-center text-foreground/30 mt-4">{t.time}</p>
    </div>
  );
}
