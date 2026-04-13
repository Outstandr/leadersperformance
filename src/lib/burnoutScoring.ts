import { normalizeScore, getColorTier, ColorTier } from "./unifiedScoring";

// ========== FREE TEST SCORING ==========

export interface PressureFreeResult {
  fpsScore: number;
  fpsColor: ColorTier;
  fpsLabel: { en: string; nl: string };
  sectionScores: { key: string; label: string; score: number; color: ColorTier }[];
}

// Keep old name as alias for backward compat
export type BurnoutFreeResult = PressureFreeResult;

const FREE_SECTIONS = [
  { key: "workload_intensity", label: { en: "Founder Dependency", nl: "Founder Afhankelijkheid" }, ids: ["fq1", "fq2"] },
  { key: "sleep_quality", label: { en: "Sleep Quality", nl: "Slaapkwaliteit" }, ids: ["fq3", "fq4"] },
  { key: "mental_fatigue", label: { en: "Leadership Alignment", nl: "Leiderschapsafstemming" }, ids: ["fq5", "fq6"] },
  { key: "decision_pressure", label: { en: "Decision Pressure", nl: "Beslissingsdruk" }, ids: ["fq7", "fq8"] },
  { key: "stress_tolerance", label: { en: "Execution Momentum", nl: "Uitvoeringsmomentum" }, ids: ["fq9", "fq10"] },
];

const FPS_LABELS: Record<string, { en: string; nl: string }> = {
  low: { en: "Low Risk", nl: "Laag Risico" },
  moderate: { en: "Moderate Pressure", nl: "Matige Druk" },
  high: { en: "High Pressure Risk", nl: "Hoog Drukrisico" },
  critical: { en: "Critical Founder Collapse Risk", nl: "Kritiek Founder Instortingsrisico" },
};

function getFPSCategory(score: number): string {
  if (score <= 25) return "low";
  if (score <= 50) return "moderate";
  if (score <= 75) return "high";
  return "critical";
}

export function calculateFreePressureScore(
  responses: Record<string, number>,
  language: "en" | "nl"
): PressureFreeResult {
  const sectionScores = FREE_SECTIONS.map((s) => {
    const sum = s.ids.reduce((acc, id) => acc + (responses[id] || 1), 0);
    const score = normalizeScore(sum, s.ids.length, s.ids.length * 4);
    return { key: s.key, label: s.label[language], score, color: getColorTier(score) };
  });

  const totalSum = Object.values(responses).reduce((a, b) => a + b, 0);
  const fpsScore = normalizeScore(totalSum, 10, 40);
  const category = getFPSCategory(fpsScore);

  return {
    fpsScore,
    fpsColor: getColorTier(fpsScore),
    fpsLabel: FPS_LABELS[category],
    sectionScores,
  };
}

// Keep old name as alias
export const calculateFreeBurnoutScore = calculateFreePressureScore;

// ========== FULL DIAGNOSTIC SCORING ==========

export type PressurePhase = "performance_strain" | "cumulative_overload" | "functional_overload" | "system_collapse" | "shutdown";
export type BurnoutPhase = PressurePhase;

export interface PressureFullResult {
  fpsScore: number;
  fpsColor: ColorTier;
  fpsLabel: { en: string; nl: string };
  phase: PressurePhase;
  phaseLabel: { en: string; nl: string };
  phaseNumber: number;
  recoveryWithout: { en: string; nl: string };
  recoveryWith: { en: string; nl: string };
  domainScores: { key: string; label: string; score: number; color: ColorTier }[];
  primaryRiskDomain: { label: string; impact: string };
  diagnosis: string;
  recommendation: string;
}

export type BurnoutFullResult = PressureFullResult;

const FULL_DOMAINS = [
  { key: "pressure_load", label: { en: "Founder Pressure Load", nl: "Founder Drukbelasting" }, ids: ["dq1","dq2","dq3","dq4","dq5","dq6","dq7","dq8"], weight: 0.30 },
  { key: "nervous_system", label: { en: "Nervous System Depletion", nl: "Zenuwstelsel Uitputting" }, ids: ["dq9","dq10","dq11","dq12","dq13","dq14","dq15","dq16"], weight: 0.25 },
  { key: "business_dependency", label: { en: "Business Dependency", nl: "Bedrijfsafhankelijkheid" }, ids: ["dq17","dq18","dq19","dq20","dq21","dq22","dq23","dq24"], weight: 0.25 },
  { key: "recovery_capacity", label: { en: "Recovery Capacity", nl: "Herstelcapaciteit" }, ids: ["dq25","dq26","dq27","dq28","dq29","dq30","dq31","dq32"], weight: 0.20 },
];

const DOMAIN_IMPACT: Record<string, { en: string; nl: string }> = {
  pressure_load: {
    en: "Your operational and decision-making load is unsustainable. The volume of responsibility concentrated on you is the primary driver of pressure risk.",
    nl: "Uw operationele en besluitvormingsbelasting is onhoudbaar. Het volume aan verantwoordelijkheid dat bij u geconcentreerd is, is de primaire driver van drukrisico.",
  },
  nervous_system: {
    en: "Your nervous system shows signs of chronic depletion. Sleep disruption, physical symptoms, and emotional exhaustion indicate your body is signaling overload.",
    nl: "Uw zenuwstelsel toont tekenen van chronische uitputting. Slaapverstoring, fysieke symptomen en emotionele uitputting geven aan dat uw lichaam overbelasting signaleert.",
  },
  business_dependency: {
    en: "Your company is critically dependent on your personal involvement. This structural vulnerability accelerates pressure overload by preventing recovery.",
    nl: "Uw bedrijf is kritiek afhankelijk van uw persoonlijke betrokkenheid. Deze structurele kwetsbaarheid versnelt drukoverbelasting door herstel te voorkomen.",
  },
  recovery_capacity: {
    en: "Your recovery systems are insufficient. Without adequate physical, emotional, and social recovery mechanisms, pressure compounds faster than you can process it.",
    nl: "Uw herstelsystemen zijn ontoereikend. Zonder adequate fysieke, emotionele en sociale herstelmechanismen hoopt druk zich sneller op dan u kunt verwerken.",
  },
};

const REVERSE_SCORED_IDS = new Set(["dq25","dq26","dq27","dq28","dq29","dq30","dq31","dq32"]);

function getPhase(score: number): { phase: PressurePhase; number: number; label: { en: string; nl: string } } {
  if (score <= 20) return { phase: "performance_strain", number: 1, label: { en: "Phase 1: Performance Strain", nl: "Fase 1: Prestatiespanning" } };
  if (score <= 40) return { phase: "cumulative_overload", number: 2, label: { en: "Phase 2: Cumulative Overload", nl: "Fase 2: Cumulatieve Overbelasting" } };
  if (score <= 60) return { phase: "functional_overload", number: 3, label: { en: "Phase 3: Functional Overload", nl: "Fase 3: Functionele Overbelasting" } };
  if (score <= 80) return { phase: "system_collapse", number: 4, label: { en: "Phase 4: System Collapse", nl: "Fase 4: Systeeminstorting" } };
  return { phase: "shutdown", number: 5, label: { en: "Phase 5: Shutdown", nl: "Fase 5: Shutdown" } };
}

function getRecoveryEstimate(score: number): { without: { en: string; nl: string }; with: { en: string; nl: string } } {
  if (score <= 25) return {
    without: { en: "1-3 months", nl: "1-3 maanden" },
    with: { en: "2-4 weeks", nl: "2-4 weken" },
  };
  if (score <= 50) return {
    without: { en: "3-6 months", nl: "3-6 maanden" },
    with: { en: "4-8 weeks", nl: "4-8 weken" },
  };
  if (score <= 75) return {
    without: { en: "6-18 months", nl: "6-18 maanden" },
    with: { en: "4-10 weeks", nl: "4-10 weken" },
  };
  return {
    without: { en: "12-24+ months", nl: "12-24+ maanden" },
    with: { en: "8-16 weeks", nl: "8-16 weken" },
  };
}

export function calculateFullPressureScore(
  responses: Record<string, number>,
  language: "en" | "nl"
): PressureFullResult {
  const domainScores = FULL_DOMAINS.map((d) => {
    const sum = d.ids.reduce((acc, id) => {
      const raw = responses[id] || 1;
      const adjusted = REVERSE_SCORED_IDS.has(id) ? (5 - raw) : raw;
      return acc + adjusted;
    }, 0);
    const score = normalizeScore(sum, d.ids.length, d.ids.length * 4);
    return { key: d.key, label: d.label[language], score, color: getColorTier(score), weight: d.weight };
  });

  const fpsScore = Math.round(domainScores.reduce((sum, d) => sum + d.score * d.weight, 0));
  const fpsColor = getColorTier(fpsScore);
  const category = getFPSCategory(fpsScore);
  const phaseInfo = getPhase(fpsScore);
  const recovery = getRecoveryEstimate(fpsScore);

  const worst = [...domainScores].sort((a, b) => b.score - a.score)[0];
  const impact = DOMAIN_IMPACT[worst.key];

  const diagnosis = generateDiagnosis(fpsScore, fpsColor, worst.label, language);
  const recommendation = generateRecommendation(fpsScore, fpsColor, language);

  return {
    fpsScore,
    fpsColor,
    fpsLabel: FPS_LABELS[category],
    phase: phaseInfo.phase,
    phaseLabel: phaseInfo.label,
    phaseNumber: phaseInfo.number,
    recoveryWithout: recovery.without,
    recoveryWith: recovery.with,
    domainScores: domainScores.map(({ key, label, score, color }) => ({ key, label, score, color })),
    primaryRiskDomain: { label: worst.label, impact: impact[language] },
    diagnosis,
    recommendation,
  };
}

// Keep old name as alias
export const calculateFullBurnoutScore = calculateFullPressureScore;

function generateDiagnosis(score: number, color: ColorTier, worstLabel: string, lang: "en" | "nl"): string {
  if (color === "green") {
    return lang === "en"
      ? `Low pressure risk detected. Your founder pressure is manageable. Monitor ${worstLabel} to maintain this position.`
      : `Laag drukrisico gedetecteerd. Uw founder-druk is beheersbaar. Monitor ${worstLabel} om deze positie te behouden.`;
  }
  if (color === "yellow") {
    return lang === "en"
      ? `You are showing signs of cumulative founder pressure. Many founders ignore these signals until performance drops. Your primary risk area is ${worstLabel}.`
      : `U toont tekenen van cumulatieve founder-druk. Veel founders negeren deze signalen totdat de prestaties dalen. Uw primaire risicogebied is ${worstLabel}.`;
  }
  if (color === "orange") {
    return lang === "en"
      ? `High founder pressure detected. Your system is under significant strain, driven primarily by ${worstLabel}. Without intervention, this trajectory leads to functional overload.`
      : `Hoge founder-druk gedetecteerd. Uw systeem staat onder aanzienlijke spanning, voornamelijk gedreven door ${worstLabel}. Zonder interventie leidt dit traject tot functionele overbelasting.`;
  }
  return lang === "en"
    ? `Critical founder collapse risk. Your pressure load, nervous system depletion, and business dependency have converged into a high-risk pattern. ${worstLabel} is the most critical area requiring immediate intervention.`
    : `Kritiek founder-instortingsrisico. Uw drukbelasting, zenuwstelseluitputting en bedrijfsafhankelijkheid zijn samengekomen in een hoog-risicopatroon. ${worstLabel} is het meest kritieke gebied dat onmiddellijke interventie vereist.`;
}

function generateRecommendation(score: number, color: ColorTier, lang: "en" | "nl"): string {
  if (color === "green") {
    return lang === "en"
      ? "Focus on maintaining recovery systems and building organizational independence."
      : "Focus op het behouden van herstelsystemen en het opbouwen van organisatorische onafhankelijkheid.";
  }
  if (color === "yellow") {
    return lang === "en"
      ? "Schedule a Founder Intervention Call to identify early patterns before they become structural."
      : "Plan een Founder Interventie Gesprek om vroege patronen te identificeren voordat ze structureel worden.";
  }
  if (color === "orange") {
    return lang === "en"
      ? "A structured founder intervention is recommended. Book a Founder Intervention Call to determine your recovery path."
      : "Een gestructureerde founder-interventie wordt aanbevolen. Boek een Founder Interventie Gesprek om uw herstelpad te bepalen.";
  }
  return lang === "en"
    ? "Immediate intervention is critical. Book a Founder Intervention Call today to prevent further deterioration."
    : "Onmiddellijke interventie is cruciaal. Boek vandaag nog een Founder Interventie Gesprek om verdere verslechtering te voorkomen.";
}
