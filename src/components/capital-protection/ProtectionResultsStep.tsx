import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Shield, AlertTriangle } from "lucide-react";
import { CPResult } from "@/lib/capitalProtectionScoring";
import { ScanUserInfo } from "@/components/founder-scan/ScanGateStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";

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

const colorMap = {
  green: { stroke: "#22c55e", text: "text-green-500", bg: "bg-green-500/20", border: "border-green-500" },
  orange: { stroke: "#f59e0b", text: "text-amber-500", bg: "bg-amber-500/20", border: "border-amber-500" },
  red: { stroke: "#ef4444", text: "text-red-500", bg: "bg-red-500/20", border: "border-red-500" },
  darkred: { stroke: "#991b1b", text: "text-red-800", bg: "bg-red-800/20", border: "border-red-800" },
};

function RiskGauge({ score, color }: { score: number; color: keyof typeof colorMap }) {
  const c = colorMap[color];
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

function SectionBar({ label, score, color }: { label: string; score: number; color: keyof typeof colorMap }) {
  const c = colorMap[color];
  const barColor = color === "green" ? "bg-green-500" : color === "orange" ? "bg-amber-500" : color === "red" ? "bg-red-500" : "bg-red-800";
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground/80">{label}</span>
        <span className={`text-sm font-bold ${c.text}`}>{score}%</span>
      </div>
      <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

const ui = {
  en: {
    resultsTitle: "Capital Risk Assessment",
    overallRisk: "Overall Capital Risk Score",
    sectionBreakdown: "Section Breakdown",
    diagnosis: "Diagnosis",
    recommendation: "Recommendation",
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
    sectionBreakdown: "Sectie Overzicht",
    diagnosis: "Diagnose",
    recommendation: "Aanbeveling",
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
  const { openVoiceAgent } = useVoiceAgent();
  const t = ui[language] ?? ui.en;
  const c = colorMap[scores.overallColor];
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
          {scores.recoveryPotential}
        </div>
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

          {/* AI Headline */}
          <p className="text-lg font-bold text-foreground">{aiInsights.headline}</p>

          {/* Situation Analysis */}
          <p className="text-foreground/80 leading-relaxed">{aiInsights.situationAnalysis}</p>

          {/* Risk Factors */}
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

          {/* Strategic Recommendations */}
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

          {/* AI Closing */}
          <p className="text-sm font-semibold text-foreground italic">"{aiInsights.closing}"</p>
        </div>
      )}

      {/* CTA */}
      <div className="text-center space-y-3 pt-4">
        {/* Speak with Daisy */}
        <Button
          onClick={() => {
            onClose();
            setTimeout(() => {
              openVoiceAgent({
                mode: "capital_protection",
                cpResult: scores,
                cpUserInfo: userInfo,
              });
            }, 300);
          }}
          className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-none px-10 py-7 h-auto font-bold uppercase tracking-wider text-base"
        >
          <Mic className="w-5 h-5 mr-3" />
          {language === "nl" ? "Bespreek uw rapport" : "Discuss your report"}
        </Button>

        {/* Book directly */}
        <Button
          asChild
          variant="outline"
          className="w-full border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-white rounded-none px-10 py-7 h-auto font-bold uppercase tracking-wider text-base"
        >
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            {t.ctaBtn}
            <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </Button>
        <p className="text-xs text-foreground/40 italic">{t.disclaimer}</p>
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
