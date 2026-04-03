export interface ProfitLeakQuestion {
  id: string;
  section: "founder_dependency" | "structure_leadership" | "decision_speed" | "profitability" | "scalability";
  sectionLabel: { en: string; nl: string };
  question: { en: string; nl: string };
  options: { label: { en: string; nl: string }; value: number }[];
}

export const revenueOptions = [
  { label: { en: "€5M – €15M", nl: "€5M – €15M" }, value: "5m_15m" },
  { label: { en: "€15M – €30M", nl: "€15M – €30M" }, value: "15m_30m" },
  { label: { en: "€30M – €50M", nl: "€30M – €50M" }, value: "30m_50m" },
  { label: { en: "€50M+", nl: "€50M+" }, value: "50m_plus" },
];

export const profitLeakQuestions: ProfitLeakQuestion[] = [
  // Section 1 — Founder Dependency
  {
    id: "pl1",
    section: "founder_dependency",
    sectionLabel: { en: "Founder Dependency", nl: "Founder Afhankelijkheid" },
    question: {
      en: "How many key decisions still go through the founder?",
      nl: "Hoeveel belangrijke beslissingen lopen nog via de founder?",
    },
    options: [
      { label: { en: "Almost all", nl: "Bijna allemaal" }, value: 4 },
      { label: { en: "Many", nl: "Veel" }, value: 3 },
      { label: { en: "Some", nl: "Sommige" }, value: 2 },
      { label: { en: "Very few", nl: "Heel weinig" }, value: 1 },
    ],
  },
  {
    id: "pl2",
    section: "founder_dependency",
    sectionLabel: { en: "Founder Dependency", nl: "Founder Afhankelijkheid" },
    question: {
      en: "If the founder disappears for 30 days, what happens?",
      nl: "Als de founder 30 dagen verdwijnt, wat gebeurt er dan?",
    },
    options: [
      { label: { en: "Company stops or slows dramatically", nl: "Bedrijf stopt of vertraagt dramatisch" }, value: 4 },
      { label: { en: "Some departments struggle", nl: "Sommige afdelingen hebben moeite" }, value: 3 },
      { label: { en: "Most operations continue", nl: "De meeste operaties gaan door" }, value: 2 },
      { label: { en: "Company runs normally", nl: "Bedrijf draait normaal" }, value: 1 },
    ],
  },
  {
    id: "pl3",
    section: "founder_dependency",
    sectionLabel: { en: "Founder Dependency", nl: "Founder Afhankelijkheid" },
    question: {
      en: "How involved is the founder in daily operations?",
      nl: "Hoe betrokken is de founder bij dagelijkse operaties?",
    },
    options: [
      { label: { en: "Deeply involved in multiple departments", nl: "Diep betrokken bij meerdere afdelingen" }, value: 4 },
      { label: { en: "Involved in key decisions", nl: "Betrokken bij belangrijke beslissingen" }, value: 3 },
      { label: { en: "Mostly strategic", nl: "Voornamelijk strategisch" }, value: 2 },
      { label: { en: "Only high-level leadership", nl: "Alleen leiderschap op hoog niveau" }, value: 1 },
    ],
  },
  // Section 2 — Structure & Leadership
  {
    id: "pl4",
    section: "structure_leadership",
    sectionLabel: { en: "Structure & Leadership", nl: "Structuur & Leiderschap" },
    question: {
      en: "Do departments have clear accountability and KPIs?",
      nl: "Hebben afdelingen duidelijke verantwoordelijkheid en KPI's?",
    },
    options: [
      { label: { en: "No clear structure", nl: "Geen duidelijke structuur" }, value: 4 },
      { label: { en: "Some structure", nl: "Enige structuur" }, value: 3 },
      { label: { en: "Mostly structured", nl: "Grotendeels gestructureerd" }, value: 2 },
      { label: { en: "Fully structured", nl: "Volledig gestructureerd" }, value: 1 },
    ],
  },
  {
    id: "pl5",
    section: "structure_leadership",
    sectionLabel: { en: "Structure & Leadership", nl: "Structuur & Leiderschap" },
    question: {
      en: "How strong is the first management layer?",
      nl: "Hoe sterk is de eerste managementlaag?",
    },
    options: [
      { label: { en: "Weak or inconsistent", nl: "Zwak of inconsistent" }, value: 4 },
      { label: { en: "Developing but unstable", nl: "In ontwikkeling maar instabiel" }, value: 3 },
      { label: { en: "Solid but improving", nl: "Solide maar verbeterend" }, value: 2 },
      { label: { en: "Strong leadership team", nl: "Sterk leiderschapsteam" }, value: 1 },
    ],
  },
  {
    id: "pl6",
    section: "structure_leadership",
    sectionLabel: { en: "Structure & Leadership", nl: "Structuur & Leiderschap" },
    question: {
      en: "When problems occur, what usually happens?",
      nl: "Wanneer er problemen optreden, wat gebeurt er dan meestal?",
    },
    options: [
      { label: { en: "Founder steps in", nl: "Founder grijpt in" }, value: 4 },
      { label: { en: "Managers escalate to founder", nl: "Managers escaleren naar founder" }, value: 3 },
      { label: { en: "Managers solve most issues", nl: "Managers lossen de meeste problemen op" }, value: 2 },
      { label: { en: "Leadership team solves independently", nl: "Leiderschapsteam lost zelfstandig op" }, value: 1 },
    ],
  },
  // Section 3 — Decision Speed
  {
    id: "pl7",
    section: "decision_speed",
    sectionLabel: { en: "Decision Speed", nl: "Besluitvormingssnelheid" },
    question: {
      en: "Compared to two years ago, decision-making is:",
      nl: "Vergeleken met twee jaar geleden is de besluitvorming:",
    },
    options: [
      { label: { en: "Slower", nl: "Langzamer" }, value: 4 },
      { label: { en: "Slightly slower", nl: "Iets langzamer" }, value: 3 },
      { label: { en: "Same", nl: "Hetzelfde" }, value: 2 },
      { label: { en: "Faster", nl: "Sneller" }, value: 1 },
    ],
  },
  {
    id: "pl8",
    section: "decision_speed",
    sectionLabel: { en: "Decision Speed", nl: "Besluitvormingssnelheid" },
    question: {
      en: "Meetings inside leadership are usually:",
      nl: "Vergaderingen binnen het leiderschap zijn meestal:",
    },
    options: [
      { label: { en: "Long and unclear", nl: "Lang en onduidelijk" }, value: 4 },
      { label: { en: "Frequent but productive", nl: "Frequent maar productief" }, value: 3 },
      { label: { en: "Structured", nl: "Gestructureerd" }, value: 2 },
      { label: { en: "Highly efficient", nl: "Zeer efficiënt" }, value: 1 },
    ],
  },
  {
    id: "pl9",
    section: "decision_speed",
    sectionLabel: { en: "Decision Speed", nl: "Besluitvormingssnelheid" },
    question: {
      en: "Do leadership conflicts appear behind the scenes?",
      nl: "Verschijnen er leiderschapsconflicten achter de schermen?",
    },
    options: [
      { label: { en: "Often", nl: "Vaak" }, value: 4 },
      { label: { en: "Sometimes", nl: "Soms" }, value: 3 },
      { label: { en: "Rarely", nl: "Zelden" }, value: 2 },
      { label: { en: "Never", nl: "Nooit" }, value: 1 },
    ],
  },
  // Section 4 — Profitability
  {
    id: "pl10",
    section: "profitability",
    sectionLabel: { en: "Profitability", nl: "Winstgevendheid" },
    question: {
      en: "In the last 24 months revenue has:",
      nl: "In de afgelopen 24 maanden is de omzet:",
    },
    options: [
      { label: { en: "Decreased", nl: "Afgenomen" }, value: 4 },
      { label: { en: "Stayed similar", nl: "Vergelijkbaar gebleven" }, value: 3 },
      { label: { en: "Increased moderately", nl: "Matig toegenomen" }, value: 2 },
      { label: { en: "Increased significantly", nl: "Aanzienlijk toegenomen" }, value: 1 },
    ],
  },
  {
    id: "pl11",
    section: "profitability",
    sectionLabel: { en: "Profitability", nl: "Winstgevendheid" },
    question: {
      en: "In the last 24 months profit has:",
      nl: "In de afgelopen 24 maanden is de winst:",
    },
    options: [
      { label: { en: "Decreased", nl: "Afgenomen" }, value: 4 },
      { label: { en: "Stayed flat", nl: "Gelijk gebleven" }, value: 3 },
      { label: { en: "Increased slightly", nl: "Licht toegenomen" }, value: 2 },
      { label: { en: "Increased strongly", nl: "Sterk toegenomen" }, value: 1 },
    ],
  },
  {
    id: "pl12",
    section: "profitability",
    sectionLabel: { en: "Profitability", nl: "Winstgevendheid" },
    question: {
      en: "Where is the biggest pressure inside the company?",
      nl: "Waar zit de grootste druk binnen het bedrijf?",
    },
    options: [
      { label: { en: "Execution capacity", nl: "Uitvoeringscapaciteit" }, value: 4 },
      { label: { en: "Leadership alignment", nl: "Leiderschapsafstemming" }, value: 3 },
      { label: { en: "Margins / profitability", nl: "Marges / winstgevendheid" }, value: 2 },
      { label: { en: "Strategic direction", nl: "Strategische richting" }, value: 1 },
    ],
  },
  // Section 5 — Scalability
  {
    id: "pl13",
    section: "scalability",
    sectionLabel: { en: "Scalability", nl: "Schaalbaarheid" },
    question: {
      en: "Are company processes documented and transferable?",
      nl: "Zijn bedrijfsprocessen gedocumenteerd en overdraagbaar?",
    },
    options: [
      { label: { en: "Mostly in people's heads", nl: "Voornamelijk in hoofden van mensen" }, value: 4 },
      { label: { en: "Partially documented", nl: "Gedeeltelijk gedocumenteerd" }, value: 3 },
      { label: { en: "Mostly documented", nl: "Grotendeels gedocumenteerd" }, value: 2 },
      { label: { en: "Fully systemised", nl: "Volledig gesystematiseerd" }, value: 1 },
    ],
  },
  {
    id: "pl14",
    section: "scalability",
    sectionLabel: { en: "Scalability", nl: "Schaalbaarheid" },
    question: {
      en: "How scalable is the current structure?",
      nl: "Hoe schaalbaar is de huidige structuur?",
    },
    options: [
      { label: { en: "Not scalable", nl: "Niet schaalbaar" }, value: 4 },
      { label: { en: "Limited scalability", nl: "Beperkte schaalbaarheid" }, value: 3 },
      { label: { en: "Scalable with adjustments", nl: "Schaalbaar met aanpassingen" }, value: 2 },
      { label: { en: "Ready for expansion", nl: "Klaar voor uitbreiding" }, value: 1 },
    ],
  },
];
