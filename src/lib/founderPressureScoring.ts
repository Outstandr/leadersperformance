import { pressureQuestions } from "./founderPressureQuestions";
import {
  DimensionScore,
  DiagnosticOutput,
  BottleneckInfo,
  ColorTier,
  getColorTier,
  normalizeScore,
  buildDiagnosticOutput,
} from "./unifiedScoring";

// Re-export unified types for backward compat
export type { DiagnosticOutput };

// Legacy type alias for components that reference old type
export type PressureScores = DiagnosticOutput & {
  overall: number;
  overallColor: ColorTier;
  sections: { section: string; sectionLabel: string; score: number; color: ColorTier }[];
  title: string;
  diagnosis: string;
  recommendation: string;
};

export interface PressureSectionScore {
  section: string;
  sectionLabel: string;
  score: number;
  color: ColorTier;
}

const DIMENSION_WEIGHTS: Record<string, number> = {
  decision_pressure: 0.20,
  founder_dependency: 0.35,
  leadership_alignment: 0.25,
  execution_momentum: 0.20,
};

const IMPACT_DESCRIPTIONS: Record<string, { en: string; nl: string }> = {
  decision_pressure: {
    en: "Strategic decisions bottleneck around the founder, preventing autonomous team execution and slowing organizational velocity.",
    nl: "Strategische beslissingen lopen vast bij de founder, waardoor autonoom teamwerk en organisatorische snelheid worden belemmerd.",
  },
  founder_dependency: {
    en: "The organization relies excessively on founder decision-making, slowing execution and leadership autonomy.",
    nl: "De organisatie leunt te sterk op besluitvorming van de founder, waardoor uitvoering en leiderschapsautonomie vertragen.",
  },
  leadership_alignment: {
    en: "Strategic direction is not consistently translated into operational execution, creating decision loops around the founder.",
    nl: "Strategische richting wordt niet consistent vertaald naar operationele uitvoering, waardoor beslissingslussen rond de founder ontstaan.",
  },
  execution_momentum: {
    en: "Projects stall without founder involvement, indicating a lack of self-sustaining execution systems within the team.",
    nl: "Projecten stagneren zonder betrokkenheid van de founder, wat wijst op een gebrek aan zelfstandige uitvoeringssystemen binnen het team.",
  },
};

function getSectionScore(responses: Record<string, number>, sectionIds: string[]): number {
  const sum = sectionIds.reduce((acc, id) => acc + (responses[id] || 1), 0);
  // Normalize: min = 3 (all 1s), max = 12 (all 4s) for 3 questions
  return normalizeScore(sum, sectionIds.length, sectionIds.length * 4);
}

export function calculatePressureScores(
  responses: Record<string, number>,
  language: "en" | "nl"
): PressureScores {
  const sectionConfigs = [
    { key: "decision_pressure", label: { en: "Decision Pressure", nl: "Beslissingsdruk" }, ids: ["q1", "q2", "q3"] },
    { key: "founder_dependency", label: { en: "Founder Dependency", nl: "Founderafhankelijkheid" }, ids: ["q4", "q5", "q6"] },
    { key: "leadership_alignment", label: { en: "Leadership Alignment", nl: "Leiderschapsafstemming" }, ids: ["q7", "q8", "q9"] },
    { key: "execution_momentum", label: { en: "Execution Momentum", nl: "Uitvoeringsmomentum" }, ids: ["q10", "q11", "q12"] },
  ];

  const dimensions: DimensionScore[] = sectionConfigs.map((s) => {
    const score = getSectionScore(responses, s.ids);
    return {
      key: s.key,
      label: s.label,
      score,
      weight: DIMENSION_WEIGHTS[s.key],
      color: getColorTier(score),
    };
  });

  const diagnosticOutput = buildDiagnosticOutput(
    dimensions,
    IMPACT_DESCRIPTIONS,
    (overall, color, bottleneck) => generateNarrative(overall, color, bottleneck, language),
    (overall, color) => generateNextStep(overall, color, language)
  );

  // Build backward-compatible shape
  const sections: PressureSectionScore[] = dimensions.map((d) => ({
    section: d.key,
    sectionLabel: d.label[language],
    score: d.score,
    color: d.color,
  }));

  return {
    ...diagnosticOutput,
    overall: diagnosticOutput.overallScore,
    sections,
    title: diagnosticOutput.diagnosticNarrative[language].split(".")[0],
    diagnosis: diagnosticOutput.diagnosticNarrative[language],
    recommendation: diagnosticOutput.recommendedNextStep[language],
  };
}

function generateNarrative(
  overall: number,
  color: ColorTier,
  bottleneck: BottleneckInfo,
  language: "en" | "nl"
): { en: string; nl: string } {
  const bottleneckLabel = bottleneck.dimensionLabel;
  const impact = bottleneck.impact;

  if (color === "green") {
    return {
      en: `Stable Foundation. Your organization runs largely independent of you. Founder pressure is manageable and the structure is healthy. Primary area to monitor: ${bottleneckLabel.en}.`,
      nl: `Stabiele Basis. Uw organisatie draait grotendeels onafhankelijk van u. De druk op de founder is beheersbaar en de structuur is gezond. Aandachtsgebied: ${bottleneckLabel.nl}.`,
    };
  }
  if (color === "yellow") {
    return {
      en: `Early Pressure Detected. There are emerging signals of founder dependency. ${impact.en} Focus on ${bottleneckLabel.en} to prevent escalation.`,
      nl: `Vroege Druk Gedetecteerd. Er zijn opkomende signalen van founderafhankelijkheid. ${impact.nl} Focus op ${bottleneckLabel.nl} om escalatie te voorkomen.`,
    };
  }
  if (color === "orange") {
    return {
      en: `Structural Pressure Zone. Your organization shows moderate structural pressure driven by ${bottleneckLabel.en.toLowerCase()} gaps. ${impact.en}`,
      nl: `Structurele Drukzone. Uw organisatie toont matige structurele druk gedreven door ${bottleneckLabel.nl.toLowerCase()} tekorten. ${impact.nl}`,
    };
  }
  if (color === "red") {
    return {
      en: `Bottleneck Risk. There are critical signals that decisions, relationships and execution depend too heavily on you as founder. ${impact.en}`,
      nl: `Bottleneck Risico. Er zijn kritieke signalen dat beslissingen, relaties en uitvoering te sterk afhankelijk zijn van u als founder. ${impact.nl}`,
    };
  }
  return {
    en: `Critical Situation. Your organization functions as an extension of you personally. Almost everything stalls without your direct intervention. ${impact.en} This is not sustainable.`,
    nl: `Kritieke Situatie. Uw organisatie functioneert als een verlengstuk van u persoonlijk. Vrijwel alles loopt vast zonder uw directe interventie. ${impact.nl} Dit is niet duurzaam.`,
  };
}

function generateNextStep(
  overall: number,
  color: ColorTier,
  language: "en" | "nl"
): { en: string; nl: string } {
  if (color === "green") {
    return {
      en: "Focus on optimization and scalable leadership systems to strengthen this position.",
      nl: "Focus op optimalisatie en schaalbare leiderschapssystemen om deze positie te versterken.",
    };
  }
  if (color === "yellow") {
    return {
      en: "Schedule a strategic review to identify early dependency patterns before they become structural.",
      nl: "Plan een strategische review om vroege afhankelijkheidspatronen te identificeren voordat ze structureel worden.",
    };
  }
  if (color === "orange") {
    return {
      en: "Schedule a strategic session to identify dependency points and clarify leadership mandates.",
      nl: "Plan een strategische sessie om de afhankelijkheidspunten te identificeren en leiderschapsmandaten te verduidelijken.",
    };
  }
  return {
    en: "Immediate intervention needed. Book a Founder Strategy Intervention Session to structurally address founder dependency.",
    nl: "Directe interventie is nodig. Boek een Founder Strategy Intervention Session om de founderafhankelijkheid structureel aan te pakken.",
  };
}
