import { Button } from "@/components/ui/button";
import { Shield, Loader2, AlertTriangle, FileText, Lock, ChevronDown } from "lucide-react";
import { CPResult, CPSectionScore } from "@/lib/capitalProtectionScoring";
import { CPUserInfo } from "./CPUserInfoStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ColorTier, colorConfig } from "@/lib/unifiedScoring";

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

const gaugeColors: Record<ColorTier, string> = {
  green: "#22c55e",
  yellow: "#eab308",
  orange: "#f59e0b",
  red: "#ef4444",
  darkred: "#991b1b",
};

const barColorConfig: Record<ColorTier, { bar: string; text: string }> = {
  green: { bar: "bg-green-500", text: "text-green-600" },
  yellow: { bar: "bg-yellow-500", text: "text-yellow-500" },
  orange: { bar: "bg-amber-500", text: "text-amber-500" },
  red: { bar: "bg-red-500", text: "text-red-500" },
  darkred: { bar: "bg-red-800", text: "text-red-800" },
};

const tierColorClasses: Record<string, { text: string; bg: string; border: string }> = {
  high: { text: "text-green-600", bg: "bg-green-500/10", border: "border-green-500/30" },
  moderate: { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30" },
  limited: { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30" },
};

const ui = {
  en: {
    generating: "Generating your strategic report...",
    generatingSubtitle: "Our AI is analyzing your situation across multiple dimensions...",
    recoveryPotential: "Recovery Potential",
    primaryRisk: "Primary Risk Area",
    breakdown: "Dimension Analysis",
    summary: "Situation Summary",
    indicators: "Key Risk Indicators",
    paths: "Possible Strategic Paths",
    nextStep: "Recommended Next Step",
    confidentiality: "Confidentiality Notice",
    confidentialityText: "This report is generated for internal assessment purposes only. All information is treated as strictly confidential.",
    ctaBtn: "Apply for Capital Protection Case Review",
    ctaSub: "Cases are reviewed individually — limited availability.",
    close: "Close",
  },
  nl: {
    generating: "Uw strategisch rapport wordt gegenereerd...",
    generatingSubtitle: "Onze AI analyseert uw situatie over meerdere dimensies...",
    recoveryPotential: "Herstelpotentieel",
    primaryRisk: "Primair Risicogebied",
    breakdown: "Dimensieanalyse",
    summary: "Situatieoverzicht",
    indicators: "Belangrijkste Risico-indicatoren",
    paths: "Mogelijke Strategische Paden",
    nextStep: "Aanbevolen Volgende Stap",
    confidentiality: "Vertrouwelijkheidsverklaring",
    confidentialityText: "Dit rapport is uitsluitend gegenereerd voor interne beoordelingsdoeleinden. Alle informatie wordt strikt vertrouwelijk behandeld.",
    ctaBtn: "Aanvragen voor Kapitaalbescherming Case Review",
    ctaSub: "Cases worden individueel beoordeeld — beperkte beschikbaarheid.",
    close: "Sluiten",
  },
};

function SectionBar({ section, language, isPrimary }: { section: CPSectionScore; language: "en" | "nl"; isPrimary: boolean }) {
  const colors = barColorConfig[section.color];
  return (
    <div className={`space-y-1.5 transition-opacity ${isPrimary ? "opacity-100" : "opacity-40"}`}>
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
  const t = ui[language] ?? ui.en;
  const c = tierColorClasses[result.recoveryPotential];
  const firstName = userInfo.fullName.split(" ")[0];

  // Find primary risk (lowest scoring section = highest risk for capital protection)
  const primarySection = result.sections.reduce((a, b) => a.score < b.score ? a : b);

  if (isLoadingAI) {
    return (
      <div className="p-4 sm:p-6 md:p-10 text-center py-12 sm:py-20">
        <Loader2 className="w-10 h-10 sm:w-12 sm:h-12 text-lioner-gold animate-spin mx-auto mb-4 sm:mb-6" />
        <p className="text-foreground/80 font-semibold text-base sm:text-lg mb-2">{t.generating}</p>
        <p className="text-foreground/40 text-xs sm:text-sm">{t.generatingSubtitle}</p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {/* ═══ ABOVE THE FOLD ═══ */}
      <div className="p-4 sm:p-6 md:p-10 space-y-6 sm:space-y-8">
        {/* 1. SCORE BLOCK */}
        <div className="text-center space-y-3 pt-2">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-none border-2 border-lioner-gold/50 mb-2">
            <Shield className="w-5 h-5 text-lioner-gold" />
          </div>
          <p className="text-xs text-foreground/40 uppercase tracking-widest">{firstName}, {language === "nl" ? "uw beoordeling" : "your assessment"}</p>
          <span className={`text-7xl md:text-8xl font-black leading-none block ${c.text}`}>{result.overallScore}%</span>
          <div className={`inline-block px-3 sm:px-5 py-1.5 ${c.bg} border ${c.border} ${c.text} text-xs sm:text-sm font-bold uppercase tracking-widest`}>
            {result.headline[language]}
          </div>
        </div>

        {/* 2. PRIMARY RISK — dominant block */}
        <div className="p-5 sm:p-6 bg-red-950 text-white space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-300 font-semibold">{t.primaryRisk}</p>
          <p className="text-xl md:text-2xl font-black leading-tight">{result.primaryBottleneck.dimensionLabel[language]}</p>
          <p className="text-sm text-red-100/80 leading-relaxed">{result.primaryBottleneck.impact[language]}</p>
        </div>

        {/* NOTE: Daisy is rendered externally via CPVoiceWidget in CapitalProtection.tsx */}

        <div className="text-center pt-2">
          <ChevronDown className="w-5 h-5 text-foreground/20 mx-auto animate-bounce" />
        </div>
      </div>

      {/* ═══ BELOW THE FOLD ═══ */}
      <div className="p-4 sm:p-6 md:p-10 space-y-5 sm:space-y-8 border-t border-foreground/10">
        {/* VISUAL BREAKDOWN — primary highlighted */}
        <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.02] space-y-3 sm:space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold mb-1 sm:mb-2">{t.breakdown}</h4>
          {result.sections.map((section, i) => (
            <SectionBar key={i} section={section} language={language} isPrimary={section.label[language] === primarySection.label[language]} />
          ))}
        </div>

        {/* AI Report */}
        {aiReport ? (
          <>
            <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2 sm:space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold flex items-center gap-2">
                <FileText className="w-4 h-4" /> {t.summary}
              </h4>
              <p className="text-foreground/80 leading-relaxed text-sm sm:text-base">{aiReport.situation_summary}</p>
            </div>

            {aiReport.risk_indicators?.length > 0 && (
              <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2 sm:space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> {t.indicators}
                </h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {aiReport.risk_indicators.map((ind, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-lioner-gold mt-1.5 shrink-0" />
                      <span className="text-foreground/80 text-xs sm:text-sm">{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {aiReport.strategic_paths?.length > 0 && (
              <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2 sm:space-y-3">
                <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.paths}</h4>
                <ul className="space-y-1.5 sm:space-y-2">
                  {aiReport.strategic_paths.map((path, i) => (
                    <li key={i} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-lioner-gold mt-1.5 shrink-0" />
                      <span className="text-foreground/80 text-xs sm:text-sm">{path}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* REALITY CHECK */}
            <div className="p-6 bg-foreground text-background text-center space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-background/40 font-semibold">{t.nextStep}</p>
              <p className="text-lg md:text-xl font-black leading-tight">{aiReport.recommended_next_step}</p>
            </div>
          </>
        ) : (
          <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
            <p className="text-foreground/80 leading-relaxed">{result.body[language]}</p>
            <p className="text-foreground/80 leading-relaxed font-medium">{result.nextStep[language]}</p>
          </div>
        )}


        {/* Confidentiality */}
        <div className="p-3 sm:p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2">
          <h4 className="text-xs uppercase tracking-widest text-foreground/40 font-bold flex items-center gap-2">
            <Lock className="w-4 h-4" /> {t.confidentiality}
          </h4>
          <p className="text-foreground/50 text-xs sm:text-sm leading-relaxed">{t.confidentialityText}</p>
        </div>

        <div className="text-center pb-4">
          <Button variant="ghost" onClick={onClose} className="text-foreground/40 hover:text-foreground/60">
            {t.close}
          </Button>
        </div>
      </div>
    </div>
  );
}
