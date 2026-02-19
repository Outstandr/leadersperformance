import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AuditUserInfo, AuditInsights } from "./CorporateAuditDialog";
import { AuditScores } from "@/lib/corporateAuditScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface AuditResultsStepProps {
  userInfo: AuditUserInfo;
  scores: AuditScores;
  insights: AuditInsights | null;
  onClose: () => void;
}

const ui = {
  en: {
    verdict: "The Verdict",
    hereIsScore: "here's your Discipline Score.",
    realityCheck: "The Reality Check",
    actionPlan: "The Action Plan",
    ctaBtn: "Review This Audit With Lionel",
    warning: "Warning: Do not book unless you are ready to change the score.",
    close: "Close",
  },
  nl: {
    verdict: "Het Resultaat",
    hereIsScore: "hier is jouw Team Audit Score.",
    realityCheck: "De realiteitscheck",
    actionPlan: "Het actieplan",
    ctaBtn: "Bespreek deze audit met Lionel",
    warning: "Waarschuwing: boek alleen als je klaar bent om de score te veranderen.",
    close: "Sluiten",
  },
};

function ScoreGauge({ score, tier }: { score: number; tier: string }) {
  const getColor = () => {
    if (score <= 50) return { stroke: "#ef4444", text: "text-red-500", bg: "bg-red-500" };
    if (score <= 79) return { stroke: "#eab308", text: "text-yellow-500", bg: "bg-yellow-500" };
    return { stroke: "#22c55e", text: "text-green-500", bg: "bg-green-500" };
  };
  const color = getColor();
  const dashOffset = 251.2 - (score / 100) * 251.2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" stroke="rgba(0,0,0,0.08)" strokeWidth="8" fill="none" />
          <circle
            cx="48"
            cy="48"
            r="40"
            stroke={color.stroke}
            strokeWidth="8"
            fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={dashOffset}
            strokeLinecap="butt"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black ${color.text}`}>{score}</span>
          <span className="text-xs text-foreground/40 uppercase">/ 100</span>
        </div>
      </div>
      <div className={`mt-4 px-4 py-2 ${color.bg}/20 border border-current ${color.text} text-sm font-bold uppercase tracking-widest`}>
        STATUS: {tier}
      </div>
    </div>
  );
}

export function AuditResultsStep({ userInfo, scores, insights, onClose }: AuditResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/q8RommFFkbptaoyv1MRY";

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 font-sans uppercase tracking-wide">
          {t.verdict}
        </h2>
        <p className="text-foreground/50 text-sm">{userInfo.firstName}, {t.hereIsScore}</p>
      </div>

      {/* Score Gauge */}
      <div className="flex justify-center">
        <ScoreGauge score={scores.disciplineScore} tier={scores.tier} />
      </div>

      {/* Tier Description */}
      <p className="text-center text-foreground/60 text-lg italic">
        "{scores.tierDescription}"
      </p>

      {/* AI Insights */}
      {insights && (
        <div className="space-y-6">
          {/* Headline */}
          <h3 className="text-xl font-bold text-lioner-gold text-center uppercase">
            {insights.headline}
          </h3>

          {/* Reality Check */}
          <div className="p-5 border border-foreground/10 bg-foreground/[0.03]">
            <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold mb-3">
              {t.realityCheck}
            </h4>
            <p className="text-foreground/80 leading-relaxed">{insights.realityCheck}</p>
          </div>

          {/* Action Plan */}
          <div className="p-5 border border-foreground/10 bg-foreground/[0.03]">
            <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold mb-3">
              {t.actionPlan}
            </h4>
            <ul className="space-y-3">
              {insights.actionPlan.map((action, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex items-center justify-center w-6 h-6 bg-lioner-gold text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-foreground/80">{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Closing */}
          <p className="text-center text-foreground font-bold text-lg">
            "{insights.closing}"
          </p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center space-y-3 pt-4">
        <Button
          asChild
          className="bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none px-10 py-7 h-auto font-bold uppercase tracking-wider text-base"
        >
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            {t.ctaBtn}
            <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </Button>
        <p className="text-xs text-foreground/40 italic">
          {t.warning}
        </p>
      </div>

      {/* Close */}
      <div className="text-center">
        <Button variant="ghost" onClick={onClose} className="text-foreground/40 hover:text-foreground/60">
          {t.close}
        </Button>
      </div>
    </div>
  );
}
