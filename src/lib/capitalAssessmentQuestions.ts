export interface AssessmentQuestion {
  id: string;
  section: string;
  sectionLabel: { en: string; nl: string };
  question: { en: string; nl: string };
  type: "single" | "multi" | "text";
  options?: { value: string; label: { en: string; nl: string }; weight: number }[];
}

export const capitalAssessmentQuestions: AssessmentQuestion[] = [
  // Section 2: Situation Type
  {
    id: "ca1",
    section: "situation_type",
    sectionLabel: { en: "Situation Type", nl: "Type Situatie" },
    question: { en: "What type of situation are you currently dealing with?", nl: "Met welk type situatie heeft u momenteel te maken?" },
    type: "single",
    options: [
      { value: "fraud", label: { en: "Fraud", nl: "Fraude" }, weight: 10 },
      { value: "crypto_fraud", label: { en: "Crypto fraud", nl: "Crypto fraude" }, weight: 10 },
      { value: "misappropriation", label: { en: "Misappropriation of funds", nl: "Verduistering van fondsen" }, weight: 9 },
      { value: "partner_dispute", label: { en: "Partner dispute", nl: "Partnerconflict" }, weight: 7 },
      { value: "investor_dispute", label: { en: "Investor dispute", nl: "Investeerdersgeschil" }, weight: 7 },
      { value: "breach_of_contract", label: { en: "Breach of contract", nl: "Contractbreuk" }, weight: 6 },
      { value: "ownership_conflict", label: { en: "Ownership conflict", nl: "Eigendomsconflict" }, weight: 8 },
      { value: "other", label: { en: "Other financial dispute", nl: "Ander financieel geschil" }, weight: 5 },
    ],
  },
  // Section 3: Capital Exposure
  {
    id: "ca2",
    section: "capital_exposure",
    sectionLabel: { en: "Capital Exposure", nl: "Kapitaalblootstelling" },
    question: { en: "What is the estimated financial exposure?", nl: "Wat is de geschatte financiële blootstelling?" },
    type: "single",
    options: [
      { value: "100k_500k", label: { en: "€100K – €500K", nl: "€100K – €500K" }, weight: 4 },
      { value: "500k_1m", label: { en: "€500K – €1M", nl: "€500K – €1M" }, weight: 6 },
      { value: "1m_5m", label: { en: "€1M – €5M", nl: "€1M – €5M" }, weight: 8 },
      { value: "5m_20m", label: { en: "€5M – €20M", nl: "€5M – €20M" }, weight: 9 },
      { value: "20m_plus", label: { en: "€20M+", nl: "€20M+" }, weight: 10 },
    ],
  },
  // Section 4: Timeline
  {
    id: "ca3",
    section: "timeline",
    sectionLabel: { en: "Timeline", nl: "Tijdlijn" },
    question: { en: "When did the situation begin?", nl: "Wanneer is de situatie begonnen?" },
    type: "single",
    options: [
      { value: "less_3_months", label: { en: "Less than 3 months ago", nl: "Minder dan 3 maanden geleden" }, weight: 10 },
      { value: "3_12_months", label: { en: "3–12 months ago", nl: "3–12 maanden geleden" }, weight: 8 },
      { value: "1_3_years", label: { en: "1–3 years ago", nl: "1–3 jaar geleden" }, weight: 5 },
      { value: "more_3_years", label: { en: "More than 3 years ago", nl: "Meer dan 3 jaar geleden" }, weight: 3 },
    ],
  },
  // Section 5: Evidence
  {
    id: "ca4",
    section: "evidence",
    sectionLabel: { en: "Evidence", nl: "Bewijs" },
    question: { en: "What documentation do you currently have?", nl: "Welke documentatie heeft u momenteel?" },
    type: "multi",
    options: [
      { value: "contracts", label: { en: "Contracts", nl: "Contracten" }, weight: 2 },
      { value: "transaction_records", label: { en: "Transaction records", nl: "Transactiegegevens" }, weight: 2 },
      { value: "crypto_wallets", label: { en: "Crypto wallet addresses", nl: "Crypto wallet-adressen" }, weight: 2 },
      { value: "emails_messages", label: { en: "Emails or messages", nl: "E-mails of berichten" }, weight: 1 },
      { value: "legal_docs", label: { en: "Legal documentation", nl: "Juridische documentatie" }, weight: 2 },
      { value: "bank_records", label: { en: "Bank records", nl: "Bankafschriften" }, weight: 2 },
      { value: "none", label: { en: "No documentation yet", nl: "Nog geen documentatie" }, weight: -5 },
    ],
  },
  // Section 6: Jurisdictions
  {
    id: "ca5",
    section: "jurisdictions",
    sectionLabel: { en: "Jurisdictions Involved", nl: "Betrokken Jurisdicties" },
    question: { en: "How many jurisdictions (countries) are involved in this situation?", nl: "Hoeveel jurisdicties (landen) zijn betrokken bij deze situatie?" },
    type: "single",
    options: [
      { value: "1", label: { en: "1 country", nl: "1 land" }, weight: 3 },
      { value: "2", label: { en: "2 countries", nl: "2 landen" }, weight: 6 },
      { value: "3_plus", label: { en: "3 or more countries", nl: "3 of meer landen" }, weight: 10 },
    ],
  },
  // Section 7: Legal Status
  {
    id: "ca6",
    section: "legal_status",
    sectionLabel: { en: "Legal Status", nl: "Juridische Status" },
    question: { en: "Have you taken legal action already?", nl: "Heeft u al juridische stappen ondernomen?" },
    type: "single",
    options: [
      { value: "no_action", label: { en: "No action yet", nl: "Nog geen actie" }, weight: 8 },
      { value: "lawyer_consulted", label: { en: "Lawyer consulted", nl: "Advocaat geraadpleegd" }, weight: 5 },
      { value: "case_filed", label: { en: "Legal case filed", nl: "Rechtszaak ingediend" }, weight: 3 },
      { value: "investigation", label: { en: "Ongoing investigation", nl: "Lopend onderzoek" }, weight: 4 },
    ],
  },
  // Section 8: Objective
  {
    id: "ca7",
    section: "objective",
    sectionLabel: { en: "Objective", nl: "Doelstelling" },
    question: { en: "What is your primary objective?", nl: "Wat is uw primaire doelstelling?" },
    type: "single",
    options: [
      { value: "recover_capital", label: { en: "Recover lost capital", nl: "Verloren kapitaal terughalen" }, weight: 8 },
      { value: "stop_fraud", label: { en: "Stop ongoing fraud", nl: "Lopende fraude stoppen" }, weight: 10 },
      { value: "resolve_conflict", label: { en: "Resolve partner conflict", nl: "Partnerconflict oplossen" }, weight: 6 },
      { value: "settlement", label: { en: "Strategic settlement", nl: "Strategische schikking" }, weight: 5 },
      { value: "investigation", label: { en: "Full investigation", nl: "Volledig onderzoek" }, weight: 9 },
    ],
  },
  // Section 9: Situation Summary
  {
    id: "ca8",
    section: "situation_summary",
    sectionLabel: { en: "Situation Summary", nl: "Situatie Samenvatting" },
    question: { en: "Please describe the situation briefly.", nl: "Beschrijf de situatie kort." },
    type: "text",
  },
  // Section 10: Strategic Review Consent
  {
    id: "ca9",
    section: "consent",
    sectionLabel: { en: "Strategic Review Consent", nl: "Toestemming Strategische Review" },
    question: { en: "If your case qualifies, would you be open to a confidential strategic review?", nl: "Als uw zaak in aanmerking komt, zou u openstaan voor een vertrouwelijke strategische review?" },
    type: "single",
    options: [
      { value: "yes", label: { en: "Yes", nl: "Ja" }, weight: 0 },
      { value: "no", label: { en: "No", nl: "Nee" }, weight: 0 },
    ],
  },
];
