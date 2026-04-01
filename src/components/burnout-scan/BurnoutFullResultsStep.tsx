import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PressureFullResult } from "@/lib/burnoutScoring";
import { colorConfig, ColorTier } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { ScanUserInfo } from "@/components/founder-scan/ScanGateStep";
import { AlertTriangle, Clock, Brain, Shield, Activity, Target, TrendingDown, Zap, Loader2, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface BurnoutFullResultsStepProps {
  result: PressureFullResult;
  userInfo: ScanUserInfo;
  onClose: () => void;
  fullResponses?: Record<string, number>;
}

interface DeepReport {
  executive_summary: string;
  pressure_architecture: string;
  nervous_system_status: string;
  structural_vulnerability: string;
  recovery_infrastructure: string;
  cross_domain_risks: string;
  trajectory_90_day: string;
  intervention_protocol: string[];
  critical_warning: string;
}

function ReportSection({ icon: Icon, title, content, variant = "default" }: { icon: any; title: string; content: string; variant?: "default" | "warning" | "critical" }) {
  const borderClass = variant === "critical" ? "border-red-500/40 bg-red-500/5" : variant === "warning" ? "border-amber-500/30 bg-amber-500/5" : "border-foreground/10 bg-foreground/[0.03]";
  const iconClass = variant === "critical" ? "text-red-500" : variant === "warning" ? "text-amber-500" : "text-lioner-gold";
  const titleClass = variant === "critical" ? "text-red-500" : variant === "warning" ? "text-amber-500" : "text-lioner-gold";

  return (
    <div className={`p-5 border ${borderClass} space-y-3`}>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${iconClass}`} />
        <h4 className={`text-xs uppercase tracking-widest ${titleClass} font-bold`}>{title}</h4>
      </div>
      <p className="text-foreground/80 leading-relaxed text-sm">{content}</p>
    </div>
  );
}

const ui = {
  en: {
    subline: "This indicates your current pressure risk level.",
    pressurePhase: "Pressure Phase",
    recovery: "Recovery Timeline",
    without: "Without intervention",
    with: "With structured intervention",
    breakdown: "Domain Analysis",
    primaryRisk: "Primary Risk Domain",
    realityCheck: "Reality Check",
    deepAnalysis: "In-Depth AI Analysis",
    generating: "Generating your personalized deep diagnostic...",
    executiveSummary: "Executive Summary",
    pressureArchitecture: "Pressure Architecture Analysis",
    nervousSystem: "Nervous System Status",
    structuralVulnerability: "Structural Vulnerability Map",
    recoveryInfrastructure: "Recovery Infrastructure Assessment",
    crossDomain: "Cross-Domain Risk Interactions",
    trajectory: "90-Day Trajectory Without Intervention",
    interventionProtocol: "Strategic Intervention Protocol",
    criticalWarning: "Critical Warning",
    close: "Close",
  },
  nl: {
    subline: "Dit toont uw huidige drukniveau.",
    pressurePhase: "Drukfase",
    recovery: "Hersteltijdlijn",
    without: "Zonder interventie",
    with: "Met gestructureerde interventie",
    breakdown: "Domeinanalyse",
    primaryRisk: "Primair Risicodomein",
    realityCheck: "Realiteitscheck",
    deepAnalysis: "Diepgaande AI Analyse",
    generating: "Uw gepersonaliseerde diepte-diagnose wordt gegenereerd...",
    executiveSummary: "Samenvatting",
    pressureArchitecture: "Drukarchitectuur Analyse",
    nervousSystem: "Zenuwstelsel Status",
    structuralVulnerability: "Structurele Kwetsbaarheden",
    recoveryInfrastructure: "Herstelinfrastructuur Beoordeling",
    crossDomain: "Cross-Domein Risico-interacties",
    trajectory: "90-Dagen Traject Zonder Interventie",
    interventionProtocol: "Strategisch Interventieprotocol",
    criticalWarning: "Kritieke Waarschuwing",
    close: "Sluiten",
  },
};

export function BurnoutFullResultsStep({ result, userInfo, onClose, fullResponses }: BurnoutFullResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const c = colorConfig[result.fpsColor];
  const firstName = userInfo.fullName.split(" ")[0];
  const [deepReport, setDeepReport] = useState<DeepReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportError, setReportError] = useState(false);

  const primaryDomain = result.domainScores.reduce((a, b) => a.score > b.score ? a : b);

  useEffect(() => {
    generateDeepReport();
  }, []);

  const generateDeepReport = async () => {
    setIsGenerating(true);
    setReportError(false);
    try {
      const { data, error } = await supabase.functions.invoke("generate-burnout-report", {
        body: {
          fpsScore: result.fpsScore,
          fpsColor: result.fpsColor,
          phase: result.phase,
          phaseNumber: result.phaseNumber,
          phaseLabel: result.phaseLabel[language],
          domainScores: result.domainScores,
          primaryRiskDomain: result.primaryRiskDomain,
          recoveryWith: result.recoveryWith[language],
          recoveryWithout: result.recoveryWithout[language],
          diagnosis: result.diagnosis,
          recommendation: result.recommendation,
          fullResponses: fullResponses || {},
          language,
        },
      });
      if (error) throw error;
      if (data?.report) setDeepReport(data.report);
      else throw new Error("No report data");
    } catch (err) {
      console.error("Deep report generation error:", err);
      setReportError(true);
    } finally {
      setIsGenerating(false);
    }
  };

  const voiceContext = {
    fullName: userInfo.fullName,
    company: userInfo.company,
    phone: userInfo.phone,
    email: userInfo.email,
    fpsScore: result.fpsScore,
    fpsColor: result.fpsColor,
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
    <div className="space-y-0">
      {/* ═══ ABOVE THE FOLD ═══ */}
      <div className="p-6 md:p-10 space-y-8">
        {/* 1. SCORE BLOCK */}
        <div className="text-center space-y-3 pt-2">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">{firstName}, {language === "nl" ? "jouw volledige diagnose" : "your full diagnosis"}</p>
          <span className={`text-7xl md:text-8xl font-black ${c.text} leading-none block`}>{result.fpsScore}</span>
          <div className={`inline-block px-4 py-1.5 ${c.bg} border ${c.border} ${c.text} text-xs font-bold uppercase tracking-widest`}>
            {result.fpsLabel[language]}
          </div>
          <p className="text-sm text-foreground/60 max-w-sm mx-auto">{t.subline}</p>
        </div>

        {/* 2. PRESSURE PHASE — dominant block */}
        <div className="p-6 bg-red-950 text-white space-y-3">
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-300 font-semibold">{t.pressurePhase}</p>
          <p className="text-xl md:text-2xl font-black leading-tight">{result.phaseLabel[language]}</p>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className={`h-2 flex-1 ${n <= result.phaseNumber ? "bg-red-500" : "bg-white/10"}`} />
            ))}
          </div>
        </div>

        {/* 3. RECOVERY TIMELINE */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border border-red-500/20 bg-red-500/5 text-center">
            <p className="text-[10px] uppercase tracking-widest text-foreground/50 mb-1">{t.without}</p>
            <p className="text-foreground font-bold text-red-500">{result.recoveryWithout[language]}</p>
          </div>
          <div className="p-4 border border-green-500/20 bg-green-500/5 text-center">
            <p className="text-[10px] uppercase tracking-widest text-foreground/50 mb-1">{t.with}</p>
            <p className="text-foreground font-bold text-green-500">{result.recoveryWith[language]}</p>
          </div>
        </div>

        {/* 4. DAISY — Immediate activation */}
        <ScanVoiceWidget
          mode="burnout_scan"
          userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
          contextPayload={voiceContext}
          bookingType="Founder Pressure Intervention"
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
          {result.domainScores.map((d) => {
            const dc = colorConfig[d.color];
            const isPrimary = d.key === primaryDomain.key;
            return (
              <div key={d.key} className={`space-y-2 transition-opacity ${isPrimary ? "opacity-100" : "opacity-40"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/80">{d.label}</span>
                  <span className={`text-sm font-bold ${dc.text}`}>{d.score}%</span>
                </div>
                <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
                  <div className="h-full transition-all duration-1000" style={{ width: `${d.score}%`, backgroundColor: dc.stroke }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* PRIMARY RISK */}
        <div className="p-5 border border-red-500/20 bg-red-500/5 space-y-2">
          <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.primaryRisk}</h4>
          <p className="text-foreground font-bold">{result.primaryRiskDomain.label}</p>
          <p className="text-foreground/80 leading-relaxed text-sm">{result.primaryRiskDomain.impact}</p>
        </div>

        {/* REALITY CHECK */}
        <div className="p-6 bg-foreground text-background text-center space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-background/40 font-semibold">{t.realityCheck}</p>
          <p className="text-lg md:text-xl font-black leading-tight">{result.diagnosis}</p>
        </div>

        {/* DEEP AI REPORT */}
        <div className="space-y-2 pt-4">
          <div className="border-t-2 border-lioner-gold/30 pt-6">
            <h3 className="text-lg md:text-xl font-black text-foreground uppercase tracking-wide text-center mb-1">
              {t.deepAnalysis}
            </h3>
            <p className="text-center text-xs text-foreground/40 uppercase tracking-widest mb-6">
              {language === "nl" ? "AI-gegenereerd op basis van uw antwoorden" : "AI-generated based on your responses"}
            </p>
          </div>

          {isGenerating && (
            <div className="flex flex-col items-center justify-center py-16 space-y-4">
              <Loader2 className="w-8 h-8 text-lioner-gold animate-spin" />
              <p className="text-foreground/60 text-sm text-center">{t.generating}</p>
            </div>
          )}

          {reportError && (
            <div className="text-center py-8 space-y-4">
              <p className="text-foreground/60 text-sm">{language === "nl" ? "Rapport generatie mislukt." : "Report generation failed."}</p>
              <Button variant="outline" onClick={generateDeepReport} className="border-lioner-gold/30 text-lioner-gold hover:bg-lioner-gold/10">
                {language === "nl" ? "Opnieuw proberen" : "Retry"}
              </Button>
            </div>
          )}

          {deepReport && (
            <div className="space-y-4">
              <ReportSection icon={Target} title={t.executiveSummary} content={deepReport.executive_summary} variant="warning" />
              <ReportSection icon={Activity} title={t.pressureArchitecture} content={deepReport.pressure_architecture} />
              <ReportSection icon={Brain} title={t.nervousSystem} content={deepReport.nervous_system_status} variant="warning" />
              <ReportSection icon={Shield} title={t.structuralVulnerability} content={deepReport.structural_vulnerability} />
              <ReportSection icon={Zap} title={t.recoveryInfrastructure} content={deepReport.recovery_infrastructure} />
              <ReportSection icon={Activity} title={t.crossDomain} content={deepReport.cross_domain_risks} variant="warning" />
              <ReportSection icon={TrendingDown} title={t.trajectory} content={deepReport.trajectory_90_day} variant="critical" />

              <div className="p-5 border-2 border-lioner-gold/30 bg-lioner-gold/5 space-y-3">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-lioner-gold" />
                  <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.interventionProtocol}</h4>
                </div>
                <ol className="space-y-3">
                  {deepReport.intervention_protocol.map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="flex items-center justify-center w-6 h-6 border border-lioner-gold/40 text-lioner-gold text-xs font-bold shrink-0">{i + 1}</span>
                      <span className="text-foreground/80 text-sm leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="p-5 border-2 border-red-500/50 bg-red-500/10 space-y-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <h4 className="text-xs uppercase tracking-widest text-red-500 font-bold">{t.criticalWarning}</h4>
                </div>
                <p className="text-foreground font-semibold leading-relaxed">{deepReport.critical_warning}</p>
              </div>
            </div>
          )}
        </div>

        {/* Close */}
        <div className="text-center">
          <Button variant="ghost" onClick={onClose} className="text-foreground/40 hover:text-foreground/60">
            {t.close}
          </Button>
        </div>
      </div>
    </div>
  );
}
