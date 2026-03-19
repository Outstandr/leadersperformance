import { capitalAssessmentQuestions } from "./capitalAssessmentQuestions";
import {
  DimensionScore,
  DiagnosticOutput,
  BottleneckInfo,
  ColorTier,
  getColorTier,
  buildDiagnosticOutput,
} from "./unifiedScoring";

export interface AssessmentResult extends DiagnosticOutput {
  score: number;
  tier: "high_recovery" | "moderate" | "limited";
  tierLabel: string;
  headline: string;
  description: string;
  nextStep: string;
}

// Evidence weights by legal strength
const EVIDENCE_WEIGHTS: Record<string, number> = {
  contracts: 10,
  bank_records: 9,
  crypto_wallets: 8,
  legal_docs: 7,
  transaction_records: 7,
  emails_messages: 4,
  none: 0,
};

const DIMENSION_WEIGHTS: Record<string, number> = {
  situation_severity: 0.15,
  capital_exposure: 0.20,
  timeline_advantage: 0.20,
  evidence_strength: 0.25,
  legal_positioning: 0.20,
};

const DIMENSION_LABELS: Record<string, { en: string; nl: string }> = {
  situation_severity: { en: "Situation Severity", nl: "Ernst van de Situatie" },
  capital_exposure: { en: "Capital Exposure", nl: "Kapitaalblootstelling" },
  timeline_advantage: { en: "Timeline Advantage", nl: "Tijdlijnvoordeel" },
  evidence_strength: { en: "Evidence Strength", nl: "Bewijskracht" },
  legal_positioning: { en: "Legal Positioning", nl: "Juridische Positionering" },
};

const IMPACT_DESCRIPTIONS: Record<string, { en: string; nl: string }> = {
  situation_severity: {
    en: "The nature and severity of the situation significantly impacts recovery complexity and strategic options.",
    nl: "De aard en ernst van de situatie beïnvloedt de complexiteit van herstel en strategische opties aanzienlijk.",
  },
  capital_exposure: {
    en: "The level of financial exposure determines the strategic resources and approach required for recovery.",
    nl: "Het niveau van financiële blootstelling bepaalt de strategische middelen en aanpak die nodig zijn voor herstel.",
  },
  timeline_advantage: {
    en: "Extended timelines reduce evidence availability and legal remedy effectiveness.",
    nl: "Verlengde tijdlijnen verminderen de beschikbaarheid van bewijs en de effectiviteit van juridische remedies.",
  },
  evidence_strength: {
    en: "Insufficient documentation weakens the strategic position and limits recovery paths.",
    nl: "Onvoldoende documentatie verzwakt de strategische positie en beperkt herstelpaden.",
  },
  legal_positioning: {
    en: "Current legal status impacts the available strategic paths and timing of intervention.",
    nl: "De huidige juridische status beïnvloedt de beschikbare strategische paden en timing van interventie.",
  },
};

export function calculateAssessmentResult(
  responses: Record<string, string | string[]>,
  language: "en" | "nl"
): AssessmentResult {
  // Situation Severity Score
  const situationMap: Record<string, number> = {
    fraud: 90, crypto_fraud: 95, misappropriation: 85,
    partner_dispute: 60, investor_dispute: 65, breach_of_contract: 50,
    ownership_conflict: 70, other: 40,
  };
  const situationScore = situationMap[responses.ca1 as string] || 50;

  // Capital Exposure Score
  const exposureMap: Record<string, number> = {
    "100k_500k": 30, "500k_1m": 50, "1m_5m": 70, "5m_20m": 85, "20m_plus": 100,
  };
  const exposureScore = exposureMap[responses.ca2 as string] || 30;

  // Timeline Advantage (inverted: recent = high recovery = low risk)
  const timelineMap: Record<string, number> = {
    less_3_months: 15, "3_12_months": 35, "1_3_years": 65, more_3_years: 90,
  };
  const timelineScore = timelineMap[responses.ca3 as string] || 50;

  // Evidence Strength (weighted by legal strength, inverted: more evidence = lower risk)
  const evidenceAnswers = Array.isArray(responses.ca4) ? responses.ca4 : [responses.ca4].filter(Boolean);
  const maxPossibleEvidence = Object.values(EVIDENCE_WEIGHTS).filter(w => w > 0).sort((a, b) => b - a).slice(0, 6).reduce((s, v) => s + v, 0);
  const evidenceTotal = evidenceAnswers.reduce((sum, val) => sum + (EVIDENCE_WEIGHTS[val as string] || 0), 0);
  const evidenceScore = maxPossibleEvidence > 0
    ? Math.round(100 - (evidenceTotal / maxPossibleEvidence) * 100)
    : 80;

  // Legal Positioning (inverted: more action = lower risk)
  const legalMap: Record<string, number> = {
    no_action: 80, lawyer_consulted: 50, case_filed: 25, investigation: 35,
  };
  const legalScore = legalMap[responses.ca6 as string] || 60;

  const dimensions: DimensionScore[] = [
    { key: "situation_severity", label: DIMENSION_LABELS.situation_severity, score: situationScore, weight: DIMENSION_WEIGHTS.situation_severity, color: getColorTier(situationScore) },
    { key: "capital_exposure", label: DIMENSION_LABELS.capital_exposure, score: exposureScore, weight: DIMENSION_WEIGHTS.capital_exposure, color: getColorTier(exposureScore) },
    { key: "timeline_advantage", label: DIMENSION_LABELS.timeline_advantage, score: timelineScore, weight: DIMENSION_WEIGHTS.timeline_advantage, color: getColorTier(timelineScore) },
    { key: "evidence_strength", label: DIMENSION_LABELS.evidence_strength, score: evidenceScore, weight: DIMENSION_WEIGHTS.evidence_strength, color: getColorTier(evidenceScore) },
    { key: "legal_positioning", label: DIMENSION_LABELS.legal_positioning, score: legalScore, weight: DIMENSION_WEIGHTS.legal_positioning, color: getColorTier(legalScore) },
  ];

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

  // Map to legacy tier
  let tier: "high_recovery" | "moderate" | "limited";
  let tierLabel: string;
  // For capital assessment, lower overall risk = higher recovery potential
  if (diagnostic.overallScore <= 40) {
    tier = "high_recovery";
    tierLabel = language === "nl" ? "Hoge Herstelpotentie" : "High Recovery Potential";
  } else if (diagnostic.overallScore <= 65) {
    tier = "moderate";
    tierLabel = language === "nl" ? "Matige Strategische Complexiteit" : "Moderate Strategic Complexity";
  } else {
    tier = "limited";
    tierLabel = language === "nl" ? "Beperkte Herstelpotentie" : "Limited Recovery Potential";
  }

  return {
    ...diagnostic,
    score: diagnostic.overallScore,
    tier,
    tierLabel,
    headline: diagnostic.diagnosticNarrative[language].split(".")[0] + ".",
    description: diagnostic.diagnosticNarrative[language],
    nextStep: diagnostic.recommendedNextStep[language],
  };
}

function generateNarrativeEN(overall: number, color: ColorTier, bottleneck: BottleneckInfo): string {
  if (color === "green") return `Strategic Recovery Opportunity Identified. Based on the information provided, your case shows strong recovery indicators. ${bottleneck.impact.en}`;
  if (color === "yellow") return `Moderate recovery complexity detected. ${bottleneck.impact.en} A strategic evaluation is recommended to map your options.`;
  if (color === "orange") return `Situation Requires Strategic Evaluation. ${bottleneck.impact.en} Careful assessment of documentation and jurisdiction is needed.`;
  if (color === "red") return `High complexity case identified. ${bottleneck.impact.en} Recovery paths may be limited without targeted intervention.`;
  return `Case Requires Further Documentation. ${bottleneck.impact.en} Additional evidence and legal positioning are needed before strategic action.`;
}

function generateNarrativeNL(overall: number, color: ColorTier, bottleneck: BottleneckInfo): string {
  if (color === "green") return `Strategische Herstelmogelijkheid Geïdentificeerd. Op basis van de verstrekte informatie toont uw zaak sterke herstelindicatoren. ${bottleneck.impact.nl}`;
  if (color === "yellow") return `Matige herstelcomplexiteit gedetecteerd. ${bottleneck.impact.nl} Een strategische evaluatie wordt aanbevolen om uw opties in kaart te brengen.`;
  if (color === "orange") return `Situatie Vereist Strategische Evaluatie. ${bottleneck.impact.nl} Zorgvuldige beoordeling van documentatie en jurisdictie is nodig.`;
  if (color === "red") return `Hoge complexiteit zaak geïdentificeerd. ${bottleneck.impact.nl} Herstelpaden kunnen beperkt zijn zonder gerichte interventie.`;
  return `Zaak Vereist Verdere Documentatie. ${bottleneck.impact.nl} Aanvullend bewijs en juridische positionering zijn nodig voordat strategische actie wordt ondernomen.`;
}

function generateNextStepEN(color: ColorTier): string {
  if (color === "green") return "Schedule a 30-minute case review with Lionel Eersteling.";
  if (color === "yellow") return "Request a confidential strategic evaluation to explore your options.";
  if (color === "orange") return "Submit documentation for further review or schedule an orientation call.";
  return "Gather additional documentation before pursuing strategic action.";
}

function generateNextStepNL(color: ColorTier): string {
  if (color === "green") return "Plan een 30-minuten casebeoordeling met Lionel Eersteling.";
  if (color === "yellow") return "Vraag een vertrouwelijke strategische evaluatie aan om uw opties te verkennen.";
  if (color === "orange") return "Dien documentatie in voor verdere beoordeling of plan een oriëntatiegesprek.";
  return "Verzamel aanvullende documentatie voordat u strategische actie onderneemt.";
}
