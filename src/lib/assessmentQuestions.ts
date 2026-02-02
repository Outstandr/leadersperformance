export interface Question {
  id: string;
  questionNumber: number;
  text: {
    en: string;
    nl: string;
  };
  domain: 'selfDiscipline' | 'impulseControl' | 'consistency';
  reverseScored: boolean;
}

export const questions: Question[] = [
  {
    id: 'q1',
    questionNumber: 1,
    text: {
      en: "I consistently follow through on commitments I make to myself",
      nl: "Ik volg consequent de toezeggingen na die ik aan mezelf doe"
    },
    domain: 'selfDiscipline',
    reverseScored: false
  },
  {
    id: 'q2',
    questionNumber: 2,
    text: {
      en: "When working toward a long-term goal, I maintain focus even when progress feels slow",
      nl: "Bij het werken aan een langetermijndoel blijf ik gefocust, zelfs wanneer de voortgang langzaam aanvoelt"
    },
    domain: 'selfDiscipline',
    reverseScored: false
  },
  {
    id: 'q3',
    questionNumber: 3,
    text: {
      en: "I easily give up on tasks that require sustained effort",
      nl: "Ik geef gemakkelijk op bij taken die aanhoudende inspanning vereisen"
    },
    domain: 'selfDiscipline',
    reverseScored: true
  },
  {
    id: 'q4',
    questionNumber: 4,
    text: {
      en: "I can resist immediate pleasures to achieve larger, future rewards",
      nl: "Ik kan directe genoegens weerstaan om grotere, toekomstige beloningen te bereiken"
    },
    domain: 'selfDiscipline',
    reverseScored: false
  },
  {
    id: 'q8',
    questionNumber: 8,
    text: {
      en: "I often act on impulse without thinking through the consequences",
      nl: "Ik handel vaak impulsief zonder na te denken over de gevolgen"
    },
    domain: 'impulseControl',
    reverseScored: true
  },
  {
    id: 'q9',
    questionNumber: 9,
    text: {
      en: "When I'm stressed, I can maintain control over my reactions",
      nl: "Wanneer ik gestrest ben, kan ik controle houden over mijn reacties"
    },
    domain: 'impulseControl',
    reverseScored: false
  },
  {
    id: 'q10',
    questionNumber: 10,
    text: {
      en: "I frequently make purchases I later regret",
      nl: "Ik doe regelmatig aankopen waar ik later spijt van heb"
    },
    domain: 'impulseControl',
    reverseScored: true
  },
  {
    id: 'q15',
    questionNumber: 15,
    text: {
      en: "I maintain daily routines that support my goals",
      nl: "Ik onderhoud dagelijkse routines die mijn doelen ondersteunen"
    },
    domain: 'consistency',
    reverseScored: false
  },
  {
    id: 'q16',
    questionNumber: 16,
    text: {
      en: "My productivity varies dramatically from day to day",
      nl: "Mijn productiviteit varieert sterk van dag tot dag"
    },
    domain: 'consistency',
    reverseScored: true
  },
  {
    id: 'q17',
    questionNumber: 17,
    text: {
      en: "I bounce back quickly from setbacks and failures",
      nl: "Ik herstel snel van tegenslagen en mislukkingen"
    },
    domain: 'consistency',
    reverseScored: false
  }
];

export const ratingLabels = {
  en: [
    "Not at all like me",
    "Slightly like me",
    "Moderately like me",
    "Very much like me",
    "Extremely like me"
  ],
  nl: [
    "Helemaal niet zoals ik",
    "Een beetje zoals ik",
    "Redelijk zoals ik",
    "Erg zoals ik",
    "Helemaal zoals ik"
  ]
};

export const countries = [
  { code: "US", name: "United States", lang: "en" },
  { code: "GB", name: "United Kingdom", lang: "en" },
  { code: "NL", name: "Netherlands", lang: "nl" },
  { code: "BE", name: "Belgium", lang: "nl" },
  { code: "SR", name: "Suriname", lang: "nl" },
  { code: "CA", name: "Canada", lang: "en" },
  { code: "AU", name: "Australia", lang: "en" },
  { code: "DE", name: "Germany", lang: "en" },
  { code: "FR", name: "France", lang: "en" },
  { code: "ES", name: "Spain", lang: "en" },
  { code: "IT", name: "Italy", lang: "en" },
  { code: "Other", name: "Other", lang: "en" }
];
