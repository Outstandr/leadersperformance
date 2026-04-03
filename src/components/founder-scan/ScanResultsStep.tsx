import { PressureScores } from "@/lib/founderPressureScoring";
import { ColorTier } from "@/lib/unifiedScoring";
import { ScanUserInfo } from "./ScanGateStep";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { ScanVoiceWidget } from "@/components/shared/ScanVoiceWidget";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ScanResultsStepProps {
  userInfo: ScanUserInfo;
  scores: PressureScores;
  onClose: () => void;
}

// --- Color system per spec ---
const tierColors: Record<ColorTier, { bar: string; text: string; bg: string; border: string }> = {
  green:   { bar: "#3BAA6B", text: "text-[#3BAA6B]", bg: "bg-[#3BAA6B]/10", border: "border-[#3BAA6B]/30" },
  yellow:  { bar: "#F59E0B", text: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/30" },
  orange:  { bar: "#F59E0B", text: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", border: "border-[#F59E0B]/30" },
  red:     { bar: "#DC2626", text: "text-[#DC2626]", bg: "bg-[#DC2626]/10", border: "border-[#DC2626]/30" },
  darkred: { bar: "#DC2626", text: "text-[#DC2626]", bg: "bg-[#DC2626]/10", border: "border-[#DC2626]/30" },
};

function getScoreLabel(score: number, lang: "en" | "nl"): string {
  if (score <= 30) return lang === "nl" ? "Stabiel" : "Stable";
  if (score <= 55) return lang === "nl" ? "Opkomende Druk" : "Emerging Pressure";
  if (score <= 75) return lang === "nl" ? "Drukzone" : "Pressure Zone";
  return lang === "nl" ? "Hoog Risico Zone" : "High Risk Zone";
}

function getBarGradient(score: number): string {
  if (score <= 30) return "linear-gradient(90deg, #3BAA6B 0%, #3BAA6B 100%)";
  if (score <= 55) return "linear-gradient(90deg, #3BAA6B 0%, #F59E0B 100%)";
  if (score <= 75) return "linear-gradient(90deg, #F59E0B 0%, #DC2626 100%)";
  return "linear-gradient(90deg, #DC2626 0%, #991b1b 100%)";
}

function getScoreColor(score: number): string {
  if (score <= 30) return "#3BAA6B";
  if (score <= 55) return "#F59E0B";
  if (score <= 75) return "#DC2626";
  return "#991b1b";
}

function getReinforcingStatements(bottleneckKey: string, lang: "en" | "nl"): string[] {
  const statements: Record<string, { en: string[]; nl: string[] }> = {
    decision_pressure: {
      en: [
        "You are the bottleneck in every critical decision.",
        "Your team waits for permission instead of executing.",
        "This will not stabilize without structural intervention.",
      ],
      nl: [
        "U bent de bottleneck bij elke kritieke beslissing.",
        "Uw team wacht op toestemming in plaats van uit te voeren.",
        "Dit stabiliseert niet zonder structurele interventie.",
      ],
    },
    founder_dependency: {
      en: [
        "You are carrying too much yourself.",
        "Your structure is not absorbing growth.",
        "This will not stabilize without intervention.",
      ],
      nl: [
        "U draagt te veel alleen.",
        "Uw structuur absorbeert de groei niet.",
        "Dit stabiliseert niet zonder interventie.",
      ],
    },
    leadership_alignment: {
      en: [
        "Your leadership team is not aligned on direction.",
        "Strategic intent is lost in operational noise.",
        "Without correction, this gap will widen under pressure.",
      ],
      nl: [
        "Uw leiderschapsteam is niet afgestemd op richting.",
        "Strategische intentie verdwijnt in operationele ruis.",
        "Zonder correctie wordt deze kloof groter onder druk.",
      ],
    },
    execution_momentum: {
      en: [
        "Projects stall without your direct involvement.",
        "Your team lacks self-sustaining execution systems.",
        "Growth is limited by your personal bandwidth.",
      ],
      nl: [
        "Projecten stagneren zonder uw directe betrokkenheid.",
        "Uw team mist zelfstandige uitvoeringssystemen.",
        "Groei wordt beperkt door uw persoonlijke bandbreedte.",
      ],
    },
  };
  return statements[bottleneckKey]?.[lang] || statements.founder_dependency[lang];
}

function getBottleneckDiagnostic(bottleneckKey: string, lang: "en" | "nl"): string {
  const diagnostics: Record<string, { en: string; nl: string }> = {
    decision_pressure: {
      en: "Your system is overloaded by decision pressure",
      nl: "Uw systeem is overbelast door beslissingsdruk",
    },
    founder_dependency: {
      en: "Your system is overloaded by founder dependency",
      nl: "Uw systeem is overbelast door founderafhankelijkheid",
    },
    leadership_alignment: {
      en: "Your system is destabilized by leadership misalignment",
      nl: "Uw systeem is gedestabiliseerd door gebrekkige leiderschapsafstemming",
    },
    execution_momentum: {
      en: "Your system is overloaded by execution pressure",
      nl: "Uw systeem is overbelast door uitvoeringsdruk",
    },
  };
  return diagnostics[bottleneckKey]?.[lang] || diagnostics.founder_dependency[lang];
}

const ui = {
  en: {
    headline: "You are operating under structural pressure",
    bottleneckLabel: "Primary Bottleneck",
    breakdown: "Pressure Dimensions",
    realityCheck: "Structural Diagnosis",
    ctaBtn: "Fix the pressure before it breaks your structure",
    ctaSub: "Private 30-minute intervention session",
    close: "Return to Homepage",
  },
  nl: {
    headline: "U opereert onder structurele druk",
    bottleneckLabel: "Primaire Bottleneck",
    breakdown: "Drukdimensies",
    realityCheck: "Structurele Diagnose",
    ctaBtn: "Los de druk op voordat het uw structuur breekt",
    ctaSub: "Privé 30 minuten interventie sessie",
    close: "Terug naar startpagina",
  },
};

export function ScanResultsStep({ userInfo, scores, onClose }: ScanResultsStepProps) {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = ui[language] ?? ui.en;

  const firstName = userInfo.fullName.split(" ")[0];
  const nameParts = userInfo.fullName.trim().split(/\s+/);
  const lastName = nameParts.slice(1).join(" ") || "";
  const primarySection = scores.sections.reduce((a, b) => a.score > b.score ? a : b);
  const bottleneckKey = scores.primaryBottleneck.dimensionKey || primarySection.section;
  const scoreColor = getScoreColor(scores.overall);
  const scoreLabel = getScoreLabel(scores.overall, language);
  const reinforcements = getReinforcingStatements(bottleneckKey, language);
  const bottleneckDiagnostic = getBottleneckDiagnostic(bottleneckKey, language);

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

  const handleReturnHome = () => {
    onClose();
    navigate("/");
  };

  return (
    <div className="space-y-0" style={{ backgroundColor: "#F5F3EF" }}>
      {/* ═══════════════════════════════════════════ */}
      {/* ABOVE THE FOLD — Psychological Statement + Score + Bottleneck */}
      {/* ═══════════════════════════════════════════ */}
      <div className="p-6 md:p-10 space-y-8">

        {/* 1. HEADLINE — Psychological Statement */}
        <div className="text-center space-y-2 pt-2">
          <p className="text-[10px] uppercase tracking-[0.25em] font-semibold" style={{ color: "#8B7355" }}>
            {firstName}, {language === "nl" ? "jouw diagnose" : "your diagnosis"}
          </p>
          <h2 className="text-xl md:text-2xl font-bold leading-tight" style={{ color: "#1F2A37" }}>
            {t.headline}
          </h2>
        </div>

        {/* 2. SCORE DISPLAY — Number + Dynamic Label + Gradient Bar */}
        <div className="space-y-4">
          <div className="text-center space-y-3">
            <div className="inline-flex items-baseline gap-1">
              <span className="text-7xl md:text-8xl font-black leading-none" style={{ color: scoreColor }}>
                {scores.overall}
              </span>
              <span className="text-lg font-medium" style={{ color: "#1F2A37", opacity: 0.4 }}>/100</span>
            </div>
            <div
              className="inline-block px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white"
              style={{ backgroundColor: scoreColor }}
            >
              {scoreLabel}
            </div>
          </div>

          {/* Gradient pressure bar */}
          <div className="space-y-1">
            <div className="h-3 w-full rounded-none overflow-hidden" style={{ backgroundColor: "#E5E1DB" }}>
              <div
                className="h-full transition-all duration-1000 ease-out"
                style={{
                  width: `${scores.overall}%`,
                  background: getBarGradient(scores.overall),
                }}
              />
            </div>
            <div className="flex justify-between text-[9px] uppercase tracking-wider font-medium" style={{ color: "#1F2A37", opacity: 0.35 }}>
              <span>{language === "nl" ? "Stabiel" : "Stable"}</span>
              <span>{language === "nl" ? "Druk" : "Pressure"}</span>
              <span>{language === "nl" ? "Kritiek" : "Critical"}</span>
            </div>
          </div>
        </div>

        {/* 3. PRIMARY BOTTLENECK — Diagnostic language */}
        <div className="p-6 space-y-4" style={{ backgroundColor: "#1F2A37" }}>
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#8B7355" }}>
            {t.bottleneckLabel}
          </p>
          <p className="text-lg md:text-xl font-bold leading-tight text-white">
            {bottleneckDiagnostic}
          </p>
          <div className="space-y-2 pt-1">
            {reinforcements.map((statement, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: "#DC2626" }} />
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  {statement}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. DAISY — Speak to an advisor */}
        <ScanVoiceWidget
          mode="pressure_scan"
          userInfo={{ fullName: userInfo.fullName, email: userInfo.email, phone: userInfo.phone }}
          contextPayload={voiceContext}
          bookingType="Founder Pressure Intervention"
          calendarId="uebxQpVIy9vX7tR5rL9E"
          webhookPayload={webhookPayload}
        />

        {/* Scroll indicator */}
        <div className="text-center pt-1">
          <ChevronDown className="w-5 h-5 mx-auto animate-bounce" style={{ color: "rgba(31,42,55,0.2)" }} />
        </div>
      </div>

      {/* ═══════════════════════════════════════════ */}
      {/* BELOW THE FOLD — Metrics + Diagnosis + CTA  */}
      {/* ═══════════════════════════════════════════ */}
      <div className="p-6 md:p-10 space-y-8" style={{ borderTop: "1px solid rgba(31,42,55,0.08)" }}>

        {/* 5. METRICS — Four dimensions with colored bars */}
        <div className="space-y-5">
          <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "#8B7355" }}>
            {t.breakdown}
          </h3>
          {scores.sections.map((s) => {
            const tc = tierColors[s.color];
            const isPrimary = s.section === primarySection.section;
            return (
              <div key={s.section} className={`space-y-2 transition-opacity duration-300 ${isPrimary ? "opacity-100" : "opacity-50"}`}>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium" style={{ color: "#1F2A37" }}>{s.sectionLabel}</span>
                  <span className="text-sm font-bold" style={{ color: tc.bar }}>{s.score}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden" style={{ backgroundColor: "#E5E1DB" }}>
                  <div
                    className="h-full transition-all duration-1000 ease-out"
                    style={{ width: `${s.score}%`, backgroundColor: tc.bar }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 6. STRUCTURAL DIAGNOSIS — Reality check */}
        <div className="p-6 text-center space-y-3" style={{ backgroundColor: "#1F2A37" }}>
          <p className="text-[10px] uppercase tracking-[0.2em] font-semibold" style={{ color: "rgba(255,255,255,0.35)" }}>
            {t.realityCheck}
          </p>
          <p className="text-base md:text-lg font-bold leading-tight text-white">
            {scores.diagnosis}
          </p>
        </div>

        {/* 7. RETURN HOME */}
        <div className="text-center pt-2 pb-4">
          <Button
            variant="outline"
            onClick={handleReturnHome}
            className="px-8 py-3 text-sm font-medium"
            style={{
              borderColor: "rgba(31,42,55,0.15)",
              color: "rgba(31,42,55,0.6)",
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
