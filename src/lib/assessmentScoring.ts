import { questions } from './assessmentQuestions';
import {
  DimensionScore,
  DiagnosticOutput,
  BottleneckInfo,
  ColorTier,
  getColorTier,
  buildDiagnosticOutput,
} from './unifiedScoring';

export interface Scores {
  selfDiscipline: number;
  impulseControl: number;
  consistency: number;
  overall: number;
}

export interface DisciplineResult extends DiagnosticOutput {
  scores: Scores;
  disciplineType: string;
  disciplineTypeDescription: string;
}

const DIMENSION_WEIGHTS: Record<string, number> = {
  selfDiscipline: 0.40,
  impulseControl: 0.30,
  consistency: 0.30,
};

const DIMENSION_LABELS: Record<string, { en: string; nl: string }> = {
  selfDiscipline: { en: "Self-Discipline", nl: "Zelfdiscipline" },
  impulseControl: { en: "Impulse Control", nl: "Impulsbeheersing" },
  consistency: { en: "Consistency", nl: "Consistentie" },
};

const IMPACT_DESCRIPTIONS: Record<string, { en: string; nl: string }> = {
  selfDiscipline: {
    en: "Weak self-discipline undermines your ability to follow through on commitments and maintain focus on long-term goals.",
    nl: "Zwakke zelfdiscipline ondermijnt uw vermogen om afspraken na te komen en focus te houden op langetermijndoelen.",
  },
  impulseControl: {
    en: "Poor impulse control leads to reactive decision-making and undermines strategic planning.",
    nl: "Slechte impulsbeheersing leidt tot reactieve besluitvorming en ondermijnt strategische planning.",
  },
  consistency: {
    en: "Inconsistent routines and variable productivity prevent sustainable high performance.",
    nl: "Inconsistente routines en wisselende productiviteit voorkomen duurzame hoge prestaties.",
  },
};

export function calculateScores(responses: Record<string, number>): Scores {
  const adjustedResponses: Record<string, number> = {};
  
  questions.forEach(q => {
    const rawScore = responses[q.id] || 3;
    adjustedResponses[q.id] = q.reverseScored ? (6 - rawScore) : rawScore;
  });

  const selfDisciplineQuestions = questions.filter(q => q.domain === 'selfDiscipline');
  const impulseControlQuestions = questions.filter(q => q.domain === 'impulseControl');
  const consistencyQuestions = questions.filter(q => q.domain === 'consistency');

  const selfDisciplineAvg = selfDisciplineQuestions.reduce((sum, q) => sum + adjustedResponses[q.id], 0) / selfDisciplineQuestions.length;
  const impulseControlAvg = impulseControlQuestions.reduce((sum, q) => sum + adjustedResponses[q.id], 0) / impulseControlQuestions.length;
  const consistencyAvg = consistencyQuestions.reduce((sum, q) => sum + adjustedResponses[q.id], 0) / consistencyQuestions.length;

  const selfDiscipline = Math.round(selfDisciplineAvg * 20);
  const impulseControl = Math.round(impulseControlAvg * 20);
  const consistency = Math.round(consistencyAvg * 20);
  
  // Weighted overall
  const overall = Math.round(
    selfDiscipline * DIMENSION_WEIGHTS.selfDiscipline +
    impulseControl * DIMENSION_WEIGHTS.impulseControl +
    consistency * DIMENSION_WEIGHTS.consistency
  );

  return { selfDiscipline, impulseControl, consistency, overall };
}

export function determineDisciplineType(scores: Scores): { type: string; description: string } {
  const { selfDiscipline, impulseControl, consistency, overall } = scores;
  
  const avg = overall;
  const variance = (
    Math.pow(selfDiscipline - avg, 2) + 
    Math.pow(impulseControl - avg, 2) + 
    Math.pow(consistency - avg, 2)
  ) / 3;

  if (overall >= 80 && selfDiscipline >= 70 && impulseControl >= 70 && consistency >= 70) {
    return { type: "The Natural", description: "Strong discipline across all areas. You have developed excellent habits and self-control." };
  }
  if (overall >= 75 && variance < 20) {
    return { type: "The Perfectionist", description: "Extremely disciplined but sometimes too rigid. Consider allowing more flexibility." };
  }
  if (selfDiscipline < 60 && impulseControl >= 50) {
    return { type: "The Starter", description: "Great at beginning projects but struggles with long-term consistency. Focus on building sustainable habits." };
  }
  if (selfDiscipline >= 70 && impulseControl < 60) {
    return { type: "The Sprinter", description: "Capable of intense bursts of effort but prone to burnout. Work on pacing yourself." };
  }
  return { type: "The Steady Climber", description: "Consistent across areas but could optimize efficiency. You have a solid foundation to build upon." };
}

export function getFullResults(responses: Record<string, number>): DisciplineResult {
  const scores = calculateScores(responses);
  const { type, description } = determineDisciplineType(scores);

  // Invert scores for "pressure" perspective (high score = high discipline = low pressure)
  // For discipline assessment, we show scores as-is (higher = better)
  // But for unified color coding: invert so color represents risk level
  const invertedSelfDiscipline = 100 - scores.selfDiscipline;
  const invertedImpulseControl = 100 - scores.impulseControl;
  const invertedConsistency = 100 - scores.consistency;

  const dimensions: DimensionScore[] = [
    {
      key: "selfDiscipline",
      label: DIMENSION_LABELS.selfDiscipline,
      score: invertedSelfDiscipline,
      weight: DIMENSION_WEIGHTS.selfDiscipline,
      color: getColorTier(invertedSelfDiscipline),
    },
    {
      key: "impulseControl",
      label: DIMENSION_LABELS.impulseControl,
      score: invertedImpulseControl,
      weight: DIMENSION_WEIGHTS.impulseControl,
      color: getColorTier(invertedImpulseControl),
    },
    {
      key: "consistency",
      label: DIMENSION_LABELS.consistency,
      score: invertedConsistency,
      weight: DIMENSION_WEIGHTS.consistency,
      color: getColorTier(invertedConsistency),
    },
  ];

  const diagnostic = buildDiagnosticOutput(
    dimensions,
    IMPACT_DESCRIPTIONS,
    (overall, color, bottleneck) => ({
      en: generateNarrativeEN(scores.overall, color, bottleneck),
      nl: generateNarrativeNL(scores.overall, color, bottleneck),
    }),
    (overall, color) => ({
      en: generateNextStepEN(color),
      nl: generateNextStepNL(color),
    })
  );

  return {
    ...diagnostic,
    scores,
    disciplineType: type,
    disciplineTypeDescription: description,
  };
}

function generateNarrativeEN(overallDiscipline: number, color: ColorTier, bottleneck: BottleneckInfo): string {
  const area = bottleneck.dimensionLabel.en;
  if (color === "green") return `Strong discipline profile. Your primary strength area is well-developed. Minor refinement opportunity in ${area}.`;
  if (color === "yellow") return `Your discipline shows early gaps, particularly in ${area}. ${bottleneck.impact.en}`;
  if (color === "orange") return `Moderate discipline challenges detected. ${bottleneck.impact.en} Focused development in ${area} will yield the highest returns.`;
  if (color === "red") return `Significant discipline gaps identified. ${bottleneck.impact.en} Structured intervention is recommended.`;
  return `Critical discipline deficiency. ${bottleneck.impact.en} Immediate, structured support is essential.`;
}

function generateNarrativeNL(overallDiscipline: number, color: ColorTier, bottleneck: BottleneckInfo): string {
  const area = bottleneck.dimensionLabel.nl;
  if (color === "green") return `Sterk disciplineprofiel. Uw primaire sterktegebied is goed ontwikkeld. Kleine verfijningsmogelijkheid in ${area}.`;
  if (color === "yellow") return `Uw discipline toont vroege tekorten, met name in ${area}. ${bottleneck.impact.nl}`;
  if (color === "orange") return `Matige disciplineuitdagingen gedetecteerd. ${bottleneck.impact.nl} Gerichte ontwikkeling in ${area} levert het hoogste rendement.`;
  if (color === "red") return `Significante disciplinetekorten geïdentificeerd. ${bottleneck.impact.nl} Gestructureerde interventie wordt aanbevolen.`;
  return `Kritieke disciplinedeficiëntie. ${bottleneck.impact.nl} Onmiddellijke, gestructureerde ondersteuning is essentieel.`;
}

function generateNextStepEN(color: ColorTier): string {
  if (color === "green") return "Continue refining your existing systems. Consider a coaching session for optimization.";
  if (color === "yellow") return "Schedule a Discipline Blueprint session to address emerging patterns.";
  if (color === "orange") return "Book a Personal Performance Reset to restructure your discipline framework.";
  return "Immediate support recommended. Book a Strategy Call to build your discipline foundation.";
}

function generateNextStepNL(color: ColorTier): string {
  if (color === "green") return "Blijf uw bestaande systemen verfijnen. Overweeg een coachingsessie voor optimalisatie.";
  if (color === "yellow") return "Plan een Discipline Blueprint sessie om opkomende patronen aan te pakken.";
  if (color === "orange") return "Boek een Persoonlijke Performance Reset om uw disciplinekader te herstructureren.";
  return "Onmiddellijke ondersteuning aanbevolen. Boek een Strategiegesprek om uw disciplinefundament op te bouwen.";
}
