export interface AuditScores {
  rawScore: number;
  disciplineScore: number;
  tier: "THE NURSERY" | "THE DRIFT" | "THE VANGUARD";
  tierDescription: string;
}

export function calculateAuditScore(responses: Record<string, number>): AuditScores {
  const rawScore = Object.values(responses).reduce((sum, val) => sum + val, 0);
  const disciplineScore = Math.min(Math.round(rawScore * 1.42), 100);

  let tier: AuditScores["tier"];
  let tierDescription: string;

  if (disciplineScore <= 50) {
    tier = "THE NURSERY";
    tierDescription = "The CEO is a babysitter. Danger zone.";
  } else if (disciplineScore <= 79) {
    tier = "THE DRIFT";
    tierDescription = "Revenue is accidental. One crisis away from collapse.";
  } else {
    tier = "THE VANGUARD";
    tierDescription = "Elite. Just needs optimization.";
  }

  return { rawScore, disciplineScore, tier, tierDescription };
}
