import { profitLeakQuestions } from "./profitLeakQuestions";

export interface SectionScore {
  key: string;
  label: string;
  score: number; // 0-100
  color: string;
}

export interface ProfitLeakResult {
  overallScore: number; // 0-100
  overallColor: string;
  growthPhase: { en: string; nl: string };
  growthPhaseDescription: { en: string; nl: string };
  primaryBottleneck: { en: string; nl: string };
  leakageEstimate: { low: number; high: number };
  sectionScores: SectionScore[];
  revenue: string;
}

function getColor(score: number): string {
  if (score <= 30) return "green";
  if (score <= 55) return "yellow";
  if (score <= 75) return "orange";
  if (score <= 90) return "red";
  return "darkred";
}

const sectionLabels: Record<string, { en: string; nl: string }> = {
  founder_dependency: { en: "Founder Dependency", nl: "Founder Afhankelijkheid" },
  structure_leadership: { en: "Structure & Leadership", nl: "Structuur & Leiderschap" },
  decision_speed: { en: "Decision Speed", nl: "Besluitvormingssnelheid" },
  profitability: { en: "Profitability", nl: "Winstgevendheid" },
  scalability: { en: "Scalability", nl: "Schaalbaarheid" },
};

const growthPhases: Record<string, { en: string; nl: string; descEn: string; descNl: string }> = {
  "5m_15m": {
    en: "Founder Bottleneck Phase",
    nl: "Founder Bottleneck Fase",
    descEn: "€5M–€15M companies typically experience this phase where the founder is still the central decision point, limiting growth capacity.",
    descNl: "€5M–€15M bedrijven ervaren doorgaans deze fase waarin de founder nog steeds het centrale beslispunt is, wat de groei beperkt.",
  },
  "15m_30m": {
    en: "Structural Pressure Phase",
    nl: "Structurele Drukfase",
    descEn: "€15M–€30M companies typically enter this phase where leadership gaps and structural inefficiencies start compressing margins.",
    descNl: "€15M–€30M bedrijven komen doorgaans in deze fase waar leiderschapslacunes en structurele inefficiënties de marges beginnen samen te drukken.",
  },
  "30m_50m": {
    en: "Value Creation Phase",
    nl: "Waardecreatie Fase",
    descEn: "€30M–€50M companies typically operate in this phase where strategic alignment and scalable systems determine long-term enterprise value.",
    descNl: "€30M–€50M bedrijven opereren doorgaans in deze fase waar strategische afstemming en schaalbare systemen de langetermijn bedrijfswaarde bepalen.",
  },
  "50m_plus": {
    en: "Enterprise Scaling Phase",
    nl: "Enterprise Schalingsfase",
    descEn: "€50M+ companies require institutional-grade leadership structures and fully autonomous operating systems.",
    descNl: "€50M+ bedrijven vereisen institutionele leiderschapsstructuren en volledig autonome operationele systemen.",
  },
};

function getLeakagePercentage(overallScore: number): { low: number; high: number } {
  if (overallScore <= 30) return { low: 5, high: 10 };
  if (overallScore <= 55) return { low: 10, high: 18 };
  if (overallScore <= 75) return { low: 15, high: 25 };
  if (overallScore <= 90) return { low: 20, high: 30 };
  return { low: 25, high: 35 };
}

export function calculateProfitLeakScore(
  responses: Record<string, number>,
  revenue: string,
  language: string
): ProfitLeakResult {
  const sections = ["founder_dependency", "structure_leadership", "decision_speed", "profitability", "scalability"] as const;
  const lang = language === "nl" ? "nl" : "en";

  const sectionScores: SectionScore[] = sections.map((section) => {
    const sectionQs = profitLeakQuestions.filter((q) => q.section === section);
    const maxPoints = sectionQs.length * 4;
    const rawScore = sectionQs.reduce((sum, q) => sum + (responses[q.id] || 1), 0);
    // Normalize: 1 = best (0%), 4 = worst (100%)
    const normalized = Math.min(100, Math.max(0, Math.round(((rawScore - sectionQs.length) / (maxPoints - sectionQs.length)) * 100)));
    return {
      key: section,
      label: sectionLabels[section][lang],
      score: normalized,
      color: getColor(normalized),
    };
  });

  const overallScore = Math.min(100, Math.max(0, Math.round(sectionScores.reduce((s, sec) => s + sec.score, 0) / sectionScores.length)));
  const overallColor = getColor(overallScore);

  // Primary bottleneck = highest scoring section
  const primarySection = [...sectionScores].sort((a, b) => b.score - a.score)[0];
  const primaryKey = primarySection.key;
  const primaryBottleneck = sectionLabels[primaryKey] || { en: primarySection.label, nl: primarySection.label };

  const phase = growthPhases[revenue] || growthPhases["5m_15m"];
  const leakage = getLeakagePercentage(overallScore);

  return {
    overallScore,
    overallColor,
    growthPhase: { en: phase.en, nl: phase.nl },
    growthPhaseDescription: { en: phase.descEn, nl: phase.descNl },
    primaryBottleneck,
    leakageEstimate: leakage,
    sectionScores,
    revenue,
  };
}
