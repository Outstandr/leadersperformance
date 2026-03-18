import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, FileText, Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { AssessmentResult } from "@/lib/capitalAssessmentScoring";
import { AssessmentUserInfo } from "./AssessmentInfoStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useVoiceAgent } from "@/components/voice/VoiceAgentContext";

interface AssessmentReportStepProps {
  userInfo: AssessmentUserInfo;
  result: AssessmentResult;
  aiReport: AIReport | null;
  responses: Record<string, string | string[]>;
  onClose: () => void;
}

export interface AIReport {
  situationSummary: string;
  strategicRiskLevel: string;
  keyRiskIndicators: string[];
  possibleStrategicPaths: string[];
  recommendedNextStep: string;
}

const tierColors = {
  high_recovery: { bg: "bg-green-500/10", border: "border-green-500", text: "text-green-600", icon: CheckCircle },
  moderate: { bg: "bg-amber-500/10", border: "border-amber-500", text: "text-amber-600", icon: AlertTriangle },
  limited: { bg: "bg-red-500/10", border: "border-red-500", text: "text-red-600", icon: Shield },
};

const ui = {
  en: {
    reportTitle: "Founder Protection Report",
    subtitle: "Initial Strategic Assessment",
    resultType: "Assessment Result",
    nextStep: "Recommended Next Step",
    aiReport: "AI Strategic Report",
    situationSummary: "Situation Summary",
    riskLevel: "Strategic Risk Level",
    riskIndicators: "Key Risk Indicators",
    strategicPaths: "Possible Strategic Paths",
    aiNextStep: "Recommended Next Step",
    confidentiality: "All information submitted through this assessment is treated confidentially. Submitting this assessment does not establish a legal relationship but allows for an initial evaluation of the situation.",
    bookCta: "Schedule Case Review",
    bookDisclaimer: "Schedule a 30-minute confidential conversation with Lionel Eersteling to discuss the situation and possible strategic paths forward.",
    close: "Close",
  },
  nl: {
    reportTitle: "Founder Beschermingsrapport",
    subtitle: "Eerste Strategische Beoordeling",
    resultType: "Beoordelingsresultaat",
    nextStep: "Aanbevolen Volgende Stap",
    aiReport: "AI Strategisch Rapport",
    situationSummary: "Situatie Samenvatting",
    riskLevel: "Strategisch Risiconiveau",
    riskIndicators: "Belangrijkste Risico-indicatoren",
    strategicPaths: "Mogelijke Strategische Paden",
    aiNextStep: "Aanbevolen Volgende Stap",
    confidentiality: "Alle informatie die via deze beoordeling wordt ingediend, wordt vertrouwelijk behandeld. Het indienen van deze beoordeling brengt geen juridische relatie tot stand, maar maakt een eerste evaluatie van de situatie mogelijk.",
    bookCta: "Plan Case Review",
    bookDisclaimer: "Plan een 30-minuten vertrouwelijk gesprek met Lionel Eersteling om de situatie en mogelijke strategische paden te bespreken.",
    close: "Sluiten",
  },
};

export function AssessmentReportStep({ userInfo, result, aiReport, responses, onClose }: AssessmentReportStepProps) {
  const { language } = useLanguage();
  const { openVoiceAgent } = useVoiceAgent();
  const t = ui[language] ?? ui.en;
  const tierStyle = tierColors[result.tier];
  const TierIcon = tierStyle.icon;
  const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j";

  const firstName = userInfo.fullName.split(" ")[0];

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-none border-2 border-lioner-gold/50 mb-3">
          <FileText className="w-6 h-6 text-lioner-gold" />
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 font-sans uppercase tracking-wide">
          {t.reportTitle}
        </h2>
        <p className="text-foreground/50 text-sm">{t.subtitle}</p>
      </div>

      {/* Result Tier */}
      <div className={`p-6 border ${tierStyle.border} ${tierStyle.bg} space-y-3`}>
        <div className="flex items-center gap-2">
          <TierIcon className={`w-5 h-5 ${tierStyle.text}`} />
          <span className={`text-xs uppercase tracking-widest font-bold ${tierStyle.text}`}>
            {t.resultType}: {result.tierLabel}
          </span>
        </div>
        <h3 className="text-lg font-bold text-foreground">{result.headline}</h3>
        <p className="text-foreground/70 leading-relaxed text-sm">{result.description}</p>
        <div className="pt-2 border-t border-foreground/10">
          <p className="text-xs uppercase tracking-widest text-foreground/50 font-semibold mb-1">{t.nextStep}</p>
          <p className="text-foreground/80 text-sm font-medium">{result.nextStep}</p>
        </div>
      </div>

      {/* AI Report */}
      {aiReport && (
        <div className="space-y-5 border-t border-foreground/10 pt-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-lioner-gold" />
            <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.aiReport}</h3>
          </div>

          {/* Situation Summary */}
          <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.situationSummary}</h4>
            <p className="text-foreground/80 leading-relaxed text-sm">{aiReport.situationSummary}</p>
          </div>

          {/* Risk Level */}
          <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.riskLevel}</h4>
            <p className="text-foreground/80 leading-relaxed text-sm">{aiReport.strategicRiskLevel}</p>
          </div>

          {/* Risk Indicators */}
          {aiReport.keyRiskIndicators.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{t.riskIndicators}</h4>
              <ul className="space-y-1">
                {aiReport.keyRiskIndicators.map((indicator, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-red-500 mt-0.5">•</span> {indicator}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Strategic Paths */}
          {aiReport.possibleStrategicPaths.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{t.strategicPaths}</h4>
              <ul className="space-y-1">
                {aiReport.possibleStrategicPaths.map((path, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-foreground/70">
                    <span className="text-lioner-gold mt-0.5">→</span> {path}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Recommended Next Step */}
          <div className="p-5 border border-lioner-gold/20 bg-lioner-gold/5 space-y-2">
            <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.aiNextStep}</h4>
            <p className="text-foreground/80 leading-relaxed text-sm font-medium">{aiReport.recommendedNextStep}</p>
          </div>
        </div>
      )}

      {/* Confidentiality */}
      <p className="text-xs text-foreground/40 italic leading-relaxed">{t.confidentiality}</p>

      {/* CTA */}
      <div className="text-center space-y-3 pt-4">
        {/* Speak with Daisy */}
        <Button
          onClick={() => {
            onClose();
            setTimeout(() => {
              openVoiceAgent({
                mode: "capital_assessment",
                assessmentResult: result,
                assessmentUserInfo: userInfo,
              });
            }, 300);
          }}
          className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-none px-10 py-7 h-auto font-bold uppercase tracking-wider text-base"
        >
          <Mic className="w-5 h-5 mr-3" />
          {language === "nl" ? "Bespreek met Daisy" : "Discuss with Daisy"}
        </Button>

        {/* Book Case Review */}
        <Button
          asChild
          className="w-full bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none px-10 py-7 h-auto font-bold uppercase tracking-wider text-base"
        >
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            {t.bookCta}
            <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </Button>
        <p className="text-xs text-foreground/40 italic">{t.bookDisclaimer}</p>
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
