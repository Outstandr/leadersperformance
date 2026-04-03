import { Button } from "@/components/ui/button";
import { AuditUserInfo, AuditInsights } from "./CorporateAuditDialog";
import { AuditScores } from "@/lib/corporateAuditScoring";
import { ColorTier, colorConfig } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { ChevronDown } from "lucide-react";

interface AuditResultsStepProps {
  userInfo: AuditUserInfo;
  scores: AuditScores;
  insights: AuditInsights | null;
  onClose: () => void;
  responses: Record<string, number>;
}

const tierTranslations: Record<string, Record<string, string>> = {
  en: { "THE NURSERY": "THE NURSERY", "THE DRIFT": "THE DRIFT", "THE VANGUARD": "THE VANGUARD" },
  nl: { "THE NURSERY": "DE KLEUTERKLAS", "THE DRIFT": "DE AFDRIFT", "THE VANGUARD": "DE VOORHOEDE" },
};

const ui = {
  en: {
    subline: "This indicates the discipline level in your team.",
    bottleneckLabel: "Primary Bottleneck",
    breakdown: "Dimension Analysis",
    realityCheck: "The Reality Check",
    actionPlan: "The Action Plan",
    ctaBtn: "Apply for Business Reset Intervention",
    ctaSub: "Limited availability — cases are reviewed, not automatically accepted.",
    close: "Close",
  },
  nl: {
    subline: "Dit toont het disciplineniveau in uw team.",
    bottleneckLabel: "Primaire Bottleneck",
    breakdown: "Dimensieanalyse",
    realityCheck: "De Realiteitscheck",
    actionPlan: "Het Actieplan",
    ctaBtn: "Aanvragen voor Business Reset Interventie",
    ctaSub: "Beperkte beschikbaarheid — cases worden beoordeeld.",
    close: "Sluiten",
  },
};

export function AuditResultsStep({ userInfo, scores, insights, onClose, responses }: AuditResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const c = colorConfig[scores.overallColor];
  const translatedTier = tierTranslations[language]?.[scores.tier] || scores.tier;

  const primaryDim = scores.dimensions.reduce((a, b) => a.score > b.score ? a : b);

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
    <div className="space-y-0">
      {/* ═══ ABOVE THE FOLD ═══ */}
      <div className="p-6 md:p-10 space-y-8">
        {/* 1. SCORE BLOCK */}
        <div className="text-center space-y-3 pt-2">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">{userInfo.firstName}, {language === "nl" ? "jouw teamaudit" : "your team audit"}</p>
          <span className={`text-7xl md:text-8xl font-black ${c.text} leading-none block`}>{scores.disciplineScore}</span>
          <div className={`inline-block px-4 py-1.5 ${c.bg} border ${c.border} ${c.text} text-xs font-bold uppercase tracking-widest`}>
            {translatedTier}
          </div>
          <p className="text-sm text-foreground/60 max-w-sm mx-auto">{t.subline}</p>
        </div>

        {/* 2. PRIMARY BOTTLENECK — dominant block */}
        <div className="p-6 bg-red-950 text-white space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-300 font-semibold">{t.bottleneckLabel}</p>
          <p className="text-xl md:text-2xl font-black leading-tight">{scores.primaryBottleneck.dimensionLabel[language]}</p>
          <p className="text-sm text-red-100/80 leading-relaxed">{scores.primaryBottleneck.impact[language]}</p>
        </div>

        {/* 3. DAISY — Immediate activation */}
        <ScanVoiceWidget
          mode="corporate_audit"
          userInfo={{ fullName: `${userInfo.firstName} ${userInfo.lastName}`, email: userInfo.email, phone: userInfo.phone }}
          contextPayload={voiceContext}
          bookingType="Discipline Architecture Session"
          calendarId="4NM4rNbMCZ024q4rlSTP"
          webhookPayload={{
            first_name: userInfo.firstName,
            last_name: userInfo.lastName,
            email: userInfo.email,
            phone: userInfo.phone,
            discipline_score: scores.disciplineScore,
            tier: scores.tier,
            audit_type: "corporate",
            language,
            audit_q1: responses.q1 ?? 0,
            audit_q2: responses.q2 ?? 0,
            audit_q3: responses.q3 ?? 0,
            audit_q4: responses.q4 ?? 0,
            audit_q5: responses.q5 ?? 0,
            audit_q6: responses.q6 ?? 0,
            audit_q7: responses.q7 ?? 0,
          }}
        />

        <div className="text-center pt-2">
          <ChevronDown className="w-5 h-5 text-foreground/20 mx-auto animate-bounce" />
        </div>
      </div>

      {/* ═══ BELOW THE FOLD ═══ */}
      <div className="p-6 md:p-10 space-y-8 border-t border-foreground/10">
        {/* VISUAL BREAKDOWN — primary highlighted */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">{t.breakdown}</h3>
          {scores.dimensions.map((d) => {
            const dc = colorConfig[d.color];
            const isPrimary = d.key === primaryDim.key;
            return (
              <div key={d.key} className={`space-y-2 transition-opacity ${isPrimary ? "opacity-100" : "opacity-40"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/80">{d.label[language]}</span>
                  <span className={`text-sm font-bold ${dc.text}`}>{d.score}%</span>
                </div>
                <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
                  <div className="h-full transition-all duration-1000" style={{ width: `${d.score}%`, backgroundColor: dc.stroke }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* REALITY CHECK */}
        <div className="p-6 bg-foreground text-background text-center space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-background/40 font-semibold">{t.realityCheck}</p>
          <p className="text-lg md:text-xl font-black leading-tight">
            {insights?.realityCheck || scores.diagnosticNarrative[language]}
          </p>
        </div>

        {/* AI INSIGHTS — Action Plan */}
        {insights && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-lioner-gold text-center uppercase">{insights.headline}</h3>

            <div className="p-5 border border-foreground/10 bg-foreground/[0.03]">
              <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold mb-3">{t.actionPlan}</h4>
              <ul className="space-y-3">
                {insights.actionPlan.map((action, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="flex items-center justify-center w-6 h-6 bg-lioner-gold text-white text-xs font-bold shrink-0">{i + 1}</span>
                    <span className="text-foreground/80">{action}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-center text-foreground font-bold text-lg">"{insights.closing}"</p>
          </div>
        )}

        <div className="text-center">
          <Button variant="outline" onClick={onClose} className="border-foreground/20 hover:bg-foreground/5 text-foreground/70 hover:text-foreground px-8 py-3">
            {lang === "en" ? "Return to Homepage" : "Terug naar startpagina"}
          </Button>
        </div>
      </div>
    </div>
  );
}
