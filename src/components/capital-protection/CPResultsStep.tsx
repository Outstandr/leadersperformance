import { Button } from "@/components/ui/button";
import { Loader2, AlertTriangle, FileText, Lock, ChevronDown } from "lucide-react";
import { CPResult, CPSectionScore } from "@/lib/capitalProtectionScoring";
import { CPUserInfo } from "./CPUserInfoStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ColorTier } from "@/lib/unifiedScoring";
import { useNavigate } from "react-router-dom";

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

// --- Color helpers ---
function getRecoveryColor(score: number): string {
  if (score >= 70) return "#059669";
  if (score >= 40) return "#D97706";
  return "#B91C1C";
}

function getRecoveryLabel(score: number, lang: "en" | "nl"): string {
  if (score >= 70) return lang === "nl" ? "Sterk" : "Strong";
  if (score >= 40) return lang === "nl" ? "Matig" : "Moderate";
  return lang === "nl" ? "Beperkt" : "Limited";
}

function getBarGradient(score: number): string {
  if (score >= 70) return "linear-gradient(90deg, #059669 0%, #059669 100%)";
  if (score >= 40) return "linear-gradient(90deg, #D97706 0%, #059669 100%)";
  return "linear-gradient(90deg, #B91C1C 0%, #D97706 100%)";
}

function getDimensionBarColor(score: number): string {
  if (score >= 70) return "#059669";
  if (score >= 40) return "#D97706";
  return "#B91C1C";
}

function getDimensionLabel(score: number, lang: "en" | "nl"): string {
  if (score >= 70) return lang === "nl" ? "Sterk" : "Strong";
  if (score >= 40) return lang === "nl" ? "Matig" : "Moderate";
  return lang === "nl" ? "Zwak" : "Weak";
}

function getRecoveryDifficulty(tier: string, lang: "en" | "nl"): string {
  if (tier === "high") return lang === "nl" ? "Laag" : "Low";
  if (tier === "moderate") return lang === "nl" ? "Gemiddeld" : "Medium";
  return lang === "nl" ? "Hoog" : "High";
}

function getExposureTierLabel(exposure: string): string {
  return exposure || "Under Review";
}

function getReinforcingStatements(primaryKey: string, lang: "en" | "nl"): string[] {
  const statements: Record<string, { en: string[]; nl: string[] }> = {
    evidence: {
      en: [
        "Your current structure leaves capital vulnerable",
        "Delay reduces recovery probability",
        "Early intervention significantly improves outcomes",
      ],
      nl: [
        "Uw huidige structuur laat kapitaal kwetsbaar",
        "Uitstel vermindert de herstelprobabiliteit",
        "Vroege interventie verbetert de resultaten aanzienlijk",
      ],
    },
    timeline: {
      en: [
        "Time is eroding your strategic advantage",
        "Evidence availability decreases with each passing month",
        "Acting now preserves options that will close later",
      ],
      nl: [
        "Tijd erodeert uw strategisch voordeel",
        "Beschikbaarheid van bewijs neemt af met elke maand",
        "Nu handelen behoudt opties die later sluiten",
      ],
    },
    jurisdiction: {
      en: [
        "Multi-jurisdictional complexity is compounding your risk",
        "Cross-border recovery requires immediate coordination",
        "Each jurisdiction adds cost and timeline pressure",
      ],
      nl: [
        "Multi-jurisdictionele complexiteit verhoogt uw risico",
        "Grensoverschrijdend herstel vereist onmiddellijke coördinatie",
        "Elke jurisdictie voegt kosten en tijdsdruk toe",
      ],
    },
    legal: {
      en: [
        "Your legal positioning is weakening your recovery path",
        "Without strategic repositioning, options narrow",
        "Proactive legal architecture changes the outcome",
      ],
      nl: [
        "Uw juridische positionering verzwakt uw herstelpad",
        "Zonder strategische herpositionering worden opties smaller",
        "Proactieve juridische architectuur verandert de uitkomst",
      ],
    },
    exposure: {
      en: [
        "The scale of exposure demands immediate strategic attention",
        "Unprotected capital compounds risk over time",
        "Structured intervention reduces exposure significantly",
      ],
      nl: [
        "De schaal van blootstelling vereist onmiddellijke strategische aandacht",
        "Onbeschermd kapitaal verergert risico in de loop van de tijd",
        "Gestructureerde interventie vermindert blootstelling aanzienlijk",
      ],
    },
  };
  return statements[primaryKey]?.[lang] || statements.evidence[lang];
}

const ui = {
  en: {
    generating: "Generating your strategic report...",
    generatingSubtitle: "Analyzing your situation across multiple dimensions...",
    headline: "Your capital is currently exposed",
    headlineSub: "Recovery is possible, but not guaranteed without intervention",
    recoveryLabel: "Recovery Probability",
    scoreSub: "Based on your current legal and structural position",
    exposureTitle: "Exposure Overview",
    capitalAtRisk: "Capital at Risk",
    recoveryProb: "Recovery Probability",
    recoveryDiff: "Recovery Difficulty",
    diagnosisTitle: "Capital exposure identified — recovery possible",
    breakdown: "Recovery Dimensions",
    summary: "Situation Summary",
    indicators: "Key Risk Indicators",
    paths: "Possible Strategic Paths",
    nextStep: "Recommended Next Step",
    confidentiality: "Confidentiality Notice",
    confidentialityText: "This report is generated for internal assessment purposes only. All information is treated as strictly confidential.",
    ctaBtn: "Secure your position before exposure increases",
    ctaSub: "Private capital protection intervention",
    close: "Return to Homepage",
  },
  nl: {
    generating: "Uw strategisch rapport wordt gegenereerd...",
    generatingSubtitle: "Uw situatie wordt geanalyseerd over meerdere dimensies...",
    headline: "Uw kapitaal is momenteel blootgesteld",
    headlineSub: "Herstel is mogelijk, maar niet gegarandeerd zonder interventie",
    recoveryLabel: "Herstelprobabiliteit",
    scoreSub: "Op basis van uw huidige juridische en structurele positie",
    exposureTitle: "Blootstellingsoverzicht",
    capitalAtRisk: "Kapitaal in Gevaar",
    recoveryProb: "Herstelprobabiliteit",
    recoveryDiff: "Herstelmoeilijkheid",
    diagnosisTitle: "Kapitaalblootstelling geïdentificeerd — herstel mogelijk",
    breakdown: "Hersteldimensies",
    summary: "Situatieoverzicht",
    indicators: "Belangrijkste Risico-indicatoren",
    paths: "Mogelijke Strategische Paden",
    nextStep: "Aanbevolen Volgende Stap",
    confidentiality: "Vertrouwelijkheidsverklaring",
    confidentialityText: "Dit rapport is uitsluitend gegenereerd voor interne beoordelingsdoeleinden. Alle informatie wordt strikt vertrouwelijk behandeld.",
    ctaBtn: "Bescherm uw positie voordat de blootstelling toeneemt",
    ctaSub: "Privé kapitaalbescherming interventie",
    close: "Terug naar startpagina",
  },
};

export function CPResultsStep({ userInfo, result, aiReport, isLoadingAI, onClose }: CPResultsStepProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = ui[language] ?? ui.en;
  const firstName = userInfo.fullName.split(" ")[0];

  // Recovery probability is inverted from risk: 100 - overallScore
  const recoveryProbability = 100 - result.overallScore;
  const recoveryColor = getRecoveryColor(recoveryProbability);
  const recoveryLabel = getRecoveryLabel(recoveryProbability, language);

  // Find primary risk (lowest recovery = highest risk dimension)
  const primarySection = result.sections.reduce((a, b) => a.score < b.score ? a : b);
  // Map back to dimension key for reinforcing statements
  const dimensionKeys = ["evidence", "timeline", "jurisdiction", "legal", "exposure"];
  const primaryIndex = result.sections.indexOf(primarySection);
  const primaryKey = dimensionKeys[primaryIndex] || "evidence";
  const reinforcements = getReinforcingStatements(primaryKey, language);

  const handleReturnHome = () => {
    onClose();
    navigate("/");
  };

  if (isLoadingAI) {
    return (
      <div className="p-6 md:p-10 text-center py-16" style={{ backgroundColor: "#F6F5F2" }}>
        <Loader2 className="w-12 h-12 animate-spin mx-auto mb-6" style={{ color: "#D97706" }} />
        <p className="font-semibold text-lg mb-2" style={{ color: "#1C2430" }}>{t.generating}</p>
        <p className="text-sm" style={{ color: "rgba(28,36,48,0.4)" }}>{t.generatingSubtitle}</p>
      </div>
    );
  }

  return (
    <div className="space-y-0" style={{ backgroundColor: "#F6F5F2" }}>
      {/* ═══ ABOVE THE FOLD ═══ */}
      <div className="p-6 md:p-10 space-y-8">

        {/* 1. HEADLINE */}
        <div className="text-center space-y-2 pt-2">
          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: "#D97706" }}>
            {firstName}, {language === "nl" ? "uw diagnose" : "your diagnosis"}
          </p>
          <h2 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: "#1C2430" }}>
            {t.headline}
          </h2>
          <p className="text-sm" style={{ color: "rgba(28,36,48,0.5)" }}>
            {t.headlineSub}
          </p>
        </div>

        {/* 2. RECOVERY PROBABILITY */}
        <div className="space-y-4">
          <div className="text-center space-y-3">
            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "rgba(28,36,48,0.4)" }}>
              {t.recoveryLabel}
            </p>
            <div className="inline-flex items-baseline gap-1">
              <span className="text-7xl md:text-8xl font-black leading-none" style={{ color: recoveryColor }}>
                {recoveryProbability}
              </span>
              <span className="text-lg font-medium" style={{ color: "#1C2430", opacity: 0.4 }}>%</span>
            </div>
            <div
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: recoveryColor }}
            >
              {recoveryLabel}
            </div>
          </div>

          {/* Gradient recovery bar */}
          <div className="space-y-1">
            <div className="h-3 w-full overflow-hidden" style={{ backgroundColor: "#E5E1DB" }}>
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: `${recoveryProbability}%`,
                  background: getBarGradient(recoveryProbability),
                }}
              />
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-wider font-medium" style={{ color: "#1C2430", opacity: 0.35 }}>
              <span>{language === "nl" ? "Beperkt" : "Limited"}</span>
              <span>{language === "nl" ? "Matig" : "Moderate"}</span>
              <span>{language === "nl" ? "Sterk" : "Strong"}</span>
            </div>
          </div>

          <p className="text-center text-xs" style={{ color: "rgba(28,36,48,0.4)" }}>
            {t.scoreSub}
          </p>
        </div>

        {/* 3. EXPOSURE OVERVIEW */}
        <div className="p-5 space-y-4" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(28,36,48,0.08)" }}>
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#D97706" }}>
            {t.exposureTitle}
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center space-y-1">
              <p className="text-[9px] uppercase tracking-wider font-medium" style={{ color: "rgba(28,36,48,0.4)" }}>
                {t.capitalAtRisk}
              </p>
              <p className="text-sm font-bold" style={{ color: "#B91C1C" }}>
                {getExposureTierLabel((userInfo as any).capitalExposure || "Under Review")}
              </p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[9px] uppercase tracking-wider font-medium" style={{ color: "rgba(28,36,48,0.4)" }}>
                {t.recoveryProb}
              </p>
              <p className="text-sm font-bold" style={{ color: recoveryColor }}>
                {recoveryProbability}%
              </p>
            </div>
            <div className="text-center space-y-1">
              <p className="text-[9px] uppercase tracking-wider font-medium" style={{ color: "rgba(28,36,48,0.4)" }}>
                {t.recoveryDiff}
              </p>
              <p className="text-sm font-bold" style={{ color: result.recoveryPotential === "high" ? "#059669" : result.recoveryPotential === "moderate" ? "#D97706" : "#B91C1C" }}>
                {getRecoveryDifficulty(result.recoveryPotential, language)}
              </p>
            </div>
          </div>
        </div>

        {/* 4. PRIMARY DIAGNOSIS — dark navy block */}
        <div className="p-6 space-y-4" style={{ backgroundColor: "#1C2430" }}>
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#D97706" }}>
            {language === "nl" ? "Structurele Diagnose" : "Structural Diagnosis"}
          </p>
          <p className="text-lg md:text-xl font-bold leading-tight text-white">
            {t.diagnosisTitle}
          </p>
          <div className="space-y-2 pt-1">
            {reinforcements.map((statement, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#D97706" }} />
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center pt-1">
          <ChevronDown className="w-5 h-5 mx-auto animate-bounce" style={{ color: "rgba(28,36,48,0.2)" }} />
        </div>
      </div>

      {/* ═══ BELOW THE FOLD ═══ */}
      <div className="p-6 md:p-10 space-y-8" style={{ borderTop: "1px solid rgba(28,36,48,0.08)" }}>

        {/* 5. DIMENSION BARS */}
        <div className="space-y-5">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#D97706" }}>
            {t.breakdown}
          </h3>
          {result.sections.map((section, i) => {
            const isPrimary = section.label[language] === primarySection.label[language];
            const barColor = getDimensionBarColor(section.score);
            const dimLabel = getDimensionLabel(section.score, language);
            return (
              <div key={i} className={`space-y-2 transition-opacity duration-300 ${isPrimary ? "opacity-100" : "opacity-50"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: "#1C2430" }}>{section.label[language]}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: barColor }}>{dimLabel}</span>
                    <span className="text-sm font-bold" style={{ color: barColor }}>{section.score}%</span>
                  </div>
                </div>
                <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: "#E5E1DB" }}>
                  <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ width: `${section.score}%`, backgroundColor: barColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* AI Report */}
        {aiReport ? (
          <>
            <div className="p-5 space-y-3" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(28,36,48,0.08)" }}>
              <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2" style={{ color: "#D97706" }}>
                <FileText className="w-4 h-4" /> {t.summary}
              </h4>
              <p className="text-sm leading-relaxed" style={{ color: "rgba(28,36,48,0.75)" }}>{aiReport.situation_summary}</p>
            </div>

            {aiReport.risk_indicators?.length > 0 && (
              <div className="p-5 space-y-3" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(28,36,48,0.08)" }}>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2" style={{ color: "#D97706" }}>
                  <AlertTriangle className="w-4 h-4" /> {t.indicators}
                </h4>
                <ul className="space-y-2">
                  {aiReport.risk_indicators.map((ind, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "#D97706" }} />
                      <span className="text-sm" style={{ color: "rgba(28,36,48,0.75)" }}>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {aiReport.strategic_paths?.length > 0 && (
              <div className="p-5 space-y-3" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(28,36,48,0.08)" }}>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#D97706" }}>{t.paths}</h4>
                <ul className="space-y-2">
                  {aiReport.strategic_paths.map((path, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "#059669" }} />
                      <span className="text-sm" style={{ color: "rgba(28,36,48,0.75)" }}>{path}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* NEXT STEP — dark block */}
            <div className="p-6 text-center space-y-3" style={{ backgroundColor: "#1C2430" }}>
              <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
                {t.nextStep}
              </p>
              <p className="text-base md:text-lg font-bold leading-tight text-white">
                {aiReport.recommended_next_step}
              </p>
            </div>
          </>
        ) : (
          <div className="p-5 space-y-3" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(28,36,48,0.08)" }}>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(28,36,48,0.75)" }}>{result.body[language]}</p>
            <p className="text-sm leading-relaxed font-medium" style={{ color: "#1C2430" }}>{result.nextStep[language]}</p>
          </div>
        )}

        {/* Confidentiality */}
        <div className="p-5 space-y-2" style={{ backgroundColor: "#ffffff", border: "1px solid rgba(28,36,48,0.08)" }}>
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold flex items-center gap-2" style={{ color: "rgba(28,36,48,0.3)" }}>
            <Lock className="w-4 h-4" /> {t.confidentiality}
          </h4>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(28,36,48,0.4)" }}>{t.confidentialityText}</p>
        </div>

        {/* Return home */}
        <div className="text-center pt-2 pb-4">
          <Button
            variant="outline"
            onClick={handleReturnHome}
            className="px-8 py-3 text-sm font-medium"
            style={{
              borderColor: "rgba(28,36,48,0.15)",
              color: "rgba(28,36,48,0.6)",
              backgroundColor: "transparent",
            }}
          >
            {t.close}
          </Button>
        </div>
      </div>
    </div>
  );
}
