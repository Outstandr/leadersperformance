export interface CPSectionScore {
  label: { en: string; nl: string };
  score: number; // 0-100
  color: "green" | "orange" | "red";
}

export interface CPResult {
  recoveryPotential: "high" | "moderate" | "limited";
  overallScore: number; // 0-100
  overallColor: "green" | "orange" | "red";
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

function scoreColor(score: number): "green" | "orange" | "red" {
  if (score >= 70) return "green";
  if (score >= 40) return "orange";
  return "red";
}

export function calculateCPResult(data: CPAssessmentData): CPResult {
  // 1. Evidence Strength (0-100)
  const totalEvidenceTypes = 6; // excluding "No documentation yet"
  const validEvidence = data.evidence_types.filter(
    (e) => e !== "No documentation yet" && e !== "Nog geen documentatie"
  ).length;
  const evidenceScore = Math.round((validEvidence / totalEvidenceTypes) * 100);

  // 2. Timeline Advantage (0-100) — more recent = higher score
  let timelineScore = 25;
  if (data.timeline.includes("3 months") || data.timeline.includes("3 maanden")) timelineScore = 100;
  else if (data.timeline.includes("3–12") || data.timeline.includes("3–12")) timelineScore = 70;
  else if (data.timeline.includes("1–3")) timelineScore = 40;

  // 3. Jurisdictional Complexity (0-100) — fewer jurisdictions = higher score (simpler)
  const jurisdictionCount = data.jurisdictions.filter((j) => j.trim()).length;
  let jurisdictionScore = 100;
  if (jurisdictionCount === 2) jurisdictionScore = 65;
  else if (jurisdictionCount >= 3) jurisdictionScore = 30;

  // 4. Legal Positioning (0-100)
  let legalScore = 20;
  if (data.legal_status.includes("filed") || data.legal_status.includes("ingediend")) legalScore = 100;
  else if (data.legal_status.includes("consulted") || data.legal_status.includes("geraadpleegd")) legalScore = 60;

  // 5. Capital Exposure (0-100) — higher exposure = higher strategic value
  const exposureMap: Record<string, number> = {
    "€100K – €500K": 20,
    "€500K – €1M": 40,
    "€1M – €5M": 60,
    "€5M – €20M": 80,
    "€20M+": 100,
  };
  const exposureScore = exposureMap[data.capital_exposure] || 20;

  const sections: CPSectionScore[] = [
    {
      label: { en: "Evidence Strength", nl: "Bewijskracht" },
      score: evidenceScore,
      color: scoreColor(evidenceScore),
    },
    {
      label: { en: "Timeline Advantage", nl: "Tijdlijnvoordeel" },
      score: timelineScore,
      color: scoreColor(timelineScore),
    },
    {
      label: { en: "Jurisdictional Simplicity", nl: "Jurisdictionele Eenvoud" },
      score: jurisdictionScore,
      color: scoreColor(jurisdictionScore),
    },
    {
      label: { en: "Legal Positioning", nl: "Juridische Positionering" },
      score: legalScore,
      color: scoreColor(legalScore),
    },
    {
      label: { en: "Capital Exposure", nl: "Kapitaalblootstelling" },
      score: exposureScore,
      color: scoreColor(exposureScore),
    },
  ];

  // Overall = weighted average
  const overall = Math.round(
    evidenceScore * 0.25 +
    timelineScore * 0.2 +
    jurisdictionScore * 0.15 +
    legalScore * 0.2 +
    exposureScore * 0.2
  );

  // Consent bonus
  const adjustedOverall = data.consent_review ? Math.min(100, overall + 5) : overall;
  const overallColor = scoreColor(adjustedOverall);

  // Tier
  let tier: "high" | "moderate" | "limited";
  if (adjustedOverall >= 65) tier = "high";
  else if (adjustedOverall >= 40) tier = "moderate";
  else tier = "limited";

  const results: Record<"high" | "moderate" | "limited", Pick<CPResult, "headline" | "body" | "nextStep">> = {
    high: {
      headline: {
        en: "Strategic Recovery Opportunity Identified",
        nl: "Strategische Herstelmogelijkheid Geïdentificeerd",
      },
      body: {
        en: "Based on the information provided, your case appears to involve a significant capital exposure with potential strategic recovery paths. Situations like this often require coordinated legal, investigative, and strategic action across jurisdictions. Your situation may qualify for a confidential strategic review.",
        nl: "Op basis van de verstrekte informatie lijkt uw zaak een aanzienlijke kapitaalblootstelling te betreffen met potentiële strategische herstelpaden. Situaties als deze vereisen vaak gecoördineerde juridische, onderzoeks- en strategische actie over jurisdicties heen. Uw situatie komt mogelijk in aanmerking voor een vertrouwelijke strategische beoordeling.",
      },
      nextStep: {
        en: "Schedule a 30-minute case review with Lionel Eersteling.",
        nl: "Plan een 30 minuten durende casebeoordeling met Lionel Eersteling.",
      },
    },
    moderate: {
      headline: {
        en: "Situation Requires Strategic Evaluation",
        nl: "Situatie Vereist Strategische Evaluatie",
      },
      body: {
        en: "Your situation involves financial exposure and multiple strategic variables. Cases like this require careful review of documentation, jurisdiction, and recovery feasibility before determining the appropriate course of action. A strategic evaluation is recommended to assess your options.",
        nl: "Uw situatie betreft financiële blootstelling en meerdere strategische variabelen. Zaken als deze vereisen zorgvuldige beoordeling van documentatie, jurisdictie en haalbaarheid van herstel voordat de juiste koers wordt bepaald. Een strategische evaluatie wordt aanbevolen om uw opties te beoordelen.",
      },
      nextStep: {
        en: "Request a confidential strategic evaluation to explore your options.",
        nl: "Vraag een vertrouwelijke strategische evaluatie aan om uw opties te verkennen.",
      },
    },
    limited: {
      headline: {
        en: "Limited Recovery Indicators",
        nl: "Beperkte Herstelindicatoren",
      },
      body: {
        en: "Based on the current information, recovery paths may be limited. However, additional documentation or strategic positioning could change the assessment. A brief consultation is recommended to confirm whether further action is viable.",
        nl: "Op basis van de huidige informatie zijn herstelpaden mogelijk beperkt. Echter, aanvullende documentatie of strategische positionering kan de beoordeling veranderen. Een kort consult wordt aanbevolen om te bevestigen of verdere actie haalbaar is.",
      },
      nextStep: {
        en: "Schedule a brief consultation to assess whether further action is viable.",
        nl: "Plan een kort consult om te beoordelen of verdere actie haalbaar is.",
      },
    },
  };

  return {
    recoveryPotential: tier,
    overallScore: adjustedOverall,
    overallColor,
    sections,
    ...results[tier],
  };
}
