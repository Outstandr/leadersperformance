export interface PressureQuestion {
  id: string;
  section: "decision_pressure" | "founder_dependency" | "leadership_alignment" | "execution_momentum";
  sectionLabel: { en: string; nl: string };
  question: { en: string; nl: string };
}

export const pressureQuestions: PressureQuestion[] = [
  // Section 1: Decision Pressure (Q1–Q3)
  {
    id: "q1",
    section: "decision_pressure",
    sectionLabel: { en: "Decision Pressure", nl: "Beslissingsdruk" },
    question: {
      en: "Most strategic decisions in my company require my direct involvement before they move forward.",
      nl: "De meeste strategische beslissingen in mijn bedrijf vereisen mijn directe betrokkenheid voordat ze worden uitgevoerd.",
    },
  },
  {
    id: "q2",
    section: "decision_pressure",
    sectionLabel: { en: "Decision Pressure", nl: "Beslissingsdruk" },
    question: {
      en: "My team regularly delays action until I weigh in, even on operational matters.",
      nl: "Mijn team stelt regelmatig acties uit totdat ik mijn mening heb gegeven, zelfs bij operationele zaken.",
    },
  },
  {
    id: "q3",
    section: "decision_pressure",
    sectionLabel: { en: "Decision Pressure", nl: "Beslissingsdruk" },
    question: {
      en: "I often feel that if I don't decide, nothing happens.",
      nl: "Ik heb vaak het gevoel dat er niets gebeurt als ik niet beslis.",
    },
  },
  // Section 2: Founder Dependency (Q4–Q6)
  {
    id: "q4",
    section: "founder_dependency",
    sectionLabel: { en: "Founder Dependency", nl: "Founderafhankelijkheid" },
    question: {
      en: "Key clients or partners primarily maintain their relationship with me rather than my team.",
      nl: "Belangrijke klanten of partners onderhouden hun relatie voornamelijk met mij in plaats van met mijn team.",
    },
  },
  {
    id: "q5",
    section: "founder_dependency",
    sectionLabel: { en: "Founder Dependency", nl: "Founderafhankelijkheid" },
    question: {
      en: "If I stepped away for a month, revenue or delivery quality would noticeably decline.",
      nl: "Als ik een maand weg zou zijn, zou de omzet of leveringskwaliteit merkbaar dalen.",
    },
  },
  {
    id: "q6",
    section: "founder_dependency",
    sectionLabel: { en: "Founder Dependency", nl: "Founderafhankelijkheid" },
    question: {
      en: "My team lacks the authority or confidence to handle escalations without me.",
      nl: "Mijn team mist de bevoegdheid of het vertrouwen om escalaties zonder mij af te handelen.",
    },
  },
  // Section 3: Leadership Alignment (Q7–Q9)
  {
    id: "q7",
    section: "leadership_alignment",
    sectionLabel: { en: "Leadership Alignment", nl: "Leiderschapsafstemming" },
    question: {
      en: "My leadership team frequently disagrees on priorities, causing friction or delays.",
      nl: "Mijn leiderschapsteam is het regelmatig oneens over prioriteiten, wat wrijving of vertragingen veroorzaakt.",
    },
  },
  {
    id: "q8",
    section: "leadership_alignment",
    sectionLabel: { en: "Leadership Alignment", nl: "Leiderschapsafstemming" },
    question: {
      en: "There is a gap between what I communicate as strategy and how my team executes it.",
      nl: "Er is een kloof tussen wat ik als strategie communiceer en hoe mijn team het uitvoert.",
    },
  },
  {
    id: "q9",
    section: "leadership_alignment",
    sectionLabel: { en: "Leadership Alignment", nl: "Leiderschapsafstemming" },
    question: {
      en: "I often have to repeat myself or re-explain direction to get alignment.",
      nl: "Ik moet mezelf vaak herhalen of de richting opnieuw uitleggen om afstemming te krijgen.",
    },
  },
  // Section 4: Execution Momentum (Q10–Q12)
  {
    id: "q10",
    section: "execution_momentum",
    sectionLabel: { en: "Execution Momentum", nl: "Uitvoeringsmomentum" },
    question: {
      en: "Projects in my company regularly stall or lose momentum without my active push.",
      nl: "Projecten in mijn bedrijf stagneren regelmatig of verliezen momentum zonder mijn actieve aansturing.",
    },
  },
  {
    id: "q11",
    section: "execution_momentum",
    sectionLabel: { en: "Execution Momentum", nl: "Uitvoeringsmomentum" },
    question: {
      en: "We have clear quarterly goals, but accountability for hitting them is weak.",
      nl: "We hebben duidelijke kwartaaldoelen, maar de verantwoordelijkheid om ze te halen is zwak.",
    },
  },
  {
    id: "q12",
    section: "execution_momentum",
    sectionLabel: { en: "Execution Momentum", nl: "Uitvoeringsmomentum" },
    question: {
      en: "Execution speed in my company is slower than it should be given our resources.",
      nl: "De uitvoeringssnelheid in mijn bedrijf is lager dan zou moeten gezien onze middelen.",
    },
  },
];

export const scaleLabels = {
  en: [
    { value: 1, label: "Strongly Disagree" },
    { value: 2, label: "Disagree" },
    { value: 3, label: "Agree" },
    { value: 4, label: "Strongly Agree" },
  ],
  nl: [
    { value: 1, label: "Helemaal oneens" },
    { value: 2, label: "Oneens" },
    { value: 3, label: "Eens" },
    { value: 4, label: "Helemaal eens" },
  ],
};
