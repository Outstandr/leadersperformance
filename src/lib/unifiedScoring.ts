/**
 * Unified Scoring Architecture
 * All assessments produce identical output structures through this module.
 */

export type ColorTier = "green" | "yellow" | "orange" | "red" | "darkred";

export interface DimensionScore {
  key: string;
  label: { en: string; nl: string };
  score: number; // 0-100
  weight: number; // 0-1
  color: ColorTier;
}

export interface BottleneckInfo {
  dimensionKey: string;
  dimensionLabel: { en: string; nl: string };
  impact: { en: string; nl: string };
}

export interface DiagnosticOutput {
  overallScore: number; // 0-100, weighted
  overallColor: ColorTier;
  dimensions: DimensionScore[];
  primaryBottleneck: BottleneckInfo;
  diagnosticNarrative: { en: string; nl: string };
  recommendedNextStep: { en: string; nl: string };
}

/** 5-tier color classification */
export function getColorTier(score: number): ColorTier {
  if (score <= 30) return "green";
  if (score <= 55) return "yellow";
  if (score <= 75) return "orange";
  if (score <= 90) return "red";
  return "darkred";
}

/** Color display config for UI rendering */
export const colorConfig: Record<ColorTier, {
  stroke: string;
  text: string;
  bg: string;
  border: string;
  label: { en: string; nl: string };
}> = {
  green: {
    stroke: "#22c55e",
    text: "text-green-500",
    bg: "bg-green-500/15",
    border: "border-green-500",
    label: { en: "Healthy System", nl: "Gezond Systeem" },
  },
  yellow: {
    stroke: "#eab308",
    text: "text-yellow-500",
    bg: "bg-yellow-500/15",
    border: "border-yellow-500",
    label: { en: "Early Pressure", nl: "Vroege Druk" },
  },
  orange: {
    stroke: "#f59e0b",
    text: "text-amber-500",
    bg: "bg-amber-500/15",
    border: "border-amber-500",
    label: { en: "Structural Pressure", nl: "Structurele Druk" },
  },
  red: {
    stroke: "#ef4444",
    text: "text-red-500",
    bg: "bg-red-500/15",
    border: "border-red-500",
    label: { en: "Bottleneck Risk", nl: "Bottleneck Risico" },
  },
  darkred: {
    stroke: "#991b1b",
    text: "text-red-800",
    bg: "bg-red-800/15",
    border: "border-red-800",
    label: { en: "Critical Situation", nl: "Kritieke Situatie" },
  },
};

/** Calculate weighted overall score from dimensions */
export function calculateWeightedScore(dimensions: DimensionScore[]): number {
  const totalWeight = dimensions.reduce((sum, d) => sum + d.weight, 0);
  if (totalWeight === 0) return 0;
  const weighted = dimensions.reduce((sum, d) => sum + d.score * d.weight, 0);
  return Math.round(weighted / totalWeight);
}

/** Detect primary bottleneck (highest-scoring dimension = highest risk) */
export function detectBottleneck(
  dimensions: DimensionScore[],
  impactDescriptions: Record<string, { en: string; nl: string }>
): BottleneckInfo {
  const sorted = [...dimensions].sort((a, b) => b.score - a.score);
  const worst = sorted[0];
  return {
    dimensionKey: worst.key,
    dimensionLabel: worst.label,
    impact: impactDescriptions[worst.key] || {
      en: "This area shows the highest pressure and requires immediate attention.",
      nl: "Dit gebied toont de hoogste druk en vereist onmiddellijke aandacht.",
    },
  };
}

/** Normalize a raw sum to 0-100 based on min/max possible */
export function normalizeScore(rawSum: number, minPossible: number, maxPossible: number): number {
  if (maxPossible === minPossible) return 0;
  return Math.round(((rawSum - minPossible) / (maxPossible - minPossible)) * 100);
}

/** Build a complete DiagnosticOutput */
export function buildDiagnosticOutput(
  dimensions: DimensionScore[],
  impactDescriptions: Record<string, { en: string; nl: string }>,
  narrativeGenerator: (overall: number, color: ColorTier, bottleneck: BottleneckInfo) => { en: string; nl: string },
  nextStepGenerator: (overall: number, color: ColorTier) => { en: string; nl: string }
): DiagnosticOutput {
  const overallScore = calculateWeightedScore(dimensions);
  const overallColor = getColorTier(overallScore);
  const primaryBottleneck = detectBottleneck(dimensions, impactDescriptions);

  return {
    overallScore,
    overallColor,
    dimensions,
    primaryBottleneck,
    diagnosticNarrative: narrativeGenerator(overallScore, overallColor, primaryBottleneck),
    recommendedNextStep: nextStepGenerator(overallScore, overallColor),
  };
}
