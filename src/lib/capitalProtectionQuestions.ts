export interface CPSection {
  id: string;
  title: { en: string; nl: string };
  type: "single" | "multi" | "text" | "multi-text" | "boolean";
  question: { en: string; nl: string };
  options?: { en: string[]; nl: string[] };
  textCount?: number;
  textPlaceholder?: { en: string; nl: string };
}

export const cpSections: CPSection[] = [
  {
    id: "situation_types",
    title: { en: "Situation Type", nl: "Type Situatie" },
    type: "multi",
    question: {
      en: "What type of situation are you currently dealing with?",
      nl: "Met welk type situatie heeft u momenteel te maken?",
    },
    options: {
      en: [
        "Fraud",
        "Crypto fraud",
        "Misappropriation of funds",
        "Partner dispute",
        "Investor dispute",
        "Breach of contract",
        "Ownership conflict",
        "Other financial dispute",
      ],
      nl: [
        "Fraude",
        "Cryptofraude",
        "Verduistering van gelden",
        "Partnergeschil",
        "Investeerdersgeschil",
        "Contractbreuk",
        "Eigendomsconflict",
        "Ander financieel geschil",
      ],
    },
  },
  {
    id: "capital_exposure",
    title: { en: "Capital Exposure", nl: "Kapitaalblootstelling" },
    type: "single",
    question: {
      en: "What is the estimated financial exposure?",
      nl: "Wat is de geschatte financiële blootstelling?",
    },
    options: {
      en: ["€100K – €500K", "€500K – €1M", "€1M – €5M", "€5M – €20M", "€20M+"],
      nl: ["€100K – €500K", "€500K – €1M", "€1M – €5M", "€5M – €20M", "€20M+"],
    },
  },
  {
    id: "timeline",
    title: { en: "Timeline", nl: "Tijdlijn" },
    type: "single",
    question: {
      en: "When did the situation begin?",
      nl: "Wanneer is de situatie begonnen?",
    },
    options: {
      en: ["Less than 3 months ago", "3–12 months ago", "1–3 years ago", "More than 3 years ago"],
      nl: ["Minder dan 3 maanden geleden", "3–12 maanden geleden", "1–3 jaar geleden", "Meer dan 3 jaar geleden"],
    },
  },
  {
    id: "evidence_types",
    title: { en: "Evidence", nl: "Bewijs" },
    type: "multi",
    question: {
      en: "What documentation do you currently have?",
      nl: "Welke documentatie heeft u momenteel?",
    },
    options: {
      en: [
        "Contracts",
        "Transaction records",
        "Crypto wallet addresses",
        "Emails or messages",
        "Legal documentation",
        "Bank records",
        "No documentation yet",
      ],
      nl: [
        "Contracten",
        "Transactieoverzichten",
        "Crypto wallet-adressen",
        "E-mails of berichten",
        "Juridische documentatie",
        "Bankgegevens",
        "Nog geen documentatie",
      ],
    },
  },
  {
    id: "jurisdictions",
    title: { en: "Jurisdictions Involved", nl: "Betrokken Jurisdicties" },
    type: "multi-text",
    question: {
      en: "Where are the main parties located?",
      nl: "Waar bevinden de belangrijkste partijen zich?",
    },
    textCount: 3,
    textPlaceholder: { en: "Country", nl: "Land" },
  },
  {
    id: "legal_status",
    title: { en: "Legal Status", nl: "Juridische Status" },
    type: "single",
    question: {
      en: "Have you taken legal action already?",
      nl: "Heeft u al juridische stappen ondernomen?",
    },
    options: {
      en: ["No action yet", "Lawyer consulted", "Legal case filed"],
      nl: ["Nog geen actie", "Advocaat geraadpleegd", "Juridische zaak ingediend"],
    },
  },
  {
    id: "objective",
    title: { en: "Objective", nl: "Doelstelling" },
    type: "single",
    question: {
      en: "What is your primary objective?",
      nl: "Wat is uw primaire doelstelling?",
    },
    options: {
      en: [
        "Recover lost capital",
        "Stop ongoing fraud",
        "Resolve partner conflict",
        "Strategic settlement",
        "Full investigation",
      ],
      nl: [
        "Verloren kapitaal terughalen",
        "Lopende fraude stoppen",
        "Partnerconflict oplossen",
        "Strategische schikking",
        "Volledig onderzoek",
      ],
    },
  },
  {
    id: "situation_summary",
    title: { en: "Situation Summary", nl: "Situatieoverzicht" },
    type: "text",
    question: {
      en: "Please describe the situation briefly.",
      nl: "Beschrijf de situatie kort.",
    },
    textPlaceholder: {
      en: "Describe what happened, who is involved, and what you've tried so far...",
      nl: "Beschrijf wat er is gebeurd, wie erbij betrokken is en wat u tot nu toe heeft geprobeerd...",
    },
  },
  {
    id: "consent_review",
    title: { en: "Strategic Review Consent", nl: "Toestemming Strategische Beoordeling" },
    type: "boolean",
    question: {
      en: "If your case qualifies, would you be open to a confidential strategic review?",
      nl: "Als uw zaak in aanmerking komt, staat u dan open voor een vertrouwelijke strategische beoordeling?",
    },
  },
];

export const cpRoles = {
  en: ["Founder", "CEO", "Shareholder", "Investor"],
  nl: ["Oprichter", "CEO", "Aandeelhouder", "Investeerder"],
};
