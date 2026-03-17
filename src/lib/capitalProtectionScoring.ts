export interface CPResult {
  recoveryPotential: "high" | "moderate" | "limited";
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

export function calculateCPResult(data: CPAssessmentData): CPResult {
  let score = 0;

  // Capital exposure weight (higher = higher score)
  const exposureMap: Record<string, number> = {
    "€100K – €500K": 1,
    "€500K – €1M": 2,
    "€1M – €5M": 3,
    "€5M – €20M": 4,
    "€20M+": 5,
  };
  score += exposureMap[data.capital_exposure] || 1;

  // Evidence availability (more = better recovery)
  const evidenceCount = data.evidence_types.filter(e => e !== "No documentation yet" && e !== "Nog geen documentatie").length;
  if (evidenceCount >= 4) score += 3;
  else if (evidenceCount >= 2) score += 2;
  else score += 0;

  // Timeline (more recent = better)
  if (data.timeline.includes("3 months") || data.timeline.includes("3 maanden")) score += 3;
  else if (data.timeline.includes("3–12") || data.timeline.includes("3–12")) score += 2;
  else if (data.timeline.includes("1–3")) score += 1;
  else score += 0;

  // Legal status
  if (data.legal_status.includes("filed") || data.legal_status.includes("ingediend")) score += 2;
  else if (data.legal_status.includes("consulted") || data.legal_status.includes("geraadpleegd")) score += 1;

  // Jurisdiction complexity (fewer = simpler)
  const jurisdictionCount = data.jurisdictions.filter(j => j.trim()).length;
  if (jurisdictionCount <= 1) score += 2;
  else if (jurisdictionCount === 2) score += 1;

  // Consent bonus
  if (data.consent_review) score += 1;

  // Tier assignment
  if (score >= 11) return highResult;
  if (score >= 6) return moderateResult;
  return limitedResult;
}

const highResult: CPResult = {
  recoveryPotential: "high",
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
};

const moderateResult: CPResult = {
  recoveryPotential: "moderate",
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
};

const limitedResult: CPResult = {
  recoveryPotential: "limited",
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
};
