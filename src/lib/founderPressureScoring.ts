import { pressureQuestions } from "./founderPressureQuestions";

export interface PressureSectionScore {
  section: string;
  sectionLabel: string;
  score: number; // 0-100
  color: "green" | "orange" | "red";
}

export interface PressureScores {
  overall: number; // 0-100
  overallColor: "green" | "orange" | "red";
  sections: PressureSectionScore[];
  title: string;
  diagnosis: string;
  recommendation: string;
}

function getColor(score: number): "green" | "orange" | "red" {
  if (score <= 40) return "green";
  if (score <= 70) return "orange";
  return "red";
}

function getSectionScore(responses: Record<string, number>, sectionIds: string[]): number {
  const sum = sectionIds.reduce((acc, id) => acc + (responses[id] || 1), 0);
  // Formula: ((sum - 3) / 9) * 100
  return Math.round(((sum - 3) / 9) * 100);
}

export function calculatePressureScores(
  responses: Record<string, number>,
  language: "en" | "nl"
): PressureScores {
  const sections: { key: string; label: { en: string; nl: string }; ids: string[] }[] = [
    { key: "decision_pressure", label: { en: "Decision Pressure", nl: "Beslissingsdruk" }, ids: ["q1", "q2", "q3"] },
    { key: "founder_dependency", label: { en: "Founder Dependency", nl: "Founderafhankelijkheid" }, ids: ["q4", "q5", "q6"] },
    { key: "leadership_alignment", label: { en: "Leadership Alignment", nl: "Leiderschapsafstemming" }, ids: ["q7", "q8", "q9"] },
    { key: "execution_momentum", label: { en: "Execution Momentum", nl: "Uitvoeringsmomentum" }, ids: ["q10", "q11", "q12"] },
  ];

  const sectionScores: PressureSectionScore[] = sections.map((s) => {
    const score = getSectionScore(responses, s.ids);
    return {
      section: s.key,
      sectionLabel: s.label[language],
      score,
      color: getColor(score),
    };
  });

  // Overall: ((sum_all - 12) / 36) * 100
  const totalSum = Object.values(responses).reduce((a, b) => a + b, 0);
  const overall = Math.round(((totalSum - 12) / 36) * 100);
  const overallColor = getColor(overall);

  const { title, diagnosis, recommendation } = getDiagnosis(overall, overallColor, language);

  return {
    overall,
    overallColor,
    sections: sectionScores,
    title,
    diagnosis,
    recommendation,
  };
}

function getDiagnosis(
  score: number,
  color: "green" | "orange" | "red",
  lang: "en" | "nl"
): { title: string; diagnosis: string; recommendation: string } {
  if (lang === "nl") {
    if (color === "green") {
      return {
        title: "Stabiele Basis",
        diagnosis: "Uw organisatie draait grotendeels onafhankelijk van u. De druk op de founder is beheersbaar en de structuur is gezond.",
        recommendation: "Focus op optimalisatie en schaalbare leiderschapssystemen om deze positie te versterken.",
      };
    }
    if (color === "orange") {
      return {
        title: "Drukzone",
        diagnosis: "Er zijn duidelijke signalen dat beslissingen, relaties of uitvoering te sterk afhankelijk zijn van u als founder. Dit creëert kwetsbaarheid.",
        recommendation: "Plan een strategische sessie om de afhankelijkheidspunten te identificeren en leiderschapsmandaten te verduidelijken.",
      };
    }
    return {
      title: "Bottleneck Risico",
      diagnosis: "Uw organisatie functioneert als een verlengstuk van u persoonlijk. Vrijwel alles loopt vast zonder uw directe interventie. Dit is niet duurzaam.",
      recommendation: "Directe interventie is nodig. Boek een strategische sessie om de founderafhankelijkheid structureel aan te pakken.",
    };
  }

  // English
  if (color === "green") {
    return {
      title: "Stable Foundation",
      diagnosis: "Your organization runs largely independent of you. Founder pressure is manageable and the structure is healthy.",
      recommendation: "Focus on optimization and scalable leadership systems to strengthen this position.",
    };
  }
  if (color === "orange") {
    return {
      title: "Pressure Zone",
      diagnosis: "There are clear signals that decisions, relationships or execution depend too heavily on you as founder. This creates vulnerability.",
      recommendation: "Schedule a strategic session to identify dependency points and clarify leadership mandates.",
    };
  }
  return {
    title: "Bottleneck Risk",
    diagnosis: "Your organization functions as an extension of you personally. Almost everything stalls without your direct intervention. This is not sustainable.",
    recommendation: "Immediate intervention needed. Book a strategic session to structurally address founder dependency.",
  };
}
