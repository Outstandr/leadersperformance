import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3 } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ProfitLeakIntroStepProps {
  onStart: () => void;
}

const ui = {
  en: {
    eyebrow: "Business Growth Intelligence",
    heading: "The Profit Leak Scan",
    subheading: "Where is your company leaking money?",
    description: "Most companies do not stop growing because of the market. They slow down because the structure behind the company can no longer support the growth.",
    bullets: [
      "Where your company is leaking money",
      "What is blocking the next growth phase",
      "What founders in your position typically fix first",
    ],
    bulletsHeading: "Answer the questions below and receive a Growth Barrier Report showing:",
    cta: "Start the Profit Leak Scan",
    time: "Time required: 3 minutes",
  },
  nl: {
    eyebrow: "Bedrijfsgroei Intelligentie",
    heading: "De Profit Leak Scan",
    subheading: "Waar lekt uw bedrijf geld?",
    description: "De meeste bedrijven stoppen niet met groeien vanwege de markt. Ze vertragen omdat de structuur achter het bedrijf de groei niet meer kan ondersteunen.",
    bullets: [
      "Waar uw bedrijf geld lekt",
      "Wat de volgende groeifase blokkeert",
      "Wat founders in uw positie meestal als eerste repareren",
    ],
    bulletsHeading: "Beantwoord de vragen hieronder en ontvang een Growth Barrier Report dat toont:",
    cta: "Start de Profit Leak Scan",
    time: "Benodigde tijd: 4 minuten",
  },
};

export function ProfitLeakIntroStep({ onStart }: ProfitLeakIntroStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;

  return (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-none border-2 border-lioner-gold/50 mb-4">
          <BarChart3 className="w-7 h-7 text-lioner-gold" />
        </div>
        <span className="block text-xs uppercase tracking-widest text-lioner-gold/70 font-semibold mb-3">
          {t.eyebrow}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2 font-sans">
          {t.heading}
        </h2>
        <p className="text-lg font-semibold text-foreground/80 mb-3">{t.subheading}</p>
        <p className="text-foreground/60 max-w-md mx-auto">{t.description}</p>
      </div>

      <p className="text-sm font-semibold text-foreground/70 mb-3">{t.bulletsHeading}</p>
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
