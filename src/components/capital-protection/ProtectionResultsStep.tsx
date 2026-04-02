import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, AlertTriangle } from "lucide-react";
import { CPResult } from "@/lib/capitalProtectionScoring";
import { ColorTier, colorConfig } from "@/lib/unifiedScoring";
import { ScanUserInfo } from "@/components/founder-scan/ScanGateStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";

interface ProtectionResultsStepProps {
  userInfo: ScanUserInfo;
  scores: CPResult;
  aiInsights: ProtectionAIInsights | null;
  onClose: () => void;
}

export interface ProtectionAIInsights {
  headline: string;
  situationAnalysis: string;
  riskFactors: string[];
  strategicRecommendations: string[];
  closing: string;
}

function RiskGauge({ score, color }: { score: number; color: ColorTier }) {
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
          <span className={`text-4xl font-black ${c.text}`}>{score}%</span>
        </div>
      </div>
    </div>
  );
}

function SectionBar({ label, score, color }: { label: string; score: number; color: ColorTier }) {
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

const ui = {
  en: {
    resultsTitle: "Capital Risk Assessment",
    overallRisk: "Overall Capital Risk Score",
    sectionBreakdown: "Dimension Analysis",
    primaryRisk: "Primary Risk Area",
    diagnosis: "Strategic Interpretation",
    recommendation: "Recommended Next Step",
    aiAnalysis: "AI Strategic Analysis",
    riskFactors: "Identified Risk Factors",
    strategicRecs: "Strategic Recommendations",
    ctaBtn: "Discuss This With Lionel",
    disclaimer: "Book a confidential strategic session to address these findings.",
    close: "Close",
  },
  nl: {
    resultsTitle: "Kapitaal Risicobeoordeling",
    overallRisk: "Totale Kapitaal Risicoscore",
    sectionBreakdown: "Dimensieanalyse",
    primaryRisk: "Primair Risicogebied",
    diagnosis: "Strategische Interpretatie",
    recommendation: "Aanbevolen Volgende Stap",
    aiAnalysis: "AI Strategische Analyse",
    riskFactors: "Geïdentificeerde Risicofactoren",
    strategicRecs: "Strategische Aanbevelingen",
    ctaBtn: "Bespreek dit met Lionel",
    disclaimer: "Boek een vertrouwelijke strategische sessie om deze bevindingen te bespreken.",
    close: "Sluiten",
  },
};

export function ProtectionResultsStep({ userInfo, scores, aiInsights, onClose }: ProtectionResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const c = colorConfig[scores.overallColor];
  const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j";

  const firstName = userInfo.fullName.split(" ")[0];

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-none border-2 border-lioner-gold/50 mb-3">
          <Shield className="w-6 h-6 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 font-sans uppercase tracking-wide">
          {t.resultsTitle}
        </h2>
        <p className="text-foreground/50 text-sm">
          {firstName}, {language === "nl" ? "hier zijn jouw resultaten." : "here are your results."}
        </p>
      </div>

      {/* Overall Score */}
      <div className="text-center space-y-3">
        <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{t.overallRisk}</h3>
        <RiskGauge score={scores.overallScore} color={scores.overallColor} />
        <div className={`inline-block px-4 py-2 ${c.bg} border ${c.border} ${c.text} text-sm font-bold uppercase tracking-widest`}>
          {c.label[language]}
        </div>
      </div>

      {/* Primary Risk */}
      <div className="p-5 border border-red-500/20 bg-red-500/5 space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.primaryRisk}</h4>
        <p className="text-foreground font-bold">{scores.primaryBottleneck.dimensionLabel[language]}</p>
        <p className="text-foreground/80 leading-relaxed text-sm">{scores.primaryBottleneck.impact[language]}</p>
      </div>

      {/* Section Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">{t.sectionBreakdown}</h3>
        {scores.sections.map((s, i) => (
          <SectionBar key={i} label={s.label[language] ?? s.label.en} score={s.score} color={s.color} />
        ))}
      </div>

      {/* Diagnosis */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.diagnosis}</h4>
        <p className="text-foreground/80 leading-relaxed">{scores.headline[language] ?? scores.headline.en}</p>
      </div>

      {/* Recommendation */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.recommendation}</h4>
        <p className="text-foreground/80 leading-relaxed">{scores.nextStep[language] ?? scores.nextStep.en}</p>
      </div>

      {/* AI Insights */}
      {aiInsights && (
        <div className="space-y-4 border-t border-foreground/10 pt-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-lioner-gold" />
            <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.aiAnalysis}</h3>
          </div>
          <p className="text-lg font-bold text-foreground">{aiInsights.headline}</p>
          <p className="text-foreground/80 leading-relaxed">{aiInsights.situationAnalysis}</p>

          {aiInsights.riskFactors.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{t.riskFactors}</h4>
              <ul className="space-y-1">
                {aiInsights.riskFactors.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-500 mt-0.5">•</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {aiInsights.strategicRecommendations.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{t.strategicRecs}</h4>
              <ul className="space-y-1">
                {aiInsights.strategicRecommendations.map((r, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-lioner-gold mt-0.5">→</span> {r}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <p className="text-sm font-semibold text-foreground italic">"{aiInsights.closing}"</p>
        </div>
      )}

      {/* Daisy voice widget — delayed webhook */}
      <ScanVoiceWidget
        mode="capital_protection"
        userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
        contextPayload={{
          fullName: userInfo.fullName,
          email: userInfo.email,
          phone: userInfo.phone,
          overallScore: scores.overallScore,
          overallColor: scores.overallColor,
          recoveryPotential: scores.recoveryPotential,
          headline: scores.headline[language] ?? scores.headline.en,
          sections: scores.sections.map(s => ({ label: s.label[language] ?? s.label.en, score: s.score, color: s.color })),
        }}
        bookingType="Capital Protection Session"
        calendarId="dxDvJ7TY6uSjcl1loyov"
        webhookPayload={{
          first_name: firstName,
          last_name: userInfo.fullName.trim().split(/\s+/).slice(1).join(" ") || "",
          email: userInfo.email,
          phone: userInfo.phone,
          audit_type: "capital_protection",
          recovery_potential: scores.recoveryPotential,
          risk_level: scores.headline.en,
          overall_score: scores.overallScore,
          overall_color: scores.overallColor,
          evidence_strength_score: scores.sections[0]?.score ?? 0,
          timeline_advantage_score: scores.sections[1]?.score ?? 0,
          jurisdictional_simplicity_score: scores.sections[2]?.score ?? 0,
          legal_positioning_score: scores.sections[3]?.score ?? 0,
          capital_exposure_score: scores.sections[4]?.score ?? 0,
          language,
        }}
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
