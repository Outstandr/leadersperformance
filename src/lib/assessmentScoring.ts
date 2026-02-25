import { questions } from './assessmentQuestions';

export interface Scores {
  selfDiscipline: number;
  impulseControl: number;
  consistency: number;
  overall: number;
}

export interface DisciplineResult {
  scores: Scores;
  disciplineType: string;
  disciplineTypeDescription: string;
}

export function calculateScores(responses: Record<string, number>): Scores {
  // Adjust for reverse scored questions
  const adjustedResponses: Record<string, number> = {};
  
  questions.forEach(q => {
    const rawScore = responses[q.id] || 3;
    adjustedResponses[q.id] = q.reverseScored ? (6 - rawScore) : rawScore;
  });

  // Calculate domain scores
  const selfDisciplineQuestions = questions.filter(q => q.domain === 'selfDiscipline');
  const impulseControlQuestions = questions.filter(q => q.domain === 'impulseControl');
  const consistencyQuestions = questions.filter(q => q.domain === 'consistency');

  const selfDisciplineAvg = selfDisciplineQuestions.reduce((sum, q) => sum + adjustedResponses[q.id], 0) / selfDisciplineQuestions.length;
  const impulseControlAvg = impulseControlQuestions.reduce((sum, q) => sum + adjustedResponses[q.id], 0) / impulseControlQuestions.length;
  const consistencyAvg = consistencyQuestions.reduce((sum, q) => sum + adjustedResponses[q.id], 0) / consistencyQuestions.length;

  // Convert to 0-100 scale (rounded to whole numbers)
  const selfDiscipline = Math.round(selfDisciplineAvg * 20);
  const impulseControl = Math.round(impulseControlAvg * 20);
  const consistency = Math.round(consistencyAvg * 20);
  const overall = Math.round((selfDiscipline + impulseControl + consistency) / 3);

  return {
    selfDiscipline,
    impulseControl,
    consistency,
    overall
  };
}

export function determineDisciplineType(scores: Scores): { type: string; description: string } {
  const { selfDiscipline, impulseControl, consistency, overall } = scores;
  
  // Calculate variance for Perfectionist check
  const avg = overall;
  const variance = (
    Math.pow(selfDiscipline - avg, 2) + 
    Math.pow(impulseControl - avg, 2) + 
    Math.pow(consistency - avg, 2)
  ) / 3;

  // The Natural: overall >= 80 AND all domains >= 70
  if (overall >= 80 && selfDiscipline >= 70 && impulseControl >= 70 && consistency >= 70) {
    return {
      type: "The Natural",
      description: "Strong discipline across all areas. You have developed excellent habits and self-control."
    };
  }

  // The Perfectionist: overall >= 75 AND variance < 20
  if (overall >= 75 && variance < 20) {
    return {
      type: "The Perfectionist",
      description: "Extremely disciplined but sometimes too rigid. Consider allowing more flexibility."
    };
  }

  // The Starter: selfDiscipline < 60 AND impulseControl >= 50
  if (selfDiscipline < 60 && impulseControl >= 50) {
    return {
      type: "The Starter",
      description: "Great at beginning projects but struggles with long-term consistency. Focus on building sustainable habits."
    };
  }

  // The Sprinter: selfDiscipline >= 70 AND impulseControl < 60
  if (selfDiscipline >= 70 && impulseControl < 60) {
    return {
      type: "The Sprinter",
      description: "Capable of intense bursts of effort but prone to burnout. Work on pacing yourself."
    };
  }

  // Default: The Steady Climber
  return {
    type: "The Steady Climber",
    description: "Consistent across areas but could optimize efficiency. You have a solid foundation to build upon."
  };
}

export function getFullResults(responses: Record<string, number>): DisciplineResult {
  const scores = calculateScores(responses);
  const { type, description } = determineDisciplineType(scores);
  
  return {
    scores,
    disciplineType: type,
    disciplineTypeDescription: description
  };
}
