import { Button } from "@/components/ui/button";
import { BurnoutFullResult } from "@/lib/burnoutScoring";
import { colorConfig, ColorTier } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { ScanUserInfo } from "@/components/founder-scan/ScanGateStep";
import { AlertTriangle, Clock } from "lucide-react";

interface BurnoutFullResultsStepProps {
  result: BurnoutFullResult;
  userInfo: ScanUserInfo;
  onClose: () => void;
}

function ScoreGauge({ score, color }: { score: number; color: ColorTier }) {
  const c = colorConfig[color];
  const dashOffset = 251.2 - (score / 100) * 251.2;

  return (
    <div className="relative w-44 h-44">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
        <circle cx="48" cy="48" r="40" stroke="rgba(0,0,0,0.08)" strokeWidth="8" fill="none" />
        <circle
          cx="48" cy="48" r="40" stroke={c.stroke} strokeWidth="8" fill="none"
          strokeDasharray="251.2" strokeDashoffset={dashOffset} strokeLinecap="butt"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`text-5xl font-black ${c.text}`}>{score}</span>
        <span className="text-xs text-foreground/40">/ 100</span>
      </div>
    </div>
  );
}

function DomainBar({ label, score, color }: { label: string; score: number; color: ColorTier }) {
  const c = colorConfig[color];
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground/80">{label}</span>
        <span className={`text-sm font-bold ${c.text}`}>{score}%</span>
      </div>
      <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
        <div className="h-full transition-all duration-1000" style={{ width: `${score}%`, backgroundColor: c.stroke }} />
      </div>
    </div>
  );
}

const ui = {
  en: {
    title: "Founder Burnout Diagnostic Report",
    overallScore: "Founder Burnout Risk Score",
    burnoutPhase: "Burnout Phase",
    recoveryTimeline: "Estimated Recovery Time",
    without: "Without intervention",
    with: "With structured intervention",
    domainAnalysis: "Domain Analysis",
    primaryRisk: "Primary Risk Domain",
    diagnosis: "Strategic Interpretation",
    recommendation: "Recommended Next Step",
    close: "Close",
  },
  nl: {
    title: "Founder Burnout Diagnostisch Rapport",
    overallScore: "Founder Burnout Risk Score",
    burnoutPhase: "Burnout Fase",
    recoveryTimeline: "Geschatte Hersteltijd",
    without: "Zonder interventie",
    with: "Met gestructureerde interventie",
    domainAnalysis: "Domeinanalyse",
    primaryRisk: "Primair Risicodomein",
    diagnosis: "Strategische Interpretatie",
    recommendation: "Aanbevolen Volgende Stap",
    close: "Sluiten",
  },
};

export function BurnoutFullResultsStep({ result, userInfo, onClose }: BurnoutFullResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const c = colorConfig[result.fbrColor];
  const firstName = userInfo.fullName.split(" ")[0];

  const voiceContext = {
    fullName: userInfo.fullName,
    company: userInfo.company,
    phone: userInfo.phone,
    email: userInfo.email,
    fbrScore: result.fbrScore,
    fbrColor: result.fbrColor,
    phase: result.phaseLabel[language],
    phaseNumber: result.phaseNumber,
    recoveryWithout: result.recoveryWithout[language],
    recoveryWith: result.recoveryWith[language],
    domainScores: result.domainScores,
    primaryRiskDomain: result.primaryRiskDomain,
    diagnosis: result.diagnosis,
    recommendation: result.recommendation,
  };

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 font-sans uppercase tracking-wide">
          {t.title}
        </h2>
        <p className="text-foreground/50 text-sm">{firstName}, {language === "nl" ? "hier is uw volledige rapport." : "here is your full report."}</p>
      </div>

      {/* Overall Score */}
      <div className="text-center space-y-3">
        <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{t.overallScore}</h3>
        <div className="flex justify-center">
          <ScoreGauge score={result.fbrScore} color={result.fbrColor} />
        </div>
        <div className={`inline-block px-4 py-2 ${c.bg} border ${c.border} ${c.text} text-sm font-bold uppercase tracking-widest`}>
          {result.fbrLabel[language]}
        </div>
      </div>

      {/* Burnout Phase */}
      <div className="p-5 border-2 border-red-500/30 bg-red-500/5 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-500" />
          <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.burnoutPhase}</h4>
        </div>
        <p className="text-foreground font-bold text-lg">{result.phaseLabel[language]}</p>
        {/* Phase indicator */}
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <div
              key={n}
              className={`h-2 flex-1 rounded-none ${n <= result.phaseNumber ? "bg-red-500" : "bg-foreground/10"}`}
            />
          ))}
        </div>
      </div>

      {/* Recovery Timeline */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-lioner-gold" />
          <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.recoveryTimeline}</h4>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-foreground/50 mb-1">{t.without}</p>
            <p className="text-foreground font-bold text-red-500">{result.recoveryWithout[language]}</p>
          </div>
          <div>
            <p className="text-xs text-foreground/50 mb-1">{t.with}</p>
            <p className="text-foreground font-bold text-green-500">{result.recoveryWith[language]}</p>
          </div>
        </div>
      </div>

      {/* Domain Analysis */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">{t.domainAnalysis}</h3>
        {result.domainScores.map((d) => (
          <DomainBar key={d.key} label={d.label} score={d.score} color={d.color} />
        ))}
      </div>

      {/* Primary Risk Domain */}
      <div className="p-5 border border-red-500/20 bg-red-500/5 space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.primaryRisk}</h4>
        <p className="text-foreground font-bold">{result.primaryRiskDomain.label}</p>
        <p className="text-foreground/80 leading-relaxed text-sm">{result.primaryRiskDomain.impact}</p>
      </div>

      {/* Diagnosis */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.diagnosis}</h4>
        <p className="text-foreground/80 leading-relaxed">{result.diagnosis}</p>
      </div>

      {/* Recommendation */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.recommendation}</h4>
        <p className="text-foreground/80 leading-relaxed">{result.recommendation}</p>
      </div>

      {/* Voice Widget - Daisy */}
      <ScanVoiceWidget
        mode="burnout_scan"
        userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
        contextPayload={voiceContext}
        bookingType="Founder Burnout Intervention"
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
