import { Button } from "@/components/ui/button";
import { AuditUserInfo, AuditInsights } from "./CorporateAuditDialog";
import { AuditScores } from "@/lib/corporateAuditScoring";
import { ColorTier, colorConfig } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";

interface AuditResultsStepProps {
  userInfo: AuditUserInfo;
  scores: AuditScores;
  insights: AuditInsights | null;
  onClose: () => void;
}

const tierTranslations: Record<string, Record<string, string>> = {
  en: {
    "THE NURSERY": "THE NURSERY",
    "THE DRIFT": "THE DRIFT",
    "THE VANGUARD": "THE VANGUARD",
  },
  nl: {
    "THE NURSERY": "DE KLEUTERKLAS",
    "THE DRIFT": "DE AFDRIFT",
    "THE VANGUARD": "DE VOORHOEDE",
  },
};

const ui = {
  en: {
    verdict: "The Verdict",
    hereIsScore: "here's your Team Audit Score.",
    dimensionAnalysis: "Dimension Analysis",
    primaryBottleneck: "Primary Bottleneck",
    diagnosis: "Strategic Interpretation",
    recommendation: "Recommended Next Step",
    realityCheck: "The Reality Check",
    actionPlan: "The Action Plan",
    ctaBtn: "Discuss your results",
    warning: "Warning: Do not book unless you are ready to change the score.",
    close: "Close",
  },
  nl: {
    verdict: "Het Resultaat",
    hereIsScore: "hier is jouw Teamaudit Score.",
    dimensionAnalysis: "Dimensieanalyse",
    primaryBottleneck: "Primaire Bottleneck",
    diagnosis: "Strategische Interpretatie",
    recommendation: "Aanbevolen Volgende Stap",
    realityCheck: "De realiteitscheck",
    actionPlan: "Het actieplan",
    ctaBtn: "Bespreek uw resultaten",
    warning: "Waarschuwing: boek alleen als je klaar bent om de score te veranderen.",
    close: "Sluiten",
  },
};

function ScoreGauge({ score, color }: { score: number; color: ColorTier }) {
  const c = colorConfig[color];
  const dashOffset = 251.2 - (score / 100) * 251.2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
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
          <span className="text-xs text-foreground/40 uppercase">/ 100</span>
        </div>
      </div>
    </div>
  );
}

function DimensionBar({ label, score, color }: { label: string; score: number; color: ColorTier }) {
  const c = colorConfig[color];
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground/80">{label}</span>
        <span className={`text-sm font-bold ${c.text}`}>{score}%</span>
      </div>
      <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
        <div
          className="h-full transition-all duration-1000"
          style={{ width: `${score}%`, backgroundColor: c.stroke }}
        />
      </div>
    </div>
  );
}

export function AuditResultsStep({ userInfo, scores, insights, onClose }: AuditResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const translatedTier = tierTranslations[language]?.[scores.tier] || scores.tier;

  const voiceContext = {
    firstName: userInfo.firstName,
    lastName: userInfo.lastName,
    email: userInfo.email,
    phone: userInfo.phone,
    disciplineScore: scores.disciplineScore,
    rawScore: scores.rawScore,
    tier: scores.tier,
    overallColor: scores.overallColor,
    dimensions: scores.dimensions.map(d => ({
      label: d.label[language],
      score: d.score,
      color: d.color,
    })),
    primaryBottleneck: {
      dimensionLabel: scores.primaryBottleneck.dimensionLabel[language],
      impact: scores.primaryBottleneck.impact[language],
    },
    diagnosticNarrative: scores.diagnosticNarrative[language],
    recommendedNextStep: scores.recommendedNextStep[language],
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 font-sans uppercase tracking-wide">
          {t.verdict}
        </h2>
        <p className="text-foreground/50 text-sm">{userInfo.firstName}, {t.hereIsScore}</p>
      </div>

      {/* Score Gauge — show discipline score (inverted from pressure) */}
      <div className="flex flex-col items-center">
        <ScoreGauge score={scores.disciplineScore} color={scores.overallColor} />
        <div className={`mt-4 px-4 py-2 ${colorConfig[scores.overallColor].bg} border ${colorConfig[scores.overallColor].border} ${colorConfig[scores.overallColor].text} text-sm font-bold uppercase tracking-widest`}>
          STATUS: {translatedTier}
        </div>
      </div>

      {/* Dimension Analysis */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">{t.dimensionAnalysis}</h3>
        {scores.dimensions.map((d) => (
          <DimensionBar key={d.key} label={d.label[language]} score={d.score} color={d.color} />
        ))}
      </div>

      {/* Primary Bottleneck */}
      <div className="p-5 border border-red-500/20 bg-red-500/5 space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.primaryBottleneck}</h4>
        <p className="text-foreground font-bold">{scores.primaryBottleneck.dimensionLabel[language]}</p>
        <p className="text-foreground/80 leading-relaxed text-sm">{scores.primaryBottleneck.impact[language]}</p>
      </div>

      {/* Diagnosis */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.diagnosis}</h4>
        <p className="text-foreground/80 leading-relaxed">{scores.diagnosticNarrative[language]}</p>
      </div>

      {/* Recommendation */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.recommendation}</h4>
        <p className="text-foreground/80 leading-relaxed">{scores.recommendedNextStep[language]}</p>
      </div>

      {/* AI Insights */}
      {insights && (
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-lioner-gold text-center uppercase">
            {insights.headline}
          </h3>

          <div className="p-5 border border-foreground/10 bg-foreground/[0.03]">
            <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold mb-3">
              {t.realityCheck}
            </h4>
            <p className="text-foreground/80 leading-relaxed">{insights.realityCheck}</p>
          </div>

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

          <p className="text-center text-foreground font-bold text-lg">
            "{insights.closing}"
          </p>
        </div>
      )}

      {/* Embedded Daisy Voice Widget */}
      <ScanVoiceWidget
        mode="corporate_audit"
        userInfo={{ fullName: `${userInfo.firstName} ${userInfo.lastName}`, email: userInfo.email, phone: userInfo.phone }}
        contextPayload={voiceContext}
        bookingType="Business Reset Intervention"
      />

      {/* Close */}
      <div className="text-center">
        <Button variant="ghost" onClick={onClose} className="text-foreground/40 hover:text-foreground/60">
          {t.close}
        </Button>
      </div>
    </div>
  );
}
