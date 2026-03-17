import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, Shield, Loader2, AlertTriangle, FileText, Lock } from "lucide-react";
import { CPResult } from "@/lib/capitalProtectionScoring";
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

const colorMap = {
  high: { text: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/30", icon: "text-green-500" },
  moderate: { text: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30", icon: "text-amber-500" },
  limited: { text: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/30", icon: "text-red-500" },
};

const ui = {
  en: {
    title: "Capital Protection Assessment Report",
    generating: "Generating your strategic report...",
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

export function CPResultsStep({ userInfo, result, aiReport, isLoadingAI, onClose }: CPResultsStepProps) {
  const { language } = useLanguage();
  const { openVoiceAgent } = useVoiceAgent();
  const t = ui[language] ?? ui.en;
  const c = colorMap[result.recoveryPotential];
  const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j";
  const [voiceTriggered, setVoiceTriggered] = useState(false);

  // Auto-open voice agent after 2s
  useEffect(() => {
    if (!isLoadingAI && aiReport && !voiceTriggered) {
      const timer = setTimeout(() => {
        setVoiceTriggered(true);
        openVoiceAgent({
          mode: "capital_protection",
          cpReport: aiReport,
          cpUserInfo: userInfo,
          cpResult: result,
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoadingAI, aiReport, voiceTriggered]);

  if (isLoadingAI) {
    return (
      <div className="p-6 md:p-10 text-center py-20">
        <Loader2 className="w-10 h-10 text-lioner-gold animate-spin mx-auto mb-6" />
        <p className="text-foreground/60">{t.generating}</p>
      </div>
    );
  }

  const report = aiReport;
  const firstName = userInfo.fullName.split(" ")[0];

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-none border-2 border-lioner-gold/50 mb-4">
          <Shield className="w-7 h-7 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 font-sans uppercase tracking-wide">
          {t.title}
        </h2>
        <p className="text-foreground/50 text-sm">{firstName}, {language === "nl" ? "hier is uw rapport." : "here is your report."}</p>
      </div>

      {/* Risk Level Badge */}
      <div className="text-center">
        <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold mb-3">{t.riskLevel}</h3>
        <div className={`inline-block px-6 py-3 ${c.bg} border ${c.border} ${c.text} text-sm font-bold uppercase tracking-widest`}>
          {result.headline[language]}
        </div>
      </div>

      {/* AI Report or fallback */}
      {report ? (
        <>
          {/* Situation Summary */}
          <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold flex items-center gap-2">
              <FileText className="w-4 h-4" /> {t.summary}
            </h4>
            <p className="text-foreground/80 leading-relaxed">{report.situation_summary}</p>
          </div>

          {/* Risk Indicators */}
          {report.risk_indicators?.length > 0 && (
            <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> {t.indicators}
              </h4>
              <ul className="space-y-2">
                {report.risk_indicators.map((ind, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-lioner-gold mt-2 shrink-0" />
                    <span className="text-foreground/80 text-sm">{ind}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strategic Paths */}
          {report.strategic_paths?.length > 0 && (
            <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.paths}</h4>
              <ul className="space-y-2">
                {report.strategic_paths.map((path, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-lioner-gold mt-2 shrink-0" />
                    <span className="text-foreground/80 text-sm">{path}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Next Step */}
          <div className="p-5 border border-lioner-gold/30 bg-lioner-gold/5 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.nextStep}</h4>
            <p className="text-foreground/80 leading-relaxed">{report.recommended_next_step}</p>
          </div>
        </>
      ) : (
        /* Fallback to static result */
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

      {/* CTA Buttons */}
      <div className="text-center space-y-3 pt-4">
        <Button
          onClick={() => {
            onClose();
            setTimeout(() => {
              openVoiceAgent({
                mode: "capital_protection",
                cpReport: aiReport ?? undefined,
                cpUserInfo: userInfo,
                cpResult: result,
              });
            }, 300);
          }}
          className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-none px-10 py-7 h-auto font-bold uppercase tracking-wider text-base"
        >
          <Mic className="w-5 h-5 mr-3" />
          {t.discussBtn}
        </Button>

        <Button
          asChild
          variant="outline"
          className="w-full border-lioner-gold text-lioner-gold hover:bg-lioner-gold hover:text-white rounded-none px-10 py-7 h-auto font-bold uppercase tracking-wider text-base"
        >
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            {t.bookBtn}
            <ArrowRight className="w-5 h-5 ml-3" />
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
