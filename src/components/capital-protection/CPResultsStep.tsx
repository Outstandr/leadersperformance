import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Shield, Loader2, AlertTriangle, FileText, Lock } from "lucide-react";
import { CPResult, CPSectionScore } from "@/lib/capitalProtectionScoring";
import { CPUserInfo } from "./CPUserInfoStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";

interface AIReport {
  situation_summary: string;
  risk_level: string;
  risk_indicators: string[];
  strategic_paths: string[];
  recommended_next_step: string;
  recovery_potential: string;
}

interface CPResultsStepProps {
  userInfo: CPUserInfo;
  result: CPResult;
  aiReport: AIReport | null;
  isLoadingAI: boolean;
  onClose: () => void;
}

const tierColorClasses = {
  high: { text: "text-green-600", bg: "bg-green-500/10", border: "border-green-500/30" },
  moderate: { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  limited: { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" },
};

const barColors = {
  green: { bar: "bg-green-500", text: "text-green-600" },
  orange: { bar: "bg-amber-500", text: "text-amber-500" },
  red: { bar: "bg-red-500", text: "text-red-500" },
};

const gaugeColors = {
  green: "#22c55e",
  orange: "#f59e0b",
  red: "#ef4444",
};

const ui = {
  en: {
    title: "Capital Protection Assessment Report",
    generating: "Generating your strategic report...",
    generatingSubtitle: "Our AI is analyzing your situation across multiple dimensions...",
    recoveryPotential: "Recovery Potential",
    riskLevel: "Strategic Risk Level",
    summary: "Situation Summary",
    indicators: "Key Risk Indicators",
    paths: "Possible Strategic Paths",
    nextStep: "Recommended Next Step",
    confidentiality: "Confidentiality Notice",
    confidentialityText: "This report is generated for internal assessment purposes only. All information is treated as strictly confidential. No data is shared with third parties without your explicit consent.",
    discussBtn: "Discuss with Daisy",
    bookBtn: "Schedule Case Review",
    close: "Close",
  },
  nl: {
    title: "Kapitaalbescherming Assessmentrapport",
    generating: "Uw strategisch rapport wordt gegenereerd...",
    generatingSubtitle: "Onze AI analyseert uw situatie over meerdere dimensies...",
    recoveryPotential: "Herstelpotentieel",
    riskLevel: "Strategisch Risiconiveau",
    summary: "Situatieoverzicht",
    indicators: "Belangrijkste Risico-indicatoren",
    paths: "Mogelijke Strategische Paden",
    nextStep: "Aanbevolen Volgende Stap",
    confidentiality: "Vertrouwelijkheidsverklaring",
    confidentialityText: "Dit rapport is uitsluitend gegenereerd voor interne beoordelingsdoeleinden. Alle informatie wordt strikt vertrouwelijk behandeld. Geen gegevens worden gedeeld met derden zonder uw uitdrukkelijke toestemming.",
    discussBtn: "Bespreek met Daisy",
    bookBtn: "Plan Casebeoordeling",
    close: "Sluiten",
  },
};

// SVG circular gauge component
function OverallGauge({ score, color }: { score: number; color: "green" | "orange" | "red" }) {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const strokeColor = gaugeColors[color];

  return (
    <div className="relative w-24 h-24 sm:w-36 sm:h-36 mx-auto">
      <svg viewBox="0 0 128 128" className="w-full h-full -rotate-90">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="hsl(var(--foreground) / 0.08)" strokeWidth="8" />
        <circle
          cx="64" cy="64" r={radius} fill="none"
          stroke={strokeColor} strokeWidth="8"
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl sm:text-3xl font-black text-foreground">{score}%</span>
      </div>
    </div>
  );
}

// Section score bar
function SectionBar({ section, language }: { section: CPSectionScore; language: "en" | "nl" }) {
  const colors = barColors[section.color];
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-center">
        <span className="text-sm text-foreground/70 font-medium">{section.label[language]}</span>
        <span className={`text-sm font-bold ${colors.text}`}>{section.score}%</span>
      </div>
      <div className="w-full h-2.5 bg-foreground/8 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full ${colors.bar} transition-all duration-1000 ease-out`}
          style={{ width: `${section.score}%` }}
        />
      </div>
    </div>
  );
}

export function CPResultsStep({ userInfo, result, aiReport, isLoadingAI, onClose }: CPResultsStepProps) {
  const { language } = useLanguage();
  const { openVoiceAgent, isSpeaking } = useVoiceAgent();
  const t = ui[language] ?? ui.en;
  const c = tierColorClasses[result.recoveryPotential];
  const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j";
  const [voiceTriggered, setVoiceTriggered] = useState(false);

  // Auto-open voice agent immediately when report is ready
  useEffect(() => {
    if (!isLoadingAI && result && !voiceTriggered) {
      setVoiceTriggered(true);
      // Small delay to let the UI render first
      const timer = setTimeout(() => {
        openVoiceAgent({
          mode: "capital_protection",
          autoConnect: true,
          cpReport: aiReport,
          cpUserInfo: userInfo,
          cpResult: result,
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoadingAI, result, voiceTriggered]);

  if (isLoadingAI) {
    return (
      <div className="p-4 sm:p-6 md:p-10 text-center py-12 sm:py-20">
        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-lioner-gold animate-spin mx-auto mb-4 sm:mb-6" />
        <p className="text-foreground/80 font-semibold text-base sm:text-lg mb-2">{t.generating}</p>
        <p className="text-foreground/40 text-xs sm:text-sm">{t.generatingSubtitle}</p>
      </div>
    );
  }

  const report = aiReport;
  const firstName = userInfo.fullName.split(" ")[0];

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-5 sm:space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-10 h-10 sm:w-14 sm:h-14 rounded-none border-2 border-lioner-gold/50 mb-3 sm:mb-4">
          <Shield className="w-5 h-5 sm:w-7 sm:h-7 text-lioner-gold" />
        </div>
        <h2 className="text-lg sm:text-2xl md:text-3xl font-black text-foreground mb-1 font-sans uppercase tracking-wide">
          {t.title}
        </h2>
        <p className="text-foreground/50 text-sm">
          {firstName}, {language === "nl" ? "hier is uw rapport." : "here is your report."}
        </p>
      </div>

      {/* Overall Gauge */}
      <div className="text-center space-y-2 sm:space-y-3">
        <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{t.recoveryPotential}</h3>
        <OverallGauge score={result.overallScore} color={result.overallColor} />
        <div className={`inline-block px-3 sm:px-5 py-1.5 sm:py-2 ${c.bg} border ${c.border} ${c.text} text-xs sm:text-sm font-bold uppercase tracking-widest`}>
          {result.headline[language]}
        </div>
      </div>

      {/* Section Scores */}
      <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.02] space-y-3 sm:space-y-4">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold mb-1 sm:mb-2">
          {language === "nl" ? "Dimensieanalyse" : "Dimension Analysis"}
        </h4>
        {result.sections.map((section, i) => (
          <SectionBar key={i} section={section} language={language} />
        ))}
      </div>

      {/* AI Report or fallback */}
      {report ? (
        <>
          {/* Situation Summary */}
           <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2 sm:space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold flex items-center gap-2">
              <FileText className="w-4 h-4" /> {t.summary}
            </h4>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">{report.situation_summary}</p>
          </div>

          {/* Risk Indicators */}
          {report.risk_indicators?.length > 0 && (
            <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2 sm:space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> {t.indicators}
              </h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {report.risk_indicators.map((ind, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lioner-gold mt-1.5 sm:mt-2 shrink-0" />
                    <span className="text-foreground/80 text-xs sm:text-sm">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strategic Paths */}
          {report.strategic_paths?.length > 0 && (
            <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2 sm:space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.paths}</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {report.strategic_paths.map((path, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-lioner-gold mt-1.5 sm:mt-2 shrink-0" />
                    <span className="text-foreground/80 text-xs sm:text-sm">{path}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Next Step */}
          <div className="p-3 sm:p-5 border border-lioner-gold/30 bg-lioner-gold/5 space-y-2 sm:space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.nextStep}</h4>
            <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">{report.recommended_next_step}</p>
          </div>
        </>
      ) : (
        <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
          <p className="text-foreground/80 leading-relaxed">{result.body[language]}</p>
          <p className="text-foreground/80 leading-relaxed font-medium">{result.nextStep[language]}</p>
        </div>
      )}

      {/* Confidentiality Notice */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-foreground/40 font-bold flex items-center gap-2">
          <Lock className="w-4 h-4" /> {t.confidentiality}
        </h4>
        <p className="text-foreground/50 text-sm leading-relaxed">{t.confidentialityText}</p>
      </div>

      {/* CTA Button — only booking, Daisy connects automatically */}
      <div className="text-center space-y-3 pt-2 sm:pt-4">
        <Button
          asChild
          variant="outline"
          className="w-full border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-white rounded-none px-6 sm:px-10 py-5 sm:py-7 h-auto font-bold uppercase tracking-wider text-sm sm:text-base"
        >
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            {t.bookBtn}
            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 sm:ml-3" />
          </a>
        </Button>
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
