import {
  DimensionScore,
  DiagnosticOutput,
  BottleneckInfo,
  ColorTier,
  getColorTier,
  buildDiagnosticOutput,
} from "./unifiedScoring";

export interface CPSectionScore {
  label: { en: string; nl: string };
  score: number;
  color: ColorTier;
}

export interface CPResult extends DiagnosticOutput {
  recoveryPotential: "high" | "moderate" | "limited";
  overallScore: number;
  overallColor: ColorTier;
  sections: CPSectionScore[];
  headline: { en: string; nl: string };
  body: { en: string; nl: string };
  nextStep: { en: string; nl: string };
}

export interface CPAssessmentData {
  situation_types: string[];
  capital_exposure: string;
  timeline: string;
  evidence_types: string[];
  jurisdictions: string[];
  legal_status: string;
  objective: string;
  situation_summary: string;
  consent_review: boolean;
}

// Evidence weights by legal strength
const EVIDENCE_WEIGHTS: Record<string, number> = {
  "Contracts": 10, "Contracten": 10,
  "Bank records": 9, "Bankgegevens": 9,
  "Crypto wallet addresses": 8, "Crypto wallet-adressen": 8,
  "Legal documentation": 7, "Juridische documentatie": 7,
  "Transaction records": 7, "Transactieoverzichten": 7,
  "Emails or messages": 4, "E-mails of berichten": 4,
  "No documentation yet": 0, "Nog geen documentatie": 0,
};

const DIMENSION_WEIGHTS = {
  evidence: 0.25,
  timeline: 0.20,
  jurisdiction: 0.15,
  legal: 0.20,
  exposure: 0.20,
};

const DIMENSION_LABELS: Record<string, { en: string; nl: string }> = {
  evidence: { en: "Evidence Strength", nl: "Bewijskracht" },
  timeline: { en: "Timeline Advantage", nl: "Tijdlijnvoordeel" },
  jurisdiction: { en: "Jurisdictional Simplicity", nl: "Jurisdictionele Eenvoud" },
  legal: { en: "Legal Positioning", nl: "Juridische Positionering" },
  exposure: { en: "Capital Exposure", nl: "Kapitaalblootstelling" },
};

const IMPACT_DESCRIPTIONS: Record<string, { en: string; nl: string }> = {
  evidence: {
    en: "Insufficient documentation weakens the strategic position and limits viable recovery paths.",
    nl: "Onvoldoende documentatie verzwakt de strategische positie en beperkt haalbare herstelpaden.",
  },
  timeline: {
    en: "Extended timelines reduce evidence availability and the effectiveness of legal remedies.",
    nl: "Verlengde tijdlijnen verminderen de beschikbaarheid van bewijs en de effectiviteit van juridische remedies.",
  },
  jurisdiction: {
    en: "Multi-jurisdictional complexity increases costs and extends recovery timelines significantly.",
    nl: "Multi-jurisdictionele complexiteit verhoogt kosten en verlengt hersteltijdlijnen aanzienlijk.",
  },
  legal: {
    en: "Current legal positioning impacts the available strategic recovery paths and intervention timing.",
    nl: "De huidige juridische positionering beïnvloedt de beschikbare strategische herstelpaden en timing van interventie.",
  },
  exposure: {
    en: "The level of capital exposure determines the scale of strategic resources needed for recovery.",
    nl: "Het niveau van kapitaalblootstelling bepaalt de schaal van strategische middelen die nodig zijn voor herstel.",
  },
};

export function calculateCPResult(data: CPAssessmentData): CPResult {
  // Evidence: weighted by legal strength, inverted (strong evidence = low risk)
  const validEvidence = data.evidence_types.filter(
    (e) => e !== "No documentation yet" && e !== "Nog geen documentatie"
  );
  const maxPossibleEvidence = [10, 9, 8, 7, 7, 4].reduce((s, v) => s + v, 0); // 45
  const evidenceTotal = validEvidence.reduce((sum, e) => sum + (EVIDENCE_WEIGHTS[e] || 0), 0);
  // Invert: high evidence = high recovery = low risk score
  const evidenceRisk = maxPossibleEvidence > 0
    ? Math.round(100 - (evidenceTotal / maxPossibleEvidence) * 100)
    : 80;

  // Timeline: inverted (recent = high recovery = low risk)
  let timelineRisk = 75;
  if (data.timeline.includes("3 months") || data.timeline.includes("3 maanden")) timelineRisk = 10;
  else if (data.timeline.includes("3–12") || data.timeline.includes("3–12")) timelineRisk = 35;
  else if (data.timeline.includes("1–3")) timelineRisk = 60;

  // Jurisdiction: more = higher risk
  const jurisdictionCount = data.jurisdictions.filter((j) => j.trim()).length;
  let jurisdictionRisk = 10;
  if (jurisdictionCount === 2) jurisdictionRisk = 45;
  else if (jurisdictionCount >= 3) jurisdictionRisk = 75;

  // Legal: inverted (more action = lower risk)
  let legalRisk = 80;
  if (data.legal_status.includes("filed") || data.legal_status.includes("ingediend")) legalRisk = 15;
  else if (data.legal_status.includes("consulted") || data.legal_status.includes("geraadpleegd")) legalRisk = 45;

  // Exposure: higher exposure = higher strategic value/risk
  const exposureMap: Record<string, number> = {
    "€1M – €5M": 50, "€5M – €20M": 70, "€20M – €50M": 80,
    "€50M – €100M": 90, "€100M+": 100,
  };
  const exposureRisk = exposureMap[data.capital_exposure] || 40;

  const dimensions: DimensionScore[] = [
    { key: "evidence", label: DIMENSION_LABELS.evidence, score: evidenceRisk, weight: DIMENSION_WEIGHTS.evidence, color: getColorTier(evidenceRisk) },
    { key: "timeline", label: DIMENSION_LABELS.timeline, score: timelineRisk, weight: DIMENSION_WEIGHTS.timeline, color: getColorTier(timelineRisk) },
    { key: "jurisdiction", label: DIMENSION_LABELS.jurisdiction, score: jurisdictionRisk, weight: DIMENSION_WEIGHTS.jurisdiction, color: getColorTier(jurisdictionRisk) },
    { key: "legal", label: DIMENSION_LABELS.legal, score: legalRisk, weight: DIMENSION_WEIGHTS.legal, color: getColorTier(legalRisk) },
    { key: "exposure", label: DIMENSION_LABELS.exposure, score: exposureRisk, weight: DIMENSION_WEIGHTS.exposure, color: getColorTier(exposureRisk) },
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

  // Consent bonus
  const adjustedOverall = data.consent_review ? Math.max(0, diagnostic.overallScore - 5) : diagnostic.overallScore;
  const overallColor = getColorTier(adjustedOverall);

  // Tier (lower risk = higher recovery)
  let tier: "high" | "moderate" | "limited";
  if (adjustedOverall <= 40) tier = "high";
  else if (adjustedOverall <= 65) tier = "moderate";
  else tier = "limited";

  const sections: CPSectionScore[] = dimensions.map(d => ({
    label: d.label,
    // For display, show recovery potential (inverted risk)
    score: 100 - d.score,
    color: getColorTier(d.score),
  }));

  const results: Record<"high" | "moderate" | "limited", Pick<CPResult, "headline" | "body" | "nextStep">> = {
    high: {
      headline: { en: "Strategic Recovery Opportunity Identified", nl: "Strategische Herstelmogelijkheid Geïdentificeerd" },
      body: {
        en: diagnostic.diagnosticNarrative.en,
        nl: diagnostic.diagnosticNarrative.nl,
      },
      nextStep: diagnostic.recommendedNextStep,
    },
    moderate: {
      headline: { en: "Situation Requires Strategic Evaluation", nl: "Situatie Vereist Strategische Evaluatie" },
      body: {
        en: diagnostic.diagnosticNarrative.en,
        nl: diagnostic.diagnosticNarrative.nl,
      },
      nextStep: diagnostic.recommendedNextStep,
    },
    limited: {
      headline: { en: "Limited Recovery Indicators", nl: "Beperkte Herstelindicatoren" },
      body: {
        en: diagnostic.diagnosticNarrative.en,
        nl: diagnostic.diagnosticNarrative.nl,
      },
      nextStep: diagnostic.recommendedNextStep,
    },
  };

  return {
    ...diagnostic,
    overallScore: adjustedOverall,
    overallColor,
    recoveryPotential: tier,
    sections,
    ...results[tier],
  };
}

function generateNarrativeEN(overall: number, color: ColorTier, bottleneck: BottleneckInfo): string {
  if (color === "green") return `Strong recovery indicators identified. Your case shows favorable conditions across key dimensions. ${bottleneck.impact.en} Your situation may qualify for a confidential strategic review.`;
  if (color === "yellow") return `Moderate recovery complexity detected. ${bottleneck.impact.en} A strategic evaluation is recommended to map available recovery paths.`;
  if (color === "orange") return `Your situation involves significant strategic complexity. ${bottleneck.impact.en} Careful review of documentation, jurisdiction, and recovery feasibility is needed.`;
  if (color === "red") return `High complexity case identified. ${bottleneck.impact.en} Recovery paths may require significant coordination and resources.`;
  return `Based on current information, recovery options face substantial challenges. ${bottleneck.impact.en} Additional evidence or positioning changes may alter this assessment.`;
}

function generateNarrativeNL(overall: number, color: ColorTier, bottleneck: BottleneckInfo): string {
  if (color === "green") return `Sterke herstelindicatoren geïdentificeerd. Uw zaak toont gunstige omstandigheden over belangrijke dimensies. ${bottleneck.impact.nl} Uw situatie komt mogelijk in aanmerking voor een vertrouwelijke strategische beoordeling.`;
  if (color === "yellow") return `Matige herstelcomplexiteit gedetecteerd. ${bottleneck.impact.nl} Een strategische evaluatie wordt aanbevolen om beschikbare herstelpaden in kaart te brengen.`;
  if (color === "orange") return `Uw situatie omvat aanzienlijke strategische complexiteit. ${bottleneck.impact.nl} Zorgvuldige beoordeling van documentatie, jurisdictie en haalbaarheid van herstel is nodig.`;
  if (color === "red") return `Hoge complexiteit zaak geïdentificeerd. ${bottleneck.impact.nl} Herstelpaden kunnen aanzienlijke coördinatie en middelen vereisen.`;
  return `Op basis van de huidige informatie staan herstelopties voor aanzienlijke uitdagingen. ${bottleneck.impact.nl} Aanvullend bewijs of positiewijzigingen kunnen deze beoordeling veranderen.`;
}

function generateNextStepEN(color: ColorTier): string {
  if (color === "green") return "Schedule a 30-minute case review with Lionel Eersteling.";
  if (color === "yellow") return "Request a confidential strategic evaluation to explore your options.";
  if (color === "orange") return "Submit documentation for further review or schedule an orientation call.";
  return "Gather additional documentation before pursuing strategic action. Schedule a brief consultation to confirm viability.";
}

function generateNextStepNL(color: ColorTier): string {
  if (color === "green") return "Plan een 30-minuten casebeoordeling met Lionel Eersteling.";
  if (color === "yellow") return "Vraag een vertrouwelijke strategische evaluatie aan om uw opties te verkennen.";
  if (color === "orange") return "Dien documentatie in voor verdere beoordeling of plan een oriëntatiegesprek.";
  return "Verzamel aanvullende documentatie voordat u strategische actie onderneemt. Plan een kort consult om haalbaarheid te bevestigen.";
}
