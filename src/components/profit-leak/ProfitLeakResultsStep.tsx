import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ProfitLeakResult } from "@/lib/profitLeakScoring";
import { colorConfig, ColorTier } from "@/lib/unifiedScoring";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { ScanUserInfo } from "@/components/founder-scan/ScanGateStep";
import { BarChart3, AlertTriangle, TrendingDown, Target, Loader2, Building2, DollarSign } from "lucide-react";
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

function ScoreGauge({ score, color }: { score: number; color: string }) {
  const c = colorConfig[color as ColorTier] || colorConfig.green;
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

function DomainBar({ label, score, color }: { label: string; score: number; color: string }) {
  const c = colorConfig[color as ColorTier] || colorConfig.green;
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

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const { data } = await supabase.functions.invoke("generate-profit-leak-report", {
          body: {
            result,
            responses,
            userInfo: { fullName: userInfo.fullName, company: userInfo.company },
            language,
          },
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
    <div className="space-y-8 px-4 md:px-8 py-6">
      {/* Header */}
      <div className="text-center space-y-4 pt-4">
        <span className="inline-block text-xs uppercase tracking-widest text-lioner-gold font-semibold border border-lioner-gold/30 px-3 py-1">
          {lang === "nl" ? "Growth Barrier Diagnose" : "Growth Barrier Diagnosis"}
        </span>
        <h1 className="text-2xl md:text-3xl font-bold text-foreground font-sans">
          {lang === "nl" ? "Uw Profit Leak Score" : "Your Profit Leak Score"}
        </h1>
      </div>

      {/* Main Score */}
      <div className="flex flex-col items-center gap-4">
        <ScoreGauge score={result.overallScore} color={result.overallColor} />
        <div className="text-center">
          <p className={`text-lg font-bold ${c.text}`}>
            {result.growthPhase[lang]}
          </p>
          <p className="text-sm text-foreground/60 max-w-md mt-1">
            {result.growthPhaseDescription[lang]}
          </p>
        </div>
      </div>

      {/* Domain Scores */}
      <div className="space-y-4 p-4 border border-foreground/10">
        <h3 className="text-sm font-bold uppercase tracking-wider text-foreground/60">
          {lang === "nl" ? "Dimensie Scores" : "Dimension Scores"}
        </h3>
        {result.sectionScores.map((sec) => (
          <DomainBar key={sec.key} label={sec.label} score={sec.score} color={sec.color} />
        ))}
      </div>

      {/* Primary Bottleneck */}
      <div className="p-5 border-2 border-lioner-gold/30 bg-lioner-gold/5">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="w-5 h-5 text-lioner-gold" />
          <h3 className="font-bold text-foreground">
            {lang === "nl" ? "Primair Knelpunt" : "Primary Bottleneck"}
          </h3>
        </div>
        <p className="text-lg font-bold text-lioner-gold">{result.primaryBottleneck[lang]}</p>
      </div>

      {/* Financial Leakage Estimate */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.02]">
        <div className="flex items-center gap-3 mb-3">
          <DollarSign className="w-5 h-5 text-red-500" />
          <h3 className="font-bold text-foreground">
            {lang === "nl" ? "Geschat Financieel Verlies" : "Estimated Financial Leakage"}
          </h3>
        </div>
        <p className="text-sm text-foreground/70 mb-3">
          {lang === "nl"
            ? `Bedrijven in uw fase verliezen doorgaans ${result.leakageEstimate.low}% – ${result.leakageEstimate.high}% van potentiële winst door structurele inefficiënties.`
            : `Companies in your phase often lose between ${result.leakageEstimate.low}% – ${result.leakageEstimate.high}% of potential profit due to structural inefficiencies.`}
        </p>
        <div className="bg-red-50 border border-red-200 p-4">
          <p className="text-sm text-red-800 font-semibold">
            {lang === "nl"
              ? `Geschat jaarlijks verlies: €${(leakLow / 1000).toFixed(0)}K – €${(leakHigh / 1000).toFixed(0)}K`
              : `Estimated annual leakage: €${(leakLow / 1000).toFixed(0)}K – €${(leakHigh / 1000).toFixed(0)}K`}
          </p>
          <p className="text-xs text-red-600 mt-1">
            {lang === "nl"
              ? "De meeste founders zien dit niet direct omdat het bedrijf nog groeit."
              : "Most founders do not see this immediately because the company is still growing."}
          </p>
        </div>
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
          {/* Structural Diagnosis */}
          <div className="p-5 border border-foreground/10">
            <div className="flex items-center gap-3 mb-3">
              <Building2 className="w-5 h-5 text-lioner-gold" />
              <h3 className="font-bold text-foreground">
                {lang === "nl" ? "Structurele Diagnose" : "Structural Diagnosis"}
              </h3>
            </div>
            <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed">{deepReport.structural_diagnosis}</p>
          </div>

          {/* Core Bottleneck Detail */}
          <div className="p-5 border border-foreground/10">
            <div className="flex items-center gap-3 mb-3">
              <Target className="w-5 h-5 text-lioner-gold" />
              <h3 className="font-bold text-foreground">
                {lang === "nl" ? "Kernprobleem" : "The Core Bottleneck"}
              </h3>
            </div>
            <p className="text-lg font-bold text-lioner-gold mb-2">{deepReport.core_bottleneck}</p>
            <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed">{deepReport.bottleneck_explanation}</p>
          </div>

          {/* What to Fix First */}
          <div className="p-5 border border-foreground/10">
            <div className="flex items-center gap-3 mb-3">
              <TrendingDown className="w-5 h-5 text-lioner-gold" />
              <h3 className="font-bold text-foreground">
                {lang === "nl" ? "Wat Bedrijven in Uw Fase Eerst Repareren" : "What Companies in Your Phase Fix First"}
              </h3>
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

          {/* Intervention Recommendation */}
          <div className="p-5 border-2 border-lioner-gold/30 bg-lioner-gold/5">
            <h3 className="font-bold text-foreground mb-2">
              {lang === "nl" ? "Aanbeveling" : "Recommendation"}
            </h3>
            <p className="text-sm text-foreground/70 whitespace-pre-line leading-relaxed">{deepReport.intervention_recommendation}</p>
          </div>
        </div>
      ) : null}

      {/* CTA */}
      <div className="p-6 border-2 border-lioner-gold/30 bg-foreground/[0.02] text-center space-y-4">
        <h3 className="text-xl font-bold text-foreground">
          {lang === "nl" ? "Founder Interventie Gesprek" : "Founder Intervention Call"}
        </h3>
        <p className="text-sm text-foreground/60 max-w-md mx-auto">
          {lang === "nl"
            ? "Als u een diepere analyse van uw bedrijfsstructuur en groeibarrières wilt, kunt u een Founder Intervention Call aanvragen."
            : "If you want a deeper analysis of your company structure and growth barriers, you can request a Founder Intervention Call."}
        </p>

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
          bookingType="Founder Intervention Call"
        />
      </div>

      <div className="text-center pb-4">
        <Button variant="ghost" onClick={onClose} className="text-foreground/40 hover:text-foreground/70">
          {lang === "nl" ? "Terug naar startpagina" : "Back to home"}
        </Button>
      </div>
    </div>
  );
}
