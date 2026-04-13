import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProfitLeakResult } from "@/lib/profitLeakScoring";
import { colorConfig, ColorTier } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { ScanUserInfo } from "@/components/founder-scan/ScanGateStep";
import { AlertTriangle, TrendingDown, Target, Loader2, Building2, DollarSign, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProfitLeakResultsStepProps {
  result: ProfitLeakResult;
  userInfo: ScanUserInfo;
  onClose: () => void;
  responses: Record<string, number>;
}

interface DeepReport {
  structural_diagnosis: string;
  financial_leakage_analysis: string;
  core_bottleneck: string;
  bottleneck_explanation: string;
  priority_fixes: string[];
  growth_phase_insight: string;
  intervention_recommendation: string;
}

const revenueMultiplier: Record<string, number> = {
  "5m_15m": 10_000_000,
  "15m_30m": 22_500_000,
  "30m_50m": 40_000_000,
  "50m_plus": 75_000_000,
};

export function ProfitLeakResultsStep({ result, userInfo, onClose, responses }: ProfitLeakResultsStepProps) {
  const { language } = useLanguage();
  const [deepReport, setDeepReport] = useState<DeepReport | null>(null);
  const [isLoadingReport, setIsLoadingReport] = useState(true);

  const lang = language === "nl" ? "nl" : "en";
  const c = colorConfig[result.overallColor as ColorTier] || colorConfig.green;

  const midRevenue = revenueMultiplier[result.revenue] || 10_000_000;
  const leakLow = Math.round((midRevenue * result.leakageEstimate.low) / 100);
  const leakHigh = Math.round((midRevenue * result.leakageEstimate.high) / 100);
  const firstName = userInfo.fullName.split(" ")[0];

  const primarySection = result.sectionScores.reduce((a, b) => a.score > b.score ? a : b);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await supabase.functions.invoke("generate-profit-leak-report", {
          body: { result, responses, userInfo: { fullName: userInfo.fullName, company: userInfo.company }, language },
        });
        if (data?.report) setDeepReport(data.report);
      } catch (err) {
        console.error("Report generation error:", err);
      } finally {
        setIsLoadingReport(false);
      }
    };
    const timer = setTimeout(fetchReport, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="space-y-0">
      {/* ═══ ABOVE THE FOLD ═══ */}
      <div className="px-4 md:px-8 py-6 space-y-8">
        {/* 1. SCORE BLOCK */}
        <div className="text-center space-y-3 pt-4">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">{firstName}, {lang === "nl" ? "jouw score" : "your score"}</p>
          <span className={`text-7xl md:text-8xl font-black ${c.text} leading-none block`}>{result.overallScore}</span>
          <p className={`text-sm font-bold ${c.text}`}>{result.growthPhase[lang]}</p>
          <p className="text-sm text-foreground/60 max-w-md mx-auto">{result.growthPhaseDescription[lang]}</p>
        </div>

        {/* 2. PRIMARY BOTTLENECK — dominant */}
        <div className="p-6 bg-red-950 text-white space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-300 font-semibold">
            {lang === "nl" ? "Primair Knelpunt" : "Primary Bottleneck"}
          </p>
          <p className="text-xl md:text-2xl font-black leading-tight">{result.primaryBottleneck[lang]}</p>
        </div>

        {/* 3. FINANCIAL LEAKAGE — impactful number */}
        <div className="p-5 bg-foreground text-background text-center space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-background/40 font-semibold">
            {lang === "nl" ? "Geschat Jaarlijks Verlies" : "Estimated Annual Leakage"}
          </p>
          <p className="text-2xl md:text-3xl font-black text-red-400">
            €{(leakLow / 1000).toFixed(0)}K – €{(leakHigh / 1000).toFixed(0)}K
          </p>
          <p className="text-xs text-background/50">
            {lang === "nl"
              ? "De meeste founders zien dit niet direct omdat het bedrijf nog groeit."
              : "Most founders do not see this because the company is still growing."}
          </p>
        </div>

        {/* 4. DAISY — Immediate activation */}
        <ScanVoiceWidget
          mode="profit_leak"
          userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
          contextPayload={{
            fullName: userInfo.fullName,
            company: userInfo.company,
            phone: userInfo.phone,
            email: userInfo.email,
            overallScore: result.overallScore,
            overallColor: result.overallColor,
            primaryBottleneck: result.primaryBottleneck[lang],
            growthPhase: result.growthPhase[lang],
            revenue: result.revenue,
            estimatedLeakageLow: `€${(leakLow / 1000).toFixed(0)}K`,
            estimatedLeakageHigh: `€${(leakHigh / 1000).toFixed(0)}K`,
            sectionScores: result.sectionScores.map(s => ({ label: s.label, score: s.score, color: s.color })),
          }}
          bookingType="Revenue Architecture Session"
          calendarId="tmX5oPSkDICqFhIxPIo9"
          webhookPayload={{
            first_name: firstName,
            last_name: userInfo.fullName.trim().split(/\s+/).slice(1).join(" ") || "",
            email: userInfo.email,
            phone: userInfo.phone,
            company: userInfo.company,
            audit_type: "profit_leak_scan",
            language: lang,
            overall_score: result.overallScore,
            overall_color: result.overallColor,
            growth_phase: result.growthPhase.en,
            primary_bottleneck: result.primaryBottleneck.en,
            revenue_tier: result.revenue,
          }}
        />

        <div className="text-center pt-2">
          <ChevronDown className="w-5 h-5 text-foreground/20 mx-auto animate-bounce" />
        </div>
      </div>

      {/* ═══ BELOW THE FOLD ═══ */}
      <div className="px-4 md:px-8 py-6 space-y-8 border-t border-foreground/10">
        {/* VISUAL BREAKDOWN — primary highlighted */}
        <div className="space-y-4 p-4 border border-foreground/10">
          <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/60">
            {lang === "nl" ? "Dimensie Scores" : "Dimension Scores"}
          </h3>
          {result.sectionScores.map((sec) => {
            const sc = colorConfig[sec.color as ColorTier] || colorConfig.green;
            const isPrimary = sec.key === primarySection.key;
            return (
              <div key={sec.key} className={`space-y-2 transition-opacity ${isPrimary ? "opacity-100" : "opacity-40"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground/80">{sec.label}</span>
                  <span className={`text-sm font-bold ${sc.text}`}>{sec.score}%</span>
                </div>
                <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
                  <div className="h-full transition-all duration-1000" style={{ width: `${sec.score}%`, backgroundColor: sc.stroke }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep AI Report */}
        {isLoadingReport ? (
          <div className="flex flex-col items-center gap-3 py-8">
            <Loader2 className="w-8 h-8 text-lioner-gold animate-spin" />
            <p className="text-sm text-foreground/50">
              {lang === "nl" ? "Uw Growth Barrier Report wordt gegenereerd..." : "Generating your Growth Barrier Report..."}
            </p>
          </div>
        ) : deepReport ? (
          <div className="space-y-6">
            <div className="p-5 border border-foreground/10">
              <div className="flex items-center gap-3 mb-3">
                <Building2 className="w-5 h-5 text-lioner-gold" />
                <h3 className="font-bold text-foreground">{lang === "nl" ? "Structurele Diagnose" : "Structural Diagnosis"}</h3>
              </div>
              <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed">{deepReport.structural_diagnosis}</p>
            </div>

            <div className="p-5 border border-foreground/10">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-lioner-gold" />
                <h3 className="font-bold text-foreground">{lang === "nl" ? "Kernprobleem" : "The Core Bottleneck"}</h3>
              </div>
              <p className="text-lg font-bold text-lioner-gold mb-2">{deepReport.core_bottleneck}</p>
              <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed">{deepReport.bottleneck_explanation}</p>
            </div>

            <div className="p-5 border border-foreground/10">
              <div className="flex items-center gap-3 mb-3">
                <TrendingDown className="w-5 h-5 text-lioner-gold" />
                <h3 className="font-bold text-foreground">{lang === "nl" ? "Wat Eerst Repareren" : "What to Fix First"}</h3>
              </div>
              <div className="space-y-2">
                {deepReport.priority_fixes.map((fix, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-lioner-gold font-bold text-sm mt-0.5">{i + 1}.</span>
                    <span className="text-sm text-foreground/70">{fix}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 border-2 border-lioner-gold/30 bg-lioner-gold/5">
              <h3 className="font-bold text-foreground mb-2">{lang === "nl" ? "Aanbeveling" : "Recommendation"}</h3>
              <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed">{deepReport.intervention_recommendation}</p>
            </div>
          </div>
        ) : null}

        {/* Second Daisy widget below the report */}
        <ScanVoiceWidget
          mode="profit_leak"
          userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
          contextPayload={{
            fullName: userInfo.fullName,
            company: userInfo.company,
            phone: userInfo.phone,
            email: userInfo.email,
            overallScore: result.overallScore,
            overallColor: result.overallColor,
            primaryBottleneck: result.primaryBottleneck[lang],
            growthPhase: result.growthPhase[lang],
            revenue: result.revenue,
            estimatedLeakageLow: `€${(leakLow / 1000).toFixed(0)}K`,
            estimatedLeakageHigh: `€${(leakHigh / 1000).toFixed(0)}K`,
            sectionScores: result.sectionScores.map(s => ({ label: s.label, score: s.score, color: s.color })),
          }}
          bookingType="Revenue Architecture Session"
          calendarId="tmX5oPSkDICqFhIxPIo9"
          webhookPayload={{
            first_name: firstName,
            last_name: userInfo.fullName.trim().split(/\s+/).slice(1).join(" ") || "",
            email: userInfo.email,
            phone: userInfo.phone,
            company: userInfo.company,
            audit_type: "profit_leak_scan",
            language: lang,
            overall_score: result.overallScore,
            overall_color: result.overallColor,
            growth_phase: result.growthPhase.en,
            primary_bottleneck: result.primaryBottleneck.en,
            revenue_tier: result.revenue,
          }}
        />

        <div className="text-center pb-4">
          <Button variant="outline" onClick={onClose} className="border-foreground/20 hover:bg-foreground/5 text-foreground/70 hover:text-foreground px-8 py-3">
            {lang === "nl" ? "Terug naar startpagina" : "Return to Homepage"}
          </Button>
        </div>
      </div>
    </div>
  );
}
