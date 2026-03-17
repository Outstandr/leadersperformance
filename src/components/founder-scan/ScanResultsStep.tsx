import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PressureScores } from "@/lib/founderPressureScoring";
import { ScanUserInfo } from "./ScanGateStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface ScanResultsStepProps {
  userInfo: ScanUserInfo;
  scores: PressureScores;
  onClose: () => void;
}

const colorMap = {
  green: { stroke: "#22c55e", text: "text-green-500", bg: "bg-green-500/20", border: "border-green-500", label: { en: "Stable", nl: "Stabiel" } },
  orange: { stroke: "#f59e0b", text: "text-amber-500", bg: "bg-amber-500/20", border: "border-amber-500", label: { en: "Pressure Zone", nl: "Drukzone" } },
  red: { stroke: "#ef4444", text: "text-red-500", bg: "bg-red-500/20", border: "border-red-500", label: { en: "Bottleneck Risk", nl: "Bottleneck Risico" } },
};

function OverallGauge({ score, color }: { score: number; color: "green" | "orange" | "red" }) {
  const c = colorMap[color];
  const dashOffset = 251.2 - (score / 100) * 251.2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40">
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 96 96">
          <circle cx="48" cy="48" r="40" stroke="rgba(0,0,0,0.08)" strokeWidth="8" fill="none" />
          <circle
            cx="48" cy="48" r="40"
            stroke={c.stroke}
            strokeWidth="8" fill="none"
            strokeDasharray="251.2"
            strokeDashoffset={dashOffset}
            strokeLinecap="butt"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black ${c.text}`}>{score}%</span>
        </div>
      </div>
    </div>
  );
}

function SectionBar({ label, score, color }: { label: string; score: number; color: "green" | "orange" | "red" }) {
  const c = colorMap[color];
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-foreground/80">{label}</span>
        <span className={`text-sm font-bold ${c.text}`}>{score}%</span>
      </div>
      <div className="h-2 w-full bg-foreground/10 rounded-none overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${color === "green" ? "bg-green-500" : color === "orange" ? "bg-amber-500" : "bg-red-500"}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

const ui = {
  en: {
    resultsTitle: "Founder Pressure Report",
    overallPressure: "Overall Founder Pressure",
    sectionBreakdown: "Section Breakdown",
    diagnosis: "Diagnosis",
    recommendation: "Recommendation",
    ctaBtn: "Discuss This With Lionel",
    disclaimer: "Book a strategic session to address these findings.",
    close: "Close",
  },
  nl: {
    resultsTitle: "Founder Drukrapport",
    overallPressure: "Totale Founderdruk",
    sectionBreakdown: "Sectie Overzicht",
    diagnosis: "Diagnose",
    recommendation: "Aanbeveling",
    ctaBtn: "Bespreek dit met Lionel",
    disclaimer: "Plan een strategische sessie om deze bevindingen te bespreken.",
    close: "Sluiten",
  },
};

export function ScanResultsStep({ userInfo, scores, onClose }: ScanResultsStepProps) {
  const { language } = useLanguage();
  const t = ui[language] ?? ui.en;
  const c = colorMap[scores.overallColor];
  const bookingUrl = "https://api.leadconnectorhq.com/widget/booking/NE13SD9blCXUJeVghk6j";

  const firstName = userInfo.fullName.split(" ")[0];

  return (
    <div className="p-6 md:p-10 space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-black text-foreground mb-1 font-sans uppercase tracking-wide">
          {t.resultsTitle}
        </h2>
        <p className="text-foreground/50 text-sm">{firstName}, {language === "nl" ? "hier zijn jouw resultaten." : "here are your results."}</p>
      </div>

      {/* Overall Score */}
      <div className="text-center space-y-3">
        <h3 className="text-xs uppercase tracking-widest text-foreground/50 font-semibold">{t.overallPressure}</h3>
        <OverallGauge score={scores.overall} color={scores.overallColor} />
        <div className={`inline-block px-4 py-2 ${c.bg} border ${c.border} ${c.text} text-sm font-bold uppercase tracking-widest`}>
          {scores.title}
        </div>
      </div>

      {/* Section Breakdown */}
      <div className="space-y-4">
        <h3 className="text-xs uppercase tracking-widest text-lioner-gold font-semibold">{t.sectionBreakdown}</h3>
        {scores.sections.map((s) => (
          <SectionBar key={s.section} label={s.sectionLabel} score={s.score} color={s.color} />
        ))}
      </div>

      {/* Diagnosis */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.diagnosis}</h4>
        <p className="text-foreground/80 leading-relaxed">{scores.diagnosis}</p>
      </div>

      {/* Recommendation */}
      <div className="p-5 border border-foreground/10 bg-foreground/[0.03] space-y-3">
        <h4 className="text-xs uppercase tracking-widest text-lioner-gold font-bold">{t.recommendation}</h4>
        <p className="text-foreground/80 leading-relaxed">{scores.recommendation}</p>
      </div>

      {/* CTA */}
      <div className="text-center space-y-3 pt-4">
        <Button
          asChild
          className="bg-lioner-gold hover:bg-lioner-gold/90 text-white rounded-none px-10 py-7 h-auto font-bold uppercase tracking-wider text-base"
        >
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
            {t.ctaBtn}
            <ArrowRight className="w-5 h-5 ml-3" />
          </a>
        </Button>
        <p className="text-xs text-foreground/40 italic">{t.disclaimer}</p>
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
