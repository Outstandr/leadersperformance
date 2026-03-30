import { useLanguage } from "@/lib/i18n/LanguageContext";
import { revenueOptions } from "@/lib/profitLeakQuestions";

interface ProfitLeakRevenueStepProps {
  onSelect: (value: string) => void;
}

const ui = {
  en: {
    heading: "Step 1 — Company Revenue",
    question: "What is your company's current annual revenue?",
  },
  nl: {
    heading: "Stap 1 — Bedrijfsomzet",
    question: "Wat is de huidige jaaromzet van uw bedrijf?",
  },
};

export function ProfitLeakRevenueStep({ onSelect }: ProfitLeakRevenueStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;

  return (
    <div className="p-6 md:p-10">
      <div className="text-center mb-8">
        <span className="block text-xs uppercase tracking-widest text-lioner-gold font-semibold mb-3">
          {t.heading}
        </span>
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2 font-sans">
          {t.question}
        </h2>
      </div>

      <div className="space-y-3">
        {revenueOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="w-full p-4 border-2 border-foreground/10 hover:border-lioner-gold/60 hover:bg-lioner-gold/5 transition-all text-left font-semibold text-foreground"
          >
            {opt.label[language]}
          </button>
        ))}
      </div>
    </div>
  );
}
