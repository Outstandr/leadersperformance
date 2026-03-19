import {
  DimensionScore,
  DiagnosticOutput,
  BottleneckInfo,
  ColorTier,
  getColorTier,
  normalizeScore,
  buildDiagnosticOutput,
} from "./unifiedScoring";

export interface AuditScores extends DiagnosticOutput {
  // Legacy compat
  rawScore: number;
  disciplineScore: number;
  tier: string;
  tierDescription: string;
}

const DIMENSION_WEIGHTS: Record<string, number> = {
  morning_standard: 0.10,
  silence_test: 0.25,
  deadline_protocol: 0.15,
  confrontation: 0.15,
  meeting_tax: 0.10,
  problem_solver: 0.15,
  mirror: 0.10,
};

const DIMENSION_LABELS: Record<string, { en: string; nl: string }> = {
  morning_standard: { en: "Morning Standard", nl: "Ochtendstandaard" },
  silence_test: { en: "Operational Independence", nl: "Operationele Onafhankelijkheid" },
  deadline_protocol: { en: "Deadline Protocol", nl: "Deadlineprotocol" },
  confrontation: { en: "Team Self-Regulation", nl: "Teamzelfregulering" },
  meeting_tax: { en: "Meeting Discipline", nl: "Vergaderdiscipline" },
  problem_solver: { en: "Problem Ownership", nl: "Probleemeigenaarschap" },
  mirror: { en: "Team Quality", nl: "Teamkwaliteit" },
};

const IMPACT_DESCRIPTIONS: Record<string, { en: string; nl: string }> = {
  morning_standard: {
    en: "Lack of punctuality standards signals weak operational discipline across the organization.",
    nl: "Gebrek aan punctualiteitsstandaarden signaleert zwakke operationele discipline in de organisatie.",
  },
  silence_test: {
    en: "The organization cannot function without the CEO present, creating extreme founder dependency.",
    nl: "De organisatie kan niet functioneren zonder de aanwezigheid van de CEO, wat extreme founderafhankelijkheid creëert.",
  },
  deadline_protocol: {
    en: "Tolerance for missed deadlines erodes execution standards and accountability.",
    nl: "Tolerantie voor gemiste deadlines ondermijnt uitvoeringsstandaarden en verantwoordelijkheid.",
  },
  confrontation: {
    en: "The team avoids self-regulation, leaving all performance management to leadership.",
    nl: "Het team vermijdt zelfregulering en laat al het prestatiemanagement over aan het leiderschap.",
  },
  meeting_tax: {
    en: "Unstructured meetings waste organizational time and indicate lack of operational rigor.",
    nl: "Ongestructureerde vergaderingen verspillen organisatorische tijd en duiden op gebrek aan operationele discipline.",
  },
  problem_solver: {
    en: "Problems escalate to leadership without proposed solutions, creating decision bottlenecks.",
    nl: "Problemen escaleren naar het leiderschap zonder voorgestelde oplossingen, wat besluitvormingsknelpunten creëert.",
  },
  mirror: {
    en: "Leadership lacks confidence in the current team's capabilities to drive results.",
    nl: "Leiderschap mist vertrouwen in de capaciteiten van het huidige team om resultaten te behalen.",
  },
};

const QUESTION_DIMENSION_MAP: Record<string, string> = {
  q1: "morning_standard",
  q2: "silence_test",
  q3: "deadline_protocol",
  q4: "confrontation",
  q5: "meeting_tax",
  q6: "problem_solver",
  q7: "mirror",
};

export function calculateAuditScore(responses: Record<string, number>): AuditScores {
  const rawScore = Object.values(responses).reduce((sum, val) => sum + val, 0);

  // Build dimensions from individual questions (each question is its own dimension)
  // Responses are now on a 1-4 scale, normalized to 0-100
  const dimensions: DimensionScore[] = Object.entries(QUESTION_DIMENSION_MAP).map(([qId, dimKey]) => {
    const rawVal = responses[qId] ?? 1;
    // Invert: 4 (high discipline) = low pressure = 0, 1 (weak) = high pressure = 100
    const score = normalizeScore(5 - rawVal, 1, 4);
    return {
      key: dimKey,
      label: DIMENSION_LABELS[dimKey],
      score,
      weight: DIMENSION_WEIGHTS[dimKey],
      color: getColorTier(score),
    };
  });

  const diagnostic = buildDiagnosticOutput(
    dimensions,
    IMPACT_DESCRIPTIONS,
    (overall, color, bottleneck) => ({
      en: generateNarrativeEN(overall, color, bottleneck),
      nl: generateNarrativeNL(overall, color, bottleneck),
    }),
    (overall, color) => ({
      en: generateNextStepEN(color),
      nl: generateNextStepNL(color),
    })
  );

  // Map to legacy tier names
  let tier: string;
  let tierDescription: string;
  if (diagnostic.overallScore <= 30) {
    tier = "THE VANGUARD";
    tierDescription = "Elite. Just needs optimization.";
  } else if (diagnostic.overallScore <= 55) {
    tier = "THE DRIFT";
    tierDescription = "Revenue is accidental. One crisis away from collapse.";
  } else {
    tier = "THE NURSERY";
    tierDescription = "The CEO is a babysitter. Danger zone.";
  }

  return {
    ...diagnostic,
    rawScore,
    disciplineScore: 100 - diagnostic.overallScore, // Invert: high discipline = low pressure
    tier,
    tierDescription,
  };
}

function generateNarrativeEN(overall: number, color: ColorTier, bottleneck: BottleneckInfo): string {
  const area = bottleneck.dimensionLabel.en;
  if (color === "green") return `Your team operates at a high standard of discipline. Primary area to refine: ${area}.`;
  if (color === "yellow") return `Your team shows early signs of discipline gaps, particularly in ${area}. ${bottleneck.impact.en}`;
  if (color === "orange") return `Your organization shows structural discipline challenges. ${bottleneck.impact.en} Immediate focus on ${area} is recommended.`;
  if (color === "red") return `Significant discipline breakdown detected. ${bottleneck.impact.en} The organization requires intervention.`;
  return `Critical discipline failure across the organization. ${bottleneck.impact.en} Without immediate structural change, performance will continue to deteriorate.`;
}

function generateNarrativeNL(overall: number, color: ColorTier, bottleneck: BottleneckInfo): string {
  const area = bottleneck.dimensionLabel.nl;
  if (color === "green") return `Uw team opereert op een hoge disciplinestandaard. Aandachtsgebied: ${area}.`;
  if (color === "yellow") return `Uw team toont vroege signalen van disciplinetekorten, met name in ${area}. ${bottleneck.impact.nl}`;
  if (color === "orange") return `Uw organisatie toont structurele disciplineuitdagingen. ${bottleneck.impact.nl} Directe focus op ${area} wordt aanbevolen.`;
  if (color === "red") return `Significante discipline-inbreuk gedetecteerd. ${bottleneck.impact.nl} De organisatie vereist interventie.`;
  return `Kritiek disciplinefalen in de hele organisatie. ${bottleneck.impact.nl} Zonder onmiddellijke structurele verandering zal de prestatie blijven verslechteren.`;
}

function generateNextStepEN(color: ColorTier): string {
  if (color === "green") return "Focus on optimization and fine-tuning existing systems.";
  if (color === "yellow") return "Schedule a team discipline review to address emerging gaps.";
  if (color === "orange") return "Book a Team Performance Audit session to restructure accountability systems.";
  return "Immediate intervention required. Book a Strategic Team Reset session with Lionel.";
}

function generateNextStepNL(color: ColorTier): string {
  if (color === "green") return "Focus op optimalisatie en fijnafstelling van bestaande systemen.";
  if (color === "yellow") return "Plan een teamdiscipline-review om opkomende tekorten aan te pakken.";
  if (color === "orange") return "Boek een Team Performance Audit sessie om verantwoordelijkheidssystemen te herstructureren.";
  return "Onmiddellijke interventie vereist. Boek een Strategische Team Reset sessie met Lionel.";
}
