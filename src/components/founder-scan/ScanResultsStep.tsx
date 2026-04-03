import { PressureScores } from "@/lib/founderPressureScoring";
import { ColorTier, colorConfig } from "@/lib/unifiedScoring";
import { ScanUserInfo } from "./ScanGateStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanResultsStepProps {
  userInfo: ScanUserInfo;
  scores: PressureScores;
  onClose: () => void;
}

function ScoreBlock({ score, color }: { score: number; color: ColorTier }) {
  const c = colorConfig[color];
  return (
    <div className="flex flex-col items-center space-y-2">
      <span className={`text-7xl md:text-8xl font-black ${c.text} leading-none`}>{score}</span>
      <div className={`px-4 py-1.5 ${c.bg} border ${c.border} ${c.text} text-xs font-bold uppercase tracking-widest`}>
        {score <= 30 ? "Healthy" : score <= 55 ? "Early Pressure" : score <= 75 ? "Structural Pressure" : score <= 90 ? "Bottleneck Risk" : "Critical"}
      </div>
    </div>
  );
}

function SectionBar({ label, score, color, isPrimary }: { label: string; score: number; color: ColorTier; isPrimary: boolean }) {
  const c = colorConfig[color];
  return (
    <div className={`space-y-2 transition-opacity ${isPrimary ? "opacity-100" : "opacity-40"}`}>
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground/80">{label}</span>
        <span className={`text-sm font-bold ${c.text}`}>{score}%</span>
      </div>
      <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
        <div
          className="h-full transition-all duration-1000"
          style={{ width: `${score}%`, backgroundColor: c.stroke }}
        />
      </div>
    </div>
  );
}

const ui = {
  en: {
    subline: "This indicates structural pressure in your company.",
    bottleneckLabel: "Primary Bottleneck",
    daisyMessage: "I've analyzed your results. Let me explain what this means for your company.",
    explainBtn: "Explain my results",
    skipBtn: "Skip",
    breakdown: "Dimension Analysis",
    realityCheck: "Reality Check",
    ctaBtn: "Apply for Strategic Intervention Review",
    ctaSub: "Limited availability — cases are reviewed, not automatically accepted.",
    close: "Close",
  },
  nl: {
    subline: "Dit wijst op structurele druk in uw bedrijf.",
    bottleneckLabel: "Primaire Bottleneck",
    daisyMessage: "Ik heb uw resultaten geanalyseerd. Laat me uitleggen wat dit betekent voor uw bedrijf.",
    explainBtn: "Leg mijn resultaten uit",
    skipBtn: "Overslaan",
    breakdown: "Dimensieanalyse",
    realityCheck: "Realiteitscheck",
    ctaBtn: "Aanvragen voor Strategische Interventie Review",
    ctaSub: "Beperkte beschikbaarheid — cases worden beoordeeld, niet automatisch geaccepteerd.",
    close: "Sluiten",
  },
};

export function ScanResultsStep({ userInfo, scores, onClose }: ScanResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;

  const firstName = userInfo.fullName.split(" ")[0];
  const nameParts = userInfo.fullName.trim().split(/\s+/);
  const lastName = nameParts.slice(1).join(" ") || "";
  const primarySection = scores.sections.reduce((a, b) => a.score > b.score ? a : b);

  const voiceContext = {
    fullName: userInfo.fullName,
    company: userInfo.company,
    phone: userInfo.phone,
    email: userInfo.email,
    overall: scores.overall,
    overallColor: scores.overallColor,
    title: scores.title,
    diagnosis: scores.diagnosis,
    recommendation: scores.recommendation,
    sections: scores.sections.map(s => ({
      section: s.section,
      sectionLabel: s.sectionLabel,
      score: s.score,
      color: s.color,
    })),
    primaryBottleneck: {
      dimensionLabel: scores.primaryBottleneck.dimensionLabel[language],
      impact: scores.primaryBottleneck.impact[language],
    },
  };

  // GHL webhook payload — fired by ScanVoiceWidget after Daisy ends or 10min timeout
  const webhookPayload = {
    first_name: firstName,
    last_name: lastName,
    email: userInfo.email,
    phone: userInfo.phone,
    company: userInfo.company,
    fps_score: scores.overall,
    discipline_score: scores.overall,
    tier: scores.title,
    audit_type: "founder_pressure_scan",
    language,
    decision_pressure_score: scores.sections[0]?.score,
    founder_dependency_score: scores.sections[1]?.score,
    leadership_alignment_score: scores.sections[2]?.score,
    execution_momentum_score: scores.sections[3]?.score,
    primary_bottleneck: scores.primaryBottleneck.dimensionLabel[language],
    diagnosis: scores.diagnosis,
    recommendation: scores.recommendation,
  };

  return (
    <div className="space-y-0">
      {/* ═══════════════════════════════════════════ */}
      {/* ABOVE THE FOLD — Score + Bottleneck + Daisy */}
      {/* ═══════════════════════════════════════════ */}
      <div className="p-6 md:p-10 space-y-8">
        {/* 1. SCORE BLOCK */}
        <div className="text-center space-y-3 pt-2">
          <p className="text-xs text-foreground/40 uppercase tracking-widest">{firstName}, {language === "nl" ? "jouw resultaat" : "your result"}</p>
          <ScoreBlock score={scores.overall} color={scores.overallColor} />
          <p className="text-sm text-foreground/60 max-w-sm mx-auto">{t.subline}</p>
        </div>

        {/* 2. PRIMARY BOTTLENECK — dominant block */}
        <div className="p-6 bg-red-950 text-white space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-red-300 font-semibold">{t.bottleneckLabel}</p>
          <p className="text-xl md:text-2xl font-black leading-tight">
            {scores.primaryBottleneck.dimensionLabel[language]}
          </p>
          <p className="text-sm text-red-100/80 leading-relaxed">
            {scores.primaryBottleneck.impact[language]}
          </p>
        </div>

        {/* 3. DAISY — Immediate activation */}
        <ScanVoiceWidget
          mode="pressure_scan"
          userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
          contextPayload={voiceContext}
          bookingType="Founder Pressure Intervention"
          calendarId="uebxQpVIy9vX7tR5rL9E"
          webhookPayload={webhookPayload}
        />

        {/* Scroll indicator */}
        <div className="text-center pt-2">
          <ChevronDown className="w-5 h-5 text-foreground/20 mx-auto animate-bounce" />
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* BELOW THE FOLD — Breakdown + Reality + CTA  */}
      {/* ═══════════════════════════════════════════ */}
      <div className="p-6 md:p-10 space-y-8 border-t border-foreground/10">
        {/* 4. VISUAL BREAKDOWN — primary highlighted, others faded */}
        <div className="space-y-4">
          <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">{t.breakdown}</h3>
          {scores.sections.map((s) => (
            <SectionBar
              key={s.section}
              label={s.sectionLabel}
              score={s.score}
              color={s.color}
              isPrimary={s.section === primarySection.section}
            />
          ))}
        </div>

        {/* 5. REALITY CHECK — dark visual block */}
        <div className="p-6 bg-foreground text-background text-center space-y-2">
          <p className="text-[10px] uppercase tracking-[0.2em] text-background/40 font-semibold">{t.realityCheck}</p>
          <p className="text-lg md:text-xl font-black leading-tight">
            {scores.diagnosis}
          </p>
        </div>

        {/* Close */}
        <div className="text-center">
          <Button variant="outline" onClick={onClose} className="border-foreground/20 hover:bg-foreground/5 text-foreground/70 hover:text-foreground px-8 py-3">
            {lang === "en" ? "Return to Homepage" : "Terug naar startpagina"}
          </Button>
        </div>
      </div>
    </div>
  );
}
