import { Button } from "@/components/ui/button";
import { BurnoutFreeResult } from "@/lib/burnoutScoring";
import { colorConfig } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { Lock, ArrowRight, ChevronDown } from "lucide-react";

interface BurnoutFreeResultsStepProps {
  result: BurnoutFreeResult;
  onUnlockFull: () => void;
  isProcessing: boolean;
  userInfo?: { fullName: string; email: string; phone: string; company: string };
  showOutsideDialog?: boolean;
}

function getInterpretationLevel(score: number): string {
  if (score <= 40) return "low";
  if (score <= 65) return "moderate";
  return "high";
}

function getOverallLevel(score: number): string {
  if (score <= 25) return "low";
  if (score <= 50) return "moderate";
  if (score <= 75) return "high";
  return "critical";
}

const overallInterpretations = {
  en: {
    low: "Your preliminary assessment shows manageable pressure levels.",
    moderate: "You are showing early-to-moderate signs of founder pressure accumulation.",
    high: "Your preliminary score indicates significant burnout risk across multiple domains.",
    critical: "Your preliminary results show critical founder pressure. Multiple systems are under severe strain.",
  },
  nl: {
    low: "Uw voorlopige beoordeling toont beheersbare drukniveaus.",
    moderate: "U toont vroege tot matige tekenen van founder-drukopstapeling.",
    high: "Uw voorlopige score wijst op significant burnout-risico over meerdere domeinen.",
    critical: "Uw voorlopige resultaten tonen kritieke founder-druk. Meerdere systemen staan onder zware spanning.",
  },
};

const ui = {
  en: {
    subline: "This indicates early signals of overload in your system.",
    breakdown: "Domain Breakdown",
    realityCheck: "Reality Check",
    unlockTitle: "Go Deeper: Full Pressure Phase Diagnostic",
    unlockDesc: "This preliminary test identifies warning signals. The Full Diagnostic maps your exact pressure phase, recovery timeline, and the structural patterns driving your score.",
    unlockBullets: [
      "32 deep-diagnostic questions across 4 weighted domains",
      "Exact pressure phase identification (Phase 1-5)",
      "Recovery timeline: with vs. without intervention",
      "AI triage session with Daisy, your founder advisor",
      "Direct booking for a Founder Intervention Call with Lionel",
    ],
    unlockBtn: "Unlock Full Diagnostic — $195",
    processing: "Redirecting to payment...",
    close: "Close",
  },
  nl: {
    subline: "Dit wijst op vroege signalen van overbelasting in uw systeem.",
    breakdown: "Domeinanalyse",
    realityCheck: "Realiteitscheck",
    unlockTitle: "Ga Dieper: Volledige Drukfase Diagnostiek",
    unlockDesc: "Deze voorlopige test identificeert waarschuwingssignalen. De Volledige Diagnostiek brengt uw exacte drukfase, hersteltijdlijn en de structurele patronen achter uw score in kaart.",
    unlockBullets: [
      "32 diep-diagnostische vragen over 4 gewogen domeinen",
      "Exacte drukfase identificatie (Fase 1-5)",
      "Hersteltijdlijn: met vs. zonder interventie",
      "AI-triage sessie met Daisy, uw founder-adviseur",
      "Directe boeking voor een Founder Interventie Gesprek met Lionel",
    ],
    unlockBtn: "Ontgrendel Volledige Diagnostiek — $195",
    processing: "Doorsturen naar betaling...",
    close: "Sluiten",
  },
};

export function BurnoutFreeResultsStep({ result, onUnlockFull, isProcessing, userInfo, showOutsideDialog }: BurnoutFreeResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;

  const sortedSections = [...result.sectionScores].sort((a, b) => b.score - a.score);
  const highestRisk = sortedSections[0];
  const overallLevel = getOverallLevel(result.fbrScore);
  const c = colorConfig[result.fbrColor as keyof typeof colorConfig] || colorConfig.green;

  const firstName = userInfo?.fullName?.split(" ")[0] ?? "";

  const voiceContext = userInfo ? {
    fullName: userInfo.fullName,
    company: userInfo.company,
    phone: userInfo.phone,
    email: userInfo.email,
    fbrScore: result.fbrScore,
    fbrColor: result.fbrColor,
    fbrLabel: result.fbrLabel[language],
    sectionScores: result.sectionScores.map(s => ({
      domain: s.label,
      score: s.score,
      level: getInterpretationLevel(s.score),
    })),
    highestRiskDomain: highestRisk?.label,
    overallInterpretation: overallInterpretations[language][overallLevel as keyof typeof overallInterpretations["en"]],
  } : null;

  return (
    <div className="space-y-0">
      {/* ═══ ABOVE THE FOLD ═══ */}
      <div className="p-6 md:p-10 space-y-8">
        {/* 1. SCORE BLOCK */}
        <div className="text-center space-y-3 pt-2">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">
            {firstName ? `${firstName}, ` : ""}{language === "nl" ? "jouw risicoscore" : "your risk score"}
          </p>
          <span className={`text-7xl md:text-8xl font-black ${c.text} leading-none block`}>{result.fbrScore}</span>
          <div className={`inline-block px-4 py-1.5 ${c.bg} border ${c.border} ${c.text} text-xs font-bold uppercase tracking-widest`}>
            {result.fbrLabel[language]}
          </div>
          <p className="text-sm text-foreground/60 max-w-sm mx-auto">{t.subline}</p>
        </div>

        {/* 2. PRIMARY RISK — dominant block */}
        {highestRisk && highestRisk.score > 40 && (
          <div className="p-6 bg-red-950 text-white space-y-2">
            <p className="text-[10px] uppercase tracking-[0.2em] text-red-300 font-semibold">
              {language === "nl" ? "Hoogste Risicogebied" : "Highest Risk Area"}
            </p>
            <p className="text-xl md:text-2xl font-black leading-tight">{highestRisk.label}: {highestRisk.score}%</p>
          </div>
        )}

        {/* 3. DAISY — Immediate activation */}
        {showOutsideDialog && userInfo && voiceContext && (
          <ScanVoiceWidget
            mode="burnout_scan"
            userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
            contextPayload={voiceContext}
            bookingType="Founder Burnout Intervention"
          />
        )}

        <div className="text-center pt-2">
          <ChevronDown className="w-5 h-5 text-foreground/20 mx-auto animate-bounce" />
        </div>
      </div>

      {/* ═══ BELOW THE FOLD ═══ */}
      <div className="p-6 md:p-10 space-y-8 border-t border-foreground/10">
        {/* 4. VISUAL BREAKDOWN — primary highlighted */}
        <div className="space-y-3">
          <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">{t.breakdown}</h3>
          {result.sectionScores.map((s) => {
            const sc = colorConfig[s.color as keyof typeof colorConfig] || colorConfig.green;
            const isPrimary = s.key === highestRisk?.key;
            return (
              <div key={s.key} className={`space-y-2 transition-opacity ${isPrimary ? "opacity-100" : "opacity-40"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/80">{s.label}</span>
                  <span className={`text-sm font-bold ${sc.text}`}>{s.score}%</span>
                </div>
                <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
                  <div className="h-full transition-all duration-1000" style={{ width: `${s.score}%`, backgroundColor: sc.stroke }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* 5. REALITY CHECK */}
        <div className="p-6 bg-foreground text-background text-center space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-background/40 font-semibold">{t.realityCheck}</p>
          <p className="text-lg md:text-xl font-black leading-tight">
            {overallInterpretations[language][overallLevel as keyof typeof overallInterpretations["en"]]}
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
    </div>
  );
}
