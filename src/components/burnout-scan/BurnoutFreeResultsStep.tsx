import { Button } from "@/components/ui/button";
import { BurnoutFreeResult } from "@/lib/burnoutScoring";
import { colorConfig } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { Lock, ArrowRight } from "lucide-react";

interface BurnoutFreeResultsStepProps {
  result: BurnoutFreeResult;
  onUnlockFull: () => void;
  isProcessing: boolean;
}

function ScoreGauge({ score, color }: { score: number; color: string }) {
  const c = colorConfig[color as keyof typeof colorConfig] || colorConfig.green;
  const dashOffset = 251.2 - (score / 100) * 251.2;

  return (
    <div className="relative w-36 h-36">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="40" stroke="rgba(0,0,0,0.08)" strokeWidth="8" fill="none" />
        <circle
          cx="48" cy="48" r="40"
          stroke={c.stroke}
          strokeWidth="8" fill="none"
          strokeDasharray="251.2"
          strokeDashoffset={dashOffset}
          strokeLinecap="butt"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-4xl font-black ${c.text}`}>{score}</span>
        <span className="text-xs text-foreground/40">/ 100</span>
      </div>
    </div>
  );
}

const ui = {
  en: {
    title: "Your Founder Burnout Risk Score",
    preliminary: "(Preliminary)",
    interpretation: "Interpretation",
    explanation: "You are showing signs of cumulative founder pressure. Many founders ignore these signals until performance drops or health collapses.",
    lowExplanation: "Your pressure indicators are within manageable range. Continue monitoring to maintain this position.",
    unlockTitle: "Unlock your Full Founder Burnout Diagnostic",
    unlockDesc: "The Founder Pressure Test identifies early warning signals. To determine your exact burnout phase and recovery timeline you need the full Founder Burnout Diagnostic.",
    unlockBullets: [
      "32 deep-diagnostic questions across 4 domains",
      "Exact burnout phase identification (1-5)",
      "Recovery timeline with and without intervention",
      "AI triage with Daisy, your founder advisor",
      "Direct booking for a Founder Intervention Call",
    ],
    unlockBtn: "Unlock Full Diagnostic — $195",
    processing: "Redirecting to payment...",
  },
  nl: {
    title: "Uw Founder Burnout Risk Score",
    preliminary: "(Voorlopig)",
    interpretation: "Interpretatie",
    explanation: "U toont tekenen van cumulatieve founder-druk. Veel founders negeren deze signalen totdat de prestaties dalen of de gezondheid instort.",
    lowExplanation: "Uw drukindicatoren bevinden zich binnen beheersbaar bereik. Blijf monitoren om deze positie te behouden.",
    unlockTitle: "Ontgrendel uw Volledige Founder Burnout Diagnostiek",
    unlockDesc: "De Founder Druktest identificeert vroege waarschuwingssignalen. Om uw exacte burnout-fase en hersteltijdlijn te bepalen, heeft u de volledige Founder Burnout Diagnostiek nodig.",
    unlockBullets: [
      "32 diep-diagnostische vragen over 4 domeinen",
      "Exacte burnout-fase identificatie (1-5)",
      "Hersteltijdlijn met en zonder interventie",
      "AI-triage met Daisy, uw founder-adviseur",
      "Directe boeking voor een Founder Interventie Gesprek",
    ],
    unlockBtn: "Ontgrendel Volledige Diagnostiek — $195",
    processing: "Doorsturen naar betaling...",
  },
};

export function BurnoutFreeResultsStep({ result, onUnlockFull, isProcessing }: BurnoutFreeResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const isLow = result.fbrScore <= 25;

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Score */}
      <div className="text-center space-y-3">
        <h2 className="text-xl md:text-2xl font-black text-foreground uppercase tracking-wide">
          {t.title}
        </h2>
        <p className="text-xs text-foreground/40">{t.preliminary}</p>
        <div className="flex justify-center">
          <ScoreGauge score={result.fbrScore} color={result.fbrColor} />
        </div>
        <div className={`inline-block px-4 py-2 ${colorConfig[result.fbrColor].bg} border ${colorConfig[result.fbrColor].border} ${colorConfig[result.fbrColor].text} text-sm font-bold uppercase tracking-widest`}>
          {result.fbrLabel[language]}
        </div>
      </div>

      {/* Interpretation */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2">
        <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.interpretation}</h4>
        <p className="text-foreground/80 leading-relaxed">
          {isLow ? t.lowExplanation : t.explanation}
        </p>
      </div>

      {/* Unlock CTA */}
      <div className="p-6 border-2 border-red-500/30 bg-red-500/5 space-y-4">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-red-500 shrink-0" />
          <h3 className="text-lg font-bold text-foreground">{t.unlockTitle}</h3>
        </div>
        <p className="text-sm text-foreground/70">{t.unlockDesc}</p>
        <div className="space-y-2">
          {t.unlockBullets.map((b, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
              <span className="text-xs text-foreground/70">{b}</span>
            </div>
          ))}
        </div>
        <Button
          onClick={onUnlockFull}
          disabled={isProcessing}
          className="w-full bg-red-600 hover:bg-red-700 text-white rounded-none py-5 text-base font-bold uppercase tracking-wider"
        >
          {isProcessing ? t.processing : (
            <>
              {t.unlockBtn}
              <ArrowRight className="w-5 h-5 ml-3" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
