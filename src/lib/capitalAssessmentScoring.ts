import { capitalAssessmentQuestions } from "./capitalAssessmentQuestions";

export interface AssessmentResult {
  score: number; // 0-100
  tier: "high_recovery" | "moderate" | "limited";
  tierLabel: string;
  headline: string;
  description: string;
  nextStep: string;
}

export function calculateAssessmentResult(
  responses: Record<string, string | string[]>,
  language: "en" | "nl"
): AssessmentResult {
  let totalWeight = 0;
  let maxWeight = 0;

  capitalAssessmentQuestions.forEach((q) => {
    if (q.type === "text" || !q.options) return;

    const answer = responses[q.id];
    if (!answer) return;

    if (q.type === "multi") {
      // For multi-select, sum up weights of selected options
      const selected = Array.isArray(answer) ? answer : [answer];
      const qMaxWeight = q.options.reduce((max, opt) => opt.weight > 0 ? max + opt.weight : max, 0);
      maxWeight += qMaxWeight || 10;
      selected.forEach((val) => {
        const opt = q.options!.find((o) => o.value === val);
        if (opt) totalWeight += opt.weight;
      });
    } else {
      // Single select
      const maxOpt = Math.max(...q.options.map((o) => o.weight));
      maxWeight += maxOpt || 10;
      const opt = q.options.find((o) => o.value === answer);
      if (opt) totalWeight += opt.weight;
    }
  });

  const score = maxWeight > 0 ? Math.round((totalWeight / maxWeight) * 100) : 50;

  let tier: "high_recovery" | "moderate" | "limited";
  let tierLabel: string;
  let headline: string;
  let description: string;
  let nextStep: string;

  if (language === "nl") {
    if (score >= 65) {
      tier = "high_recovery";
      tierLabel = "Hoge Herstelpotentie";
      headline = "Strategische Herstelmogelijkheid Geïdentificeerd";
      description = "Op basis van de verstrekte informatie lijkt uw zaak een aanzienlijke kapitaalblootstelling te omvatten met mogelijke strategische herstelpaden. Situaties als deze vereisen vaak gecoördineerde juridische, onderzoeks- en strategische actie over jurisdicties heen.";
      nextStep = "Plan een 30-minuten case review met Lionel Eersteling.";
    } else if (score >= 35) {
      tier = "moderate";
      tierLabel = "Matige Strategische Complexiteit";
      headline = "Situatie Vereist Strategische Evaluatie";
      description = "Uw situatie omvat financiële blootstelling en meerdere strategische variabelen. Zaken als deze vereisen zorgvuldige beoordeling van documentatie, jurisdictie en herstelmogelijkheden voordat de juiste koers wordt bepaald.";
      nextStep = "Dien documentatie in voor verdere beoordeling of plan een oriëntatiegesprek.";
    } else {
      tier = "limited";
      tierLabel = "Beperkte Herstelpotentie";
      headline = "Zaak Vereist Verdere Documentatie";
      description = "Op basis van de momenteel verstrekte informatie is het moeilijk te bepalen of herstelopties haalbaar zijn. Situaties met fraude of financiële geschillen zijn vaak sterk afhankelijk van beschikbare documentatie en juridische jurisdictie.";
      nextStep = "Verzamel aanvullende documentatie voordat u strategische actie onderneemt.";
    }
  } else {
    if (score >= 65) {
      tier = "high_recovery";
      tierLabel = "High Recovery Potential";
      headline = "Strategic Recovery Opportunity Identified";
      description = "Based on the information provided, your case appears to involve a significant capital exposure with potential strategic recovery paths. Situations like this often require coordinated legal, investigative, and strategic action across jurisdictions.";
      nextStep = "Schedule a 30-minute case review with Lionel Eersteling.";
    } else if (score >= 35) {
      tier = "moderate";
      tierLabel = "Moderate Strategic Complexity";
      headline = "Situation Requires Strategic Evaluation";
      description = "Your situation involves financial exposure and multiple strategic variables. Cases like this require careful review of documentation, jurisdiction, and recovery feasibility before determining the appropriate course of action.";
      nextStep = "Submit documentation for further review or schedule an orientation call.";
    } else {
      tier = "limited";
      tierLabel = "Limited Recovery Potential";
      headline = "Case Requires Further Documentation";
      description = "Based on the information currently provided, it is difficult to determine whether recovery options are viable. Situations involving fraud or financial disputes often depend heavily on available documentation and legal jurisdiction.";
      nextStep = "Gather additional documentation before pursuing strategic action.";
    }
  }

  return { score, tier, tierLabel, headline, description, nextStep };
}
